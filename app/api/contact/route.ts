import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import nodemailer from "nodemailer";

// Route handlers must run in Node so nodemailer can open an SMTP connection.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const RECIPIENT_EMAIL =
  process.env.CONTACT_RECIPIENT_EMAIL || "picturethemoments42@gmail.com";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function toString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: NextRequest) {
  let payload: Record<string, unknown>;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  // Honeypot field: if a bot filled the hidden field, silently pretend success.
  if (toString(payload._gotcha)) {
    return NextResponse.json({ ok: true });
  }

  const name = toString(payload.name).slice(0, 120);
  const email = toString(payload.email).slice(0, 254);
  const eventType = toString(payload.eventType).slice(0, 80);
  const dateLocation = toString(payload.dateLocation).slice(0, 200);
  const message = toString(payload.message).slice(0, 5000);

  if (!name) {
    return NextResponse.json({ error: "Please provide your name." }, { status: 400 });
  }
  if (!EMAIL_REGEX.test(email)) {
    return NextResponse.json(
      { error: "Please provide a valid email address." },
      { status: 400 }
    );
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  const port = Number(SMTP_PORT) || 587;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    console.error("Contact form: SMTP credentials are not configured.");
    return NextResponse.json(
      { error: "The email service is not configured yet." },
      { status: 500 }
    );
  }

  try {
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port,
      secure: port === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    await transporter.sendMail({
      from: `"Picture the Moment Website" <${SMTP_USER}>`,
      to: RECIPIENT_EMAIL,
      replyTo: email,
      subject: `New enquiry from ${name}`,
      text: [
        "A website enquiry has been submitted from the Picture the Moment contact page.",
        "",
        `Name: ${name}`,
        `Email: ${email}`,
        `Event type: ${eventType || "-"}`,
        `Date & location: ${dateLocation || "-"}`,
        "",
        "Message:",
        message || "-",
        "",
        "--",
        "Sent from picture-the-moments contact form.",
      ].join("\n"),
    });
  } catch (error) {
    console.error("Contact form: failed to send enquiry email.", error);
    return NextResponse.json(
      { error: "The enquiry could not be sent. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}