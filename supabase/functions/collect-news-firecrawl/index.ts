import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// 无人机行业相关的搜索关键词和目标网站
const DRONE_INDUSTRY_SOURCES = [
  // 无人机行业门户
  { name: "无人机网", domain: "81uav.cn", keywords: ["无人机", "行业应用", "电力巡检"] },
  { name: "宇辰网", domain: "yuchen360.com", keywords: ["无人机", "航空", "产业"] },
  { name: "环球无人机", domain: "huanqiuuav.com", keywords: ["无人机", "技术", "应用"] },
  // 电力行业
  { name: "北极星电力网", domain: "bjx.com.cn", keywords: ["电力巡检", "无人机", "智能电网"] },
  { name: "中国电力网", domain: "chinapower.com.cn", keywords: ["电力巡检", "无人机应用"] },
  // 科技资讯
  { name: "36氪", domain: "36kr.com", keywords: ["无人机", "低空经济", "eVTOL"] },
  { name: "虎嗅", domain: "huxiu.com", keywords: ["无人机", "物流", "科技"] },
  // 物流行业
  { name: "亿欧网", domain: "iyiou.com", keywords: ["无人机物流", "智慧物流", "配送"] },
  // 应急救援
  { name: "应急管理报", domain: "yjglb.cn", keywords: ["应急救援", "无人机", "消防"] },
];

// 分类映射
const CATEGORY_MAPPING: Record<string, string[]> = {
  "行业动态": ["无人机", "行业", "市场", "政策", "标准", "法规"],
  "技术前沿": ["技术", "研发", "创新", "专利", "突破", "算法", "AI"],
  "产品资讯": ["产品", "发布", "新品", "型号", "设备", "载荷"],
  "应用案例": ["案例", "应用", "项目", "方案", "服务", "作业"],
  "市场分析": ["市场", "分析", "报告", "数据", "趋势", "预测"],
  "政策法规": ["政策", "法规", "规定", "标准", "管理", "审批"],
};

// 使用 Lovable AI 进行内容二次创作
async function rewriteContentWithAI(
  originalTitle: string,
  originalContent: string,
  sourceUrl: string,
  category: string
): Promise<{ title: string; summary: string; content: string; keywords: string[] }> {
  const prompt = `你是一位专业的无人机行业资深编辑。请根据以下原始内容进行二次创作，生成一篇适合发布在无人机技术公司网站新闻中心的文章。

原始标题：${originalTitle}
原始内容：${originalContent.substring(0, 3000)}
来源URL：${sourceUrl}
目标分类：${category}

要求：
1. 重新编写标题，使其更专业、更有吸引力，不超过40字
2. 编写100-150字的摘要，概括文章核心内容
3. 编写800-1200字的正文，要求：
   - 保持原文核心信息的准确性
   - 用专业的行业视角进行分析和解读
   - 添加行业背景知识和技术解释
   - 分析对无人机行业的影响和意义
   - 使用HTML格式（<p>、<h3>、<ul>、<li>等）
   - 不要出现原始来源的名称
4. 提取3-5个关键词

请以JSON格式返回：
{
  "title": "新标题",
  "summary": "摘要内容",
  "content": "正文内容（HTML格式）",
  "keywords": ["关键词1", "关键词2", "关键词3"]
}`;

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const response = await fetch(`${supabaseUrl}/functions/v1/lovable-ai`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")}`,
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 3000,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI API error:", errorText);
      throw new Error("AI API request failed");
    }

    const data = await response.json();
    const aiContent = data.choices?.[0]?.message?.content || "";

    // 解析 JSON 响应
    const jsonMatch = aiContent.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      return {
        title: parsed.title || originalTitle,
        summary: parsed.summary || originalContent.substring(0, 150),
        content: parsed.content || `<p>${originalContent}</p>`,
        keywords: parsed.keywords || [],
      };
    }

    throw new Error("Failed to parse AI response");
  } catch (error) {
    console.error("AI rewrite failed:", error);
    // 回退到基本处理
    return {
      title: originalTitle,
      summary: originalContent.substring(0, 150) + "...",
      content: `<p>${originalContent}</p>`,
      keywords: [],
    };
  }
}

// 根据内容确定分类
function determineCategory(title: string, content: string): string {
  const text = (title + " " + content).toLowerCase();
  
  for (const [category, keywords] of Object.entries(CATEGORY_MAPPING)) {
    for (const keyword of keywords) {
      if (text.includes(keyword.toLowerCase())) {
        return category;
      }
    }
  }
  
  return "行业动态"; // 默认分类
}

