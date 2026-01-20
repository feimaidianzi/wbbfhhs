import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// ========== 图片AI评估配置 ==========
const IMAGE_SCORE_THRESHOLD = 6; // 图片评分阈值
const MIN_IMAGE_SIZE = 10000; // 最小图片大小 (10KB)
const SUPPORTED_IMAGE_FORMATS = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

// 防盗链域名黑名单 - 这些域名的图片需要转存到本地
const HOTLINK_PROTECTED_DOMAINS = [
  'csdnimg.cn', 'csdn.net', 'sinaimg.cn', 'sina.com.cn', 'gamersky.com',
  'bilibili.com', 'hdslb.com', 'zhimg.com', 'zhihu.com', '36kr.com',
  'ithome.com', 'ifeng.com', 'sohu.com', 'qq.com', 'gtimg.cn', 'qpic.cn',
  'mmbiz.qpic.cn', 'weixin.qq.com', 'wechat.com', 'douyin.com', 'douyinpic.com',
  'toutiao.com', 'pstatp.com', 'bytedance.com', 'xiaohongshu.com', 'xhscdn.com',
  'kuaishou.com', 'kwai.com', 'toppodcast.com', 'gcores.com', 'alioss.gcores.com',
];

// 检查图片是否需要转存到本地
function needsLocalStorage(imageUrl: string): boolean {
  try {
    const url = new URL(imageUrl);
    const hostname = url.hostname.toLowerCase();
    return HOTLINK_PROTECTED_DOMAINS.some(domain => hostname.includes(domain));
  } catch {
    return false;
  }
}

// 下载图片
async function downloadImage(imageUrl: string): Promise<{ buffer: ArrayBuffer; contentType: string } | null> {
  try {
    const response = await fetch(imageUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'image/avif,image/webp,image/apng,image/*,*/*;q=0.8',
        'Referer': new URL(imageUrl).origin,
      },
      signal: AbortSignal.timeout(15000),
    });

    if (!response.ok) return null;

    const contentType = response.headers.get('content-type') || 'image/jpeg';
    if (!SUPPORTED_IMAGE_FORMATS.some(f => contentType.includes(f.split('/')[1]))) return null;

    const buffer = await response.arrayBuffer();
    if (buffer.byteLength < MIN_IMAGE_SIZE) return null;

    return { buffer, contentType };
  } catch {
    return null;
  }
}

// 生成唯一文件名
function generateImageFileName(contentType: string): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  const ext = contentType.includes('png') ? 'png' : 
              contentType.includes('webp') ? 'webp' : 
              contentType.includes('gif') ? 'gif' : 'jpg';
  return `${timestamp}-${random}.${ext}`;
}

// 上传图片到存储桶
async function uploadImageToStorage(
  supabase: any,
  buffer: ArrayBuffer,
  contentType: string,
  articleId: string
): Promise<string | null> {
  try {
    const fileName = `${articleId}/${generateImageFileName(contentType)}`;
    
    const { error } = await supabase.storage
      .from('news-images')
      .upload(fileName, buffer, { contentType, cacheControl: '31536000', upsert: false });

    if (error) return null;

    const { data: urlData } = supabase.storage
      .from('news-images')
      .getPublicUrl(fileName);

    return urlData.publicUrl;
  } catch {
    return null;
  }
}

// 使用AI评估图片与文章的相关性
async function evaluateImageRelevance(
  imageUrl: string,
  articleTitle: string,
  articleSummary: string
): Promise<{ score: number; reason: string; isRelevant: boolean }> {
  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      return { score: 7, reason: "未配置AI评估，默认通过", isRelevant: true };
    }

    const prompt = `你是一位专业的图片编辑，请评估以下图片是否适合用于新闻文章配图。

【文章标题】${articleTitle}

【文章摘要】${articleSummary.substring(0, 300)}

【评分标准】（满分10分）
1. 相关性（4分）：图片内容是否与文章主题相关（无人机、科技、航空、工业等）
2. 质量（3分）：图片是否清晰、专业、适合新闻配图
3. 适用性（3分）：图片是否适合放在专业企业官网的新闻页面

【扣分项】
- 明显是广告、促销图片：-5分
- 包含水印、logo覆盖：-3分
- 低质量、模糊、像素化：-3分
- 与无人机/科技完全无关：-4分
- 二维码、app下载引导：-5分
- 个人自拍、生活照：-3分
- 播客封面、音频应用图标：-5分

请直接返回JSON格式：
{
  "score": 7.5,
  "reason": "简要评价理由（30字以内）",
  "isRelevant": true
}`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-image-preview",
        messages: [{
          role: "user",
          content: [
            { type: "text", text: prompt },
            { type: "image_url", image_url: { url: imageUrl } }
          ]
        }],
        modalities: ["text"]
      }),
      signal: AbortSignal.timeout(30000),
    });

    if (!response.ok) {
      return { score: 6, reason: "AI评估失败，默认通过", isRelevant: true };
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "";
    
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const result = JSON.parse(jsonMatch[0]);
      const score = parseFloat(result.score) || 6;
      return {
        score,
        reason: result.reason || "评估完成",
        isRelevant: result.isRelevant !== false && score >= IMAGE_SCORE_THRESHOLD
      };
    }

    return { score: 6, reason: "解析失败，默认通过", isRelevant: true };
  } catch {
    return { score: 6, reason: "评估异常，默认通过", isRelevant: true };
  }
}

// 日志函数类型（用于图片处理函数）
type LogFunction = (
  type: 'info' | 'success' | 'warning' | 'error' | 'step',
  message: string,
  options?: {
    step?: 'search' | 'scrape' | 'clean' | 'score' | 'filter' | 'save' | 'rewrite' | 'keyword' | 'image';
    details?: string;
    articleTitle?: string;
    score?: number;
    isReviewOrAd?: boolean;
  }
) => void;

// 处理单张图片（AI评估 + 转存）
async function processArticleImage(
  supabase: any,
  imageUrl: string,
  articleId: string,
  articleTitle: string,
  articleSummary: string,
  addLog?: LogFunction
): Promise<{
  originalUrl: string;
  newUrl: string | null;
  score: number;
  isRelevant: boolean;
  wasConverted: boolean;
}> {
  const result = {
    originalUrl: imageUrl,
    newUrl: null as string | null,
    score: 0,
    isRelevant: false,
    wasConverted: false,
  };

  // 1. AI评估图片相关性
  addLog?.('info', `🖼️ AI评估图片...`, { step: 'image', details: imageUrl.substring(0, 60) });
  const evaluation = await evaluateImageRelevance(imageUrl, articleTitle, articleSummary);
  result.score = evaluation.score;
  result.isRelevant = evaluation.isRelevant;

  if (!evaluation.isRelevant) {
    addLog?.('warning', `❌ 图片评分 ${evaluation.score} 不通过: ${evaluation.reason}`, { step: 'image' });
    return result;
  }

  addLog?.('success', `✅ 图片评分 ${evaluation.score}: ${evaluation.reason}`, { step: 'image' });

  // 2. 检查是否需要转存
  if (needsLocalStorage(imageUrl)) {
    addLog?.('info', `📥 下载防盗链图片...`, { step: 'image' });
    
    const downloaded = await downloadImage(imageUrl);
    if (!downloaded) {
      result.isRelevant = false;
      addLog?.('warning', `下载失败，跳过此图片`, { step: 'image' });
      return result;
    }

    const localUrl = await uploadImageToStorage(supabase, downloaded.buffer, downloaded.contentType, articleId);
    if (localUrl) {
      result.newUrl = localUrl;
      result.wasConverted = true;
      addLog?.('success', `📤 图片已转存到本地`, { step: 'image' });
    } else {
      result.isRelevant = false;
      addLog?.('warning', `上传失败，跳过此图片`, { step: 'image' });
    }
  } else {
    result.newUrl = imageUrl;
  }

  return result;
}

// 处理文章中的所有图片
async function processAllArticleImages(
  supabase: any,
  articleId: string,
  content: string,
  coverImage: string | null,
  title: string,
  summary: string,
  addLog?: LogFunction
): Promise<{
  newContent: string;
  newCoverImage: string | null;
  processedCount: number;
  convertedCount: number;
  rejectedCount: number;
}> {
  let newContent = content;
  let newCoverImage = coverImage;
  let processedCount = 0;
  let convertedCount = 0;
  let rejectedCount = 0;

  // 提取content中的所有图片
  const imgMatches = content.match(/<img[^>]+src=["']([^"']+)["'][^>]*>/gi) || [];
  const imageUrls: string[] = [];
  
  for (const match of imgMatches) {
    const srcMatch = match.match(/src=["']([^"']+)["']/i);
    if (srcMatch && srcMatch[1]) {
      imageUrls.push(srcMatch[1]);
    }
  }

  addLog?.('step', `🖼️ 开始AI图片评估 (${imageUrls.length + (coverImage ? 1 : 0)} 张)`, { step: 'image' });

  // 处理封面图
  if (coverImage) {
    const result = await processArticleImage(supabase, coverImage, articleId, title, summary, addLog);
    processedCount++;
    
    if (result.isRelevant && result.newUrl) {
      newCoverImage = result.newUrl;
      if (result.wasConverted) convertedCount++;
    } else {
      rejectedCount++;
      newCoverImage = null;
    }
  }

  // 处理正文图片
  for (const imgUrl of imageUrls) {
    const result = await processArticleImage(supabase, imgUrl, articleId, title, summary, addLog);
    processedCount++;
    
    if (result.isRelevant && result.newUrl && result.newUrl !== imgUrl) {
      // 替换内容中的图片URL
      newContent = newContent.replace(
        new RegExp(escapeRegExpForImage(imgUrl), 'g'),
        result.newUrl
      );
      if (result.wasConverted) convertedCount++;
    } else if (!result.isRelevant) {
      // 删除不相关的图片
      newContent = newContent.replace(
        new RegExp(`<figure[^>]*>\\s*<img[^>]*src=["']${escapeRegExpForImage(imgUrl)}["'][^>]*>\\s*(?:<figcaption[^>]*>.*?</figcaption>)?\\s*</figure>`, 'gi'),
        ''
      );
      newContent = newContent.replace(
        new RegExp(`<img[^>]*src=["']${escapeRegExpForImage(imgUrl)}["'][^>]*>`, 'gi'),
        ''
      );
      rejectedCount++;
    }
  }

  // 清理多余空行
  newContent = newContent.replace(/\n{3,}/g, '\n\n');

  addLog?.('success', `图片处理完成: ${processedCount} 张评估, ${convertedCount} 张转存, ${rejectedCount} 张剔除`, { step: 'image' });

  return { newContent, newCoverImage, processedCount, convertedCount, rejectedCount };
}

