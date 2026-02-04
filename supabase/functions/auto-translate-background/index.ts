import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const SUPPORTED_LANGUAGES = ['ja', 'ko', 'vi', 'th', 'ms', 'id', 'fr', 'de', 'es', 'ru', 'ar', 'tr'];
const BATCH_SIZE = 50;
const MAX_LANGUAGES_PER_RUN = 3; // Process up to 3 languages per run

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
  const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  try {
    console.log('[AutoTranslateBackground] Starting background translation check...');

    // 1. 检查是否启用了自动翻译
    const { data: settingData } = await supabase
      .from('system_settings')
      .select('value')
      .eq('key', 'auto_translate_enabled')
      .maybeSingle();

    const isEnabled = settingData?.value === 'true';
    if (!isEnabled) {
      console.log('[AutoTranslateBackground] Auto-translate is disabled, skipping');
      return new Response(
        JSON.stringify({ success: true, message: 'Auto-translate is disabled' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // 2. 检查是否有正在进行的翻译任务（防止重复执行）
    const { data: lockData } = await supabase
      .from('system_settings')
      .select('value')
      .eq('key', 'auto_translate_lock')
      .maybeSingle();

    if (lockData?.value) {
      const lockTime = new Date(lockData.value).getTime();
      const now = Date.now();
      // 如果锁存在且在5分钟内，跳过
      if (now - lockTime < 5 * 60 * 1000) {
        console.log('[AutoTranslateBackground] Another translation is in progress, skipping');
        return new Response(
          JSON.stringify({ success: true, message: 'Another translation is in progress' }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }

    // 3. 设置锁
    await supabase.from('system_settings').upsert({
      key: 'auto_translate_lock',
      value: new Date().toISOString(),
      description: '自动翻译任务锁',
    }, { onConflict: 'key' });

    // 4. 获取源内容 (zhTranslations + pending)
    const { data: zhData } = await supabase
      .from('system_settings')
      .select('value')
      .eq('key', 'translations_zh')
      .maybeSingle();

    const { data: pendingData } = await supabase
      .from('system_settings')
      .select('value')
      .eq('key', 'pending_translations')
      .maybeSingle();

    // 如果没有中文源，使用空对象
    let zhContent: Record<string, string> = {};
    if (zhData?.value) {
      try {
        zhContent = JSON.parse(zhData.value);
      } catch (e) {
        console.error('Failed to parse zh translations');
      }
    }

    let pendingContent: Record<string, string> = {};
    if (pendingData?.value) {
      try {
        const parsed = JSON.parse(pendingData.value);
        pendingContent = parsed.content || {};
      } catch (e) {
        console.error('Failed to parse pending translations');
      }
    }

    const mergedContent = { ...zhContent, ...pendingContent };
    const totalKeys = Object.keys(mergedContent).length;

    if (totalKeys === 0) {
      console.log('[AutoTranslateBackground] No source content found');
      await supabase.from('system_settings').delete().eq('key', 'auto_translate_lock');
      return new Response(
        JSON.stringify({ success: true, message: 'No source content' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // 5. 找到需要翻译的语言（未完成的）
    let translatedCount = 0;
    let languagesProcessed = 0;
    
    for (const lang of SUPPORTED_LANGUAGES) {
      // Limit languages per run to avoid timeout
      if (languagesProcessed >= MAX_LANGUAGES_PER_RUN) {
        console.log(`[AutoTranslateBackground] Reached max languages per run (${MAX_LANGUAGES_PER_RUN}), stopping`);
        break;
      }

      // 获取该语言的现有翻译
      const { data: langData } = await supabase
        .from('system_settings')
        .select('value')
        .eq('key', `translations_${lang}`)
        .maybeSingle();

      let existingTranslations: Record<string, string> = {};
      if (langData?.value) {
        try {
          existingTranslations = JSON.parse(langData.value);
        } catch (e) {
          existingTranslations = {};
        }
      }

      // 找出缺失的 keys
      const missingKeys = Object.keys(mergedContent).filter(
        key => !existingTranslations[key] || containsChinese(existingTranslations[key])
      );

      if (missingKeys.length === 0) {
        console.log(`[AutoTranslateBackground] ${lang} is complete, skipping`);
        continue;
      }

      console.log(`[AutoTranslateBackground] ${lang} has ${missingKeys.length} missing keys, translating batch of ${Math.min(BATCH_SIZE, missingKeys.length)}...`);

      // 翻译一个批次
      const batchKeys = missingKeys.slice(0, BATCH_SIZE);
      const batchContent: Record<string, string> = {};
      batchKeys.forEach(k => { batchContent[k] = mergedContent[k]; });

      // 调用 DeepSeek 翻译
      const translated = await translateWithDeepSeek(batchContent, lang);
      
      if (translated && Object.keys(translated).length > 0) {
        // 合并翻译结果
        const updatedTranslations = { ...existingTranslations, ...translated };
        
        await supabase.from('system_settings').upsert({
          key: `translations_${lang}`,
          value: JSON.stringify(updatedTranslations),
          description: `${lang} translations`,
        }, { onConflict: 'key' });

        translatedCount += Object.keys(translated).length;
        languagesProcessed++;
        console.log(`[AutoTranslateBackground] Translated ${Object.keys(translated).length} keys to ${lang}, total this run: ${translatedCount}`);
      }
    }

    // 6. 更新最后运行时间
    await supabase.from('system_settings').upsert({
      key: 'auto_translate_last_run',
      value: new Date().toISOString(),
      description: '自动翻译最后运行时间',
    }, { onConflict: 'key' });

    // 7. 释放锁
    await supabase.from('system_settings').delete().eq('key', 'auto_translate_lock');

    return new Response(
      JSON.stringify({ 
        success: true, 
        translated: translatedCount,
        message: `Background translation completed: ${translatedCount} keys translated` 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('[AutoTranslateBackground] Error:', error);
    
    // 释放锁
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    await supabase.from('system_settings').delete().eq('key', 'auto_translate_lock');
    
    return new Response(
      JSON.stringify({ success: false, error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

function containsChinese(text: string): boolean {
  if (!text || typeof text !== 'string') return false;
  return /[\u4e00-\u9fa5]/.test(text);
}

async function translateWithDeepSeek(
  content: Record<string, string>,
  targetLang: string
): Promise<Record<string, string> | null> {
  const DEEPSEEK_API_KEY = Deno.env.get('DEEPSEEK_API_KEY');
  if (!DEEPSEEK_API_KEY) {
    console.error('DEEPSEEK_API_KEY not configured');
    return null;
  }

  const langNames: Record<string, string> = {
    ja: 'Japanese', ko: 'Korean', vi: 'Vietnamese', th: 'Thai',
    ms: 'Malay', id: 'Indonesian', fr: 'French', de: 'German',
    es: 'Spanish', ru: 'Russian', ar: 'Arabic', tr: 'Turkish',
  };

  const targetLangName = langNames[targetLang] || targetLang;

  const systemPrompt = `You are a professional translator. Translate the following JSON object values from Chinese to ${targetLangName}.
Keep the JSON structure and keys exactly the same. Only translate the values.
For company names like "长凌科技", translate to localized equivalents (e.g., "CANI Technology" in English-based languages).
Return ONLY valid JSON, no explanations.`;

  try {
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: JSON.stringify(content, null, 2) },
        ],
        temperature: 0.3,
        max_tokens: 4096,
      }),
    });

    if (!response.ok) {
      throw new Error(`DeepSeek API error: ${response.status}`);
    }

    const data = await response.json();
    let resultText = data.choices?.[0]?.message?.content || '';
    
    // Clean markdown wrappers
    resultText = resultText.trim();
    if (resultText.startsWith('```json')) resultText = resultText.slice(7);
    if (resultText.startsWith('```')) resultText = resultText.slice(3);
    if (resultText.endsWith('```')) resultText = resultText.slice(0, -3);
    
    return JSON.parse(resultText.trim());
  } catch (error) {
    console.error(`DeepSeek translation error for ${targetLang}:`, error);
    return null;
  }
}
