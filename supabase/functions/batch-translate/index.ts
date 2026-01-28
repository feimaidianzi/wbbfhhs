import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.90.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const languageNames: Record<string, string> = {
  'zh': '中文',
  'en': 'English',
  'vi': 'Vietnamese (Tiếng Việt)',
  'th': 'Thai (ไทย)',
  'ms': 'Malay (Bahasa Melayu)',
  'id': 'Indonesian (Bahasa Indonesia)',
  'ja': 'Japanese (日本語)',
  'ko': 'Korean (한국어)',
  'fr': 'French (Français)',
  'de': 'German (Deutsch)',
  'es': 'Spanish (Español)',
  'ru': 'Russian (Русский)',
  'ar': 'Arabic (العربية)',
  'tr': 'Turkish (Türkçe)',
};

// PRIMARY: DeepSeek AI - Fast and reliable
async function translateWithDeepSeek(
  content: Record<string, string>,
  targetLang: string,
  apiKey: string
): Promise<Record<string, string>> {
  const targetLangName = languageNames[targetLang] || targetLang;
  
  const systemPrompt = `You are a professional translator for CANI (长凌科技), a drone technology company. 
Translate the following JSON content from Chinese to ${targetLangName}.

CRITICAL RULES:
1. Maintain exact JSON structure and keys
2. Only translate values, never keys
3. Keep technical terms accurate (drone, FPV, VTX, ESC, etc.)
4. Keep brand names "CANI" and "长凌" unchanged
5. Return ONLY valid JSON, no explanations`;

  const entries = Object.entries(content);
  const chunkSize = 10; // Reduced for faster response to prevent frontend timeout
  const chunks: [string, string][][] = [];
  
  for (let i = 0; i < entries.length; i += chunkSize) {
    chunks.push(entries.slice(i, i + chunkSize) as [string, string][]);
  }

  const translatedContent: Record<string, string> = {};

  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i];
    const contentToTranslate = Object.fromEntries(chunk);

    console.log(`[DeepSeek] Translating chunk ${i + 1}/${chunks.length} for ${targetLang}...`);

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
          { role: 'user', content: JSON.stringify(contentToTranslate) },
        ],
        temperature: 0.3,
        max_tokens: 4096,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`DeepSeek error: ${response.status} - ${errorText}`);
      throw new Error(`DeepSeek error: ${response.status}`);
    }

    const data = await response.json();
    const translatedText = data.choices?.[0]?.message?.content;

    if (!translatedText) {
      throw new Error('No translation returned from DeepSeek');
    }

    let cleanedText = translatedText.trim();
    if (cleanedText.startsWith('```json')) cleanedText = cleanedText.slice(7);
    if (cleanedText.startsWith('```')) cleanedText = cleanedText.slice(3);
    if (cleanedText.endsWith('```')) cleanedText = cleanedText.slice(0, -3);
    cleanedText = cleanedText.trim();

    try {
      const parsed = JSON.parse(cleanedText);
      Object.assign(translatedContent, parsed);
      console.log(`[DeepSeek] ✓ Chunk ${i + 1}/${chunks.length} completed, got ${Object.keys(parsed).length} keys`);
    } catch (parseError) {
      console.error(`JSON parse error for chunk ${i + 1}:`, parseError);
      throw new Error(`Failed to parse translation for ${targetLang}`);
    }
  }

  return translatedContent;
}

