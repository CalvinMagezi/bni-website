'use client'

import { useState, useTransition } from 'react'
import { sendNewsletter } from '@/app/actions/send-newsletter'

const TEMPLATES = [
  {
    id: 'camp-reminder',
    label: 'Camp Reminder',
    subject: 'Rise & Thrive Bootcamp 2026 — Enrollment Open!',
    html: `<div style="font-family:Inter,sans-serif;max-width:600px;margin:0 auto;color:#1a1a2e">
  <div style="background:linear-gradient(135deg,#1f2fe6,#070d4f);padding:40px 32px;border-radius:16px 16px 0 0;text-align:center">
    <h1 style="color:#fff;font-family:'Space Grotesk',sans-serif;font-size:26px;margin:0">Rise & Thrive Bootcamp 2026</h1>
    <p style="color:rgba(255,255,255,0.8);margin:8px 0 0;font-size:14px">23–29 August 2026 · Uganda</p>
  </div>
  <div style="background:#fff;padding:32px;border:1px solid #e8eaf0;border-radius:0 0 16px 16px">
    <p style="font-size:16px;line-height:1.7">Dear Parent / Guardian,</p>
    <p style="font-size:15px;line-height:1.7">Enrollment for the <strong>Rise & Thrive Bootcamp 2026</strong> is now open. Spaces are limited to 150 boys — secure your son's place today.</p>
    <p style="font-size:15px;line-height:1.7">The 7-day camp covers spiritual grounding, leadership, life skills, and physical development.</p>
    <div style="text-align:center;margin:32px 0">
      <a href="https://boysnetworkinternational.com/enroll" style="background:#1f2fe6;color:#fff;padding:14px 32px;border-radius:100px;text-decoration:none;font-weight:700;font-family:'Space Grotesk',sans-serif;font-size:15px">Enroll Now →</a>
    </div>
    <p style="font-size:13px;color:#6b7280">Questions? WhatsApp us: +256 791 408 459</p>
  </div>
</div>`,
  },
  {
    id: 'newsletter-update',
    label: 'General Update',
    subject: 'BNI Update — News from Boys Network International',
    html: `<div style="font-family:Inter,sans-serif;max-width:600px;margin:0 auto;color:#1a1a2e">
  <div style="background:linear-gradient(135deg,#1f2fe6,#070d4f);padding:32px;border-radius:16px 16px 0 0">
    <h1 style="color:#fff;font-family:'Space Grotesk',sans-serif;font-size:22px;margin:0">Boys Network International</h1>
  </div>
  <div style="background:#fff;padding:32px;border:1px solid #e8eaf0;border-radius:0 0 16px 16px">
    <h2 style="font-family:'Space Grotesk',sans-serif;color:#0d1787">Update from BNI</h2>
    <p style="font-size:15px;line-height:1.7">[Write your update here…]</p>
    <hr style="border:none;border-top:1px solid #e8eaf0;margin:24px 0">
    <p style="font-size:12px;color:#9ca3af">You received this because you subscribed to BNI updates. <a href="https://boysnetworkinternational.com" style="color:#1f2fe6">Visit our website</a></p>
  </div>
</div>`,
  },
  {
    id: 'feedback-request',
    label: 'Feedback Request',
    subject: 'Share Your Experience — BNI Camp Feedback',
    html: `<div style="font-family:Inter,sans-serif;max-width:600px;margin:0 auto;color:#1a1a2e">
  <div style="background:linear-gradient(135deg,#059669,#065f46);padding:40px 32px;border-radius:16px 16px 0 0;text-align:center">
    <h1 style="color:#fff;font-family:'Space Grotesk',sans-serif;font-size:24px;margin:0">How was the Camp?</h1>
    <p style="color:rgba(255,255,255,0.8);margin:8px 0 0;font-size:14px">Your feedback shapes the next bootcamp</p>
  </div>
  <div style="background:#fff;padding:32px;border:1px solid #e8eaf0;border-radius:0 0 16px 16px">
    <p style="font-size:15px;line-height:1.7">Dear Parent / Guardian,</p>
    <p style="font-size:15px;line-height:1.7">We hope your son had an incredible time at the <strong>Rise & Thrive Bootcamp</strong>. We'd love to hear your thoughts — it only takes 2 minutes.</p>
    <div style="text-align:center;margin:32px 0">
      <a href="https://boysnetworkinternational.com/feedback" style="background:#059669;color:#fff;padding:14px 32px;border-radius:100px;text-decoration:none;font-weight:700;font-family:'Space Grotesk',sans-serif;font-size:15px">Leave Feedback →</a>
    </div>
    <p style="font-size:13px;color:#6b7280">Thank you for trusting us with your son's development. — The BNI Team</p>
  </div>
</div>`,
  },
  {
    id: 'magazine',
    label: 'New Magazine Issue',
    subject: 'New TBNI Magazine Issue Out Now!',
    html: `<div style="font-family:Inter,sans-serif;max-width:600px;margin:0 auto;color:#1a1a2e">
  <div style="background:linear-gradient(135deg,#7c3aed,#4c1d95);padding:40px 32px;border-radius:16px 16px 0 0;text-align:center">
    <h1 style="color:#fff;font-family:'Space Grotesk',sans-serif;font-size:24px;margin:0">New Magazine Issue</h1>
    <p style="color:rgba(255,255,255,0.8);margin:8px 0 0;font-size:14px">The Boys Network International Magazine</p>
  </div>
  <div style="background:#fff;padding:32px;border:1px solid #e8eaf0;border-radius:0 0 16px 16px">
    <p style="font-size:15px;line-height:1.7">A new issue of the TBNI Magazine is now available! Read stories, articles, and updates from the Boys Network community.</p>
    <div style="text-align:center;margin:32px 0">
      <a href="https://boysnetworkinternational.com/magazine" style="background:#7c3aed;color:#fff;padding:14px 32px;border-radius:100px;text-decoration:none;font-weight:700;font-family:'Space Grotesk',sans-serif;font-size:15px">Read Now →</a>
    </div>
    <p style="font-size:13px;color:#6b7280">Share with friends and family in the BNI community.</p>
  </div>
</div>`,
  },
]

