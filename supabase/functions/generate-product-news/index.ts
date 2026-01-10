import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// 产品分类信息
const PRODUCT_CATEGORIES = {
  digitalFpv: {
    name: "数字图传",
    products: [
      { name: "FlyMind Link2 数字高清图传", desc: "WiFi数字传输，1080P 60fps，低延迟高画质" },
      { name: "FlyMind Link-RX 数字高清接收器", desc: "1080P HDMI输出，内置32G存储，支持OpenIPC/Ruby FPV" }
    ],
    techTopics: [
      { title: "什么是无人机数字图传？", desc: "数字图传的工作原理、技术特点、与模拟图传的区别" },
      { title: "数字图传VS模拟图传：如何选择？", desc: "深度对比两种图传技术的优缺点和应用场景" },
      { title: "WiFi数字图传技术详解", desc: "WiFi图传的技术原理、延迟特性、适用场景" },
      { title: "OpenIPC系统详解", desc: "开源图传系统的技术特点和使用方法" }
    ]
  },
  vtx: {
    name: "模拟图传",
    products: [
      { name: "2.5W视频发射器", desc: "4.9-6.1GHz，80频道，SA协议，轻量化设计" },
      { name: "10W视频发射器", desc: "5档功率可调(1W-10W)，内置风扇散热，支持Betaflight" },
      { name: "25W视频发射器", desc: "大功率输出，远距离传输，专业级应用" },
      { name: "37W视频发射器", desc: "超大功率，极限远距离传输" }
    ],
    techTopics: [
      { title: "什么是VTX（视频发射器）？", desc: "VTX的工作原理、功率选择、频率设置详解" },
      { title: "5.8G图传频率与频道详解", desc: "常用频段介绍、频道分配、干扰避免方法" },
      { title: "图传功率如何选择？", desc: "不同功率的传输距离、散热要求、法规限制" },
      { title: "SmartAudio协议详解", desc: "智能音频协议的功能和设置方法" }
    ]
  },
  gimbal: {
    name: "云台相机",
    products: [
      { name: "K40T四光云台相机", desc: "可见光+热成像+广角+激光测距，AI智能识别" },
      { name: "K8T-V2双光云台相机", desc: "可见光+热成像，4T算力AI跟踪识别" },
      { name: "K8-V2单光云台", desc: "4K高清，30倍光学变焦，AI目标追踪" }
    ],
    techTopics: [
      { title: "什么是无人机云台？", desc: "云台的工作原理、稳定技术、轴数区别" },
      { title: "双光融合成像技术详解", desc: "可见光与热成像融合的原理和应用" },
      { title: "红外热成像技术入门", desc: "热成像原理、分辨率参数、典型应用" },
      { title: "AI云台目标追踪技术", desc: "机载AI识别跟踪的技术原理" }
    ]
  },
  elrs: {
    name: "ELRS遥控链路",
    products: [
      { name: "ELRS 915MHz分集接收机", desc: "双天线分集，超远距离控制" },
      { name: "ELRS Lite 2.4G接收机", desc: "轻量入门，即插即用" },
      { name: "ELRS 2.4G LNA接收机", desc: "LNA增益增强，高灵敏度" }
    ],
    techTopics: [
      { title: "什么是ELRS（ExpressLRS）？", desc: "开源远程遥控链路协议介绍" },
      { title: "ELRS与传统遥控协议对比", desc: "ELRS vs ACCST、CRSF等协议的优劣分析" },
      { title: "915MHz vs 2.4GHz如何选择？", desc: "两种频段的特点、距离、法规差异" },
      { title: "分集接收技术详解", desc: "双天线分集的工作原理和优势" }
    ]
  },
  fcEsc: {
    name: "飞控电调",
    products: [
      { name: "Mini F7+55A飞塔", desc: "STM32F722处理器，ICM42688陀螺仪，25.5mm孔距" },
      { name: "F405+55A飞塔", desc: "性价比之选，30.5mm标准孔距" },
      { name: "Pro F722 100A飞塔", desc: "双陀螺仪，8层PCB，3-8S宽电压" },
      { name: "六合一80A/100A电调", desc: "六轴机型专用，大电流输出" }
    ],
    techTopics: [
      { title: "什么是飞控？", desc: "飞行控制器的工作原理、核心组件、固件介绍" },
      { title: "什么是电调（ESC）？", desc: "电子调速器的工作原理和选型指南" },
      { title: "陀螺仪与姿态解算", desc: "IMU传感器、陀螺仪、加速度计的技术原理" },
      { title: "DShot协议详解", desc: "DShot通信协议的技术特点和优势" },
      { title: "Betaflight固件入门", desc: "最流行的穿越机固件功能介绍" }
    ]
  }
};