// 转义正则表达式特殊字符
function escapeRegExpForImage(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// 公司产品列表 - 用于生成关键词
const COMPANY_PRODUCTS = {
  drones: ["多旋翼无人机", "Multi-rotor drone", "quadcopter", "hexacopter"],
  vtx: ["VTX", "VRX", "video transmitter", "视频发射器", "图传"],
  fc: ["飞控", "电调", "flight controller", "ESC", "FC"],
  gimbal: ["吊舱", "云台", "gimbal", "camera gimbal"],
  digitalFpv: ["数字图传", "digital FPV", "HD video link"],
  camera: ["无人机相机", "drone camera", "FPV camera"],
  elrs: ["ELRS", "ExpressLRS", "长距离遥控"],
  gps: ["GPS模块", "drone GPS", "GNSS module"],
  receiver: ["接收屏", "FPV monitor", "接收机"],
  goggles: ["FPV眼镜", "FPV goggles", "视频眼镜"],
  accessories: ["无人机配件", "drone accessories", "无人机零件"],
};

// 分类配置 - 与新闻中心四板块对应
const CATEGORY_CONFIG = {
  "公司新闻": {
    // 基于公司产品生成的关键词
    keywords: [
      "长凌VTX发布", "Changling VTX release",
      "长凌无人机应用案例", "drone enterprise case study",
      "无人机公司融资", "drone company funding",
      "无人机制造商合作", "UAV manufacturer partnership",
      "FPV equipment manufacturer news",
    ],
    style: "正式、专业、强调企业实力和国际影响力",
    description: "企业动态、产品发布、应用案例等公司相关新闻",
    contentFocus: "重点关注无人机设备制造商的企业新闻，产品发布，合作案例",
  },
  "行业动态": {
    keywords: [
      "无人机政策法规 2025", "drone regulation policy 2025",
      "某地区发布无人机规定", "UAV airspace management policy",
      "无人机市场重大变革", "drone market transformation",
      "某国家新增无人机需求", "emerging drone demand",
      "eVTOL market growth", "商用无人机行业趋势",
    ],
    style: "客观、全面、有深度分析，关注国际政策和市场趋势",
    description: "政策法规、市场分析、行业趋势等宏观信息",
    contentFocus: "关注全球无人机政策变化、市场动态、行业发展趋势",
  },
  "产品资讯": {
    keywords: [
      "无人机技术突破 2025", "drone technology breakthrough",
      "新型无人机发布", "new drone release 2025",
      "无人机性能提升", "drone performance improvement",
      "FPV设备创新", "FPV equipment innovation",
      "无人机续航突破", "drone flight time breakthrough",
    ],
    style: "详细、技术性、突出产品特点和创新之处，介绍产品功能和应用场景",
    description: "新品发布、技术突破、产品功能等产品相关内容",
    contentFocus: "最新的无人机和配件产品发布、技术创新、性能提升",
  },
  "技术分享": {
    keywords: [
      "VTX是什么 what is VTX",
      "模拟图传和数字图传区别 analog vs digital FPV",
      "ELRS的作用 what is ELRS",
      "飞控工作原理 how flight controller works",
      "电调选择指南 ESC buying guide",
      "FPV入门教程 FPV beginner guide",
      "无人机GPS模块原理 drone GPS explained",
    ],
    style: "专业科普、深入浅出、解释技术原理和工作方式，适合技术爱好者阅读",
    description: "技术原理、教程、知识科普等技术内容",
    contentFocus: "以产品科普为主，解释无人机配件的工作原理、选购指南、使用教程",
  },
};

// 质量评分阈值
const QUALITY_THRESHOLD = 8.0;

// 无人机行业高质量备选图片库（来自免费图片网站的固定高质量URL）
// 当原文图片不足时使用这些图片
const DRONE_FALLBACK_IMAGES = [
  // 无人机飞行场景
  "https://images.pexels.com/photos/442587/pexels-photo-442587.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "https://images.pexels.com/photos/1034812/pexels-photo-1034812.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "https://images.pexels.com/photos/2050718/pexels-photo-2050718.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1200",
  // 科技/电子元器件
  "https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "https://images.pexels.com/photos/3825581/pexels-photo-3825581.jpeg?auto=compress&cs=tinysrgb&w=1200",
  // 航拍/远程控制
  "https://images.pexels.com/photos/724921/pexels-photo-724921.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "https://images.pexels.com/photos/336232/pexels-photo-336232.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "https://images.pexels.com/photos/912110/pexels-photo-912110.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "https://images.pexels.com/photos/1087180/pexels-photo-1087180.jpeg?auto=compress&cs=tinysrgb&w=1200",
  // 工业/技术
  "https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "https://images.pexels.com/photos/3862627/pexels-photo-3862627.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "https://images.pexels.com/photos/8566473/pexels-photo-8566473.jpeg?auto=compress&cs=tinysrgb&w=1200",
];

// 基础清理抓取的内容（正则清洗）
function basicCleanContent(rawContent: string): string {
  if (!rawContent) return "";
  
  let content = rawContent
    // 移除Markdown图片语法
    .replace(/!\[.*?\]\(.*?\)/g, '')
    // 移除Markdown链接，保留文字
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    // 移除URL
    .replace(/https?:\/\/[^\s)>\]]+/g, '')
    // 移除HTML标签
    .replace(/<[^>]+>/g, '')
    // 移除#号标题标记
    .replace(/^#{1,6}\s*/gm, '')
    // 移除独立的#号
    .replace(/\s#\s/g, ' ')
    .replace(/^#\s/gm, '')
    // 移除常见的网页杂乱文字
    .replace(/跳过内容|跳至主要内容|跳到主要内容|Skip to (?:main )?content/gi, '')
    .replace(/无结果|No results?|没有找到|未找到/gi, '')
    .replace(/登录|注册|Sign (?:in|up)|Log ?in|Register/gi, '')
    .replace(/分享到|Share (?:to|on)|转发|分享/gi, '')
    .replace(/阅读更多|Read more|查看更多|See more|了解更多|Learn more/gi, '')
    .replace(/返回顶部|Back to top|回到顶部/gi, '')
    .replace(/上一篇|下一篇|Previous|Next|上一页|下一页/gi, '')
    .replace(/点击此处|Click here|点击这里/gi, '')
    .replace(/订阅|Subscribe|关注我们|Follow us/gi, '')
    .replace(/版权所有|Copyright|All rights reserved|©\s*\d{4}/gi, '')
    .replace(/评论|Comments?|留言|回复/gi, '')
    .replace(/热门推荐|相关文章|Related (?:articles?|posts?)|推荐阅读/gi, '')
    .replace(/广告|Advertisement|Sponsored|赞助/gi, '')
    .replace(/Cookie|隐私政策|Privacy Policy|使用条款|Terms of (?:Use|Service)/gi, '')
    // 移除日期时间标记（如 ## 2026-01-14）
    .replace(/^##?\s*\d{4}-\d{2}-\d{2}\s*$/gm, '')
    // 移除纯数字行
    .replace(/^\d+\s*$/gm, '')
    // 移除特殊符号行
    .replace(/^[#\*\-=_\|]+\s*$/gm, '')
    // 移除连续的标点符号
    .replace(/[。，！？；：、]{2,}/g, '。')
    // 移除多余空行
    .replace(/\n{3,}/g, '\n\n')
    // 移除多余空格
    .replace(/[ \t]{2,}/g, ' ')
    .trim();

  // 移除短行（通常是导航或按钮文字）
  const lines = content.split('\n');
  const cleanedLines = lines.filter(line => {
    const trimmed = line.trim();
    // 保留长度超过10个字符的行，或者是段落开头
    return trimmed.length > 10 || trimmed === '';
  });
  content = cleanedLines.join('\n').trim();

  if (content.length < 100) return "";
  return content;
}

// 清理HTML内容中的无关图片（logo、二维码、app下载等）
function cleanHtmlImages(htmlContent: string): string {
  if (!htmlContent) return htmlContent;
  
  // 需要移除的图片URL模式
  const badImagePatterns = [
    // 域名黑名单
    /static-web\.stcn\.com/gi,
    /n\.sinaimg\.cn\/finance/gi,
    /k\.sinaimg\.cn/gi,
    /ddimg\.cn/gi,
    /apps\.apple\.com\/assets/gi,
    // 路径关键词
    /\/static\/images?\//gi,
    /qr\.png/gi,
    /qrcode/gi,
    /logo\.(png|jpg|jpeg|gif|webp)/gi,
    /app-download/gi,
    /aside-app/gi,
    /wechat-qr/gi,
    /ewm\./gi,
    // 小尺寸缩略图
    /w150h100/gi,
    /w\d{2,3}h\d{2,3}f\d/gi,
    /resize,w_[1-2]\d{2}/gi,
  ];
  
  // 匹配所有figure或img标签
  const figurePattern = /<figure[^>]*>[\s\S]*?<img[^>]*src=["']([^"']+)["'][^>]*>[\s\S]*?<\/figure>/gi;
  const imgPattern = /<img[^>]*src=["']([^"']+)["'][^>]*\/?>/gi;
  
  // 先处理figure标签
  let cleaned = htmlContent.replace(figurePattern, (match, imgUrl) => {
    for (const pattern of badImagePatterns) {
      if (pattern.test(imgUrl)) {
        console.log(`Removing bad image from content: ${imgUrl.substring(0, 80)}`);
        return ''; // 移除整个figure
      }
    }
    return match; // 保留
  });
  
  // 再处理独立的img标签
  cleaned = cleaned.replace(imgPattern, (match, imgUrl) => {
    for (const pattern of badImagePatterns) {
      // 重置正则的lastIndex
      pattern.lastIndex = 0;
      if (pattern.test(imgUrl)) {
        console.log(`Removing bad standalone img: ${imgUrl.substring(0, 80)}`);
        return '';
      }
    }
    return match;
  });
  
  // 清理可能产生的多余空行
  cleaned = cleaned.replace(/\n{3,}/g, '\n\n');
  
  return cleaned;
}

// 使用 Doubao API 深度清洗文章内容
async function deepCleanContentWithAI(rawContent: string, title: string): Promise<string> {
  try {
    const DOUBAO_API_KEY = Deno.env.get("DOUBAO_API_KEY");
    if (!DOUBAO_API_KEY) {
      console.log("DOUBAO_API_KEY not found, skipping AI content cleaning");
      return rawContent;
    }

    // 如果内容太短，跳过AI清洗
    if (rawContent.length < 200) {
      return rawContent;
    }

    console.log(`AI cleaning content for: ${title.substring(0, 50)}...`);
    
    const prompt = `你是一位专业的文章编辑，请帮我清洗以下采集的网页内容，去除所有与新闻正文无关的杂乱信息。

【原文标题】${title}

【原始内容】
${rawContent.substring(0, 8000)}

【清洗要求】
1. 删除所有#号标题标记和Markdown格式符号
2. 删除网站导航、菜单、按钮文字（如"首页"、"登录"、"分享"等）
3. 删除广告、推广、订阅相关内容
4. 删除版权声明、隐私政策等法律文本
5. 删除评论区、相关推荐、热门文章等非正文内容
6. 删除社交媒体分享按钮相关文字
7. 删除重复的段落或句子
8. 删除无意义的符号序列（如 "---"、"***"、"==="）
9. 删除乱码和不完整的句子
10. 保留完整、连贯、有意义的新闻正文内容

【输出要求】
- 只输出清洗后的纯文本内容
- 不要添加任何额外的说明或标记
- 保持段落结构，用空行分隔段落
- 确保内容可读、流畅、完整`;

    const response = await fetch(`https://ark.cn-beijing.volces.com/api/v3/responses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${DOUBAO_API_KEY}`,
      },
      signal: AbortSignal.timeout(60000), // 增加到60秒超时
      body: JSON.stringify({
        model: "doubao-seed-1-8-251228",
        thinking: { type: "disabled" },
        input: [{
          role: "user",
          content: [{ type: "input_text", text: prompt }],
        }],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Doubao content cleaning API error:", response.status, errorText);
      return rawContent;
    }

    const data = await response.json();
    
    // 提取AI返回的内容
    let cleanedContent = "";
    if (data.output && Array.isArray(data.output)) {
      for (const item of data.output) {
        if (item.type === "text" && item.text) {
          cleanedContent += item.text;
        } else if (item.type === "message" && item.content) {
          const content = Array.isArray(item.content) 
            ? item.content.map((c: any) => c.text || "").join("") 
            : item.content;
          cleanedContent += content;
        }
      }
    }
    if (!cleanedContent && data.choices?.[0]?.message?.content) {
      cleanedContent = data.choices[0].message.content;
    }

    // 如果AI返回的内容太短，使用原始内容
    if (cleanedContent.length < 100) {
      console.log("AI cleaned content too short, using original");
      return rawContent;
    }

    console.log(`AI cleaned content: ${rawContent.length} -> ${cleanedContent.length} chars`);
    return cleanedContent.trim();
  } catch (error) {
    console.error("AI content cleaning failed:", error);
    return rawContent;
  }
}

// 完整清洗流程：先基础清洗，再AI深度清洗
async function cleanContent(rawContent: string, title: string = ""): Promise<string> {
  // 第一步：基础正则清洗
  const basicCleaned = basicCleanContent(rawContent);
  
  if (!basicCleaned || basicCleaned.length < 100) {
    return "";
  }
  
  // 第二步：AI深度清洗
  const aiCleaned = await deepCleanContentWithAI(basicCleaned, title);
  
  // 最终验证
  if (aiCleaned.length < 100) {
    return "";
  }
  
  return aiCleaned;
}

// 使用 Doubao API 进行文章质量评分 - 增强版
async function scoreArticleQuality(
  title: string,
  content: string,
  category: string,
  addLog?: (type: 'info' | 'success' | 'warning' | 'error' | 'step', message: string, options?: any) => void
): Promise<{ score: number; reason: string; isReviewOrAd: boolean } | null> {
  try {
    const DOUBAO_API_KEY = Deno.env.get("DOUBAO_API_KEY");
    if (!DOUBAO_API_KEY) {
      console.log("DOUBAO_API_KEY not found, skipping quality scoring");
      addLog?.('warning', '未配置豆包API密钥，跳过评分', { step: 'score' });
      return { score: 10, reason: "未配置评分，默认通过", isReviewOrAd: false };
    }

    console.log("Scoring article quality with Doubao API...");
    addLog?.('info', '🤖 调用豆包AI进行质量评分...', { step: 'score', details: `文章: ${title.substring(0, 50)}` });
    
    const prompt = `你是一位资深新闻质量审核编辑。请对以下无人机行业新闻文章进行严格的质量评分和类型判断。

【评分维度】（各占2分，总分10分）：
1. 内容相关性：文章是否与无人机行业相关，是否符合"${category}"分类
2. 信息价值：内容是否有新闻价值，是否提供有用信息
3. 内容质量：文章结构是否清晰，语言是否专业
4. 原创深度：是否有独特见解或深度分析，而非简单转载
5. 可读性：文章是否易于理解，排版是否合理

【必须排除的文章类型】（发现则直接标记isReviewOrAd为true）：
- 产品测评/评测类文章（如"XX产品测评"、"使用体验"、"开箱评测"）
- 广告软文（明显推销某产品，有购买链接或促销信息）
- 产品对比评测（如"A vs B哪个好"）
- 个人使用心得/体验分享
- 赞助内容或付费推广
- 产品促销/折扣信息

【文章标题】${title}

【文章内容】${content.substring(0, 4000)}

【评分要求】
- 满分10分，低于8分的文章将被过滤
- 测评类、广告类文章isReviewOrAd必须为true
- 专业新闻报道、技术科普、行业分析给高分
- 软文、广告、测评给低分

请直接返回JSON格式：
{
  "score": 8.5,
  "reason": "简要评分理由（50字以内）",
  "isReviewOrAd": false
}`;

    const response = await fetch(`https://ark.cn-beijing.volces.com/api/v3/responses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${DOUBAO_API_KEY}`,
      },
      signal: AbortSignal.timeout(60000), // 增加到60秒超时
      body: JSON.stringify({
        model: "doubao-seed-1-8-251228",
        thinking: { type: "disabled" }, // 禁用深度思考，直接返回结果
        input: [{
          role: "user",
          content: [{ type: "input_text", text: prompt }],
        }],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Doubao quality scoring API error:", response.status, errorText);
      addLog?.('error', '豆包API评分请求失败', { step: 'score', details: `状态码: ${response.status}` });
      return { score: 8, reason: "评分API错误，默认通过", isReviewOrAd: false };
    }

    const data = await response.json();
    console.log("Doubao API response structure:", JSON.stringify(data).substring(0, 800));
    
    // 使用 thinking: minimal 后，返回 type: "text" 格式的直接回答
    let aiContent = "";
    if (data.output && Array.isArray(data.output)) {
      for (const item of data.output) {
        if (item.type === "text" && item.text) {
          // minimal 模式直接返回 text
          aiContent += item.text;
        } else if (item.type === "message" && item.content) {
          const content = Array.isArray(item.content) 
            ? item.content.map((c: any) => c.text || "").join("") 
            : item.content;
          aiContent += content;
        }
      }
    }
    // 兼容旧格式
    if (!aiContent && data.choices?.[0]?.message?.content) {
      aiContent = data.choices[0].message.content;
    }
    
    console.log("Extracted AI content:", aiContent.substring(0, 500));
    
    const jsonMatch = aiContent.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const result = JSON.parse(jsonMatch[0]);
      console.log(`Quality score: ${result.score} - ${result.reason} - isReviewOrAd: ${result.isReviewOrAd}`);
      
      // 记录 AI 评分对话内容到日志
      const scoreEmoji = result.score >= 8 ? '✅' : (result.isReviewOrAd ? '🚫' : '⚠️');
      addLog?.('info', `${scoreEmoji} AI评分结果: ${result.score}分`, { 
        step: 'score', 
        score: result.score,
        isReviewOrAd: result.isReviewOrAd,
        details: `豆包AI回复: "${result.reason}" ${result.isReviewOrAd ? '(测评/广告类)' : ''}`
      });
      
      return {
        score: parseFloat(result.score) || 8,
        reason: result.reason || "评分完成",
        isReviewOrAd: result.isReviewOrAd === true,
      };
    }

    addLog?.('warning', 'AI评分响应解析失败', { step: 'score', details: '无法从AI响应中提取JSON' });
    return { score: 8, reason: "解析失败，默认通过", isReviewOrAd: false };
  } catch (error) {
    console.error("Quality scoring failed:", error);
    addLog?.('error', 'AI评分异常', { step: 'score', details: String(error) });
    return { score: 8, reason: "评分异常，默认通过", isReviewOrAd: false };
  }
}

// 验证图片是否真实可访问且为高质量图片
async function validateImageUrl(imgUrl: string): Promise<boolean> {
  try {
    // 使用HEAD请求检查图片是否存在
    const response = await fetch(imgUrl, { 
      method: 'HEAD',
      signal: AbortSignal.timeout(5000) // 5秒超时
    });
    
    if (!response.ok) return false;
    
    // 检查Content-Type是否为图片
    const contentType = response.headers.get('content-type') || '';
    if (!contentType.startsWith('image/')) return false;
    
    // 检查文件大小（至少10KB，排除小图标）
    const contentLength = response.headers.get('content-length');
    if (contentLength && parseInt(contentLength) < 10000) return false;
    
    return true;
  } catch (error) {
    console.log(`Image validation failed: ${imgUrl}`);
    return false;
  }
}

// 批量验证图片并返回有效的图片列表
async function validateImages(images: string[], maxCount: number = 5): Promise<string[]> {
  const validImages: string[] = [];
  
  // 并行验证，但限制并发数
  const batchSize = 5;
  for (let i = 0; i < images.length && validImages.length < maxCount; i += batchSize) {
    const batch = images.slice(i, i + batchSize);
    const results = await Promise.all(
      batch.map(async (url) => {
        const isValid = await validateImageUrl(url);
        return isValid ? url : null;
      })
    );
    
    for (const result of results) {
      if (result && validImages.length < maxCount) {
        validImages.push(result);
      }
    }
  }
  
  return validImages;
}

// 全局已使用图片追踪 - 确保同一批次采集中不重复使用图片
const usedImagesInSession = new Set<string>();

// 获取高质量无人机配图 - 扩充的Unsplash图片库（50+张不重复图片）
function getDefaultDroneImages(): string[] {
  // 大量Unsplash上确认可用的无人机、科技、航空相关图片
  return [
    // 无人机相关
    "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800&q=80",
    "https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=800&q=80",
    "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=800&q=80",
    "https://images.unsplash.com/photo-1579829366248-204fe8413f31?w=800&q=80",
    "https://images.unsplash.com/photo-1521405924368-64c5b84bec60?w=800&q=80",
    "https://images.unsplash.com/photo-1506947411487-a56738267384?w=800&q=80",
    "https://images.unsplash.com/photo-1524143986875-3b098d78b363?w=800&q=80",
    "https://images.unsplash.com/photo-1559827291-72ee739d0d9a?w=800&q=80",
    "https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?w=800&q=80",
    "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80",
    // 航拍风景
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&q=80",
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80",
    "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=800&q=80",
    "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80",
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80",
    "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&q=80",
    "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=800&q=80",
    // 科技相关
    "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
    "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80",
    "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80",
    "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&q=80",
    "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&q=80",
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
    "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80",
    "https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=800&q=80",
    // 城市航拍
    "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80",
    "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&q=80",
    "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&q=80",
    "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800&q=80",
    "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80",
    "https://images.unsplash.com/photo-1496568816309-51d7c20e3b21?w=800&q=80",
    "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80",
    "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=800&q=80",
    // 工业科技
    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80",
    "https://images.unsplash.com/photo-1563770660941-20978e870e26?w=800&q=80",
    "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&q=80",
    "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80",
    "https://images.unsplash.com/photo-1565688534245-05d6b5be184a?w=800&q=80",
    "https://images.unsplash.com/photo-1567789884554-0b844b597180?w=800&q=80",
    // 天空/飞行相关
    "https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=800&q=80",
    "https://images.unsplash.com/photo-1419833173245-f59e1b93f9ee?w=800&q=80",
    "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80",
    "https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?w=800&q=80",
    "https://images.unsplash.com/photo-1483450388369-9ed95738483c?w=800&q=80",
    "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80",
    // 电子元件/电路
    "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
    "https://images.unsplash.com/photo-1562408590-e32931084e23?w=800&q=80",
    "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?w=800&q=80",
    "https://images.unsplash.com/photo-1601132359864-c974e79890ac?w=800&q=80",
  ];
}

// 获取未使用过的图片
function getUnusedDefaultImages(needed: number): string[] {
  const allImages = getDefaultDroneImages();
  
  // 过滤掉已使用的图片
  const unusedImages = allImages.filter(img => !usedImagesInSession.has(img));
  
  // 如果未使用的图片不足，重置追踪（但保留一些避免立即重复）
  if (unusedImages.length < needed) {
    console.log("Resetting used images tracker - pool exhausted");
    // 保留最近使用的10张，其他的可以重新使用
    const recentlyUsed = Array.from(usedImagesInSession).slice(-10);
    usedImagesInSession.clear();
    recentlyUsed.forEach(img => usedImagesInSession.add(img));
    return getUnusedDefaultImages(needed);
  }
  
  // 随机打乱并选取需要的数量
  const shuffled = unusedImages.sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, needed);
  
  // 标记为已使用
  selected.forEach(img => usedImagesInSession.add(img));
  
  return selected;
}

// 使用 Doubao API 进行专业二次创作 - 增强版，支持原文图片
async function rewriteArticleWithAI(
  originalTitle: string,
  originalContent: string,
  category: string,
  coverImage: string | null = null,
  originalImages: string[] = [], // 新增：原文中提取的图片
  addLog?: (type: 'info' | 'success' | 'warning' | 'error' | 'step', message: string, options?: any) => void
): Promise<{ 
  title: string; 
  title_en: string;
  summary: string; 
  summary_en: string;
  content: string; 
  content_en: string;
  keywords: string[]; 
  coverImage: string | null;
  images: string[];
} | null> {
  try {
    const DOUBAO_API_KEY = Deno.env.get("DOUBAO_API_KEY");
    if (!DOUBAO_API_KEY) {
      console.error("DOUBAO_API_KEY not found");
      addLog?.('error', '未配置豆包API密钥', { step: 'rewrite' });
      return null;
    }

    const categoryConfig = CATEGORY_CONFIG[category as keyof typeof CATEGORY_CONFIG];
    const style = categoryConfig?.style || "专业、客观、信息丰富";
    const focus = categoryConfig?.contentFocus || "无人机行业相关内容";

    // 确定需要的图片数量（至少3张）
    const MIN_IMAGES = 3;
    
    console.log(`Rewriting article with AI, original images: ${originalImages.length}`);
    addLog?.('info', '🤖 调用豆包AI进行内容创作...', { step: 'rewrite', details: `原标题: ${originalTitle.substring(0, 50)}` });
    
    const prompt = `你是一位资深自媒体写手兼无人机行业新闻编辑，为专业无人机技术公司官网撰写高质量、高吸引力的新闻稿。

【原始标题】${originalTitle}

【原始内容】${originalContent.substring(0, 6000)}

【目标分类】${category}

【写作风格】${style}

【内容重点】${focus}

【我们的产品线】
多旋翼无人机、VTX/VRX图传设备、飞控/电调、吊舱/云台、数字图传、无人机相机、ELRS遥控系统、GPS模块、接收屏、FPV眼镜、无人机配件

【标题写作技巧 - 必须使用以下技巧之一】
1. 强调式标题：使用强调词如"刚刚"、"突发"、"重磅"、"震惊"、"必看"等，利用损失厌恶心理吸引读者
   范例：刚刚！无人机新规正式落地，这些变化你必须知道！
   
2. 制造反差：在相邻元素之间创建明显差异以吸引注意力
   范例：我放弃了月薪3万的工作，投身无人机行业，结果让我意外

3. 巧用数字：用具体数字给人清晰、具体、易操作的感觉
   范例：选购FPV图传，你必须知道这5个关键参数

4. 制造悬念：前半部分强吸引力事件，后半部分用反常行为作钩子
   范例：看完这个测试数据，我决定放弃传统图传设备

【重要要求】
1. 标题必须使用上述4种技巧之一，30字以内，只输出1个最合适的标题
2. 完全重新创作文章，不要简单翻译或复制
3. 文章需要同时提供中文版和英文版
4. 每篇文章必须包含至少3个图片插入位置标记
5. 中文版800-1500字，英文版500-1000词
6. 注重可读性和专业性
7. 禁止包含任何URL、广告信息

【图片插入格式 - 必须包含至少3个】
在文章适当位置插入图片标记：
<!-- IMAGE_PLACEHOLDER_1 -->
<!-- IMAGE_PLACEHOLDER_2 -->
<!-- IMAGE_PLACEHOLDER_3 -->

【输出JSON格式】
{
  "title": "中文标题（使用上述技巧，30字以内）",
  "title_en": "English Title (engaging, 5-12 words)",
  "summary": "中文摘要（100-150字）",
  "summary_en": "English summary (50-80 words)",
  "content": "中文HTML正文（包含h3/p/strong标签和至少3个图片标记，800-1500字）",
  "content_en": "English HTML content (with h3/p/strong tags and at least 3 image placeholders, 500-1000 words)",
  "keywords": ["关键词1", "关键词2", "关键词3", "keyword4", "keyword5"]
}

【正文结构示例】
<h3>核心事件介绍</h3>
<p>开篇段落...</p>
<!-- IMAGE_PLACEHOLDER_1 -->
<h3>详细分析</h3>
<p>详细内容...</p>
<!-- IMAGE_PLACEHOLDER_2 -->
<h3>深入解读</h3>
<p>更多内容...</p>
<!-- IMAGE_PLACEHOLDER_3 -->
<h3>总结与展望</h3>
<p>结尾段落...</p>`;

    const response = await fetch(`https://ark.cn-beijing.volces.com/api/v3/responses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${DOUBAO_API_KEY}`,
      },
      signal: AbortSignal.timeout(60000), // 增加到60秒超时
      body: JSON.stringify({
        model: "doubao-seed-1-8-251228",
        thinking: { type: "disabled" }, // 禁用深度思考，直接返回结果
        input: [{
          role: "user",
          content: [{ type: "input_text", text: prompt }],
        }],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Doubao rewrite API error:", response.status, errorText);
      addLog?.('error', '豆包API创作请求失败', { step: 'rewrite', details: `状态码: ${response.status}` });
      return null;
    }

    const data = await response.json();
    console.log("Doubao rewrite API response structure:", JSON.stringify(data).substring(0, 500));
    
    // 使用 thinking: minimal 后，返回 type: "text" 格式的直接回答
    let aiContent = "";
    if (data.output && Array.isArray(data.output)) {
      for (const item of data.output) {
        if (item.type === "text" && item.text) {
          aiContent += item.text;
        } else if (item.type === "message" && item.content) {
          const content = Array.isArray(item.content) 
            ? item.content.map((c: any) => c.text || "").join("") 
            : item.content;
          aiContent += content;
        }
      }
    }
    if (!aiContent && data.choices?.[0]?.message?.content) {
      aiContent = data.choices[0].message.content;
    }
    
    console.log("Extracted AI rewrite content length:", aiContent.length);
    
    const jsonMatch = aiContent.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.error("Failed to locate JSON in AI response");
      addLog?.('error', 'AI响应解析失败', { step: 'rewrite', details: '无法从AI响应中提取JSON格式内容' });
      return null;
    }

    let result: any = null;
    try {
      result = JSON.parse(jsonMatch[0]);
    } catch (parseError) {
      // 常见失败原因：模型输出中包含尾随逗号/不完整转义等
      const sanitized = jsonMatch[0]
        .replace(/,\s*}/g, "}")
        .replace(/,\s*]/g, "]");

      try {
        result = JSON.parse(sanitized);
      } catch (parseError2) {
        console.error(
          "Failed to parse AI JSON response:",
          parseError2,
          "raw_preview=",
          jsonMatch[0].slice(0, 800)
        );
        return null;
      }
    }
    
    // 准备图片列表：只使用经过验证的原文图片，不再使用 Unsplash 通用图片补充
    let images: string[] = [];
    
    // 只使用原文中已验证的高质量图片（同时标记为已使用，避免跨文章重复）
    if (originalImages.length > 0) {
      // 过滤掉已在本次采集中使用过的原文图片
      const unusedOriginalImages = originalImages.filter(img => !usedImagesInSession.has(img));
      images = [...unusedOriginalImages];
      // 标记这些图片为已使用
      unusedOriginalImages.forEach(img => usedImagesInSession.add(img));
      console.log(`Using ${unusedOriginalImages.length} unique original images (${originalImages.length - unusedOriginalImages.length} duplicates skipped)`);
    }
    
    // 如果原文图片不足，使用高质量无人机备选图片补充
    if (images.length < MIN_IMAGES) {
      console.log(`Original images only ${images.length}, supplementing with drone fallback images`);
      // 随机选择备选图片，避免每篇文章使用相同图片
      const shuffledFallback = [...DRONE_FALLBACK_IMAGES].sort(() => 0.5 - Math.random());
      const neededCount = MIN_IMAGES - images.length;
      
      for (let i = 0; i < neededCount && i < shuffledFallback.length; i++) {
        const fallbackImg = shuffledFallback[i];
        // 确保不与已有图片重复
        if (!images.includes(fallbackImg) && !usedImagesInSession.has(fallbackImg)) {
          images.push(fallbackImg);
          usedImagesInSession.add(fallbackImg);
        }
      }
      console.log(`After supplementing: ${images.length} images total`);
    }
    
    // 最多使用5张图片
    images = images.slice(0, Math.min(images.length, 5));
    
    // 替换图片占位符
    let contentWithImages = result.content || "";
    let contentEnWithImages = result.content_en || "";
    
    images.forEach((imgUrl, index) => {
      const placeholder = `<!-- IMAGE_PLACEHOLDER_${index + 1} -->`;
      const imgHtml = `<figure class="my-6"><img src="${imgUrl}" alt="文章配图 ${index + 1}" class="rounded-lg shadow-md w-full" loading="lazy" /><figcaption class="text-center text-sm text-muted-foreground mt-2">图${index + 1}</figcaption></figure>`;
      contentWithImages = contentWithImages.replace(placeholder, imgHtml);
      contentEnWithImages = contentEnWithImages.replace(placeholder, imgHtml);
    });

    // 清理未使用的占位符
    contentWithImages = contentWithImages.replace(/<!-- IMAGE_PLACEHOLDER_\d+ -->/g, '');
    contentEnWithImages = contentEnWithImages.replace(/<!-- IMAGE_PLACEHOLDER_\d+ -->/g, '');
    
    // 最终清理：移除内容中可能残留的无关图片（logo、二维码等）
    contentWithImages = cleanHtmlImages(contentWithImages);
    contentEnWithImages = cleanHtmlImages(contentEnWithImages);

    console.log(`AI rewrite successful with ${images.length} images`);
    
    // 记录 AI 创作结果详细日志
    const newTitle = result.title?.substring(0, 100) || originalTitle.substring(0, 35);
    const keywordsStr = Array.isArray(result.keywords) ? result.keywords.slice(0, 3).join(', ') : '';
    addLog?.('success', `✨ AI创作完成: "${newTitle.substring(0, 40)}"`, { 
      step: 'rewrite', 
      details: `豆包AI生成: 标题"${newTitle.substring(0, 30)}..." | 摘要${(result.summary || "").length}字 | 正文${(result.content || "").length}字 | 关键词: ${keywordsStr} | 配图: ${images.length}张`
    });

    return {
      title: newTitle,
      title_en: result.title_en?.substring(0, 150) || originalTitle.substring(0, 50),
      summary: (result.summary || "").substring(0, 300),
      summary_en: (result.summary_en || "").substring(0, 400),
      content: contentWithImages,
      content_en: contentEnWithImages,
      keywords: Array.isArray(result.keywords) ? result.keywords.slice(0, 5) : [],
      coverImage: coverImage || images[0] || null,
      images,
    };
  } catch (error) {
    console.error("AI rewrite failed:", error);
    addLog?.('error', 'AI创作异常', { step: 'rewrite', details: String(error) });
    return null;
  }
}
// 全局速率限制器
let lastRequestTime = 0;
const MIN_REQUEST_INTERVAL = 4000; // 每次请求间隔至少4秒（每分钟最多15次请求）

async function waitForRateLimit(): Promise<void> {
  const now = Date.now();
  const timeSinceLastRequest = now - lastRequestTime;
  
  if (timeSinceLastRequest < MIN_REQUEST_INTERVAL) {
    const waitTime = MIN_REQUEST_INTERVAL - timeSinceLastRequest;
    console.log(`Rate limiting: waiting ${waitTime}ms before next request`);
    await new Promise(resolve => setTimeout(resolve, waitTime));
  }
  
  lastRequestTime = Date.now();
}

// 带重试的 fetch 函数
async function fetchWithRetry(
  url: string, 
  options: RequestInit, 
  maxRetries: number = 3
): Promise<Response> {
  let lastError: Error | null = null;
  
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      await waitForRateLimit();
      
      const response = await fetch(url, options);
      
      // 如果是速率限制错误，等待后重试
      if (response.status === 429) {
        const errorData = await response.json();
        console.log(`Rate limit hit (attempt ${attempt + 1}/${maxRetries}), waiting 20s...`);
        
        // 从错误消息中提取等待时间，或默认等待20秒
        const waitMatch = errorData.error?.match(/retry after (\d+)s/);
        const waitSeconds = waitMatch ? parseInt(waitMatch[1]) + 5 : 20;
        
        await new Promise(resolve => setTimeout(resolve, waitSeconds * 1000));
        continue;
      }
      
      return response;
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      console.error(`Request failed (attempt ${attempt + 1}/${maxRetries}):`, lastError.message);
      
      if (attempt < maxRetries - 1) {
        const backoffTime = Math.pow(2, attempt) * 2000; // 指数退避: 2s, 4s, 8s
        console.log(`Retrying in ${backoffTime}ms...`);
        await new Promise(resolve => setTimeout(resolve, backoffTime));
      }
    }
  }
  
  throw lastError || new Error("Request failed after retries");
}

// 不可爬取的网站黑名单
const BLOCKED_DOMAINS = [
  'facebook.com',
  'twitter.com', 
  'x.com',
  'instagram.com',
  'linkedin.com',
  'tiktok.com',
  'youtube.com',
  'weibo.com',
  'weixin.qq.com',
  'mp.weixin.qq.com',
  'zhihu.com',
  'bilibili.com',
  'reddit.com',
  'pinterest.com',
  'tumblr.com',
  // 需要登录的网站
  'medium.com',
  'quora.com',
  // 付费墙网站
  'wsj.com',
  'nytimes.com',
  'bloomberg.com',
];

// 检查URL是否可爬取
function isScrapableUrl(url: string): boolean {
  try {
    const urlObj = new URL(url);
    const domain = urlObj.hostname.toLowerCase();
    
    for (const blocked of BLOCKED_DOMAINS) {
      if (domain.includes(blocked)) {
        return false;
      }
    }
    return true;
  } catch {
    return false;
  }
}

// 使用 Firecrawl 搜索新闻
async function searchNews(
  query: string,
  limit: number = 5
): Promise<Array<{ url: string; title: string; description: string; markdown?: string }>> {
  const apiKey = Deno.env.get("FIRECRAWL_API_KEY");
  if (!apiKey) {
    throw new Error("Firecrawl API key not configured");
  }

  console.log(`Searching news: ${query}`);

  // 添加排除社交媒体和不可爬取网站的搜索条件
  const excludeSites = "-site:facebook.com -site:twitter.com -site:instagram.com -site:linkedin.com -site:reddit.com -site:youtube.com -site:medium.com -site:pinterest.com";

  // 检测是否包含中文，用于放宽搜索限制（之前强制 lang=en/country=US 容易导致 0 结果）
  const hasChinese = /[\u4e00-\u9fff]/.test(query);

  // 让查询更“准”：必须包含无人机/FPV/UAV等强相关词，并排除文档类结果
  const filetypeExcludes = "-filetype:pdf -filetype:ppt -filetype:pptx -filetype:doc -filetype:docx";
  const queryText = hasChinese
    ? `${query} (无人机 OR FPV OR UAV OR drone) ${filetypeExcludes} ${excludeSites}`
    : `${query} (drone OR UAV OR FPV OR quadcopter) ${filetypeExcludes} ${excludeSites}`;

  const body: Record<string, unknown> = {
    query: queryText,
    limit: Math.max(limit * 4, 10), // 拉更多结果以便后续过滤
    tbs: "qdr:m", // 最近一个月
    scrapeOptions: {
      formats: ["markdown"],
      onlyMainContent: true,
    },
  };

  // 仅在英文查询时提供 lang/country，中文查询不强制，避免 Firecrawl/搜索侧过度收敛
  if (!hasChinese) {
    body.lang = "en";
    body.country = "US";
  }

  const response = await fetchWithRetry("https://api.firecrawl.dev/v1/search", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error("Firecrawl search error:", errorData);
    throw new Error(errorData.error || "Search failed");
  }

  const data = await response.json();
  const results = data.data || [];

  // 过滤掉无法爬取的URL
  const scrapableResults = results.filter((item: { url: string }) => isScrapableUrl(item.url));
  console.log(
    `Search returned ${results.length} results, ${scrapableResults.length} are scrapable (hasChinese=${hasChinese})`
  );

  return scrapableResults.slice(0, limit);
}

// 从HTML中提取所有图片URL
function extractImagesFromHtml(html: string, baseUrl: string): string[] {
  if (!html) return [];
  
  const images: string[] = [];
  const imgMatches = html.match(/<img[^>]+src=["']([^"']+)["'][^>]*>/gi) || [];
  
  for (const match of imgMatches) {
    const srcMatch = match.match(/src=["']([^"']+)["']/i);
    if (srcMatch && srcMatch[1]) {
      let imgUrl = srcMatch[1];
      
      // 转换相对路径为绝对路径
      if (imgUrl.startsWith('//')) {
        imgUrl = 'https:' + imgUrl;
      } else if (imgUrl.startsWith('/')) {
        try {
          const urlObj = new URL(baseUrl);
          imgUrl = urlObj.origin + imgUrl;
        } catch {
          continue;
        }
      }
      
      // 排除不合适的图片
      if (isValidImage(imgUrl)) {
        images.push(imgUrl);
      }
    }
  }
  
  // 提取srcset中的图片
  const srcsetMatches = html.match(/srcset=["']([^"']+)["']/gi) || [];
  for (const match of srcsetMatches) {
    const urls = match.match(/https?:\/\/[^\s,]+/g) || [];
    for (const url of urls) {
      if (isValidImage(url)) {
        images.push(url);
      }
    }
  }
  
  // 提取data-src中的图片（懒加载）
  const dataSrcMatches = html.match(/data-src=["']([^"']+)["']/gi) || [];
  for (const match of dataSrcMatches) {
    const urlMatch = match.match(/["']([^"']+)["']/);
    if (urlMatch && urlMatch[1]) {
      let imgUrl = urlMatch[1];
      if (imgUrl.startsWith('http') && isValidImage(imgUrl)) {
        images.push(imgUrl);
      }
    }
  }
  
  // 去重
  return [...new Set(images)];
}

// 检查图片URL是否有效 - 严格过滤网站logo、二维码等无关图片
function isValidImage(imgUrl: string): boolean {
  if (!imgUrl || imgUrl.length < 15) return false;
  if (imgUrl.startsWith('data:')) return false;
  if (!imgUrl.startsWith('http')) return false;
  
  const lowerUrl = imgUrl.toLowerCase();
  
  // ========== 域名黑名单 - 这些域名的图片通常是网站装饰/广告 ==========
  const blockedDomains = [
    // 新闻网站的静态资源（logo/二维码/app下载等）
    'static-web.stcn.com',        // 证券时报静态资源
    'n.sinaimg.cn/finance',       // 新浪财经静态资源
    'k.sinaimg.cn',               // 新浪缩略图服务
    'csdnimg.cn/cdn',             // CSDN CDN工具栏
    'static.csdn.net',            // CSDN静态资源
    'apps.apple.com/assets',      // 苹果App Store资源
    'play.google.com',            // Google Play资源
    // 第三方书籍/电商封面
    'ddimg.cn',                   // 当当网图片
    'img.alicdn.com/imgextra',    // 淘宝商品图
    // 备案/认证图标
    'beian.gov.cn',               // 备案图标
    'img.alicdn.com/tfs',         // 阿里云安全图标
  ];
  
  for (const domain of blockedDomains) {
    if (lowerUrl.includes(domain)) return false;
  }
  
  // ========== URL路径黑名单 - 排除明确的非内容图片 ==========
  const excludePatterns = [
    // Logo和图标
    'logo', 'icon', 'favicon', 'avatar', 'sprite', 'button',
    // 二维码相关
    'qr', 'qrcode', 'qr-code', 'qr_code', 'ewm', '二维码', 'wechat-qr', 'weixin-qr',
    // App下载相关
    'app-download', 'app_download', 'download-app', 'appstore', 'googleplay',
    'aside-app', 'app-btn', 'app-qr', 'download-btn',
    // 广告和追踪
    'pixel', 'tracking', 'analytics', 'beacon', '1x1', '1px', 'ad-', 'ads-', 'advert',
    'gg_', 'sponsor', 'promoted', 'banner-ad',
    // 占位符和装饰
    'placeholder', 'spacer', 'blank', 'empty', 'default', 'no-image', 'error-image',
    'loading', 'spinner', 'skeleton',
    // 水印和标记
    'watermark', 'stamp', 'badge',
    // 网站备案、证书
    'icp', 'beian', 'record', 'cert', 'license', 'gov-', 'police',
    // 页面元素
    'toolbar', 'footer-', 'header-', 'sidebar-', 'nav-', 'menu-',
    'content-toolbar', 'site-logo', 'brand-',
    // 社交分享图标
    'share-', 'social-', 'wechat-', 'weibo-', 'qq-', 'twitter-', 'facebook-',
    'linkedin-', 'instagram-', 'tiktok-', 'youtube-',
    // 用户相关
    'default-avatar', 'user-icon', 'profile-pic',
    // 表情和装饰
    'emoji', 'emoticon', 'sticker',
  ];
  
  for (const pattern of excludePatterns) {
    if (lowerUrl.includes(pattern)) return false;
  }
  
  // ========== 文件名模式排除 ==========
  // 排除明确的小图尺寸（如 16x16, 32x32，但不匹配 800x600）
  if (/[/_-]\d{1,2}x\d{1,2}[._-]/i.test(lowerUrl)) return false;
  
  // 排除w150h100这种缩略图参数
  if (/w\d{2,3}h\d{2,3}/i.test(lowerUrl) && /w[1-2]\d{2}h[1-2]\d{2}/i.test(lowerUrl)) return false;
  
  // 排除微信公众号等静态资源的特定路径
  if (/\/static\/images?\//i.test(lowerUrl)) return false;
  
  // ========== 特定域名的路径规则 ==========
  const domainPathRules = [
    // 新浪图片：排除财经app、logo等
    { domain: 'sinaimg.cn', paths: ['finance', 'app', 'logo', 'transform'] },
    // 澎湃新闻：排除过小的缩略图
    { domain: 'thepaper.cn', paths: ['resize,w_100', 'resize,w_150', 'resize,w_200'] },
    // 网易：排除静态资源
    { domain: '163.com', paths: ['/static/', '/common/'] },
    // 腾讯：排除静态资源
    { domain: 'qq.com', paths: ['/static/', '/common/', '/qr/'] },
  ];
  
  for (const rule of domainPathRules) {
    if (lowerUrl.includes(rule.domain)) {
      for (const path of rule.paths) {
        if (lowerUrl.includes(path)) return false;
      }
    }
  }
  
  // ========== 图片扩展名检查 ==========
  const validExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.bmp'];
  const hasValidExtension = validExtensions.some(ext => {
    const urlWithoutParams = lowerUrl.split('?')[0];
    return urlWithoutParams.endsWith(ext) || urlWithoutParams.includes(ext);
  });
  
  // 如果URL看起来不像图片，也接受（有些CDN图片没有扩展名）
  // 但如果能明确判断是图片，优先验证
  
  return true;
}

// 评估图片质量得分
function getImageQualityScore(imgUrl: string): number {
  let score = 50; // 基础分
  const lowerUrl = imgUrl.toLowerCase();
  
  // 高质量指标（加分）
  if (lowerUrl.includes('original') || lowerUrl.includes('full')) score += 20;
  if (lowerUrl.includes('large') || lowerUrl.includes('high')) score += 15;
  if (/w[=_]\d{3,}/.test(lowerUrl)) score += 15; // 宽度>=100
  if (/width[=_]\d{3,}/.test(lowerUrl)) score += 15;
  if (lowerUrl.includes('hd') || lowerUrl.includes('hq')) score += 10;
  if (lowerUrl.includes('.png')) score += 5; // PNG通常质量较好
  if (lowerUrl.includes('cdn') || lowerUrl.includes('media')) score += 5;
  
  // 低质量指标（减分）
  if (lowerUrl.includes('preview')) score -= 10;
  if (lowerUrl.includes('crop')) score -= 5;
  if (lowerUrl.includes('compressed')) score -= 15;
  if (/q[=_]\d{1,2}[^0-9]/.test(lowerUrl)) score -= 10; // 低质量参数
  
  return score;
}

// 过滤并选择高质量图片 - 增强版
async function filterHighQualityImages(images: string[], minCount: number = 3): Promise<string[]> {
  // 先按质量分数排序
  const scoredImages = images.map(url => ({
    url,
    score: getImageQualityScore(url)
  }));
  
  scoredImages.sort((a, b) => b.score - a.score);
  
  // 取分数最高的图片进行验证
  const topImages = scoredImages.slice(0, minCount * 3).map(item => item.url);
  
  // 验证图片可访问性
  const validImages = await validateImages(topImages, minCount + 2);
  
  console.log(`Filtered ${images.length} images to ${validImages.length} high-quality valid images`);
  
  return validImages;
}

// 抓取网页内容 - 增强版，提取所有图片
async function scrapeFullContent(url: string): Promise<{ 
  title: string; 
  content: string; 
  coverImage: string | null;
  images: string[];
} | null> {
  const apiKey = Deno.env.get("FIRECRAWL_API_KEY");
  if (!apiKey) {
    throw new Error("Firecrawl API key not configured");
  }

  try {
    console.log(`Scraping with images: ${url}`);
    
    const response = await fetchWithRetry("https://api.firecrawl.dev/v1/scrape", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url,
        formats: ["markdown", "html", "links"],
        onlyMainContent: true,
        waitFor: 3000,
      }),
    });

    if (!response.ok) {
      console.error(`Scrape failed for ${url}`);
      return null;
    }

    const data = await response.json();
    const scraped = data.data || data;
    
    const rawContent = scraped.markdown || "";
    const pageTitle = scraped.metadata?.title || "";
    const cleanedContent = await cleanContent(rawContent, pageTitle);
    
    if (cleanedContent.length < 200) {
      console.log(`Content too short after cleaning: ${url}`);
      return null;
    }

    // 提取所有图片
    const allImages: string[] = [];
    
    // 1. 从HTML中提取图片
    if (scraped.html) {
      const htmlImages = extractImagesFromHtml(scraped.html, url);
      allImages.push(...htmlImages);
    }
    
    // 2. 从links中提取图片链接
    if (scraped.links && Array.isArray(scraped.links)) {
      const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];
      for (const link of scraped.links) {
        const linkUrl = typeof link === 'string' ? link : link.url;
        if (linkUrl && imageExtensions.some(ext => linkUrl.toLowerCase().includes(ext))) {
          if (isValidImage(linkUrl)) {
            allImages.push(linkUrl);
          }
        }
      }
    }
    
    // 3. OG Image作为封面图
    let coverImage: string | null = null;
    if (scraped.metadata?.ogImage) {
      const ogImg = scraped.metadata.ogImage;
      if (isValidImage(ogImg)) {
        coverImage = ogImg;
        // 确保OG图片也在列表中
        if (!allImages.includes(ogImg)) {
          allImages.unshift(ogImg);
        }
      }
    }
    
    // 过滤并选择高质量图片
    const filteredImages = await filterHighQualityImages(allImages, 3);
    
    console.log(`Found ${allImages.length} images, filtered to ${filteredImages.length} for: ${url}`);

    return {
      title: scraped.metadata?.title || "",
      content: cleanedContent,
      coverImage: coverImage || filteredImages[0] || null,
      images: filteredImages,
    };
  } catch (error) {
    console.error(`Error scraping ${url}:`, error);
    return null;
  }
}

