import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ReplyEmailRequest {
  to: string;
  customerName: string;
  originalSubject: string;
  replyContent: string;
  senderName?: string;
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

  try {
    const data: ReplyEmailRequest = await req.json();
    const { to, customerName, originalSubject, replyContent, senderName = "飞迈科技客服" } = data;

    // Sanitize all user-provided content
    const safeCustomerName = escapeHtml(customerName);
    const safeOriginalSubject = escapeHtml(originalSubject);
    const safeReplyContent = escapeHtml(replyContent);
    const safeSenderName = escapeHtml(senderName);

    console.log("Sending reply email to:", to);

    const emailResponse = await sendEmail(
      [to],
      `回复: ${safeOriginalSubject}`,
      `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%); padding: 30px; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 24px;">飞迈科技</h1>
            <p style="color: rgba(255,255,255,0.8); margin: 5px 0 0 0; font-size: 14px;">FlyMind Technology</p>
          </div>
          
          <div style="background: #ffffff; padding: 30px; border: 1px solid #e2e8f0; border-top: none;">
            <h2 style="color: #333; margin-top: 0;">尊敬的 ${safeCustomerName}，您好！</h2>
            
            <p style="color: #666; line-height: 1.6;">感谢您的咨询，以下是我们的回复：</p>
            
            <div style="background: #f8fafc; padding: 20px; border-left: 4px solid #3b82f6; margin: 20px 0; border-radius: 0 8px 8px 0;">
              <p style="color: #333; white-space: pre-wrap; line-height: 1.8; margin: 0;">${safeReplyContent}</p>
            </div>
            
            <p style="color: #666; line-height: 1.6;">如有其他问题，欢迎随时与我们联系。</p>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
              <p style="color: #333; margin: 0;">此致</p>
              <p style="color: #333; font-weight: bold; margin: 5px 0 0 0;">${safeSenderName}</p>
              <p style="color: #666; font-size: 14px; margin: 5px 0 0 0;">飞迈科技</p>
            </div>
          </div>
          
          <div style="background: #f1f5f9; padding: 20px; border-radius: 0 0 8px 8px; text-align: center;">
            <p style="color: #64748b; font-size: 12px; margin: 0;">
              此邮件由飞迈科技客服团队发送
            </p>
            <p style="color: #64748b; font-size: 12px; margin: 5px 0 0 0;">
              电话: +8617674048404 | 邮箱: market@flymind.com
            </p>
          </div>
        </div>
      `
    );

    console.log("Reply email sent:", emailResponse);

    return new Response(
      JSON.stringify({ success: true, data: emailResponse }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in send-inquiry-reply:", error);
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
