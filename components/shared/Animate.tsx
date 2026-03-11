'use client'

/**
 * Lightweight animation wrappers built on Framer Motion.
 * All scroll animations use whileInView + once:true so they only
 * fire once as the element enters the viewport.
 */

import { motion, type Variants } from 'framer-motion'

// ── Shared easing ──────────────────────────────────────────────
const ease = [0.22, 1, 0.36, 1] as const // custom ease-out cubic-bezier

// ── Variant definitions ────────────────────────────────────────
const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
}

const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.7, ease: 'easeOut' } },
}

const slideLeftVariants: Variants = {
  hidden: { opacity: 0, x: -36 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.65, ease } },
}

const slideRightVariants: Variants = {
  hidden: { opacity: 0, x: 36 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.65, ease } },
}

const staggerContainerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
}

const staggerChildVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease } },
}

// ── Viewport config ────────────────────────────────────────────
const vp = { once: true, margin: '-60px' }

// ── Component props ────────────────────────────────────────────
type TagProp = { as?: keyof React.JSX.IntrinsicElements }
type DelayProp = { delay?: number }
type BaseProps = React.PropsWithChildren<TagProp & DelayProp & { className?: string; style?: React.CSSProperties }>

function withDelay(variants: Variants, delay?: number): Variants {
  if (!delay) return variants
  const v = { ...variants }
  if (typeof v.visible === 'object' && 'transition' in v.visible) {
    v.visible = { ...(v.visible as object), transition: { ...(v.visible as { transition: object }).transition, delay } }
  }
  return v
}

// ── FadeUp — use for headings, body text, standalone elements ──
export function FadeUp({ children, className, style, delay, as: Tag = 'div' }: BaseProps) {
  const MotionTag = motion[Tag as 'div'] as typeof motion.div
  return (
    <MotionTag
      className={className}
      style={style}
      variants={withDelay(fadeUpVariants, delay)}
      initial="hidden"
      whileInView="visible"
      viewport={vp}
    >
      {children}
    </MotionTag>
  )
}

// ── FadeIn — use for images, overlays, cards ───────────────────
export function FadeIn({ children, className, style, delay, as: Tag = 'div' }: BaseProps) {
  const MotionTag = motion[Tag as 'div'] as typeof motion.div
  return (
    <MotionTag
      className={className}
      style={style}
      variants={withDelay(fadeInVariants, delay)}
      initial="hidden"
      whileInView="visible"
      viewport={vp}
    >
      {children}
    </MotionTag>
  )
}

// ── SlideLeft / SlideRight — use for 2-col section columns ─────
export function SlideLeft({ children, className, style, delay }: BaseProps) {
  return (
    <motion.div
      className={className}
      style={style}
      variants={withDelay(slideLeftVariants, delay)}
      initial="hidden"
      whileInView="visible"
      viewport={vp}
    >
      {children}
    </motion.div>
  )
}

export function SlideRight({ children, className, style, delay }: BaseProps) {
  return (
    <motion.div
      className={className}
      style={style}
      variants={withDelay(slideRightVariants, delay)}
      initial="hidden"
      whileInView="visible"
      viewport={vp}
    >
      {children}
    </motion.div>
  )
}

// ── Stagger — wrap grids; children receive staggered fade-up ───
export function StaggerGrid({ children, className, style }: Omit<BaseProps, 'delay'>) {
  return (
    <motion.div
      className={className}
      style={style}
      variants={staggerContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={vp}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children, className, style }: Omit<BaseProps, 'delay'>) {
  return (
    <motion.div className={className} style={style} variants={staggerChildVariants}>
      {children}
    </motion.div>
  )
}

// ── HeroReveal — mount animation (no scroll trigger) for heroes ─
export function HeroReveal({ children, className, style, delay }: BaseProps) {
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease, delay: delay ?? 0 }}
    >
      {children}
    </motion.div>
  )
}
