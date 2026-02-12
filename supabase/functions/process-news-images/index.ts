import { createClient, SupabaseClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// 图片评分阈值
const IMAGE_SCORE_THRESHOLD = 6;

// 最小图片大小 (bytes) - 排除小图标
const MIN_IMAGE_SIZE = 10000; // 10KB

// 支持的图片格式
const SUPPORTED_FORMATS = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

// 不允许转存的域名黑名单（已知防盗链或问题域名）
const HOTLINK_PROTECTED_DOMAINS = [
  'csdnimg.cn',
  'csdn.net',
  'sinaimg.cn',
  'sina.com.cn',
  'gamersky.com',
  'bilibili.com',
  'hdslb.com',
  'zhimg.com',
  'zhihu.com',
  '36kr.com',
  'ithome.com',
  'ifeng.com',
  'sohu.com',
  'qq.com',
  'gtimg.cn',
  'qpic.cn',
  'mmbiz.qpic.cn',
  'weixin.qq.com',
  'wechat.com',
  'douyin.com',
  'douyinpic.com',
  'toutiao.com',
  'pstatp.com',
  'bytedance.com',
  'xiaohongshu.com',
  'xhscdn.com',
  'kuaishou.com',
  'kwai.com',
];

// 检查是否需要转存
function needsLocalStorage(imageUrl: string): boolean {
  try {
    const url = new URL(imageUrl);
    const hostname = url.hostname.toLowerCase();
    
    for (const domain of HOTLINK_PROTECTED_DOMAINS) {
      if (hostname.includes(domain)) {
        return true;
      }
    }
    return false;
  } catch {
    return false;
  }
}

// 下载图片并返回Buffer
async function downloadImage(imageUrl: string): Promise<{ buffer: ArrayBuffer; contentType: string } | null> {
  try {
    const response = await fetch(imageUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
        'Referer': new URL(imageUrl).origin,
      },
      signal: AbortSignal.timeout(15000),
    });

    if (!response.ok) {
      console.log(`Failed to download image: ${imageUrl} - Status: ${response.status}`);
      return null;
    }

    const contentType = response.headers.get('content-type') || 'image/jpeg';
    if (!SUPPORTED_FORMATS.some(f => contentType.includes(f.split('/')[1]))) {
      console.log(`Unsupported content type: ${contentType}`);
      return null;
    }

    const buffer = await response.arrayBuffer();
    
    if (buffer.byteLength < MIN_IMAGE_SIZE) {
      console.log(`Image too small: ${buffer.byteLength} bytes`);
      return null;
    }

    return { buffer, contentType };
  } catch (error) {
    console.error(`Error downloading image ${imageUrl}:`, error);
    return null;
  }
}

// 生成唯一文件名
function generateFileName(contentType: string): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  const ext = contentType.includes('png') ? 'png' : 
              contentType.includes('webp') ? 'webp' : 
              contentType.includes('gif') ? 'gif' : 'jpg';
  return `${timestamp}-${random}.${ext}`;
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
      console.log("LOVABLE_API_KEY not found, skipping AI image evaluation");
      return { score: 7, reason: "未配置AI评估，默认通过", isRelevant: true };
    }

    console.log(`Evaluating image relevance: ${imageUrl.substring(0, 80)}...`);

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
        messages: [
          {
            role: "user",
            content: [
              { type: "text", text: prompt },
              { type: "image_url", image_url: { url: imageUrl } }
            ]
          }
        ],
        modalities: ["text"]
      }),
      signal: AbortSignal.timeout(30000),
    });

    if (!response.ok) {
      console.error("AI image evaluation failed:", response.status);
      return { score: 6, reason: "AI评估失败，默认通过", isRelevant: true };
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "";
    
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const result = JSON.parse(jsonMatch[0]);
      console.log(`Image score: ${result.score} - ${result.reason}`);
      return {
        score: parseFloat(result.score) || 6,
        reason: result.reason || "评估完成",
        isRelevant: result.isRelevant !== false && (parseFloat(result.score) || 6) >= IMAGE_SCORE_THRESHOLD
      };
    }

    return { score: 6, reason: "解析失败，默认通过", isRelevant: true };
  } catch (error) {
    console.error("Image evaluation error:", error);
    return { score: 6, reason: "评估异常，默认通过", isRelevant: true };
  }
}

