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

// 生成技术分享文章
async function generateTechArticle(topic: { title: string; desc: string }, categoryName: string, imagePrompt: string, apiKey: string) {
  const prompt = `你是飞迈科技的技术编辑，需要撰写一篇产品技术科普文章。

【文章标题】${topic.title}
【内容方向】${topic.desc}
【产品类别】${categoryName}

【写作要求】
1. 这是技术科普文章，重点解释产品是什么、技术原理是什么、有什么用途
2. 文章结构采用What/Why/How模式，深入浅出
3. 适当引用飞迈科技的相关产品作为例子
4. 800-1200字，使用HTML标签格式化（<p>, <h3>, <strong>, <ul>, <li>）
5. 在正文中间适当位置插入一个图片占位符：<div class="article-image-placeholder"></div>
6. 专业但易懂，适合技术爱好者阅读
7. 不要包含任何URL链接
8. 提供100-150字摘要
9. 提取5个关键词

以JSON格式返回：
{"title":"标题","summary":"摘要","content":"HTML格式正文","keywords":["关键词1","关键词2","关键词3","关键词4","关键词5"]}`;

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
  const jsonMatch = aiContent.match(/\{[\s\S]*\}/);
  if (jsonMatch) {
    const result = JSON.parse(jsonMatch[0]);
    result.imagePrompt = `Technical illustration for article about ${topic.title}, ${imagePrompt}, infographic style, clean modern design`;
    return result;
  }
  return null;
}

// 生成产品资讯文章
async function generateProductNews(product: { name: string; desc: string }, categoryName: string, imagePrompt: string, apiKey: string) {
  const prompt = `你是飞迈科技的产品编辑，需要撰写一篇产品资讯/发布文章。

【产品名称】${product.name}
【产品描述】${product.desc}
【产品类别】${categoryName}

【写作要求】
1. 这是产品资讯文章，重点介绍产品特点、技术亮点、适用场景
2. 突出产品的核心卖点和技术优势
3. 模拟新品发布的风格，专业有吸引力
4. 600-1000字，使用HTML标签格式化
5. 在正文中间适当位置插入一个图片占位符：<div class="article-image-placeholder"></div>
6. 适合潜在客户阅读
7. 不要包含任何URL链接
8. 提供80-120字摘要
9. 提取5个关键词

以JSON格式返回：
{"title":"标题","summary":"摘要","content":"HTML格式正文","keywords":["关键词1","关键词2","关键词3","关键词4","关键词5"]}`;

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
  const jsonMatch = aiContent.match(/\{[\s\S]*\}/);
  if (jsonMatch) {
    const result = JSON.parse(jsonMatch[0]);
    result.imagePrompt = `Product photo of ${product.name}, ${imagePrompt}`;
    return result;
  }
  return null;
}

// 生成公司新闻
async function generateCompanyNews(apiKey: string, newsIndex: number) {
  const companyNewsTopics = [
    { title: "飞迈科技完成新一轮产品升级", desc: "全系产品性能提升，服务更多行业客户", imagePrompt: "Corporate technology office, modern drone components factory, professional business environment" },
    { title: "飞迈科技参加行业展会", desc: "展示最新无人机零配件产品，获得广泛关注", imagePrompt: "Technology trade show booth, drone exhibition, professional display" },
    { title: "飞迈科技与多家无人机厂商达成合作", desc: "产品应用于多个行业领域", imagePrompt: "Business partnership handshake, corporate meeting, modern office" },
    { title: "飞迈科技技术团队荣获行业认可", desc: "持续创新，引领无人机配件技术发展", imagePrompt: "R&D team working on drone technology, engineering lab, innovation" },
    { title: "飞迈科技发布年度产品规划", desc: "更多创新产品即将推出", imagePrompt: "Product roadmap presentation, corporate strategy meeting, modern technology" }
  ];

  const topic = companyNewsTopics[newsIndex % companyNewsTopics.length];
  
  const prompt = `你是飞迈科技的新闻编辑，需要撰写一篇公司新闻稿。

【公司简介】飞迈科技有限公司，专注于工业无人机零配件，提供数字图传、模拟图传、云台相机、飞控电调、ELRS接收机等产品。

【新闻主题】${topic.title}
【新闻方向】${topic.desc}

【写作要求】
1. 这是正式的公司新闻稿，体现企业实力和发展动态
2. 语气专业、正式，突出公司技术实力
3. 500-800字，使用HTML标签格式化
4. 在正文中间适当位置插入一个图片占位符：<div class="article-image-placeholder"></div>
5. 不要包含任何URL链接
6. 提供80-100字摘要
7. 提取5个关键词

以JSON格式返回：
{"title":"标题","summary":"摘要","content":"HTML格式正文","keywords":["关键词1","关键词2","关键词3","关键词4","关键词5"]}`;

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
  const jsonMatch = aiContent.match(/\{[\s\S]*\}/);
  if (jsonMatch) {
    const result = JSON.parse(jsonMatch[0]);
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
