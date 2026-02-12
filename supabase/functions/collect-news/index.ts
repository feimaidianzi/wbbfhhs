import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Google News RSS URL 生成器
function getGoogleNewsRssUrl(keyword: string, language: string = 'zh-CN'): string {
  const encodedKeyword = encodeURIComponent(keyword);
  const country = language === 'zh-CN' ? 'CN' : 'US';
  const hl = language === 'zh-CN' ? 'zh-CN' : 'en';
  return `https://news.google.com/rss/search?q=${encodedKeyword}&hl=${hl}&gl=${country}&ceid=${country}:${hl.split('-')[0]}`;
}

// 简易 RSS 解析器
function parseRss(xmlText: string): Array<{title: string, link: string, pubDate: string, description: string}> {
  const items: Array<{title: string, link: string, pubDate: string, description: string}> = [];
  
  // 匹配所有 <item> 标签
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let match;
  
  while ((match = itemRegex.exec(xmlText)) !== null) {
    const itemContent = match[1];
    
    // 提取标题
    const titleMatch = itemContent.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>|<title>(.*?)<\/title>/);
    const title = titleMatch ? (titleMatch[1] || titleMatch[2] || '').trim() : '';
    
    // 提取链接
    const linkMatch = itemContent.match(/<link>(.*?)<\/link>|<link><!\[CDATA\[(.*?)\]\]><\/link>/);
    const link = linkMatch ? (linkMatch[1] || linkMatch[2] || '').trim() : '';
    
    // 提取发布日期
    const pubDateMatch = itemContent.match(/<pubDate>(.*?)<\/pubDate>/);
    const pubDate = pubDateMatch ? pubDateMatch[1].trim() : '';
    
    // 提取描述
    const descMatch = itemContent.match(/<description><!\[CDATA\[(.*?)\]\]><\/description>|<description>(.*?)<\/description>/s);
    const description = descMatch ? (descMatch[1] || descMatch[2] || '').trim() : '';
    
    if (title && link) {
      items.push({ title, link, pubDate, description });
    }
  }
  
  return items;
}

// 清理 HTML 标签
function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').trim();
}

