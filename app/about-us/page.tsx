import type { Metadata } from 'next'
import Image from 'next/image'
import PageHero from '@/components/layout/PageHero'
import MeetFounders from '@/components/shared/MeetFounders'
import CTABanner from '@/components/shared/CTABanner'
import { FadeUp, SlideLeft, SlideRight } from '@/components/shared/Animate'

export const metadata: Metadata = {
  title: 'About Us | The Boys Network',
  description:
    'Boys Network International is a faith-based mentorship and leadership organisation committed to raising the next generation of grounded, confident, and purpose-driven young men.',
}

const whatWeDo = [
  {
    icon: '🙏',
    title: 'Spiritual growth',
    description: 'Through daily fellowship and guided reflection',
  },
  {
    icon: '👑',
    title: 'Leadership development',
    description: 'Via hands-on challenges and mentorship',
  },
  {
    icon: '💰',
    title: 'Financial and life literacy',
    description: 'Including entrepreneurship, grooming, and career exploration',
  },
  {
    icon: '🤝',
    title: 'Community engagement',
    description: 'That fosters empathy and a servant-leader mindset and nurtures lifelong friendship',
  },
]

export default function AboutPage() {
  return (
    <>
      <PageHero title="About Us" />

      {/* ── WHO WE ARE ──────────────────────────────────────── */}
      <section style={{ background: '#ffffff', padding: '80px 0' }}>
        <div
          className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center section-inner"
          style={{ maxWidth: '1200px', padding: '0 40px' }}
        >
          <SlideLeft>
          <div>
            <h2
              className="text-bni-blue font-bold text-3xl md:text-4xl mb-6"
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
          className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center section-inner"
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
              className="text-bni-blue font-bold text-3xl md:text-4xl mb-6"
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
          className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center section-inner"
          style={{ maxWidth: '1200px', padding: '0 40px' }}
        >
          <SlideLeft>
          <div>
            <h2
              className="text-bni-blue font-bold text-3xl md:text-4xl mb-6"
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
          <div className="text-center mb-12">
            <FadeUp>
              <h2
                className="text-bni-navy font-bold text-3xl md:text-4xl mb-4"
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              >
                What We Do
              </h2>
            </FadeUp>
            <FadeUp delay={0.1}>
              <p
                className="text-bni-slate text-base max-w-2xl mx-auto"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                We design and run a transformative{' '}
                <strong>One-week Camp</strong>, which immerses participants in a carefully curated
                experience that integrates:
              </p>
            </FadeUp>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {whatWeDo.map((item) => (
              <div
                key={item.title}
                className="flex gap-4 items-start p-6 bg-white"
                style={{ borderRadius: '12px' }}
              >
                <span className="text-2xl shrink-0">{item.icon}</span>
                <div>
                  <h4
                    className="text-bni-navy font-bold text-base mb-1"
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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY WE EXIST ────────────────────────────────────── */}
      <section style={{ background: 'linear-gradient(rgb(13,23,135) 0%, rgb(7,13,79) 100%)', padding: '80px 0' }}>
        <div className="section-inner" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px' }}>
          <FadeUp>
            <h2
              className="text-white font-bold text-3xl md:text-4xl mb-8"
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
