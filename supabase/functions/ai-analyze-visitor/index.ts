import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// 使用 Lovable AI 支持的模型
const LOVABLE_AI_URL = "https://api.lovable.dev/v1/chat/completions";

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { visitorData } = await req.json();

    if (!visitorData) {
      return new Response(
        JSON.stringify({ error: "Missing visitor data" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    // 构建分析提示词（数据已脱敏）
    const prompt = `分析以下访客行为数据，给出用户画像和购买意向分析：

访客数据（已脱敏）：
- 来源渠道：${visitorData.trafficSource}
- 设备类型：${visitorData.deviceType}
- 浏览页面数：${visitorData.totalPageViews}
- 停留时间：${visitorData.durationSeconds}秒
- 浏览页面：${visitorData.pagesVisited?.join(' → ')}
- 搜索关键词：${visitorData.searchKeywords?.join(', ') || '无'}
- 退出页面：${visitorData.exitPage || '未知'}
- 是否有AI对话：${visitorData.hasConversation ? '是' : '否'}
${visitorData.conversationSummary ? `- 对话概要：${visitorData.conversationSummary}` : ''}
- 主要行为事件：${visitorData.events?.map((e: any) => `${e.type}:${e.name}`).slice(0, 10).join(', ')}

请分析：
1. 用户画像（年龄层、职业可能性、需求类型）
2. 购买意向评估（高/中/低）
3. 关注的产品类型
4. 建议的跟进策略
5. 潜在价值评估

请用简洁的中文回答，每点不超过2句话。`;

    let analysis = "";

    if (LOVABLE_API_KEY) {
      // 使用 Lovable AI
      const response = await fetch(LOVABLE_AI_URL, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash",
          messages: [
            { role: "system", content: "你是一个专业的客户行为分析师，擅长从用户行为数据中提取有价值的洞察。" },
            { role: "user", content: prompt }
          ],
          temperature: 0.7,
          max_tokens: 500,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        analysis = data.choices?.[0]?.message?.content || "";
      } else {
        // 降级到基于规则的分析
        analysis = generateRuleBasedAnalysis(visitorData);
      }
    } else {
      // 使用 DeepSeek 作为备选
      const DEEPSEEK_API_KEY = Deno.env.get("DEEPSEEK_API_KEY");
      
      if (DEEPSEEK_API_KEY) {
        const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${DEEPSEEK_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "deepseek-chat",
            messages: [
              { role: "system", content: "你是一个专业的客户行为分析师，擅长从用户行为数据中提取有价值的洞察。" },
              { role: "user", content: prompt }
            ],
            temperature: 0.7,
            max_tokens: 500,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          analysis = data.choices?.[0]?.message?.content || "";
        } else {
          analysis = generateRuleBasedAnalysis(visitorData);
        }
      } else {
        analysis = generateRuleBasedAnalysis(visitorData);
      }
    }

    return new Response(
      JSON.stringify({ analysis }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("AI analyze error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

// 基于规则的备用分析
function generateRuleBasedAnalysis(data: any): string {
  const lines: string[] = [];

  // 用户画像
  let userType = "普通浏览者";
  if (data.totalPageViews > 5 && data.durationSeconds > 300) {
    userType = "高意向潜在客户";
  } else if (data.totalPageViews > 3) {
    userType = "感兴趣的访客";
  }
  lines.push(`1. 用户画像：${userType}，从${data.trafficSource === 'search_engine' ? '搜索引擎' : data.trafficSource}渠道访问，使用${data.deviceType}设备。`);

  // 购买意向
  let intent = "低";
  if (data.hasConversation || data.durationSeconds > 300) {
    intent = "高";
  } else if (data.totalPageViews > 3 || data.searchKeywords?.length > 0) {
    intent = "中";
  }
  lines.push(`2. 购买意向：${intent}。${data.hasConversation ? '已主动与AI客服沟通，表现出明确需求。' : ''}`);

  // 关注产品
  const productPages = data.pagesVisited?.filter((p: string) => p.includes('/products/')) || [];
  if (productPages.length > 0) {
    lines.push(`3. 关注产品：主要浏览了${productPages.length}个产品页面。`);
  } else {
    lines.push(`3. 关注产品：尚未深入浏览具体产品页面。`);
  }

  // 跟进策略
  if (intent === "高") {
    lines.push(`4. 跟进策略：建议24小时内主动联系，提供专业咨询和报价。`);
  } else if (intent === "中") {
    lines.push(`4. 跟进策略：可发送产品资料邮件，保持轻度触达。`);
  } else {
    lines.push(`4. 跟进策略：暂时归档观察，等待二次访问时再跟进。`);
  }

  // 价值评估
  const score = Math.min(100, (data.totalPageViews || 0) * 10 + (data.durationSeconds || 0) / 10 + (data.hasConversation ? 30 : 0));
  lines.push(`5. 潜在价值：${score > 70 ? '高' : score > 40 ? '中' : '低'}价值客户，综合评分 ${Math.round(score)}/100。`);

  return lines.join('\n\n');
}
