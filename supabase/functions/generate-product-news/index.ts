import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// 产品分类信息
const PRODUCT_CATEGORIES = {
  digitalFpv: {
    name: "数字图传",
    imagePrompt: "Digital FPV video transmitter module, drone component, high-tech electronics, professional product photography, white background, clean modern style",
    products: [
      { name: "FlyMind Link2 数字高清图传", desc: "WiFi数字传输，1080P 60fps，低延迟高画质" },
      { name: "FlyMind Link-RX 数字高清接收器", desc: "1080P HDMI输出，内置32G存储，支持OpenIPC/Ruby FPV" }
    ],
    techTopics: [
      { title: "什么是无人机数字图传？", desc: "数字图传的工作原理、技术特点、与模拟图传的区别" },
      { title: "数字图传VS模拟图传：如何选择？", desc: "深度对比两种图传技术的优缺点和应用场景" }
    ]
  },
  vtx: {
    name: "模拟图传",
    imagePrompt: "Analog video transmitter VTX module, FPV drone component, aluminum heatsink, professional product photography, white background",
    products: [
      { name: "2.5W视频发射器", desc: "4.9-6.1GHz，80频道，SA协议，轻量化设计" },
      { name: "10W视频发射器", desc: "5档功率可调(1W-10W)，内置风扇散热，支持Betaflight" },
      { name: "25W视频发射器", desc: "大功率输出，远距离传输，专业级应用" }
    ],
    techTopics: [
      { title: "什么是VTX（视频发射器）？", desc: "VTX的工作原理、功率选择、频率设置详解" },
      { title: "5.8G图传频率与频道详解", desc: "常用频段介绍、频道分配、干扰避免方法" }
    ]
  },
  gimbal: {
    name: "云台相机",
    imagePrompt: "Drone gimbal camera, 3-axis stabilizer, thermal imaging camera, professional aerial photography equipment, high-tech product photography",
    products: [
      { name: "K40T四光云台相机", desc: "可见光+热成像+广角+激光测距，AI智能识别" },
      { name: "K8T-V2双光云台相机", desc: "可见光+热成像，4T算力AI跟踪识别" },
      { name: "K8-V2单光云台", desc: "4K高清，30倍光学变焦，AI目标追踪" }
    ],
    techTopics: [
      { title: "什么是无人机云台？", desc: "云台的工作原理、稳定技术、轴数区别" },
      { title: "双光融合成像技术详解", desc: "可见光与热成像融合的原理和应用" }
    ]
  },
  elrs: {
    name: "ELRS遥控链路",
    imagePrompt: "ELRS receiver module, ExpressLRS drone component, small electronics module with antenna, professional product photography, white background",
    products: [
      { name: "ELRS 915MHz分集接收机", desc: "双天线分集，超远距离控制" },
      { name: "ELRS Lite 2.4G接收机", desc: "轻量入门，即插即用" },
      { name: "ELRS 2.4G LNA接收机", desc: "LNA增益增强，高灵敏度" }
    ],
    techTopics: [
      { title: "什么是ELRS（ExpressLRS）？", desc: "开源远程遥控链路协议介绍" },
      { title: "ELRS与传统遥控协议对比", desc: "ELRS vs ACCST、CRSF等协议的优劣分析" }
    ]
  },
  fcEsc: {
    name: "飞控电调",
    imagePrompt: "Drone flight controller and ESC stack, FPV electronics circuit board, Betaflight FC, professional product photography, white background",
    products: [
      { name: "Mini F7+55A飞塔", desc: "STM32F722处理器，ICM42688陀螺仪，25.5mm孔距" },
      { name: "F405+55A飞塔", desc: "性价比之选，30.5mm标准孔距" },
      { name: "Pro F722 100A飞塔", desc: "双陀螺仪，8层PCB，3-8S宽电压" }
    ],
    techTopics: [
      { title: "什么是飞控？", desc: "飞行控制器的工作原理、核心组件、固件介绍" },
      { title: "什么是电调（ESC）？", desc: "电子调速器的工作原理和选型指南" }
    ]
  }
};

// 生成图片并上传到存储
async function generateAndUploadImage(prompt: string, apiKey: string, supabase: any, articleId: string): Promise<string | null> {
  try {
    console.log("Generating image for:", prompt.substring(0, 50));
    
    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-image-preview",
        messages: [{ role: "user", content: prompt }],
        modalities: ["image", "text"]
      }),
    });

    if (!response.ok) {
      console.error("Image generation failed:", response.status);
      return null;
    }

    const data = await response.json();
    const imageData = data.choices?.[0]?.message?.images?.[0]?.image_url?.url;
    
    if (!imageData || !imageData.startsWith("data:image")) {
      console.error("No valid image data returned");
      return null;
    }

    // 提取base64数据
    const base64Data = imageData.split(",")[1];
    const imageBuffer = Uint8Array.from(atob(base64Data), c => c.charCodeAt(0));
    
    // 上传到存储
    const fileName = `${articleId}-${Date.now()}.png`;
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("news-images")
      .upload(fileName, imageBuffer, {
        contentType: "image/png",
        upsert: true
      });

    if (uploadError) {
      console.error("Upload error:", uploadError);
      return null;
    }

    // 获取公开URL
    const { data: publicUrl } = supabase.storage
      .from("news-images")
      .getPublicUrl(fileName);

    console.log("Image uploaded:", publicUrl.publicUrl);
    return publicUrl.publicUrl;
  } catch (e) {
    console.error("Image generation error:", e);
    return null;
  }
}

