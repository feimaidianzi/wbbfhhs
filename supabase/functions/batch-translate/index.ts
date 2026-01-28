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
  
  const systemPrompt = `You are a professional translator for CANI, a drone technology company. 
Translate the following JSON content from Chinese to ${targetLangName}.

CRITICAL RULES:
1. Maintain exact JSON structure and keys
2. Only translate values, never keys
3. Keep technical terms accurate (drone, FPV, VTX, ESC, etc.)
4. ABSOLUTE REQUIREMENT: The output MUST NOT contain ANY Chinese characters (汉字). 
   - "长凌" must be translated to "CANI" or the brand name in target language
   - "长凌科技" must be translated to "CANI Technology" or equivalent
   - "CANI(长凌)" must become just "CANI" - remove the Chinese entirely
5. Only the brand name "CANI" stays in English. Everything else must be in ${targetLangName}.
6. Return ONLY valid JSON, no explanations
7. Double-check: if ANY Chinese character remains in output, translation is WRONG`;

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
      // Post-process: clean any remaining Chinese characters from brand names
      for (const [key, value] of Object.entries(parsed)) {
        if (typeof value === 'string') {
          // Replace common patterns like "CANI(长凌)" or "长凌科技" with "CANI" / "CANI Technology"
          let cleaned = value as string;
          cleaned = cleaned.replace(/CANI\s*[\(（]长凌[\)）]/gi, 'CANI');
          cleaned = cleaned.replace(/长凌科技/g, 'CANI Technology');
          cleaned = cleaned.replace(/长凌/g, 'CANI');
          parsed[key] = cleaned;
        }
      }
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
  
  const systemPrompt = `You are a professional translator for CANI, a drone technology company. 
Translate the following JSON content from Chinese to ${targetLangName}.

CRITICAL RULES:
1. Maintain exact JSON structure and keys
2. Only translate values, never keys
3. Keep technical terms accurate (drone, FPV, VTX, ESC, etc.)
4. ABSOLUTE REQUIREMENT: The output MUST NOT contain ANY Chinese characters (汉字). 
   - "长凌" must be translated to "CANI" or the brand name in target language
   - "长凌科技" must be translated to "CANI Technology" or equivalent
   - "CANI(长凌)" must become just "CANI" - remove the Chinese entirely
5. Only the brand name "CANI" stays in English. Everything else must be in ${targetLangName}.
6. Return ONLY valid JSON, no explanations
7. Double-check: if ANY Chinese character remains in output, translation is WRONG`;

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
      // Post-process: clean any remaining Chinese characters from brand names
      for (const [key, value] of Object.entries(parsed)) {
        if (typeof value === 'string') {
          let cleaned = value as string;
          cleaned = cleaned.replace(/CANI\s*[\(（]长凌[\)）]/gi, 'CANI');
          cleaned = cleaned.replace(/长凌科技/g, 'CANI Technology');
          cleaned = cleaned.replace(/长凌/g, 'CANI');
          parsed[key] = cleaned;
        }
      }
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

    // Utility functions - defined once, used for all languages
    // Identify keys that are "untranslatable" - they look the same in any language
    const isUntranslatableContent = (value: string): boolean => {
      if (!value || value.trim() === '') return true;
      const trimmed = value.trim();
      // Only pure numbers/dates (e.g., "2025-12-23", "1920x1080", "+86")
      if (/^[\d\-\/\+\.\s\:x×]+$/.test(trimmed)) return true;
      // Only uppercase abbreviations with no Chinese (e.g., "VTX", "ELRS", "ISO9001")
      if (/^[A-Z0-9\-\/\+\.]+$/.test(trimmed) && trimmed.length <= 10) return true;
      // Technical specs with units (e.g., "≤10km", "-20°C ~ +50°C", "1080P/4K")
      if (/^[\d\-\+≤≥<>~\s\°CkmghzHZmMAWV\/xP]+$/i.test(trimmed)) return true;
      return false;
    };
    
    // Check for ANY Chinese characters in string
    const containsChinese = (str: string): boolean => {
      return /[\u4e00-\u9fa5]/.test(str);
    };
    
    // Check if translation looks valid (not just copied from source)
    const isValidTranslation = (source: string, translation: string): boolean => {
      if (!translation || translation.trim() === '') return false;
      if (translation.startsWith('__')) return true; // Skip internal keys
      
      // If source has no Chinese, and translation equals source, it's valid
      // (e.g., "≤10km" should stay "≤10km" in any language)
      if (!containsChinese(source) && source === translation) return true;
      
      // If source has Chinese but translation doesn't have Chinese, it's valid
      if (containsChinese(source) && !containsChinese(translation)) return true;
      
      // If both source and translation have no Chinese and they're different, it's valid
      if (!containsChinese(source) && !containsChinese(translation)) return true;
      
      // If translation still contains Chinese, it's not valid
      if (containsChinese(translation)) return false;
      
      return true;
    };

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
        
        // Filter out already translated keys
        let contentToTranslate = actualSourceContent;
        if (mode === 'incremental') {
          
          // Track which keys we've already successfully translated in DB
          // The key insight: a key is "done" if it exists AND has no Chinese characters
          // This ensures we re-translate items that still have Chinese
          const translatedKeysSet = new Set<string>();
          
          for (const [key, value] of Object.entries(existingTranslations)) {
            const sourceValue = actualSourceContent[key];
            if (!sourceValue) continue; // Key not in source, skip
            
            // If source is untranslatable (numbers/specs), mark as done
            if (isUntranslatableContent(sourceValue)) {
              translatedKeysSet.add(key);
              continue;
            }
            
            // If translation exists and has no Chinese, it's valid
            if (value && !containsChinese(value)) {
              translatedKeysSet.add(key);
              continue;
            }
          }
          
          // Also auto-fill untranslatable content now
          for (const [key, value] of Object.entries(actualSourceContent)) {
            const valueStr = value as string;
            if (!existingTranslations[key] && isUntranslatableContent(valueStr)) {
              existingTranslations[key] = valueStr;
              translatedKeysSet.add(key);
            }
          }
          
          // Keys that need translation = source keys not in translatedKeysSet
          const remainingKeys = Object.keys(actualSourceContent).filter(key => {
            // Force translate keys always need processing unless already valid
            if (forceKeysSet.has(key) && !translatedKeysSet.has(key)) {
              return true;
            }
            return !translatedKeysSet.has(key);
          });
          
          const validCount = translatedKeysSet.size;
          console.log(`  - Valid translations: ${validCount}/${totalSourceKeys}`);
          console.log(`  - Keys needing translation: ${remainingKeys.length}`);
          
          if (remainingKeys.length === 0) {
            console.log(`All translations already completed for ${lang}`);
            
            // Make sure to save any auto-filled untranslatable content
            const totalTranslated = Object.keys(existingTranslations).length;
            await supabase
              .from('system_settings')
              .upsert({
                key: `translations_${lang}`,
                value: JSON.stringify(existingTranslations),
                description: `AI翻译 - ${languageNames[lang] || lang} (${totalTranslated}/${totalSourceKeys}条) ✓`,
                updated_at: new Date().toISOString(),
              }, { onConflict: 'key' });
            
            results[lang] = {
              success: true,
              count: totalTranslated,
              total: totalSourceKeys,
              remaining: 0,
              completed: true,
              message: 'Already completed',
            };
            continue;
          }
          
          // Process ONLY 10 keys per request to prevent timeout
          const batchSize = 10;
          const batchKeys = remainingKeys.slice(0, batchSize);
          contentToTranslate = Object.fromEntries(
            batchKeys.map(key => [key, actualSourceContent[key]])
          );
          
          // Calculate remaining AFTER this batch is processed
          const remainingAfterBatch = remainingKeys.length - batchKeys.length;
          
          const forceKeysInBatch = batchKeys.filter(k => forceKeysSet.has(k)).length;
          console.log(`[Single Batch] Processing ${batchKeys.length} keys for ${lang} (${forceKeysInBatch} force-translate)`);
          console.log(`  - Existing translations: ${Object.keys(existingTranslations).length}`);
          console.log(`  - Total source keys: ${totalSourceKeys}`);
          console.log(`  - Keys needing translation: ${remainingKeys.length}`);
          console.log(`  - Keys in this batch: ${batchKeys.join(', ').substring(0, 200)}...`);
          console.log(`  - Remaining after this batch: ${remainingAfterBatch}`);
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
        
        // Remove any internal keys that shouldn't be saved
        delete translations['__remainingAfterBatch'];
        
        // After merging, recalculate remaining by checking which source keys still need translation
        const allSourceKeys = Object.keys(actualSourceContent);
        const stillMissingKeys = allSourceKeys.filter(key => {
          const sourceValue = actualSourceContent[key];
          const translatedValue = translations[key];
          
          // If no translation exists -> needs translation
          if (!translatedValue || translatedValue.trim() === '') {
            return !isUntranslatableContent(sourceValue);
          }
          
          // If translation contains Chinese -> needs re-translation
          if (containsChinese(translatedValue)) {
            return true;
          }
          
          // If translation equals source -> not translated (unless untranslatable)
          if (translatedValue === sourceValue) {
            return !isUntranslatableContent(sourceValue);
          }
          
          return false;
        });
        
        const remaining = stillMissingKeys.length;
        const translatedCount = Object.keys(translations).length;
        
        console.log(`Completed batch: ${translatedCount} total keys in DB, ${remaining} still need translation`);
        if (remaining > 0 && remaining <= 20) {
          console.log(`  - Still missing keys: ${stillMissingKeys.slice(0, 10).join(', ')}...`);
        }

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
