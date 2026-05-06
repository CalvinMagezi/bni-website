'use client'

import { useState, useTransition } from 'react'
import { submitFeedback } from '@/app/actions/feedback'

const RATINGS = [1, 2, 3, 4, 5]

export default function FeedbackPage() {
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)
  const [form, setForm] = useState({
    parent_name: '',
    parent_email: '',
    son_name: '',
    improvements: '',
    comments: '',
    would_recommend: true,
  })
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [isPending, startTransition] = useTransition()

  function update(field: string, value: string | boolean) {
    setForm(f => ({ ...f, [field]: value }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (rating === 0) { setError('Please select a rating.'); return }
    if (!form.parent_name.trim() || !form.parent_email.trim() || !form.son_name.trim()) {
      setError('Please fill in all required fields.')
      return
    }
    setError('')
    startTransition(async () => {
      const res = await submitFeedback({ ...form, rating, improvements: form.improvements })
      if (res.success) setSubmitted(true)
      else setError(res.error ?? 'Something went wrong. Please try again.')
    })
  }

  if (submitted) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #070d4f 0%, #1f2fe6 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
        <div style={{ background: '#ffffff', borderRadius: '24px', padding: '48px 40px', maxWidth: '480px', width: '100%', textAlign: 'center' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🙏</div>
          <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '24px', fontWeight: 800, color: '#0d1787', marginBottom: '12px' }}>
            Thank You!
          </h2>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '15px', color: '#6b7280', lineHeight: 1.65 }}>
            Your feedback has been recorded. It helps us make each camp better than the last.
          </p>
          <a
            href="/"
            style={{ display: 'inline-block', marginTop: '24px', background: '#1f2fe6', color: '#ffffff', borderRadius: '100px', padding: '12px 28px', fontFamily: 'Space Grotesk, sans-serif', fontSize: '14px', fontWeight: 700, textDecoration: 'none' }}
          >
            Back to Home
          </a>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, #065f46 0%, #059669 100%)', paddingTop: '120px', paddingBottom: '64px' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
          <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(28px, 6vw, 42px)', fontWeight: 800, color: '#ffffff', lineHeight: 1.1, marginBottom: '12px' }}>
            Share Your Experience
          </h1>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', color: 'rgba(255,255,255,0.8)', lineHeight: 1.65 }}>
            Help us improve the Rise &amp; Thrive Bootcamp. Takes less than 2 minutes.
          </p>
        </div>
      </div>

      {/* Form */}
      <div style={{ background: '#f8f9fb', padding: '48px 24px 80px' }}>
        <form onSubmit={handleSubmit} style={{ maxWidth: '600px', margin: '0 auto' }}>
          <div style={{ background: '#ffffff', borderRadius: '20px', border: '1.5px solid #e5e7eb', padding: '36px', display: 'flex', flexDirection: 'column', gap: '24px' }}>

            {/* Rating */}
            <div>
              <label style={{ display: 'block', fontFamily: 'Space Grotesk, sans-serif', fontSize: '16px', fontWeight: 700, color: '#0d1787', marginBottom: '12px' }}>
                How would you rate the camp overall? <span style={{ color: '#dc2626' }}>*</span>
              </label>
              <div style={{ display: 'flex', gap: '8px' }}>
                {RATINGS.map(n => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setRating(n)}
                    onMouseEnter={() => setHover(n)}
                    onMouseLeave={() => setHover(0)}
                    style={{
                      fontSize: '32px',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '4px',
                      opacity: (hover || rating) >= n ? 1 : 0.3,
                      transform: (hover || rating) >= n ? 'scale(1.15)' : 'scale(1)',
                      transition: 'opacity 0.15s, transform 0.15s',
                    }}
                  >
                    ⭐
                  </button>
                ))}
              </div>
              {rating > 0 && (
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#059669', marginTop: '8px' }}>
                  {['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'][rating]} — {rating}/5 stars
                </p>
              )}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>
                  Your Name <span style={{ color: '#dc2626' }}>*</span>
                </label>
                <input
                  value={form.parent_name}
                  onChange={e => update('parent_name', e.target.value)}
                  placeholder="Parent / Guardian name"
                  style={{ width: '100%', border: '1.5px solid #e5e7eb', borderRadius: '8px', padding: '10px 14px', fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#1a1a2e', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>
                  Son&apos;s Name <span style={{ color: '#dc2626' }}>*</span>
                </label>
                <input
                  value={form.son_name}
                  onChange={e => update('son_name', e.target.value)}
                  placeholder="Boy's full name"
                  style={{ width: '100%', border: '1.5px solid #e5e7eb', borderRadius: '8px', padding: '10px 14px', fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#1a1a2e', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>
                Your Email <span style={{ color: '#dc2626' }}>*</span>
              </label>
              <input
                type="email"
                value={form.parent_email}
                onChange={e => update('parent_email', e.target.value)}
                placeholder="parent@email.com"
                style={{ width: '100%', border: '1.5px solid #e5e7eb', borderRadius: '8px', padding: '10px 14px', fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#1a1a2e', outline: 'none', boxSizing: 'border-box' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>
                What could we improve?
              </label>
              <textarea
                value={form.improvements}
                onChange={e => update('improvements', e.target.value)}
                rows={3}
                placeholder="Suggestions, areas to improve, things that could be better…"
                style={{ width: '100%', border: '1.5px solid #e5e7eb', borderRadius: '8px', padding: '10px 14px', fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#1a1a2e', outline: 'none', resize: 'vertical', boxSizing: 'border-box' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>
                Additional Comments
              </label>
              <textarea
                value={form.comments}
                onChange={e => update('comments', e.target.value)}
                rows={3}
                placeholder="Anything else you'd like to share…"
                style={{ width: '100%', border: '1.5px solid #e5e7eb', borderRadius: '8px', padding: '10px 14px', fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#1a1a2e', outline: 'none', resize: 'vertical', boxSizing: 'border-box' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '10px' }}>
                Would you recommend this camp to other families?
              </label>
              <div style={{ display: 'flex', gap: '12px' }}>
                {[true, false].map(v => (
                  <button
                    key={String(v)}
                    type="button"
                    onClick={() => update('would_recommend', v)}
                    style={{
                      flex: 1,
                      padding: '12px',
                      borderRadius: '10px',
                      border: `2px solid ${form.would_recommend === v ? '#1f2fe6' : '#e5e7eb'}`,
                      background: form.would_recommend === v ? '#eff1fe' : '#ffffff',
                      color: form.would_recommend === v ? '#1f2fe6' : '#6b7280',
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '14px',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    {v ? '👍 Yes' : '👎 No'}
                  </button>
                ))}
              </div>
            </div>

            {error && (
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#dc2626', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', padding: '10px 14px', margin: 0 }}>
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={isPending}
              style={{
                background: isPending ? '#9ca3af' : '#059669',
                color: '#ffffff',
                border: 'none',
                borderRadius: '100px',
                padding: '14px',
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: '15px',
                fontWeight: 700,
                cursor: isPending ? 'not-allowed' : 'pointer',
              }}
            >
              {isPending ? 'Submitting…' : 'Submit Feedback'}
            </button>
          </div>
        </form>
      </div>
    </>
  )
}
