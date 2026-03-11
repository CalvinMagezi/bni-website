'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function NewsletterSignup() {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim()) return
    setDone(true)
  }

  return (
    <div
      style={{
        background: 'linear-gradient(135deg, #1f2fe6 0%, #070d4f 100%)',
        borderRadius: '20px',
        padding: '28px 28px 24px',
      }}
    >
      <p className="text-white/60 text-xs uppercase tracking-widest mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>
        Weekly Newsletter
      </p>
      <h3
        className="text-white font-bold mb-2 leading-snug"
        style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.15rem' }}
      >
        Stay in the Loop
      </h3>
      <p className="text-white/70 text-sm mb-5 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
        Get weekly camp highlights, upcoming events, and impact stories — straight to your inbox.
      </p>

      <AnimatePresence mode="wait">
        {done ? (
          <motion.div
            key="done"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-white text-sm"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            <span className="text-xl">🎉</span>
            <span>You're subscribed! Look out for your first edition.</span>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            className="flex flex-col gap-2"
          >
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Your email address"
              className="w-full text-sm outline-none"
              style={{
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '100px',
                padding: '11px 18px',
                color: '#ffffff',
                fontFamily: 'Inter, sans-serif',
              }}
            />
            <button
              type="submit"
              className="w-full text-sm font-bold py-3 rounded-full transition-opacity hover:opacity-90"
              style={{
                background: '#ffffff',
                color: '#070d4f',
                fontFamily: 'Space Grotesk, sans-serif',
                cursor: 'pointer',
                border: 'none',
              }}
            >
              Subscribe →
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}
