import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.90.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

const languageNames: Record<string, string> = {
  'zh': '中文',
  'en': 'English',
  'vi': 'Tiếng Việt',
  'th': 'ไทย',
  'ms': 'Bahasa Melayu',
  'id': 'Bahasa Indonesia',
  'ja': '日本語',
  'ko': '한국어',
  'fr': 'Français',
  'de': 'Deutsch',
  'es': 'Español',
  'ru': 'Русский',
  'ar': 'العربية',
  'tr': 'Türkçe',
};

const allLanguages = ['vi', 'th', 'ms', 'id', 'ja', 'ko', 'fr', 'de', 'es', 'ru', 'ar', 'tr'];

// Check if string contains Chinese characters
function containsChinese(str: string): boolean {
  return /[\u4e00-\u9fa5]/.test(str);
}

// Check if content is untranslatable (numbers, technical codes, etc.)
function isUntranslatable(value: string): boolean {
  if (!value || value.trim() === '') return true;
  const trimmed = value.trim();
  // Pure numbers, dates, specs
  if (/^[\d\-\/\+\.\s\:x×]+$/.test(trimmed)) return true;
  // Technical abbreviations
  if (/^[A-Z0-9\-\/\+\.]+$/.test(trimmed) && trimmed.length <= 10) return true;
  // Technical specs with units
  if (/^[\d\-\+≤≥<>~\s\°CkmghzHZmMAWV\/xP]+$/i.test(trimmed)) return true;
  return false;
}

// Use DeepSeek to detect missing translations
async function detectMissingTranslations(
  sourceContent: Record<string, string>,
  existingTranslations: Record<string, string>,
  targetLang: string,
  apiKey: string
): Promise<string[]> {
  const missingKeys: string[] = [];
  
  for (const [key, value] of Object.entries(sourceContent)) {
    // Skip untranslatable content
    if (isUntranslatable(value)) {
      continue;
    }
    
    const existingValue = existingTranslations[key];
    
    // Missing or empty
    if (!existingValue || existingValue.trim() === '') {
      missingKeys.push(key);
      continue;
    }
    
    // Source has Chinese but translation still has Chinese - not properly translated
    if (containsChinese(value) && containsChinese(existingValue)) {
      missingKeys.push(key);
      continue;
    }
    
    // Translation is identical to source (for Chinese content) - not translated
    if (containsChinese(value) && existingValue === value) {
      missingKeys.push(key);
      continue;
    }
  }
  
  return missingKeys;
}