// 使用 Lovable AI 编辑新闻内容
async function editNewsWithAI(originalTitle: string, description: string, keyword: string, category: string): Promise<{title: string, summary: string, content: string}> {
  const prompt = `你是一个专业的无人机行业新闻编辑。请根据以下原始新闻信息，重新编写一篇适合发布在无人机技术公司网站上的新闻文章。

原始标题：${originalTitle}
原始描述：${description}
关键词：${keyword}
分类：${category}

要求：
1. 重新编写标题，使其更专业、更吸引人
2. 编写一段50-100字的摘要
3. 编写300-500字的正文内容，要包含行业见解和技术分析
4. 保持客观专业的语气
5. 不要添加虚假信息，基于原始内容进行扩展

请以JSON格式返回：
{
  "title": "新标题",
  "summary": "摘要内容",
  "content": "正文内容（可以包含HTML格式如<p>、<h3>等）"
}`;

  try {
    const response = await fetch("https://tuxslfemwkdmnkldlmmy.supabase.co/functions/v1/lovable-ai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")}`,
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "user", content: prompt }
        ],
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      console.error("AI API error:", await response.text());
      throw new Error("AI API request failed");
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "";
    
    // 尝试解析 JSON
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      return {
        title: parsed.title || originalTitle,
        summary: parsed.summary || stripHtml(description).substring(0, 100),
        content: parsed.content || `<p>${stripHtml(description)}</p>`,
      };
    }
    
    throw new Error("Failed to parse AI response");
  } catch (error) {
    console.error("AI editing failed:", error);
    // 回退到基本处理
    return {
      title: originalTitle,
      summary: stripHtml(description).substring(0, 100) + "...",
      content: `<p>${stripHtml(description)}</p>`,
    };
  }
}

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;

    // Auth check - require admin role
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }
    const authClient = createClient(supabaseUrl, supabaseAnonKey, { global: { headers: { Authorization: authHeader } } });
    const token = authHeader.replace("Bearer ", "");
    const { data: claimsData, error: claimsError } = await authClient.auth.getClaims(token);
    if (claimsError || !claimsData?.claims) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }
    const userId = claimsData.claims.sub;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const { data: isAdmin } = await supabase.rpc("has_role", { _user_id: userId, _role: "admin" });
    if (!isAdmin) {
      return new Response(JSON.stringify({ error: "Forbidden" }), { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const { action, keyword, category, limit = 3, autoPublish = false } = await req.json();

    if (action === "collect") {
      // 单个关键词采集
      console.log(`Collecting news for keyword: ${keyword}, category: ${category}`);
      
      // 创建采集任务记录
      const { data: task, error: taskError } = await supabase
        .from("news_collection_tasks")
        .insert({
          keyword,
          category,
          status: "processing",
        })
        .select()
        .single();

      if (taskError) throw taskError;

      // 获取 RSS Feed
      const rssUrl = getGoogleNewsRssUrl(keyword);
      console.log(`Fetching RSS from: ${rssUrl}`);
      
      const rssResponse = await fetch(rssUrl);
      if (!rssResponse.ok) {
        throw new Error(`Failed to fetch RSS: ${rssResponse.status}`);
      }
      
      const xmlText = await rssResponse.text();
      const items = parseRss(xmlText);
      
      console.log(`Found ${items.length} news items`);

      let articlesCollected = 0;
      let articlesPublished = 0;

      // 处理前 N 条新闻
      for (const item of items.slice(0, limit)) {
        try {
          // 检查是否已存在相同来源的文章
          const { data: existing } = await supabase
            .from("news_articles")
            .select("id")
            .eq("source_url", item.link)
            .single();

          if (existing) {
            console.log(`Article already exists: ${item.title}`);
            continue;
          }

          // 使用 AI 编辑内容
          const editedContent = await editNewsWithAI(
            item.title,
            item.description,
            keyword,
            category
          );

          // 保存到数据库
          const { error: insertError } = await supabase
            .from("news_articles")
            .insert({
              title: editedContent.title,
              summary: editedContent.summary,
              content: editedContent.content,
              source_url: item.link,
              source_name: "Google News",
              original_title: item.title,
              is_auto_generated: true,
              ai_edited: true,
              keywords: [keyword],
              category,
              is_published: autoPublish,
              published_at: autoPublish ? new Date().toISOString() : null,
            });

          if (insertError) {
            console.error("Insert error:", insertError);
            continue;
          }

          articlesCollected++;
          if (autoPublish) articlesPublished++;
          
          console.log(`Saved article: ${editedContent.title}`);
        } catch (itemError) {
          console.error(`Error processing item:`, itemError);
        }
      }

      // 更新任务状态
      await supabase
        .from("news_collection_tasks")
        .update({
          status: "completed",
          articles_collected: articlesCollected,
          articles_published: articlesPublished,
          completed_at: new Date().toISOString(),
        })
        .eq("id", task.id);

      return new Response(
        JSON.stringify({
          success: true,
          taskId: task.id,
          articlesCollected,
          articlesPublished,
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (action === "collect-all") {
      // 批量采集所有活跃关键词
      const { data: keywords, error: keywordsError } = await supabase
        .from("news_keywords")
        .select("*")
        .eq("is_active", true)
        .order("priority", { ascending: false });

      if (keywordsError) throw keywordsError;

      let totalCollected = 0;
      let totalPublished = 0;

      for (const kw of keywords || []) {
        try {
          // 创建采集任务
          const { data: task } = await supabase
            .from("news_collection_tasks")
            .insert({
              keyword: kw.keyword,
              category: kw.category,
              status: "processing",
            })
            .select()
            .single();

          // 获取 RSS
          const rssUrl = getGoogleNewsRssUrl(kw.keyword);
          const rssResponse = await fetch(rssUrl);
          
          if (!rssResponse.ok) {
            console.error(`Failed to fetch RSS for ${kw.keyword}`);
            continue;
          }
          
          const xmlText = await rssResponse.text();
          const items = parseRss(xmlText);

          let articlesCollected = 0;

          // 每个关键词取1条，总共凑够10条
          const itemsToProcess = items.slice(0, Math.ceil(limit / (keywords?.length || 1)));
          
          for (const item of itemsToProcess) {
            try {
              const { data: existing } = await supabase
                .from("news_articles")
                .select("id")
                .eq("source_url", item.link)
                .single();

              if (existing) continue;

              const editedContent = await editNewsWithAI(
                item.title,
                item.description,
                kw.keyword,
                kw.category
              );

              const { error: insertError } = await supabase
                .from("news_articles")
                .insert({
                  title: editedContent.title,
                  summary: editedContent.summary,
                  content: editedContent.content,
                  source_url: item.link,
                  source_name: "Google News",
                  original_title: item.title,
                  is_auto_generated: true,
                  ai_edited: true,
                  keywords: [kw.keyword],
                  category: kw.category,
                  is_published: autoPublish,
                  published_at: autoPublish ? new Date().toISOString() : null,
                });

              if (!insertError) {
                articlesCollected++;
                totalCollected++;
                if (autoPublish) totalPublished++;
              }
            } catch (e) {
              console.error("Error processing item:", e);
            }
          }

          // 更新任务状态
          if (task) {
            await supabase
              .from("news_collection_tasks")
              .update({
                status: "completed",
                articles_collected: articlesCollected,
                articles_published: autoPublish ? articlesCollected : 0,
                completed_at: new Date().toISOString(),
              })
              .eq("id", task.id);
          }
        } catch (kwError) {
          console.error(`Error processing keyword ${kw.keyword}:`, kwError);
        }
      }

      return new Response(
        JSON.stringify({
          success: true,
          totalCollected,
          totalPublished,
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ error: "Invalid action" }),
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
