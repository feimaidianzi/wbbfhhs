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

async function translateWithDoubao(
  content: Record<string, string>,
  sourceLangName: string,
  targetLangName: string,
  apiKey: string
): Promise<Record<string, string>> {
  const systemPrompt = `You are a professional translator for a drone technology company called CANI (长凌科技). 
Translate the following JSON content from ${sourceLangName} to ${targetLangName}.

IMPORTANT RULES:
1. Maintain the exact same JSON structure and keys
2. Only translate the values, never the keys
3. Keep technical terms accurate (drone, FPV, VTX, ESC, etc.)
4. Maintain the professional and technical tone
5. Keep brand names like "CANI" and "长凌" unchanged
6. For UI text, keep it concise and user-friendly
7. Return ONLY valid JSON, no explanations`;

  // Split content into chunks to avoid token limits
  const entries = Object.entries(content);
  const chunkSize = 10; // Match batch-translate optimization
  const chunks: [string, string][][] = [];
  
  for (let i = 0; i < entries.length; i += chunkSize) {
    chunks.push(entries.slice(i, i + chunkSize) as [string, string][]);
  }

  const translatedContent: Record<string, string> = {};

  for (const chunk of chunks) {
    const contentToTranslate = Object.fromEntries(chunk);

    // Retry logic
    let retryCount = 0;
    const maxRetries = 2;
    let response;
    
    while (retryCount <= maxRetries) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 150000);
        
        response = await fetch('https://ark.cn-beijing.volces.com/api/v3/chat/completions', {
          signal: controller.signal,
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
        }).finally(() => clearTimeout(timeoutId));
        
        if (response.ok) break;
        
        retryCount++;
        if (retryCount <= maxRetries) {
          await new Promise(resolve => setTimeout(resolve, 2000));
        }
      } catch (fetchError) {
        retryCount++;
        if (retryCount <= maxRetries) {
          await new Promise(resolve => setTimeout(resolve, 2000));
        } else {
          throw fetchError;
        }
      }
    }

    if (!response || !response.ok) {
      const errorText = response ? await response.text() : 'No response';
      throw new Error(`Doubao API error after retries: ${response?.status} - ${errorText}`);
    }

    const data = await response.json();
    const translatedText = data.choices?.[0]?.message?.content;

    if (!translatedText) {
      throw new Error('No translation returned from Doubao');
    }

    // Parse the translated JSON
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

  }

  return translatedContent;
}

async function translateWithLovableAI(
  content: Record<string, string>,
  sourceLangName: string,
  targetLangName: string,
  apiKey: string
): Promise<Record<string, string>> {
  const systemPrompt = `You are a professional translator for a drone technology company called CANI (长凌科技). 
Translate the following JSON content from ${sourceLangName} to ${targetLangName}.

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

  for (const chunk of chunks) {
    const contentToTranslate = Object.fromEntries(chunk);

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
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
      throw new Error(`Lovable AI error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    const translatedText = data.choices?.[0]?.message?.content;

    if (!translatedText) {
      throw new Error('No translation returned from Lovable AI');
    }

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

    if (chunks.length > 1) {
      await new Promise(resolve => setTimeout(resolve, 300));
    }
  }

  return translatedContent;
}

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

    const targetLangName = languageNames[targetLanguage] || targetLanguage;
    const sourceLangName = languageNames[sourceLanguage] || 'Chinese';

    let translatedContent: Record<string, string>;
    let usedProvider = 'doubao';

    // Try Doubao first
    const DOUBAO_API_KEY = Deno.env.get('DOUBAO_API_KEY');
    if (DOUBAO_API_KEY) {
      try {
        console.log('Attempting translation with Doubao...');
        translatedContent = await translateWithDoubao(content, sourceLangName, targetLangName, DOUBAO_API_KEY);
        console.log('Doubao translation successful');
      } catch (doubaoError) {
        console.error('Doubao translation failed, falling back to Lovable AI:', doubaoError);
        
        // Fallback to Lovable AI
        const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
        if (!LOVABLE_API_KEY) {
          throw new Error('Both Doubao and Lovable AI are not available');
        }
        
        translatedContent = await translateWithLovableAI(content, sourceLangName, targetLangName, LOVABLE_API_KEY);
        usedProvider = 'lovable';
        console.log('Lovable AI translation successful');
      }
    } else {
      // No Doubao key, use Lovable AI directly
      const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
      if (!LOVABLE_API_KEY) {
        throw new Error('No translation service available');
      }
      
      translatedContent = await translateWithLovableAI(content, sourceLangName, targetLangName, LOVABLE_API_KEY);
      usedProvider = 'lovable';
    }

    return new Response(
      JSON.stringify({ 
        translations: translatedContent,
        targetLanguage,
        count: Object.keys(translatedContent).length,
        provider: usedProvider,
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
