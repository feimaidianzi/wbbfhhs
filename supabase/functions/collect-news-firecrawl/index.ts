import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// 国际新闻关键词 - 英文搜索，获取国际无人机行业新闻
const PRODUCT_KEYWORDS = {
  "系留无人机": ["tethered drone system", "tethered UAV technology", "persistent surveillance drone", "tethered drone power"],
  "消防无人机": ["firefighting drone", "fire suppression UAV", "wildfire drone", "emergency response drone"],
  "物流无人机": ["drone delivery service", "cargo drone", "logistics UAV", "last mile drone delivery"],
  "巡检无人机": ["power line inspection drone", "infrastructure inspection UAV", "solar panel drone inspection", "wind turbine drone"],
  "无人机机场": ["drone in a box", "autonomous drone station", "drone port", "drone docking station"],
  "云台相机": ["drone gimbal camera", "aerial thermal camera", "drone payload system", "UAV camera technology"],
  "无人机培训": ["drone pilot training", "UAV certification program", "commercial drone license", "drone flight school"],
  "表演无人机": ["drone light show", "drone swarm display", "entertainment drone", "synchronized drone performance"],
};

// 分类配置
const CATEGORY_CONFIG = {
  "公司新闻": {
    keywords: ["drone company", "UAV manufacturer", "drone startup funding"],
    style: "正式、专业、强调企业实力和国际影响力",
  },
  "行业动态": {
    keywords: ["drone industry", "UAV regulation", "drone market analysis"],
    style: "客观、全面、有深度分析，关注国际政策和市场趋势",
  },
  "产品资讯": {
    keywords: ["new drone release", "drone product launch", "UAV specifications"],
    style: "详细、技术性、突出产品特点和创新之处",
  },
  "技术分享": {
    keywords: ["drone technology", "UAV innovation", "drone AI", "autonomous flight"],
    style: "专业、深入、注重技术细节和前沿发展",
  },
};

// 清理抓取的内容，移除无用信息
function cleanContent(rawContent: string): string {
  if (!rawContent) return "";
  
  let content = rawContent
    // 移除 Markdown 图片和链接
    .replace(/!\[.*?\]\(.*?\)/g, '')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    // 移除 URL
    .replace(/https?:\/\/[^\s)>\]]+/g, '')
    // 移除 HTML 标签
    .replace(/<[^>]+>/g, '')
    // 移除多余空白
    .replace(/\n{3,}/g, '\n\n')
    .replace(/[ \t]{2,}/g, ' ')
    // 移除常见的网站导航和页脚文字
    .replace(/首页.*?登录/g, '')
    .replace(/版权所有.*?备案/g, '')
    .replace(/关于我们.*?联系我们/g, '')
    .replace(/上一篇.*?下一篇/g, '')
    // 移除空行开头的文本
    .trim();

  // 如果内容太短，返回空
  if (content.length < 100) return "";
  
  return content;
}

