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
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data: InquiryNotificationRequest = await req.json();
    const { name, email, phone, company, subject, message, productInterest, adminEmail } = data;

    console.log("Sending inquiry notification to:", adminEmail);

    // Send notification to admin
    const adminEmailResponse = await sendEmail(
      [adminEmail],
      `[新咨询] ${subject}`,
      `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">新客户咨询</h2>
          
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1e40af; margin-top: 0;">联系人信息</h3>
            <p><strong>姓名：</strong> ${name}</p>
            <p><strong>邮箱：</strong> <a href="mailto:${email}">${email}</a></p>
            ${phone ? `<p><strong>电话：</strong> ${phone}</p>` : ''}
            ${company ? `<p><strong>公司：</strong> ${company}</p>` : ''}
            ${productInterest ? `<p><strong>感兴趣产品：</strong> ${productInterest}</p>` : ''}
          </div>
          
          <div style="background: #fff; border: 1px solid #e2e8f0; padding: 20px; border-radius: 8px;">
            <h3 style="color: #1e40af; margin-top: 0;">咨询主题</h3>
            <p style="font-weight: bold;">${subject}</p>
            
            <h3 style="color: #1e40af;">咨询内容</h3>
            <p style="white-space: pre-wrap; line-height: 1.6;">${message}</p>
          </div>
          
          <p style="color: #64748b; font-size: 12px; margin-top: 20px;">
            此邮件由飞迈科技网站自动发送，请及时处理客户咨询。
          </p>
        </div>
      `
    );

    console.log("Admin notification sent:", adminEmailResponse);

    // Send confirmation to customer
    const customerEmailResponse = await sendEmail(
      [email],
      "感谢您的咨询 - 飞迈科技",
      `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">尊敬的 ${name}，您好！</h2>
          
          <p>感谢您对飞迈科技的关注！我们已收到您的咨询：</p>
          
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>咨询主题：</strong> ${subject}</p>
            <p><strong>咨询内容：</strong></p>
            <p style="white-space: pre-wrap;">${message}</p>
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
