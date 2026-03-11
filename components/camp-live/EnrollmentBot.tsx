'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const INTEREST_OPTIONS = [
  'Spiritual Growth',
  'Leadership Development',
  'Practical Skills',
  'Sports & Fitness',
  'All of the above',
]

type Step = 'intro' | 'name' | 'age' | 'interest' | 'parent' | 'done'

interface Message {
  from: 'bot' | 'user'
  text: string
}

const bubble = {
  hidden: { opacity: 0, y: 10, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
}

export default function EnrollmentBot() {
  const [step, setStep] = useState<Step>('intro')
  const [messages, setMessages] = useState<Message[]>([
    { from: 'bot', text: "Hi there! 👋 I'm here to help you enroll in the Rise & Thrive Bootcamp 2026. It'll only take a minute. What's your name?" },
  ])
  const [input, setInput] = useState('')
  const [data, setData] = useState({ name: '', age: '', interest: '', parent: '' })
  const [isTyping, setIsTyping] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = containerRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [messages, isTyping])

  function botSay(text: string, delay = 600) {
    setIsTyping(true)
    setTimeout(() => {
      setIsTyping(false)
      setMessages(prev => [...prev, { from: 'bot', text }])
    }, delay)
  }

  function userSay(text: string) {
    setMessages(prev => [...prev, { from: 'user', text }])
  }

  function handleSubmit(value: string) {
    if (!value.trim()) return
    const val = value.trim()
    setInput('')

    switch (step) {
      case 'name':
        userSay(val)
        setData(d => ({ ...d, name: val }))
        setStep('age')
        botSay(`Nice to meet you, ${val.split(' ')[0]}! 🎉 How old are you, or what grade are you in?`)
        break
      case 'age':
        userSay(val)
        setData(d => ({ ...d, age: val }))
        setStep('interest')
        botSay("Great! Which area of the camp are you most excited about?")
        break
      case 'parent':
        userSay(val)
        setData(d => ({ ...d, parent: val }))
        setStep('done')
        botSay(
          `Perfect! Here's a summary of your intake:\n\n👤 Name: ${data.name}\n📅 Age: ${data.age}\n⭐ Interest: ${data.interest}\n📧 Parent email: ${val}\n\nWe'll send full details to that email shortly. Welcome to the Boys Network family! 🙌`,
          800
        )
        break
    }
  }

  function handleInterest(choice: string) {
    userSay(choice)
    setData(d => ({ ...d, interest: choice }))
    setStep('parent')
    botSay(`Awesome choice! Last one — what's a parent or guardian's email so we can send them the full details?`, 700)
  }

  function handleStart() {
    setStep('name')
    botSay("Great! Let's get started. 👆 First, what's the boy's full name?", 400)
  }

  return (
    <div
      style={{
        background: '#ffffff',
        borderRadius: '24px',
        border: '1px solid #e8eaf0',
        overflow: 'hidden',
        maxWidth: '520px',
        margin: '0 auto',
        boxShadow: '0 4px 32px rgba(7,13,79,0.08)',
      }}
    >
      {/* Header */}
      <div
        className="flex items-center gap-3 px-5 py-4"
        style={{ background: 'linear-gradient(135deg, #1f2fe6, #070d4f)' }}
      >
        <div
          className="flex items-center justify-center shrink-0"
          style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', fontSize: 20 }}
        >
          🏕️
        </div>
        <div>
          <p className="text-white font-bold text-sm" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            BNI Enrollment Assistant
          </p>
          <p className="text-white/60 text-xs" style={{ fontFamily: 'Inter, sans-serif' }}>
            Rise & Thrive Bootcamp 2026
          </p>
        </div>
        <span
          className="ml-auto text-xs font-bold px-2 py-1 rounded-full"
          style={{ background: 'rgba(74,222,128,0.2)', color: '#4ade80', fontFamily: 'Inter, sans-serif' }}
        >
          ● Online
        </span>
      </div>

      {/* Messages */}
      <div
        ref={containerRef}
        className="flex flex-col gap-3 p-5 overflow-y-auto"
        style={{ minHeight: 280, maxHeight: 340 }}
      >
        <AnimatePresence initial={false}>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              variants={bubble}
              initial="hidden"
              animate="visible"
              className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className="text-sm leading-relaxed whitespace-pre-line"
                style={{
                  maxWidth: '80%',
                  padding: '10px 14px',
                  borderRadius: msg.from === 'bot' ? '4px 18px 18px 18px' : '18px 4px 18px 18px',
                  background: msg.from === 'bot' ? '#f3f4f8' : 'linear-gradient(135deg, #1f2fe6, #070d4f)',
                  color: msg.from === 'bot' ? '#1a1a2e' : '#ffffff',
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                {msg.text}
              </div>
            </motion.div>
          ))}

          {isTyping && (
            <motion.div key="typing" variants={bubble} initial="hidden" animate="visible" className="flex justify-start">
              <div
                className="flex items-center gap-1 px-4 py-3"
                style={{ borderRadius: '4px 18px 18px 18px', background: '#f3f4f8' }}
              >
                {[0, 0.15, 0.3].map((d, i) => (
                  <motion.span
                    key={i}
                    style={{ width: 7, height: 7, borderRadius: '50%', background: '#adbeca', display: 'block' }}
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: d }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Input area */}
      <div style={{ borderTop: '1px solid #f0f0f5', padding: '12px 16px' }}>
        {step === 'intro' && (
          <button
            onClick={handleStart}
            className="w-full text-white font-bold text-sm py-3 rounded-full transition-opacity hover:opacity-90"
            style={{ background: 'linear-gradient(135deg, #1f2fe6, #070d4f)', fontFamily: 'Space Grotesk, sans-serif' }}
          >
            Start Enrollment →
          </button>
        )}

        {step === 'interest' && (
          <div className="flex flex-wrap gap-2">
            {INTEREST_OPTIONS.map(opt => (
              <button
                key={opt}
                onClick={() => handleInterest(opt)}
                className="text-sm font-medium transition-all hover:opacity-80"
                style={{
                  border: '1.5px solid #1f2fe6',
                  color: '#1f2fe6',
                  borderRadius: '100px',
                  padding: '7px 14px',
                  fontFamily: 'Inter, sans-serif',
                  background: 'transparent',
                  cursor: 'pointer',
                }}
              >
                {opt}
              </button>
            ))}
          </div>
        )}

        {(step === 'name' || step === 'age' || step === 'parent') && (
          <form
            onSubmit={e => { e.preventDefault(); handleSubmit(input) }}
            className="flex gap-2"
          >
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder={
                step === 'name' ? "Full name…" :
                step === 'age' ? "e.g. 14 years / Grade 9…" :
                "parent@email.com"
              }
              className="flex-1 text-sm outline-none"
              style={{
                border: '1.5px solid #e8eaf0',
                borderRadius: '100px',
                padding: '10px 16px',
                fontFamily: 'Inter, sans-serif',
                color: '#1a1a2e',
              }}
              autoFocus
            />
            <button
              type="submit"
              style={{
                background: '#1f2fe6',
                borderRadius: '100px',
                padding: '10px 18px',
                color: '#fff',
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: 13,
                fontWeight: 700,
                cursor: 'pointer',
                border: 'none',
              }}
            >
              Send
            </button>
          </form>
        )}

        {step === 'done' && (
          <p
            className="text-center text-sm py-2"
            style={{ fontFamily: 'Inter, sans-serif', color: '#515c63' }}
          >
            ✅ Intake complete — check your email for next steps!
          </p>
        )}
      </div>
    </div>
  )
}
