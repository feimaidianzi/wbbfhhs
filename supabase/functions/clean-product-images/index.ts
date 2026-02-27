import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { imageUrls } = await req.json();
    if (!imageUrls?.length) {
      return new Response(JSON.stringify({ error: "imageUrls array required" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
    const results: Array<{ original: string; cleaned: string | null; error?: string }> = [];

    for (let i = 0; i < imageUrls.length; i++) {
      const imageUrl = imageUrls[i];
      try {
        console.log(`[${i+1}/${imageUrls.length}] Processing: ${imageUrl}`);

        // 1. Fetch image
        const resp = await fetch(imageUrl);
        if (!resp.ok) { results.push({ original: imageUrl, cleaned: null, error: `Fetch ${resp.status}` }); continue; }
        const buf = await resp.arrayBuffer();
        const ct = resp.headers.get("content-type") || "image/jpeg";
        console.log(`Fetched ${buf.byteLength} bytes (${ct})`);

        // 2. Upload original to storage for Gemini URL access
        const pathname = new URL(imageUrl).pathname;
        const fname = pathname.split("/").pop() || `img-${i}.jpg`;
        const origPath = `logistics/originals/${fname}`;
        await supabase.storage.from("product-images").upload(origPath, buf, { contentType: ct, upsert: true });
        const { data: pubData } = supabase.storage.from("product-images").getPublicUrl(origPath);
        const pubUrl = pubData.publicUrl;
        console.log("Public URL:", pubUrl);

        // 3. Call Gemini to remove logo/text using URL
        const editPrompt = `This drone product image has a blue logo/watermark. Remove the blue logo and ALL text, Chinese characters, English text, brand names, watermarks, labels, and annotations. Fill removed areas with surrounding background naturally. Keep the drone intact. Output a clean product photo.`;

        const geminiResp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
          method: "POST",
          headers: { Authorization: `Bearer ${LOVABLE_API_KEY}`, "Content-Type": "application/json" },
          body: JSON.stringify({
            model: "google/gemini-2.5-flash-image",
            messages: [{
              role: "user",
              content: [
                { type: "text", text: editPrompt },
                { type: "image_url", image_url: { url: pubUrl } },
              ],
            }],
            modalities: ["image", "text"],
          }),
          signal: AbortSignal.timeout(120000),
        });

        if (!geminiResp.ok) {
          const errText = await geminiResp.text();
          console.error(`Gemini error ${geminiResp.status}:`, errText);
          results.push({ original: imageUrl, cleaned: null, error: `Gemini ${geminiResp.status}` });
          continue;
        }

        const geminiData = await geminiResp.json();
        const editedUrl = geminiData.choices?.[0]?.message?.images?.[0]?.image_url?.url;
        if (!editedUrl?.startsWith("data:image/")) {
          results.push({ original: imageUrl, cleaned: null, error: "No image returned" });
          continue;
        }

        // 4. Upload cleaned image
        const b64Match = editedUrl.match(/^data:image\/(\w+);base64,(.+)$/);
        if (!b64Match) { results.push({ original: imageUrl, cleaned: null, error: "Bad base64" }); continue; }

        const ext = b64Match[1] === "jpeg" ? "jpg" : b64Match[1];
        const binary = atob(b64Match[2]);
        const bytes = new Uint8Array(binary.length);
        for (let j = 0; j < binary.length; j++) bytes[j] = binary.charCodeAt(j);

        const cleanName = fname.replace(/\.[^.]+$/, "") + `-clean.${ext}`;
        const cleanPath = `logistics/${cleanName}`;
        const { error: upErr } = await supabase.storage.from("product-images").upload(cleanPath, bytes.buffer, {
          contentType: `image/${b64Match[1]}`, upsert: true,
        });

        if (upErr) { results.push({ original: imageUrl, cleaned: null, error: upErr.message }); continue; }

        const { data: cleanPubData } = supabase.storage.from("product-images").getPublicUrl(cleanPath);
        console.log(`Done: ${cleanPubData.publicUrl}`);
        results.push({ original: imageUrl, cleaned: cleanPubData.publicUrl });

        if (i < imageUrls.length - 1) await new Promise(r => setTimeout(r, 3000));
      } catch (e) {
        results.push({ original: imageUrl, cleaned: null, error: e instanceof Error ? e.message : "Unknown" });
      }
    }

    return new Response(JSON.stringify({ results }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
