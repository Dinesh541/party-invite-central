
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface RSVPEmailRequest {
  name: string;
  email: string;
  attendance: string;
  guests?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, attendance, guests }: RSVPEmailRequest = await req.json();

    const attendanceText = attendance === 'yes' ? 'will be attending' : 'will not be attending';
    const guestText = guests ? ` with ${guests}` : '';

    // Using your verified domain email
    const emailResponse = await resend.emails.send({
      from: "Daksh Kalli <daksh@dakshkalli.com>",
      to: [email],
      subject: "🎉 RSVP Confirmation - Birthday Party!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #8B5CF6; text-align: center;">🎉 Birthday Party RSVP Confirmation</h1>
          
          <div style="background: linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%); padding: 30px; border-radius: 15px; color: white; text-align: center; margin: 20px 0;">
            <h2 style="margin: 0; font-size: 24px;">Thank You, ${name}!</h2>
            <p style="margin: 10px 0; font-size: 18px;">We've received your RSVP</p>
          </div>
          
          <div style="background: #F3F4F6; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">RSVP Details:</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Attendance:</strong> You ${attendanceText}${guestText}</p>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <h3 style="color: #8B5CF6;">Party Details</h3>
            <p>📅 <strong>Date:</strong> Saturday, June 15th, 2024</p>
            <p>⏰ <strong>Time:</strong> 11:00 AM onwards</p>
            <p>📍 <strong>Venue:</strong> Gilbert Community Center(OAK Room) - 130 N Oak St, Gilbert, AZ 85233</p>
            <p>🎈 <strong>Theme:</strong> Celebration & Fun!</p>
          </div>
          
          <div style="background: #FEF3C7; padding: 15px; border-radius: 8px; border-left: 4px solid #F59E0B;">
            <p style="margin: 0; color: #92400E;">
              <strong>Note:</strong> If you need to change your RSVP, please contact us directly. 
              We're excited to celebrate with you! 🎊
            </p>
          </div>
          
          <p style="text-align: center; margin-top: 30px; color: #6B7280;">
            Can't wait to see you at the party! 🎈<br>
            With love,<br>
            <strong>Daksh</strong>
          </p>
        </div>
      `,
    });

    console.log("RSVP confirmation email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-rsvp-confirmation function:", error);
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
