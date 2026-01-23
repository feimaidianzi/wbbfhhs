import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const LOVABLE_AI_URL = "https://ai.gateway.lovable.dev/v1/chat/completions";

const SYSTEM_PROMPT = `你是长凌科技的AI客服助手"小凌"。长凌科技(CANI)是一家专业的工业无人机配件供应商,主要产品包括:

1. 数字图传系统 - 高清数字传输
2. VTX/VRX视频发射器 - 4.9-7.2GHz全频段
3. 飞控/电调 - 专业级飞行控制系统
4. 云台吊舱 - 多轴稳定系统
5. ELRS遥控 - ExpressLRS协议远距离遥控
6. 运动相机 - 专业航拍相机

你的职责:
1. 友好热情地回答客户问题
2. 了解客户需求,推荐合适的产品
3. 收集客户联系方式(姓名、电话、公司、地区)用于后续跟进
4. 如果客户问题超出你的能力范围,主动建议转接人工客服

回答要求:
- 简洁专业,每次回复控制在100字以内
- 适时询问客户需求和联系方式
- 如果客户表达购买意向,询问预算范围和紧急程度
- 使用友好的语气,可以适当使用emoji
- 自我介绍时请称自己为"小凌"

当客户提供个人信息时,在回复中自然地确认收到。`;

interface Message {
  role: "user" | "assistant" | "system";
  content: string;
}

interface RequestBody {
  messages: Message[];
  conversationId?: string;
  sessionId?: string;
  action?: "chat" | "extract_lead" | "transfer_human" | "auto_extract";
}

// 使用Lovable AI自动提取线索信息
async function autoExtractLeadInfo(messages: Message[], apiKey: string): Promise<any> {
  const extractPrompt = `分析以下客服对话,提取客户信息。只返回JSON格式数据,不要有其他内容。

如果没有发现任何有价值的信息,返回: {"found": false}

如果发现了客户信息,返回:
{
  "found": true,
  "name": "客户姓名或null",
  "phone": "电话号码或null",
  "email": "邮箱或null", 
  "company": "公司名称或null",
  "location": "地区或null",
  "requirements": "需求描述或null",
  "product_interest": "感兴趣的产品或null",
  "budget_range": "预算范围或null",
  "urgency": "low/medium/high/immediate 或 null",
  "lead_score": 0-100的评分(基于购买意向强度)
}

评分标准:
- 0-20: 只是咨询,无明确意向
- 21-40: 有初步兴趣
- 41-60: 明确表达需求
- 61-80: 询问价格/规格,有购买意向
- 81-100: 留下联系方式,紧急需求

对话内容:
${messages.slice(-6).map(m => `${m.role}: ${m.content}`).join('\n')}`;

  try {
    const response = await fetch(LOVABLE_AI_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: "你是一个信息提取助手,只返回JSON格式的数据,不要有其他内容。确保JSON格式正确。" },
          { role: "user", content: extractPrompt }
        ],
        temperature: 0.1,
      }),
    });

    if (!response.ok) {
      console.error("Failed to extract lead info:", response.status);
      return null;
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "{}";
    
    // Extract JSON from response
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      return parsed.found !== false ? parsed : null;
    }
  } catch (e) {
    console.error("Failed to parse lead info:", e);
  }
  
  return null;
}

// 保存或更新线索
async function saveOrUpdateLead(supabase: any, conversationId: string, leadInfo: any) {
  // 检查是否已存在该会话的线索
  const { data: existingLead } = await supabase
    .from("customer_leads")
    .select("id, lead_score")
    .eq("conversation_id", conversationId)
    .single();

  const leadData = {
    conversation_id: conversationId,
    name: leadInfo.name || null,
    phone: leadInfo.phone || null,
    email: leadInfo.email || null,
    company: leadInfo.company || null,
    location: leadInfo.location || null,
    requirements: leadInfo.requirements || null,
    product_interest: leadInfo.product_interest || null,
    budget_range: leadInfo.budget_range || null,
    urgency: leadInfo.urgency || null,
    lead_score: parseInt(leadInfo.lead_score) || 0,
  };

  if (existingLead) {
    // 只有当新分数更高时才更新
    if (leadData.lead_score > (existingLead.lead_score || 0)) {
      await supabase
        .from("customer_leads")
        .update(leadData)
        .eq("id", existingLead.id);
    }
  } else if (leadInfo.name || leadInfo.phone || leadInfo.email || leadInfo.requirements) {
    // 只有有价值信息时才创建新线索
    await supabase.from("customer_leads").insert(leadData);
  }
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { messages, conversationId, sessionId, action = "chat" } = await req.json() as RequestBody;

    // Handle lead extraction (manual)
    if (action === "extract_lead" && conversationId) {
      const leadInfo = await autoExtractLeadInfo(messages, LOVABLE_API_KEY);
      
      if (leadInfo) {
        await saveOrUpdateLead(supabase, conversationId, leadInfo);
        return new Response(JSON.stringify({ success: true, lead: leadInfo }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      return new Response(JSON.stringify({ success: false, message: "No lead info found" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Handle transfer to human
    if (action === "transfer_human" && conversationId) {
      await supabase
        .from("ai_conversations")
        .update({
          is_transferred_to_human: true,
          transferred_at: new Date().toISOString(),
          status: "transferred",
        })
        .eq("id", conversationId);

      return new Response(JSON.stringify({ 
        success: true, 
        message: "已转接人工客服,请稍候..." 
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Regular chat - call Lovable AI Gateway
    const response = await fetch(LOVABLE_AI_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
        temperature: 0.7,
        max_tokens: 500,
        stream: true,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Lovable AI error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "请求过于频繁,请稍后再试" }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI服务额度不足" }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      
      throw new Error(`Lovable AI error: ${response.status}`);
    }

    // 异步提取线索信息(不阻塞响应)
    if (conversationId && messages.length >= 2) {
      // 使用 EdgeRuntime.waitUntil 来异步处理
      (async () => {
        try {
          const leadInfo = await autoExtractLeadInfo(messages, LOVABLE_API_KEY);
          if (leadInfo) {
            await saveOrUpdateLead(supabase, conversationId, leadInfo);
          }
        } catch (e) {
          console.error("Auto extract lead error:", e);
        }
      })();
    }

    // Stream the response
    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });

  } catch (error) {
    console.error("AI Assistant error:", error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : "Unknown error" 
    }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