// 使用豆包AI去除图片中的公司信息（logo、水印、公司名称等）
async function removeCompanyBranding(
  imageBuffer: ArrayBuffer,
  contentType: string
): Promise<{ buffer: ArrayBuffer; contentType: string; wasEdited: boolean }> {
  try {
    const DOUBAO_API_KEY = Deno.env.get("DOUBAO_API_KEY");
    if (!DOUBAO_API_KEY) {
      console.log("DOUBAO_API_KEY not found, skipping company branding removal");
      return { buffer: imageBuffer, contentType, wasEdited: false };
    }

    // 将图片转换为base64
    const uint8Array = new Uint8Array(imageBuffer);
    let binary = '';
    for (let i = 0; i < uint8Array.length; i++) {
      binary += String.fromCharCode(uint8Array[i]);
    }
    const base64Image = btoa(binary);
    const mimeType = contentType.includes('png') ? 'image/png' : 
                     contentType.includes('webp') ? 'image/webp' : 
                     contentType.includes('gif') ? 'image/gif' : 'image/jpeg';

    console.log("Using Doubao AI to analyze image for company branding...");

    // 首先使用豆包视觉模型检测图片中是否有公司信息
    const detectPrompt = `请仔细分析这张图片，检查是否存在以下内容：
1. 公司logo或品牌标识
2. 公司名称或商标文字
3. 水印或版权标记
4. 联系方式（电话、网址、邮箱）
5. 二维码
6. 其他商业推广信息

请直接返回JSON格式：
{
  "hasCompanyBranding": true或false,
  "brandingItems": ["检测到的具体内容列表"],
  "brandingLocations": ["左上角logo", "右下角水印"等位置描述],
  "suggestion": "处理建议"
}`;

    const detectResponse = await fetch("https://ark.cn-beijing.volces.com/api/v3/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${DOUBAO_API_KEY}`,
      },
      body: JSON.stringify({
        model: "doubao-1.5-vision-pro-250328",
        messages: [
          {
            role: "user",
            content: [
              { type: "text", text: detectPrompt },
              { 
                type: "image_url", 
                image_url: { 
                  url: `data:${mimeType};base64,${base64Image}` 
                } 
              }
            ]
          }
        ],
        temperature: 0.3,
        max_tokens: 1024,
      }),
      signal: AbortSignal.timeout(30000),
    });

    if (!detectResponse.ok) {
      const errorText = await detectResponse.text();
      console.error("Doubao vision API error:", detectResponse.status, errorText);
      return { buffer: imageBuffer, contentType, wasEdited: false };
    }

    const detectData = await detectResponse.json();
    const detectContent = detectData.choices?.[0]?.message?.content || "";
    
    // 解析检测结果
    const jsonMatch = detectContent.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.log("Failed to parse detection result, keeping original image");
      return { buffer: imageBuffer, contentType, wasEdited: false };
    }

    let detectionResult;
    try {
      detectionResult = JSON.parse(jsonMatch[0]);
    } catch (e) {
      console.log("Invalid JSON in detection result, keeping original image");
      return { buffer: imageBuffer, contentType, wasEdited: false };
    }

    // 如果没有检测到公司品牌信息，直接返回原图
    if (!detectionResult.hasCompanyBranding) {
      console.log("No company branding detected in image");
      return { buffer: imageBuffer, contentType, wasEdited: false };
    }

    console.log("Detected company branding:", detectionResult.brandingItems?.join(", "));
    console.log("Locations:", detectionResult.brandingLocations?.join(", "));

    // 使用Lovable AI的图像编辑功能去除公司信息
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      console.log("LOVABLE_API_KEY not found, cannot edit image");
      return { buffer: imageBuffer, contentType, wasEdited: false };
    }

    const editPrompt = `请编辑这张图片，去除以下内容：
${detectionResult.brandingItems?.map((item: string) => `- ${item}`).join('\n') || '- 所有公司logo和品牌标识'}

位置信息：
${detectionResult.brandingLocations?.map((loc: string) => `- ${loc}`).join('\n') || '- 请检查图片各处'}

要求：
1. 完全去除上述商业标识
2. 用自然的背景或周围内容填充被去除的区域
3. 保持图片整体美观和自然
4. 不要添加任何新的文字或标识`;

    const editResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-image-preview",
        messages: [
          {
            role: "user",
            content: [
              { type: "text", text: editPrompt },
              { type: "image_url", image_url: { url: `data:${mimeType};base64,${base64Image}` } }
            ]
          }
        ],
        modalities: ["image", "text"]
      }),
      signal: AbortSignal.timeout(60000),
    });

    if (!editResponse.ok) {
      console.error("Image editing API failed:", editResponse.status);
      return { buffer: imageBuffer, contentType, wasEdited: false };
    }

    const editData = await editResponse.json();
    const images = editData.choices?.[0]?.message?.images;
    
    if (images && images.length > 0) {
      const editedImageUrl = images[0]?.image_url?.url;
      if (editedImageUrl && editedImageUrl.startsWith('data:')) {
        const base64Match = editedImageUrl.match(/^data:([^;]+);base64,(.+)$/);
        if (base64Match) {
          const newMimeType = base64Match[1];
          const base64Data = base64Match[2];
          
          const binaryString = atob(base64Data);
          const len = binaryString.length;
          const bytes = new Uint8Array(len);
          for (let i = 0; i < len; i++) {
            bytes[i] = binaryString.charCodeAt(i);
          }
          
          console.log("Successfully removed company branding from image using Doubao detection + Gemini editing");
          return { buffer: bytes.buffer, contentType: newMimeType, wasEdited: true };
        }
      }
    }

    console.log("No edited image returned from Gemini, keeping original");
    return { buffer: imageBuffer, contentType, wasEdited: false };
  } catch (error) {
    console.error("Company branding removal error:", error);
    return { buffer: imageBuffer, contentType, wasEdited: false };
  }
}

