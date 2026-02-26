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
      { title: "COFDM调制在无人机数字图传中的抗干扰原理", desc: "深度解析COFDM编码正交频分复用技术如何在城市多径环境中保持链路稳定，包含Link Budget计算和空间分集接收算法分析" },
      { title: "工业无人机数字图传的低延迟传输链路设计", desc: "从编解码优化到RF基材选型（Rogers 4350B），解析如何实现端到端<30ms的玻璃到玻璃延迟" },
      { title: "数字图传vs模拟图传：工业应用场景下的技术选型指南", desc: "从延迟、抗干扰、加密、传输距离等维度进行参数化对比分析，附决策矩阵表格" },
      { title: "50km超远距离无人机图传方案：链路预算与天线配置", desc: "以37W VTX + 高增益天线为例，计算自由空间路径损耗、接收灵敏度、链路余量" },
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
      { title: "大功率VTX散热设计：从CNC铝合金到主动风道的工程实践", desc: "解析37W VTX在24小时连续作业中的热管理方案，包含热仿真数据和材料选型" },
      { title: "5.8GHz频段VTX的频谱管理：多机并发作业抗干扰策略", desc: "80频道分配方案、跳频扩频（FHSS）原理、同频干扰消除算法" },
      { title: "VTX功率选型与链路预算：2.5W到37W的应用场景匹配", desc: "不同功率等级的自由空间传输距离计算，结合国标法规的合规选型建议" },
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
      { title: "三轴云台稳定控制算法：从IMU融合到≤0.1mrad精度的实现路径", desc: "解析陀螺仪/加速度计数据融合、PID稳定控制、振动隔离设计" },
      { title: "双光融合成像技术在电力巡检中的缺陷检测应用", desc: "可见光4K 40x变焦+640×512热成像融合，配合YOLOv8边缘AI实时识别绝缘子、导线缺陷" },
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
      { title: "ExpressLRS协议深度解析：LoRa调制如何实现50km+超远距离控制", desc: "从LoRa扩频调制原理、跳频序列、接收灵敏度（-130dBm）到实际50km控制链路的实测分析" },
      { title: "ELRS vs CRSF vs ACCST：无人机遥控协议全面性能对比", desc: "延迟、刷新率、传输距离、开源性、兼容性的参数化对比矩阵" },
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
      { title: "无人机飞控双冗余IMU架构：从传感器融合到故障切换的安全设计", desc: "解析ICM42688双陀螺仪方案、EKF状态估计、断链返航逻辑、多重降落保护机制" },
      { title: "BLHeli_32电调协议与DShot1200：高性能电机驱动的技术原理", desc: "从PWM到DShot的演进，48KHz调速精度、电流检测、过温保护的工程实现" },
      { title: "飞控电调一体化飞塔设计：8层PCB布局与EMC优化", desc: "3-8S宽电压设计、电源完整性、信号隔离、散热设计的工程实践" },
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

