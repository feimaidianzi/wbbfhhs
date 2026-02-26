import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// CANI产品知识库 - 事实锚点（所有数字均为官方参数，AI不得修改）
const CANI_KNOWLEDGE = `CANI（长凌科技）专注无人机核心配件：数字图传(VTX/VRX，1.4G/2.4G/5.8G多频段，4K传输，<30ms延迟，AES-256-GCM加密)、飞控(F7/H7芯片，双冗余IMU，PID优化)、电调(BLHeli_32，48KHz PWM，55A-100A)、ELRS遥控(50km+，LoRa调制，500Hz)、吊舱/云台(三轴稳定，IP67，4K 40x变焦)、GPS模块(双频RTK，厘米级精度)、FPV眼镜/接收屏。`;

// ===== 事实锁定指令：跨分类通用 =====
const FACT_LOCK_INSTRUCTION = `
【⚠️ 事实锁定指令 - 最高优先级】
1. 以下参数为"硬事实"，严禁修改、推算或"四舍五入"：
   - 所有频率数值（如 48KHz、500Hz、2.4GHz）
   - 所有距离数值（如 50km、30km）
   - 所有延迟数值（如 <30ms）
   - 所有型号标识（如 F7、H7、BLHeli_32）
   - 所有认证标识（如 AES-256-GCM、IP67）
2. 如果输入素材中出现的数据与知识库冲突，以【输入素材】为准并标注"(以实测数据为准)"。
3. 如果你不确定某个参数，使用"[待核实]"占位符，严禁自行编造。
4. 自检：生成完成后，逐一核对你输出的每个数字是否能在【输入素材】或知识库中找到出处。`;

