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
    const { title, content, category, coverImage, isEnglish = true } = await req.json();

    if (!title || !content) {
      return new Response(
        JSON.stringify({ success: false, error: "Title and content are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const lovableApiKey = Deno.env.get("LOVABLE_API_KEY");
    
    const categoryStyles: Record<string, string> = {
      "公司新闻": "正式、专业、强调企业实力和国际影响力",
      "行业动态": "客观、全面、有深度分析，关注国际政策和市场趋势",
      "产品资讯": "详细、技术性、突出产品特点和创新之处，介绍产品功能、规格参数和典型应用场景",
      "技术分享": "专业科普、深入浅出，解释技术原理和工作方式，适合技术爱好者阅读，包含What/Why/How的内容结构",
    };

    const style = categoryStyles[category] || categoryStyles["行业动态"];

    // 根据是否为英文内容，调整提示词
    const translationInstruction = isEnglish 
      ? `这是一篇英文原文，请将其翻译成专业流畅的中文，并进行编辑润色。翻译时注意：
         - 专业术语保持准确，可在首次出现时保留英文原文
         - 公司名称、产品名称可保留英文或翻译（如有约定俗成的译法）
         - 数据、数字保持原文准确性
         - 语言要符合中国读者的阅读习惯`
      : `这是一篇中文原文，请进行编辑润色。`;

    const prompt = `你是一位资深的无人机行业编辑，专门为专业无人机技术公司的官网编写新闻稿。

${translationInstruction}

【原始标题】${title}

【原始内容】${content.substring(0, 5000)}

【目标分类】${category || "行业动态"}

【写作风格】${style}

【要求】
1. 新标题：专业有吸引力的中文标题，不超过35字
2. 摘要：100-150字中文摘要，概括核心要点
3. 正文：800-1500字中文正文，结构清晰，使用以下HTML标签：<p>, <h3>, <strong>, <ul>, <li>
4. 不要包含任何URL、图片链接
5. 提取5个中文关键词
6. 如果原文涉及具体数据、时间、公司名称，请准确保留

以JSON格式返回：
{"title":"中文标题","summary":"中文摘要","content":"HTML格式中文正文","keywords":["关键词1","关键词2","关键词3","关键词4","关键词5"]}`;

    let result;
    
    if (lovableApiKey) {
      try {
        console.log("Calling AI for translation and rewrite...");
        const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${lovableApiKey}`,
          },
          body: JSON.stringify({
            model: "google/gemini-2.5-flash-lite",
            messages: [{ role: "user", content: prompt }],
          }),
        });

        if (response.ok) {
          const data = await response.json();
          const aiContent = data.choices?.[0]?.message?.content || "";
          
          const jsonMatch = aiContent.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            result = JSON.parse(jsonMatch[0]);
            console.log("AI translation and rewrite successful");
          }
        } else {
          const errorText = await response.text();
          console.error("AI API error:", response.status, errorText);
        }
      } catch (aiError) {
        console.error("AI API failed:", aiError);
      }
    }

    // 回退处理
    if (!result || !result.title || !result.content) {
      console.log("Using fallback processing");
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
        keywords: [category || "无人机", "国际动态", "行业新闻"],
      };
    }

    // 清理结果中的URL
    result.content = result.content
      .replace(/https?:\/\/[^\s<>"']+/g, '')
      .replace(/!\[.*?\]\(.*?\)/g, '')
      .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1');

    // 保留传入的配图
    result.coverImage = coverImage || null;

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