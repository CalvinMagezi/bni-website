import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import FoundationalPillars from '@/components/shared/FoundationalPillars'
import MeetFounders from '@/components/shared/MeetFounders'
import CTABanner from '@/components/shared/CTABanner'
import CampCountdown from '@/components/shared/CampCountdown'
import { HeroReveal, FadeUp, SlideLeft, SlideRight, FadeIn } from '@/components/shared/Animate'

export const metadata: Metadata = {
  title: 'Boys Network International — Nurturing Potential, Shaping Lives',
  description:
    'Boys Network International empowers boys through faith-based mentorship, leadership development and the Rise & Thrive Bootcamp — raising purpose-driven young men in Uganda.',
  alternates: { canonical: 'https://boysnetworkinternational.com' },
  openGraph: {
    title: 'Boys Network International — Nurturing Potential, Shaping Lives',
    description: 'Empowering boys to grow in faith, lead with purpose, and impact their world through the Rise & Thrive Bootcamp.',
    url: 'https://boysnetworkinternational.com',
    images: [{ url: 'https://framerusercontent.com/images/zNckLAoaorpjAkb2LSzjVcez7A.jpg', width: 1200, height: 630, alt: 'Boys Network International — Rise & Thrive Bootcamp group photo' }],
  },
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'NGO',
  name: 'Boys Network International',
  alternateName: 'BNI',
  url: 'https://boysnetworkinternational.com',
  logo: 'https://framerusercontent.com/images/bmEr6BuAPZ4ibh0n7jxJ57JU4.png',
  description: 'A faith-based mentorship and leadership organisation committed to raising the next generation of grounded, confident, and purpose-driven young men.',
  foundingDate: '2024',
  areaServed: 'Uganda',
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+256-757-026880',
    contactType: 'customer support',
    email: 'join@boysnetwork.com',
  },
  sameAs: [],
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Boys Network International',
  url: 'https://boysnetworkinternational.com',
  potentialAction: {
    '@type': 'SearchAction',
    target: { '@type': 'EntryPoint', urlTemplate: 'https://boysnetworkinternational.com/programs' },
    'query-input': 'required name=search_term_string',
  },
}

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />

      {/* ── HERO ─────────────────────────────────────────────────────────
          826px tall. Text in upper centre. Video sits at the bottom and
          spills 240px into the gray Foundational Pillars section below,
          exactly like the original Framer site.
      ──────────────────────────────────────────────────────────────────── */}
      <section
        className="hero-section"
        style={{
          position: 'relative',
          overflow: 'visible',
          minHeight: '860px',
          background: `linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.45) 50%, rgba(0,0,0,0.92) 78%, rgba(0,0,0,0.92) 100%),
            url(https://framerusercontent.com/images/zB5KOyiCxdp4LttYLBVC0dNDugQ.png) top center/cover no-repeat`,
        }}
      >
        {/* Text block — centred in the upper portion */}
        <div
          className="hero-text-pad flex flex-col items-center text-center px-6"
          style={{ paddingTop: '220px', paddingBottom: '80px', maxWidth: '680px', margin: '0 auto' }}
        >
          <HeroReveal delay={0.15}>
            <h1
              className="text-white font-bold leading-tight mb-4"
              style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: 'clamp(2rem, 4.5vw, 3.25rem)',
              }}
            >
              Nurturing Potential, Shaping Lives
            </h1>
          </HeroReveal>
          <HeroReveal delay={0.25}>
            <p
              className="text-white/80 mb-8 text-sm md:text-base"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Empowering boys to grow in faith, lead with purpose, and impact their world.
            </p>
          </HeroReveal>
          {/* Buttons + countdown share the same gap so spacing is consistent */}
          <HeroReveal delay={0.4}>
          <div className="flex flex-col items-center w-full gap-3">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center w-full">
              <Link
                href="/programs"
                className="inline-flex items-center justify-center text-white font-bold text-sm hover:opacity-90 transition-opacity w-full sm:w-auto"
                style={{
                  background: '#1f2fe6',
                  borderRadius: '100px',
                  padding: '14px 32px',
                  fontFamily: 'Space Grotesk, sans-serif',
                }}
              >
                Join Us
              </Link>
              <Link
                href="/about-us"
                className="inline-flex items-center justify-center text-white font-bold text-sm hover:bg-white/10 transition-colors w-full sm:w-auto"
                style={{
                  border: '1.5px solid rgba(255,255,255,0.7)',
                  borderRadius: '100px',
                  padding: '14px 32px',
                  fontFamily: 'Space Grotesk, sans-serif',
                }}
              >
                About Us
              </Link>
            </div>
            {/* Camp countdown — same gap-3 spacing as between the buttons */}
            <CampCountdown />
          </div>
          </HeroReveal>
        </div>

        {/* Video — at the bottom of the hero, overflowing into the next section */}
        <div
          className="hero-video-wrap"
          style={{
            maxWidth: '1120px',
            margin: '0 auto -240px',
            padding: '0 40px',
            position: 'relative',
            zIndex: 10,
          }}
        >
          {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
          <video
            src="https://framerusercontent.com/assets/f5UdNw7STGhKlJ4DYIfp1fPMJyk.mp4"
            autoPlay
            muted
            loop
            playsInline
            controls
            className="w-full block"
            style={{ borderRadius: '24px', aspectRatio: '16/9', objectFit: 'cover' }}
          />
        </div>
      </section>

      {/* ── FOUNDATIONAL PILLARS ────────────────────────────────────────
          topPadding="430px" matches original — clears the video overlap
          and gives breathing room above the pillar content.
      ──────────────────────────────────────────────────────────────────── */}
      <FoundationalPillars topPadding="430px" />

      {/* ── BIBLICAL FOUNDATION ─────────────────────────────────────────
          White background, 2-column: text left + rounded image card right.
          Contained within max-width — does NOT bleed full viewport width.
      ──────────────────────────────────────────────────────────────────── */}
      <section style={{ background: '#ffffff' }}>
        <div
          className="section-inner section-v-pad"
          style={{ maxWidth: '1200px', margin: '0 auto', padding: '100px 100px' }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
            {/* Left — text */}
            <SlideLeft>
            <div>
              <h2
                className="font-bold leading-tight mb-6"
                style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: 'clamp(2.2rem, 4vw, 3.44rem)',
                  color: '#070d4f',
                }}
              >
                Our Biblical Foundation
              </h2>
              <p
                className="leading-relaxed mb-8"
                style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', color: '#515c63' }}
              >
                At Boys Network International, we believe that mentoring boys is not just a program
                — it&apos;s a calling. Everything we do is rooted in Scripture, pointing boys toward
                a life of purpose, leadership, and faith.
              </p>
              {/* Scripture — muted gray, NOT italic */}
              <p
                className="leading-relaxed mb-3"
                style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', color: '#b5b5b5' }}
              >
                &ldquo;Train up a child in the way he should go; even when he is old he will not
                depart from it.&rdquo;
              </p>
              <p
                className="font-bold"
                style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '16px', color: '#070d4f' }}
              >
                Proverbs 22:6
              </p>
            </div>
            </SlideLeft>

            {/* Right — image card */}
            <SlideRight>
            <div
              className="relative w-full overflow-hidden"
              style={{ borderRadius: '24px', aspectRatio: '4 / 3' }}
            >
              <Image
                src="https://framerusercontent.com/images/wTqdx68GnSCK8utE0lxruCFEK04.jpg"
                alt="Biblical foundation — boys in prayer"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            </SlideRight>
          </div>
        </div>
      </section>

      {/* ── MEET THE FOUNDERS ───────────────────────────────────────── */}
      <MeetFounders />

      {/* ── PARTNERS ────────────────────────────────────────────────── */}
      <section style={{ background: '#ffffff', paddingTop: '70px', paddingBottom: '70px' }}>
        <div className="section-inner" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 100px' }}>
          {/* "Partners" label inline with logos, all centered */}
          <FadeIn>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
            <h3
              className="font-semibold text-3xl shrink-0"
              style={{ fontFamily: 'Space Grotesk, sans-serif', color: '#000000' }}
            >
              Partners
            </h3>
            <div className="relative shrink-0" style={{ height: '82px', width: '250px' }}>
              <Image
                src="https://framerusercontent.com/images/y9Lt3M9oqgQXMYtQiFooT0GYDgg.png"
                alt="Partner organisation logo"
                fill
                className="object-contain"
                unoptimized
              />
            </div>
            <div className="relative shrink-0" style={{ height: '81px', width: '109px' }}>
              <Image
                src="https://framerusercontent.com/images/yzzkyPvETMdlNXHs0OmoTu55JqM.png"
                alt="Partner organisation logo"
                fill
                className="object-contain"
                unoptimized
              />
            </div>
            <div className="relative shrink-0" style={{ height: '82px', width: '250px' }}>
              <Image
                src="https://framerusercontent.com/images/uBZGDq1rg3z7Qng5fQAXN8tBMM.png"
                alt="Partner organisation logo"
                fill
                className="object-contain"
                unoptimized
              />
            </div>
          </div>
          </FadeIn>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────── */}
      <CTABanner />
    </>
  )
}
