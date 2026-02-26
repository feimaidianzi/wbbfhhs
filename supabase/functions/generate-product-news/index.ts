import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
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

// 豆包不支持图片编辑，直接返回原图
async function processImageWithDoubao(imageData: Uint8Array, _contentType: string): Promise<Uint8Array | null> {
  console.log("Image processing: returning original image (Doubao does not support image editing)");
  return imageData;
}

// 使用豆包 Seedream 模型生成图片
async function generateImageWithDoubao(prompt: string): Promise<Uint8Array | null> {
  try {
    const DOUBAO_API_KEY = Deno.env.get("DOUBAO_API_KEY");
    if (!DOUBAO_API_KEY) {
      console.log("DOUBAO_API_KEY not found, cannot generate image");
      return null;
    }

    console.log("Generating image with Doubao Seedream...");
    const response = await fetch("https://ark.cn-beijing.volces.com/api/v3/images/generations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${DOUBAO_API_KEY}`,
      },
      body: JSON.stringify({
        model: "doubao-seedream-4-0-250828",
        prompt: prompt,
        response_format: "b64_json",
        size: "1024x1024",
        sequential_image_generation: "disabled",
        stream: false,
        watermark: false,
      }),
      signal: AbortSignal.timeout(60000),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Doubao Seedream error:", response.status, errorText);
      return null;
    }

    const data = await response.json();
    const b64 = data.data?.[0]?.b64_json;
    if (!b64) {
      console.log("No image data returned from Doubao Seedream");
      return null;
    }

    // base64 → Uint8Array
    const binaryStr = atob(b64);
    const bytes = new Uint8Array(binaryStr.length);
    for (let i = 0; i < binaryStr.length; i++) {
      bytes[i] = binaryStr.charCodeAt(i);
    }
    console.log(`Doubao Seedream generated image: ${bytes.length} bytes`);
    return bytes;
  } catch (error) {
    console.error("Doubao Seedream generation error:", error);
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

// 获取并处理文章配图（3-5张）
async function getArticleImages(
  imageCount: number,
  supabase: any,
  articleId: string,
  articleTitle: string = "无人机技术"
): Promise<string[]> {
  const images: string[] = [];
  const targetCount = Math.min(Math.max(imageCount, 3), 5); // 3-5张
  
  const localImages = getLocalDroneImages();
  
  // 第一阶段：处理现有图片（最多2张）
  const existingImageCount = Math.min(2, targetCount);
  for (let i = 0; i < existingImageCount && images.length < existingImageCount; i++) {
    try {
      const randomIndex = Math.floor(Math.random() * localImages.length);
      const selectedImage = localImages[randomIndex];
      
      console.log(`Processing image ${i + 1}/${existingImageCount}: ${selectedImage.substring(0, 50)}...`);
      
      const { imageData, contentType } = await downloadImage(selectedImage);
      
      if (!imageData) {
        console.log("Failed to download image, skipping...");
        continue;
      }
      
      // 使用 Doubao 处理图片（目前直接返回原图）
      const processedImage = await processImageWithDoubao(imageData, contentType);
      
      if (processedImage) {
        const uploadedUrl = await uploadImageToStorage(supabase, processedImage, articleId, i, contentType);
        if (uploadedUrl) {
          images.push(uploadedUrl);
          console.log(`Image ${i + 1} processed and uploaded successfully`);
        }
      } else {
        // 如果处理失败，直接上传原图
        console.log("Processing failed, uploading original...");
        const uploadedUrl = await uploadImageToStorage(supabase, imageData, articleId, i, contentType);
        if (uploadedUrl) {
          images.push(uploadedUrl);
        }
      }
      
      await new Promise(resolve => setTimeout(resolve, 1500));
    } catch (e) {
      console.error(`Error processing image ${i}:`, e);
    }
  }
  
  // 第二阶段：如果图片不够，尝试生成新图片
  const imagePrompts = [
    `Generate a professional photo of a modern industrial drone with camera gimbal flying over a city skyline. Ultra high resolution, realistic photography style.`,
    `Generate a close-up photo of drone electronic components, circuit boards, and flight controllers. Professional product photography, clean background.`,
    `Generate a photo of a professional pilot operating a commercial drone for industrial inspection. Realistic, high quality.`,
    `Generate a photo of multiple drones performing a coordinated light show at night. Spectacular aerial display.`,
  ];
  
  let generatedCount = 0;
  while (images.length < targetCount && generatedCount < 2) {
    try {
      const prompt = imagePrompts[generatedCount % imagePrompts.length];
      console.log(`Generating new image ${images.length + 1}...`);
      
      const generatedImage = await generateImageWithDoubao(prompt);
      
      if (generatedImage) {
        const uploadedUrl = await uploadImageToStorage(supabase, generatedImage, articleId, images.length, "image/png");
        if (uploadedUrl) {
          images.push(uploadedUrl);
          console.log(`Generated image ${images.length} uploaded successfully`);
        }
      }
      
      generatedCount++;
      await new Promise(resolve => setTimeout(resolve, 1500));
    } catch (e) {
      console.error("Error generating image:", e);
      generatedCount++;
    }
  }
  
  console.log(`Got ${images.length} total images (processed + generated)`);
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

// 安全解析JSON并清理内容
function safeParseJSON(text: string): any {
  try {
    // 提取JSON部分
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) return null;
    
    let jsonStr = jsonMatch[0];
    
    // 解析JSON
    const parsed = JSON.parse(jsonStr);
    
    // 清理content中的换行符和多余空白
    if (parsed.content) {
      parsed.content = parsed.content
        .replace(/\\n/g, ' ')
        .replace(/\n/g, ' ')
        .replace(/\s{2,}/g, ' ')
        .replace(/<\/p>\s*<p>/g, '</p><p>')
        .trim();
    }
    
    if (parsed.summary) {
      parsed.summary = parsed.summary
        .replace(/\\n/g, ' ')
        .replace(/\n/g, ' ')
        .replace(/\s{2,}/g, ' ')
        .trim();
    }
    
    return parsed;
  } catch (e) {
    console.error("JSON parse error, trying fallback:", e);
    try {
      const titleMatch = text.match(/"title"\s*:\s*"([^"]+)"/);
      const summaryMatch = text.match(/"summary"\s*:\s*"([^"]+)"/);
      const keywordsMatch = text.match(/"keywords"\s*:\s*\[([^\]]+)\]/);
      
      if (titleMatch && summaryMatch) {
        // 提取content部分
        const contentMatch = text.match(/"content"\s*:\s*"([\s\S]*?)(?:"\s*,\s*"keywords|"\s*\})/);
        let content = contentMatch ? contentMatch[1] : "";
        
        // 清理content
        content = content
          .replace(/\\n/g, ' ')
          .replace(/\\"/g, '"')
          .replace(/\s{2,}/g, ' ')
          .trim();
        
        return {
          title: titleMatch[1],
          summary: summaryMatch[1].replace(/\\n/g, ' ').replace(/\s{2,}/g, ' '),
          content: content.length > 0 ? `<p>${content.substring(0, 3000)}</p>` : "<p>文章内容生成中...</p>",
          keywords: keywordsMatch ? keywordsMatch[1].split(',').map(k => k.replace(/"/g, '').trim()) : ["无人机", "技术", "长凌科技"]
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

要求：
1. 技术科普，What/Why/How结构，1000-1500字
2. 使用HTML格式：<p>段落</p>、<h3>小标题</h3>、<strong>重点</strong>、<ul><li>列表</li></ul>
3. 文章中必须体现长凌科技（CANI）的品牌名称
4. 不要使用换行符，段落之间用</p><p>分隔

返回纯净JSON格式（不要markdown代码块）：
{"title":"中文标题","summary":"100字摘要","content":"<p>HTML正文</p><p>多个段落</p>","keywords":["关键词1","关键词2","关键词3"]}`;

  const response = await fetch("https://ark.cn-beijing.volces.com/api/v3/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "doubao-seed-1-6-lite-251015",
      messages: [
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 4000,
    }),
  });

  if (!response.ok) {
    throw new Error(`Doubao API error: ${response.status}`);
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

要求：
1. 产品发布风格，800-1200字
2. 使用HTML格式：<p>段落</p>、<h3>小标题</h3>、<strong>重点</strong>、<ul><li>列表</li></ul>
3. 文章中必须体现长凌科技（CANI）的品牌名称
4. 不要使用换行符，段落之间用</p><p>分隔

返回纯净JSON格式（不要markdown代码块）：
{"title":"中文标题","summary":"100字摘要","content":"<p>HTML正文</p><p>多个段落</p>","keywords":["关键词1","关键词2","关键词3"]}`;

  const response = await fetch("https://ark.cn-beijing.volces.com/api/v3/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "doubao-seed-1-6-lite-251015",
      messages: [
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 4000,
    }),
  });

  if (!response.ok) {
    throw new Error(`Doubao API error: ${response.status}`);
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

要求：
1. 正式新闻稿，600-1000字
2. 使用HTML格式：<p>段落</p>、<h3>小标题</h3>、<strong>重点</strong>
3. 文章中必须体现长凌科技（CANI）的品牌名称
4. 不要使用换行符，段落之间用</p><p>分隔

返回纯净JSON格式（不要markdown代码块）：
{"title":"中文标题","summary":"80字摘要","content":"<p>HTML正文</p><p>多个段落</p>","keywords":["关键词1","关键词2","关键词3"]}`;

  const response = await fetch("https://ark.cn-beijing.volces.com/api/v3/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "doubao-seed-1-6-lite-251015",
      messages: [
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 4000,
    }),
  });

  if (!response.ok) {
    throw new Error(`Doubao API error: ${response.status}`);
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
    // Require authenticated admin user
    const authHeader = req.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
    const supabaseAuth = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!,
      { global: { headers: { Authorization: authHeader } } }
    );
    const token = authHeader.replace('Bearer ', '');
    const { data: claimsData, error: claimsError } = await supabaseAuth.auth.getClaims(token);
    if (claimsError || !claimsData?.claims) {
      return new Response(JSON.stringify({ error: 'Invalid token' }), {
        status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
    const { data: isAdmin } = await supabaseAuth.rpc('has_role', { _user_id: claimsData.claims.sub, _role: 'admin' });
    if (!isAdmin) {
      return new Response(JSON.stringify({ error: 'Forbidden: admin access required' }), {
        status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const { category, count = 1, imageCount = 2, batchMode = false } = await req.json();
    
    const doubaoApiKey = Deno.env.get("DOUBAO_API_KEY");
    
    if (!doubaoApiKey) {
      return new Response(
        JSON.stringify({ success: false, error: "DOUBAO_API_KEY not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Using Doubao API for article generation");

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const results: any[] = [];
    
    // 优化：分批处理，每次只生成1篇文章避免超时
    const processArticle = async (article: any, category: string) => {
      const articleId = crypto.randomUUID();
      
      // 获取并处理配图
      const images = await getArticleImages(
        imageCount,
        supabase,
        articleId,
        article.title
      );
      
      // 封面图使用第一张
      const coverImage = images.length > 0 ? images[0] : null;
      
      // 将所有其他图片插入到内容中
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
            const article = await generateTechArticle(catData.techTopics[i], catData.name, doubaoApiKey);
            if (article) {
              await processArticle(article, "技术分享");
              articlesGenerated++;
            }
          } catch (e) {
            console.error(`Error generating tech article:`, e);
          }
        }
      }
    } else if (category === "公司新闻") {
    } else if (category === "公司新闻") {
      for (let i = 0; i < articleLimit; i++) {
        try {
          console.log(`Generating company news ${i + 1}`);
          const article = await generateCompanyNews(doubaoApiKey, i);
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
        message: `成功生成 ${results.length} 篇文章，使用豆包API`
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