// 安全解析JSON
function safeParseJSON(text: string): any {
  try {
    // 清理可能导致问题的字符
    const cleaned = text
      .replace(/[\x00-\x1F\x7F]/g, ' ') // 移除控制字符
      .replace(/\\n/g, '\\\\n')
      .replace(/\\r/g, '\\\\r')
      .replace(/\\t/g, '\\\\t');
    
    const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
  } catch (e) {
    console.error("JSON parse error, trying fallback:", e);
    // 尝试提取关键字段
    try {
      const titleMatch = text.match(/"title"\s*:\s*"([^"]+)"/);
      const summaryMatch = text.match(/"summary"\s*:\s*"([^"]+)"/);
      const contentStart = text.indexOf('"content"');
      const keywordsMatch = text.match(/"keywords"\s*:\s*\[([^\]]+)\]/);
      
      if (titleMatch && summaryMatch) {
        // 提取content（可能很长）
        let content = "";
        if (contentStart > -1) {
          const contentAfter = text.substring(contentStart + 11);
          const endMatch = contentAfter.match(/",\s*"keywords"/);
          if (endMatch) {
            content = contentAfter.substring(0, endMatch.index || 500);
          } else {
            content = contentAfter.substring(0, 2000);
          }
        }
        
        return {
          title: titleMatch[1],
          summary: summaryMatch[1],
          content: `<p>${content.replace(/"/g, '').substring(0, 2000)}</p>`,
          keywords: keywordsMatch ? keywordsMatch[1].split(',').map(k => k.replace(/"/g, '').trim()) : ["无人机", "技术"]
        };
      }
    } catch (e2) {
      console.error("Fallback parse also failed:", e2);
    }
  }
  return null;
}

// 生成技术分享文章
async function generateTechArticle(topic: { title: string; desc: string }, categoryName: string, imagePrompt: string, apiKey: string) {
  const prompt = `你是飞迈科技的技术编辑，撰写产品技术科普文章。

标题：${topic.title}
方向：${topic.desc}
类别：${categoryName}

要求：技术科普，What/Why/How结构，800-1200字，HTML格式。

返回JSON（确保是有效JSON，不要有换行符在字符串内）：
{"title":"中文标题","summary":"100字摘要","content":"<p>HTML正文</p>","keywords":["关键词1","关键词2","关键词3"]}`;

  const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "google/gemini-2.5-flash-lite",
      messages: [{ role: "user", content: prompt }],
    }),
  });

  if (!response.ok) {
    throw new Error(`AI API error: ${response.status}`);
  }

  const data = await response.json();
  const aiContent = data.choices?.[0]?.message?.content || "";
  const result = safeParseJSON(aiContent);
  if (result) {
    result.imagePrompt = `Technical illustration: ${imagePrompt}`;
    return result;
  }
  return null;
}

// 生成产品资讯文章
async function generateProductNews(product: { name: string; desc: string }, categoryName: string, imagePrompt: string, apiKey: string) {
  const prompt = `你是飞迈科技的产品编辑，撰写产品资讯文章。

产品：${product.name}
描述：${product.desc}
类别：${categoryName}

要求：产品发布风格，600-1000字，HTML格式。

返回JSON（确保是有效JSON，不要有换行符在字符串内）：
{"title":"中文标题","summary":"100字摘要","content":"<p>HTML正文</p>","keywords":["关键词1","关键词2","关键词3"]}`;

  const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "google/gemini-2.5-flash-lite",
      messages: [{ role: "user", content: prompt }],
    }),
  });

  if (!response.ok) {
    throw new Error(`AI API error: ${response.status}`);
  }

  const data = await response.json();
  const aiContent = data.choices?.[0]?.message?.content || "";
  const result = safeParseJSON(aiContent);
  if (result) {
    result.imagePrompt = `Product: ${imagePrompt}`;
    return result;
  }
  return null;
}

