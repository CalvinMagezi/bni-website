import Image from 'next/image'
import Link from 'next/link'
import FoundationalPillars from '@/components/shared/FoundationalPillars'
import MeetFounders from '@/components/shared/MeetFounders'
import CTABanner from '@/components/shared/CTABanner'

export default function HomePage() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────────────
          826px tall. Text in upper centre. Video sits at the bottom and
          spills 240px into the gray Foundational Pillars section below,
          exactly like the original Framer site.
      ──────────────────────────────────────────────────────────────────── */}
      <section
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
          className="flex flex-col items-center text-center px-6"
          style={{ paddingTop: '220px', paddingBottom: '80px', maxWidth: '680px', margin: '0 auto' }}
        >
          <h1
            className="text-white font-bold leading-tight mb-4"
            style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: 'clamp(2rem, 4.5vw, 3.25rem)',
            }}
          >
            Nurturing Potential, Shaping Lives
          </h1>
          <p
            className="text-white/80 mb-8 text-sm md:text-base"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Empowering boys to grow in faith, lead with purpose, and impact their world.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/programs"
              className="inline-flex items-center text-white font-bold text-sm hover:opacity-90 transition-opacity"
              style={{
                background: '#1f2fe6',
                borderRadius: '100px',
                padding: '12px 26px',
                fontFamily: 'Space Grotesk, sans-serif',
              }}
            >
              Join Us
            </Link>
            <Link
              href="/about-us"
              className="inline-flex items-center text-white font-bold text-sm hover:bg-white/10 transition-colors"
              style={{
                border: '1.5px solid rgba(255,255,255,0.7)',
                borderRadius: '100px',
                padding: '12px 26px',
                fontFamily: 'Space Grotesk, sans-serif',
              }}
            >
              About Us
            </Link>
          </div>
        </div>

        {/* Video — at the bottom of the hero, overflowing into the next section */}
        <div
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
          Matches original exactly:
          - Section 1000×612px, position relative, overflow hidden
          - Image fills the entire section as an absolute layer
          - Text column: 480px wide, left-aligned, starts 119px from top
          - Scripture text: rgb(181,181,181), 16px, NOT italic
          - Proverbs 22:6: white bold paragraph
      ──────────────────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{ minHeight: '612px' }}
      >
        {/* Background image — fills section like the original <img> element */}
        <Image
          src="https://framerusercontent.com/images/wTqdx68GnSCK8utE0lxruCFEK04.jpg"
          alt=""
          fill
          className="object-cover"
          unoptimized
        />
        {/* Subtle left-side gradient so white text stays legible */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(90deg, rgba(7,13,79,0.72) 0%, rgba(7,13,79,0.45) 55%, rgba(0,0,0,0.05) 100%)',
          }}
        />

        {/* Text — 480px column, 100px from content left, 119px from top */}
        <div
          className="relative z-10"
          style={{ maxWidth: '1200px', margin: '0 auto', padding: '119px 100px 118px' }}
        >
          <div style={{ maxWidth: '480px' }}>
            <h2
              className="text-white font-bold leading-tight mb-6"
              style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: 'clamp(2.2rem, 4vw, 3.44rem)',
              }}
            >
              <strong>Our Biblical Foundation</strong>
            </h2>
            <p
              className="text-white/80 leading-relaxed mb-8"
              style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px' }}
            >
              At Boys Network International, we believe that mentoring boys is not just a program
              — it&apos;s a calling. Everything we do is rooted in Scripture, pointing boys toward
              a life of purpose, leadership, and faith.
            </p>
            {/* Scripture — muted gray, NOT italic, matching computed style */}
            <p
              className="leading-relaxed mb-3"
              style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', color: '#b5b5b5' }}
            >
              &ldquo;Train up a child in the way he should go; even when he is old he will not
              depart from it.&rdquo;
            </p>
            <p
              className="text-white font-bold"
              style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '16px' }}
            >
              <strong>Proverbs 22:6</strong>
            </p>
          </div>
        </div>
      </section>

      {/* ── MEET THE FOUNDERS ───────────────────────────────────────── */}
      <MeetFounders />

      {/* ── PARTNERS ────────────────────────────────────────────────── */}
      <section style={{ background: '#ffffff', paddingTop: '70px', paddingBottom: '70px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 100px' }}>
          <h3
            className="font-semibold text-3xl mb-10"
            style={{ fontFamily: 'Space Grotesk, sans-serif', color: '#000000' }}
          >
            Partners
          </h3>
          <div className="flex flex-wrap items-center gap-12">
            <div className="relative" style={{ height: '82px', width: '250px' }}>
              <Image
                src="https://framerusercontent.com/images/y9Lt3M9oqgQXMYtQiFooT0GYDgg.png"
                alt="Partner organisation logo"
                fill
                className="object-contain object-left"
                unoptimized
              />
            </div>
            <div className="relative" style={{ height: '81px', width: '109px' }}>
              <Image
                src="https://framerusercontent.com/images/yzzkyPvETMdlNXHs0OmoTu55JqM.png"
                alt="Partner organisation logo"
                fill
                className="object-contain object-left"
                unoptimized
              />
            </div>
            <div className="relative" style={{ height: '82px', width: '250px' }}>
              <Image
                src="https://framerusercontent.com/images/uBZGDq1rg3z7Qng5fQAXN8tBMM.png"
                alt="Partner organisation logo"
                fill
                className="object-contain object-left"
                unoptimized
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────── */}
      <CTABanner />
    </>
  )
}
