import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const DEEPSEEK_API_URL = "https://api.deepseek.com/v1/chat/completions";

const SYSTEM_PROMPT = `你是飞脉科技的AI客服助手"小飞"。飞脉科技是一家专业的无人机解决方案提供商,主要产品包括:

1. 多旋翼无人机系列 (X650, X850, X1200, X1600)
2. 物流无人机 (WL-10, WL-20, WL-30)
3. 系留无人机 (TH-100, TH-200, TH-300)
4. 消防/农业/测绘等行业应用无人机
5. 无人机配件 (图传、云台、相机、飞控等)
6. 无人机软件解决方案

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

当客户提供个人信息时,在回复中自然地确认收到。`;

interface Message {
  role: "user" | "assistant" | "system";
  content: string;
}

interface RequestBody {
  messages: Message[];
  conversationId?: string;
  sessionId?: string;
  action?: "chat" | "extract_lead" | "transfer_human";
}

// Extract lead information from conversation
async function extractLeadInfo(messages: Message[], apiKey: string): Promise<any> {
  const extractPrompt = `分析以下对话,提取客户信息。返回JSON格式:
{
  "name": "客户姓名或null",
  "phone": "电话号码或null",
  "email": "邮箱或null",
  "company": "公司名称或null",
  "location": "地区或null",
  "requirements": "需求描述或null",
  "product_interest": "感兴趣的产品或null",
  "budget_range": "预算范围或null",
  "urgency": "low/medium/high/immediate 或 null",
  "lead_score": "0-100的评分,基于购买意向强度"
}

对话内容:
${messages.map(m => `${m.role}: ${m.content}`).join('\n')}`;

  const response = await fetch(DEEPSEEK_API_URL, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "deepseek-chat",
      messages: [
        { role: "system", content: "你是一个信息提取助手,只返回JSON格式的数据,不要有其他内容。" },
        { role: "user", content: extractPrompt }
      ],
      temperature: 0.1,
    }),
  });

  if (!response.ok) {
    console.error("Failed to extract lead info");
    return null;
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content || "{}";
  
  try {
    // Extract JSON from response
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
  } catch (e) {
    console.error("Failed to parse lead info:", e);
  }
  
  return null;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const DEEPSEEK_API_KEY = Deno.env.get("DEEPSEEK_API_KEY");
    if (!DEEPSEEK_API_KEY) {
      throw new Error("DEEPSEEK_API_KEY is not configured");
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { messages, conversationId, sessionId, action = "chat" } = await req.json() as RequestBody;

    // Handle lead extraction
    if (action === "extract_lead" && conversationId) {
      const leadInfo = await extractLeadInfo(messages, DEEPSEEK_API_KEY);
      
      if (leadInfo && (leadInfo.name || leadInfo.phone || leadInfo.email || leadInfo.requirements)) {
        // Save lead to database
        const { error } = await supabase.from("customer_leads").insert({
          conversation_id: conversationId,
          name: leadInfo.name,
          phone: leadInfo.phone,
          email: leadInfo.email,
          company: leadInfo.company,
          location: leadInfo.location,
          requirements: leadInfo.requirements,
          product_interest: leadInfo.product_interest,
          budget_range: leadInfo.budget_range,
          urgency: leadInfo.urgency,
          lead_score: parseInt(leadInfo.lead_score) || 0,
        });

        if (error) {
          console.error("Failed to save lead:", error);
        }

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

    // Regular chat - call DeepSeek API
    const response = await fetch(DEEPSEEK_API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${DEEPSEEK_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "deepseek-chat",
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
      console.error("DeepSeek API error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "请求过于频繁,请稍后再试" }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      
      throw new Error(`DeepSeek API error: ${response.status}`);
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