// 上传图片到Supabase存储
async function uploadToStorage(
  supabase: any,
  buffer: ArrayBuffer,
  contentType: string,
  articleId: string
): Promise<string | null> {
  try {
    const fileName = `${articleId}/${generateFileName(contentType)}`;
    
    const { data, error } = await supabase.storage
      .from('news-images')
      .upload(fileName, buffer, {
        contentType,
        cacheControl: '31536000', // 1年缓存
        upsert: false,
      });

    if (error) {
      console.error("Storage upload error:", error);
      return null;
    }

    // 获取公开URL
    const { data: urlData } = supabase.storage
      .from('news-images')
      .getPublicUrl(fileName);

    return urlData.publicUrl;
  } catch (error) {
    console.error("Upload error:", error);
    return null;
  }
}

// 处理单张图片
async function processImage(
  supabase: any,
  imageUrl: string,
  articleId: string,
  articleTitle: string,
  articleSummary: string,
  skipAIEvaluation: boolean = false
): Promise<{
  originalUrl: string;
  newUrl: string | null;
  score: number;
  reason: string;
  isRelevant: boolean;
  wasConverted: boolean;
}> {
  const result = {
    originalUrl: imageUrl,
    newUrl: null as string | null,
    score: 0,
    reason: "",
    isRelevant: false,
    wasConverted: false,
  };

  // 1. AI评估图片相关性（除非跳过）
  if (!skipAIEvaluation) {
    const evaluation = await evaluateImageRelevance(imageUrl, articleTitle, articleSummary);
    result.score = evaluation.score;
    result.reason = evaluation.reason;
    result.isRelevant = evaluation.isRelevant;

    if (!evaluation.isRelevant) {
      console.log(`Image rejected: score=${evaluation.score}, reason=${evaluation.reason}`);
      return result;
    }
  } else {
    result.score = 7;
    result.reason = "跳过AI评估";
    result.isRelevant = true;
  }

  // 2. 下载图片（无论是否需要转存，都需要下载以便AI处理）
  const downloaded = await downloadImage(imageUrl);
  
  if (downloaded) {
    // 3. 使用豆包AI检测并去除公司信息
    const cleanedImage = await removeCompanyBranding(downloaded.buffer, downloaded.contentType);
    
    // 4. 上传处理后的图片到本地存储
    const localUrl = await uploadToStorage(supabase, cleanedImage.buffer, cleanedImage.contentType, articleId);
    if (localUrl) {
      result.newUrl = localUrl;
      result.wasConverted = true;
      if (cleanedImage.wasEdited) {
        console.log(`Image processed (branding removed) and uploaded: ${imageUrl.substring(0, 50)} -> ${localUrl}`);
      } else {
        console.log(`Image uploaded (no branding detected): ${imageUrl.substring(0, 50)} -> ${localUrl}`);
      }
    } else {
      result.isRelevant = false;
      result.reason = "图片上传失败";
    }
  } else if (!needsLocalStorage(imageUrl)) {
    // 下载失败但不需要转存，使用原始URL（无法去除公司信息）
    result.newUrl = imageUrl;
    console.log(`Using original URL (download failed but not hotlink protected): ${imageUrl.substring(0, 80)}`);
  } else {
    result.isRelevant = false;
    result.reason = "图片下载失败";
  }

  return result;
}