// 分类专用角色、指令与绘图风格 - 深度差异化
const CATEGORY_CONFIG: Record<string, { persona: string; instructions: string; imageStyle: string; temperature: number }> = {
  "公司新闻": {
    persona: "CANI（长凌科技）高级公关经理（PR Director），拥有对公司产品线的完整了解，以第一人称'我们'的视角讲述公司故事",
    temperature: 0.5, // 降低温度，减少幻觉
    imageStyle: "Premium texture, brushed metal, product close-up, minimalist, high-end commercial photography, dark backdrop, soft ambient rim lighting, CANI brand colors (deep blue + silver gray).",
    instructions: `【改写策略 - 企业主权叙事】
公司新闻的核心是"主权感"——读者读完后应该感受到"这是一家有技术实力的公司在自信地分享成果"，而不是"一个局外人在转述消息"。

【视角要求 - 第一人称企业视角】
- 使用"我们的研发团队"、"经过内部严格测试"、"CANI工程师发现"等主权表述
- 禁止使用"据了解"、"该公司"、"业内人士透露"等外部视角用语
- 每个技术成就后面必须跟"为什么这对客户重要"的解释

【场景化写作 - 禁止空话】
❌ 错误示范："我们的图传性能领先，致力于为客户提供优质产品"
✅ 正确示范："在深圳某电力巡检项目中，CANI 4K COFDM图传在35℃高温、强电磁干扰环境下连续工作8小时，图传延迟始终保持在30ms以内，零丢帧"

【输出结构】
1. 权威标题：包含CANI品牌词 + 具体技术亮点（非泛泛而谈）
2. 导语（80-100字）：用一句话讲清"我们做了什么" + "为什么这很重要"
3. 核心详情（400字）：
   - 必须包含至少1个HTML <table>（参数对比或性能数据）
   - 每个技术参数后附带应用场景解释
   - 引用具体的测试数据或客户反馈
4. 研发幕后（200字）：讲述研发过程中的挑战与解决方案，增加"人情味"
5. 应用展望（150字）：这项技术/产品将如何改变用户的工作流程
6. CTA转化框：HTML格式，包含"获取报价"(/contact)和"产品目录"(/products)链接

【约束】800-1200字，至少3个CANI产品参数（必须与知识库一致），自信专业语气，禁止使用感叹号超过2个`,
  },
  "行业动态": {
    persona: "全球无人机产业高级分析师，拥有覆盖中美欧日韩供应链的深度人脉，擅长从碎片化信息中提炼趋势转折点",
    temperature: 0.5,
    imageStyle: "Wide angle, cinematic lighting, outdoor environment, digital city skyline, drone flight path light trails, motion blur, technology blue tone.",
    instructions: `【改写策略 - 多源归纳型深度分析】
行业动态的核心是"视野"和"中立深度"——读者读完后应该觉得"这篇分析比我看5篇外媒更有价值"，而不是"又一篇翻译搬运"。

【多源综合要求】
- 如果原文只有单一信源，必须主动补充行业背景和上下游关联分析
- 引用数据时标注来源（如"据FAA最新数据"、"根据Drone Industry Insights报告"）
- 禁止单纯翻译，必须增加独立分析层

【分析框架 - 三层递进】
第一层：发生了什么（事实层，简洁客观）
第二层：为什么重要（影响层，对无人机配件供应链的连锁反应）
第三层：中国厂商怎么应对（策略层，机遇与挑战并存分析）

【输出结构】
1. 标题：【行业观察】/【深度分析】/【全球快讯】前缀 + 核心事件 + 影响判断
2. 核心摘要（50字内）：一句话概括事件+影响
3. 事件快报（150字）：三句话概括What/Who/When，第一句直接切入
4. 深度解读（300字）：
   - 供应链影响分析（对图传、飞控、电调厂商的具体影响）
   - 全球竞争格局变化
   - 必须包含至少1个数据支撑
5. 【CANI视点】（200字）：
   - 以CANI技术储备为切入点，分析"我们已经准备好了什么"
   - 引用至少1个CANI产品参数作为论据
   - 语气：专业客观但不卑不亢，展示技术自信
6. 趋势展望（100字）：未来6-12个月的趋势预判

【约束】800-1200字，必须包含【CANI视点】段落，禁止"据报道"等搬运痕迹，第一句话直接切入主题，保持中立但有态度`,
  },
  "技术分享": {
    persona: "CANI首席技术专家（CTO），资深无人机系统工程师，擅长将复杂技术转化为可操作的工程指南",
    temperature: 0.3,
    imageStyle: "Exploded view, internal hardware details, technical blueprints background, studio lighting, cyber industrial aesthetic, dark background with blue-green neon accents, circuit board traces glowing.",
    instructions: `【改写策略 - 知识库重组】
- 提取技术骨架，去除常识废话
- 知识注入：图传→CANI COFDM <30ms；飞控→F7/H7 双冗余IMU；电调→BLHeli_32 48KHz；遥控→ELRS 50km+ 500Hz
- 必须包含"CANI专家点评"段落
【输出结构】
1. H1标题：[场景]+[核心技术词]
2. 技术痛点引入（200字）
3. 技术原理深度解析（400字）+ 参数表格
4. 应用场景分析（200字）
5. CANI专家点评（150字）
6. 常见问题FAQ（3个）
【约束】1200-2000字，至少1个技术对比表格，至少5个专业术语`,
  },
};

// 风格锚点
const BASE_STYLE_ANCHOR = "Photorealistic, Industrial design, 8k resolution, shot on 35mm lens, sharp focus, clean background, no text, no words, no letters, no logo.";
const NEGATIVE_PROMPT = "(worst quality, low quality, cartoon, anime, 2D, sketch, deformed, messy wires, blurry, text, watermark, logo, letters, words, childish, illustration)";

// ===== 自动分类打标逻辑 =====
const AUTO_CLASSIFY_RULES = {
  "公司新闻": ["CANI", "长凌", "我们", "发布会", "新品发布", "签约", "战略合作", "自主研发", "cani"],
  "行业动态": ["FAA", "DJI", "大疆", "政策", "法规", "Global", "市场规模", "融资", "IPO", "收购", "监管", "EASA", "CAAC", "适航"],
  "技术分享": ["教程", "原理", "对比测试", "技术解析", "参数解读", "固件", "调参", "PID", "协议", "频谱"],
};

