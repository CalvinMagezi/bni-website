import type { Metadata } from 'next'
import Image from 'next/image'
import PageHero from '@/components/layout/PageHero'
import MeetFounders from '@/components/shared/MeetFounders'
import CTABanner from '@/components/shared/CTABanner'
import { FadeUp, SlideLeft, SlideRight, StaggerGrid, StaggerItem } from '@/components/shared/Animate'

export const metadata: Metadata = {
  title: 'About Us | The Boys Network',
  description:
    'Boys Network International is a faith-based mentorship and leadership organisation committed to raising the next generation of grounded, confident, and purpose-driven young men.',
}

const whatWeDo = [
  {
    icon: '🙏',
    title: 'Spiritual Growth',
    description: 'Through daily fellowship, guided Bible reflection, and devotions that anchor identity and purpose in faith.',
    accent: '#eef0fd',
    accentBorder: 'rgba(31,47,230,0.12)',
  },
  {
    icon: '👑',
    title: 'Leadership Development',
    description: 'Via hands-on challenges, role-playing scenarios, and one-on-one mentorship from experienced leaders.',
    accent: '#fdf6ee',
    accentBorder: 'rgba(245,158,11,0.2)',
  },
  {
    icon: '💰',
    title: 'Financial & Life Literacy',
    description: 'Including entrepreneurship, budgeting, personal grooming, and career exploration — practical skills for real life.',
    accent: '#eefdf4',
    accentBorder: 'rgba(16,185,129,0.2)',
  },
  {
    icon: '🤝',
    title: 'Community Engagement',
    description: 'That fosters empathy and a servant-leader mindset, building lifelong friendships and a culture of giving back.',
    accent: '#fdeef0',
    accentBorder: 'rgba(239,68,68,0.15)',
  },
]