// CANI 核心知识库（技术文章 AI 注入用）
const CANI_TECH_KNOWLEDGE = `
【CANI（长凌科技）核心技术知识库 - AI 写作必读】

品牌：长凌科技 (CANI UAV)，国家高新技术企业，ISO 9001，50+ 专利，200+ 研发工程师，产品覆盖 30+ 国家。

■ 数字图传系统 (COFDM Digital Video Link)
- 频段: 1.4GHz/2.4GHz/5.8GHz 多频段自适应跳频
- 距离: 10km-50km（工业级链路）
- 延迟: 端到端 < 30ms
- 视频: 1080P 60fps / 4K
- 调制: 自研 COFDM 编码正交频分复用
- 加密: AES-256-GCM 军事级
- 抗干扰: 空间分集接收 + FHSS 跳频扩频
- RF基材: Rogers 4350B 高频板材
- 防护: IP67, -40°C~+60°C, MIL-STD-461G EMC

■ VTX 视频发射器（模拟/大功率）
- 功率: 2.5W-37W 多档可调
- 旗舰 37W VTX: 50km+ 传输距离
- 频道: 80频道宽频, 4.9-6.1GHz
- 散热: 航空级铝合金 CNC + 主动散热风道
- 连续作业: 24小时不间断

■ 飞控 (FC) & 电调 (ESC)
- FC: STM32F722/H743 双冗余IMU, ICM42688双陀螺仪
- ESC: 55A-100A, BLHeli_32/AM32, DShot1200, 48KHz PWM
- 兼容: Betaflight/iNav/ArduPilot/PX4
- 工艺: 8层PCB, 3-8S宽电压

■ ELRS 遥控系统 (ExpressLRS)
- 距离: 50km+ (915MHz)
- 调制: LoRa 扩频
- 刷新率: 500Hz
- 延迟: < 1ms 亚毫秒级
- 灵敏度: -130dBm (LNA增强型)

■ 云台吊舱
- 稳定: ≤0.1mrad 三轴
- 可见光: 4K 40x光学变焦
- 热成像: 640×512 辐射测温
- AI: 4T算力, YOLOv8边缘推理
- 接口: DJI PSDK / MAVLink
- 测距: 1.5km LRF

■ 行业应用矩阵
- 电力巡检: COFDM抗EMI + 37W VTX链路不丢包
- 应急救援: 30ms低延迟 + 0.01lux夜视
- 物流运输: 集群通信, 多机不串频
- 测绘: 高带宽大容量数据传输
- 水利环保: 50km BVLOS + AI违规检测
`;

