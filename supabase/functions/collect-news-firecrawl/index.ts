import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

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

// 清理抓取的内容
function cleanContent(rawContent: string): string {
  if (!rawContent) return "";
  
  let content = rawContent
    .replace(/!\[.*?\]\(.*?\)/g, '')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/https?:\/\/[^\s)>\]]+/g, '')
    .replace(/<[^>]+>/g, '')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/[ \t]{2,}/g, ' ')
    .trim();

  if (content.length < 100) return "";
  return content;
}

// 使用 Lovable AI 进行文章质量评分 - 增强版
async function scoreArticleQuality(
  title: string,
  content: string,
  category: string
): Promise<{ score: number; reason: string; isReviewOrAd: boolean } | null> {
  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      console.log("LOVABLE_API_KEY not found, skipping quality scoring");
      return { score: 10, reason: "未配置评分，默认通过", isReviewOrAd: false };
    }

    console.log("Scoring article quality with enhanced criteria...");
    
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

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: "你是专业的新闻质量评审专家，请严格按照评分标准评分，特别注意识别和排除测评类和广告类文章。" },
          { role: "user", content: prompt }
        ],
        temperature: 0.3,
        max_tokens: 300,
      }),
    });

    if (!response.ok) {
      console.error("Quality scoring API error:", response.status);
      return { score: 8, reason: "评分API错误，默认通过", isReviewOrAd: false };
    }

    const data = await response.json();
    const aiContent = data.choices?.[0]?.message?.content || "";
    
    const jsonMatch = aiContent.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const result = JSON.parse(jsonMatch[0]);
      console.log(`Quality score: ${result.score} - ${result.reason} - isReviewOrAd: ${result.isReviewOrAd}`);
      return {
        score: parseFloat(result.score) || 8,
        reason: result.reason || "评分完成",
        isReviewOrAd: result.isReviewOrAd === true,
      };
    }

    return { score: 8, reason: "解析失败，默认通过", isReviewOrAd: false };
  } catch (error) {
    console.error("Quality scoring failed:", error);
    return { score: 8, reason: "评分异常，默认通过", isReviewOrAd: false };
  }
}

// 搜索无水印/无商标的图片
async function searchCleanImages(
  keyword: string,
  count: number = 3
): Promise<string[]> {
  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) return [];

    const prompt = `为一篇关于"${keyword}"的无人机技术文章推荐${count}张高质量配图。

要求：
1. 只返回真实存在的公开可用图片URL
2. 图片必须是无水印、无商标的
3. 图片来源优先选择Unsplash、Pexels等免费图库
4. 图片内容要与文章主题相关（无人机、FPV、技术设备等）

请返回JSON数组格式：
["图片URL1", "图片URL2", "图片URL3"]

如果无法找到合适的图片，返回空数组 []`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "user", content: prompt }
        ],
        temperature: 0.5,
        max_tokens: 500,
      }),
    });

    if (!response.ok) return [];

    const data = await response.json();
    const aiContent = data.choices?.[0]?.message?.content || "";
    
    const jsonMatch = aiContent.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      const urls = JSON.parse(jsonMatch[0]);
      // 验证URL格式
      return urls.filter((url: string) => 
        url.startsWith('http') && 
        !url.includes('logo') && 
        !url.includes('watermark') &&
        !url.includes('brand')
      );
    }
    return [];
  } catch (error) {
    console.error("Image search failed:", error);
    return [];
  }
}

// 获取高质量无人机配图
function getDefaultDroneImages(): string[] {
  return [
    "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800&q=80",
    "https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=800&q=80",
    "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=800&q=80",
    "https://images.unsplash.com/photo-1579829366248-204fe8413f31?w=800&q=80",
    "https://images.unsplash.com/photo-1521405924368-64c5b84bec60?w=800&q=80",
    "https://images.unsplash.com/photo-1506947411487-a56738267384?w=800&q=80",
    "https://images.unsplash.com/photo-1524143986875-3b098d78b363?w=800&q=80",
    "https://images.unsplash.com/photo-1559827291-72ee739d0d9a?w=800&q=80",
  ];
}