// 生成技术分享文章
async function generateTechArticle(topic: { title: string; desc: string }, categoryName: string, apiKey: string) {
  const prompt = `你是飞迈科技的技术编辑，需要撰写一篇产品技术科普文章。

【文章标题】${topic.title}
【内容方向】${topic.desc}
【产品类别】${categoryName}

【写作要求】
1. 这是技术科普文章，重点解释产品是什么、技术原理是什么、有什么用途
2. 文章结构采用What/Why/How模式，深入浅出
3. 适当引用飞迈科技的相关产品作为例子
4. 800-1200字，使用HTML标签格式化（<p>, <h3>, <strong>, <ul>, <li>）
5. 专业但易懂，适合技术爱好者阅读
6. 不要包含任何URL链接
7. 提供100-150字摘要
8. 提取5个关键词

以JSON格式返回：
{"title":"标题","summary":"摘要","content":"HTML格式正文","keywords":["关键词1","关键词2","关键词3","关键词4","关键词5"]}`;

  const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "google/gemini-2.5-flash-lite",
      messages: [{ role: "user", content: prompt }],
    }),
  });

  if (!response.ok) {
    throw new Error(`AI API error: ${response.status}`);
  }

  const data = await response.json();
  const aiContent = data.choices?.[0]?.message?.content || "";
  const jsonMatch = aiContent.match(/\{[\s\S]*\}/);
  if (jsonMatch) {
    return JSON.parse(jsonMatch[0]);
  }
  return null;
}

// 生成产品资讯文章
async function generateProductNews(product: { name: string; desc: string }, categoryName: string, apiKey: string) {
  const prompt = `你是飞迈科技的产品编辑，需要撰写一篇产品资讯/发布文章。

【产品名称】${product.name}
【产品描述】${product.desc}
【产品类别】${categoryName}

【写作要求】
1. 这是产品资讯文章，重点介绍产品特点、技术亮点、适用场景
2. 突出产品的核心卖点和技术优势
3. 模拟新品发布的风格，专业有吸引力
4. 600-1000字，使用HTML标签格式化
5. 适合潜在客户阅读
6. 不要包含任何URL链接
7. 提供80-120字摘要
8. 提取5个关键词

以JSON格式返回：
{"title":"标题","summary":"摘要","content":"HTML格式正文","keywords":["关键词1","关键词2","关键词3","关键词4","关键词5"]}`;

  const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "google/gemini-2.5-flash-lite",
      messages: [{ role: "user", content: prompt }],
    }),
  });

  if (!response.ok) {
    throw new Error(`AI API error: ${response.status}`);
  }

  const data = await response.json();
  const aiContent = data.choices?.[0]?.message?.content || "";
  const jsonMatch = aiContent.match(/\{[\s\S]*\}/);
  if (jsonMatch) {
    return JSON.parse(jsonMatch[0]);
  }
  return null;
}

