import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import PageHero from '@/components/layout/PageHero'
import FoundationalPillars from '@/components/shared/FoundationalPillars'
import CTABanner from '@/components/shared/CTABanner'
import { FadeUp, SlideLeft, SlideRight } from '@/components/shared/Animate'

export const metadata: Metadata = {
  title: 'Rise & Thrive Bootcamp',
  description:
    'The Rise & Thrive Bootcamp is a 7-day mentorship camp for boys in Uganda — spiritual grounding, leadership, life skills, and physical development. Enrol for August 2026.',
  alternates: { canonical: 'https://boysnetworkinternational.com/programs' },
  openGraph: {
    title: 'Rise & Thrive Bootcamp | Boys Network International',
    description: '7-day life-transforming mentorship camp for boys — spiritual grounding, leadership, life skills, and physical development. Enrol now for August 2026.',
    url: 'https://boysnetworkinternational.com/programs',
    images: [{ url: 'https://framerusercontent.com/images/PpPNLP5cXi4gOGPaBTA4sRgBUo.jpg', width: 1200, height: 800, alt: 'Boys at the Rise & Thrive Bootcamp outdoor activities' }],
  },
}

const ENROLL_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSeO84OkbLX6EMl_jYJoiR_uHcraGbuaCU2Zg7txbpXjDnXo5Q/viewform?usp=header'

const stats = [
  { icon: '⏱', label: 'Duration', value: '7 days' },
  { icon: '👦', label: 'Number', value: '150 boys' },
  { icon: '📋', label: 'Classes', value: '16' },
]

const highlights = [
  { label: 'Spiritual Growth', detail: 'Daily devotions and Bible study' },
  { label: 'Practical Skills', detail: 'Cooking, grooming, time management' },
  { label: 'Leadership Development', detail: 'Role-playing, public speaking, team challenges' },
  { label: 'Economic Empowerment', detail: 'Budgeting, entrepreneurship, vision planning' },
  { label: 'Community Engagement', detail: 'Projects, service, family roles' },
  { label: 'Physical Fitness', detail: 'Daily sports and farm work sessions' },
]

const eventSchema = {
  '@context': 'https://schema.org',
  '@type': 'Event',
  name: 'Rise & Thrive Bootcamp 2026',
  description: 'A 7-day life-transforming mentorship camp for boys and young men, focusing on spiritual grounding, personal growth, life skills, and leadership.',
  startDate: '2026-08-22',
  endDate: '2026-08-29',
  eventStatus: 'https://schema.org/EventScheduled',
  eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
  location: {
    '@type': 'Place',
    name: 'Boys Network International Camp',
    address: { '@type': 'PostalAddress', addressCountry: 'UG', addressRegion: 'Uganda' },
  },
  organizer: {
    '@type': 'Organization',
    name: 'Boys Network International',
    url: 'https://boysnetworkinternational.com',
  },
  image: 'https://framerusercontent.com/images/PpPNLP5cXi4gOGPaBTA4sRgBUo.jpg',
  url: 'https://boysnetworkinternational.com/programs',
  offers: {
    '@type': 'Offer',
    availability: 'https://schema.org/InStock',
    url: 'https://docs.google.com/forms/d/e/1FAIpQLSeO84OkbLX6EMl_jYJoiR_uHcraGbuaCU2Zg7txbpXjDnXo5Q/viewform',
  },
}

export default function ProgramsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }} />
      <PageHero
        title="Rise & Thrive Bootcamp"
        subtitle="22 August, 2026"
      />

      {/* ── PROGRAM DETAIL ──────────────────────────────────── */}
      <section style={{ background: '#ffffff', padding: '80px 0' }}>
        <div
          className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-start section-inner"
          style={{ maxWidth: '1200px', padding: '0 40px' }}
        >
          {/* Photo */}
          <SlideLeft>
          <div
            className="relative w-full"
            style={{ borderRadius: '16px', overflow: 'hidden', aspectRatio: '4/3' }}
          >
            <Image
              src="https://framerusercontent.com/images/PpPNLP5cXi4gOGPaBTA4sRgBUo.jpg"
              alt="Boys participating in the Rise & Thrive Bootcamp outdoor activities"
              fill
              className="object-cover"
              unoptimized
              priority
            />
          </div>
          </SlideLeft>

          {/* Stats + buttons */}
          <SlideRight>
          <div>
            <div className="flex flex-col gap-2 mb-8">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="flex items-center justify-between px-4 py-4 rounded-xl"
                  style={{ background: '#f3f4f8' }}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{s.icon}</span>
                    <span
                      className="text-bni-slate text-sm font-medium"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      {s.label}
                    </span>
                  </div>
                  <span
                    className="text-bni-navy font-bold text-base"
                    style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                  >
                    {s.value}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={ENROLL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center text-white font-bold text-sm hover:opacity-90 transition-opacity"
                style={{
                  background: '#1f2fe6',
                  borderRadius: '100px',
                  padding: '14px 28px',
                  fontFamily: 'Space Grotesk, sans-serif',
                }}
              >
                Enroll Now
              </Link>
              <button
                className="inline-flex items-center justify-center font-bold text-sm hover:bg-bni-gray transition-colors"
                style={{
                  border: '1.5px solid #1f2fe6',
                  color: '#1f2fe6',
                  borderRadius: '100px',
                  padding: '14px 28px',
                  fontFamily: 'Space Grotesk, sans-serif',
                  background: 'transparent',
                  cursor: 'pointer',
                }}
              >
                See program
              </button>
            </div>
          </div>
          </SlideRight>
        </div>

        {/* Description */}
        <div className="section-inner" style={{ maxWidth: '1200px', margin: '0 auto', padding: '56px 40px 0' }}>
          <FadeUp>
          <p
            className="text-bni-slate text-base leading-relaxed mb-8"
            style={{ fontFamily: 'Inter, sans-serif', maxWidth: '800px' }}
          >
            The Boys Network International 7-Day Camp is a life-transforming mentorship experience
            for boys and young men, focusing on spiritual grounding, personal growth, life skills,
            and leadership. The camp compresses the key themes from Boys Network International&apos;s
            extensive mentorship curriculum into a one-week intensive program designed to inspire
            identity discovery, purpose-driven living, and multi-generational impact. Participants
            engage in structured days filled with physical activity, spiritual reflection, mentorship
            workshops, and practical learning experiences, all in a supportive, values-driven
            environment.
          </p>
          </FadeUp>

          <FadeUp delay={0.1}>
          <h4
            className="text-bni-navy font-bold text-lg mb-4"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            Program Highlights
          </h4>
          <ul className="flex flex-col gap-3">
            {highlights.map((h) => (
              <li
                key={h.label}
                className="flex gap-3 text-bni-slate text-sm items-start px-4 py-3 rounded-xl"
                style={{ fontFamily: 'Inter, sans-serif', background: '#f9f9fb' }}
              >
                <span className="text-bni-blue font-bold shrink-0 mt-0.5">✓</span>
                <span>
                  <strong style={{ color: '#070d4f', fontFamily: 'Space Grotesk, sans-serif' }}>{h.label}:</strong>{' '}
                  {h.detail}
                </span>
              </li>
            ))}
          </ul>
          </FadeUp>
        </div>
      </section>

      {/* ── FOUNDATIONAL PILLARS ────────────────────────────── */}
      <FoundationalPillars />

      <CTABanner />
    </>
  )
}