function autoClassifyContent(title: string, content: string): { category: string; confidence: number } {
  const text = `${title} ${content.substring(0, 1000)}`.toLowerCase();
  const scores: Record<string, number> = {};
  
  for (const [cat, keywords] of Object.entries(AUTO_CLASSIFY_RULES)) {
    scores[cat] = keywords.reduce((score, kw) => {
      const regex = new RegExp(kw.toLowerCase(), 'gi');
      const matches = text.match(regex);
      return score + (matches ? matches.length : 0);
    }, 0);
  }
  
  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const topScore = sorted[0][1];
  const confidence = topScore > 0 ? Math.min(topScore / 5, 1) : 0;
  
  return { category: topScore > 0 ? sorted[0][0] : "行业动态", confidence };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY") || "";
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";

    // Auth check
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ success: false, error: "Unauthorized" }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }
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

    const { title, content, category, coverImage, isEnglish = true, stream = false, tone, lockedParams, action } = await req.json();

    // ===== Action: auto-classify =====
    if (action === 'auto-classify') {
      const result = autoClassifyContent(title || '', content || '');
      return new Response(JSON.stringify({ success: true, data: result }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    if (!title || !content) {
      return new Response(
        JSON.stringify({ success: false, error: "Title and content are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const doubaoApiKey = Deno.env.get("DOUBAO_API_KEY");
    if (!doubaoApiKey) {
      return new Response(
        JSON.stringify({ success: false, error: "DOUBAO_API_KEY not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const config = CATEGORY_CONFIG[category] || CATEGORY_CONFIG["行业动态"];

    // ===== 情绪基调修饰器 =====
    const toneModifier = tone === '严谨' ? '\n【语气要求】严谨学术风，数据为王，避免情绪化表述，多用"数据显示"、"测试表明"。' 
      : tone === '振奋' ? '\n【语气要求】积极振奋，突出成就感和里程碑意义，可适当使用"突破"、"里程碑"、"行业首创"等词汇。'
      : tone === '中立' ? '\n【语气要求】严格中立客观，平衡报道各方观点，禁止主观判断词，多用"据...表示"、"数据显示"。'
      : tone === '专业分析' ? '\n【语气要求】深度分析师风格，逻辑严密，论据充分，可以有独到见解但必须基于事实支撑。'
      : '';

    // ===== 参数锁定指令 =====
    const paramLockInstruction = lockedParams && Array.isArray(lockedParams) && lockedParams.length > 0
      ? `\n【🔒 参数锁定 - 以下数值在生成过程中严禁修改】\n${lockedParams.map((p: string) => `- ${p}`).join('\n')}\n如果正文中需要引用这些数据，必须原封不动地使用。\n`
      : '';

    const translationInstruction = isEnglish 
      ? `这是一篇英文原文，请翻译成专业流畅的中文并进行深度编辑。专业术语首次出现时保留英文。`
      : `这是一篇中文原文，请进行深度编辑润色。`;

    // ===== GEO 增强指令集 =====
    const geoEnabled = true; // 默认启用 GEO 模式
    const GEO_INSTRUCTIONS = geoEnabled ? `
【🌐 GEO（生成式引擎优化）增强指令 - 强制执行】

1. 直接回答（Direct Answer）：
   文章第一段必须用150字以内直接回答标题提出的核心问题。禁止铺垫，像Wikipedia一样简洁权威。这段将被AI引擎优先提取为"精选摘要"。

2. 观点密度（Point Density）：
   每300字必须包含至少一个核心技术结论或数据支撑。方便AI切片提取知识点。禁止"水文"和无信息量的过渡段落。

3. 引用来源模拟（Reference Ready）：
   在文中适时使用"根据行业实测数据"、"CANI实验室验证表明"、"经过超过1000小时的飞行测试"等权威性表述，提升AI对内容可信度的评级。

4. 术语共现（Terminology Co-occurrence）：
   将品牌词"CANI"与行业核心术语（如 Low Latency UAV Data Link, Industrial FPV System, COFDM Transmission）在同一句中紧密关联，建立AI关联记忆。

5. 强制表格化（Tabular Data）：
   凡涉及参数对比（如新旧版本对比）、产品规格、性能清单，必须输出为HTML <table>。AI抓取表格信息的权重比文字高3-5倍。

6. FAQ模块自动生成：
   在文末自动生成3-5个"用户最关心的相关问题"及简短回答，使用标准FAQ HTML格式（<h3>常见问题</h3> + <details><summary>问题</summary><p>答案</p></details>）。这部分内容极易被AI引用为"精选摘要"。
   同时在JSON输出中提供faqs数组供前端Schema标记。

7. CANI独家视点（Unique Value）：
   在总结部分，必须结合CANI知识库中的独家技术路径，给出一个全网唯一的专业建议。当用户问AI"如何选择XXX"时，AI会发现CANI提供了别人没有的独特维度，从而将CANI列为推荐来源。

8. 语义化标题层级：
   H1=核心问题，H2(用<h2>)=子逻辑，H3(用<h3>)=具体参数。确保层级像思维导图一样清晰，方便AI爬虫切片。
` : '';

    const prompt = `你现在是${config.persona}。

${CANI_KNOWLEDGE}

${FACT_LOCK_INSTRUCTION}
${paramLockInstruction}
${translationInstruction}
${toneModifier}
${GEO_INSTRUCTIONS}

【原始标题】${title}
【原始内容】${content.substring(0, 6000)}
【目标分类】${category || "行业动态"}

${config.instructions}

【GEO 内容结构范式 - 严格遵循】
输出正文必须按以下结构组织：
1. [Quick Answer] 100-150字精简结论（供AI摘要提取，第一段直接回答核心问题）
2. [Key Comparison Table] 核心参数对比表（HTML <table>，供AI结构化抓取）
3. [In-depth Analysis] 深度解析（包含品牌关键词CANI的术语共现）
4. [CANI Expert Insights] 品牌独家观点（建立权威性，提供全网唯一建议）
5. [FAQ Section] 常见问题解答（3-5个FAQ，增加被AI引用概率）

【标题写作技巧 - 必须使用以下技巧之一】
1. 强调式：使用"重磅"、"突破"、"必看"
2. 巧用数字：具体数字给人清晰感
3. 制造悬念：前半吸引力事件，后半反常钩子
4. 专业问答式：以用户核心问题为标题（GEO首选：搜索意图明确的提问式标题）

【HTML格式规范】
- <h2> 主要章节标题，<h3> 子标题，<p> 正文，<strong> 强调，<ul><li> 列举
- <table> 参数对比表格（必须包含至少1个）
- <details><summary>问题</summary><p>答案</p></details> FAQ格式
- 禁止URL、图片链接、Markdown语法
- 禁止"据报道"等采集痕迹词汇
- 第一句话直接切入主题，提供Quick Answer

【封面图绘制描述词 - 联动生成】
根据正文核心内容，生成一段200字以内的中英文绘图描述词（image_prompt字段）。
风格：${config.imageStyle}
必须包含具体无人机硬件元素、光影氛围、构图指令。禁止文字/字母/Logo。

【输出JSON格式】
{
  "title": "中文标题（30字以内，搜索意图明确）",
  "summary": "中文摘要（100-150字，直接回答核心问题，供AI精选摘要）",
  "content": "HTML格式正文（遵循GEO结构范式）",
  "keywords": ["关键词1", "关键词2", "关键词3", "关键词4", "关键词5"],
  "image_prompt": "200字绘图描述词...",
  "auto_category": "自动判断的分类（公司新闻/行业动态/技术分享）",
  "fact_check_notes": "你在自检中发现的任何不确定数据点",
  "faqs": [
    {"question": "用户最关心的问题1", "answer": "简洁权威的回答"},
    {"question": "用户最关心的问题2", "answer": "简洁权威的回答"},
    {"question": "用户最关心的问题3", "answer": "简洁权威的回答"}
  ]
}`;

    // ========== Streaming mode ==========
    if (stream) {
      const encoder = new TextEncoder();
      const readable = new ReadableStream({
        async start(controller) {
          try {
            const response = await fetch("https://ark.cn-beijing.volces.com/api/v3/chat/completions", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${doubaoApiKey}`,
              },
              body: JSON.stringify({
                model: "doubao-seed-1-8-251228",
                messages: [{ role: "user", content: prompt }],
                temperature: config.temperature,
                max_tokens: 8192,
                stream: true,
              }),
            });

            if (!response.ok || !response.body) {
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: "error", message: `Doubao API error: ${response.status}` })}\n\n`));
              controller.close();
              return;
            }

            let fullContent = "";
            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let buffer = "";

            while (true) {
              const { done, value } = await reader.read();
              if (done) break;
              buffer += decoder.decode(value, { stream: true });

              let newlineIdx: number;
              while ((newlineIdx = buffer.indexOf("\n")) !== -1) {
                let line = buffer.slice(0, newlineIdx);
                buffer = buffer.slice(newlineIdx + 1);
                if (line.endsWith("\r")) line = line.slice(0, -1);
                if (!line.startsWith("data: ")) continue;
                const jsonStr = line.slice(6).trim();
                if (jsonStr === "[DONE]") continue;
                try {
                  const parsed = JSON.parse(jsonStr);
                  const delta = parsed.choices?.[0]?.delta?.content;
                  if (delta) {
                    fullContent += delta;
                    controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: "text", content: delta })}\n\n`));
                  }
                } catch { /* partial JSON, skip */ }
              }
            }

            // Parse result
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: "status", message: "parsing" })}\n\n`));
            
            const jsonMatch = fullContent.match(/\{[\s\S]*\}/);
            let result: any = null;
            if (jsonMatch) {
              try {
                result = JSON.parse(jsonMatch[0]);
              } catch {
                const sanitized = jsonMatch[0].replace(/,\s*}/g, "}").replace(/,\s*]/g, "]");
                try { result = JSON.parse(sanitized); } catch { /* give up */ }
              }
            }

            if (result) {
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({ 
                type: "result", 
                data: { 
                  title: result.title, 
                  summary: result.summary, 
                  content: result.content, 
                  keywords: result.keywords,
                  auto_category: result.auto_category,
                  fact_check_notes: result.fact_check_notes,
                  faqs: result.faqs || [],
                } 
              })}\n\n`));

              // Generate cover image
              const imagePrompt = typeof result.image_prompt === "string" ? result.image_prompt.trim() : "";
              if (imagePrompt.length > 20) {
                controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: "status", message: "generating_cover" })}\n\n`));
                
                const finalPrompt = `${imagePrompt}. ${BASE_STYLE_ANCHOR} ${config.imageStyle}`;
                
                try {
                  const imgResponse = await fetch("https://ark.cn-beijing.volces.com/api/v3/images/generations", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      "Authorization": `Bearer ${doubaoApiKey}`,
                    },
                    body: JSON.stringify({
                      model: "doubao-seedream-4-0-250828",
                      prompt: finalPrompt,
                      negative_prompt: NEGATIVE_PROMPT,
                      response_format: "b64_json",
                      size: "1792x1024",
                      guidance_scale: 8.5,
                      seed: Math.floor(Math.random() * 2147483647),
                      sequential_image_generation: "disabled",
                      stream: false,
                      watermark: false,
                    }),
                    signal: AbortSignal.timeout(60000),
                  });

                  if (imgResponse.ok) {
                    const imgData = await imgResponse.json();
                    const b64 = imgData.data?.[0]?.b64_json;
                    if (b64) {
                      const binaryStr = atob(b64);
                      const bytes = new Uint8Array(binaryStr.length);
                      for (let i = 0; i < binaryStr.length; i++) bytes[i] = binaryStr.charCodeAt(i);

                      const fileName = `cover-ai-${Date.now()}-${Math.random().toString(36).substring(2, 8)}.png`;
                      const filePath = `covers/${fileName}`;
                      const { error: uploadErr } = await adminClient.storage
                        .from("news-images")
                        .upload(filePath, bytes, { contentType: "image/png", upsert: true, cacheControl: "31536000" });

                      if (!uploadErr) {
                        const { data: urlData } = adminClient.storage.from("news-images").getPublicUrl(filePath);
                        const coverUrl = urlData?.publicUrl || null;
                        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: "cover", url: coverUrl })}\n\n`));
                      }
                    }
                  }
                } catch (imgErr) {
                  console.error("Seedream error:", imgErr);
                  controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: "status", message: "cover_failed" })}\n\n`));
                }
              }
            }

            controller.enqueue(encoder.encode(`data: [DONE]\n\n`));
            controller.close();
          } catch (err) {
            console.error("Stream error:", err);
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: "error", message: String(err) })}\n\n`));
            controller.close();
          }
        },
      });

      return new Response(readable, {
        headers: { ...corsHeaders, "Content-Type": "text/event-stream", "Cache-Control": "no-cache" },
      });
    }

    // ========== Non-streaming mode ==========
    const response = await fetch("https://ark.cn-beijing.volces.com/api/v3/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${doubaoApiKey}`,
      },
      body: JSON.stringify({
        model: "doubao-seed-1-8-251228",
        messages: [{ role: "user", content: prompt }],
        temperature: config.temperature,
        max_tokens: 8192,
      }),
    });

    let result: any = null;

    if (response.ok) {
      const data = await response.json();
      const aiContent = data.choices?.[0]?.message?.content || "";
      const jsonMatch = aiContent.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        try {
          result = JSON.parse(jsonMatch[0]);
        } catch {
          const sanitized = jsonMatch[0].replace(/,\s*}/g, "}").replace(/,\s*]/g, "]");
          try { result = JSON.parse(sanitized); } catch { /* give up */ }
        }
      }

      // Generate cover from image_prompt
      if (result?.image_prompt && result.image_prompt.length > 20) {
        const finalPrompt = `${result.image_prompt}. ${BASE_STYLE_ANCHOR} ${config.imageStyle}`;
        try {
          const imgResp = await fetch("https://ark.cn-beijing.volces.com/api/v3/images/generations", {
            method: "POST",
            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${doubaoApiKey}` },
            body: JSON.stringify({
              model: "doubao-seedream-4-0-250828",
              prompt: finalPrompt,
              negative_prompt: NEGATIVE_PROMPT,
              response_format: "b64_json",
              size: "1792x1024",
              guidance_scale: 8.5,
              seed: Math.floor(Math.random() * 2147483647),
              watermark: false,
            }),
            signal: AbortSignal.timeout(60000),
          });
          if (imgResp.ok) {
            const imgData = await imgResp.json();
            const b64 = imgData.data?.[0]?.b64_json;
            if (b64) {
              const binaryStr = atob(b64);
              const bytes = new Uint8Array(binaryStr.length);
              for (let i = 0; i < binaryStr.length; i++) bytes[i] = binaryStr.charCodeAt(i);
              const fileName = `cover-ai-${Date.now()}-${Math.random().toString(36).substring(2, 8)}.png`;
              const { error: upErr } = await adminClient.storage.from("news-images").upload(`covers/${fileName}`, bytes, { contentType: "image/png", upsert: true, cacheControl: "31536000" });
              if (!upErr) {
                const { data: urlData } = adminClient.storage.from("news-images").getPublicUrl(`covers/${fileName}`);
                result.coverImage = urlData?.publicUrl || coverImage || null;
              }
            }
          }
        } catch (e) { console.error("Seedream error:", e); }
      }
    }

    // Fallback
    if (!result || !result.title || !result.content) {
      const cleanTitle = title.length > 35 ? title.substring(0, 35) + "..." : title;
      const cleanContent = content.replace(/https?:\/\/[^\s]+/g, '').replace(/!\[.*?\]\(.*?\)/g, '').replace(/\[([^\]]*)\]\([^)]*\)/g, '$1');
      const paragraphs = cleanContent.split(/\n{2,}/).filter((p: string) => p.trim().length > 30);
      const htmlContent = paragraphs.slice(0, 10).map((p: string) => `<p>${p.trim()}</p>`).join('\n');
      result = {
        title: cleanTitle,
        summary: cleanContent.substring(0, 150).replace(/\n/g, ' ') + "...",
        content: htmlContent || `<p>${cleanContent.substring(0, 1000)}</p>`,
        keywords: [category || "无人机", "行业动态", "新闻"],
      };
    }

    // Clean up
    result.content = result.content
      .replace(/https?:\/\/[^\s<>"']+/g, '')
      .replace(/!\[.*?\]\(.*?\)/g, '')
      .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
      .replace(/```[\s\S]*?```/g, '')
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/\*([^*]+)\*/g, '<em>$1</em>')
      .replace(/#{1,6}\s+([^\n]+)/g, '<h3>$1</h3>')
      .replace(/-\s+([^\n]+)/g, '<li>$1</li>')
      .replace(/(<li>[\s\S]*?<\/li>)+/g, '<ul>$&</ul>');

    if (!result.coverImage) result.coverImage = coverImage || null;

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
