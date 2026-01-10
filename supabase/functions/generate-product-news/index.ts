import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// 产品分类信息
const PRODUCT_CATEGORIES = {
  digitalFpv: {
    name: "数字图传",
    searchTerms: ["digital FPV video transmitter", "drone video link", "HD drone transmission", "FPV wireless video", "drone fpv system"],
    imagePrompt: "Digital FPV video transmitter module, drone component, high-tech electronics",
    products: [
      { name: "CANI Link2 数字高清图传", desc: "WiFi数字传输，1080P 60fps，低延迟高画质" },
      { name: "CANI Link-RX 数字高清接收器", desc: "1080P HDMI输出，内置32G存储，支持OpenIPC/Ruby FPV" }
    ],
    techTopics: [
      { title: "什么是无人机数字图传？", desc: "数字图传的工作原理、技术特点、与模拟图传的区别" },
      { title: "数字图传VS模拟图传：如何选择？", desc: "深度对比两种图传技术的优缺点和应用场景" }
    ]
  },
  vtx: {
    name: "模拟图传",
    searchTerms: ["analog VTX video transmitter", "5.8G FPV transmitter", "FPV VTX module", "analog video drone", "racing drone vtx"],
    imagePrompt: "Analog video transmitter VTX module, FPV drone component",
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
    searchTerms: ["drone gimbal camera", "3-axis gimbal stabilizer", "aerial thermal camera", "drone zoom camera", "UAV payload camera"],
    imagePrompt: "Drone gimbal camera, 3-axis stabilizer, thermal imaging camera",
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
    searchTerms: ["ExpressLRS receiver", "ELRS module", "long range RC link", "drone control link", "FPV RC receiver"],
    imagePrompt: "ELRS receiver module, ExpressLRS drone component",
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
    searchTerms: ["drone flight controller", "FPV ESC stack", "Betaflight FC", "brushless ESC drone", "drone FC board"],
    imagePrompt: "Drone flight controller and ESC stack, FPV electronics circuit board",
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

// 通用搜索词，用于文章配图
const GENERIC_DRONE_SEARCH_TERMS = [
  "drone technology industry",
  "UAV aerial photography",
  "professional drone inspection",
  "industrial drone application",
  "drone circuit board electronics",
  "FPV racing drone",
  "drone manufacturing factory",
  "drone parts components",
  "aerial drone cityscape",
  "drone pilot operator"
];

// 使用预定义的无水印无人机相关图片
function getLocalDroneImages(): string[] {
  return [
    "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800",
    "https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?w=800",
    "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=800",
    "https://images.unsplash.com/photo-1508444845599-5c89863b1c44?w=800",
    "https://images.unsplash.com/photo-1579829366248-204fe8413f31?w=800",
    "https://images.unsplash.com/photo-1521405924368-64c5b84bec60?w=800",
    "https://images.unsplash.com/photo-1506947411487-a56738571d73?w=800",
    "https://images.unsplash.com/photo-1559297434-fae8a1916a79?w=800",
    "https://images.unsplash.com/photo-1533310266094-8898a03807dd?w=800",
    "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800",
  ];
}

// 下载图片
async function downloadImage(imageUrl: string): Promise<{ imageData: Uint8Array | null; contentType: string }> {
  try {
    const response = await fetch(imageUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
      }
    });
    
    if (!response.ok) {
      return { imageData: null, contentType: "" };
    }
    
    const contentType = response.headers.get("content-type") || "image/jpeg";
    const arrayBuffer = await response.arrayBuffer();
    const imageData = new Uint8Array(arrayBuffer);
    
    return { imageData, contentType };
  } catch (e) {
    console.error("Download image error:", e);
    return { imageData: null, contentType: "" };
  }
}

