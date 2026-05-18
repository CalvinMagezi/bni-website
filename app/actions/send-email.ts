'use server'

const FROM = process.env.RESEND_FROM_EMAIL ?? 'Boys Network International <onboarding@resend.dev>'
const API_KEY = process.env.RESEND_API_KEY

async function sendOne(to: string, subject: string, html: string) {
  if (!API_KEY) return
  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from: FROM, to, subject, html }),
  })
}

export async function sendEnrollmentConfirmation({
  parent_email,
  parent_name,
  boy_name,
  payment_preference,
}: {
  parent_email: string
  parent_name: string
  boy_name: string
  payment_preference: string | null
}) {
  const paymentBlock =
    payment_preference === 'airtel'
      ? `<p>Airtel Money merchant code: <strong>4395441</strong> (dial *185*9#)</p>`
      : `<p>MTN MoMo merchant code: <strong>657538</strong> (dial *165*3#)</p>`

  await sendOne(
    parent_email,
    `Enrollment received — ${boy_name} | Rise & Thrive Bootcamp 2026`,
    `<div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#1a1a2e">
      <h2 style="color:#070d4f">Hi ${parent_name},</h2>
      <p>We've received <strong>${boy_name}'s</strong> enrollment for the <strong>Rise &amp; Thrive Bootcamp 2026</strong> (23–29 August, Uganda).</p>
      <p>To secure his place, please complete payment using the details below:</p>
      ${paymentBlock}
      <p style="background:#f3f4f8;padding:16px;border-radius:8px">
        Your enrollment is currently marked <strong>pending</strong> until payment is confirmed.<br>
        You'll receive another email once it's confirmed.
      </p>
      <p>Questions? WhatsApp us on <a href="https://wa.me/256791408459">+256 791 408 459</a> or reply to this email.</p>
      <p style="color:#6b7280;font-size:13px;margin-top:32px">Boys Network International · theboysnetworkinternational@gmail.com</p>
    </div>`,
  )
}

export async function sendFeedbackSurvey({
  parent_email,
  parent_name,
  boy_name,
}: {
  parent_email: string
  parent_name: string
  boy_name: string
}) {
  await sendOne(
    parent_email,
    `How did ${boy_name} find camp? Share your feedback`,
    `<div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#1a1a2e">
      <h2 style="color:#070d4f">Hi ${parent_name},</h2>
      <p>Thank you for sending <strong>${boy_name}</strong> to the Rise &amp; Thrive Bootcamp 2026. We hope it was a transformative experience.</p>
      <p>We'd love to hear how it went — your feedback helps us improve every year.</p>
      <p style="text-align:center;margin:32px 0">
        <a href="https://boysnetworkinternational.com/feedback"
           style="background:#070d4f;color:#fff;padding:14px 28px;border-radius:100px;text-decoration:none;font-weight:700">
          Share Your Feedback →
        </a>
      </p>
      <p style="color:#6b7280;font-size:13px;margin-top:32px">Boys Network International · theboysnetworkinternational@gmail.com</p>
    </div>`,
  )
}