// 批量处理文章中的图片
async function processArticleImages(
  supabase: any,
  articleId: string,
  content: string,
  coverImage: string | null,
  title: string,
  summary: string
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

  // 处理封面图
  if (coverImage) {
    const result = await processImage(supabase, coverImage, articleId, title, summary, false);
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
    const result = await processImage(supabase, imgUrl, articleId, title, summary, false);
    processedCount++;
    
    if (result.isRelevant && result.newUrl && result.newUrl !== imgUrl) {
      // 替换内容中的图片URL
      newContent = newContent.replace(
        new RegExp(escapeRegExp(imgUrl), 'g'),
        result.newUrl
      );
      if (result.wasConverted) convertedCount++;
    } else if (!result.isRelevant) {
      // 删除不相关的图片
      newContent = newContent.replace(
        new RegExp(`<figure[^>]*>\\s*<img[^>]*src=["']${escapeRegExp(imgUrl)}["'][^>]*>\\s*(?:<figcaption[^>]*>.*?</figcaption>)?\\s*</figure>`, 'gi'),
        ''
      );
      newContent = newContent.replace(
        new RegExp(`<img[^>]*src=["']${escapeRegExp(imgUrl)}["'][^>]*>`, 'gi'),
        ''
      );
      rejectedCount++;
    }
  }

  // 清理可能产生的多余空行
  newContent = newContent.replace(/\n{3,}/g, '\n\n');

  return {
    newContent,
    newCoverImage,
    processedCount,
    convertedCount,
    rejectedCount,
  };
}

