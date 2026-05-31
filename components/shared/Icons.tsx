import type { CSSProperties } from 'react'

type IconProps = {
  className?: string
  size?: number
  style?: CSSProperties
}

const DEFAULT_SIZE = 24

// Line-style icons share these stroke defaults so they read consistently.
const strokeProps = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.75,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

function baseProps({ className, size = DEFAULT_SIZE, style }: IconProps) {
  return {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    className,
    style,
    'aria-hidden': true,
    focusable: false,
  }
}

export function PrayingHands(props: IconProps) {
  return (
    <svg {...baseProps(props)} {...strokeProps}>
      <path d="M12 3 7 9.5v7l5 4 5-4v-7L12 3Z" />
      <path d="M12 3v17" />
      <path d="M7 11.5l5 2 5-2" />
    </svg>
  )
}

export function Heart(props: IconProps) {
  return (
    <svg {...baseProps(props)} {...strokeProps}>
      <path d="M12 20.5 4.5 13a4.5 4.5 0 0 1 6.4-6.3l1.1 1.1 1.1-1.1A4.5 4.5 0 0 1 19.5 13L12 20.5Z" />
    </svg>
  )
}

export function Crown(props: IconProps) {
  return (
    <svg {...baseProps(props)} {...strokeProps}>
      <path d="M3 7l3.5 4L12 5l5.5 6L21 7l-1.5 11h-15L3 7Z" />
      <path d="M4.5 18h15" />
    </svg>
  )
}

export function Coins(props: IconProps) {
  return (
    <svg {...baseProps(props)} {...strokeProps}>
      <ellipse cx="8" cy="7" rx="5" ry="2.5" />
      <path d="M3 7v4c0 1.4 2.2 2.5 5 2.5s5-1.1 5-2.5V7" />
      <path d="M13 10.5c.8.3 1.9.5 3 .5 2.8 0 5-1.1 5-2.5S18.8 6 16 6c-1.1 0-2.2.2-3 .5" />
      <path d="M11 16c.8.9 2.8 1.5 5 1.5 2.8 0 5-1.1 5-2.5v-4" />
    </svg>
  )
}

export function Handshake(props: IconProps) {
  return (
    <svg {...baseProps(props)} {...strokeProps}>
      <path d="m11 17 2 2a1 1 0 0 0 1.5 0l3.5-3.5" />
      <path d="m13 14 2.5 2.5a1 1 0 0 0 1.5 0l1-1a1 1 0 0 0 0-1.4l-4.6-4.6a2 2 0 0 0-1.4-.6H10L7 8" />
      <path d="m18 14 3-3" />
      <path d="m3 11 3 3" />
      <path d="m6 14 3.5-3.5a1 1 0 0 1 1.4 0l1.6 1.6" />
    </svg>
  )
}

export function Clock(props: IconProps) {
  return (
    <svg {...baseProps(props)} {...strokeProps}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </svg>
  )
}

export function Users(props: IconProps) {
  return (
    <svg {...baseProps(props)} {...strokeProps}>
      <path d="M16 19v-1.5a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4V19" />
      <circle cx="9" cy="7" r="3.5" />
      <path d="M22 19v-1.5a4 4 0 0 0-3-3.85" />
      <path d="M16 3.65a4 4 0 0 1 0 7.7" />
    </svg>
  )
}

export function ClipboardList(props: IconProps) {
  return (
    <svg {...baseProps(props)} {...strokeProps}>
      <rect x="5" y="4" width="14" height="17" rx="2" />
      <path d="M9 4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1V4Z" />
      <path d="M8.5 11h7" />
      <path d="M8.5 15h7" />
    </svg>
  )
}

export function Chat(props: IconProps) {
  return (
    <svg {...baseProps(props)} {...strokeProps}>
      <path d="M20 11.5a7.5 7.5 0 0 1-10.9 6.7L4 20l1.8-5.1A7.5 7.5 0 1 1 20 11.5Z" />
    </svg>
  )
}

export function Phone(props: IconProps) {
  return (
    <svg {...baseProps(props)} {...strokeProps}>
      <path d="M6 3h3l1.5 4.5L8 9a11 11 0 0 0 5 5l1.5-2.5L19 13v3a2 2 0 0 1-2.2 2A15 15 0 0 1 4 5.2 2 2 0 0 1 6 3Z" />
    </svg>
  )
}

export function Mail(props: IconProps) {
  return (
    <svg {...baseProps(props)} {...strokeProps}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3.5 7 8.5 6 8.5-6" />
    </svg>
  )
}

// Brand glyphs use fill:currentColor so they tint with the surrounding text color.
function brandProps({ className, size = DEFAULT_SIZE, style }: IconProps) {
  return {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    className,
    style,
    fill: 'currentColor',
    'aria-hidden': true,
    focusable: false,
  }
}

export function TikTok(props: IconProps) {
  return (
    <svg {...brandProps(props)}>
      <path d="M16.5 3c.3 2.1 1.5 3.6 3.5 3.9v2.7c-1.3.1-2.5-.3-3.5-.9v5.9a5.6 5.6 0 1 1-5.6-5.6c.3 0 .6 0 .9.1v2.8a2.9 2.9 0 1 0 2 2.7V3h2.7Z" />
    </svg>
  )
}

export function Instagram(props: IconProps) {
  return (
    <svg {...baseProps(props)} fill="none" stroke="currentColor" strokeWidth={1.75}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function XTwitter(props: IconProps) {
  return (
    <svg {...brandProps(props)}>
      <path d="M17.5 3h3l-6.6 7.6L21.8 21h-6l-4.7-6.1L5.6 21H2.5l7.1-8.1L2.4 3h6.1l4.2 5.6L17.5 3Zm-1.1 16.2h1.7L7.6 4.7H5.8l10.6 14.5Z" />
    </svg>
  )
}

export function LinkedIn(props: IconProps) {
  return (
    <svg {...brandProps(props)}>
      <path d="M4.5 3.5a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM3 9h3v12H3V9Zm5.5 0h2.9v1.6h.1c.4-.8 1.5-1.7 3-1.7 3.2 0 3.8 2.1 3.8 4.9V21h-3v-5.5c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9V21h-3V9Z" />
    </svg>
  )
}