export default function NewslettersPage() {
  const [activeTemplate, setActiveTemplate] = useState(TEMPLATES[0].id)
  const [subject, setSubject] = useState(TEMPLATES[0].subject)
  const [html, setHtml] = useState(TEMPLATES[0].html)
  const [recipientType, setRecipientType] = useState<'subscribers' | 'enrolled' | 'custom'>('subscribers')
  const [customEmails, setCustomEmails] = useState('')
  const [result, setResult] = useState<{ success: boolean; sent?: number; error?: string } | null>(null)
  const [isPending, startTransition] = useTransition()

  function applyTemplate(id: string) {
    const t = TEMPLATES.find(t => t.id === id)
    if (!t) return
    setActiveTemplate(id)
    setSubject(t.subject)
    setHtml(t.html)
  }

  function handleSend() {
    setResult(null)
    startTransition(async () => {
      const res = await sendNewsletter({
        subject,
        html,
        recipientType,
        customEmails: customEmails.split(',').map(e => e.trim()).filter(Boolean),
      })
      setResult(res)
    })
  }

  return (
    <div>
      <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '26px', fontWeight: 700, color: '#0d1787', marginBottom: '8px' }}>
        Send Newsletter
      </h1>
      <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#6b7280', marginBottom: '28px' }}>
        Compose and send emails to parents, subscribers, or a custom list.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '24px', alignItems: 'start' }}>
        {/* Left: controls */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Templates */}
          <div style={{ background: '#ffffff', borderRadius: '12px', border: '1.5px solid #e5e7eb', padding: '20px' }}>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>
              Templates
            </p>
            {TEMPLATES.map(t => (
              <button
                key={t.id}
                onClick={() => applyTemplate(t.id)}
                style={{
                  display: 'block',
                  width: '100%',
                  textAlign: 'left',
                  padding: '9px 12px',
                  borderRadius: '7px',
                  border: 'none',
                  background: activeTemplate === t.id ? '#eff1fe' : 'transparent',
                  color: activeTemplate === t.id ? '#1f2fe6' : '#374151',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '13px',
                  fontWeight: activeTemplate === t.id ? 600 : 400,
                  cursor: 'pointer',
                  marginBottom: '2px',
                }}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Recipients */}
          <div style={{ background: '#ffffff', borderRadius: '12px', border: '1.5px solid #e5e7eb', padding: '20px' }}>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>
              Recipients
            </p>
            {(['subscribers', 'enrolled', 'custom'] as const).map(type => (
              <label key={type} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px', cursor: 'pointer' }}>
                <input
                  type="radio"
                  name="recipient"
                  value={type}
                  checked={recipientType === type}
                  onChange={() => setRecipientType(type)}
                  style={{ accentColor: '#1f2fe6' }}
                />
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#374151', textTransform: 'capitalize' }}>
                  {type === 'subscribers' ? 'Newsletter subscribers' : type === 'enrolled' ? 'Enrolled parents' : 'Custom list'}
                </span>
              </label>
            ))}
            {recipientType === 'custom' && (
              <textarea
                value={customEmails}
                onChange={e => setCustomEmails(e.target.value)}
                placeholder="email1@example.com, email2@example.com"
                rows={3}
                style={{ width: '100%', border: '1.5px solid #e5e7eb', borderRadius: '7px', padding: '8px 10px', fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#374151', resize: 'vertical', outline: 'none', boxSizing: 'border-box', marginTop: '4px' }}
              />
            )}
          </div>

          {/* Send */}
          <button
            onClick={handleSend}
            disabled={isPending || !subject.trim() || !html.trim()}
            style={{
              background: isPending ? '#9ca3af' : '#1f2fe6',
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              padding: '12px',
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: '14px',
              fontWeight: 700,
              cursor: isPending ? 'not-allowed' : 'pointer',
              width: '100%',
            }}
          >
            {isPending ? 'Sending…' : 'Send Newsletter'}
          </button>

          {result && (
            <div style={{
              padding: '12px 16px',
              borderRadius: '8px',
              background: result.success ? '#f0fdf4' : '#fef2f2',
              border: `1.5px solid ${result.success ? '#bbf7d0' : '#fecaca'}`,
            }}>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: result.success ? '#166534' : '#991b1b', margin: 0 }}>
                {result.success ? `✓ Sent to ${result.sent} recipients` : `✗ ${result.error}`}
              </p>
            </div>
          )}
        </div>

        {/* Right: composer */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ background: '#ffffff', borderRadius: '12px', border: '1.5px solid #e5e7eb', padding: '20px' }}>
            <label style={{ display: 'block', fontFamily: 'Inter, sans-serif', fontSize: '12px', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
              Subject Line
            </label>
            <input
              value={subject}
              onChange={e => setSubject(e.target.value)}
              style={{ width: '100%', border: '1.5px solid #e5e7eb', borderRadius: '7px', padding: '10px 12px', fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#1a1a2e', outline: 'none', boxSizing: 'border-box' }}
            />
          </div>

          <div style={{ background: '#ffffff', borderRadius: '12px', border: '1.5px solid #e5e7eb', padding: '20px' }}>
            <label style={{ display: 'block', fontFamily: 'Inter, sans-serif', fontSize: '12px', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
              HTML Body
            </label>
            <textarea
              value={html}
              onChange={e => setHtml(e.target.value)}
              rows={18}
              style={{ width: '100%', border: '1.5px solid #e5e7eb', borderRadius: '7px', padding: '10px 12px', fontFamily: '"SF Mono", "Fira Code", monospace', fontSize: '12px', color: '#1a1a2e', resize: 'vertical', outline: 'none', boxSizing: 'border-box', lineHeight: 1.6 }}
            />
          </div>

          {/* Preview */}
          <div style={{ background: '#ffffff', borderRadius: '12px', border: '1.5px solid #e5e7eb', padding: '20px' }}>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>
              Preview
            </p>
            <div
              style={{ border: '1px solid #f3f4f6', borderRadius: '8px', padding: '16px', background: '#fafafa' }}
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
