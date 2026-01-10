import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY")!;

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

  try {
    // Authenticate the request - only admins can send replies
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      console.log("No authorization header provided");
      return new Response(
        JSON.stringify({ error: "Unauthorized - No auth token provided" }),
        { status: 401, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const token = authHeader.replace("Bearer ", "");
    
    // Create Supabase client with the user's token
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      global: { headers: { Authorization: authHeader } }
    });

    // Verify the JWT and get claims
    const { data: claimsData, error: claimsError } = await supabase.auth.getClaims(token);
    if (claimsError || !claimsData?.claims) {
      console.log("JWT verification failed:", claimsError?.message);
      return new Response(
        JSON.stringify({ error: "Unauthorized - Invalid token" }),
        { status: 401, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const userId = claimsData.claims.sub;
    console.log("Authenticated user:", userId);

    // Check if user has admin role
    const { data: isAdmin, error: roleError } = await supabase.rpc('has_role', {
      _user_id: userId,
      _role: 'admin'
    });

    if (roleError || !isAdmin) {
      console.log("User is not admin:", userId, roleError?.message);
      return new Response(
        JSON.stringify({ error: "Forbidden - Admin access required" }),
        { status: 403, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    console.log("Admin access verified for user:", userId);

    const data: ReplyEmailRequest = await req.json();
    const { to, customerName, originalSubject, replyContent, senderName = "长凌科技客服" } = data;

    // Validate required fields
    if (!to || !customerName || !originalSubject || !replyContent) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(to)) {
      return new Response(
        JSON.stringify({ error: "Invalid email address" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Sanitize all user-provided content
    const safeCustomerName = escapeHtml(customerName);
    const safeOriginalSubject = escapeHtml(originalSubject);
    const safeReplyContent = escapeHtml(replyContent);
    const safeSenderName = escapeHtml(senderName);

    console.log("Sending reply email to:", to, "by admin:", userId);

    const emailResponse = await sendEmail(
      [to],
      `回复: ${safeOriginalSubject}`,
      `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%); padding: 30px; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 24px;">长凌科技</h1>
            <p style="color: rgba(255,255,255,0.8); margin: 5px 0 0 0; font-size: 14px;">CANI Technology</p>
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
              <p style="color: #666; font-size: 14px; margin: 5px 0 0 0;">长凌科技</p>
            </div>
          </div>
          
          <div style="background: #f1f5f9; padding: 20px; border-radius: 0 0 8px 8px; text-align: center;">
            <p style="color: #64748b; font-size: 12px; margin: 0;">
              此邮件由长凌科技客服团队发送
            </p>
            <p style="color: #64748b; font-size: 12px; margin: 5px 0 0 0;">
              电话: +8617674048404 | 邮箱: market@cani.com.cn
            </p>
          </div>
        </div>
      `
    );

    console.log("Reply email sent successfully:", emailResponse);

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
      JSON.stringify({ error: "Failed to send reply" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