// Use DeepSeek to translate content
async function translateWithDeepSeek(
  content: Record<string, string>,
  targetLang: string,
  apiKey: string
): Promise<Record<string, string>> {
  const targetLangName = languageNames[targetLang] || targetLang;
  
  const systemPrompt = `You are a professional translator for CANI (长凌科技), a drone technology company.
Translate the JSON content from Chinese to ${targetLangName}.

STRICT RULES:
1. Return ONLY valid JSON - no explanations, no markdown
2. Keep the exact same keys, only translate values
3. The output MUST NOT contain ANY Chinese characters
4. Translate "长凌科技" to "CANI Technology", "长凌" to "CANI"
5. Keep technical terms accurate: drone, FPV, VTX, ESC, ELRS, etc.
6. Be natural and fluent in ${targetLangName}`;

  const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'deepseek-chat',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: JSON.stringify(content) },
      ],
      temperature: 0.3,
      max_tokens: 8192,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`DeepSeek error: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  let translatedText = data.choices?.[0]?.message?.content || '';

  // Clean markdown wrappers
  translatedText = translatedText.trim();
  if (translatedText.startsWith('```json')) translatedText = translatedText.slice(7);
  if (translatedText.startsWith('```')) translatedText = translatedText.slice(3);
  if (translatedText.endsWith('```')) translatedText = translatedText.slice(0, -3);
  translatedText = translatedText.trim();

  const parsed = JSON.parse(translatedText);
  
  // Post-process: clean any remaining Chinese
  for (const [key, value] of Object.entries(parsed)) {
    if (typeof value === 'string') {
      let cleaned = value as string;
      cleaned = cleaned.replace(/CANI\s*[\(（]长凌[\)）]/gi, 'CANI');
      cleaned = cleaned.replace(/长凌科技/g, 'CANI Technology');
      cleaned = cleaned.replace(/长凌/g, 'CANI');
      parsed[key] = cleaned;
    }
  }

  return parsed;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { action, sourceContent, targetLanguages = allLanguages, batchSize = 20 } = await req.json();

    const DEEPSEEK_API_KEY = Deno.env.get('DEEPSEEK_API_KEY');
    if (!DEEPSEEK_API_KEY) {
      throw new Error('DEEPSEEK_API_KEY not configured');
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    if (!sourceContent || Object.keys(sourceContent).length === 0) {
      throw new Error('sourceContent is required');
    }

    const totalSourceKeys = Object.keys(sourceContent).length;
    console.log(`[AutoDetectTranslate] Source has ${totalSourceKeys} keys`);

    // Action: detect - Find all missing translations
    if (action === 'detect') {
      const detectionResults: Record<string, { missing: number; keys: string[] }> = {};
      
      for (const lang of targetLanguages) {
        if (lang === 'zh' || lang === 'en') continue;
        
        // Load existing translations
        let existingTranslations: Record<string, string> = {};
        const { data } = await supabase
          .from('system_settings')
          .select('value')
          .eq('key', `translations_${lang}`)
          .maybeSingle();
        
        if (data?.value) {
          existingTranslations = JSON.parse(data.value);
        }
        
        // Detect missing
        const missingKeys = await detectMissingTranslations(
          sourceContent,
          existingTranslations,
          lang,
          DEEPSEEK_API_KEY
        );
        
        detectionResults[lang] = {
          missing: missingKeys.length,
          keys: missingKeys.slice(0, 50), // Return first 50 for preview
        };
        
        console.log(`[Detect] ${lang}: ${missingKeys.length} missing out of ${totalSourceKeys}`);
      }
      
      return new Response(
        JSON.stringify({
          success: true,
          total: totalSourceKeys,
          results: detectionResults,
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Action: translate - Translate one batch for one language
    if (action === 'translate') {
      const lang = targetLanguages[0];
      if (!lang || lang === 'zh' || lang === 'en') {
        return new Response(
          JSON.stringify({ success: true, message: 'No translation needed' }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Load existing translations
      let existingTranslations: Record<string, string> = {};
      const { data: existingData } = await supabase
        .from('system_settings')
        .select('value')
        .eq('key', `translations_${lang}`)
        .maybeSingle();
      
      if (existingData?.value) {
        existingTranslations = JSON.parse(existingData.value);
      }

      // Detect missing keys
      const missingKeys = await detectMissingTranslations(
        sourceContent,
        existingTranslations,
        lang,
        DEEPSEEK_API_KEY
      );

      if (missingKeys.length === 0) {
        // Auto-fill untranslatable content
        for (const [key, value] of Object.entries(sourceContent as Record<string, string>)) {
          if (!existingTranslations[key] && isUntranslatable(value)) {
            existingTranslations[key] = value;
          }
        }
        
        // Save updated translations
        await supabase
          .from('system_settings')
          .upsert({
            key: `translations_${lang}`,
            value: JSON.stringify(existingTranslations),
            description: `${languageNames[lang]} - ${Object.keys(existingTranslations).length}/${totalSourceKeys} ✓`,
            updated_at: new Date().toISOString(),
          }, { onConflict: 'key' });

        return new Response(
          JSON.stringify({
            success: true,
            lang,
            translated: Object.keys(existingTranslations).length,
            total: totalSourceKeys,
            remaining: 0,
            completed: true,
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Take a batch to translate
      const batchKeys = missingKeys.slice(0, batchSize);
      const contentToTranslate: Record<string, string> = {};
      for (const key of batchKeys) {
        contentToTranslate[key] = sourceContent[key];
      }

      console.log(`[Translate] ${lang}: translating ${batchKeys.length} keys, ${missingKeys.length - batchKeys.length} remaining`);

      // Translate with DeepSeek
      const translated = await translateWithDeepSeek(contentToTranslate, lang, DEEPSEEK_API_KEY);

      // Merge with existing
      const updatedTranslations = { ...existingTranslations, ...translated };
      
      // Also auto-fill any untranslatable content
      for (const [key, value] of Object.entries(sourceContent as Record<string, string>)) {
        if (!updatedTranslations[key] && isUntranslatable(value)) {
          updatedTranslations[key] = value;
        }
      }

      // Save to database
      await supabase
        .from('system_settings')
        .upsert({
          key: `translations_${lang}`,
          value: JSON.stringify(updatedTranslations),
          description: `${languageNames[lang]} - ${Object.keys(updatedTranslations).length}/${totalSourceKeys}`,
          updated_at: new Date().toISOString(),
        }, { onConflict: 'key' });

      const newRemaining = missingKeys.length - batchKeys.length;

      return new Response(
        JSON.stringify({
          success: true,
          lang,
          translated: Object.keys(updatedTranslations).length,
          total: totalSourceKeys,
          remaining: newRemaining,
          batchTranslated: Object.keys(translated).length,
          completed: newRemaining === 0,
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Action: translate-all - Translate all missing for all languages
    if (action === 'translate-all') {
      const results: Record<string, any> = {};
      
      for (const lang of targetLanguages) {
        if (lang === 'zh' || lang === 'en') continue;
        
        // Load existing
        let existingTranslations: Record<string, string> = {};
        const { data } = await supabase
          .from('system_settings')
          .select('value')
          .eq('key', `translations_${lang}`)
          .maybeSingle();
        
        if (data?.value) {
          existingTranslations = JSON.parse(data.value);
        }

        // Detect missing
        const missingKeys = await detectMissingTranslations(
          sourceContent,
          existingTranslations,
          lang,
          DEEPSEEK_API_KEY
        );

        if (missingKeys.length === 0) {
          results[lang] = { success: true, remaining: 0, completed: true };
          continue;
        }

        // Take first batch
        const batchKeys = missingKeys.slice(0, batchSize);
        const contentToTranslate: Record<string, string> = {};
        for (const key of batchKeys) {
          contentToTranslate[key] = sourceContent[key];
        }

        try {
          const translated = await translateWithDeepSeek(contentToTranslate, lang, DEEPSEEK_API_KEY);
          const updated = { ...existingTranslations, ...translated };
          
          // Auto-fill untranslatable
          for (const [key, value] of Object.entries(sourceContent as Record<string, string>)) {
            if (!updated[key] && isUntranslatable(value)) {
              updated[key] = value;
            }
          }

          await supabase
            .from('system_settings')
            .upsert({
              key: `translations_${lang}`,
              value: JSON.stringify(updated),
              description: `${languageNames[lang]} - ${Object.keys(updated).length}/${totalSourceKeys}`,
              updated_at: new Date().toISOString(),
            }, { onConflict: 'key' });

          results[lang] = {
            success: true,
            translated: Object.keys(updated).length,
            total: totalSourceKeys,
            remaining: missingKeys.length - batchKeys.length,
            completed: missingKeys.length - batchKeys.length === 0,
          };
        } catch (error) {
          console.error(`Error translating ${lang}:`, error);
          results[lang] = {
            success: false,
            error: error instanceof Error ? error.message : 'Translation failed',
            remaining: missingKeys.length,
          };
        }
      }

      return new Response(
        JSON.stringify({ success: true, results }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    throw new Error(`Unknown action: ${action}`);
  } catch (error) {
    console.error('Auto detect/translate error:', error);
    return new Response(
      JSON.stringify({ success: false, error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
