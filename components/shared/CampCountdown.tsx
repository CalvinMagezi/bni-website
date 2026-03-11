'use client'

import { useState, useEffect } from 'react'

// Camp date — Rise & Thrive Bootcamp
const CAMP_DATE = new Date('2026-08-22T00:00:00+03:00') // EAT (UTC+3)

function getTimeLeft() {
  const diff = CAMP_DATE.getTime() - Date.now()
  if (diff <= 0) return null
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

export default function CampCountdown() {
  const [time, setTime] = useState(getTimeLeft())

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000)
    return () => clearInterval(id)
  }, [])

  if (!time) return null

  const units = [
    { label: 'Days', value: time.days },
    { label: 'Hours', value: time.hours },
    { label: 'Minutes', value: time.minutes },
    { label: 'Seconds', value: time.seconds },
  ]

  return (
    <div
      style={{
        background: 'rgba(255,255,255,0.06)',
        border: '1px solid rgba(255,255,255,0.14)',
        borderRadius: '20px',
        padding: '28px 36px',
        maxWidth: '560px',
        margin: '0 auto',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
      }}
    >
      <p
        className="text-center text-white/70 mb-5 text-sm uppercase tracking-widest"
        style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '0.1em' }}
      >
        Rise &amp; Thrive Bootcamp — 22 Aug 2026
      </p>
      <div className="flex items-center justify-center gap-4">
        {units.map(({ label, value }, i) => (
          <div key={label} className="flex items-center gap-4">
            <div className="text-center" style={{ minWidth: '64px' }}>
              <p
                className="text-white font-bold leading-none"
                style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: 'clamp(1.8rem, 5vw, 2.6rem)',
                }}
              >
                {String(value).padStart(2, '0')}
              </p>
              <p
                className="text-white/50 text-xs mt-1 uppercase tracking-wider"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {label}
              </p>
            </div>
            {i < units.length - 1 && (
              <span className="text-white/40 font-bold text-2xl mb-4">:</span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
