'use client'

import { HeroReveal } from '@/components/shared/Animate'

const HERO_BG = 'https://framerusercontent.com/images/zB5KOyiCxdp4LttYLBVC0dNDugQ.png'

const DEFAULT_MIN_HEIGHT = 220

// Scrim opacity pairs (top, bottom) keyed by strength. Stronger overlays keep
// white title text above 4.5:1 contrast when the hero sits over a busy photo.
const SCRIM = {
  default: [0.88, 0.78],
  strong: [0.94, 0.88],
} as const

interface PageHeroProps {
  title: string
  subtitle?: string
  minHeight?: number
  scrim?: keyof typeof SCRIM
}

export default function PageHero({
  title,
  subtitle,
  minHeight = DEFAULT_MIN_HEIGHT,
  scrim = 'default',
}: PageHeroProps) {
  const [top, bottom] = SCRIM[scrim]

  return (
    <section
      className="relative flex items-center justify-center text-center"
      style={{
        minHeight: `${minHeight}px`,
        background: `linear-gradient(rgba(7,13,79,${top}) 0%, rgba(13,23,135,${bottom}) 100%), url(${HERO_BG}) top center/cover no-repeat`,
      }}
    >
      <div className="relative z-10 pt-28 pb-12 sm:py-20 px-6">
        <HeroReveal delay={0.2}>
          <h1
            className="text-white font-bold"
            style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
            }}
          >
            {title}
          </h1>
        </HeroReveal>
        <HeroReveal delay={0.35}>
          {subtitle && (
            <p
              className="text-bni-light mt-3 text-base md:text-lg max-w-2xl mx-auto"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              {subtitle}
            </p>
          )}
        </HeroReveal>
      </div>
    </section>
  )
}
