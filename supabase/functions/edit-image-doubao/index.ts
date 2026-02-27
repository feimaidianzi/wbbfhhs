const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { imageUrl, prompt, size } = await req.json();
    const DOUBAO_API_KEY = Deno.env.get('DOUBAO_API_KEY');
    if (!DOUBAO_API_KEY) throw new Error('DOUBAO_API_KEY not configured');

    console.log('Calling Doubao Seedream 4.0 for image editing...');
    console.log('Image URL:', imageUrl);
    console.log('Prompt:', prompt);

    const response = await fetch('https://ark.cn-beijing.volces.com/api/v3/images/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DOUBAO_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'doubao-seedream-4-0-250828',
        prompt: prompt,
        image_urls: [imageUrl],
        size: size || '2048x2048',
        response_format: 'url',
        watermark: false,
      }),
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