// 生成技术分享文章（升级版：技术架构师模式）
async function generateTechArticle(topic: { title: string; desc: string }, categoryName: string, apiKey: string) {
  const prompt = `【角色】你是 CANI（长凌科技）的首席技术官（CTO），资深无人机系统工程师，负责撰写建立行业权威的深度技术分析文章。

【CANI 核心知识库 - 写作前必读】
${CANI_TECH_KNOWLEDGE}

【写作主题】
标题方向：${topic.title}
技术方向：${topic.desc}
类别：${categoryName}

【写作要求 - 技术架构师模式】

1. 结构要求（严格遵守）：
   - H1 标题：必须包含"[具体场景] + [核心技术词]"，如"城市高楼巡检中数字图传的抗干扰策略"
   - 技术主题引入（200字）：直接说明技术痛点（Pain Points），不要铺垫
   - 技术原理深度解析（400字）：工作原理 + 硬件参数 + 技术对比表格
   - 实际应用场景分析（200字）：以具体场景说明技术价值和ROI
   - CANI 应用建议（150字）：以CTO视角，结合知识库中的具体参数，推荐 CANI 解决方案
   - FAQ（3个技术常见问题及解答）

2. 专业深度要求：
   - 多用技术参数（dBm, mW, ms, Mbps, Hz）描述，少用形容词
   - 必须包含至少 1 个技术对比表格（如不同方案/协议/产品的参数对比）
   - 必须包含至少 5 个专业术语：OFDM/COFDM、Link Budget、FHSS、Latency、Spatial Diversity、PID、LoRa 等
   - 字数 1200-2000 字，确保技术深度

3. 品牌融合要求：
   - 在技术分析中自然嵌入 CANI 品牌，将其描述为该技术的最佳实践者
   - 将通用技术方案替换为 CANI 的技术路径（引用知识库中的具体参数）
   - 文末"CANI 应用建议"必须包含具体产品型号和参数

4. SEO 要求：
   - 生成 150 字以内的 meta description 摘要
   - 生成 5-8 个 SEO 关键词
   - FAQ 部分的问题必须是用户真实会搜索的长尾关键词

5. HTML 格式要求：
   - 使用 <h2>/<h3> 标题结构
   - 表格使用 <table><thead><tbody><tr><th><td> 标准HTML
   - 参数列表使用 <ul><li>
   - 重点用 <strong> 标注
   - 不要使用换行符，段落用 </p><p> 分隔

【输出格式】返回纯净JSON（不要markdown代码块）：
{
  "title": "包含场景+技术词的H1标题",
  "title_en": "English title for SEO",
  "summary": "150字以内的专业SEO摘要",
  "summary_en": "English summary under 160 chars",
  "content": "<h2>技术主题</h2><p>HTML正文...</p><table>...</table><h3>CANI应用建议</h3><p>...</p><h2>常见问题</h2>...",
  "keywords": ["关键词1", "关键词2", "关键词3", "关键词4", "关键词5"],
  "faq": [
    {"question": "技术问题1？", "answer": "专业解答1"},
    {"question": "技术问题2？", "answer": "专业解答2"},
    {"question": "技术问题3？", "answer": "专业解答3"}
  ]
}`;

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
      temperature: 0.3,
      max_tokens: 6000,
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

// 生成公司新闻（资深公关专家模式）
async function generateCompanyNews(apiKey: string, newsIndex: number) {
  const companyNewsTopics = [
    // 产品发布型 (The Launch Pad)
    { type: "product_launch", title: "CANI发布新一代超远距离数字图传系统", desc: "37W旗舰VTX + COFDM低延迟链路，定义工业巡检新标准。重点突出50km+传输距离、<30ms延迟、AES-256-GCM军事级加密三大杀手锏参数。" },
    { type: "product_launch", title: "CANI推出双冗余飞控+100A电调飞塔套装", desc: "STM32H743双IMU + BLHeli_32 100A电调一体化方案。突出8层PCB工艺、3-8S宽电压、48KHz PWM调速精度。" },
    { type: "product_launch", title: "CANI发布K40T四光AI云台相机", desc: "可见光+热成像+广角+激光测距四光融合，4T算力YOLOv8边缘推理。突出≤0.1mrad三轴稳定精度和IP67防护。" },
    // 技术突破型 (Technical Breakthrough)
    { type: "tech_update", title: "CANI图传系统抗干扰能力提升30%", desc: "自研COFDM调制算法重大升级，空间分集接收+自适应FHSS跳频扩频在城市多径环境下实测链路稳定性提升30%。" },
    { type: "tech_update", title: "CANI ELRS遥控系统固件升级", desc: "LoRa调制算法优化，接收灵敏度提升至-132dBm，500Hz刷新率下实测控制距离突破55km。" },
    { type: "tech_update", title: "CANI飞控PID算法优化升级", desc: "EKF状态估计引擎升级，双陀螺仪融合精度提升，6级风条件下悬停抖动降低40%。" },
    // 展会/信任型 (Trust Builder)
    { type: "event", title: "CANI亮相深圳国际无人机展", desc: "展示全系工业级无人机配件解决方案，现场技术咨询超500人次，与多家行业龙头签署战略合作意向。" },
    { type: "event", title: "CANI通过ISO 9001国际质量体系认证升级", desc: "全流程质量管控体系获得国际权威认可，产品出口30+国家的品质基石。" },
    { type: "event", title: "CANI获得第50项国家专利授权", desc: "覆盖COFDM调制、散热设计、天线优化等核心技术领域，研发实力获国家认可。" },
  ];

  const topic = companyNewsTopics[newsIndex % companyNewsTopics.length];
  
  const typeInstructions: Record<string, string> = {
    product_launch: `【撰写策略 - 产品发布型 The Launch Pad】
- 核心指令：突出该产品解决了行业内哪个"久治不愈"的痛点
- 列出3个竞争对手不具备的杀手锏参数（引用知识库数据）
- 使用HTML <table> 展示3-5个关键技术指标对比
- 语气：自信、突破性，多用"领先"、"首创"、"定义新标准"`,
    tech_update: `【撰写策略 - 技术突破型 Technical Breakthrough】
- 核心指令：详细解释这次技术升级背后的底层逻辑
- 将复杂算法解释得通俗易懂，让客户明白升级后飞机更稳、更远、更安全
- 必须包含"升级前 vs 升级后"参数对比表格
- 语气：严谨、专业、有说服力`,
    event: `【撰写策略 - 展会/信任型 Trust Builder】
- 核心指令：记录CANI的行业影响力和客户认可度
- 强调现场专家咨询量、客户反馈、合作签约等数据
- 建立品牌在行业内的权威地位和信任感
- 语气：稳重、权威、有温度`,
  };

  const prompt = `【角色】你是 CANI（长凌科技）的高级公关经理（PR Director），负责将内部素材转化为具有商业吸引力的企业新闻稿。每篇公司新闻都是一个强力的销售线索（Lead Generation）入口。

${CANI_TECH_KNOWLEDGE}

【新闻主题】${topic.title}
【素材方向】${topic.desc}
【新闻类型】${topic.type}

${typeInstructions[topic.type] || typeInstructions.product_launch}

【输出结构（严格遵守）】
1. 权威标题：体现品牌领导地位（如"CANI发布新一代XXX，定义工业巡检新标准"）
2. 导语（100字）：总结事件核心意义，第一句话直接切入主题
3. 核心特性/事件详情（300字）：
   - 产品发布型：技术参数表格 + 行业痛点解决方案
   - 技术突破型：升级前后对比表格 + 底层技术逻辑
   - 展会型：参展数据 + 客户反馈 + 合作成果
4. 应用展望（200字）：描述如何改变下游客户的作业效率/ROI
5. 品牌背书（100字）：固定包含CANI公司简介——"关于长凌科技：CANI（长凌科技）是国家高新技术企业，专注工业级无人机核心配件的研发与制造，产品覆盖数字图传、飞控电调、ELRS遥控、云台吊舱等全系列，服务全球30+国家的电力巡检、应急救援、测绘物流等关键行业。"
6. CTA转化框：文末必须包含——"📩 对这款产品/技术感兴趣？<a href='/contact'>联系我们的技术工程师获取定制方案</a> 或 <a href='/products'>浏览完整产品中心</a>"

【关键约束】
- 总字数800-1200字
- 每篇必须提及至少2个CANI产品系列的具体参数
- 必须包含至少1个HTML <table> 参数表格
- 数据和参数必须基于知识库，不要编造
- 语气自信、专业、稳重
- 禁止"据报道"、"近期"等词汇，以CANI官方第一视角叙述
- SEO关键词必须包含CANI品牌词和产品型号

【HTML格式】
- <h3> 小标题
- <p> 段落（不要使用换行符）
- <table><thead><tbody><tr><th><td> 参数表格
- <strong> 强调关键词
- <ul><li> 列表
- <blockquote> 重要引言

【输出格式】返回纯净JSON（不要markdown代码块）：
{
  "title": "CANI品牌词+产品+价值主张的标题",
  "title_en": "English title for international SEO",
  "summary": "100字以内的新闻摘要",
  "summary_en": "English summary under 160 chars",
  "content": "<h3>导语</h3><p>HTML正文...</p><table>...</table><p>📩 对这款产品感兴趣？...</p>",
  "keywords": ["CANI", "长凌科技", "产品关键词", "技术关键词", "应用场景"],
  "faq": [
    {"question": "CANI XX产品有哪些核心优势？", "answer": "..."},
    {"question": "该技术如何应用于XX场景？", "answer": "..."}
  ]
}`;

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
      temperature: 0.5,
      max_tokens: 5000,
    }),
  });

  if (!response.ok) {
    throw new Error(`Doubao API error: ${response.status}`);
  }

  const data = await response.json();
  const aiContent = data.choices?.[0]?.message?.content || "";
  return safeParseJSON(aiContent);
}