// 使用 Lovable AI 进行专业二次创作
async function rewriteArticleWithAI(
  originalTitle: string,
  originalContent: string,
  category: string,
  coverImage: string | null = null
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
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      console.error("LOVABLE_API_KEY not found");
      return null;
    }

    const categoryConfig = CATEGORY_CONFIG[category as keyof typeof CATEGORY_CONFIG];
    const style = categoryConfig?.style || "专业、客观、信息丰富";
    const focus = categoryConfig?.contentFocus || "无人机行业相关内容";

    console.log("Rewriting article with AI for bilingual output...");
    
    const prompt = `你是一位资深的无人机行业新闻编辑，为专业无人机技术公司官网撰写高质量新闻稿。

【原始标题】${originalTitle}

【原始内容】${originalContent.substring(0, 6000)}

【目标分类】${category}

【写作风格】${style}

【内容重点】${focus}

【我们的产品线】
多旋翼无人机、VTX/VRX图传设备、飞控/电调、吊舱/云台、数字图传、无人机相机、ELRS遥控系统、GPS模块、接收屏、FPV眼镜、无人机配件

【重要要求】
1. 完全重新创作文章，不要简单翻译或复制
2. 文章需要同时提供中文版和英文版
3. 每篇文章必须包含至少2个图片插入位置标记
4. 中文版800-1500字，英文版500-1000词
5. 注重可读性和专业性
6. 禁止包含任何URL、广告信息

【图片插入格式】
在文章适当位置插入图片标记：<!-- IMAGE_PLACEHOLDER_1 --> <!-- IMAGE_PLACEHOLDER_2 -->

【输出JSON格式】
{
  "title": "中文标题（25-35字）",
  "title_en": "English Title (5-10 words)",
  "summary": "中文摘要（100-150字）",
  "summary_en": "English summary (50-80 words)",
  "content": "中文HTML正文（包含h3/p/strong标签和图片标记，800-1500字）",
  "content_en": "English HTML content (with h3/p/strong tags and image placeholders, 500-1000 words)",
  "keywords": ["关键词1", "关键词2", "关键词3", "keyword4", "keyword5"]
}

【正文结构示例】
<h3>核心事件介绍</h3>
<p>开篇段落...</p>
<!-- IMAGE_PLACEHOLDER_1 -->
<h3>详细分析</h3>
<p>详细内容...</p>
<!-- IMAGE_PLACEHOLDER_2 -->
<h3>总结与展望</h3>
<p>结尾段落...</p>`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: "你是专业的无人机行业新闻编辑，擅长撰写高质量双语新闻稿。" },
          { role: "user", content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 4000,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI rewrite API error:", response.status, errorText);
      return null;
    }

    const data = await response.json();
    const aiContent = data.choices?.[0]?.message?.content || "";
    
    const jsonMatch = aiContent.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.error("Failed to parse AI response");
      return null;
    }

    const result = JSON.parse(jsonMatch[0]);
    
    // 获取配图
    let images: string[] = [];
    const defaultImages = getDefaultDroneImages();
    
    // 随机选择2-3张默认图片
    const shuffled = defaultImages.sort(() => 0.5 - Math.random());
    images = shuffled.slice(0, 3);
    
    // 替换图片占位符
    let contentWithImages = result.content || "";
    let contentEnWithImages = result.content_en || "";
    
    images.forEach((imgUrl, index) => {
      const placeholder = `<!-- IMAGE_PLACEHOLDER_${index + 1} -->`;
      const imgHtml = `<figure class="my-6"><img src="${imgUrl}" alt="文章配图 ${index + 1}" class="rounded-lg shadow-md w-full" /><figcaption class="text-center text-sm text-muted-foreground mt-2">图${index + 1}</figcaption></figure>`;
      contentWithImages = contentWithImages.replace(placeholder, imgHtml);
      contentEnWithImages = contentEnWithImages.replace(placeholder, imgHtml);
    });

    // 清理未使用的占位符
    contentWithImages = contentWithImages.replace(/<!-- IMAGE_PLACEHOLDER_\d+ -->/g, '');
    contentEnWithImages = contentEnWithImages.replace(/<!-- IMAGE_PLACEHOLDER_\d+ -->/g, '');

    console.log("AI rewrite successful with bilingual content");

    return {
      title: result.title?.substring(0, 100) || originalTitle.substring(0, 35),
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
    return null;
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

  const response = await fetch("https://api.firecrawl.dev/v1/search", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: query + " news 2024 2025 -review -测评 -评测",
      limit,
      lang: "en",
      country: "US",
      tbs: "qdr:w",
      scrapeOptions: {
        formats: ["markdown"],
        onlyMainContent: true,
      },
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error("Firecrawl search error:", errorData);
    throw new Error(errorData.error || "Search failed");
  }

  const data = await response.json();
  return data.data || [];
}

