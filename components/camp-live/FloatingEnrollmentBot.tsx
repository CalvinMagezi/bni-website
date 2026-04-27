'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import EnrollmentBot from './EnrollmentBot'

export default function FloatingEnrollmentBot() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 24,
        left: 24,
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
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
              transformOrigin: 'bottom left',
              filter: 'drop-shadow(0 8px 40px rgba(7,13,79,0.18))',
            }}
          >
            <EnrollmentBot />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <motion.button
        onClick={() => setIsOpen(o => !o)}
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
              ✕
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.18 }}
              style={{ lineHeight: 1, display: 'block', fontSize: 24 }}
            >
              🏕️
            </motion.span>
          )}
        </AnimatePresence>

        {/* Unread dot */}
        {!isOpen && (
          <span
            style={{
              position: 'absolute',
              top: 2,
              right: 2,
              width: 14,
              height: 14,
              borderRadius: '50%',
              background: '#ef4444',
              border: '2px solid #fff',
              display: 'block',
            }}
          />
        )}
      </motion.button>
    </div>
  )
}
