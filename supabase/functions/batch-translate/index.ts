import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.90.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const languageNames: Record<string, string> = {
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

async function translateWithDoubao(
  content: Record<string, string>,
  targetLang: string,
  apiKey: string
): Promise<Record<string, string>> {
  const targetLangName = languageNames[targetLang] || targetLang;
  
  const systemPrompt = `You are a professional translator for a drone technology company called CANI (长凌科技). 
Translate the following JSON content from Chinese to ${targetLangName}.

IMPORTANT RULES:
1. Maintain the exact same JSON structure and keys
2. Only translate the values, never the keys
3. Keep technical terms accurate (drone, FPV, VTX, ESC, etc.)
4. Maintain the professional and technical tone
5. Keep brand names like "CANI" and "长凌" unchanged
6. For UI text, keep it concise and user-friendly
7. Return ONLY valid JSON, no explanations`;

  const entries = Object.entries(content);
  const chunkSize = 50;
  const chunks: [string, string][][] = [];
  
  for (let i = 0; i < entries.length; i += chunkSize) {
    chunks.push(entries.slice(i, i + chunkSize) as [string, string][]);
  }

  const translatedContent: Record<string, string> = {};

  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i];
    const contentToTranslate = Object.fromEntries(chunk);

    console.log(`Translating chunk ${i + 1}/${chunks.length} for ${targetLang}...`);

    const response = await fetch('https://ark.cn-beijing.volces.com/api/v3/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'doubao-seed-1-6-lite-251015',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: JSON.stringify(contentToTranslate) },
        ],
        max_completion_tokens: 8192,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Doubao API error:', response.status, errorText);
      throw new Error(`Doubao API error: ${response.status}`);
    }

    const data = await response.json();
    const translatedText = data.choices?.[0]?.message?.content;

    if (!translatedText) {
      throw new Error('No translation returned');
    }

    let cleanedText = translatedText.trim();
    if (cleanedText.startsWith('```json')) cleanedText = cleanedText.slice(7);
    if (cleanedText.startsWith('```')) cleanedText = cleanedText.slice(3);
    if (cleanedText.endsWith('```')) cleanedText = cleanedText.slice(0, -3);
    cleanedText = cleanedText.trim();

    try {
      const parsed = JSON.parse(cleanedText);
      Object.assign(translatedContent, parsed);
    } catch (parseError) {
      console.error('JSON parse error:', parseError, 'Response:', cleanedText);
      throw new Error(`Failed to parse translation response for ${targetLang}`);
    }

    // Rate limiting
    if (i < chunks.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  return translatedContent;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { sourceContent, languages } = await req.json();

    if (!sourceContent || !languages || !Array.isArray(languages)) {
      return new Response(
        JSON.stringify({ error: 'Missing sourceContent or languages array' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const DOUBAO_API_KEY = Deno.env.get('DOUBAO_API_KEY');
    if (!DOUBAO_API_KEY) {
      throw new Error('DOUBAO_API_KEY is not configured');
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    const results: Record<string, any> = {};
    const errors: Record<string, string> = {};

    for (const lang of languages) {
      if (lang === 'zh' || lang === 'en') {
        continue; // Skip source languages
      }

      try {
        console.log(`Starting translation for ${lang}...`);
        const translations = await translateWithDoubao(sourceContent, lang, DOUBAO_API_KEY);
        
        // Save to system_settings table
        const { error: upsertError } = await supabase
          .from('system_settings')
          .upsert({
            key: `translations_${lang}`,
            value: JSON.stringify(translations),
            description: `Static translations for ${languageNames[lang] || lang}`,
            updated_at: new Date().toISOString(),
          }, { onConflict: 'key' });

        if (upsertError) {
          throw upsertError;
        }

        results[lang] = {
          success: true,
          count: Object.keys(translations).length,
        };
        console.log(`Completed translation for ${lang}: ${Object.keys(translations).length} keys`);
      } catch (error) {
        console.error(`Error translating ${lang}:`, error);
        errors[lang] = error instanceof Error ? error.message : 'Unknown error';
        results[lang] = { success: false, error: errors[lang] };
      }

      // Delay between languages
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    return new Response(
      JSON.stringify({ 
        success: true,
        results,
        errors: Object.keys(errors).length > 0 ? errors : undefined,
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