export default function AboutPage() {
  return (
    <>
      <PageHero title="About Us" />

      {/* ── WHO WE ARE ──────────────────────────────────────── */}
      <section style={{ background: '#ffffff', padding: '80px 0' }}>
        <div
          className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center section-inner"
          style={{ maxWidth: '1200px', padding: '0 40px' }}
        >
          <SlideLeft>
          <div>
            <h2
              className="text-bni-blue font-bold text-2xl sm:text-3xl md:text-4xl mb-6"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              Who We Are
            </h2>
            <p
              className="text-bni-slate text-base leading-relaxed"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Boys Network International (BNI) is a faith-based mentorship and leadership
              organisation committed to raising the next generation of grounded, confident, and
              purpose-driven young men. We are a community of mentors, educators, coaches, and
              professionals dedicated to nurturing the spiritual, intellectual, emotional, and
              physical development of boys.
            </p>
          </div>
          </SlideLeft>
          <SlideRight>
          <div
            className="relative w-full"
            style={{ borderRadius: '16px', overflow: 'hidden', aspectRatio: '4/3' }}
          >
            <Image
              src="https://framerusercontent.com/images/Ohp4bhiHSQKQOIGd0A4n46icVK4.jpg"
              alt="Young boy studying with focus and dedication"
              fill
              className="object-cover"
              unoptimized
            />
          </div>
          </SlideRight>
        </div>
      </section>

      {/* ── OUR VISION ──────────────────────────────────────── */}
      <section style={{ background: '#f3f4f8', padding: '80px 0' }}>
        <div
          className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center section-inner"
          style={{ maxWidth: '1200px', padding: '0 40px' }}
        >
          <SlideLeft>
          <div
            className="relative w-full order-2 md:order-1"
            style={{ borderRadius: '16px', overflow: 'hidden', aspectRatio: '4/3' }}
          >
            <Image
              src="https://framerusercontent.com/images/PpPNLP5cXi4gOGPaBTA4sRgBUo.jpg"
              alt="Boy looking confidently towards a bright future"
              fill
              className="object-cover"
              unoptimized
            />
          </div>
          </SlideLeft>
          <SlideRight>
          <div className="order-1 md:order-2">
            <h2
              className="text-bni-blue font-bold text-2xl sm:text-3xl md:text-4xl mb-6"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              Our Vision
            </h2>
            <p
              className="text-bni-slate text-base leading-relaxed"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              A future where every boy becomes a compassionate and capable leader — grounded in
              faith, character, and community.
            </p>
          </div>
          </SlideRight>
        </div>
      </section>

      {/* ── OUR MISSION ─────────────────────────────────────── */}
      <section style={{ background: '#ffffff', padding: '80px 0' }}>
        <div
          className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center section-inner"
          style={{ maxWidth: '1200px', padding: '0 40px' }}
        >
          <SlideLeft>
          <div>
            <h2
              className="text-bni-blue font-bold text-2xl sm:text-3xl md:text-4xl mb-6"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              Our Mission
            </h2>
            <p
              className="text-bni-slate text-base leading-relaxed"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              To empower boys at growth stages transforming them into men of purpose through
              holistic mentorship, life-skills development, and spiritual formation.
            </p>
          </div>
          </SlideLeft>
          <SlideRight>
          <div
            className="relative w-full"
            style={{ borderRadius: '16px', overflow: 'hidden', aspectRatio: '4/3' }}
          >
            <Image
              src="https://framerusercontent.com/images/wTqdx68GnSCK8utE0lxruCFEK04.jpg"
              alt="Boys participating in leadership and outdoor development activities"
              fill
              className="object-cover"
              unoptimized
            />
          </div>
          </SlideRight>
        </div>
      </section>

      {/* ── WHAT WE DO ──────────────────────────────────────── */}
      <section style={{ background: '#f3f4f8', padding: '80px 0' }}>
        <div className="section-inner" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px' }}>
          <div className="text-center mb-14">
            <FadeUp>
              <h2
                className="text-bni-navy font-bold mb-4"
                style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(1.75rem, 3vw, 2.5rem)' }}
              >
                What We Do
              </h2>
            </FadeUp>
            <FadeUp delay={0.1}>
              <p
                className="text-bni-slate text-base max-w-xl mx-auto leading-relaxed"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                We design and run a transformative <strong>One-week Camp</strong> that immerses
                participants in a carefully curated experience integrating four pillars of holistic
                development.
              </p>
            </FadeUp>
          </div>

          <StaggerGrid className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {whatWeDo.map((item) => (
              <StaggerItem key={item.title}>
                <div
                  className="flex flex-col h-full"
                  style={{
                    background: '#ffffff',
                    borderRadius: '20px',
                    padding: 'clamp(20px, 4vw, 32px)',
                    border: `1.5px solid ${item.accentBorder}`,
                    boxShadow: '0 2px 16px rgba(7,13,79,0.05)',
                  }}
                >
                  {/* Icon bubble */}
                  <div
                    className="flex items-center justify-center mb-5 shrink-0"
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: '16px',
                      background: item.accent,
                      fontSize: 26,
                    }}
                  >
                    {item.icon}
                  </div>
                  <h4
                    className="text-bni-navy font-bold text-lg mb-3"
                    style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                  >
                    {item.title}
                  </h4>
                  <p
                    className="text-bni-slate text-sm leading-relaxed"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    {item.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      {/* ── WHY WE EXIST ────────────────────────────────────── */}
      <section style={{ background: 'linear-gradient(rgb(13,23,135) 0%, rgb(7,13,79) 100%)', padding: '80px 0' }}>
        <div className="section-inner" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px' }}>
          <FadeUp>
            <h2
              className="text-white font-bold text-2xl sm:text-3xl md:text-4xl mb-8"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              Why We Exist
            </h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p
              className="text-bni-light text-base md:text-lg leading-relaxed max-w-3xl"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
            In a world of increasing complexity and shifting values, boys need intentional spaces
            where they are taught not just{' '}
            <strong className="text-white">how to succeed</strong>, but how to{' '}
            <strong className="text-white">lead with character</strong>,{' '}
            <strong className="text-white">live with purpose</strong>, and{' '}
            <strong className="text-white">build meaningful relationships</strong>. Boys Network
            International exists to fill that gap — walking with boys on their journey to manhood.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ── MEET THE MENTORS ────────────────────────────────── */}
      <MeetFounders heading="Meet the Mentors" />

      <CTABanner />
    </>
  )
}
