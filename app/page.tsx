import Image from 'next/image'
import Link from 'next/link'
import FoundationalPillars from '@/components/shared/FoundationalPillars'
import MeetFounders from '@/components/shared/MeetFounders'
import CTABanner from '@/components/shared/CTABanner'

const ENROLL_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSeO84OkbLX6EMl_jYJoiR_uHcraGbuaCU2Zg7txbpXjDnXo5Q/viewform?usp=header'

export default function HomePage() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section
        className="relative flex flex-col items-center justify-center text-center"
        style={{
          minHeight: '100vh',
          paddingTop: '64px',
          background: `linear-gradient(0deg, rgb(0,0,0) 45%, rgba(33,69,96,0) 117%),
            url(https://framerusercontent.com/images/ushcJaHUEQISMdAgpQ84KYQEY24.jpg) center/cover no-repeat`,
        }}
      >
        <div className="relative z-10 flex flex-col items-center px-6" style={{ maxWidth: '700px' }}>
          <h1
            className="text-white font-bold leading-tight mb-4"
            style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
            }}
          >
            Nurturing Potential, Shaping Lives
          </h1>
          <p
            className="text-white/80 mb-8 text-base md:text-lg"
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
                padding: '14px 28px',
                fontFamily: 'Space Grotesk, sans-serif',
              }}
            >
              Join Us
            </Link>
            <Link
              href="/about-us"
              className="inline-flex items-center text-white font-bold text-sm hover:bg-white/10 transition-colors"
              style={{
                border: '1.5px solid white',
                borderRadius: '100px',
                padding: '14px 28px',
                fontFamily: 'Space Grotesk, sans-serif',
              }}
            >
              About Us
            </Link>
          </div>
        </div>

        {/* Inset image card below CTA */}
        <div
          className="relative mx-6 mt-16"
          style={{
            width: '100%',
            maxWidth: '760px',
            borderRadius: '16px',
            overflow: 'hidden',
            aspectRatio: '16/9',
          }}
        >
          <Image
            src="https://framerusercontent.com/images/Ohp4bhiHSQKQOIGd0A4n46icVK4.jpg"
            alt="Young man studying and growing through the Boys Network programme"
            fill
            className="object-cover"
            unoptimized
            priority
          />
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
              className="text-bni-navy font-bold text-3xl md:text-4xl mb-6"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              Our Biblical Foundation
            </h2>
            <p
              className="text-bni-slate text-base leading-relaxed mb-8"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              At Boys Network International, we believe that mentoring boys is not just a program
              — it&apos;s a calling. Everything we do is rooted in Scripture, pointing boys toward
              a life of purpose, leadership, and faith.
            </p>
            <blockquote
              className="border-l-4 pl-6"
              style={{ borderColor: '#1f2fe6' }}
            >
              <p
                className="text-bni-slate text-base italic leading-relaxed mb-3"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                &ldquo;Train up a child in the way he should go; even when he is old he will not
                depart from it.&rdquo;
              </p>
              <cite
                className="text-bni-blue font-bold text-sm not-italic"
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
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
            className="text-bni-navy font-bold text-2xl mb-10"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            Partners
          </h3>
          <div className="flex flex-wrap items-center gap-10">
            <div className="relative h-16 w-48">
              <Image
                src="https://framerusercontent.com/images/y9Lt3M9oqgQXMYtQiFooT0GYDgg.png"
                alt="Boys Network International partner organisation logo"
                fill
                className="object-contain object-left"
                unoptimized
              />
            </div>
            <div className="relative h-16 w-48">
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