// BACKUP: Lovable AI - Fallback option
async function translateWithLovableAI(
  content: Record<string, string>,
  targetLang: string,
  apiKey: string
): Promise<Record<string, string>> {
  const targetLangName = languageNames[targetLang] || targetLang;
  
  const systemPrompt = `You are a professional translator for CANI (长凌科技), a drone technology company. 
Translate the following JSON content from Chinese to ${targetLangName}.

CRITICAL RULES:
1. Maintain exact JSON structure and keys
2. Only translate values, never keys
3. Keep technical terms accurate (drone, FPV, VTX, ESC, etc.)
4. Keep brand names "CANI" and "长凌" unchanged
5. Return ONLY valid JSON, no explanations`;

  const entries = Object.entries(content);
  const chunkSize = 10; // Matched with DeepSeek for consistency
  const chunks: [string, string][][] = [];
  
  for (let i = 0; i < entries.length; i += chunkSize) {
    chunks.push(entries.slice(i, i + chunkSize) as [string, string][]);
  }

  const translatedContent: Record<string, string> = {};

  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i];
    const contentToTranslate = Object.fromEntries(chunk);

    console.log(`[Lovable AI] Translating chunk ${i + 1}/${chunks.length} for ${targetLang}...`);

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'google/gemini-3-flash-preview',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: JSON.stringify(contentToTranslate) },
        ],
        temperature: 0.3,
        max_tokens: 4096,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Lovable AI error: ${response.status} - ${errorText}`);
      throw new Error(`Lovable AI error: ${response.status}`);
    }

    const data = await response.json();
    const translatedText = data.choices?.[0]?.message?.content;

    if (!translatedText) {
      throw new Error('No translation returned from Lovable AI');
    }

    let cleanedText = translatedText.trim();
    if (cleanedText.startsWith('```json')) cleanedText = cleanedText.slice(7);
    if (cleanedText.startsWith('```')) cleanedText = cleanedText.slice(3);
    if (cleanedText.endsWith('```')) cleanedText = cleanedText.slice(0, -3);
    cleanedText = cleanedText.trim();

    try {
      const parsed = JSON.parse(cleanedText);
      Object.assign(translatedContent, parsed);
      console.log(`[Lovable AI] ✓ Chunk ${i + 1}/${chunks.length} completed, got ${Object.keys(parsed).length} keys`);
    } catch (parseError) {
      console.error(`JSON parse error for chunk ${i + 1}:`, parseError);
      throw new Error(`Failed to parse translation for ${targetLang}`);
    }
  }

  return translatedContent;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { sourceContent, languages, mode = 'full', forceTranslateKeys = [] } = await req.json();

    if (!languages || !Array.isArray(languages)) {
      return new Response(
        JSON.stringify({ error: 'Missing languages array' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    if (mode === 'full' && !sourceContent) {
      return new Response(
        JSON.stringify({ error: 'Missing sourceContent for full mode' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const DEEPSEEK_API_KEY = Deno.env.get('DEEPSEEK_API_KEY');
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    
    console.log(`API Keys status - DeepSeek: ${DEEPSEEK_API_KEY ? 'Available' : 'Missing'}, Lovable: ${LOVABLE_API_KEY ? 'Available' : 'Missing'}`);
    
    if (!DEEPSEEK_API_KEY && !LOVABLE_API_KEY) {
      throw new Error('No translation API key configured');
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    // CRITICAL: Always use the provided sourceContent as the complete source
    // This is the zhTranslations object from the frontend
    const actualSourceContent = sourceContent;
    
    if (!actualSourceContent || Object.keys(actualSourceContent).length === 0) {
      throw new Error('No source content provided - frontend must send zhTranslations');
    }
    
    // Convert forceTranslateKeys to a Set for faster lookup
    const forceKeysSet = new Set(forceTranslateKeys);
    const hasForceKeys = forceKeysSet.size > 0;
    
    const totalSourceKeys = Object.keys(actualSourceContent).length;
    console.log(`Source content has ${totalSourceKeys} keys to translate, ${forceKeysSet.size} force-translate keys`);

    const results: Record<string, any> = {};

    for (const lang of languages) {
      if (lang === 'zh' || lang === 'en') {
        continue;
      }

      try {
        console.log(`Starting translation for ${lang}...`);
        
        // Load existing translations for incremental mode
        let existingTranslations: Record<string, string> = {};
        if (mode === 'incremental') {
          const { data: existingData } = await supabase
            .from('system_settings')
            .select('value')
            .eq('key', `translations_${lang}`)
            .single();
          
          if (existingData?.value) {
            existingTranslations = JSON.parse(existingData.value);
            console.log(`Found ${Object.keys(existingTranslations).length} existing translations for ${lang}`);
          }
        }
        
        // Filter out already translated keys - check if key exists AND has non-empty value
        // BUT: Always include keys in forceTranslateKeys (from scanner migration)
        let contentToTranslate = actualSourceContent;
        if (mode === 'incremental') {
          // CRITICAL FIX: Calculate remaining based on ACTUAL missing keys, not just source vs existing count
          // A key needs translation if:
          // 1. It's in forceTranslateKeys (must be re-translated), OR
          // 2. It doesn't exist in existingTranslations, OR  
          // 3. It exists but is empty/whitespace
          const remainingKeys = Object.keys(actualSourceContent).filter(
            key => {
              // If this key is in forceTranslateKeys, always include it
              if (forceKeysSet.has(key)) {
                return true;
              }
              const existingValue = existingTranslations[key];
              // Key needs translation if it doesn't exist OR has empty/undefined value
              return !existingValue || existingValue.trim() === '';
            }
          );
          
          if (remainingKeys.length === 0) {
            console.log(`All translations already completed for ${lang}`);
            results[lang] = {
              success: true,
              count: Object.keys(existingTranslations).length,
              total: Object.keys(actualSourceContent).length,
              remaining: 0,
              completed: true,
              message: 'Already completed',
            };
            continue;
          }
          
          // CRITICAL: Only process 1 chunk (10 keys) per request to prevent timeout
          const batchSize = 10; // Must match chunkSize in translation functions
          const batchKeys = remainingKeys.slice(0, batchSize);
          contentToTranslate = Object.fromEntries(
            batchKeys.map(key => [key, actualSourceContent[key]])
          );
          
          // CRITICAL: Store the actual remaining count BEFORE processing
          // This is the TRUE count of keys that still need translation after this batch
          const remainingAfterBatch = remainingKeys.length - batchKeys.length;
          
          const forceKeysInBatch = batchKeys.filter(k => forceKeysSet.has(k)).length;
          console.log(`[Single Batch] Processing ${batchKeys.length} keys for ${lang} (${forceKeysInBatch} force-translate)`);
          console.log(`  - Existing translations: ${Object.keys(existingTranslations).length}`);
          console.log(`  - Total source keys: ${totalSourceKeys}`);
          console.log(`  - Keys needing translation (incl. force): ${remainingKeys.length}`);
          console.log(`  - Remaining after this batch: ${remainingAfterBatch}`);
          
          // Store for later use in results
          (contentToTranslate as any).__remainingAfterBatch = remainingAfterBatch;
        }
        
        let translations: Record<string, string>;
        
        // PRIORITY: Use DeepSeek first (fast and reliable)
        if (DEEPSEEK_API_KEY) {
          console.log(`Using DeepSeek for ${lang} (primary)...`);
          try {
            translations = await translateWithDeepSeek(contentToTranslate, lang, DEEPSEEK_API_KEY);
            console.log(`DeepSeek translation completed for ${lang}`);
          } catch (deepseekError) {
            console.error(`DeepSeek failed for ${lang}:`, deepseekError);
            // Fallback to Lovable AI
            if (LOVABLE_API_KEY) {
              console.log(`Falling back to Lovable AI for ${lang}...`);
              translations = await translateWithLovableAI(contentToTranslate, lang, LOVABLE_API_KEY);
            } else {
              throw deepseekError;
            }
          }
        } else if (LOVABLE_API_KEY) {
          console.log(`Using Lovable AI for ${lang} (DeepSeek not available)...`);
          translations = await translateWithLovableAI(contentToTranslate, lang, LOVABLE_API_KEY);
        } else {
          throw new Error('No translation API available');
        }
          
        // Merge with existing translations
        if (mode === 'incremental' && Object.keys(existingTranslations).length > 0) {
          translations = { ...existingTranslations, ...translations };
        }
        
        // Get the remaining count that was calculated BEFORE translation
        // This is the TRUE remaining count based on forceTranslateKeys logic
        const remaining = (contentToTranslate as any).__remainingAfterBatch ?? 0;
        const translatedCount = Object.keys(translations).length;
        
        console.log(`Completed batch: ${translatedCount} total keys in DB, ${remaining} still need translation`);

        // Save to database
        const totalNeeded = Object.keys(actualSourceContent).length;
        const { error: upsertError } = await supabase
          .from('system_settings')
          .upsert({
            key: `translations_${lang}`,
            value: JSON.stringify(translations),
            description: `AI翻译 - ${languageNames[lang] || lang} (${translatedCount}/${totalNeeded}条)${remaining > 0 ? ` - ${remaining}条待翻译` : ' ✓'}`,
            updated_at: new Date().toISOString(),
          }, { onConflict: 'key' });

        if (upsertError) {
          throw upsertError;
        }

        results[lang] = {
          success: true,
          count: translatedCount,
          total: totalNeeded,
          remaining: remaining,
          completed: remaining === 0,
        };
      } catch (error) {
        const errorMsg = error instanceof Error ? error.message : 'Unknown error';
        console.error(`Error translating ${lang}:`, errorMsg);
        results[lang] = { success: false, error: errorMsg };
      }
    }

    return new Response(
      JSON.stringify({ success: true, results }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Batch translation error:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Translation failed' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
