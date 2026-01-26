import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Language code to name mapping
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

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { sourceLanguage, targetLanguage, content } = await req.json();

    if (!targetLanguage || !content) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    const targetLangName = languageNames[targetLanguage] || targetLanguage;
    const sourceLangName = languageNames[sourceLanguage] || 'Chinese';

    // Split content into chunks to avoid token limits
    const entries = Object.entries(content);
    const chunkSize = 50; // Translate 50 keys at a time
    const chunks: [string, string][][] = [];
    
    for (let i = 0; i < entries.length; i += chunkSize) {
      chunks.push(entries.slice(i, i + chunkSize) as [string, string][]);
    }

    const translatedContent: Record<string, string> = {};

    for (const chunk of chunks) {
      const contentToTranslate = Object.fromEntries(chunk);

      const systemPrompt = `You are a professional translator for a drone technology company called CANI (长凌科技). 
Translate the following JSON content from ${sourceLangName} to ${targetLangName}.

IMPORTANT RULES:
1. Maintain the exact same JSON structure and keys
2. Only translate the values, never the keys
3. Keep technical terms accurate (drone, FPV, VTX, ESC, etc.)
4. Maintain the professional and technical tone
5. Keep brand names like "CANI" and "长凌" unchanged
6. For UI text, keep it concise and user-friendly
7. Return ONLY valid JSON, no explanations

Example input:
{"nav.home": "首页", "product.drone": "无人机"}

Example output for Vietnamese:
{"nav.home": "Trang chủ", "product.drone": "Máy bay không người lái"}`;

      const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'google/gemini-2.5-flash',
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
        console.error('Lovable AI API error:', response.status, errorText);
        if (response.status === 429) {
          return new Response(
            JSON.stringify({ error: 'Rate limit exceeded, please try again later' }),
            { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }
        if (response.status === 402) {
          return new Response(
            JSON.stringify({ error: 'AI credits exhausted, please add credits' }),
            { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }
        throw new Error(`Lovable AI API error: ${response.status}`);
      }

      const data = await response.json();
      const translatedText = data.choices?.[0]?.message?.content;

      if (!translatedText) {
        throw new Error('No translation returned from AI');
      }

      // Parse the translated JSON
      try {
        // Clean up the response - remove markdown code blocks if present
        let cleanedText = translatedText.trim();
        if (cleanedText.startsWith('```json')) {
          cleanedText = cleanedText.slice(7);
        }
        if (cleanedText.startsWith('```')) {
          cleanedText = cleanedText.slice(3);
        }
        if (cleanedText.endsWith('```')) {
          cleanedText = cleanedText.slice(0, -3);
        }
        cleanedText = cleanedText.trim();

        const parsed = JSON.parse(cleanedText);
        Object.assign(translatedContent, parsed);
      } catch (parseError) {
        console.error('Failed to parse translation:', translatedText);
        // If parsing fails, use original content for this chunk
        Object.assign(translatedContent, contentToTranslate);
      }

      // Add a small delay between chunks to avoid rate limiting
      if (chunks.length > 1) {
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }

    return new Response(
      JSON.stringify({ 
        translations: translatedContent,
        targetLanguage,
        count: Object.keys(translatedContent).length,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Translation error:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Translation failed' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
