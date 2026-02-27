const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { imageUrl, prompt, size, model } = await req.json();
    const DOUBAO_API_KEY = Deno.env.get('DOUBAO_API_KEY');
    if (!DOUBAO_API_KEY) throw new Error('DOUBAO_API_KEY not configured');

    const selectedModel = model || 'doubao-seedream-5-0-260128';
    const isSeedream5 = selectedModel.includes('seedream-5');

    console.log(`Calling Doubao ${selectedModel} for image processing...`);
    console.log('Prompt:', prompt);
    if (imageUrl) console.log('Image URL:', imageUrl);

    const body: Record<string, unknown> = {
      model: selectedModel,
      prompt: prompt,
      response_format: 'url',
      watermark: false,
    };

    // Seedream 5.0 supports new parameters
    if (isSeedream5) {
      body.size = size || '2K';
      body.sequential_image_generation = 'disabled';
      body.stream = false;
    } else {
      body.size = size || '2048x2048';
    }

    // Add reference image if provided
    if (imageUrl) {
      body.image_urls = [imageUrl];
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
    console.log('Doubao response status:', response.status);
    console.log('Doubao response:', responseText.substring(0, 500));

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
