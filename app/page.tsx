import Image from 'next/image'
import Link from 'next/link'
import FoundationalPillars from '@/components/shared/FoundationalPillars'
import MeetFounders from '@/components/shared/MeetFounders'
import CTABanner from '@/components/shared/CTABanner'

export default function HomePage() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────── */}
      {/* Shorter hero (~85vh), background-position top to show boys' faces */}
      <section
        className="relative flex flex-col items-center justify-end text-center"
        style={{
          minHeight: '80vh',
          paddingTop: '64px',
          paddingBottom: '60px',
          background: `linear-gradient(0deg, rgba(0,0,0,0.95) 30%, rgba(0,0,0,0.4) 65%, rgba(0,0,0,0) 100%),
            url(https://framerusercontent.com/images/ushcJaHUEQISMdAgpQ84KYQEY24.jpg) top center/cover no-repeat`,
        }}
      >
        <div className="relative z-10 flex flex-col items-center px-6 mt-auto" style={{ maxWidth: '680px' }}>
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
      </section>

      {/* ── INSET CARD (separate white section below hero) ──── */}
      <section style={{ background: '#ffffff', padding: '40px 0 60px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px' }}>
          <div
            className="relative w-full overflow-hidden"
            style={{ borderRadius: '20px', aspectRatio: '16/7' }}
          >
            <Image
              src="https://framerusercontent.com/images/Ohp4bhiHSQKQOIGd0A4n46icVK4.jpg"
              alt="Boys Network International mentor working with young men in a professional setting"
              fill
              className="object-cover object-center"
              unoptimized
              priority
            />
            {/* Logo watermark overlay — matches original */}
            <div className="absolute top-5 left-5 opacity-70">
              <Image
                src="https://framerusercontent.com/images/zB5KOyiCxdp4LttYLBVC0dNDugQ.png"
                alt="Boys Network International"
                width={60}
                height={36}
                unoptimized
                className="brightness-0 invert"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── FOUNDATIONAL PILLARS ────────────────────────────── */}
      <FoundationalPillars />

      {/* ── BIBLICAL FOUNDATION ─────────────────────────────── */}
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

      {/* ── MEET THE FOUNDERS ───────────────────────────────── */}
      <MeetFounders />

      {/* ── PARTNERS ────────────────────────────────────────── */}
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
                alt="Boys Network International partner organisation logo"
                fill
                className="object-contain object-left"
                unoptimized
              />
            </div>
            <div className="relative h-14 w-44">
              <Image
                src="https://framerusercontent.com/images/uBZGDq1rg3z7Qng5fQAXN8tBMM.png"
                alt="Boys Network International partner organisation logo"
                fill
                className="object-contain object-left"
                unoptimized
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────── */}
      <CTABanner />
    </>
  )
}
