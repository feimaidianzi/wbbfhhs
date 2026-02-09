

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ContentSection {
  key: string;
  originalText: string;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const DOUBAO_API_KEY = Deno.env.get("DOUBAO_API_KEY");
    if (!DOUBAO_API_KEY) {
      throw new Error("DOUBAO_API_KEY is not configured");
    }

    const { sections } = await req.json() as { sections: ContentSection[] };

    const systemPrompt = `你是一位专业的科技企业文案专家，专注于无人机行业。你需要重写网站内容，使其更具差异化、更专业、更具行业专家气质。

要求：
1. 定位：行业专家、技术领先者
2. 语气：专业自信、有深度、不浮夸
3. 特点：强调行业经验、技术积累、解决方案能力
4. 避免：通用化表达、与同行雷同的文案
5. 风格：简洁有力、突出核心价值
6. 必须保持中文输出

返回格式要求：
返回一个JSON对象，key与输入保持一致，value为重写后的文案。`;

    const userPrompt = `请重写以下网站内容，使其更具差异化和行业专家气质：

${sections.map(s => `【${s.key}】：${s.originalText}`).join('\n\n')}

请返回JSON格式：
{
  "${sections.map(s => s.key).join('": "重写后的文案",\n  "')}" : "重写后的文案"
}`;

    console.log("Calling Doubao API to rewrite content...");
    
    const response = await fetch("https://ark.cn-beijing.volces.com/api/v3/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${DOUBAO_API_KEY}`,
      },
      body: JSON.stringify({
        model: "doubao-pro-32k",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.7,
        max_tokens: 4000,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Doubao API error:", response.status, errorText);
      throw new Error(`Doubao API error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error("No content in response");
    }

    console.log("Doubao response:", content);

    // Parse JSON from response
    let rewrittenContent: Record<string, string> = {};
    try {
      // Try to extract JSON from the response
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        rewrittenContent = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("No JSON found in response");
      }
    } catch (parseError) {
      console.error("JSON parse error:", parseError);
      // Return original content if parsing fails
      sections.forEach(s => {
        rewrittenContent[s.key] = s.originalText;
      });
    }

    return new Response(JSON.stringify({ success: true, content: rewrittenContent }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ success: false, error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