// 使用 Firecrawl 搜索新闻
async function searchNews(
  query: string,
  limit: number = 10
): Promise<Array<{ url: string; title: string; description: string; markdown?: string }>> {
  const apiKey = Deno.env.get("FIRECRAWL_API_KEY");
  if (!apiKey) {
    throw new Error("Firecrawl API key not configured");
  }

  console.log(`Searching for: ${query}`);

  const response = await fetch("https://api.firecrawl.dev/v1/search", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      limit,
      lang: "zh",
      country: "CN",
      tbs: "qdr:d", // 过去24小时的新闻
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

// 抓取单个网页内容
async function scrapeUrl(url: string): Promise<{ title: string; content: string } | null> {
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
        formats: ["markdown"],
        onlyMainContent: true,
      }),
    });

    if (!response.ok) {
      console.error(`Scrape failed for ${url}`);
      return null;
    }

    const data = await response.json();
    const scraped = data.data || data;
    
    return {
      title: scraped.metadata?.title || "",
      content: scraped.markdown || "",
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

    const { action, targetCount = 10, autoPublish = false, searchQuery } = await req.json();

    if (action === "collect-daily") {
      // 每日采集任务：采集10篇文章
      console.log(`Starting daily collection, target: ${targetCount} articles`);

      // 构建搜索查询列表
      const searchQueries = [
        "无人机 行业新闻 2024",
        "电力巡检 无人机 最新",
        "无人机物流 配送",
        "工业无人机 应用",
        "低空经济 政策",
        "无人机 技术创新",
        "消防无人机 救援",
        "农业无人机 植保",
        "测绘无人机 航测",
        "无人机 安防监控",
      ];

      let collectedCount = 0;
      const collectedUrls: string[] = [];
      const errors: string[] = [];

      // 遍历搜索查询
      for (const query of searchQueries) {
        if (collectedCount >= targetCount) break;

        try {
          // 创建采集任务记录
          const { data: task } = await supabase
            .from("news_collection_tasks")
            .insert({
              keyword: query,
              category: "Firecrawl",
              status: "processing",
            })
            .select()
            .single();

          // 搜索相关新闻
          const searchResults = await searchNews(query, 5);
          let taskCollected = 0;

          for (const result of searchResults) {
            if (collectedCount >= targetCount) break;
            if (!result.url || collectedUrls.includes(result.url)) continue;

            try {
              // 检查是否已存在
              const { data: existing } = await supabase
                .from("news_articles")
                .select("id")
                .eq("source_url", result.url)
                .single();

              if (existing) {
                console.log(`Article already exists: ${result.url}`);
                continue;
              }

              // 获取完整内容
              let fullContent = result.markdown || result.description || "";
              let title = result.title || "";

              // 如果 markdown 内容不足，尝试抓取完整页面
              if (fullContent.length < 200) {
                const scraped = await scrapeUrl(result.url);
                if (scraped) {
                  fullContent = scraped.content || fullContent;
                  title = scraped.title || title;
                }
              }

              if (!title || fullContent.length < 100) {
                console.log(`Skipping insufficient content: ${result.url}`);
                continue;
              }

              // 确定分类
              const category = determineCategory(title, fullContent);

              // AI 二次创作
              const rewritten = await rewriteContentWithAI(
                title,
                fullContent,
                result.url,
                category
              );

              // 保存到数据库
              const { error: insertError } = await supabase
                .from("news_articles")
                .insert({
                  title: rewritten.title,
                  summary: rewritten.summary,
                  content: rewritten.content,
                  source_url: result.url,
                  source_name: "Firecrawl",
                  original_title: title,
                  is_auto_generated: true,
                  ai_edited: true,
                  keywords: rewritten.keywords,
                  category,
                  is_published: autoPublish,
                  published_at: autoPublish ? new Date().toISOString() : null,
                });

              if (insertError) {
                console.error("Insert error:", insertError);
                continue;
              }

              collectedUrls.push(result.url);
              collectedCount++;
              taskCollected++;

              console.log(`Collected article ${collectedCount}/${targetCount}: ${rewritten.title}`);

              // 添加延迟以避免 API 限制
              await new Promise(resolve => setTimeout(resolve, 1000));
            } catch (itemError) {
              console.error(`Error processing ${result.url}:`, itemError);
              errors.push(`${result.url}: ${itemError instanceof Error ? itemError.message : 'Unknown error'}`);
            }
          }

          // 更新任务状态
          if (task) {
            await supabase
              .from("news_collection_tasks")
              .update({
                status: "completed",
                articles_collected: taskCollected,
                articles_published: autoPublish ? taskCollected : 0,
                completed_at: new Date().toISOString(),
              })
              .eq("id", task.id);
          }
        } catch (queryError) {
          console.error(`Error with query "${query}":`, queryError);
          errors.push(`Query "${query}": ${queryError instanceof Error ? queryError.message : 'Unknown error'}`);
        }
      }

      return new Response(
        JSON.stringify({
          success: true,
          articlesCollected: collectedCount,
          articlesPublished: autoPublish ? collectedCount : 0,
          errors: errors.length > 0 ? errors : undefined,
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (action === "search-custom") {
      // 自定义搜索
      if (!searchQuery) {
        return new Response(
          JSON.stringify({ success: false, error: "Search query required" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      const results = await searchNews(searchQuery, 20);

      return new Response(
        JSON.stringify({
          success: true,
          results: results.map(r => ({
            url: r.url,
            title: r.title,
            description: r.description,
          })),
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (action === "scrape-single") {
      // 抓取单个 URL
      const { url } = await req.json();
      if (!url) {
        return new Response(
          JSON.stringify({ success: false, error: "URL required" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      const scraped = await scrapeUrl(url);
      if (!scraped) {
        return new Response(
          JSON.stringify({ success: false, error: "Failed to scrape URL" }),
          { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      return new Response(
        JSON.stringify({
          success: true,
          data: scraped,
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ error: "Invalid action. Use: collect-daily, search-custom, scrape-single" }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