// 使用 Gemini 3 Pro Image Preview 处理图片 - 去除公司名称和产品内容
async function processImageWithGemini(imageData: Uint8Array, contentType: string): Promise<Uint8Array | null> {
  try {
    const lovableApiKey = Deno.env.get("LOVABLE_API_KEY");
    if (!lovableApiKey) {
      console.error("LOVABLE_API_KEY not configured");
      return null;
    }
    
    // 将图片转为base64
    const base64 = btoa(String.fromCharCode(...imageData));
    const dataUrl = `data:${contentType};base64,${base64}`;
    
    console.log("Processing image with google/gemini-3-pro-image-preview...");
    
    // 调用 Gemini 3 Pro Image Preview API
    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${lovableApiKey}`,
      },
      body: JSON.stringify({
        model: "google/gemini-3-pro-image-preview",
        messages: [{
          role: "user",
          content: [
            { 
              type: "text", 
              text: "Edit this image: Remove ALL company logos, brand names, watermarks, text overlays, and product labels from this image. Keep the main subject (drone, electronic components, equipment) and background completely intact. Generate a clean professional version without any text, branding, or company identification. Make it suitable for use as a news article illustration."
            },
            { type: "image_url", image_url: { url: dataUrl } }
          ]
        }],
        modalities: ["image", "text"]
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Gemini API error:", response.status, errorText);
      return null;
    }

    const data = await response.json();
    const newImageData = data.choices?.[0]?.message?.images?.[0]?.image_url?.url;
    
    if (!newImageData || !newImageData.startsWith("data:image")) {
      console.log("No valid image output from Gemini");
      // 尝试从文本内容中提取base64图片
      const textContent = data.choices?.[0]?.message?.content;
      if (textContent && typeof textContent === 'string') {
        const base64Match = textContent.match(/data:image\/[^;]+;base64,[A-Za-z0-9+/=]+/);
        if (base64Match) {
          const extractedBase64 = base64Match[0].split(",")[1];
          console.log("Extracted image from text content");
          return Uint8Array.from(atob(extractedBase64), c => c.charCodeAt(0));
        }
      }
      return null;
    }
    
    const newBase64 = newImageData.split(",")[1];
    console.log("Image successfully processed with Gemini");
    return Uint8Array.from(atob(newBase64), c => c.charCodeAt(0));
  } catch (e) {
    console.error("Gemini image processing error:", e);
    return null;
  }
}

// 上传图片到存储
async function uploadImageToStorage(supabase: any, imageData: Uint8Array, articleId: string, index: number, contentType: string = "image/jpeg"): Promise<string | null> {
  try {
    const ext = contentType.includes("png") ? "png" : "jpg";
    const fileName = `${articleId}-img-${index}-${Date.now()}.${ext}`;
    
    const { data, error } = await supabase.storage
      .from("news-images")
      .upload(fileName, imageData, {
        contentType,
        upsert: true
      });

    if (error) {
      console.error("Upload error:", error);
      return null;
    }

    const { data: publicUrl } = supabase.storage
      .from("news-images")
      .getPublicUrl(fileName);

    return publicUrl.publicUrl;
  } catch (e) {
    console.error("Upload error:", e);
    return null;
  }
}

// 获取并处理文章配图（2-5张，全部经过Gemini处理）
async function getArticleImages(
  imageCount: number,
  supabase: any,
  articleId: string
): Promise<string[]> {
  const images: string[] = [];
  const targetCount = Math.min(Math.max(imageCount, 2), 5); // 2-5张
  
  const localImages = getLocalDroneImages();
  
  // 为避免超时，每次只处理2张图片
  const maxImagesToProcess = Math.min(targetCount, 2);
  
  for (let i = 0; i < maxImagesToProcess && images.length < maxImagesToProcess; i++) {
    try {
      // 随机选择一张本地图片
      const randomIndex = Math.floor(Math.random() * localImages.length);
      const selectedImage = localImages[randomIndex];
      
      console.log(`Processing image ${i + 1}/${maxImagesToProcess}: ${selectedImage.substring(0, 50)}...`);
      
      // 下载图片
      const { imageData, contentType } = await downloadImage(selectedImage);
      
      if (!imageData) {
        console.log("Failed to download image, skipping...");
        continue;
      }
      
      // 使用 Gemini 3 Pro Image Preview 处理图片
      const processedImage = await processImageWithGemini(imageData, contentType);
      
      if (processedImage) {
        // 上传处理后的图片
        const uploadedUrl = await uploadImageToStorage(supabase, processedImage, articleId, i, contentType);
        if (uploadedUrl) {
          images.push(uploadedUrl);
          console.log(`Image ${i + 1} processed with Gemini and uploaded successfully`);
        }
      } else {
        // 如果处理失败，直接上传原图
        console.log("Gemini processing failed, uploading original...");
        const uploadedUrl = await uploadImageToStorage(supabase, imageData, articleId, i, contentType);
        if (uploadedUrl) {
          images.push(uploadedUrl);
        }
      }
      
      // 添加延迟避免API限制
      await new Promise(resolve => setTimeout(resolve, 2000));
    } catch (e) {
      console.error(`Error processing image ${i}:`, e);
    }
  }
  
  console.log(`Got ${images.length} processed images via Gemini`);
  return images;
}

// 将图片插入到文章内容中
function insertImagesIntoContent(content: string, images: string[], title: string): string {
  if (images.length === 0) return content;
  
  // 分析内容结构，找到适合插入图片的位置
  const paragraphs = content.split(/<\/p>/gi);
  const totalParagraphs = paragraphs.length;
  
  if (totalParagraphs <= 1) {
    // 如果只有一个段落，在内容末尾添加所有图片
    let imageHtml = '<div class="article-images my-6 space-y-4">';
    images.forEach((img, i) => {
      imageHtml += `<figure class="my-4"><img src="${img}" alt="${title} 配图${i + 1}" class="w-full rounded-lg shadow-md" loading="lazy" /><figcaption class="text-center text-sm text-gray-500 mt-2">${title} - 图${i + 1}</figcaption></figure>`;
    });
    imageHtml += '</div>';
    return content + imageHtml;
  }
  
  // 计算每张图片应该插入的位置
  const insertPositions: number[] = [];
  const gap = Math.floor(totalParagraphs / (images.length + 1));
  
  for (let i = 0; i < images.length; i++) {
    insertPositions.push(Math.min(gap * (i + 1), totalParagraphs - 1));
  }
  
  // 重建内容，在适当位置插入图片
  let result = '';
  let imageIndex = 0;
  
  for (let i = 0; i < paragraphs.length; i++) {
    result += paragraphs[i];
    if (i < paragraphs.length - 1) {
      result += '</p>';
    }
    
    // 检查是否需要在这里插入图片
    if (imageIndex < images.length && insertPositions[imageIndex] === i) {
      result += `<figure class="my-6"><img src="${images[imageIndex]}" alt="${title} 配图${imageIndex + 1}" class="w-full rounded-lg shadow-md" loading="lazy" /><figcaption class="text-center text-sm text-gray-500 mt-2">${title} - 图${imageIndex + 1}</figcaption></figure>`;
      imageIndex++;
    }
  }
  
  // 如果还有剩余图片没插入，添加到末尾
  while (imageIndex < images.length) {
    result += `<figure class="my-6"><img src="${images[imageIndex]}" alt="${title} 配图${imageIndex + 1}" class="w-full rounded-lg shadow-md" loading="lazy" /><figcaption class="text-center text-sm text-gray-500 mt-2">${title} - 图${imageIndex + 1}</figcaption></figure>`;
    imageIndex++;
  }
  
  return result;
}

// 安全解析JSON
function safeParseJSON(text: string): any {
  try {
    const cleaned = text
      .replace(/[\x00-\x1F\x7F]/g, ' ')
      .replace(/\\n/g, '\\\\n')
      .replace(/\\r/g, '\\\\r')
      .replace(/\\t/g, '\\\\t');
    
    const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
  } catch (e) {
    console.error("JSON parse error, trying fallback:", e);
    try {
      const titleMatch = text.match(/"title"\s*:\s*"([^"]+)"/);
      const summaryMatch = text.match(/"summary"\s*:\s*"([^"]+)"/);
      const contentStart = text.indexOf('"content"');
      const keywordsMatch = text.match(/"keywords"\s*:\s*\[([^\]]+)\]/);
      
      if (titleMatch && summaryMatch) {
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
async function generateTechArticle(topic: { title: string; desc: string }, categoryName: string, apiKey: string) {
  const prompt = `你是长凌科技（CANI）的技术编辑，撰写产品技术科普文章。

标题：${topic.title}
方向：${topic.desc}
类别：${categoryName}

要求：技术科普，What/Why/How结构，1000-1500字，HTML格式，分多个段落。文章中必须体现长凌科技的品牌名称。

返回JSON（确保是有效JSON）：
{"title":"中文标题","summary":"100字摘要","content":"<p>HTML正文，多个段落</p>","keywords":["关键词1","关键词2","关键词3"]}`;

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
  return safeParseJSON(aiContent);
}

// 生成产品资讯文章
async function generateProductNews(product: { name: string; desc: string }, categoryName: string, apiKey: string) {
  const prompt = `你是长凌科技（CANI）的产品编辑，撰写产品资讯文章。

产品：${product.name}
描述：${product.desc}
类别：${categoryName}

要求：产品发布风格，800-1200字，HTML格式，分多个段落。文章中必须体现长凌科技的品牌名称。

返回JSON（确保是有效JSON）：
{"title":"中文标题","summary":"100字摘要","content":"<p>HTML正文，多个段落</p>","keywords":["关键词1","关键词2","关键词3"]}`;

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
  return safeParseJSON(aiContent);
}

// 生成公司新闻
async function generateCompanyNews(apiKey: string, newsIndex: number) {
  const companyNewsTopics = [
    { title: "长凌科技完成新一轮产品升级", desc: "全系产品性能提升" },
    { title: "长凌科技参加行业展会", desc: "展示最新产品" },
    { title: "长凌科技与无人机厂商达成合作", desc: "拓展行业应用" },
    { title: "长凌科技发布新品预告", desc: "即将推出重磅产品" },
  ];

  const topic = companyNewsTopics[newsIndex % companyNewsTopics.length];
  
  const prompt = `你是长凌科技（CANI）的新闻编辑，撰写公司新闻稿。

公司：长凌科技（CANI），专注工业无人机零配件（数字图传、云台、飞控电调、ELRS接收机）。
主题：${topic.title}
方向：${topic.desc}

要求：正式新闻稿，600-1000字，HTML格式，分多个段落。文章中必须体现长凌科技的品牌名称。

返回JSON（确保是有效JSON）：
{"title":"中文标题","summary":"80字摘要","content":"<p>HTML正文，多个段落</p>","keywords":["关键词1","关键词2","关键词3"]}`;

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
  return safeParseJSON(aiContent);
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { category, count = 1, imageCount = 2, batchMode = false } = await req.json();
    
    const lovableApiKey = Deno.env.get("LOVABLE_API_KEY");
    
    if (!lovableApiKey) {
      return new Response(
        JSON.stringify({ success: false, error: "LOVABLE_API_KEY not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Using google/gemini-3-pro-image-preview for image processing");

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const results: any[] = [];
    
    // 优化：分批处理，每次只生成1篇文章避免超时
    const processArticle = async (article: any, category: string) => {
      const articleId = crypto.randomUUID();
      
      // 获取并处理配图（2张，经过Gemini处理）
      const images = await getArticleImages(
        imageCount,
        supabase,
        articleId
      );
      
      // 封面图使用第一张
      const coverImage = images.length > 0 ? images[0] : null;
      
      // 将图片插入到内容中
      const contentWithImages = insertImagesIntoContent(article.content, images.slice(1), article.title);
      
      const { error } = await supabase.from("news_articles").insert({
        id: articleId,
        title: article.title,
        summary: article.summary,
        content: contentWithImages,
        keywords: article.keywords,
        category: category,
        cover_image: coverImage,
        is_published: true,
        is_auto_generated: true,
        ai_edited: true,
        published_at: new Date().toISOString(),
        source_name: "长凌科技",
      });
      
      if (!error) {
        results.push({ 
          success: true, 
          title: article.title, 
          imageCount: images.length,
          hasCover: !!coverImage 
        });
      } else {
        console.error("Insert error:", error);
      }
    };

    // 单篇文章模式（避免超时）
    const articleLimit = batchMode ? count : 1;

    if (category === "技术分享") {
      const categories = Object.entries(PRODUCT_CATEGORIES);
      let articlesGenerated = 0;
      
      for (const [key, catData] of categories) {
        if (articlesGenerated >= articleLimit) break;
        
        for (let i = 0; i < Math.min(1, catData.techTopics.length); i++) {
          if (articlesGenerated >= articleLimit) break;
          
          try {
            console.log(`Generating tech article: ${catData.techTopics[i].title}`);
            const article = await generateTechArticle(catData.techTopics[i], catData.name, lovableApiKey);
            if (article) {
              await processArticle(article, "技术分享");
              articlesGenerated++;
            }
          } catch (e) {
            console.error(`Error generating tech article:`, e);
          }
        }
      }
    } else if (category === "产品资讯") {
      const categories = Object.entries(PRODUCT_CATEGORIES);
      let articlesGenerated = 0;
      
      for (const [key, catData] of categories) {
        if (articlesGenerated >= articleLimit) break;
        
        for (let i = 0; i < Math.min(1, catData.products.length); i++) {
          if (articlesGenerated >= articleLimit) break;
          
          try {
            console.log(`Generating product news: ${catData.products[i].name}`);
            const article = await generateProductNews(catData.products[i], catData.name, lovableApiKey);
            if (article) {
              await processArticle(article, "产品资讯");
              articlesGenerated++;
            }
          } catch (e) {
            console.error(`Error generating product news:`, e);
          }
        }
      }
    } else if (category === "公司新闻") {
      for (let i = 0; i < articleLimit; i++) {
        try {
          console.log(`Generating company news ${i + 1}`);
          const article = await generateCompanyNews(lovableApiKey, i);
          if (article) {
            await processArticle(article, "公司新闻");
          }
        } catch (e) {
          console.error(`Error generating company news:`, e);
        }
      }
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        count: results.length, 
        results,
        message: `成功生成 ${results.length} 篇文章，图片已通过Gemini 3 Pro处理`
      }),
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
