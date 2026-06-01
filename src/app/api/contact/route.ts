import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { firstName, lastName, email, company, message } = await request.json();

    if (!firstName || !email || !message) {
      return NextResponse.json(
        { error: "First name, email, and message are required." },
        { status: 400 }
      );
    }

    const fullName = [firstName, lastName].filter(Boolean).join(" ");

    const res = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "api-key": process.env.BREVO_API_KEY!,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sender: { name: "Flaminco Website", email: "info@flaminco.agency" },
        to: [{ email: "info@flaminco.agency" }],
        replyTo: { email, name: fullName },
        subject: `New Contact: ${fullName}${company ? ` (${company})` : ""}`,
        htmlContent: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #0072BB; margin-bottom: 24px;">New Contact Form Submission</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #666; width: 120px; vertical-align: top; font-weight: bold;">Name</td>
                <td style="padding: 8px 0; color: #111;">${fullName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666; vertical-align: top; font-weight: bold;">Email</td>
                <td style="padding: 8px 0; color: #111;"><a href="mailto:${email}" style="color: #0072BB;">${email}</a></td>
              </tr>
              ${company ? `<tr>
                <td style="padding: 8px 0; color: #666; vertical-align: top; font-weight: bold;">Company</td>
                <td style="padding: 8px 0; color: #111;">${company}</td>
              </tr>` : ""}
              <tr>
                <td style="padding: 8px 0; color: #666; vertical-align: top; font-weight: bold;">Message</td>
                <td style="padding: 8px 0; color: #111; white-space: pre-wrap;">${message}</td>
              </tr>
            </table>
            <hr style="margin-top: 32px; border: none; border-top: 1px solid #eee;" />
            <p style="color: #aaa; font-size: 12px; margin-top: 16px;">Sent from flaminco.agency contact form</p>
          </div>
        `,
      }),
    });

    if (!res.ok) {
      const err = await res.json();
      console.error("[contact] Brevo API error:", err);
      return NextResponse.json({ error: "Failed to send message." }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[contact] Error:", err);
    return NextResponse.json({ error: "Failed to send message." }, { status: 500 });
  }
}
