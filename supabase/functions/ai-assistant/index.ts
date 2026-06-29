import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// 使用 DeepSeek API（OpenAI-compatible）
const DEEPSEEK_API_URL = "https://api.deepseek.com/v1/chat/completions";
const DEEPSEEK_MODEL = "deepseek-chat";
const DEEPSEEK_SECRET_NAMES = [
  "DEEPSEEK_API_KEY",
  "DEEPSEEK_API_KEY_2",
  "DEEPSEEK_API_KEY_3",
  "DEEPSEEK_API_KEY_4",
  "DEEPSEEK_API_KEY_5",
  "DEEPSEEK_API_KEY_6",
  "DEEPSEEK_API_KEY_7",
];

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
3. 主动收集客户联系方式(姓名、电话、公司、地区)用于后续跟进
4. 如果客户问题超出你的能力范围,主动建议转接人工客服

回答要求:
- 简洁专业,每次回复控制在100字以内
- 在对话中自然地询问客户需求和联系方式
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
  action?: "chat" | "extract_lead" | "transfer_human" | "auto_extract" | "load_history" | "save_message" | "create_conversation";
}

function getDeepSeekApiKey() {
  for (const name of DEEPSEEK_SECRET_NAMES) {
    const value = Deno.env.get(name);
    if (value) return value;
  }
  return null;
}

// 使用 DeepSeek 自动提取线索信息
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

提取规则:
- 姓名: 注意"我姓X"、"我叫XXX"、"这是我名片"等表达
- 电话: 11位手机号或带区号座机
- 邮箱: 包含@符号的邮箱地址
- 公司: "我们公司"、"XX公司"、"我在XX工作"等
- 需求: 客户想要什么产品/解决什么问题
- 产品兴趣: 提到的具体产品类型

评分标准:
- 0-20: 只是咨询,无明确意向
- 21-40: 有初步兴趣
- 41-60: 明确表达需求
- 61-80: 询问价格/规格,有购买意向
- 81-100: 留下联系方式,紧急需求