// 辅助函数：转义正则表达式特殊字符
function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// 清理历史文章
async function cleanupHistoricalArticles(
  supabase: any,
  limit: number = 50,
  offset: number = 0
): Promise<{
  processedArticles: number;
  updatedArticles: number;
  totalImagesProcessed: number;
  totalImagesConverted: number;
  totalImagesRejected: number;
  errors: string[];
}> {
  const result = {
    processedArticles: 0,
    updatedArticles: 0,
    totalImagesProcessed: 0,
    totalImagesConverted: 0,
    totalImagesRejected: 0,
    errors: [] as string[],
  };

  // 获取需要处理的文章
  const { data: articles, error } = await supabase
    .from('news_articles')
    .select('id, title, summary, content, cover_image')
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) {
    result.errors.push(`获取文章失败: ${error.message}`);
    return result;
  }

  if (!articles || articles.length === 0) {
    return result;
  }

  for (const article of articles) {
    result.processedArticles++;
    
    try {
      const processed = await processArticleImages(
        supabase,
        article.id,
        article.content || '',
        article.cover_image,
        article.title || '',
        article.summary || ''
      );

      result.totalImagesProcessed += processed.processedCount;
      result.totalImagesConverted += processed.convertedCount;
      result.totalImagesRejected += processed.rejectedCount;

      // 如果有更新，保存到数据库
      if (processed.convertedCount > 0 || processed.rejectedCount > 0) {
        const { error: updateError } = await supabase
          .from('news_articles')
          .update({
            content: processed.newContent,
            cover_image: processed.newCoverImage,
            updated_at: new Date().toISOString(),
          })
          .eq('id', article.id);

        if (updateError) {
          result.errors.push(`更新文章 ${article.id} 失败: ${updateError.message}`);
        } else {
          result.updatedArticles++;
          console.log(`Updated article ${article.id}: ${processed.convertedCount} converted, ${processed.rejectedCount} rejected`);
        }
      }
    } catch (error) {
      result.errors.push(`处理文章 ${article.id} 异常: ${String(error)}`);
    }
  }

  return result;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    // Auth check - require admin role
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ success: false, error: "Unauthorized" }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }
    const authClient = createClient(supabaseUrl, supabaseAnonKey, { global: { headers: { Authorization: authHeader } } });
    const token = authHeader.replace("Bearer ", "");
    const { data: claimsData, error: claimsError } = await authClient.auth.getClaims(token);
    if (claimsError || !claimsData?.claims) {
      return new Response(JSON.stringify({ success: false, error: "Unauthorized" }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }
    const supabase = createClient(supabaseUrl, supabaseKey);
    const { data: isAdmin } = await supabase.rpc("has_role", { _user_id: claimsData.claims.sub, _role: "admin" });
    if (!isAdmin) {
      return new Response(JSON.stringify({ success: false, error: "Forbidden" }), { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const { action, ...params } = await req.json();

    switch (action) {
      case "process-single": {
        // 处理单张图片
        const { imageUrl, articleId, articleTitle, articleSummary, skipAI } = params;
        
        if (!imageUrl || !articleId) {
          return new Response(
            JSON.stringify({ success: false, error: "缺少必要参数" }),
            { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }

        const result = await processImage(
          supabase,
          imageUrl,
          articleId,
          articleTitle || '',
          articleSummary || '',
          skipAI || false
        );

        return new Response(
          JSON.stringify({ success: true, data: result }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      case "process-article": {
        // 处理整篇文章的图片
        const { articleId, content, coverImage, title, summary } = params;
        
        if (!articleId || !content) {
          return new Response(
            JSON.stringify({ success: false, error: "缺少必要参数" }),
            { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }

        const result = await processArticleImages(
          supabase,
          articleId,
          content,
          coverImage || null,
          title || '',
          summary || ''
        );

        return new Response(
          JSON.stringify({ success: true, data: result }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      case "cleanup-history": {
        // 批量清理历史文章
        const { limit = 50, offset = 0 } = params;

        const result = await cleanupHistoricalArticles(supabase, limit, offset);

        return new Response(
          JSON.stringify({ success: true, data: result }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      case "check-image": {
        // 仅检查图片相关性，不下载或转存
        const { imageUrl, articleTitle, articleSummary } = params;
        
        if (!imageUrl) {
          return new Response(
            JSON.stringify({ success: false, error: "缺少图片URL" }),
            { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }

        const evaluation = await evaluateImageRelevance(
          imageUrl,
          articleTitle || '',
          articleSummary || ''
        );

        return new Response(
          JSON.stringify({ success: true, data: evaluation }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      default:
        return new Response(
          JSON.stringify({ 
            success: false, 
            error: "未知操作",
            availableActions: ["process-single", "process-article", "cleanup-history", "check-image"]
          }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
    }
  } catch (error) {
    console.error("Edge function error:", error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error instanceof Error ? error.message : "服务器错误" 
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