// 使用 Doubao API 生成热门关键词
// 详细的关键词分类配置 - 用于AI生成参考
const KEYWORD_GENERATION_GUIDE = {
  "技术分享": {
    description: "技术原理、教程、知识科普等技术内容",
    subcategories: {
      "核心技术类": [
        "无人机飞控调试", "多旋翼动力学", "无人机电池续航优化", "开源飞控教程",
        "无人机SLAM算法", "AI视觉导航", "集群无人机协同作业", "长航时无人机技术",
        "Pixhawk飞控", "APM飞控", "GPS/IMU传感器", "视觉避障技术", "图传数传模块"
      ],
      "应用场景类": [
        "农业无人机作业流程", "无人机倾斜摄影测绘", "电网巡检无人机选型",
        "无人机航拍参数设置", "穿越机装机教程", "FPV飞行模拟器推荐",
        "精准喷洒技术", "三维地形扫描", "GIS数据采集"
      ],
      "学习与实践类": [
        "无人机执照考试攻略", "新手装机避坑指南", "无人机电池鼓包原因",
        "QGroundControl使用教程", "无人机开源代码分享", "低成本无人机硬件方案",
        "AOPA/UTC执照", "Mission Planner教程", "ArduPilot二次开发"
      ]
    }
  },
  "行业动态": {
    description: "政策法规、市场分析、行业趋势等宏观信息",
    subcategories: {
      "政策与趋势": [
        "低空经济政策", "无人机配送规模化政策", "无人机法规标准", "跨境物流无人机试点",
        "无人机空域管理新规", "2026无人机配送政策", "低空经济顶层设计"
      ],
      "技术突破": [
        "氢燃料电池无人机", "碳纤维复合材料机身", "AI自主避障系统", "脑控无人机技术",
        "无人机集群控制", "eVTOL应急救援", "低空无人跨城货运"
      ],
      "市场动态": [
        "无人机企业融资动态", "重载无人机产线投产", "中东无人机市场",
        "国产无人机海外订单", "无人机产业规模预测", "全球无人机代理商招募"
      ],
      "重大事件": [
        "无人机高原载重纪录", "全国无人机技能大赛", "航展新机型发布",
        "无人机续航时间排名", "低空经济万亿规模预测"
      ]
    }
  },
  "产品资讯": {
    description: "新品发布、技术突破、产品功能等产品相关内容",
    subcategories: {
      "新品发布": [
        "无人机技术突破 2025", "新型无人机发布", "FPV设备创新",
        "无人机续航突破", "重载工业级无人机发布"
      ],
      "性能提升": [
        "无人机性能提升", "碳纤维无人机载重提升", "AI动态路径规划算法",
        "无人机抗干扰技术", "长航时能源方案"
      ]
    }
  },
  "公司新闻": {
    description: "企业动态、合作、融资等公司相关新闻",
    subcategories: {
      "企业动态": [
        "无人机公司融资", "无人机制造商合作", "无人机企业新品发布",
        "行业并购重组新闻", "无人机产线落地"
      ]
    }
  }
};