对话内容:
${messages.slice(-10).map(m => `${m.role}: ${m.content}`).join('\n')}`;

  try {
    const response = await fetch(DEEPSEEK_API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: DEEPSEEK_MODEL,
        messages: [
          { role: "system", content: "你是一个信息提取助手,只返回JSON格式的数据,不要有其他内容。确保JSON格式正确。" },
          { role: "user", content: extractPrompt }
        ],
        temperature: 0.1,
      }),
    });

    if (!response.ok) {
      console.error("Failed to extract lead info:", response.status, await response.text());
      return null;
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "{}";
    
    console.log("Lead extraction response:", content);
    
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
    .select("id, lead_score, name, phone, email, company, requirements")
    .eq("conversation_id", conversationId)
    .single();

  const leadData = {
    conversation_id: conversationId,
    name: leadInfo.name || existingLead?.name || null,
    phone: leadInfo.phone || existingLead?.phone || null,
    email: leadInfo.email || existingLead?.email || null,
    company: leadInfo.company || existingLead?.company || null,
    location: leadInfo.location || null,
    requirements: leadInfo.requirements || existingLead?.requirements || null,
    product_interest: leadInfo.product_interest || null,
    budget_range: leadInfo.budget_range || null,
    urgency: leadInfo.urgency || null,
    lead_score: parseInt(leadInfo.lead_score) || 0,
  };

  console.log("Saving lead data:", leadData);

  if (existingLead) {
    // 合并数据，保留已有信息，更新新信息
    const mergedData = {
      ...leadData,
      name: leadData.name || existingLead.name,
      phone: leadData.phone || existingLead.phone,
      email: leadData.email || existingLead.email,
      company: leadData.company || existingLead.company,
      requirements: leadData.requirements || existingLead.requirements,
      lead_score: Math.max(leadData.lead_score, existingLead.lead_score || 0),
    };
    
    const { error } = await supabase
      .from("customer_leads")
      .update(mergedData)
      .eq("id", existingLead.id);
      
    if (error) {
      console.error("Update lead error:", error);
    } else {
      console.log("Lead updated successfully");
    }
  } else if (leadInfo.name || leadInfo.phone || leadInfo.email || leadInfo.requirements || leadInfo.product_interest) {
    // 只有有价值信息时才创建新线索
    const { error } = await supabase.from("customer_leads").insert(leadData);
    if (error) {
      console.error("Insert lead error:", error);
    } else {
      console.log("Lead created successfully");
    }
  }
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const deepSeekApiKey = getDeepSeekApiKey();

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const body = await req.json() as RequestBody;
    const { messages, conversationId, sessionId, action = "chat" } = body;

    // Basic input validation
    if (messages && (!Array.isArray(messages) || messages.length > 50)) {
      return new Response(JSON.stringify({ error: "Invalid messages" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (sessionId && (typeof sessionId !== 'string' || sessionId.length > 128)) {
      return new Response(JSON.stringify({ error: "Invalid sessionId" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (conversationId && (typeof conversationId !== 'string' || conversationId.length > 64)) {
      return new Response(JSON.stringify({ error: "Invalid conversationId" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Handle conversation creation server-side so visitors are not blocked by RLS return checks.
    if (action === "create_conversation" && sessionId) {
      const { data: existingConv } = await supabase
        .from("ai_conversations")
        .select("id, is_transferred_to_human")
        .eq("session_id", sessionId)
        .neq("status", "resolved")
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

      if (existingConv) {
        return new Response(JSON.stringify({ conversation: existingConv }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const userAgent = req.headers.get("user-agent") || null;
      const { data: createdConv, error: createError } = await supabase
        .from("ai_conversations")
        .insert({
          session_id: sessionId,
          visitor_device: userAgent,
          is_visitor_online: true,
        })
        .select("id, is_transferred_to_human")
        .single();

      if (createError || !createdConv) {
        console.error("Create conversation error:", createError);
        return new Response(JSON.stringify({ error: "Failed to create conversation" }), {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      await supabase
        .from("visitor_sessions")
        .update({ ai_conversation_id: createdConv.id })
        .eq("session_id", sessionId);

      return new Response(JSON.stringify({ conversation: createdConv }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Handle loading conversation history (for visitors who can't read via RLS)
    if (action === "load_history" && sessionId) {
      // Find active conversation for this session
      const { data: conv } = await supabase
        .from("ai_conversations")
        .select("id, is_transferred_to_human")
        .eq("session_id", sessionId)
        .neq("status", "resolved")
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

      if (!conv) {
        return new Response(JSON.stringify({ conversation: null, messages: [] }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const { data: historyMessages } = await supabase
        .from("ai_conversation_messages")
        .select("id, role, content, created_at")
        .eq("conversation_id", conv.id)
        .order("created_at", { ascending: true });

      return new Response(JSON.stringify({
        conversation: { id: conv.id, is_transferred_to_human: conv.is_transferred_to_human },
        messages: historyMessages || [],
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Handle lead extraction (manual)
    if (action === "extract_lead" && conversationId) {
      if (!deepSeekApiKey) {
        return new Response(JSON.stringify({ error: "DeepSeek API key is not configured" }), {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const leadInfo = await autoExtractLeadInfo(messages, deepSeekApiKey);
      
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

    // Handle saving a message (for visitors who can't insert via RLS)
    if (action === "save_message" && conversationId) {
      const { role: msgRole, content: msgContent } = body as any;
      if (!msgRole || !msgContent || typeof msgContent !== 'string') {
        return new Response(JSON.stringify({ error: "Invalid message data" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      // Allow user, assistant, and system roles
      if (!['user', 'assistant', 'system'].includes(msgRole)) {
        return new Response(JSON.stringify({ error: "Invalid role" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const { error: insertError } = await supabase
        .from("ai_conversation_messages")
        .insert({ conversation_id: conversationId, role: msgRole, content: msgContent.slice(0, 2000) });
      if (insertError) {
        console.error("Save message error:", insertError);
        return new Response(JSON.stringify({ error: "Failed to save message" }), {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      // Update last_visitor_message_at if user message
      if (msgRole === 'user') {
        await supabase
          .from("ai_conversations")
          .update({ last_visitor_message_at: new Date().toISOString() })
          .eq("id", conversationId);
      }
      return new Response(JSON.stringify({ success: true }), {
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

    if (!deepSeekApiKey) {
      return new Response(JSON.stringify({ error: "DeepSeek API key is not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Regular chat - call DeepSeek API
    const response = await fetch(DEEPSEEK_API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${deepSeekApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: DEEPSEEK_MODEL,
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
      console.error("DeepSeek AI error:", response.status, errorText);
      
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
      
      throw new Error(`DeepSeek AI error: ${response.status}`);
    }

    // 异步提取线索信息(不阻塞响应) - 每次对话都尝试提取
    if (conversationId && messages.length >= 1) {
      (async () => {
        try {
          const leadInfo = await autoExtractLeadInfo(messages, deepSeekApiKey);
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
