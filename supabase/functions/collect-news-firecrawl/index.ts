import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// 分类配置 - 与新闻中心四板块对应
const CATEGORY_CONFIG = {
  "公司新闻": {
    keywords: ["drone company acquisition", "UAV manufacturer partnership", "drone startup funding", "commercial drone business"],
    style: "正式、专业、强调企业实力和国际影响力",
    description: "企业动态、合作、融资等公司相关新闻",
  },
  "行业动态": {
    keywords: ["drone regulation policy 2025", "UAV industry market analysis", "eVTOL development", "drone airspace management", "commercial drone trends"],
    style: "客观、全面、有深度分析，关注国际政策和市场趋势",
    description: "政策法规、市场分析、行业趋势等宏观信息",
  },
  "产品资讯": {
    keywords: ["tethered drone system", "firefighting drone", "cargo drone delivery", "drone gimbal camera", "drone in a box", "inspection drone"],
    style: "详细、技术性、突出产品特点和创新之处，介绍产品功能和应用场景",
    description: "新品发布、产品功能、应用场景等产品相关内容",
  },
  "技术分享": {
    keywords: ["what is FPV video transmitter", "how flight controller works", "drone gimbal explained", "ELRS protocol guide", "ESC technology explained"],
    style: "专业科普、深入浅出、解释技术原理和工作方式，适合技术爱好者阅读",
    description: "技术原理、教程、知识科普等技术内容",
  },
};

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