// 抓取网页内容
async function scrapeFullContent(url: string): Promise<{ title: string; content: string; coverImage: string | null } | null> {
  const apiKey = Deno.env.get("FIRECRAWL_API_KEY");
  if (!apiKey) {
    throw new Error("Firecrawl API key not configured");
  }

  try {
    console.log(`Scraping: ${url}`);
    
    const response = await fetch("https://api.firecrawl.dev/v1/scrape", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url,
        formats: ["markdown", "html"],
        onlyMainContent: true,
        waitFor: 2000,
      }),
    });

    if (!response.ok) {
      console.error(`Scrape failed for ${url}`);
      return null;
    }

    const data = await response.json();
    const scraped = data.data || data;
    
    const rawContent = scraped.markdown || "";
    const cleanedContent = cleanContent(rawContent);
    
    if (cleanedContent.length < 200) {
      console.log(`Content too short: ${url}`);
      return null;
    }

    let coverImage: string | null = null;
    
    if (scraped.metadata?.ogImage) {
      // 检查是否有水印或商标标记
      const imgUrl = scraped.metadata.ogImage;
      if (!imgUrl.includes('logo') && !imgUrl.includes('watermark') && !imgUrl.includes('brand')) {
        coverImage = imgUrl;
      }
    }
    
    if (!coverImage && scraped.html) {
      const imgMatches = scraped.html.match(/<img[^>]+src=["']([^"']+)["'][^>]*>/gi);
      if (imgMatches) {
        for (const match of imgMatches) {
          const srcMatch = match.match(/src=["']([^"']+)["']/i);
          if (srcMatch && srcMatch[1]) {
            const imgUrl = srcMatch[1];
            // 排除带水印/商标的图片
            if (imgUrl.includes('logo') || imgUrl.includes('icon') || imgUrl.includes('avatar') ||
                imgUrl.includes('ads') || imgUrl.includes('banner') || imgUrl.includes('pixel') ||
                imgUrl.includes('watermark') || imgUrl.includes('brand') ||
                imgUrl.length < 20 || imgUrl.startsWith('data:')) {
              continue;
            }
            if (imgUrl.startsWith('http')) {
              coverImage = imgUrl;
              break;
            }
          }
        }
      }
    }

    return {
      title: scraped.metadata?.title || "",
      content: cleanedContent,
      coverImage,
    };
  } catch (error) {
    console.error(`Error scraping ${url}:`, error);
    return null;
  }
}

