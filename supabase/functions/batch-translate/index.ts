import { createClient } from "npm:@supabase/supabase-js@2";

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

// Collect all available DeepSeek API keys
function getDeepSeekApiKeys(): string[] {
  const keys: string[] = [];
  
  // Primary key
  const primaryKey = Deno.env.get('DEEPSEEK_API_KEY');
  if (primaryKey) keys.push(primaryKey);
  
  // Additional keys (2-7+)
  for (let i = 2; i <= 10; i++) {
    const key = Deno.env.get(`DEEPSEEK_API_KEY_${i}`);
    if (key) keys.push(key);
  }
  
  console.log(`[MultiKey] Found ${keys.length} DeepSeek API keys`);
  return keys;
}

// Round-robin key selector
let currentKeyIndex = 0;
function getNextApiKey(keys: string[]): string {
  if (keys.length === 0) throw new Error('No API keys available');
  const key = keys[currentKeyIndex % keys.length];
  currentKeyIndex++;
  return key;
}

// PRIMARY: DeepSeek AI - Fast and reliable (with multi-key support)
async function translateWithDeepSeek(
  content: Record<string, string>,
  targetLang: string,
  apiKeys: string[]
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
  const chunkSize = 15; // Increased chunk size with multi-key parallelism
  const chunks: [string, string][][] = [];
  
  for (let i = 0; i < entries.length; i += chunkSize) {
    chunks.push(entries.slice(i, i + chunkSize) as [string, string][]);
  }

  // Calculate parallelism based on available keys
  const parallelism = Math.min(apiKeys.length, 6); // Max 6 parallel requests
  console.log(`[DeepSeek] Using ${parallelism} parallel workers for ${chunks.length} chunks`);

  const translatedContent: Record<string, string> = {};

  // Process chunks in parallel batches
  for (let batchStart = 0; batchStart < chunks.length; batchStart += parallelism) {
    const batchChunks = chunks.slice(batchStart, batchStart + parallelism);
    const batchPromises = batchChunks.map(async (chunk, idx) => {
      const chunkIndex = batchStart + idx;
      const apiKey = getNextApiKey(apiKeys);
      const contentToTranslate = Object.fromEntries(chunk);

      console.log(`[DeepSeek] Translating chunk ${chunkIndex + 1}/${chunks.length} for ${targetLang} (worker ${idx + 1})`);

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
        console.error(`DeepSeek error (chunk ${chunkIndex + 1}): ${response.status} - ${errorText}`);
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
      
      console.log(`[DeepSeek] ✓ Chunk ${chunkIndex + 1}/${chunks.length} completed, got ${Object.keys(parsed).length} keys`);
      return parsed;
    });

    // Wait for batch to complete
    const batchResults = await Promise.all(batchPromises);
    for (const result of batchResults) {
      Object.assign(translatedContent, result);
    }
    
    console.log(`[DeepSeek] Batch complete: ${Object.keys(translatedContent).length}/${entries.length} keys translated`);
  }

  return translatedContent;
}

// BACKUP: Lovable AI - Fallback option (single key)
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
  const chunkSize = 15;
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

