import { NextResponse } from "next/server";
import { Resend } from "resend";

// Good-enough email shape check for a contact form (not full RFC 5322 validation).
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Prevents visitor input from being interpreted as HTML when it lands in the email body.
function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  message?: unknown;
  company?: unknown;
  opportunityType?: unknown;
};

function asTrimmedString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as ContactPayload | null;

  if (!body) {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = asTrimmedString(body.name);
  const email = asTrimmedString(body.email);
  const phone = asTrimmedString(body.phone);
  const message = asTrimmedString(body.message);
  const company = asTrimmedString(body.company);
  const opportunityType = asTrimmedString(body.opportunityType);

  // name, email, and phone are required. message is optional and never blocks submission.
  if (!name) {
    return NextResponse.json({ error: "Name is required." }, { status: 400 });
  }
  if (!email || !EMAIL_PATTERN.test(email)) {
    return NextResponse.json({ error: "A valid email is required." }, { status: 400 });
  }
  if (!phone) {
    return NextResponse.json({ error: "Phone is required." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !toEmail || !fromEmail) {
    console.error("Contact form is missing RESEND_API_KEY, CONTACT_TO_EMAIL, or CONTACT_FROM_EMAIL.");
    return NextResponse.json({ error: "Email is not configured." }, { status: 500 });
  }

  // Created here (not at module scope) so an unset key can't crash the build or the whole route module.
  const resend = new Resend(apiKey);

  const htmlLines = [
    `<p><strong>Name:</strong> ${escapeHtml(name)}</p>`,
    `<p><strong>Email:</strong> ${escapeHtml(email)}</p>`,
    company ? `<p><strong>Company:</strong> ${escapeHtml(company)}</p>` : "",
    `<p><strong>Phone:</strong> ${escapeHtml(phone)}</p>`,
    opportunityType ? `<p><strong>Opportunity type:</strong> ${escapeHtml(opportunityType)}</p>` : "",
    `<p><strong>Message:</strong> ${message ? escapeHtml(message) : "Not provided"}</p>`,
  ].filter(Boolean);

  const textLines = [
    `Name: ${name}`,
    `Email: ${email}`,
    company ? `Company: ${company}` : "",
    `Phone: ${phone}`,
    opportunityType ? `Opportunity type: ${opportunityType}` : "",
    `Message: ${message ? message : "Not provided"}`,
  ].filter(Boolean);

  try {
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: email,
      subject: `New website message from ${name}`,
      html: `<h2>New website contact form submission</h2>${htmlLines.join("")}`,
      text: textLines.join("\n"),
    });

    if (error) {
      console.error("Resend failed to send the contact email:", error);
      return NextResponse.json({ error: "Failed to send message. Please try again." }, { status: 502 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Unexpected error sending the contact email:", err);
    return NextResponse.json({ error: "Failed to send message. Please try again." }, { status: 500 });
  }
}
