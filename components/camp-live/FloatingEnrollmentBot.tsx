'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import EnrollmentBot from './EnrollmentBot'

// Pages where 2-minute lead recovery fires
const CONVERSION_PAGES = ['/enroll', '/programs']

export default function FloatingEnrollmentBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [leadRecovery, setLeadRecovery] = useState(false)
  const pathname = usePathname()
  const userInteracted = useRef(false)
  const timerFired = useRef(false)

  // Lead recovery: auto-open after 2 min on enrollment/programs pages
  useEffect(() => {
    if (!CONVERSION_PAGES.includes(pathname) || timerFired.current) return

    const timer = setTimeout(() => {
      timerFired.current = true
      if (!userInteracted.current) {
        setLeadRecovery(true)
        setIsOpen(true)
      }
    }, 120_000)

    return () => clearTimeout(timer)
  }, [pathname])

  function handleToggle() {
    userInteracted.current = true
    setIsOpen(o => !o)
  }

  return (
    <div
      style={{
        position: 'fixed',
        // Upper slot of the right-side FAB stack; +68px clears the 56px WhatsApp
        // button below plus a 12px gap.
        bottom: 'calc(24px + 68px + env(safe-area-inset-bottom))',
        right: 24,
        zIndex: 1001,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: 12,
      }}
    >
      {/* Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            style={{
              width: 'min(380px, calc(100vw - 48px))',
              transformOrigin: 'bottom right',
              filter: 'drop-shadow(0 8px 40px rgba(7,13,79,0.18))',
            }}
          >
            <EnrollmentBot leadRecovery={leadRecovery} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <motion.button
        onClick={handleToggle}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.96 }}
        aria-label={isOpen ? 'Close enrollment chat' : 'Open enrollment chat'}
        style={{
          width: 56,
          height: 56,
          borderRadius: '50%',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #1f2fe6, #070d4f)',
          boxShadow: '0 4px 20px rgba(31,47,230,0.4)',
          fontSize: 22,
          color: '#fff',
          position: 'relative',
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isOpen ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.18 }}
              style={{ lineHeight: 1, display: 'block' }}
            >
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.18 }}
              style={{ lineHeight: 1, display: 'block' }}
            >
              <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
            </motion.span>
          )}
        </AnimatePresence>

        {/* Dot only signals a real lead-recovery notification, never an idle state */}
        {!isOpen && leadRecovery && (
          <motion.span
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            style={{
              position: 'absolute',
              top: 2,
              right: 2,
              width: 14,
              height: 14,
              borderRadius: '50%',
              background: '#f59e0b',
              border: '2px solid #fff',
              display: 'block',
            }}
          />
        )}
      </motion.button>
    </div>
  )
}
