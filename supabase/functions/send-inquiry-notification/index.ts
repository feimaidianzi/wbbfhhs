import { createClient } from "npm:@supabase/supabase-js@2";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface InquiryNotificationRequest {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject: string;
  message: string;
  productInterest?: string;
  adminEmail: string;
  inquiryId?: string; // Reference to the saved inquiry for verification
}

// HTML escape function to prevent XSS
const escapeHtml = (str: string): string => {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
};

// Rate limiting configuration
const RATE_LIMIT_WINDOW_MS = 3600000; // 1 hour
const RATE_LIMIT_MAX_REQUESTS = 5; // Max 5 emails per hour per IP

// Persistent rate limiting using Supabase
async function checkAndUpdateRateLimit(supabase: any, clientIp: string): Promise<boolean> {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW_MS;

  try {
    // Clean up old entries and get recent requests count
    // Using system_settings as a simple key-value store for rate limits
    const rateLimitKey = `rate_limit_${clientIp}`;
    
    const { data: existing } = await supabase
      .from('system_settings')
      .select('value')
      .eq('key', rateLimitKey)
      .maybeSingle();

    let requests: number[] = [];
    if (existing?.value) {
      try {
        requests = JSON.parse(existing.value).filter((ts: number) => ts > windowStart);
      } catch {
        requests = [];
      }
    }

    if (requests.length >= RATE_LIMIT_MAX_REQUESTS) {
      console.log(`Rate limit exceeded for IP: ${clientIp}, requests: ${requests.length}`);
      return false;
    }

    // Add current request timestamp
    requests.push(now);

    // Upsert the rate limit record
    await supabase
      .from('system_settings')
      .upsert({
        key: rateLimitKey,
        value: JSON.stringify(requests),
        description: `Rate limit tracking for IP (auto-managed)`
      }, { onConflict: 'key' });

    return true;
  } catch (error) {
    console.error('Rate limit check error:', error);
    // On error, allow the request but log it
    return true;
  }
}

async function sendEmail(to: string[], subject: string, html: string) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: "长凌科技 <onboarding@resend.dev>",
      to,
      subject,
      html,
    }),
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Failed to send email: ${error}`);
  }

  return res.json();
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Create Supabase client with service role for rate limit tracking
  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

  // Get client IP for rate limiting
  const clientIp = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || 
                   req.headers.get("x-real-ip") || 
                   "unknown";

  // Check rate limit
  const allowed = await checkAndUpdateRateLimit(supabase, clientIp);
  if (!allowed) {
    return new Response(
      JSON.stringify({ error: "Too many requests. Please try again later." }),
      {
        status: 429,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }

  try {
    const data: InquiryNotificationRequest = await req.json();
    const { name, email, phone, company, subject, message, productInterest, adminEmail, inquiryId } = data;

    // Validate required fields
    if (!name || !email || !subject || !message || !adminEmail) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email) || !emailRegex.test(adminEmail)) {
      return new Response(
        JSON.stringify({ error: "Invalid email address" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Validate input lengths to prevent abuse
    if (name.length > 100 || email.length > 255 || subject.length > 500 || message.length > 10000) {
      return new Response(
        JSON.stringify({ error: "Input exceeds maximum length" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Sanitize all user inputs
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safePhone = escapeHtml(phone || '');
    const safeCompany = escapeHtml(company || '');
    const safeSubject = escapeHtml(subject);
    const safeMessage = escapeHtml(message);
    const safeProductInterest = escapeHtml(productInterest || '');

    console.log("Sending inquiry notification to:", adminEmail, "from IP:", clientIp);

    // Send notification to admin
    const adminEmailResponse = await sendEmail(
      [adminEmail],
      `[新咨询] ${safeSubject}`,
      `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">新客户咨询</h2>
          
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1e40af; margin-top: 0;">联系人信息</h3>
            <p><strong>姓名：</strong> ${safeName}</p>
            <p><strong>邮箱：</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
            ${safePhone ? `<p><strong>电话：</strong> ${safePhone}</p>` : ''}
            ${safeCompany ? `<p><strong>公司：</strong> ${safeCompany}</p>` : ''}
            ${safeProductInterest ? `<p><strong>感兴趣产品：</strong> ${safeProductInterest}</p>` : ''}
          </div>
          
          <div style="background: #fff; border: 1px solid #e2e8f0; padding: 20px; border-radius: 8px;">
            <h3 style="color: #1e40af; margin-top: 0;">咨询主题</h3>
            <p style="font-weight: bold;">${safeSubject}</p>
            
            <h3 style="color: #1e40af;">咨询内容</h3>
            <p style="white-space: pre-wrap; line-height: 1.6;">${safeMessage}</p>
          </div>
          
          <p style="color: #64748b; font-size: 12px; margin-top: 20px;">
            此邮件由长凌科技网站自动发送，请及时处理客户咨询。
          </p>
        </div>
      `
    );

    console.log("Admin notification sent:", adminEmailResponse);

    // Send confirmation to customer (use original email for sending, sanitized for display)
    const customerEmailResponse = await sendEmail(
      [email],
      "感谢您的咨询 - 长凌科技",
      `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">尊敬的 ${safeName}，您好！</h2>
          
          <p>感谢您对长凌科技的关注！我们已收到您的咨询：</p>
          
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>咨询主题：</strong> ${safeSubject}</p>
            <p><strong>咨询内容：</strong></p>
            <p style="white-space: pre-wrap;">${safeMessage}</p>
          </div>
          
          <p>我们的专业团队会尽快与您联系。如有紧急事项，请拨打我们的服务热线。</p>
          
          <p style="margin-top: 30px;">
            此致<br>
            <strong>长凌科技团队</strong>
          </p>
          
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 30px 0;">
          
          <p style="color: #64748b; font-size: 12px;">
            此邮件为系统自动发送，请勿直接回复。
          </p>
        </div>
      `
    );

    console.log("Customer confirmation sent:", customerEmailResponse);

    return new Response(
      JSON.stringify({ 
        success: true, 
        adminEmail: adminEmailResponse,
        customerEmail: customerEmailResponse 
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in send-inquiry-notification:", error);
    return new Response(
      JSON.stringify({ error: "Failed to send notification" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

Deno.serve(handler);