// 使用 Lovable AI 进行文章质量评分
async function scoreArticleQuality(
  title: string,
  content: string,
  category: string
): Promise<{ score: number; reason: string } | null> {
  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      console.log("LOVABLE_API_KEY not found, skipping quality scoring");
      return { score: 10, reason: "未配置评分，默认通过" };
    }

    console.log("Scoring article quality with Gemini...");
    
    const prompt = `你是一位资深新闻质量审核编辑。请对以下无人机行业新闻文章进行质量评分。

【评分维度】（各占2分，总分10分）：
1. 内容相关性：文章是否与无人机行业相关，是否符合"${category}"分类
2. 信息价值：内容是否有新闻价值，是否提供有用信息
3. 内容质量：文章结构是否清晰，语言是否专业
4. 原创深度：是否有独特见解或深度分析，而非简单转载
5. 可读性：文章是否易于理解，排版是否合理

【文章标题】${title}

【文章内容】${content.substring(0, 3000)}

【评分要求】
- 满分10分，每个维度2分
- 低质量广告软文、内容空洞、与主题无关的文章应给低分
- 专业、有深度、信息量大的文章给高分

请直接返回JSON格式：
{
  "score": 8.5,
  "reason": "简要评分理由（50字以内）"
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
          { role: "system", content: "你是专业的新闻质量评审专家，请严格按照评分标准评分。" },
          { role: "user", content: prompt }
        ],
        temperature: 0.3,
        max_tokens: 200,
      }),
    });

    if (!response.ok) {
      console.error("Quality scoring API error:", response.status);
      return { score: 8, reason: "评分API错误，默认通过" };
    }

    const data = await response.json();
    const aiContent = data.choices?.[0]?.message?.content || "";
    
    const jsonMatch = aiContent.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const result = JSON.parse(jsonMatch[0]);
      console.log(`Quality score: ${result.score} - ${result.reason}`);
      return {
        score: parseFloat(result.score) || 8,
        reason: result.reason || "评分完成"
      };
    }

    return { score: 8, reason: "解析失败，默认通过" };
  } catch (error) {
    console.error("Quality scoring failed:", error);
    return { score: 8, reason: "评分异常，默认通过" };
  }
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
        isEnglish: true,
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

// 回退处理
function fallbackProcessing(
  title: string,
  content: string,
  category: string,
  coverImage: string | null = null
): { title: string; summary: string; content: string; keywords: string[]; coverImage: string | null } {
  const cleanTitle = title.length > 35 ? title.substring(0, 35) + "..." : title;
  const summary = content.substring(0, 150).replace(/\n/g, ' ') + "...";
  
  const paragraphs = content.split(/\n{2,}/).filter(p => p.trim().length > 30);
  const htmlContent = paragraphs.slice(0, 8).map(p => `<p>${p.trim()}</p>`).join('\n');
  
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
      query: query + " news 2024 2025",
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
      coverImage = scraped.metadata.ogImage;
    }
    
    if (!coverImage && scraped.html) {
      const imgMatches = scraped.html.match(/<img[^>]+src=["']([^"']+)["'][^>]*>/gi);
      if (imgMatches) {
        for (const match of imgMatches) {
          const srcMatch = match.match(/src=["']([^"']+)["']/i);
          if (srcMatch && srcMatch[1]) {
            const imgUrl = srcMatch[1];
            if (imgUrl.includes('logo') || imgUrl.includes('icon') || imgUrl.includes('avatar') ||
                imgUrl.includes('ads') || imgUrl.includes('banner') || imgUrl.includes('pixel') ||
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
    
    if (!coverImage && rawContent) {
      const mdImgMatch = rawContent.match(/!\[.*?\]\((https?:\/\/[^)]+)\)/);
      if (mdImgMatch && mdImgMatch[1]) {
        const imgUrl = mdImgMatch[1];
        if (!imgUrl.includes('logo') && !imgUrl.includes('icon') && !imgUrl.includes('avatar')) {
          coverImage = imgUrl;
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

// 质量评分阈值
const QUALITY_THRESHOLD = 8.0;

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

    // 按分类采集（使用数据库配置的关键词）
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

          // AI 质量评分
          const qualityResult = await scoreArticleQuality(
            scraped.title || result.title || "",
            scraped.content,
            targetCategory
          );

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

          // AI 润色
          const polished = await polishAndFormatArticle(
            scraped.title || result.title || "",
            scraped.content,
            result.url,
            targetCategory,
            scraped.coverImage
          );

          if (!polished) continue;

          // 保存到数据库
          const { error: insertError } = await supabase
            .from("news_articles")
            .insert({
              title: polished.title,
              summary: polished.summary,
              content: polished.content,
              cover_image: polished.coverImage,
              source_url: result.url,
              source_name: keyword,
              original_title: scraped.title,
              is_auto_generated: true,
              ai_edited: true,
              keywords: polished.keywords,
              category: targetCategory,
              quality_score: qualityResult?.score || null,
              quality_reason: qualityResult?.reason || null,
              is_published: autoPublish,
              published_at: autoPublish ? new Date().toISOString() : null,
            });

          if (!insertError) {
            collected++;
            results.push({
              title: polished.title,
              success: true,
              score: qualityResult?.score,
            });
            console.log(`✅ Collected (score: ${qualityResult?.score}): ${polished.title}`);
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

            // AI 润色
            const polished = await polishAndFormatArticle(
              scraped.title || result.title || "",
              scraped.content,
              result.url,
              category,
              scraped.coverImage
            );

            if (!polished) continue;

            // 保存
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
                quality_score: qualityResult?.score || null,
                quality_reason: qualityResult?.reason || null,
                is_published: autoPublish,
                published_at: autoPublish ? new Date().toISOString() : null,
              });

            if (!insertError) {
              collected++;
              results.push({
                title: polished.title,
                success: true,
                score: qualityResult?.score,
              });
              console.log(`✅ [${category}] Collected (score: ${qualityResult?.score}): ${polished.title}`);
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

              if (qualityResult && qualityResult.score < QUALITY_THRESHOLD) {
                console.log(`❌ Filtered (score: ${qualityResult.score}): ${result.title}`);
                filtered++;
                totalFiltered++;
                continue;
              }

              // AI 润色
              const polished = await polishAndFormatArticle(
                scraped.title || result.title || "",
                scraped.content,
                result.url,
                cat,
                scraped.coverImage
              );

              if (!polished) continue;

              // 保存
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
                  category: cat,
                  quality_score: qualityResult?.score || null,
                  quality_reason: qualityResult?.reason || null,
                  is_published: body.autoPublish ?? true,
                  published_at: (body.autoPublish ?? true) ? new Date().toISOString() : null,
                });

              if (!insertError) {
                collected++;
                totalCollected++;
                results.push({ title: polished.title, success: true, score: qualityResult?.score });
                console.log(`✅ [${cat}] Collected (score: ${qualityResult?.score}): ${polished.title}`);
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
        error: "Invalid action. Use: collect-by-keyword, collect-by-category, or collect-daily" 
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
