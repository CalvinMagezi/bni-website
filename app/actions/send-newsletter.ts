'use server'

import { createClient } from '@/lib/supabase/server'

export type RecipientType = 'subscribers' | 'enrolled' | 'custom'

export interface SendNewsletterParams {
  subject: string
  html: string
  recipientType: RecipientType
  customEmails?: string[]
}

async function getRecipientEmails(recipientType: RecipientType, customEmails?: string[]) {
  const supabase = await createClient()

  if (recipientType === 'custom') {
    return (customEmails ?? []).map(e => e.trim()).filter(Boolean)
  }

  if (recipientType === 'subscribers') {
    const { data } = await supabase.from('newsletter_subscribers').select('email')
    return (data ?? []).map(r => r.email)
  }

  if (recipientType === 'enrolled') {
    const { data } = await supabase.from('enrollments').select('parent_email')
    if (data && data.length > 0) {
      return (data as Array<{ parent_email: string }>).map(r => r.parent_email).filter(Boolean)
    }
    const { data: intakes } = await supabase.from('enrollment_intakes').select('parent_email')
    return (intakes ?? []).map((r: { parent_email: string }) => r.parent_email).filter(Boolean)
  }

  return []
}

export async function sendNewsletter({ subject, html, recipientType, customEmails }: SendNewsletterParams) {
  const apiKey = process.env.RESEND_API_KEY

  if (!apiKey) {
    if (process.env.NODE_ENV !== 'production') {
      return { success: true, sent: 0, error: 'RESEND_API_KEY not set — email skipped in dev mode' }
    }
    return { success: false, sent: 0, error: 'Email service not configured. Add RESEND_API_KEY to environment.' }
  }

  const emails = [...new Set(await getRecipientEmails(recipientType, customEmails))]

  if (emails.length === 0) {
    return { success: false, sent: 0, error: 'No recipients found.' }
  }

  // Send in batches of 50 via BCC
  const BATCH_SIZE = 50
  let totalSent = 0

  for (let i = 0; i < emails.length; i += BATCH_SIZE) {
    const batch = emails.slice(i, i + BATCH_SIZE)
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: 'Boys Network International <noreply@boysnetworkinternational.com>',
        to: 'noreply@boysnetworkinternational.com',
        bcc: batch,
        subject,
        html,
      }),
    })

    if (!res.ok) {
      const err = await res.text()
      return { success: false, sent: totalSent, error: `Send failed on batch ${i / BATCH_SIZE + 1}: ${err}` }
    }
    totalSent += batch.length
  }

  return { success: true, sent: totalSent }
}
