import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim();
    const company = String(body.company || "").trim();
    const service = String(body.service || "").trim();
    const budget = String(body.budget || "").trim();
    const message = String(body.message || "").trim();
    const website = String(body.website || "").trim();

    if (website) {
      return NextResponse.json({ success: true });
    }

    if (!name || !email || !service || !message) {
      return NextResponse.json(
        { error: "Please complete all required fields." },
        { status: 400 },
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 },
      );
    }

    const host = process.env.SMTP_HOST;
    const port = Number(process.env.SMTP_PORT || "587");
    const user = process.env.SMTP_USER;
    const password = process.env.SMTP_PASS;

    if (!host || !user || !password) {
      return NextResponse.json(
        { error: "Email service is not configured. Please email hello@draxvane.com." },
        { status: 503 },
      );
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass: password },
    });

    await transporter.sendMail({
      from: process.env.SMTP_FROM || `"Draxvane Website" <${user}>`,
      to: "company@draxvane.com",
      replyTo: email,
      subject: `New project inquiry: ${service}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Company: ${company || "Not provided"}`,
        `Service: ${service}`,
        `Budget: ${budget || "Not provided"}`,
        "",
        "Project details:",
        message,
      ].join("\n"),
      html: `
        <div style="font-family:Arial,sans-serif;max-width:680px;color:#1c2430">
          <h2 style="margin-bottom:20px">New project inquiry</h2>
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Company:</strong> ${escapeHtml(company || "Not provided")}</p>
          <p><strong>Service:</strong> ${escapeHtml(service)}</p>
          <p><strong>Budget:</strong> ${escapeHtml(budget || "Not provided")}</p>
          <hr style="border:0;border-top:1px solid #ddd;margin:24px 0">
          <p><strong>Project details:</strong></p>
          <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact inquiry failed:", error);
    return NextResponse.json(
      { error: "We could not send your inquiry. Please try again or email hello@draxvane.com." },
      { status: 500 },
    );
  }
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    };
    return entities[character];
  });
}
