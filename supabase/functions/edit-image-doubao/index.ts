const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { imageUrl, prompt, model } = await req.json();
    const DOUBAO_API_KEY = Deno.env.get('DOUBAO_API_KEY');
    if (!DOUBAO_API_KEY) throw new Error('DOUBAO_API_KEY not configured');

    const modelId = model || 'doubao-seededit-3-0-i2i-250628';
    console.log(`Using model: ${modelId}, prompt: ${prompt}`);

    // Seededit 3.0 uses "image" param (single image), Seedream uses "image_urls"
    const isSeededit = modelId.includes('seededit');
    
    const body: Record<string, unknown> = {
      model: modelId,
      prompt: prompt,
      response_format: 'url',
      watermark: false,
    };

    if (isSeededit) {
      body.image = imageUrl;
      body.size = 'adaptive'; // Seededit only supports adaptive
      body.guidance_scale = 5.5;
    } else {
      body.image_urls = [imageUrl];
      body.size = '2048x1024';
    }

    const response = await fetch('https://ark.cn-beijing.volces.com/api/v3/images/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DOUBAO_API_KEY}`,
      },
      body: JSON.stringify(body),
    });

    const responseText = await response.text();
    console.log('Response status:', response.status);
    console.log('Response:', responseText.substring(0, 500));

    if (!response.ok) {
      return new Response(JSON.stringify({ 
        error: 'Doubao API error', 
        status: response.status,
        detail: responseText 
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const data = JSON.parse(responseText);
    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (e) {
    console.error('Error:', e);
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