// 使用 Lovable AI 进行专业润色、翻译和编排
async function polishAndFormatArticle(
  originalTitle: string,
  originalContent: string,
  sourceUrl: string,
  category: string,
  coverImage: string | null = null
): Promise<{ title: string; summary: string; content: string; keywords: string[]; coverImage: string | null } | null> {
  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    
    if (!supabaseUrl || !supabaseServiceKey) {
      console.error("Supabase configuration missing");
      return null;
    }

    console.log("Calling AI for translation and article polishing...");
    
    // 使用自定义 AI 润色函数，传入 isEnglish=true 表示需要翻译
    const response = await fetch(`${supabaseUrl}/functions/v1/ai-rewrite-article`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${supabaseServiceKey}`,
      },
      body: JSON.stringify({
        title: originalTitle,
        content: originalContent.substring(0, 5000),
        category,
        coverImage,
        isEnglish: true, // 国际新闻需要翻译
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI rewrite error:", errorText);
      return fallbackProcessing(originalTitle, originalContent, category, coverImage);
    }

    const result = await response.json();
    
    if (!result.success || !result.data) {
      console.error("AI rewrite failed");
      return fallbackProcessing(originalTitle, originalContent, category, coverImage);
    }

    const data = result.data;
    console.log("AI translation and rewrite successful:", data.title);

    return {
      title: data.title?.substring(0, 100) || originalTitle.substring(0, 35),
      summary: (data.summary || "").substring(0, 300),
      content: data.content || "",
      keywords: Array.isArray(data.keywords) ? data.keywords.slice(0, 5) : [],
      coverImage: data.coverImage || coverImage,
    };
  } catch (error) {
    console.error("AI polishing failed:", error);
    return fallbackProcessing(originalTitle, originalContent, category, coverImage);
  }
}

// 回退处理 - 基本的内容格式化
function fallbackProcessing(
  title: string,
  content: string,
  category: string,
  coverImage: string | null = null
): { title: string; summary: string; content: string; keywords: string[]; coverImage: string | null } {
  const cleanTitle = title.length > 35 ? title.substring(0, 35) + "..." : title;
  const summary = content.substring(0, 150).replace(/\n/g, ' ') + "...";
  
  // 分段处理
  const paragraphs = content.split(/\n{2,}/).filter(p => p.trim().length > 30);
  const htmlContent = paragraphs.slice(0, 8).map(p => `<p>${p.trim()}</p>`).join('\n');
  
  // 提取关键词 - 增加英文关键词识别
  const keywords: string[] = [];
  const keywordList = ["drone", "UAV", "tethered", "firefighting", "delivery", "inspection", "无人机", "系留", "消防", "物流", "巡检"];
  for (const kw of keywordList) {
    if ((title + content).toLowerCase().includes(kw.toLowerCase()) && keywords.length < 5) {
      keywords.push(kw);
    }
  }
  if (keywords.length === 0) keywords.push(category);
  
  return {
    title: cleanTitle,
    summary,
    content: htmlContent || `<p>${content.substring(0, 800)}</p>`,
    keywords,
    coverImage,
  };
}

// 使用 Firecrawl 搜索国际新闻（英文）
async function searchNews(
  query: string,
  limit: number = 5
): Promise<Array<{ url: string; title: string; description: string; markdown?: string }>> {
  const apiKey = Deno.env.get("FIRECRAWL_API_KEY");
  if (!apiKey) {
    throw new Error("Firecrawl API key not configured");
  }

  console.log(`Searching international news: ${query}`);

  const response = await fetch("https://api.firecrawl.dev/v1/search", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: query + " news 2024 2025",
      limit,
      lang: "en",
      country: "US",
      tbs: "qdr:w", // 过去一周的新闻
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

// 抓取单个网页完整内容和图片
async function scrapeFullContent(url: string): Promise<{ title: string; content: string; coverImage: string | null } | null> {
  const apiKey = Deno.env.get("FIRECRAWL_API_KEY");
  if (!apiKey) {
    throw new Error("Firecrawl API key not configured");
  }

  try {
    console.log(`Scraping full content with images: ${url}`);
    
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
      console.log(`Content too short after cleaning: ${url}`);
      return null;
    }

    // 提取文章配图
    let coverImage: string | null = null;
    
    // 从 metadata 中获取 OG 图片
    if (scraped.metadata?.ogImage) {
      coverImage = scraped.metadata.ogImage;
    }
    
    // 如果没有 OG 图片，从 HTML 中提取第一张有效图片
    if (!coverImage && scraped.html) {
      const imgMatches = scraped.html.match(/<img[^>]+src=["']([^"']+)["'][^>]*>/gi);
      if (imgMatches) {
        for (const match of imgMatches) {
          const srcMatch = match.match(/src=["']([^"']+)["']/i);
          if (srcMatch && srcMatch[1]) {
            const imgUrl = srcMatch[1];
            // 过滤掉小图标、logo、广告等
            if (imgUrl.includes('logo') || imgUrl.includes('icon') || imgUrl.includes('avatar') ||
                imgUrl.includes('ads') || imgUrl.includes('banner') || imgUrl.includes('pixel') ||
                imgUrl.length < 20 || imgUrl.startsWith('data:')) {
              continue;
            }
            // 确保是完整 URL
            if (imgUrl.startsWith('http')) {
              coverImage = imgUrl;
              break;
            }
          }
        }
      }
    }
    
    // 从 markdown 中提取图片作为备选
    if (!coverImage && rawContent) {
      const mdImgMatch = rawContent.match(/!\[.*?\]\((https?:\/\/[^)]+)\)/);
      if (mdImgMatch && mdImgMatch[1]) {
        const imgUrl = mdImgMatch[1];
        if (!imgUrl.includes('logo') && !imgUrl.includes('icon') && !imgUrl.includes('avatar')) {
          coverImage = imgUrl;
        }
      }
    }

    console.log(`Found cover image: ${coverImage ? 'Yes' : 'No'}`);

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

    if (action === "collect-product-news") {
      // 采集产品相关新闻
      const results: Array<{ 
        productType: string; 
        title: string; 
        success: boolean; 
        error?: string 
      }> = [];

      // 获取要采集的产品类型
      const productTypes = body.productTypes || Object.keys(PRODUCT_KEYWORDS);
      const articlesPerType = Math.ceil(count / productTypes.length);

      for (const productType of productTypes) {
        const keywords = PRODUCT_KEYWORDS[productType as keyof typeof PRODUCT_KEYWORDS];
        if (!keywords) continue;

        console.log(`Collecting news for: ${productType}`);
        let collected = 0;

        for (const keyword of keywords) {
          if (collected >= articlesPerType) break;

          try {
            const searchResults = await searchNews(keyword, 3);
            
            for (const result of searchResults) {
              if (collected >= articlesPerType) break;
              if (!result.url) continue;

              // 检查是否已存在
              const { data: existing } = await supabase
                .from("news_articles")
                .select("id")
                .eq("source_url", result.url)
                .single();

              if (existing) {
                console.log(`Already exists: ${result.url}`);
                continue;
              }

              // 获取完整内容
              const scraped = await scrapeFullContent(result.url);
              if (!scraped || !scraped.content) {
                results.push({
                  productType,
                  title: result.title || "Unknown",
                  success: false,
                  error: "Failed to scrape content",
                });
                continue;
              }

              // AI 润色和编排（包含翻译）
              const polished = await polishAndFormatArticle(
                scraped.title || result.title || "",
                scraped.content,
                result.url,
                category || "产品资讯",
                scraped.coverImage
              );

              if (!polished) {
                results.push({
                  productType,
                  title: scraped.title || "Unknown",
                  success: false,
                  error: "AI polishing failed",
                });
                continue;
              }

              // 保存到数据库（包含配图）
              const { error: insertError } = await supabase
                .from("news_articles")
                .insert({
                  title: polished.title,
                  summary: polished.summary,
                  content: polished.content,
                  cover_image: polished.coverImage,
                  source_url: result.url,
                  source_name: productType,
                  original_title: scraped.title,
                  is_auto_generated: true,
                  ai_edited: true,
                  keywords: [...polished.keywords, productType],
                  category: category || "产品资讯",
                  is_published: autoPublish,
                  published_at: autoPublish ? new Date().toISOString() : null,
                });

              if (insertError) {
                console.error("Insert error:", insertError);
                results.push({
                  productType,
                  title: polished.title,
                  success: false,
                  error: insertError.message,
                });
              } else {
                collected++;
                results.push({
                  productType,
                  title: polished.title,
                  success: true,
                });
                console.log(`✅ Collected: ${polished.title}`);
              }

              // 延迟避免 API 限制
              await new Promise(resolve => setTimeout(resolve, 2000));
            }
          } catch (error) {
            console.error(`Error with keyword ${keyword}:`, error);
          }
        }
      }

      return new Response(
        JSON.stringify({ 
          success: true, 
          collected: results.filter(r => r.success).length,
          results 
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (action === "collect-by-category") {
      // 按分类采集国际新闻（英文搜索）
      const categoryKeywords: Record<string, string[]> = {
        "公司新闻": [
          "drone company acquisition 2025",
          "UAV manufacturer partnership",
          "drone startup funding investment",
          "commercial drone business expansion",
        ],
        "行业动态": [
          "drone regulation policy 2025",
          "UAV industry market analysis",
          "eVTOL air taxi development",
          "drone airspace management",
          "tethered drone applications",
          "firefighting drone deployment",
        ],
        "产品资讯": [
          "new drone product launch 2025",
          "tethered drone system release",
          "firefighting UAV technology",
          "drone delivery system",
          "industrial drone camera gimbal",
        ],
        "技术分享": [
          "drone AI autonomous flight",
          "UAV swarm technology",
          "drone beyond visual line of sight",
          "tethered drone power system",
          "drone computer vision innovation",
        ],
      };

      const keywords = categoryKeywords[category] || categoryKeywords["行业动态"];
      const results: Array<{ title: string; success: boolean; error?: string }> = [];
      let collected = 0;

      for (const keyword of keywords) {
        if (collected >= count) break;

        try {
          const searchResults = await searchNews(keyword, 3);

          for (const result of searchResults) {
            if (collected >= count) break;
            if (!result.url) continue;

            // 检查是否已存在
            const { data: existing } = await supabase
              .from("news_articles")
              .select("id")
              .eq("source_url", result.url)
              .single();

            if (existing) continue;

            // 获取完整内容
            const scraped = await scrapeFullContent(result.url);
            if (!scraped || !scraped.content) {
              results.push({
                title: result.title || "Unknown",
                success: false,
                error: "Content scraping failed",
              });
              continue;
            }

            // AI 润色（包含翻译）
            const polished = await polishAndFormatArticle(
              scraped.title || result.title || "",
              scraped.content,
              result.url,
              category,
              scraped.coverImage
            );

            if (!polished) {
              results.push({
                title: scraped.title || "Unknown",
                success: false,
                error: "AI polishing failed",
              });
              continue;
            }

            // 保存（包含配图）
            const { error: insertError } = await supabase
              .from("news_articles")
              .insert({
                title: polished.title,
                summary: polished.summary,
                content: polished.content,
                cover_image: polished.coverImage,
                source_url: result.url,
                source_name: "International",
                original_title: scraped.title,
                is_auto_generated: true,
                ai_edited: true,
                keywords: polished.keywords,
                category,
                is_published: autoPublish,
                published_at: autoPublish ? new Date().toISOString() : null,
              });

            if (insertError) {
              results.push({
                title: polished.title,
                success: false,
                error: insertError.message,
              });
            } else {
              collected++;
              results.push({
                title: polished.title,
                success: true,
              });
              console.log(`✅ [${category}] Collected: ${polished.title}`);
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
          results,
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // 批量初始化采集 - 为每个分类采集指定数量
    if (action === "batch-init") {
      const categories = body.categories || {
        "公司新闻": 20,
        "行业动态": 20,
        "产品资讯": 20,
        "技术分享": 20,
      };

      console.log("Starting batch initialization...");
      
      const allResults: Record<string, { collected: number; results: Array<{ title: string; success: boolean }> }> = {};

      for (const [cat, targetCount] of Object.entries(categories)) {
        console.log(`\n=== Collecting ${targetCount} articles for ${cat} ===`);
        
        // 递归调用自己
        const categoryResult = await fetch(req.url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": req.headers.get("Authorization") || "",
          },
          body: JSON.stringify({
            action: "collect-by-category",
            category: cat,
            count: targetCount,
            autoPublish: true,
          }),
        });

        const result = await categoryResult.json();
        allResults[cat] = {
          collected: result.collected || 0,
          results: result.results || [],
        };

        // 分类间延迟
        await new Promise(resolve => setTimeout(resolve, 3000));
      }

      const totalCollected = Object.values(allResults).reduce((sum, r) => sum + r.collected, 0);

      return new Response(
        JSON.stringify({
          success: true,
          message: `Batch initialization completed. Total collected: ${totalCollected}`,
          results: allResults,
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ 
        error: "Invalid action. Use: collect-product-news, collect-by-category, or batch-init" 
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
