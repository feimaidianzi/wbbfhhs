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
    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY") || "";
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";

    // Auth check - require admin role
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ success: false, error: "Unauthorized" }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }
    const { createClient } = await import("https://esm.sh/@supabase/supabase-js@2");
    const authClient = createClient(supabaseUrl, supabaseAnonKey, { global: { headers: { Authorization: authHeader } } });
    const token = authHeader.replace("Bearer ", "");
    const { data: claimsData, error: claimsError } = await authClient.auth.getClaims(token);
    if (claimsError || !claimsData?.claims) {
      return new Response(JSON.stringify({ success: false, error: "Unauthorized" }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }
    const adminClient = createClient(supabaseUrl, supabaseServiceKey);
    const { data: isAdmin } = await adminClient.rpc("has_role", { _user_id: claimsData.claims.sub, _role: "admin" });
    if (!isAdmin) {
      return new Response(JSON.stringify({ success: false, error: "Forbidden" }), { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const { title, content, category, coverImage, isEnglish = true } = await req.json();

    if (!title || !content) {
      return new Response(
        JSON.stringify({ success: false, error: "Title and content are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const doubaoApiKey = Deno.env.get("DOUBAO_API_KEY");
    
    // CANI产品知识库
    const CANI_KNOWLEDGE = `CANI（长凌科技）专注无人机核心配件：数字图传(VTX/VRX，1.4G/2.4G/5.8G多频段，4K传输，<30ms延迟)、飞控(F7/H7芯片，PID优化)、电调(BLHeli_32，48KHz PWM)、ELRS遥控(50km+，500Hz)、吊舱/云台(三轴稳定，IP67)、GPS模块(双频RTK，厘米级精度)、FPV眼镜/接收屏。`;

    // 分类专用角色与指令
    const categoryPrompts: Record<string, { persona: string; instructions: string }> = {
      "公司新闻": {
        persona: "CANI品牌公关总监",
        instructions: `【改写策略 - 多维延展】
- 用户视角：产品/事件如何解决用户实际痛点
- 技术视角：深度解析设计逻辑和技术创新
- 行业视角：释放了行业发展的哪些信号
- 每篇必须提及至少2个CANI产品系列
- 语气正式但不生硬，有温度感`,
      },
      "行业动态": {
        persona: "无人机行业资深观察员",
        instructions: `【改写策略 - 重构二次创作】
- 核心快讯（150字内）：三句话概括背景、核心人物/公司、结果
- 深度解读（300字）：分析对无人机配件（图传、飞控、电调）的影响
- CANI视角（150字）：自然提及CANI技术储备
- 禁止"据报道"、"近期"等采集痕迹词汇
- 第一句话必须直接切入主题`,
      },
      "技术分享": {
        persona: "CANI首席技术专家（CTO）",
        instructions: `【改写策略 - 知识库重组】
- 去同质化：删除常识性废话，直接切入核心技术逻辑
- 知识注入：将通用方案替换为CANI的技术路径
  - 图传→CANI低延迟(<30ms)、4K、多频段抗干扰
  - 飞控→CANI F7/H7芯片、PID算法优化
  - 电调→CANI BLHeli_32、48KHz PWM
  - 遥控→CANI ELRS的LoRa调制、50km+距离
- 专业口吻：使用射频调度、PID算法等术语
- 保留所有原文技术参数，不要丢失
- 必须包含"CANI专家点评"段落`,
      },
    };

    const categoryConfig = categoryPrompts[category] || categoryPrompts["行业动态"];
    const style = categoryConfig.instructions;

    const translationInstruction = isEnglish 
      ? `这是一篇英文原文，请翻译成专业流畅的中文并进行深度编辑。
翻译要求：
- 专业术语保持准确，首次出现时可保留英文
- 公司名、产品名可保留英文
- 数据数字保持准确
- 语言符合中国读者习惯`
      : `这是一篇中文原文，请进行深度编辑润色。`;

    const prompt = `你现在是${categoryConfig.persona}。

${CANI_KNOWLEDGE}

${translationInstruction}

【原始标题】${title}

【原始内容】${content.substring(0, 6000)}

【目标分类】${category || "行业动态"}

${style}

【标题写作技巧 - 必须使用以下技巧之一】
1. 强调式：使用"重磅"、"突破"、"必看"等词
2. 巧用数字：具体数字给人清晰感
3. 制造悬念：前半吸引力事件，后半反常行为作钩子
4. 专业问答式：以目标用户核心问题为标题

【HTML格式规范】
- <h3> 小标题（2-4个）
- <p> 正文段落
- <strong> 强调关键词（每段1-2处）
- <ul><li> 有序展示列举内容
- 禁止包含任何URL、图片链接、Markdown语法
- 禁止"据报道"、"近期"、"点击查看"等采集/交互痕迹词汇
- 第一句话必须直接切入主题

【内容质量要求】
- 总字数：800-1500字
- 开头：直接切入主题，交代事件背景
- 中间：详细展开，分析意义/影响/技术细节
- 结尾：总结展望或行业启示
- 必须完全重新组织语言，原创度>90%

【输出JSON格式】
{
  "title": "中文标题（30字以内）",
  "summary": "中文摘要（100-150字）",
  "content": "HTML格式正文（h3/p/strong/ul/li标签，800-1500字）",
  "keywords": ["关键词1", "关键词2", "关键词3", "关键词4", "关键词5"]
}

请严格按照以上规范生成专业的新闻稿件。`;

    let result;
    
    if (doubaoApiKey) {
      try {
        console.log("Calling Doubao API for translation and rewrite...");
        const response = await fetch("https://ark.cn-beijing.volces.com/api/v3/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${doubaoApiKey}`,
          },
          body: JSON.stringify({
            model: "doubao-seed-1-6-lite-251015",
            messages: [
              { role: "user", content: prompt },
            ],
            temperature: category === "技术分享" ? 0.3 : 0.7,
            max_tokens: 8192,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          const aiContent = data.choices?.[0]?.message?.content || "";
          
          const jsonMatch = aiContent.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            result = JSON.parse(jsonMatch[0]);
            console.log("Doubao translation and rewrite successful");
          }
        } else {
          const errorText = await response.text();
          console.error("Doubao API error:", response.status, errorText);
        }
      } catch (aiError) {
        console.error("Doubao API failed:", aiError);
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
