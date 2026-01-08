import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

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

// Simple rate limiting using in-memory store (resets on cold start)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 3600000; // 1 hour in ms
const RATE_LIMIT_MAX = 5; // Max 5 requests per hour per IP

const checkRateLimit = (ip: string): boolean => {
  const now = Date.now();
  const record = rateLimitStore.get(ip);
  
  if (!record || now > record.resetTime) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }
  
  if (record.count >= RATE_LIMIT_MAX) {
    return false;
  }
  
  record.count++;
  return true;
};

async function sendEmail(to: string[], subject: string, html: string) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: "飞迈科技 <onboarding@resend.dev>",
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

  // Rate limiting check
  const clientIp = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || 
                   req.headers.get("x-real-ip") || 
                   "unknown";
  
  if (!checkRateLimit(clientIp)) {
    console.log(`Rate limit exceeded for IP: ${clientIp}`);
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
    const { name, email, phone, company, subject, message, productInterest, adminEmail } = data;

    // Sanitize all user inputs
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safePhone = escapeHtml(phone || '');
    const safeCompany = escapeHtml(company || '');
    const safeSubject = escapeHtml(subject);
    const safeMessage = escapeHtml(message);
    const safeProductInterest = escapeHtml(productInterest || '');

    console.log("Sending inquiry notification to:", adminEmail);

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
            此邮件由飞迈科技网站自动发送，请及时处理客户咨询。
          </p>
        </div>
      `
    );

    console.log("Admin notification sent:", adminEmailResponse);

    // Send confirmation to customer (use original email for sending, sanitized for display)
    const customerEmailResponse = await sendEmail(
      [email],
      "感谢您的咨询 - 飞迈科技",
      `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">尊敬的 ${safeName}，您好！</h2>
          
          <p>感谢您对飞迈科技的关注！我们已收到您的咨询：</p>
          
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>咨询主题：</strong> ${safeSubject}</p>
            <p><strong>咨询内容：</strong></p>
            <p style="white-space: pre-wrap;">${safeMessage}</p>
          </div>
          
          <p>我们的专业团队会尽快与您联系。如有紧急事项，请拨打我们的服务热线。</p>
          
          <p style="margin-top: 30px;">
            此致<br>
            <strong>飞迈科技团队</strong>
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
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
