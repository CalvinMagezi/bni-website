'use client'

import { HeroReveal } from '@/components/shared/Animate'

const HERO_BG = 'https://framerusercontent.com/images/zB5KOyiCxdp4LttYLBVC0dNDugQ.png'

interface PageHeroProps {
  title: string
  subtitle?: string
}

export default function PageHero({ title, subtitle }: PageHeroProps) {
  return (
    <section
      className="relative flex items-center justify-center text-center"
      style={{
        minHeight: '300px',
        background: `linear-gradient(rgba(7,13,79,0.88) 0%, rgba(13,23,135,0.78) 100%), url(${HERO_BG}) top center/cover no-repeat`,
      }}
    >
      <div className="relative z-10 py-20 px-6">
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
