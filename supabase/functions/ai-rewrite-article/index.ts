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

    const geminiApiKey = Deno.env.get("GEMINI_API_KEY");
    
    const categoryStyles: Record<string, string> = {
      "公司新闻": "正式、专业、强调企业实力和行业地位",
      "行业动态": "客观、全面、有深度分析，关注政策和市场趋势",
      "产品资讯": "详细、技术性、突出产品特点和应用场景",
      "技术分享": "专业科普、深入浅出、解释技术原理，适合技术爱好者",
    };

    const style = categoryStyles[category] || categoryStyles["行业动态"];

    const translationInstruction = isEnglish 
      ? `这是一篇英文原文，请翻译成专业流畅的中文并进行深度编辑。
翻译要求：
- 专业术语保持准确，首次出现时可保留英文
- 公司名、产品名可保留英文
- 数据数字保持准确
- 语言符合中国读者习惯`
      : `这是一篇中文原文，请进行深度编辑润色。`;

    const prompt = `你是一位资深自媒体写手兼无人机行业新闻编辑，为专业无人机技术公司官网撰写高质量、高吸引力的新闻稿。

${translationInstruction}

【原始标题】${title}

【原始内容】${content.substring(0, 6000)}

【目标分类】${category || "行业动态"}

【写作风格】${style}

【标题写作技巧 - 必须使用以下技巧之一】

1. 强调式标题：使用强调词如"刚刚"、"突发"、"重磅"、"震惊"、"必看"等，利用损失厌恶心理吸引读者
   范例：刚刚！无人机新规正式落地，这些变化你必须知道！
   
2. 制造反差：在相邻元素之间创建明显差异以吸引注意力
   范例：我放弃了月薪3万的工作，投身无人机行业，结果让我意外

3. 巧用数字：用具体数字给人清晰、具体、易操作的感觉
   范例：选购FPV图传，你必须知道这5个关键参数

4. 制造悬念：前半部分强吸引力事件，后半部分用反常行为作钩子
   范例：看完这个测试数据，我决定放弃传统图传设备

【重要：网站文章格式规范】

你必须按照以下格式输出专业的网站新闻稿：

1. **标题要求**
   - 必须使用上述4种技巧之一
   - 30字以内，只输出1个最合适的标题
   - 突出新闻价值和关键信息

2. **摘要要求**
   - 100-150字
   - 概括文章核心要点
   - 吸引读者继续阅读

3. **正文结构要求**（必须严格遵守）
   - 总字数：800-1500字
   - 必须分为3-5个清晰的段落
   - 每个段落有明确的主题
   - 使用小标题(h3)分隔不同主题
   
4. **HTML格式规范**
   - 使用 <h3> 作为小标题（2-4个小标题）
   - 使用 <p> 包裹正文段落
   - 使用 <strong> 强调关键词或重要信息（每段1-2处）
   - 如有列举，使用 <ul><li> 有序展示
   - 段落之间要有逻辑衔接

5. **内容质量要求**
   - 开头：直接切入主题，交代事件背景
   - 中间：详细展开，分析意义/影响/技术细节
   - 结尾：总结展望或行业启示
   - 禁止包含任何URL、图片链接、Markdown语法
   - 禁止出现"点击查看"、"详情请见"等网页交互语句
   - 禁止直接复制原文，必须重新组织语言

6. **专业术语处理**
   - 首次出现的英文术语：中文（English）格式
   - 常用缩写可直接使用：UAV、GPS、AI等
   - 专业概念需简要解释

【输出JSON格式】
{
  "title": "中文标题（使用上述技巧，30字以内）",
  "summary": "中文摘要（100-150字）",
  "content": "HTML格式正文（包含h3/p/strong/ul/li标签，800-1500字）",
  "keywords": ["关键词1", "关键词2", "关键词3", "关键词4", "关键词5"]
}

【正文示例结构】
<h3>核心事件/背景介绍</h3>
<p>开篇段落，交代核心新闻内容...</p>

<h3>详细内容/技术细节</h3>
<p>详细展开，包含具体数据、技术参数等。<strong>重点信息</strong>需要强调...</p>

<h3>行业影响/市场分析</h3>
<p>分析本事件对行业的影响...</p>
<ul>
  <li>要点一</li>
  <li>要点二</li>
</ul>

<h3>总结与展望</h3>
<p>总结全文，展望未来发展...</p>

请严格按照以上规范生成专业的新闻稿件。`;

    let result;
    
    if (geminiApiKey) {
      try {
        console.log("Calling Gemini API for translation and rewrite...");
        const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" + geminiApiKey, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 8192,
            },
          }),
        });

        if (response.ok) {
          const data = await response.json();
          const aiContent = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
          
          const jsonMatch = aiContent.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            result = JSON.parse(jsonMatch[0]);
            console.log("Gemini translation and rewrite successful");
          }
        } else {
          const errorText = await response.text();
          console.error("Gemini API error:", response.status, errorText);
        }
      } catch (aiError) {
        console.error("Gemini API failed:", aiError);
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
        keywords: [category || "无人机", "行业动态", "新闻"],
      };
    }

    // 清理结果中的URL和无效内容
    result.content = result.content
      .replace(/https?:\/\/[^\s<>"']+/g, '')
      .replace(/!\[.*?\]\(.*?\)/g, '')
      .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
      .replace(/```[\s\S]*?```/g, '') // 移除代码块
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>') // Markdown粗体转HTML
      .replace(/\*([^*]+)\*/g, '<em>$1</em>') // Markdown斜体转HTML
      .replace(/#{1,6}\s+([^\n]+)/g, '<h3>$1</h3>') // Markdown标题转HTML
      .replace(/-\s+([^\n]+)/g, '<li>$1</li>') // Markdown列表转HTML
      .replace(/(<li>[\s\S]*?<\/li>)+/g, '<ul>$&</ul>'); // 包裹列表

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
