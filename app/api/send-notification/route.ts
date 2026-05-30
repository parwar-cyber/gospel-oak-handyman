import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

interface NotificationPayload {
  name: string;
  email: string;
  phone?: string;
  service: string;
  message: string;
}

export async function POST(request: Request) {
  try {
    const body: NotificationPayload = await request.json();
    const { name, email, phone, service, message } = body;

    if (!name || !email || !service || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const gmailUser = process.env.GMAIL_USER;
    const gmailPassword = process.env.GMAIL_APP_PASSWORD;

    if (!gmailUser || !gmailPassword) {
      console.warn("Email credentials not configured — skipping notification");
      return NextResponse.json({ success: true, emailSent: false });
    }

    const timestamp = new Date().toLocaleString("en-GB", {
      timeZone: "Europe/London",
    });

    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL ||
      (process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "http://localhost:3000");

    const subject = `New Job Request — ${name} — ${service}`;

    const plainText = `New request received on the Gospel Oak Handyman website.

Name: ${name}
Email: ${email}
Phone: ${phone || "Not provided"}
Service: ${service}
Message: ${message}
Submitted: ${timestamp}

View all requests in admin: ${siteUrl}/admin`;

    const html = `
      <h2>New Job Request</h2>
      <p>New request received on the Gospel Oak Handyman website.</p>
      <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
        <tr><td style="padding: 8px; font-weight: bold;">Name</td><td style="padding: 8px;">${name}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Email</td><td style="padding: 8px;"><a href="mailto:${email}">${email}</a></td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Phone</td><td style="padding: 8px;">${phone || "Not provided"}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Service</td><td style="padding: 8px;">${service}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Message</td><td style="padding: 8px;">${message}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Submitted</td><td style="padding: 8px;">${timestamp}</td></tr>
      </table>
      <p><a href="${siteUrl}/admin">View all requests in admin</a></p>
    `;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: gmailUser,
        pass: gmailPassword,
      },
    });

    await transporter.sendMail({
      from: gmailUser,
      to: gmailUser,
      replyTo: email,
      subject,
      text: plainText,
      html,
    });

    return NextResponse.json({ success: true, emailSent: true });
  } catch (error) {
    console.error("Email notification error:", error);
    return NextResponse.json(
      { error: "Failed to send notification" },
      { status: 500 }
    );
  }
}