Deno.serve(async (req) => {
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

    // Collect all DeepSeek API keys
    const deepseekApiKeys = getDeepSeekApiKeys();
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    
    console.log(`API Keys status - DeepSeek: ${deepseekApiKeys.length} keys, Lovable: ${LOVABLE_API_KEY ? 'Available' : 'Missing'}`);
    
    if (deepseekApiKeys.length === 0 && !LOVABLE_API_KEY) {
      throw new Error('No translation API key configured');
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    const actualSourceContent = sourceContent;
    
    if (!actualSourceContent || Object.keys(actualSourceContent).length === 0) {
      throw new Error('No source content provided - frontend must send zhTranslations');
    }
    
    const forceKeysSet = new Set(forceTranslateKeys);
    const hasForceKeys = forceKeysSet.size > 0;
    
    const totalSourceKeys = Object.keys(actualSourceContent).length;
    console.log(`Source content has ${totalSourceKeys} keys to translate, ${forceKeysSet.size} force-translate keys`);
    console.log(`Multi-key parallelism: ${deepseekApiKeys.length}x speedup available`);

    const results: Record<string, any> = {};

    // Utility functions
    const isUntranslatableContent = (value: string): boolean => {
      if (!value || value.trim() === '') return true;
      const trimmed = value.trim();
      if (/^[\d\-\/\+\.\s\:x×]+$/.test(trimmed)) return true;
      if (/^[A-Z0-9\-\/\+\.]+$/.test(trimmed) && trimmed.length <= 10) return true;
      if (/^[\d\-\+≤≥<>~\s\°CkmghzHZmMAWV\/xP]+$/i.test(trimmed)) return true;
      return false;
    };
    
    const containsChinese = (str: string): boolean => {
      return /[\u4e00-\u9fa5]/.test(str);
    };
    
    const languagesWithKanji = new Set(['ja', 'zh']);
    
    const isValidTranslationForLang = (source: string, translation: string, targetLang: string): boolean => {
      if (!translation || translation.trim() === '') return false;
      if (translation.startsWith('__')) return true;
      if (isUntranslatableContent(source)) return true;
      
      if (targetLang === 'ja') {
        if (/[\u3040-\u309f\u30a0-\u30ff]/.test(translation)) return true;
        if (translation !== source) return true;
        if (containsChinese(source) && translation === source) return true;
        return isUntranslatableContent(source);
      }
      
      if (targetLang === 'ko') {
        if (/[\uac00-\ud7af\u1100-\u11ff]/.test(translation)) return true;
        if (translation !== source && !containsChinese(translation)) return true;
        return isUntranslatableContent(source);
      }
      
      if (containsChinese(source) && !containsChinese(translation)) return true;
      if (containsChinese(translation)) return false;
      if (!containsChinese(source) && translation !== source) return true;
      if (!containsChinese(source) && translation === source) {
        return isUntranslatableContent(source);
      }
      
      return true;
    };

    // Process all languages in parallel if we have enough keys
    const languagesToProcess = languages.filter(l => l !== 'zh' && l !== 'en');
    
    // With multiple keys, we can process multiple languages simultaneously
    const processLanguage = async (lang: string) => {
      try {
        console.log(`Starting translation for ${lang}...`);
        
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
        
        let contentToTranslate = actualSourceContent;
        if (mode === 'incremental') {
          const translatedKeysSet = new Set<string>();
          
          for (const [key, value] of Object.entries(existingTranslations)) {
            const sourceValue = actualSourceContent[key];
            if (!sourceValue) continue;
            if (isValidTranslationForLang(sourceValue, value, lang)) {
              translatedKeysSet.add(key);
            }
          }
          
          for (const [key, value] of Object.entries(actualSourceContent)) {
            const valueStr = value as string;
            if (!existingTranslations[key] && isUntranslatableContent(valueStr)) {
              existingTranslations[key] = valueStr;
              translatedKeysSet.add(key);
            }
          }
          
          const remainingKeys = Object.keys(actualSourceContent).filter(key => {
            if (forceKeysSet.has(key) && !translatedKeysSet.has(key)) return true;
            return !translatedKeysSet.has(key);
          });
          
          console.log(`  - Valid translations: ${translatedKeysSet.size}/${totalSourceKeys}`);
          console.log(`  - Keys needing translation: ${remainingKeys.length}`);
          
          if (remainingKeys.length === 0) {
            console.log(`All translations already completed for ${lang}`);
            await supabase
              .from('system_settings')
              .upsert({
                key: `translations_${lang}`,
                value: JSON.stringify(existingTranslations),
                updated_at: new Date().toISOString()
              });
            
            return {
              lang,
              success: true,
              translated: 0,
              count: 0,
              remaining: 0,
              total: totalSourceKeys,
              existing: Object.keys(existingTranslations).length,
              message: 'Already completed'
            };
          }
          
          contentToTranslate = Object.fromEntries(
            remainingKeys.map(k => [k, actualSourceContent[k]])
          );
        }
        
        let newTranslations: Record<string, string>;
        let usedProvider = 'deepseek';
        
        if (deepseekApiKeys.length > 0) {
          try {
            newTranslations = await translateWithDeepSeek(contentToTranslate, lang, deepseekApiKeys);
          } catch (deepseekError) {
            console.error(`DeepSeek failed for ${lang}, falling back to Lovable AI:`, deepseekError);
            if (!LOVABLE_API_KEY) throw deepseekError;
            newTranslations = await translateWithLovableAI(contentToTranslate, lang, LOVABLE_API_KEY);
            usedProvider = 'lovable';
          }
        } else {
          newTranslations = await translateWithLovableAI(contentToTranslate, lang, LOVABLE_API_KEY!);
          usedProvider = 'lovable';
        }
        
        const mergedTranslations = { ...existingTranslations, ...newTranslations };
        
        await supabase
          .from('system_settings')
          .upsert({
            key: `translations_${lang}`,
            value: JSON.stringify(mergedTranslations),
            updated_at: new Date().toISOString()
          });
        
        // 重新计算剩余未翻译的键数
        const translatedKeysAfter = new Set<string>();
        for (const [key, value] of Object.entries(mergedTranslations)) {
          const sourceValue = actualSourceContent[key];
          if (!sourceValue) continue;
          if (isValidTranslationForLang(sourceValue, value, lang)) {
            translatedKeysAfter.add(key);
          }
        }
        
        const remainingAfter = Object.keys(actualSourceContent).filter(key => {
          if (forceKeysSet.has(key) && !translatedKeysAfter.has(key)) return true;
          return !translatedKeysAfter.has(key);
        }).length;
        
        console.log(`✓ ${lang}: Saved ${Object.keys(mergedTranslations).length} total translations, ${remainingAfter} remaining (provider: ${usedProvider})`);
        
        return {
          lang,
          success: true,
          translated: Object.keys(newTranslations).length,
          count: Object.keys(newTranslations).length,
          remaining: remainingAfter,
          total: totalSourceKeys,
          provider: usedProvider
        };
      } catch (error) {
        console.error(`Translation failed for ${lang}:`, error);
        return {
          lang,
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error'
        };
      }
    };

    // Process languages with smart parallelism
    // With 7+ keys, we can process 2-3 languages in parallel
    const parallelLanguages = Math.min(Math.ceil(deepseekApiKeys.length / 3), 3);
    console.log(`Processing ${languagesToProcess.length} languages with ${parallelLanguages}-way parallelism`);

    for (let i = 0; i < languagesToProcess.length; i += parallelLanguages) {
      const batch = languagesToProcess.slice(i, i + parallelLanguages);
      const batchResults = await Promise.all(batch.map(processLanguage));
      for (const result of batchResults) {
        results[result.lang] = result;
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        results,
        totalLanguages: languagesToProcess.length,
        keysAvailable: deepseekApiKeys.length,
        mode
      }),
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