// 快速生成单个关键词（每个分类一个）
async function generateSingleKeywordForCategory(
  category: string,
  existingKeywords: string[] = [],
  existingArticleTitles: string[] = [],
  addLog?: (type: 'info' | 'success' | 'warning' | 'error' | 'step', message: string, options?: any) => void,
): Promise<string | null> {
  const startedAt = Date.now();
  try {
    const DOUBAO_API_KEY = Deno.env.get("DOUBAO_API_KEY");
    if (!DOUBAO_API_KEY) {
      console.log("DOUBAO_API_KEY not found for keyword generation");
      addLog?.('warning', `未配置豆包密钥，跳过关键词生成：${category}`, { step: 'keyword' });
      return null;
    }

    const categoryGuide = KEYWORD_GENERATION_GUIDE[category as keyof typeof KEYWORD_GENERATION_GUIDE];
    if (!categoryGuide) {
      console.log(`Unknown category: ${category}`);
      addLog?.('warning', `未知分类，跳过关键词生成：${category}`, { step: 'keyword' });
      return null;
    }

    const existingList = existingKeywords.length > 0
      ? `\n\n【已存在的关键词（请勿重复）】\n${existingKeywords.slice(0, 50).join('、')}`
      : '';

    const articleTitlesRef = existingArticleTitles.length > 0
      ? `\n\n【参考新闻标题】\n${existingArticleTitles.slice(0, 10).join('\n')}`
      : '';

    const prompt = `你是无人机行业新闻采集专家。请为"${category}"分类生成1个最新、最热门的搜索关键词。

【分类说明】${categoryGuide.description}
【参考子类】${JSON.stringify(categoryGuide.subcategories)}
${existingList}
${articleTitlesRef}

【要求】
1. 只生成1个关键词，直接输出关键词文本，不要任何其他内容
2. 关键词要具体、精准、有时效性
3. 不要与已存在的关键词重复或相似
4. 能搜索到高质量无人机相关新闻`;

    console.log(`Generating single keyword for ${category}`);
    addLog?.('info', `生成关键词：${category}`, { step: 'keyword' });

    // 经验上：关键词生成应当很快；为避免“卡住”的体感，这里把单分类超时收紧
    const response = await fetch(`https://ark.cn-beijing.volces.com/api/v3/responses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${DOUBAO_API_KEY}`,
      },
      signal: AbortSignal.timeout(15000),
      body: JSON.stringify({
        model: "doubao-seed-1-8-251228",
        thinking: { type: "disabled" },
        input: [{
          role: "user",
          content: [{ type: "input_text", text: prompt }],
        }],
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error(`Doubao API error for ${category}:`, response.status, errText);
      addLog?.('warning', `关键词生成失败：${category}（${response.status}）`, {
        step: 'keyword',
        details: errText?.slice(0, 300) || undefined,
      });
      return null;
    }

    const data = await response.json();

    let aiContent = "";
    if (data.output && Array.isArray(data.output)) {
      for (const item of data.output) {
        if (item.type === "text" && item.text) {
          aiContent += item.text;
        } else if (item.type === "message" && item.content) {
          const content = Array.isArray(item.content)
            ? item.content.map((c: any) => c.text || "").join("")
            : item.content;
          aiContent += content;
        }
      }
    }
    if (!aiContent && data.choices?.[0]?.message?.content) {
      aiContent = data.choices[0].message.content;
    }

    // 清理关键词：去除引号、换行、多余空格
    const keyword = aiContent.trim().replace(/^["'`]|["'`]$/g, '').trim();

    if (keyword && keyword.length > 1 && keyword.length < 50) {
      // 检查是否与已存在关键词重复
      const existingSet = new Set(existingKeywords.map(k => k.toLowerCase()));
      if (!existingSet.has(keyword.toLowerCase())) {
        const ms = Date.now() - startedAt;
        console.log(`Generated keyword for ${category}: ${keyword} (${ms}ms)`);
        addLog?.('success', `关键词生成完成：${category}`, { step: 'keyword', details: `${keyword}（${ms}ms）` });
        return keyword;
      }

      addLog?.('warning', `关键词重复，已丢弃：${category}`, { step: 'keyword', details: keyword });
    }

    return null;
  } catch (error) {
    const ms = Date.now() - startedAt;
    console.error(`Keyword generation failed for ${category}:`, error);

    const msg = String((error as any)?.message || error || '');
    const isTimeout = msg.includes('timeout') || msg.includes('AbortError');
    addLog?.(isTimeout ? 'warning' : 'error', `关键词生成${isTimeout ? '超时' : '异常'}：${category}`, {
      step: 'keyword',
      details: `${msg}（${ms}ms）`,
    });

    return null;
  }
}

// 为指定分类或所有分类生成关键词
// 如果传入 targetCategory，只为该分类生成关键词；否则为所有分类并行生成
async function generateHotKeywords(
  existingKeywords: string[] = [],
  existingArticleTitles: string[] = [],
  addLog?: (type: 'info' | 'success' | 'warning' | 'error' | 'step', message: string, options?: any) => void,
  targetCategory?: string, // 新增：指定分类参数
): Promise<Record<string, string[]>> {
  const startedAt = Date.now();
  
  // 如果指定了分类，只为该分类生成；否则为所有分类生成
  let categories: string[];
  if (targetCategory && KEYWORD_GENERATION_GUIDE[targetCategory as keyof typeof KEYWORD_GENERATION_GUIDE]) {
    categories = [targetCategory];
    addLog?.('info', `为指定分类生成关键词：${targetCategory}`, { step: 'keyword' });
  } else {
    categories = Object.keys(KEYWORD_GENERATION_GUIDE);
    addLog?.('info', `开始并行生成关键词（${categories.length}个分类）`, { step: 'keyword' });
  }
  
  const result: Record<string, string[]> = {};

  const promises = categories.map(async (category) => {
    const keyword = await generateSingleKeywordForCategory(category, existingKeywords, existingArticleTitles, addLog);
    return { category, keyword };
  });

  const results = await Promise.all(promises);

  for (const { category, keyword } of results) {
    result[category] = keyword ? [keyword] : [];
  }

  const totalMs = Date.now() - startedAt;
  console.log("Generated keywords:", JSON.stringify(result));
  addLog?.('success', `关键词生成阶段完成`, { step: 'keyword', details: `${totalMs}ms` });

  return result;
}

function escapeHtml(input: string): string {
  return input
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function toSimpleHtml(text: string): string {
  const paragraphs = text
    .split(/\n\s*\n/g)
    .map((p) => p.trim())
    .filter(Boolean);

  // 保底：避免空内容导致插入失败
  if (paragraphs.length === 0) return "<p></p>";

  return paragraphs.map((p) => `<p>${escapeHtml(p)}</p>`).join("\n");
}

// 使用豆包AI清洗回退文章内容
async function buildFallbackArticleWithAI(args: {
  title: string;
  content: string;
  coverImage: string | null;
  images: string[];
}): Promise<{
  title: string;
  title_en: string | null;
  summary: string | null;
  summary_en: string | null;
  content: string;
  content_en: string | null;
  keywords: string[];
  coverImage: string | null;
  images: string[];
}> {
  // 使用豆包AI深度清洗内容
  let cleanedContent = args.content || "";
  
  try {
    console.log("Fallback article: performing AI deep cleaning...");
    cleanedContent = await deepCleanContentWithAI(args.content, args.title);
    console.log(`AI cleaned fallback content: ${args.content.length} -> ${cleanedContent.length} chars`);
  } catch (error) {
    console.error("Fallback AI cleaning failed:", error);
  }
  
  // 如果内容中没有图片标记，在适当位置插入图片
  let htmlContent = toSimpleHtml(cleanedContent);
  let images = args.images || [];
  
  // 如果原文图片不足，使用备选图片补充
  const MIN_FALLBACK_IMAGES = 2;
  if (images.length < MIN_FALLBACK_IMAGES) {
    console.log(`Fallback article: original images only ${images.length}, supplementing with drone fallback images`);
    const shuffledFallback = [...DRONE_FALLBACK_IMAGES].sort(() => 0.5 - Math.random());
    const neededCount = MIN_FALLBACK_IMAGES - images.length;
    
    for (let i = 0; i < neededCount && i < shuffledFallback.length; i++) {
      const fallbackImg = shuffledFallback[i];
      if (!images.includes(fallbackImg)) {
        images.push(fallbackImg);
      }
    }
    console.log(`After supplementing: ${images.length} images total`);
  }
  
  if (images.length > 0) {
    // 在内容中间插入图片
    const paragraphs = htmlContent.split('</p>');
    if (paragraphs.length > 2) {
      // 插入第一张图片在1/3处
      const insertPoint1 = Math.floor(paragraphs.length / 3);
      const imgHtml1 = `<figure class="my-6"><img src="${images[0]}" alt="文章配图" class="rounded-lg shadow-md w-full" loading="lazy" /></figure>`;
      paragraphs.splice(insertPoint1, 0, imgHtml1);
      
      // 如果有第二张图片，插入在2/3处
      if (images.length > 1) {
        const insertPoint2 = Math.floor((paragraphs.length * 2) / 3);
        const imgHtml2 = `<figure class="my-6"><img src="${images[1]}" alt="文章配图" class="rounded-lg shadow-md w-full" loading="lazy" /></figure>`;
        paragraphs.splice(insertPoint2, 0, imgHtml2);
      }
      
      htmlContent = paragraphs.join('</p>');
    }
  }
  
  return {
    title: args.title?.trim() || "Untitled",
    title_en: null,
    summary: null,
    summary_en: null,
    content: htmlContent,
    content_en: null,
    keywords: [],
    coverImage: args.coverImage || (images.length > 0 ? images[0] : null),
    images,
  };
}

// 日志类型定义
interface ProcessLog {
  timestamp: string;
  type: 'info' | 'success' | 'warning' | 'error' | 'step';
  step?: 'search' | 'scrape' | 'clean' | 'score' | 'filter' | 'save' | 'rewrite' | 'keyword' | 'image';
  message: string;
  details?: string;
  articleTitle?: string;
  score?: number;
  isReviewOrAd?: boolean;
}

// 创建日志工具函数
function createLogger() {
  const MAX_LOGS = 400;
  const MAX_MESSAGE_LEN = 200;
  const MAX_DETAILS_LEN = 800;
  const MAX_TITLE_LEN = 80;

  const logs: ProcessLog[] = [];

  const clamp = (s: string | undefined, max: number) => {
    if (!s) return undefined;
    const t = String(s);
    return t.length > max ? `${t.slice(0, max)}…` : t;
  };

  const addLog = (
    type: ProcessLog['type'],
    message: string,
    options?: {
      step?: ProcessLog['step'];
      details?: string;
      articleTitle?: string;
      score?: number;
      isReviewOrAd?: boolean;
    }
  ) => {
    const log: ProcessLog = {
      timestamp: new Date().toISOString(),
      type,
      message: clamp(message, MAX_MESSAGE_LEN) || '',
      ...(options
        ? {
            ...options,
            details: clamp(options.details, MAX_DETAILS_LEN),
            articleTitle: clamp(options.articleTitle, MAX_TITLE_LEN),
          }
        : {}),
    };

    logs.push(log);
    if (logs.length > MAX_LOGS) logs.splice(0, logs.length - MAX_LOGS);

    console.log(
      `[${type.toUpperCase()}] ${log.message}${log.details ? ` - ${log.details}` : ''}`
    );
  };

  return { logs, addLog };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // 任务追踪：用于后台页面显示进度/结束（否则前端断连后会“卡住”）
  let taskId: string | null = null;

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const body = await req.json();
    const { action, category, count = 5, autoPublish = true } = body;

    // 初始化日志记录器
    const { logs, addLog } = createLogger();

    console.log(`Action: ${action}, Category: ${category}, Count: ${count}`);
    addLog('info', `开始执行采集任务`, { step: 'search', details: `操作: ${action}, 分类: ${category || '全部'}, 目标数量: ${count}` });

    // 对长任务创建任务记录（供前端轮询/自动结束“采集中”状态）
    const trackableActions = new Set([
      'auto-generate-keywords',
      'auto-generate-and-collect',
      'collect-by-keyword',
      'collect-by-category',
      'collect-by-categories',
      'collect-daily',
    ]);

    if (trackableActions.has(String(action || ''))) {
      const taskKeyword = String(body.keyword || `action:${action}`);
      const taskCategory = String(category || body.targetCategory || '全部');

      const { data: task, error: taskError } = await supabase
        .from('news_collection_tasks')
        .insert({
          keyword: taskKeyword,
          category: taskCategory,
          status: 'processing',
          articles_collected: 0,
          articles_published: 0,
        })
        .select('id')
        .single();

      if (taskError) {
        addLog('warning', '创建采集任务记录失败（不影响采集）', { step: 'save', details: taskError.message });
      } else {
        taskId = task?.id || null;
        addLog('info', '已创建采集任务记录', { step: 'save', details: `taskId=${taskId}` });
      }
    }

    // 生成热门关键词（检查已存在关键词避免重复，参考现有新闻标题）
    if (action === "generate-keywords") {
      // 获取已存在的关键词列表
      const { data: existingKeywords } = await supabase
        .from("news_keywords")
        .select("keyword");
      const existingList = (existingKeywords || []).map((k: { keyword: string }) => k.keyword);
      
      // 获取现有新闻标题作为参考
      const { data: existingArticles } = await supabase
        .from("news_articles")
        .select("title")
        .order("created_at", { ascending: false })
        .limit(50);
      const articleTitles = (existingArticles || []).map((a: { title: string }) => a.title);
      
      const keywords = await generateHotKeywords(existingList, articleTitles, addLog);
      return new Response(
        JSON.stringify({ success: true, keywords, existingCount: existingList.length, logs }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // 自动生成关键词（仅生成+保存，不做采集，避免超时）
    if (action === "auto-generate-keywords") {
      addLog('step', '开始AI自动生成关键词', { step: 'keyword' });

      const { data: existingKeywords } = await supabase
        .from("news_keywords")
        .select("keyword");
      const existingList = (existingKeywords || []).map((k: { keyword: string }) => k.keyword);
      addLog('info', `已有 ${existingList.length} 个关键词（将排除重复）`, { step: 'keyword' });

      // 获取现有新闻标题作为参考
      const { data: existingArticles } = await supabase
        .from("news_articles")
        .select("title")
        .order("created_at", { ascending: false })
        .limit(50);
      const articleTitles = (existingArticles || []).map((a: { title: string }) => a.title);
      addLog('info', `参考 ${articleTitles.length} 篇现有新闻标题`, { step: 'keyword' });

       addLog('step', '调用豆包AI生成新关键词...', { step: 'keyword' });
       const generatedKeywords = await generateHotKeywords(existingList, articleTitles, addLog);

      const allNewKeywords: { keyword: string; category: string }[] = [];
      for (const [cat, kws] of Object.entries(generatedKeywords)) {
        for (const kw of kws as string[]) allNewKeywords.push({ keyword: kw, category: cat });
        if ((kws as string[]).length > 0) {
          addLog('info', `${cat}: ${(kws as string[]).join('、')}`, { step: 'keyword' });
        }
      }

      addLog('success', `AI生成 ${allNewKeywords.length} 个新关键词`, {
        step: 'keyword',
        details: Object.entries(generatedKeywords)
          .map(([c, k]) => `${c}: ${(k as string[]).length}个`)
          .join(', '),
      });

      addLog('step', '保存关键词到数据库...', { step: 'keyword' });
      const savedKeywords: string[] = [];
      for (const { keyword, category } of allNewKeywords) {
        const { error } = await supabase.from("news_keywords").insert({
          keyword,
          keyword_en: keyword,
          category,
          is_active: true,
          priority: 60,
        });
        if (!error) savedKeywords.push(keyword);
      }
      addLog('success', `成功保存 ${savedKeywords.length} 个新关键词`, { step: 'keyword' });

      // 标记任务完成（关键词生成阶段）
      if (taskId) {
        await supabase
          .from('news_collection_tasks')
          .update({
            status: 'completed',
            completed_at: new Date().toISOString(),
          })
          .eq('id', taskId);
      }

      return new Response(
        JSON.stringify({
          success: true,
          generatedKeywords,
          savedKeywordsCount: savedKeywords.length,
          logs,
          taskId,
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // 自动生成关键词并采集新闻
    if (action === "auto-generate-and-collect") {
      // 获取目标分类（如果指定了分类，只为该分类生成关键词）
      const targetCategory = category as string | undefined;
      
      if (targetCategory) {
        addLog('step', `开始为"${targetCategory}"生成关键词`, { step: 'keyword' });
      } else {
        addLog('step', '开始AI自动生成关键词（所有分类）', { step: 'keyword' });
      }
      
      // 1. 获取已存在的关键词列表
      const { data: existingKeywords } = await supabase
        .from("news_keywords")
        .select("keyword");
      const existingList = (existingKeywords || []).map((k: { keyword: string }) => k.keyword);
      addLog('info', `已有 ${existingList.length} 个关键词（将排除重复）`, { step: 'keyword' });
      
      // 获取现有新闻标题作为参考
      const { data: existingArticles } = await supabase
        .from("news_articles")
        .select("title")
        .order("created_at", { ascending: false })
        .limit(50);
      const articleTitles = (existingArticles || []).map((a: { title: string }) => a.title);
      
      // 2. 使用豆包AI生成新关键词（传入目标分类，只生成该分类的关键词）
      addLog('step', '调用豆包AI生成新关键词...', { step: 'keyword' });
      const generatedKeywords = await generateHotKeywords(existingList, articleTitles, addLog, targetCategory);
      const allNewKeywords: { keyword: string; category: string }[] = [];
      
      for (const [cat, kws] of Object.entries(generatedKeywords)) {
        for (const kw of kws as string[]) {
          allNewKeywords.push({ keyword: kw, category: cat });
        }
        // 记录每个分类生成的关键词
        if ((kws as string[]).length > 0) {
          addLog('info', `${cat}: ${(kws as string[]).join('、')}`, { step: 'keyword' });
        }
      }
      
      addLog('success', `AI生成 ${allNewKeywords.length} 个新关键词`, { 
        step: 'keyword',
        details: Object.entries(generatedKeywords).map(([c, k]) => `${c}: ${(k as string[]).length}个`).join(', ')
      });
      
      // 3. 将新关键词保存到数据库
      addLog('step', '保存关键词到数据库...', { step: 'keyword' });
      const savedKeywords: string[] = [];
      for (const { keyword, category } of allNewKeywords) {
        const { error } = await supabase
          .from("news_keywords")
          .insert({
            keyword,
            keyword_en: keyword,
            category,
            is_active: true,
            priority: 60, // 较高优先级
          });
        if (!error) {
          savedKeywords.push(keyword);
        }
      }
      addLog('success', `成功保存 ${savedKeywords.length} 个新关键词`, { step: 'keyword' });
      
      // 4. 使用生成的关键词进行采集
      const targetCount = body.count || 4; // 默认每个分类采集1篇
      const collectResults: Record<string, { collected: number; filtered: number }> = {};
      let totalCollected = 0;
      let totalFiltered = 0;
      
      for (const [cat, kws] of Object.entries(generatedKeywords)) {
        if (totalCollected >= targetCount) break;

        const categoryKeywords = kws as string[];
        if (categoryKeywords.length === 0) continue;

        addLog('step', `开始采集 ${cat}`, { step: 'search', details: `使用 ${categoryKeywords.length} 个关键词` });

        let catCollected = 0;
        let catFiltered = 0;
        const targetPerCategory = Math.ceil(targetCount / 4);

        // 随机选择1-2个关键词进行采集
        const shuffled = [...categoryKeywords].sort(() => 0.5 - Math.random());
        const selectedKeywords = shuffled.slice(0, 2);

        for (const keyword of selectedKeywords) {
          if (totalCollected >= targetCount) break;
          if (catCollected >= targetPerCategory) break;
          
          try {
            addLog('info', `搜索: ${keyword}`, { step: 'search' });
            const searchResults = await searchNews(keyword, 3);
            
            for (const result of searchResults) {
              if (catCollected >= targetPerCategory) break;
              if (!result.url) continue;
              
              // 检查是否已存在
              const { data: existing } = await supabase
                .from("news_articles")
                .select("id")
                .eq("source_url", result.url)
                .single();
              
              if (existing) {
                addLog('warning', '文章已存在', { step: 'filter', articleTitle: result.title });
                continue;
              }
              
              // 抓取内容
              addLog('info', '抓取内容...', { step: 'scrape', articleTitle: result.title });
              const scraped = await scrapeFullContent(result.url);
              if (!scraped || !scraped.content) {
                addLog('warning', '抓取失败', { step: 'scrape', articleTitle: result.title });
                continue;
              }
              
              // AI质量评分
              addLog('info', 'AI质量评分...', { step: 'score', articleTitle: scraped.title || result.title });
              const qualityResult = await scoreArticleQuality(
                scraped.title || result.title || "",
                scraped.content,
                cat,
                addLog
              );
              
              if (qualityResult?.isReviewOrAd) {
                addLog('warning', '测评/广告类文章', { 
                  step: 'filter', 
                  articleTitle: scraped.title,
                  score: qualityResult.score,
                  isReviewOrAd: true
                });
                catFiltered++;
                continue;
              }
              
              if (qualityResult && qualityResult.score < QUALITY_THRESHOLD) {
                addLog('warning', `质量评分 ${qualityResult.score} 低于阈值`, {
                  step: 'filter',
                  articleTitle: scraped.title,
                  score: qualityResult.score
                });
                catFiltered++;
                continue;
              }
              
              // AI二次创作
              addLog('info', 'AI内容创作...', { step: 'rewrite', articleTitle: scraped.title });
              const rewritten = await rewriteArticleWithAI(
                scraped.title || result.title || "",
                scraped.content,
                cat,
                scraped.coverImage,
                scraped.images || [],
                addLog
              );

              // AI 失败时：仍然保存抓取到的正文，避免“任务执行失败/采集0篇”
              if (!rewritten) {
                addLog('warning', 'AI创作失败，使用AI清洗后的原文内容保存', { step: 'rewrite', articleTitle: scraped.title });
              }

              const article = rewritten ?? await buildFallbackArticleWithAI({
                title: scraped.title || result.title || "",
                content: scraped.content,
                coverImage: scraped.coverImage,
                images: scraped.images || [],
              });
              const aiEdited = Boolean(rewritten);

              // 保存文章
              addLog('info', '保存文章...', { step: 'save', articleTitle: article.title });
              const { data: insertedArticle, error: insertError } = await supabase
                .from("news_articles")
                .insert({
                  title: article.title,
                  title_en: article.title_en,
                  summary: article.summary,
                  summary_en: article.summary_en,
                  content: article.content,
                  content_en: article.content_en,
                  cover_image: article.coverImage,
                  source_url: result.url,
                  source_name: "AI Generated",
                  original_title: scraped.title,
                  is_auto_generated: true,
                  ai_edited: aiEdited,
                  keywords: article.keywords,
                  category: cat,
                  quality_score: qualityResult?.score || null,
                  quality_reason: qualityResult?.reason || null,
                  is_published: autoPublish,
                  published_at: autoPublish ? new Date().toISOString() : null,
                })
                .select('id')
                .single();

              if (!insertError && insertedArticle) {
                // AI图片评估和处理
                const imageResult = await processAllArticleImages(
                  supabase,
                  insertedArticle.id,
                  article.content,
                  article.coverImage,
                  article.title,
                  article.summary || '',
                  addLog
                );

                // 更新文章的图片内容
                if (imageResult.convertedCount > 0 || imageResult.rejectedCount > 0) {
                  await supabase
                    .from("news_articles")
                    .update({
                      content: imageResult.newContent,
                      cover_image: imageResult.newCoverImage,
                    })
                    .eq('id', insertedArticle.id);
                }

                addLog('success', '采集成功', {
                  step: 'save',
                  articleTitle: article.title,
                  score: qualityResult?.score,
                  details: `图片: ${imageResult.processedCount}评估 ${imageResult.convertedCount}转存 ${imageResult.rejectedCount}剔除`
                });
                catCollected++;
                totalCollected++;
              } else {
                addLog('error', `保存失败: ${insertError?.message}`, { step: 'save', articleTitle: article.title });
              }
              
              await new Promise(resolve => setTimeout(resolve, 300));
            }
          } catch (error) {
            addLog('error', `关键词 ${keyword} 采集出错: ${error}`, { step: 'search' });
          }
        }
        
        totalFiltered += catFiltered;
        collectResults[cat] = { collected: catCollected, filtered: catFiltered };
      }
      
      addLog('success', `采集完成: ${totalCollected} 篇成功, ${totalFiltered} 篇过滤`, { step: 'save' });

      // 标记任务完成
      if (taskId) {
        await supabase
          .from('news_collection_tasks')
          .update({
            status: 'completed',
            completed_at: new Date().toISOString(),
            articles_collected: totalCollected,
            articles_published: autoPublish ? totalCollected : 0,
          })
          .eq('id', taskId);
      }

      return new Response(
        JSON.stringify({
          success: true,
          generatedKeywords,
          savedKeywordsCount: savedKeywords.length,
          articlesCollected: totalCollected,
          articlesFiltered: totalFiltered,
          results: collectResults,
          logs,
          taskId,
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // 按关键词采集
    if (action === "collect-by-keyword") {
      const { keyword, targetCategory } = body;
      
      if (!keyword || !targetCategory) {
        return new Response(
          JSON.stringify({ error: "keyword and targetCategory are required" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      const results: Array<{ title: string; success: boolean; error?: string; score?: number }> = [];
      let collected = 0;
      let filtered = 0;

      try {
        const searchResults = await searchNews(keyword, count * 2);

        for (const result of searchResults) {
          if (collected >= count) break;
          if (!result.url) continue;

          const { data: existing } = await supabase
            .from("news_articles")
            .select("id")
            .eq("source_url", result.url)
            .single();

          if (existing) continue;

          const scraped = await scrapeFullContent(result.url);
          if (!scraped || !scraped.content) continue;

          // 第一步：AI 质量评分（增强版，排除测评和广告）
          addLog('info', 'AI质量评分中...', { step: 'score', articleTitle: scraped.title?.substring(0, 50) });
          const qualityResult = await scoreArticleQuality(
            scraped.title || result.title || "",
            scraped.content,
            targetCategory,
            addLog
          );

          // 排除测评和广告类文章
          if (qualityResult?.isReviewOrAd) {
            console.log(`❌ Filtered (review/ad): ${result.title}`);
            filtered++;
            results.push({
              title: result.title || "Unknown",
              success: false,
              error: "测评类或广告文章，已排除",
              score: qualityResult.score,
            });
            continue;
          }

          if (qualityResult && qualityResult.score < QUALITY_THRESHOLD) {
            console.log(`❌ Filtered (score: ${qualityResult.score}): ${result.title}`);
            filtered++;
            results.push({
              title: result.title || "Unknown",
              success: false,
              error: `质量评分 ${qualityResult.score} 低于阈值 ${QUALITY_THRESHOLD}`,
              score: qualityResult.score,
            });
            continue;
          }

          // 第二步：AI 二次创作（双语版本，使用原文图片）
          console.log(`Article has ${scraped.images?.length || 0} original images`);
          addLog('info', 'AI内容创作中...', { step: 'rewrite', articleTitle: scraped.title?.substring(0, 50) });
          const rewritten = await rewriteArticleWithAI(
            scraped.title || result.title || "",
            scraped.content,
            targetCategory,
            scraped.coverImage,
            scraped.images || [], // 传递原文图片
            addLog
          );

          if (!rewritten) {
            console.log(`⚠️ AI rewrite failed, using AI-cleaned fallback content: ${result.title}`);
          } else if ((rewritten.images?.length || 0) < 2) {
            console.log(`⚠️ AI rewrite returned only ${rewritten.images?.length || 0} images, still saving: ${result.title}`);
          }

          const article = rewritten ?? await buildFallbackArticleWithAI({
            title: scraped.title || result.title || "",
            content: scraped.content,
            coverImage: scraped.coverImage,
            images: scraped.images || [],
          });
          const aiEdited = Boolean(rewritten);

          // 第三步：保存到数据库
          addLog('info', '保存文章...', { step: 'save', articleTitle: article.title });
          const { data: insertedArticle, error: insertError } = await supabase
            .from("news_articles")
            .insert({
              title: article.title,
              title_en: article.title_en,
              summary: article.summary,
              summary_en: article.summary_en,
              content: article.content,
              content_en: article.content_en,
              cover_image: article.coverImage,
              source_url: result.url,
              source_name: keyword,
              original_title: scraped.title,
              is_auto_generated: true,
              ai_edited: aiEdited,
              keywords: article.keywords,
              category: targetCategory,
              quality_score: qualityResult?.score || null,
              quality_reason: qualityResult?.reason || null,
              is_published: autoPublish,
              published_at: autoPublish ? new Date().toISOString() : null,
            })
            .select('id')
            .single();

          if (!insertError && insertedArticle) {
            // AI图片评估和处理
            const imageResult = await processAllArticleImages(
              supabase,
              insertedArticle.id,
              article.content,
              article.coverImage,
              article.title,
              article.summary || '',
              addLog
            );

            // 更新文章的图片内容
            if (imageResult.convertedCount > 0 || imageResult.rejectedCount > 0) {
              await supabase
                .from("news_articles")
                .update({
                  content: imageResult.newContent,
                  cover_image: imageResult.newCoverImage,
                })
                .eq('id', insertedArticle.id);
            }

            collected++;
            results.push({
              title: article.title,
              success: true,
              score: qualityResult?.score,
            });
            console.log(
              `✅ Collected (score: ${qualityResult?.score}): ${article.title}`
            );
          }

          await new Promise(resolve => setTimeout(resolve, 2000));
        }
      } catch (error) {
        console.error(`Error with keyword ${keyword}:`, error);
      }

      return new Response(
        JSON.stringify({
          success: true,
          keyword,
          category: targetCategory,
          collected,
          filtered,
          results,
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // 按分类采集（使用内置关键词）
    if (action === "collect-by-category") {
      const categoryConfig = CATEGORY_CONFIG[category as keyof typeof CATEGORY_CONFIG];
      if (!categoryConfig) {
        addLog('error', `未知分类: ${category}`);
        return new Response(
          JSON.stringify({ error: `Unknown category: ${category}`, logs }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      // 随机选择关键词，避免每次都用同一批
      const shuffledKeywords = [...categoryConfig.keywords].sort(() => 0.5 - Math.random());
      // 限制使用的关键词数量，避免过多请求
      const maxKeywords = Math.min(3, shuffledKeywords.length);
      const keywords = shuffledKeywords.slice(0, maxKeywords);
      
      const results: Array<{ title: string; success: boolean; error?: string; score?: number }> = [];
      let collected = 0;
      let filtered = 0;

      addLog('info', `使用 ${keywords.length} 个关键词进行采集`, { step: 'search', details: `关键词: ${keywords.join(', ')}` });

      for (const keyword of keywords) {
        if (collected >= count) break;

        try {
          addLog('step', `搜索关键词: ${keyword}`, { step: 'search' });
          
          // 每个关键词只搜索2条，减少API调用
          const searchResults = await searchNews(keyword, 2);
          
          addLog('info', `搜索返回 ${searchResults.length} 条结果`, { step: 'search', details: `关键词: ${keyword}` });

          for (const result of searchResults) {
            if (collected >= count) break;
            if (!result.url) continue;

            const { data: existing } = await supabase
              .from("news_articles")
              .select("id")
              .eq("source_url", result.url)
              .single();

            if (existing) {
              addLog('warning', `文章已存在，跳过`, { step: 'filter', articleTitle: result.title?.substring(0, 50) });
              continue;
            }

            addLog('step', `抓取页面内容`, { step: 'scrape', articleTitle: result.title?.substring(0, 50) });
            const scraped = await scrapeFullContent(result.url);
            
            if (!scraped || !scraped.content) {
              addLog('warning', `页面内容抓取失败`, { step: 'scrape', articleTitle: result.title?.substring(0, 50) });
              continue;
            }
            
            addLog('info', `内容抓取成功，开始AI清洗`, { step: 'clean', articleTitle: scraped.title?.substring(0, 50), details: `原始长度: ${scraped.content.length} 字符` });

            // AI 质量评分
            addLog('step', `AI质量评分中...`, { step: 'score', articleTitle: scraped.title?.substring(0, 50) });
            const qualityResult = await scoreArticleQuality(
              scraped.title || result.title || "",
              scraped.content,
              category,
              addLog
            );

            if (qualityResult?.isReviewOrAd) {
              addLog('warning', `过滤: 测评/广告类文章`, { 
                step: 'filter', 
                articleTitle: result.title?.substring(0, 50),
                score: qualityResult.score,
                isReviewOrAd: true,
                details: qualityResult.reason
              });
              filtered++;
              continue;
            }

            if (qualityResult && qualityResult.score < QUALITY_THRESHOLD) {
              addLog('warning', `过滤: 评分 ${qualityResult.score} 低于阈值 ${QUALITY_THRESHOLD}`, { 
                step: 'filter', 
                articleTitle: result.title?.substring(0, 50),
                score: qualityResult.score,
                details: qualityResult.reason
              });
              filtered++;
              continue;
            }
            
            addLog('success', `评分通过: ${qualityResult?.score}`, { 
              step: 'score', 
              articleTitle: scraped.title?.substring(0, 50),
              score: qualityResult?.score,
              details: qualityResult?.reason
            });

            // AI 二次创作（使用原文图片）
            addLog('step', `AI二次创作中...`, { step: 'rewrite', articleTitle: scraped.title?.substring(0, 50), details: `原文图片: ${scraped.images?.length || 0} 张` });
            const rewritten = await rewriteArticleWithAI(
              scraped.title || result.title || "",
              scraped.content,
              category,
              scraped.coverImage,
              scraped.images || [], // 传递原文图片
              addLog
            );

            // AI 失败时：仍然保存抓取到的正文，但会经过AI清洗
            const article = rewritten ?? await buildFallbackArticleWithAI({
              title: scraped.title || result.title || "",
              content: scraped.content,
              coverImage: scraped.coverImage,
              images: scraped.images || [],
            });
            const aiEdited = Boolean(rewritten);
            
            if (rewritten) {
              addLog('success', `AI创作完成`, { step: 'rewrite', articleTitle: article.title?.substring(0, 50), details: `生成图片: ${rewritten.images?.length || 0} 张` });
            } else {
              addLog('warning', `AI创作失败，使用AI清洗后的原始内容`, { step: 'rewrite', articleTitle: article.title?.substring(0, 50) });
            }

            // 保存
            addLog('step', `保存到数据库...`, { step: 'save', articleTitle: article.title?.substring(0, 50) });
            const { data: insertedArticle, error: insertError } = await supabase
              .from("news_articles")
              .insert({
                title: article.title,
                title_en: article.title_en,
                summary: article.summary,
                summary_en: article.summary_en,
                content: article.content,
                content_en: article.content_en,
                cover_image: article.coverImage,
                source_url: result.url,
                source_name: "International",
                original_title: scraped.title,
                is_auto_generated: true,
                ai_edited: aiEdited,
                keywords: article.keywords,
                category,
                quality_score: qualityResult?.score || null,
                quality_reason: qualityResult?.reason || null,
                is_published: autoPublish,
                published_at: autoPublish ? new Date().toISOString() : null,
              })
              .select('id')
              .single();

            if (!insertError && insertedArticle) {
              // AI图片评估和处理
              const imageResult = await processAllArticleImages(
                supabase, insertedArticle.id, article.content, article.coverImage,
                article.title, article.summary || '', addLog
              );

              if (imageResult.convertedCount > 0 || imageResult.rejectedCount > 0) {
                await supabase.from("news_articles").update({
                  content: imageResult.newContent,
                  cover_image: imageResult.newCoverImage,
                }).eq('id', insertedArticle.id);
              }

              collected++;
              results.push({ title: article.title, success: true, score: qualityResult?.score });
              addLog('success', `✅ 采集成功`, { 
                step: 'save', 
                articleTitle: article.title?.substring(0, 50),
                score: qualityResult?.score,
                details: `图片: ${imageResult.processedCount}评估 ${imageResult.rejectedCount}剔除`
              });
            } else {
              addLog('error', `保存失败: ${insertError?.message}`, { step: 'save', articleTitle: article.title?.substring(0, 50) });
            }

            await new Promise(resolve => setTimeout(resolve, 300));
          }
        } catch (error) {
          addLog('error', `关键词 "${keyword}" 处理出错`, { details: error instanceof Error ? error.message : String(error) });
        }
      }

      addLog('info', `采集任务完成`, { details: `成功: ${collected} 篇, 过滤: ${filtered} 篇` });

      return new Response(
        JSON.stringify({
          success: true,
          category,
          collected,
          filtered,
          results,
          logs,
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // 每日采集 - 按四分类
    if (action === "collect-daily") {
      console.log("Starting daily collection for all categories...");
      
      const dailyConfig = body.dailyConfig || {
        "公司新闻": 1,
        "行业动态": 1,
        "产品资讯": 1,
        "技术分享": 1,
      };
      
      const allResults: Record<string, { collected: number; filtered: number; results: Array<{ title: string; success: boolean; score?: number }> }> = {};
      let totalCollected = 0;
      let totalFiltered = 0;

      for (const [cat, targetCount] of Object.entries(dailyConfig)) {
        console.log(`\n=== Collecting ${targetCount} articles for ${cat} ===`);
        
        const categoryConfig = CATEGORY_CONFIG[cat as keyof typeof CATEGORY_CONFIG];
        if (!categoryConfig) continue;

        const results: Array<{ title: string; success: boolean; score?: number }> = [];
        let collected = 0;
        let filtered = 0;
        
        // 随机选择关键词，限制数量避免过多请求
        const shuffledKeywords = [...categoryConfig.keywords].sort(() => 0.5 - Math.random());
        const maxKeywords = Math.min(2, shuffledKeywords.length);
        const keywords = shuffledKeywords.slice(0, maxKeywords);
        
        console.log(`Using ${keywords.length} keywords for ${cat}`);

        for (const keyword of keywords) {
          if (collected >= (targetCount as number)) break;

          try {
            // 每个关键词只搜索2条
            const searchResults = await searchNews(keyword, 2);

            for (const result of searchResults) {
              if (collected >= (targetCount as number)) break;
              if (!result.url) continue;

              const { data: existing } = await supabase
                .from("news_articles")
                .select("id")
                .eq("source_url", result.url)
                .single();

              if (existing) continue;

              const scraped = await scrapeFullContent(result.url);
              if (!scraped || !scraped.content) continue;

              // AI 质量评分
              addLog('info', 'AI质量评分中...', { step: 'score', articleTitle: scraped.title?.substring(0, 50) });
              const qualityResult = await scoreArticleQuality(
                scraped.title || result.title || "",
                scraped.content,
                cat,
                addLog
              );

              if (qualityResult?.isReviewOrAd) {
                filtered++;
                totalFiltered++;
                continue;
              }

              if (qualityResult && qualityResult.score < QUALITY_THRESHOLD) {
                filtered++;
                totalFiltered++;
                continue;
              }

              // AI 二次创作（使用原文图片）
              console.log(`Article has ${scraped.images?.length || 0} original images`);
              addLog('info', 'AI内容创作中...', { step: 'rewrite', articleTitle: scraped.title?.substring(0, 50) });
              const rewritten = await rewriteArticleWithAI(
                scraped.title || result.title || "",
                scraped.content,
                cat,
                scraped.coverImage,
                scraped.images || [], // 传递原文图片
                addLog
              );

              if (!rewritten) {
                console.log(`⚠️ AI rewrite failed, using AI-cleaned fallback content: ${scraped.title || result.title}`);
              } else if ((rewritten.images?.length || 0) < 2) {
                console.log(`⚠️ AI rewrite returned only ${rewritten.images?.length || 0} images, still saving: ${scraped.title || result.title}`);
              }

              const article = rewritten ?? await buildFallbackArticleWithAI({
                title: scraped.title || result.title || "",
                content: scraped.content,
                coverImage: scraped.coverImage,
                images: scraped.images || [],
              });
              const aiEdited = Boolean(rewritten);

              // 保存
              const { data: insertedArticle, error: insertError } = await supabase
                .from("news_articles")
                .insert({
                  title: article.title,
                  title_en: article.title_en,
                  summary: article.summary,
                  summary_en: article.summary_en,
                  content: article.content,
                  content_en: article.content_en,
                  cover_image: article.coverImage,
                  source_url: result.url,
                  source_name: "International",
                  original_title: scraped.title,
                  is_auto_generated: true,
                  ai_edited: aiEdited,
                  keywords: article.keywords,
                  category: cat,
                  quality_score: qualityResult?.score || null,
                  quality_reason: qualityResult?.reason || null,
                  is_published: body.autoPublish ?? true,
                  published_at: (body.autoPublish ?? true) ? new Date().toISOString() : null,
                })
                .select('id')
                .single();

              if (!insertError && insertedArticle) {
                // AI图片评估和处理
                const imageResult = await processAllArticleImages(
                  supabase, insertedArticle.id, article.content, article.coverImage,
                  article.title, article.summary || ''
                );

                if (imageResult.convertedCount > 0 || imageResult.rejectedCount > 0) {
                  await supabase.from("news_articles").update({
                    content: imageResult.newContent,
                    cover_image: imageResult.newCoverImage,
                  }).eq('id', insertedArticle.id);
                }

                collected++;
                totalCollected++;
                results.push({ title: article.title, success: true, score: qualityResult?.score });
                console.log(`✅ [${cat}] Collected with image processing: ${article.title}`);
              }

              await new Promise(resolve => setTimeout(resolve, 2000));
            }
          } catch (error) {
            console.error(`Error with keyword ${keyword}:`, error);
          }
        }

        allResults[cat] = { collected, filtered, results };
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      return new Response(
        JSON.stringify({
          success: true,
          message: `Daily collection completed. Collected: ${totalCollected}, Filtered: ${totalFiltered}`,
          articlesCollected: totalCollected,
          articlesFiltered: totalFiltered,
          qualityThreshold: QUALITY_THRESHOLD,
          results: allResults,
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ 
        error: "Invalid action. Use: collect-by-keyword, collect-by-category, collect-daily, or generate-keywords" 
      }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Error:", error);

    // 如果已创建任务记录，则标记失败，避免后台页面一直“执行中/无日志”
    try {
      if (taskId) {
        const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
        const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
        const supabase = createClient(supabaseUrl, supabaseServiceKey);

        await supabase
          .from('news_collection_tasks')
          .update({
            status: 'failed',
            completed_at: new Date().toISOString(),
            error_message: error instanceof Error ? error.message : String(error || 'Unknown error'),
          })
          .eq('id', taskId);
      }
    } catch (e) {
      console.error('Failed to update collection task status:', e);
    }

    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
        taskId,
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