// 生成公司新闻
async function generateCompanyNews(apiKey: string, newsIndex: number) {
  const companyNewsTopics = [
    { title: "飞迈科技完成新一轮产品升级", desc: "全系产品性能提升，服务更多行业客户" },
    { title: "飞迈科技参加行业展会", desc: "展示最新无人机零配件产品，获得广泛关注" },
    { title: "飞迈科技与多家无人机厂商达成合作", desc: "产品应用于多个行业领域" },
    { title: "飞迈科技技术团队荣获行业认可", desc: "持续创新，引领无人机配件技术发展" },
    { title: "飞迈科技发布年度产品规划", desc: "更多创新产品即将推出" }
  ];

  const topic = companyNewsTopics[newsIndex % companyNewsTopics.length];
  
  const prompt = `你是飞迈科技的新闻编辑，需要撰写一篇公司新闻稿。

【公司简介】飞迈科技有限公司，专注于工业无人机零配件，提供数字图传、模拟图传、云台相机、飞控电调、ELRS接收机等产品。

【新闻主题】${topic.title}
【新闻方向】${topic.desc}

【写作要求】
1. 这是正式的公司新闻稿，体现企业实力和发展动态
2. 语气专业、正式，突出公司技术实力
3. 500-800字，使用HTML标签格式化
4. 不要包含任何URL链接
5. 提供80-100字摘要
6. 提取5个关键词

以JSON格式返回：
{"title":"标题","summary":"摘要","content":"HTML格式正文","keywords":["关键词1","关键词2","关键词3","关键词4","关键词5"]}`;

  const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "google/gemini-2.5-flash-lite",
      messages: [{ role: "user", content: prompt }],
    }),
  });

  if (!response.ok) {
    throw new Error(`AI API error: ${response.status}`);
  }

  const data = await response.json();
  const aiContent = data.choices?.[0]?.message?.content || "";
  const jsonMatch = aiContent.match(/\{[\s\S]*\}/);
  if (jsonMatch) {
    return JSON.parse(jsonMatch[0]);
  }
  return null;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { category, count = 3 } = await req.json();
    
    const lovableApiKey = Deno.env.get("LOVABLE_API_KEY");
    if (!lovableApiKey) {
      return new Response(
        JSON.stringify({ success: false, error: "LOVABLE_API_KEY not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const results: any[] = [];
    
    if (category === "技术分享") {
      // 为每个产品类别生成技术文章
      for (const [key, catData] of Object.entries(PRODUCT_CATEGORIES)) {
        for (let i = 0; i < Math.min(count, catData.techTopics.length); i++) {
          try {
            console.log(`Generating tech article: ${catData.techTopics[i].title}`);
            const article = await generateTechArticle(catData.techTopics[i], catData.name, lovableApiKey);
            if (article) {
              const { error } = await supabase.from("news_articles").insert({
                title: article.title,
                summary: article.summary,
                content: article.content,
                keywords: article.keywords,
                category: "技术分享",
                is_published: true,
                is_auto_generated: true,
                ai_edited: true,
                published_at: new Date().toISOString(),
                source_name: "飞迈科技",
              });
              if (!error) {
                results.push({ success: true, title: article.title, category: catData.name });
              }
            }
            // 添加延迟避免速率限制
            await new Promise(resolve => setTimeout(resolve, 2000));
          } catch (e) {
            console.error(`Error generating tech article:`, e);
          }
        }
      }
    } else if (category === "产品资讯") {
      // 为每个产品类别的产品生成资讯
      for (const [key, catData] of Object.entries(PRODUCT_CATEGORIES)) {
        for (let i = 0; i < Math.min(count, catData.products.length); i++) {
          try {
            console.log(`Generating product news: ${catData.products[i].name}`);
            const article = await generateProductNews(catData.products[i], catData.name, lovableApiKey);
            if (article) {
              const { error } = await supabase.from("news_articles").insert({
                title: article.title,
                summary: article.summary,
                content: article.content,
                keywords: article.keywords,
                category: "产品资讯",
                is_published: true,
                is_auto_generated: true,
                ai_edited: true,
                published_at: new Date().toISOString(),
                source_name: "飞迈科技",
              });
              if (!error) {
                results.push({ success: true, title: article.title, product: catData.products[i].name });
              }
            }
            await new Promise(resolve => setTimeout(resolve, 2000));
          } catch (e) {
            console.error(`Error generating product news:`, e);
          }
        }
      }
    } else if (category === "公司新闻") {
      // 生成公司新闻
      for (let i = 0; i < count; i++) {
        try {
          console.log(`Generating company news ${i + 1}`);
          const article = await generateCompanyNews(lovableApiKey, i);
          if (article) {
            const { error } = await supabase.from("news_articles").insert({
              title: article.title,
              summary: article.summary,
              content: article.content,
              keywords: article.keywords,
              category: "公司新闻",
              is_published: true,
              is_auto_generated: true,
              ai_edited: true,
              published_at: new Date().toISOString(),
              source_name: "飞迈科技",
            });
            if (!error) {
              results.push({ success: true, title: article.title });
            }
          }
          await new Promise(resolve => setTimeout(resolve, 2000));
        } catch (e) {
          console.error(`Error generating company news:`, e);
        }
      }
    } else if (category === "all") {
      // 生成所有类别的新闻
      // 技术分享 - 每个产品类别1篇
      for (const [key, catData] of Object.entries(PRODUCT_CATEGORIES)) {
        if (catData.techTopics.length > 0) {
          try {
            console.log(`Generating tech article: ${catData.techTopics[0].title}`);
            const article = await generateTechArticle(catData.techTopics[0], catData.name, lovableApiKey);
            if (article) {
              await supabase.from("news_articles").insert({
                title: article.title,
                summary: article.summary,
                content: article.content,
                keywords: article.keywords,
                category: "技术分享",
                is_published: true,
                is_auto_generated: true,
                ai_edited: true,
                published_at: new Date().toISOString(),
                source_name: "飞迈科技",
              });
              results.push({ success: true, title: article.title, type: "技术分享" });
            }
            await new Promise(resolve => setTimeout(resolve, 2000));
          } catch (e) {
            console.error(`Error:`, e);
          }
        }
      }
      
      // 产品资讯 - 每个产品类别1篇
      for (const [key, catData] of Object.entries(PRODUCT_CATEGORIES)) {
        if (catData.products.length > 0) {
          try {
            console.log(`Generating product news: ${catData.products[0].name}`);
            const article = await generateProductNews(catData.products[0], catData.name, lovableApiKey);
            if (article) {
              await supabase.from("news_articles").insert({
                title: article.title,
                summary: article.summary,
                content: article.content,
                keywords: article.keywords,
                category: "产品资讯",
                is_published: true,
                is_auto_generated: true,
                ai_edited: true,
                published_at: new Date().toISOString(),
                source_name: "飞迈科技",
              });
              results.push({ success: true, title: article.title, type: "产品资讯" });
            }
            await new Promise(resolve => setTimeout(resolve, 2000));
          } catch (e) {
            console.error(`Error:`, e);
          }
        }
      }
      
      // 公司新闻 - 3篇
      for (let i = 0; i < 3; i++) {
        try {
          const article = await generateCompanyNews(lovableApiKey, i);
          if (article) {
            await supabase.from("news_articles").insert({
              title: article.title,
              summary: article.summary,
              content: article.content,
              keywords: article.keywords,
              category: "公司新闻",
              is_published: true,
              is_auto_generated: true,
              ai_edited: true,
              published_at: new Date().toISOString(),
              source_name: "飞迈科技",
            });
            results.push({ success: true, title: article.title, type: "公司新闻" });
          }
          await new Promise(resolve => setTimeout(resolve, 2000));
        } catch (e) {
          console.error(`Error:`, e);
        }
      }
    }

    return new Response(
      JSON.stringify({ success: true, count: results.length, results }),
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
