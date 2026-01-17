import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const DOUBAO_API_KEY = Deno.env.get("DOUBAO_API_KEY");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

interface ModifyRequest {
  articleId: string;
  modificationRequest: string;
  modifyImages?: boolean;
}

async function callDoubaoAPI(prompt: string, systemPrompt: string): Promise<string | null> {
  if (!DOUBAO_API_KEY) {
    console.error("DOUBAO_API_KEY not configured");
    return null;
  }

  try {
    const response = await fetch("https://ark.cn-beijing.volces.com/api/v3/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${DOUBAO_API_KEY}`,
      },
      body: JSON.stringify({
        model: "doubao-pro-32k-241215",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: prompt },
        ],
        temperature: 0.7,
        max_tokens: 4096,
      }),
      signal: AbortSignal.timeout(60000),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Doubao API error: ${response.status} - ${errorText}`);
      return null;
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content || null;
  } catch (error) {
    console.error("Doubao API call failed:", error);
    return null;
  }
}

async function searchImages(query: string, count: number = 3): Promise<string[]> {
  const FIRECRAWL_API_KEY = Deno.env.get("FIRECRAWL_API_KEY");
  if (!FIRECRAWL_API_KEY) {
    console.log("FIRECRAWL_API_KEY not configured, skipping image search");
    return [];
  }

  try {
    const response = await fetch("https://api.firecrawl.dev/v1/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${FIRECRAWL_API_KEY}`,
      },
      body: JSON.stringify({
        query: `${query} 高清图片`,
        limit: count * 2,
      }),
      signal: AbortSignal.timeout(30000),
    });

    if (!response.ok) {
      console.error(`Image search failed: ${response.status}`);
      return [];
    }

    const data = await response.json();
    const images: string[] = [];
    
    for (const result of data.data || []) {
      if (result.metadata?.ogImage) {
        images.push(result.metadata.ogImage);
      }
      if (images.length >= count) break;
    }

    return images;
  } catch (error) {
    console.error("Image search error:", error);
    return [];
  }
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);

    // Verify auth
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: "Missing authorization header" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const token = authHeader.replace("Bearer ", "");
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user) {
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Check admin role
    const { data: isAdmin } = await supabase.rpc("has_role", {
      _user_id: user.id,
      _role: "admin",
    });

    if (!isAdmin) {
      return new Response(
        JSON.stringify({ error: "Admin access required" }),
        { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { articleId, modificationRequest, modifyImages = false }: ModifyRequest = await req.json();

    if (!articleId || !modificationRequest) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: articleId, modificationRequest" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`Processing modification for article: ${articleId}`);
    console.log(`Modification request: ${modificationRequest}`);

    // Fetch the article
    const { data: article, error: fetchError } = await supabase
      .from("news_articles")
      .select("*")
      .eq("id", articleId)
      .single();

    if (fetchError || !article) {
      return new Response(
        JSON.stringify({ error: "Article not found" }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Prepare the modification prompt
    const systemPrompt = `你是一个专业的新闻编辑，负责根据用户的修改要求对文章进行修改。

要求：
1. 严格按照用户的修改意见进行修改
2. 保持文章的专业性和可读性
3. 确保修改后的内容逻辑通顺
4. 保持原文的核心信息不变（除非用户要求修改）
5. 不要添加任何与无人机行业无关的内容
6. 保持文章的HTML格式，图片使用<img>标签
7. 文章内容必须纯净，不包含任何广告、推广链接或无关内容

返回格式（JSON）：
{
  "title": "修改后的标题",
  "summary": "修改后的摘要（100字以内）",
  "content": "修改后的完整HTML内容",
  "changes_made": "所做修改的简要说明"
}`;

    const modifyPrompt = `请根据以下修改要求，修改这篇文章：

【修改要求】
${modificationRequest}

【原文标题】
${article.title}

【原文摘要】
${article.summary || "无"}

【原文内容】
${article.content}

请输出修改后的JSON格式结果。`;

    const modifiedContent = await callDoubaoAPI(modifyPrompt, systemPrompt);

    if (!modifiedContent) {
      return new Response(
        JSON.stringify({ error: "AI modification failed" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Parse the AI response
    let modifiedData;
    try {
      // Extract JSON from response
      const jsonMatch = modifiedContent.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        modifiedData = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("No JSON found in response");
      }
    } catch (parseError) {
      console.error("Failed to parse AI response:", parseError);
      console.log("Raw response:", modifiedContent);
      return new Response(
        JSON.stringify({ error: "Failed to parse AI response" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Handle image modification if requested
    let newImages: string[] = [];
    if (modifyImages) {
      console.log("Searching for new images...");
      newImages = await searchImages(modifiedData.title || article.title, 3);
      
      if (newImages.length > 0) {
        // Insert new images into content
        let contentWithImages = modifiedData.content;
        const paragraphs = contentWithImages.split("</p>");
        
        if (paragraphs.length > 2 && newImages.length >= 2) {
          // Insert images after first and middle paragraphs
          const insertPoints = [
            Math.floor(paragraphs.length * 0.3),
            Math.floor(paragraphs.length * 0.6),
          ];
          
          let insertedCount = 0;
          paragraphs.forEach((p: string, index: number) => {
            if (insertPoints.includes(index) && insertedCount < newImages.length) {
              paragraphs[index] = `${p}</p><figure><img src="${newImages[insertedCount]}" alt="${modifiedData.title}" style="width: 100%; max-width: 800px; margin: 20px auto; display: block;" /><figcaption style="text-align: center; color: #666; margin-top: 8px;">图片来源：网络</figcaption></figure>`;
              insertedCount++;
            } else if (p.trim()) {
              paragraphs[index] = `${p}</p>`;
            }
          });
          
          contentWithImages = paragraphs.join("");
        }
        
        modifiedData.content = contentWithImages;
        
        // Update cover image if we found new ones
        if (newImages[0]) {
          modifiedData.cover_image = newImages[0];
        }
      }
    }

    // Update the article in database
    const updateData: Record<string, any> = {
      title: modifiedData.title || article.title,
      summary: modifiedData.summary || article.summary,
      content: modifiedData.content || article.content,
      ai_edited: true,
      ai_modification_request: modificationRequest,
      review_status: "pending", // Reset to pending after modification
      updated_at: new Date().toISOString(),
    };

    if (modifyImages && newImages[0]) {
      updateData.cover_image = newImages[0];
    }

    const { error: updateError } = await supabase
      .from("news_articles")
      .update(updateData)
      .eq("id", articleId);

    if (updateError) {
      console.error("Failed to update article:", updateError);
      return new Response(
        JSON.stringify({ error: "Failed to save modified article" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`Article ${articleId} modified successfully`);

    return new Response(
      JSON.stringify({
        success: true,
        message: "文章修改成功",
        changes: modifiedData.changes_made,
        newImages: newImages.length,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error: unknown) {
    console.error("Error in ai-modify-article:", error);
    const errorMessage = error instanceof Error ? error.message : "Internal server error";
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
