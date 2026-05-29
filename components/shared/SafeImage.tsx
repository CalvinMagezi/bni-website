'use client'

import { useState, type CSSProperties } from 'react'

interface SafeImageProps {
  src?: string | null
  alt: string
  className?: string
  style?: CSSProperties
  fallback?: 'tile' | 'avatar'
  objectPosition?: string
}

function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return '?'
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase()
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase()
}

function FallbackTile({ variant, alt, style }: { variant: 'tile' | 'avatar'; alt: string; style?: CSSProperties }) {
  const base: CSSProperties = {
    position: 'absolute',
    inset: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    ...style,
  }

  if (variant === 'avatar') {
    return (
      <div
        style={{
          ...base,
          background: 'linear-gradient(135deg, #1f2fe6, #070d4f)',
          color: '#ffffff',
          fontFamily: 'Space Grotesk, sans-serif',
          fontWeight: 700,
          fontSize: '1.05rem',
          letterSpacing: '0.02em',
        }}
        aria-label={alt}
      >
        {initials(alt)}
      </div>
    )
  }

  return (
    <div style={{ ...base, background: '#eef0fd', color: '#adbeca' }} aria-label={alt}>
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" />
        <path d="M21 15l-5-5L5 21" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    </div>
  )
}

export default function SafeImage({
  src,
  alt,
  className,
  style,
  fallback = 'tile',
  objectPosition,
}: SafeImageProps) {
  const [failed, setFailed] = useState(false)
  const hasSrc = typeof src === 'string' && src.trim().length > 0

  if (!hasSrc || failed) {
    return <FallbackTile variant={fallback} alt={alt} style={style} />
  }

  return (
    <img
      src={src as string}
      alt={alt}
      className={className}
      onError={() => setFailed(true)}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        objectPosition,
        ...style,
      }}
    />
  )
}
