import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { title, content, category } = await req.json();

    if (!title || !content) {
      return new Response(
        JSON.stringify({ success: false, error: "Title and content are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // 使用 Google Gemini API 通过 OpenRouter
    const lovableApiKey = Deno.env.get("LOVABLE_API_KEY");
    
    const categoryStyles: Record<string, string> = {
      "公司新闻": "正式、专业、强调企业实力和行业影响力",
      "行业动态": "客观、全面、有深度分析和行业洞察",
      "产品资讯": "详细、技术性、突出产品特点和创新之处",
      "技术分享": "专业、深入、注重技术细节和应用价值",
    };

    const style = categoryStyles[category] || categoryStyles["行业动态"];

    const prompt = `你是一位资深的无人机行业编辑。请将以下素材改写成一篇专业的新闻稿件。

【原始标题】${title}

【原始内容】${content.substring(0, 4000)}

【目标分类】${category || "行业动态"}

【写作风格】${style}

【要求】
1. 新标题：专业有吸引力，不超过35字
2. 摘要：100-150字，概括核心要点
3. 正文：800-1200字，结构清晰，使用以下HTML标签：<p>, <h3>, <strong>, <ul>, <li>
4. 不要包含任何URL、图片链接
5. 提取5个关键词

以JSON格式返回：
{"title":"","summary":"","content":"","keywords":["","","","",""]}`;

    let result;
    
    if (lovableApiKey) {
      try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${lovableApiKey}`,
            "HTTP-Referer": "https://lovable.dev",
          },
          body: JSON.stringify({
            model: "google/gemini-2.5-flash-lite-preview-06-17",
            messages: [{ role: "user", content: prompt }],
            max_tokens: 3000,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          const aiContent = data.choices?.[0]?.message?.content || "";
          
          const jsonMatch = aiContent.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            result = JSON.parse(jsonMatch[0]);
          }
        }
      } catch (aiError) {
        console.error("AI API failed:", aiError);
      }
    }

    // 回退处理
    if (!result || !result.title || !result.content) {
      const cleanTitle = title.length > 35 ? title.substring(0, 35) + "..." : title;
      const cleanContent = content
        .replace(/https?:\/\/[^\s]+/g, '')
        .replace(/!\[.*?\]\(.*?\)/g, '')
        .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1');
      
      const paragraphs = cleanContent.split(/\n{2,}/).filter((p: string) => p.trim().length > 30);
      const htmlContent = paragraphs.slice(0, 10).map((p: string) => `<p>${p.trim()}</p>`).join('\n');
      
      result = {
        title: cleanTitle,
        summary: cleanContent.substring(0, 150).replace(/\n/g, ' ') + "...",
        content: htmlContent || `<p>${cleanContent.substring(0, 1000)}</p>`,
        keywords: [category || "无人机", "行业动态"],
      };
    }

    // 清理结果中的URL
    result.content = result.content
      .replace(/https?:\/\/[^\s<>"']+/g, '')
      .replace(/!\[.*?\]\(.*?\)/g, '')
      .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1');

    return new Response(
      JSON.stringify({ success: true, data: result }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ success: false, error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
