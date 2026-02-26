import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
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

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Require authenticated admin user
    const authHeader = req.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
    const supabaseAuth = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!,
      { global: { headers: { Authorization: authHeader } } }
    );
    const tokenStr = authHeader.replace('Bearer ', '');
    const { data: claimsData, error: claimsError } = await supabaseAuth.auth.getClaims(tokenStr);
    if (claimsError || !claimsData?.claims) {
      return new Response(JSON.stringify({ error: 'Invalid token' }), {
        status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
    const { data: isAdmin } = await supabaseAuth.rpc('has_role', { _user_id: claimsData.claims.sub, _role: 'admin' });
    if (!isAdmin) {
      return new Response(JSON.stringify({ error: 'Forbidden: admin access required' }), {
        status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const { sourceLanguage, targetLanguage, content } = await req.json();

    if (!targetLanguage || !content) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const targetLangName = languageNames[targetLanguage] || targetLanguage;
    const sourceLangName = languageNames[sourceLanguage] || 'Chinese';

    const DOUBAO_API_KEY = Deno.env.get('DOUBAO_API_KEY');
    if (!DOUBAO_API_KEY) {
      throw new Error('DOUBAO_API_KEY not configured');
    }

    console.log('Translating with Doubao...');
    const translatedContent = await translateWithDoubao(content, sourceLangName, targetLangName, DOUBAO_API_KEY);
    console.log('Doubao translation successful');

    return new Response(
      JSON.stringify({ 
        translations: translatedContent,
        targetLanguage,
        count: Object.keys(translatedContent).length,
        provider: 'doubao',
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
