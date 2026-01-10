import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// 网站产品相关的关键词 - 重点是多旋翼之外的产品
const PRODUCT_KEYWORDS = {
  "系留无人机": ["系留无人机", "系留式无人机", "有缆无人机", "系留平台", "tethered drone", "系留升空"],
  "消防无人机": ["消防无人机", "灭火无人机", "森林防火无人机", "应急消防", "firefighting drone", "消防救援无人机"],
  "物流无人机": ["物流无人机", "配送无人机", "货运无人机", "快递无人机", "delivery drone", "无人机送货"],
  "巡检无人机": ["电力巡检无人机", "输电线路巡检", "光伏巡检", "风电巡检", "inspection drone", "智能巡检"],
  "无人机机场": ["无人机机场", "无人机机库", "无人值守机场", "自动机场", "drone airport", "drone nest"],
  "云台相机": ["无人机云台", "航拍云台", "红外云台", "双光云台", "gimbal camera", "吊舱载荷"],
  "无人机培训": ["无人机培训", "无人机飞手", "AOPA培训", "无人机驾照", "drone training", "执照考试"],
  "表演无人机": ["无人机编队", "无人机表演", "灯光秀", "集群表演", "drone show", "无人机蜂群"],
};

// 分类配置
const CATEGORY_CONFIG = {
  "公司新闻": {
    keywords: ["无人机公司", "无人机企业", "战略合作", "签约", "发布会", "融资"],
    style: "正式、专业、强调企业实力",
  },
  "行业动态": {
    keywords: ["无人机行业", "低空经济", "政策法规", "市场分析", "产业发展"],
    style: "客观、全面、有深度分析",
  },
  "产品资讯": {
    keywords: ["新品发布", "产品升级", "技术参数", "性能测试", "产品评测"],
    style: "详细、技术性、突出产品特点",
  },
  "技术分享": {
    keywords: ["技术创新", "研发突破", "算法", "专利", "解决方案"],
    style: "专业、深入、注重技术细节",
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

// 使用 Lovable AI 进行专业润色和编排
async function polishAndFormatArticle(
  originalTitle: string,
  originalContent: string,
  sourceUrl: string,
  category: string
): Promise<{ title: string; summary: string; content: string; keywords: string[]; coverImage: string | null } | null> {
  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    
    if (!supabaseUrl || !supabaseServiceKey) {
      console.error("Supabase configuration missing");
      return null;
    }

    const categoryConfig = CATEGORY_CONFIG[category as keyof typeof CATEGORY_CONFIG] || CATEGORY_CONFIG["行业动态"];
    
    const prompt = `你是一位资深的无人机行业编辑，专门为专业无人机技术公司的官网编写新闻稿。

请根据以下原始素材，创作一篇完整、专业、可直接发布的新闻文章。

【原始标题】
${originalTitle}

【原始内容】
${originalContent.substring(0, 3500)}

【目标分类】
${category}

【写作风格】
${categoryConfig.style}

【创作要求】
1. 标题：专业、有吸引力，不超过35个字
2. 摘要：100-150字，概括核心观点
3. 正文：800-1200字，结构清晰，使用HTML格式（<p>, <h3>, <strong>, <ul>, <li>），不要包含任何图片或链接
4. 关键词：5个最相关的关键词

请以JSON格式返回：
{
  "title": "文章标题",
  "summary": "摘要内容",
  "content": "HTML格式正文",
  "keywords": ["关键词1", "关键词2", "关键词3", "关键词4", "关键词5"]
}`;

    console.log("Calling AI for article polishing...");
    
    // 使用自定义 AI 润色函数
    const response = await fetch(`${supabaseUrl}/functions/v1/ai-rewrite-article`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${supabaseServiceKey}`,
      },
      body: JSON.stringify({
        title: originalTitle,
        content: originalContent.substring(0, 4000),
        category,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI rewrite error:", errorText);
      return fallbackProcessing(originalTitle, originalContent, category);
    }

    const result = await response.json();
    
    if (!result.success || !result.data) {
      console.error("AI rewrite failed");
      return fallbackProcessing(originalTitle, originalContent, category);
    }

    const data = result.data;
    console.log("AI rewrite successful:", data.title);

    return {
      title: data.title?.substring(0, 100) || originalTitle.substring(0, 35),
      summary: (data.summary || "").substring(0, 300),
      content: data.content || "",
      keywords: Array.isArray(data.keywords) ? data.keywords.slice(0, 5) : [],
      coverImage: null,
    };
  } catch (error) {
    console.error("AI polishing failed:", error);
    return fallbackProcessing(originalTitle, originalContent, category);
  }
}

// 回退处理 - 基本的内容格式化
function fallbackProcessing(
  title: string,
  content: string,
  category: string
): { title: string; summary: string; content: string; keywords: string[]; coverImage: string | null } {
  const cleanTitle = title.length > 35 ? title.substring(0, 35) + "..." : title;
  const summary = content.substring(0, 150).replace(/\n/g, ' ') + "...";
  
  // 分段处理
  const paragraphs = content.split(/\n{2,}/).filter(p => p.trim().length > 30);
  const htmlContent = paragraphs.slice(0, 8).map(p => `<p>${p.trim()}</p>`).join('\n');
  
  // 提取关键词
  const keywords: string[] = [];
  const keywordList = ["无人机", "系留", "消防", "物流", "巡检", "机场", "云台", "培训", "电力", "应急"];
  for (const kw of keywordList) {
    if ((title + content).includes(kw) && keywords.length < 5) {
      keywords.push(kw);
    }
  }
  if (keywords.length === 0) keywords.push(category);
  
  return {
    title: cleanTitle,
    summary,
    content: htmlContent || `<p>${content.substring(0, 800)}</p>`,
    keywords,
    coverImage: null,
  };
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

  console.log(`Searching: ${query}`);

  const response = await fetch("https://api.firecrawl.dev/v1/search", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: query + " 新闻 2024 2025 2026",
      limit,
      lang: "zh",
      country: "CN",
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

// 抓取单个网页完整内容
async function scrapeFullContent(url: string): Promise<{ title: string; content: string } | null> {
  const apiKey = Deno.env.get("FIRECRAWL_API_KEY");
  if (!apiKey) {
    throw new Error("Firecrawl API key not configured");
  }

  try {
    console.log(`Scraping full content: ${url}`);
    
    const response = await fetch("https://api.firecrawl.dev/v1/scrape", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url,
        formats: ["markdown"],
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

    return {
      title: scraped.metadata?.title || "",
      content: cleanedContent,
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

              // AI 润色和编排
              const polished = await polishAndFormatArticle(
                scraped.title || result.title || "",
                scraped.content,
                result.url,
                category || "产品资讯"
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

              // 保存到数据库
              const { error: insertError } = await supabase
                .from("news_articles")
                .insert({
                  title: polished.title,
                  summary: polished.summary,
                  content: polished.content,
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
      // 按分类采集新闻
      const categoryKeywords: Record<string, string[]> = {
        "公司新闻": [
          "无人机公司 合作签约",
          "无人机企业 战略发展",
          "无人机厂商 新产品发布",
          "工业无人机 企业动态",
        ],
        "行业动态": [
          "低空经济 政策",
          "无人机 行业发展",
          "eVTOL 产业动态",
          "无人机 市场分析",
          "系留无人机 应用",
          "消防无人机 市场",
        ],
        "产品资讯": [
          "系留无人机 新品",
          "消防无人机 设备",
          "物流无人机 产品",
          "无人机机场 发布",
          "无人机云台 相机",
        ],
        "技术分享": [
          "无人机 技术突破",
          "无人机 飞控算法",
          "无人机 AI识别",
          "系留无人机 技术",
          "无人机 自主飞行",
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

            // AI 润色
            const polished = await polishAndFormatArticle(
              scraped.title || result.title || "",
              scraped.content,
              result.url,
              category
            );

            if (!polished) {
              results.push({
                title: scraped.title || "Unknown",
                success: false,
                error: "AI polishing failed",
              });
              continue;
            }

            // 保存
            const { error: insertError } = await supabase
              .from("news_articles")
              .insert({
                title: polished.title,
                summary: polished.summary,
                content: polished.content,
                source_url: result.url,
                source_name: "Firecrawl",
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
