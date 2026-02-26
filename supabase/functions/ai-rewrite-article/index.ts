import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// CANI产品知识库
const CANI_KNOWLEDGE = `CANI（长凌科技）专注无人机核心配件：数字图传(VTX/VRX，1.4G/2.4G/5.8G多频段，4K传输，<30ms延迟，AES-256-GCM加密)、飞控(F7/H7芯片，双冗余IMU，PID优化)、电调(BLHeli_32，48KHz PWM，55A-100A)、ELRS遥控(50km+，LoRa调制，500Hz)、吊舱/云台(三轴稳定，IP67，4K 40x变焦)、GPS模块(双频RTK，厘米级精度)、FPV眼镜/接收屏。`;

// 分类专用角色、指令与绘图风格
const CATEGORY_CONFIG: Record<string, { persona: string; instructions: string; imageStyle: string; temperature: number }> = {
  "公司新闻": {
    persona: "CANI（长凌科技）高级公关经理（PR Director）",
    temperature: 0.7,
    imageStyle: "Premium texture, brushed metal, product close-up, minimalist, high-end commercial photography, dark backdrop, soft ambient rim lighting, CANI brand colors (deep blue + silver gray).",
    instructions: `【改写策略 - 从"事实"到"营销叙事"】
将冰冷的技术参数转化为具有商业吸引力的叙事，每篇公司新闻都是强力的Lead Generation入口。
【多维延展创作】
- 用户视角：产品/事件如何解决用户痛点？量化ROI
- 技术视角：深度解析背后的设计逻辑和技术创新
- 行业视角：释放了行业发展的哪些信号？
【输出结构】
1. 权威标题：包含CANI品牌词
2. 导语（100字）
3. 核心详情（300字）：技术参数表格 + 痛点解决方案
4. 应用展望（200字）
5. 品牌背书（100字）
6. CTA转化框
【约束】800-1200字，至少2个CANI产品参数，至少1个HTML <table>，自信专业语气`,
  },
  "行业动态": {
    persona: "无人机行业资深分析师，拥有10年行业观察经验",
    temperature: 0.5,
    imageStyle: "Wide angle, cinematic lighting, outdoor environment, digital city skyline, drone flight path light trails, motion blur, technology blue tone.",
    instructions: `【改写策略 - 快速精炼的行业观察】
【输出结构】
1. 爆款标题：【快讯】/【深度解析】前缀
2. 核心摘要（50字内）
3. 核心快讯（150字内）：三句话概括
4. 深度解读（250字）：对无人机配件供应链的影响
5. CANI观点（150字）：技术储备视角
6. 行业展望（100字）
【约束】600-800字，禁止"据报道"，第一句直接切入主题`,
  },
  "技术分享": {
    persona: "CANI首席技术专家（CTO），资深无人机系统工程师",
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

    const { title, content, category, coverImage, isEnglish = true, stream = false } = await req.json();

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

    const translationInstruction = isEnglish 
      ? `这是一篇英文原文，请翻译成专业流畅的中文并进行深度编辑。专业术语首次出现时保留英文。`
      : `这是一篇中文原文，请进行深度编辑润色。`;

    const prompt = `你现在是${config.persona}。

${CANI_KNOWLEDGE}

${translationInstruction}

【原始标题】${title}
【原始内容】${content.substring(0, 6000)}
【目标分类】${category || "行业动态"}

${config.instructions}

【标题写作技巧 - 必须使用以下技巧之一】
1. 强调式：使用"重磅"、"突破"、"必看"
2. 巧用数字：具体数字给人清晰感
3. 制造悬念：前半吸引力事件，后半反常钩子
4. 专业问答式：以用户核心问题为标题

【HTML格式规范】
- <h3> 小标题，<p> 正文，<strong> 强调，<ul><li> 列举
- 禁止URL、图片链接、Markdown语法
- 禁止"据报道"等采集痕迹词汇
- 第一句话直接切入主题

【封面图绘制描述词 - 联动生成】
根据正文核心内容，生成一段200字以内的中英文绘图描述词（image_prompt字段）。
风格：${config.imageStyle}
必须包含具体无人机硬件元素、光影氛围、构图指令。禁止文字/字母/Logo。

【输出JSON格式】
{
  "title": "中文标题（30字以内）",
  "summary": "中文摘要（100-150字）",
  "content": "HTML格式正文",
  "keywords": ["关键词1", "关键词2", "关键词3", "关键词4", "关键词5"],
  "image_prompt": "200字绘图描述词..."
}`;

    // ========== Streaming mode ==========
    if (stream) {
      const encoder = new TextEncoder();
      const readable = new ReadableStream({
        async start(controller) {
          try {
            // Step 1: Stream text generation
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
              const errText = await response.text();
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: "error", message: `Doubao API error: ${response.status}` })}\n\n`));
              controller.close();
              return;
            }

            let fullContent = "";
            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let buffer = "";

            // Stream SSE to client
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

            // Step 2: Parse result and extract image_prompt
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
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: "result", data: { title: result.title, summary: result.summary, content: result.content, keywords: result.keywords } })}\n\n`));

              // Step 3: Generate cover image asynchronously
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

    // ========== Non-streaming mode (original) ==========
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
