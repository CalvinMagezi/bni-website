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
            url(https://framerusercontent.com/images/ushcJaHUEQISMdAgpQ84KYQEY24.jpg) top center/cover no-repeat`,
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
          topPadding="280px" gives clearance for the video overlap above.
      ──────────────────────────────────────────────────────────────────── */}
      <FoundationalPillars topPadding="280px" />

      {/* ── BIBLICAL FOUNDATION ─────────────────────────────────────── */}
      <section style={{ background: '#ffffff', padding: '80px 0' }}>
        <div
          className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center"
          style={{ maxWidth: '1200px', padding: '0 40px' }}
        >
          {/* Text */}
          <div>
            <h2
              className="font-bold text-3xl md:text-4xl mb-6"
              style={{ fontFamily: 'Space Grotesk, sans-serif', color: '#1f2fe6' }}
            >
              Our Biblical Foundation
            </h2>
            <p
              className="text-bni-slate text-sm leading-relaxed mb-8"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              At Boys Network International, we believe that mentoring boys is not just a program
              — it&apos;s a calling. Everything we do is rooted in Scripture, pointing boys toward
              a life of purpose, leadership, and faith.
            </p>
            <blockquote className="border-l-4 pl-5" style={{ borderColor: '#1f2fe6' }}>
              <p
                className="text-bni-slate text-sm italic leading-relaxed mb-2"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                &ldquo;Train up a child in the way he should go; even when he is old he will not
                depart from it.&rdquo;
              </p>
              <cite
                className="font-bold text-xs not-italic"
                style={{ fontFamily: 'Space Grotesk, sans-serif', color: '#1f2fe6' }}
              >
                Proverbs 22:6
              </cite>
            </blockquote>
          </div>

          {/* Image */}
          <div
            className="relative w-full"
            style={{ borderRadius: '16px', overflow: 'hidden', aspectRatio: '4/3' }}
          >
            <Image
              src="https://framerusercontent.com/images/wTqdx68GnSCK8utE0lxruCFEK04.jpg"
              alt="Boys engaged in Bible study and spiritual reflection"
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        </div>
      </section>

      {/* ── MEET THE FOUNDERS ───────────────────────────────────────── */}
      <MeetFounders />

      {/* ── PARTNERS ────────────────────────────────────────────────── */}
      <section style={{ background: '#ffffff', padding: '64px 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px' }}>
          <h3
            className="font-bold text-2xl mb-10"
            style={{ fontFamily: 'Space Grotesk, sans-serif', color: '#0d1787' }}
          >
            Partners
          </h3>
          <div className="flex flex-wrap items-center gap-12">
            <div className="relative h-14 w-44">
              <Image
                src="https://framerusercontent.com/images/y9Lt3M9oqgQXMYtQiFooT0GYDgg.png"
                alt="Partner organisation logo"
                fill
                className="object-contain object-left"
                unoptimized
              />
            </div>
            <div className="relative h-14 w-44">
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
