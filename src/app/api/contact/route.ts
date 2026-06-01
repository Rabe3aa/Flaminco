import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtpout.secureserver.net",
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  authMethod: "LOGIN",
});

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

    await transporter.sendMail({
      from: `"Flaminco Website" <${process.env.SMTP_USER}>`,
      to: "info@flaminco.agency",
      replyTo: email,
      subject: `New Contact: ${fullName}${company ? ` (${company})` : ""}`,
      html: `
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
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[contact] SMTP error:", err);
    return NextResponse.json({ error: "Failed to send message." }, { status: 500 });
  }
}
