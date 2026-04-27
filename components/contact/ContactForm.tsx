'use client'

import { useState } from 'react'
import { submitContact } from '@/app/actions/contact'

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '12px 16px',
  borderRadius: '8px',
  border: '1.5px solid #e5e7eb',
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  color: '#515c63',
  outline: 'none',
  transition: 'border-color 0.2s',
  background: '#ffffff',
}

export default function ContactForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    agreed: false,
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const fd = new FormData()
    fd.set('name', form.name)
    fd.set('email', form.email)
    fd.set('phone', form.phone)
    fd.set('message', form.message)
    if (form.agreed) fd.set('agreed', 'on')
    const result = await submitContact(fd)
    if (result.success) setSubmitted(true)
  }

  if (submitted) {
    return (
      <div
        className="flex flex-col items-center justify-center text-center py-16 px-8 rounded-2xl"
        style={{ background: '#f3f4f8' }}
      >
        <div className="text-4xl mb-4">✅</div>
        <h3
          className="text-bni-navy font-bold text-xl mb-2"
          style={{ fontFamily: 'Space Grotesk, sans-serif' }}
        >
          Message received!
        </h3>
        <p className="text-bni-slate text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
          Thank you for reaching out. We&apos;ll get back to you shortly.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {/* Name */}
      <div className="flex flex-col gap-1.5">
        <label
          className="text-bni-navy text-sm font-medium"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          Name
        </label>
        <input
          type="text"
          placeholder="Jane Smith"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
          style={inputStyle}
        />
      </div>

      {/* Email */}
      <div className="flex flex-col gap-1.5">
        <label
          className="text-bni-navy text-sm font-medium"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          Email
        </label>
        <input
          type="email"
          placeholder="jane@example.com"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
          style={inputStyle}
        />
      </div>

      {/* Phone */}
      <div className="flex flex-col gap-1.5">
        <label
          className="text-bni-navy text-sm font-medium"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          Phone Number
        </label>
        <input
          type="tel"
          placeholder="0700 000 000"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          style={inputStyle}
        />
      </div>

      {/* Message */}
      <div className="flex flex-col gap-1.5">
        <label
          className="text-bni-navy text-sm font-medium"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          Your Message
        </label>
        <textarea
          placeholder="How can we help you?"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          required
          rows={5}
          style={{ ...inputStyle, resize: 'vertical' }}
        />
      </div>

      {/* T&C */}
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          id="terms"
          checked={form.agreed}
          onChange={(e) => setForm({ ...form, agreed: e.target.checked })}
          required
          className="mt-0.5 w-4 h-4 accent-bni-blue"
        />
        <label
          htmlFor="terms"
          className="text-bni-slate text-sm"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          I accept the Terms &amp; Conditions.
        </label>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="inline-flex items-center justify-center text-white font-bold text-sm hover:opacity-90 transition-opacity mt-2"
        style={{
          background: '#1f2fe6',
          borderRadius: '100px',
          padding: '14px 32px',
          fontFamily: 'Space Grotesk, sans-serif',
          border: 'none',
          cursor: 'pointer',
          alignSelf: 'flex-start',
        }}
      >
        Submit
      </button>
    </form>
  )
}