// 使用AI生成热门关键词
async function generateHotKeywords(): Promise<Record<string, string[]>> {
  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      return CATEGORY_CONFIG as any;
    }

    const prompt = `请根据当前无人机行业热点，为以下四个新闻分类生成热门搜索关键词。

【我们的产品线】
多旋翼无人机、VTX/VRX图传设备、飞控/电调、吊舱/云台、数字图传、无人机相机、ELRS遥控系统、GPS模块、接收屏、FPV眼镜、无人机配件

【四个分类】
1. 公司新闻：基于我们产品生成关键词，如"长凌VTX发布"、"长凌无人机应用案例"等
2. 行业动态：如"某地区发布无人机规定"、"某市场迎来重大变革"、"某国家新增无人机需求"等
3. 产品资讯：如"无人机某领域迎来技术突破"、"最新FPV设备发布"等
4. 技术分享：如"VTX是什么"、"模拟图传和数字图传区别"、"ELRS的作用"等产品科普

每个分类生成5-8个搜索关键词（中英文混合），用于在网上搜索相关新闻。

请返回JSON格式：
{
  "公司新闻": ["关键词1", "关键词2", ...],
  "行业动态": ["关键词1", "关键词2", ...],
  "产品资讯": ["关键词1", "关键词2", ...],
  "技术分享": ["关键词1", "关键词2", ...]
}`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "user", content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      console.error("Keyword generation API error");
      return {};
    }

    const data = await response.json();
    const aiContent = data.choices?.[0]?.message?.content || "";
    
    const jsonMatch = aiContent.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    return {};
  } catch (error) {
    console.error("Keyword generation failed:", error);
    return {};
  }
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const body = await req.json();
    const { action, category, count = 5, autoPublish = true } = body;

    console.log(`Action: ${action}, Category: ${category}, Count: ${count}`);

    // 生成热门关键词
    if (action === "generate-keywords") {
      const keywords = await generateHotKeywords();
      return new Response(
        JSON.stringify({ success: true, keywords }),
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
          const qualityResult = await scoreArticleQuality(
            scraped.title || result.title || "",
            scraped.content,
            targetCategory
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

          // 第二步：AI 二次创作（双语版本，带配图）
          const rewritten = await rewriteArticleWithAI(
            scraped.title || result.title || "",
            scraped.content,
            targetCategory,
            scraped.coverImage
          );

          if (!rewritten) continue;

          // 第三步：保存到数据库
          const { error: insertError } = await supabase
            .from("news_articles")
            .insert({
              title: rewritten.title,
              title_en: rewritten.title_en,
              summary: rewritten.summary,
              summary_en: rewritten.summary_en,
              content: rewritten.content,
              content_en: rewritten.content_en,
              cover_image: rewritten.coverImage,
              source_url: result.url,
              source_name: keyword,
              original_title: scraped.title,
              is_auto_generated: true,
              ai_edited: true,
              keywords: rewritten.keywords,
              category: targetCategory,
              quality_score: qualityResult?.score || null,
              quality_reason: qualityResult?.reason || null,
              is_published: autoPublish,
              published_at: autoPublish ? new Date().toISOString() : null,
            });

          if (!insertError) {
            collected++;
            results.push({
              title: rewritten.title,
              success: true,
              score: qualityResult?.score,
            });
            console.log(`✅ Collected (score: ${qualityResult?.score}): ${rewritten.title}`);
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
        return new Response(
          JSON.stringify({ error: `Unknown category: ${category}` }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      const keywords = categoryConfig.keywords;
      const results: Array<{ title: string; success: boolean; error?: string; score?: number }> = [];
      let collected = 0;
      let filtered = 0;

      for (const keyword of keywords) {
        if (collected >= count) break;

        try {
          const searchResults = await searchNews(keyword, 3);

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

            // AI 质量评分
            const qualityResult = await scoreArticleQuality(
              scraped.title || result.title || "",
              scraped.content,
              category
            );

            if (qualityResult?.isReviewOrAd) {
              console.log(`❌ Filtered (review/ad): ${result.title}`);
              filtered++;
              continue;
            }

            if (qualityResult && qualityResult.score < QUALITY_THRESHOLD) {
              console.log(`❌ Filtered (score: ${qualityResult.score}): ${result.title}`);
              filtered++;
              continue;
            }

            // AI 二次创作
            const rewritten = await rewriteArticleWithAI(
              scraped.title || result.title || "",
              scraped.content,
              category,
              scraped.coverImage
            );

            if (!rewritten) continue;

            // 保存
            const { error: insertError } = await supabase
              .from("news_articles")
              .insert({
                title: rewritten.title,
                title_en: rewritten.title_en,
                summary: rewritten.summary,
                summary_en: rewritten.summary_en,
                content: rewritten.content,
                content_en: rewritten.content_en,
                cover_image: rewritten.coverImage,
                source_url: result.url,
                source_name: "International",
                original_title: scraped.title,
                is_auto_generated: true,
                ai_edited: true,
                keywords: rewritten.keywords,
                category,
                quality_score: qualityResult?.score || null,
                quality_reason: qualityResult?.reason || null,
                is_published: autoPublish,
                published_at: autoPublish ? new Date().toISOString() : null,
              });

            if (!insertError) {
              collected++;
              results.push({
                title: rewritten.title,
                success: true,
                score: qualityResult?.score,
              });
              console.log(`✅ [${category}] Collected (score: ${qualityResult?.score}): ${rewritten.title}`);
            }

            await new Promise(resolve => setTimeout(resolve, 2000));
          }
        } catch (error) {
          console.error(`Error with keyword ${keyword}:`, error);
        }
      }

      return new Response(
        JSON.stringify({
          success: true,
          category,
          collected,
          filtered,
          results,
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
        const keywords = categoryConfig.keywords;

        for (const keyword of keywords) {
          if (collected >= (targetCount as number)) break;

          try {
            const searchResults = await searchNews(keyword, 3);

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
              const qualityResult = await scoreArticleQuality(
                scraped.title || result.title || "",
                scraped.content,
                cat
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

              // AI 二次创作
              const rewritten = await rewriteArticleWithAI(
                scraped.title || result.title || "",
                scraped.content,
                cat,
                scraped.coverImage
              );

              if (!rewritten) continue;

              // 保存
              const { error: insertError } = await supabase
                .from("news_articles")
                .insert({
                  title: rewritten.title,
                  title_en: rewritten.title_en,
                  summary: rewritten.summary,
                  summary_en: rewritten.summary_en,
                  content: rewritten.content,
                  content_en: rewritten.content_en,
                  cover_image: rewritten.coverImage,
                  source_url: result.url,
                  source_name: "International",
                  original_title: scraped.title,
                  is_auto_generated: true,
                  ai_edited: true,
                  keywords: rewritten.keywords,
                  category: cat,
                  quality_score: qualityResult?.score || null,
                  quality_reason: qualityResult?.reason || null,
                  is_published: body.autoPublish ?? true,
                  published_at: (body.autoPublish ?? true) ? new Date().toISOString() : null,
                });

              if (!insertError) {
                collected++;
                totalCollected++;
                results.push({ title: rewritten.title, success: true, score: qualityResult?.score });
                console.log(`✅ [${cat}] Collected (score: ${qualityResult?.score}): ${rewritten.title}`);
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
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error instanceof Error ? error.message : "Unknown error" 
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