// 生成行业动态文章（资深分析师模式）
async function generateIndustryNews(apiKey: string, newsIndex: number) {
  const industryTopics = [
    { title: "低空经济政策加速落地", desc: "多地发布低空经济政策，分析对无人机配件产业链的影响" },
    { title: "eVTOL适航认证取得突破", desc: "全球eVTOL适航认证进展，对高可靠性飞控和图传的需求升级" },
    { title: "工业无人机市场格局变化", desc: "行业巨头最新产品动态及市场格局变化分析" },
    { title: "无人机供应链技术升级", desc: "核心配件技术迭代趋势：更高带宽图传、更智能飞控" },
    { title: "全球无人机法规动态", desc: "FAA/EASA/CAAC最新法规变化，对BVLOS运营和配件认证的影响" },
    { title: "无人机行业投融资热点", desc: "最新投融资事件分析，解读资本对配件供应链的影响" },
  ];

  const topic = industryTopics[newsIndex % industryTopics.length];
  
  const prompt = `【角色】你是无人机行业资深分析师，拥有10年行业观察经验。请撰写一篇行业动态简报。

${CANI_TECH_KNOWLEDGE}

【主题方向】${topic.title}
【分析角度】${topic.desc}

【写作要求 - 快速、精炼、观点独特】

1. 标题要求：
   - 使用【快讯】/【深度解析】/【行业周报】前缀
   - 包含行业热点词，具有时效迫切感
   - 禁止"XX发布"等平庸标题

2. 内容结构（严格遵守）：
   - 核心快讯（150字内）：三句话概括背景、核心人物/公司、结果
   - 深度解读（250字）：分析对无人机配件供应链（图传、飞控、电调、ELRS）的具体影响
   - CANI观点（150字）：以CANI技术储备分析机遇/挑战，引用具体产品参数
   - 行业展望（100字）：未来趋势预判

3. 关键约束：
   - 总字数600-800字，精炼不废话
   - 第一句话必须是标准事实陈述（利于Google精选摘要零位排名）
   - 禁止"据报道"、"近期"等采集痕迹词汇
   - 重要政策原文使用 <blockquote> 标签引用
   - 从供应链和底层硬件角度分析
   - 自动提取主体公司名和技术词作为关键词

4. HTML格式：<p>段落</p>、<h3>小标题</h3>、<strong>重点</strong>、<blockquote>政策引用</blockquote>
   不要使用换行符，段落用</p><p>分隔

【输出格式】返回纯净JSON（不要markdown代码块）：
{
  "title": "【快讯】包含热点词的标题",
  "title_en": "English title for SEO",
  "summary": "一句话核心摘要（50字内）",
  "summary_en": "English summary under 80 chars",
  "content": "<h3>核心快讯</h3><p>HTML正文...</p><h3>CANI观点</h3><p>...</p>",
  "keywords": ["低空经济", "无人机配件", "供应链", "keyword4", "keyword5"],
  "faq": [
    {"question": "该动态对无人机配件市场有何影响？", "answer": "..."},
    {"question": "CANI如何应对这一趋势？", "answer": "..."}
  ]
}`;

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
      
      // Build FAQ HTML if available
      let faqHtml = '';
      if (article.faq && Array.isArray(article.faq) && article.faq.length > 0) {
        faqHtml = '<h2>常见问题 (FAQ)</h2>';
        article.faq.forEach((f: any) => {
          faqHtml += `<h3>${f.question}</h3><p>${f.answer}</p>`;
        });
      }
      
      const finalContent = contentWithImages + faqHtml;
      
      const { error } = await supabase.from("news_articles").insert({
        id: articleId,
        title: article.title,
        title_en: article.title_en || null,
        summary: article.summary,
        summary_en: article.summary_en || null,
        content: finalContent,
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
    } else if (category === "行业动态") {
      for (let i = 0; i < articleLimit; i++) {
        try {
          console.log(`Generating industry dynamics ${i + 1}`);
          const article = await generateIndustryNews(doubaoApiKey, i);
          if (article) {
            await processArticle(article, "行业动态");
          }
        } catch (e) {
          console.error(`Error generating industry news:`, e);
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