// 生成公司新闻
async function generateCompanyNews(apiKey: string, newsIndex: number) {
  const companyNewsTopics = [
    { title: "飞迈科技完成新一轮产品升级", desc: "全系产品性能提升", imagePrompt: "Corporate technology office, drone components" },
    { title: "飞迈科技参加行业展会", desc: "展示最新产品", imagePrompt: "Technology trade show, drone exhibition" },
    { title: "飞迈科技与无人机厂商达成合作", desc: "拓展行业应用", imagePrompt: "Business partnership, modern office" },
  ];

  const topic = companyNewsTopics[newsIndex % companyNewsTopics.length];
  
  const prompt = `你是飞迈科技的新闻编辑，撰写公司新闻稿。

公司：飞迈科技，专注工业无人机零配件（数字图传、云台、飞控电调、ELRS接收机）。
主题：${topic.title}
方向：${topic.desc}

要求：正式新闻稿，500-800字，HTML格式。

返回JSON（确保是有效JSON）：
{"title":"中文标题","summary":"80字摘要","content":"<p>HTML正文</p>","keywords":["关键词1","关键词2","关键词3"]}`;

  const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "google/gemini-2.5-flash-lite",
      messages: [{ role: "user", content: prompt }],
    }),
  });

  if (!response.ok) {
    throw new Error(`AI API error: ${response.status}`);
  }

  const data = await response.json();
  const aiContent = data.choices?.[0]?.message?.content || "";
  const result = safeParseJSON(aiContent);
  if (result) {
    result.imagePrompt = topic.imagePrompt;
    return result;
  }
  return null;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { category, count = 2, withImages = true } = await req.json();
    
    const lovableApiKey = Deno.env.get("LOVABLE_API_KEY");
    if (!lovableApiKey) {
      return new Response(
        JSON.stringify({ success: false, error: "LOVABLE_API_KEY not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const results: any[] = [];
    
    const processArticle = async (article: any, category: string, imagePrompt: string) => {
      const articleId = crypto.randomUUID();
      
      // 生成封面图
      let coverImage = null;
      let contentImage = null;
      
      if (withImages) {
        coverImage = await generateAndUploadImage(
          `Cover image: ${imagePrompt}, professional, high quality, 16:9 aspect ratio`,
          lovableApiKey,
          supabase,
          `cover-${articleId}`
        );
        
        // 生成内容图
        contentImage = await generateAndUploadImage(
          `Article illustration: ${article.imagePrompt || imagePrompt}, infographic style, clean design`,
          lovableApiKey,
          supabase,
          `content-${articleId}`
        );
      }
      
      // 替换内容中的图片占位符
      let content = article.content;
      if (contentImage) {
        content = content.replace(
          '<div class="article-image-placeholder"></div>',
          `<figure class="my-6"><img src="${contentImage}" alt="${article.title}" class="w-full rounded-lg shadow-md" /><figcaption class="text-center text-sm text-gray-500 mt-2">${article.title}</figcaption></figure>`
        );
      } else {
        content = content.replace('<div class="article-image-placeholder"></div>', '');
      }
      
      const { error } = await supabase.from("news_articles").insert({
        id: articleId,
        title: article.title,
        summary: article.summary,
        content: content,
        keywords: article.keywords,
        category: category,
        cover_image: coverImage,
        is_published: true,
        is_auto_generated: true,
        ai_edited: true,
        published_at: new Date().toISOString(),
        source_name: "飞迈科技",
      });
      
      if (!error) {
        results.push({ success: true, title: article.title, hasCover: !!coverImage, hasContentImage: !!contentImage });
      } else {
        console.error("Insert error:", error);
      }
    };

    if (category === "技术分享") {
      for (const [key, catData] of Object.entries(PRODUCT_CATEGORIES)) {
        for (let i = 0; i < Math.min(count, catData.techTopics.length); i++) {
          try {
            console.log(`Generating tech article: ${catData.techTopics[i].title}`);
            const article = await generateTechArticle(catData.techTopics[i], catData.name, catData.imagePrompt, lovableApiKey);
            if (article) {
              await processArticle(article, "技术分享", catData.imagePrompt);
            }
            await new Promise(resolve => setTimeout(resolve, 3000));
          } catch (e) {
            console.error(`Error generating tech article:`, e);
          }
        }
      }
    } else if (category === "产品资讯") {
      for (const [key, catData] of Object.entries(PRODUCT_CATEGORIES)) {
        for (let i = 0; i < Math.min(count, catData.products.length); i++) {
          try {
            console.log(`Generating product news: ${catData.products[i].name}`);
            const article = await generateProductNews(catData.products[i], catData.name, catData.imagePrompt, lovableApiKey);
            if (article) {
              await processArticle(article, "产品资讯", catData.imagePrompt);
            }
            await new Promise(resolve => setTimeout(resolve, 3000));
          } catch (e) {
            console.error(`Error generating product news:`, e);
          }
        }
      }
    } else if (category === "公司新闻") {
      for (let i = 0; i < count; i++) {
        try {
          console.log(`Generating company news ${i + 1}`);
          const article = await generateCompanyNews(lovableApiKey, i);
          if (article) {
            await processArticle(article, "公司新闻", article.imagePrompt);
          }
          await new Promise(resolve => setTimeout(resolve, 3000));
        } catch (e) {
          console.error(`Error generating company news:`, e);
        }
      }
    }

    return new Response(
      JSON.stringify({ success: true, count: results.length, results }),
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
