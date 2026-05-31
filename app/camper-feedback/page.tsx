'use client'

import { useState, useTransition } from 'react'
import { submitCamperFeedback } from '@/app/actions/feedback'
import { PrayingHands } from '@/components/shared/Icons'

const RATINGS = [1, 2, 3, 4, 5]

export default function CamperFeedbackPage() {
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)
  const [form, setForm] = useState<{
    camper_name: string
    age: string
    favorite_part: string
    improvements: string
    comments: string
    would_return: boolean | null
  }>({
    camper_name: '',
    age: '',
    favorite_part: '',
    improvements: '',
    comments: '',
    would_return: null,
  })
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [isPending, startTransition] = useTransition()

  function update(field: string, value: string | boolean) {
    setForm(f => ({ ...f, [field]: value }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.camper_name.trim()) { setError('Please tell us your name.'); return }
    if (rating === 0) { setError('Please pick how much you enjoyed camp.'); return }
    if (form.would_return === null) {
      setError('Please tell us whether you would come back.')
      return
    }
    setError('')
    const wouldReturn = form.would_return
    startTransition(async () => {
      const res = await submitCamperFeedback({
        camper_name: form.camper_name,
        age: form.age,
        rating,
        favorite_part: form.favorite_part,
        improvements: form.improvements,
        would_return: wouldReturn,
        comments: form.comments,
      })
      if (res.success) setSubmitted(true)
      else setError(res.error ?? 'Something went wrong. Please try again.')
    })
  }

  if (submitted) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #070d4f 0%, #1f2fe6 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
        <div style={{ background: '#ffffff', borderRadius: '24px', padding: '48px 40px', maxWidth: '480px', width: '100%', textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
            <PrayingHands size={48} style={{ color: '#059669' }} />
          </div>
          <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '24px', fontWeight: 800, color: '#0d1787', marginBottom: '12px' }}>
            Thank You!
          </h2>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '15px', color: '#6b7280', lineHeight: 1.65 }}>
            Thanks for sharing! Your answers help us make the next camp even better.
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
      <style>{`
        .feedback-field::placeholder { color: #6b7280; opacity: 1; }
      `}</style>
      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, #065f46 0%, #059669 100%)', paddingTop: '120px', paddingBottom: '64px' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
          <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(28px, 6vw, 42px)', fontWeight: 800, color: '#ffffff', lineHeight: 1.1, marginBottom: '12px' }}>
            How Was Camp?
          </h1>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', color: 'rgba(255,255,255,0.8)', lineHeight: 1.65 }}>
            Tell us what you thought of the Rise &amp; Thrive Bootcamp. There are no wrong answers!
          </p>
        </div>
      </div>

      {/* Form */}
      <div style={{ background: '#f8f9fb', padding: '48px 24px 80px' }}>
        <form onSubmit={handleSubmit} style={{ maxWidth: '600px', margin: '0 auto' }}>
          <div style={{ background: '#ffffff', borderRadius: '20px', border: '1.5px solid #cbd5e1', padding: '36px', display: 'flex', flexDirection: 'column', gap: '24px' }}>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>
                  Your Name <span style={{ color: '#dc2626' }}>*</span>
                </label>
                <input
                  className="feedback-field"
                  value={form.camper_name}
                  onChange={e => update('camper_name', e.target.value)}
                  placeholder="Your full name"
                  style={{ width: '100%', border: '1.5px solid #cbd5e1', borderRadius: '8px', padding: '10px 14px', fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#1a1a2e', boxSizing: 'border-box' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>
                  Age
                </label>
                <input
                  className="feedback-field"
                  value={form.age}
                  onChange={e => update('age', e.target.value)}
                  placeholder="How old are you?"
                  inputMode="numeric"
                  style={{ width: '100%', border: '1.5px solid #cbd5e1', borderRadius: '8px', padding: '10px 14px', fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#1a1a2e', boxSizing: 'border-box' }}
                />
              </div>
            </div>

            {/* Rating */}
            <div>
              <label style={{ display: 'block', fontFamily: 'Space Grotesk, sans-serif', fontSize: '16px', fontWeight: 700, color: '#0d1787', marginBottom: '12px' }}>
                How much did you enjoy camp? <span style={{ color: '#dc2626' }}>*</span>
              </label>
              <div
                role="radiogroup"
                aria-label={rating > 0 ? `Rating: ${rating} of 5` : 'Rating: not selected'}
                style={{ display: 'flex', gap: '8px' }}
              >
                {RATINGS.map(n => {
                  const active = (hover || rating) >= n
                  return (
                    <button
                      key={n}
                      type="button"
                      role="radio"
                      aria-checked={rating === n}
                      aria-label={`${n} of 5 stars`}
                      onClick={() => setRating(n)}
                      onMouseEnter={() => setHover(n)}
                      onMouseLeave={() => setHover(0)}
                      onFocus={() => setHover(n)}
                      onBlur={() => setHover(0)}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '4px',
                        lineHeight: 0,
                        transform: active ? 'scale(1.12)' : 'scale(1)',
                        transition: 'transform 0.15s',
                      }}
                    >
                      <svg
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill={active ? '#059669' : 'none'}
                        stroke={active ? '#059669' : '#cbd5e1'}
                        strokeWidth="1.75"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M12 2.5l2.9 6.06 6.6.9-4.8 4.62 1.16 6.52L12 18.6l-5.86 2.5L7.3 14.58 2.5 9.96l6.6-.9z" />
                      </svg>
                    </button>
                  )
                })}
              </div>
              {rating > 0 && (
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#059669', marginTop: '8px' }}>
                  {['', 'Not great', 'It was okay', 'Good fun', 'Really fun', 'The best!'][rating]} ({rating}/5 stars)
                </p>
              )}
            </div>

            <div>
              <label style={{ display: 'block', fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>
                What was your favorite part of camp?
              </label>
              <textarea
                className="feedback-field"
                value={form.favorite_part}
                onChange={e => update('favorite_part', e.target.value)}
                rows={3}
                placeholder="The activity, lesson, or moment you liked most…"
                style={{ width: '100%', border: '1.5px solid #cbd5e1', borderRadius: '8px', padding: '10px 14px', fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#1a1a2e', resize: 'vertical', boxSizing: 'border-box' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>
                What would you change?
              </label>
              <textarea
                className="feedback-field"
                value={form.improvements}
                onChange={e => update('improvements', e.target.value)}
                rows={3}
                placeholder="Anything you'd do differently or want more of…"
                style={{ width: '100%', border: '1.5px solid #cbd5e1', borderRadius: '8px', padding: '10px 14px', fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#1a1a2e', resize: 'vertical', boxSizing: 'border-box' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '10px' }}>
                Would you come back next time?
              </label>
              <div role="radiogroup" aria-label="Would you come back" style={{ display: 'flex', gap: '12px' }}>
                {[true, false].map(v => {
                  const selected = form.would_return === v
                  return (
                    <button
                      key={String(v)}
                      type="button"
                      role="radio"
                      aria-checked={selected}
                      onClick={() => update('would_return', v)}
                      style={{
                        flex: 1,
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        padding: '12px',
                        borderRadius: '10px',
                        border: `2px solid ${selected ? '#1f2fe6' : '#cbd5e1'}`,
                        background: selected ? '#eff1fe' : '#ffffff',
                        color: selected ? '#1f2fe6' : '#6b7280',
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '14px',
                        fontWeight: 600,
                        cursor: 'pointer',
                      }}
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                        style={{ transform: v ? 'none' : 'scaleY(-1)' }}
                      >
                        <path d="M7 10v11" />
                        <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z" />
                      </svg>
                      {v ? 'Yes' : 'No'}
                    </button>
                  )
                })}
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>
                Anything else you want to tell us?
              </label>
              <textarea
                className="feedback-field"
                value={form.comments}
                onChange={e => update('comments', e.target.value)}
                rows={3}
                placeholder="Anything else on your mind…"
                style={{ width: '100%', border: '1.5px solid #cbd5e1', borderRadius: '8px', padding: '10px 14px', fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#1a1a2e', resize: 'vertical', boxSizing: 'border-box' }}
              />
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
