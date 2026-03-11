import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import PageHero from '@/components/layout/PageHero'
import FoundationalPillars from '@/components/shared/FoundationalPillars'
import MeetFounders from '@/components/shared/MeetFounders'
import CTABanner from '@/components/shared/CTABanner'

export const metadata: Metadata = {
  title: 'Programs | The Boys Network',
  description:
    'Rise & Thrive Bootcamp — a 7-day life-transforming mentorship camp for boys and young men, focusing on spiritual grounding, personal growth, life skills, and leadership.',
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

export default function ProgramsPage() {
  return (
    <>
      <PageHero
        title="Rise & Thrive Bootcamp"
        subtitle="22 August, 2026"
        bgImage="https://framerusercontent.com/images/wTqdx68GnSCK8utE0lxruCFEK04.jpg"
      />

      {/* ── PROGRAM DETAIL ──────────────────────────────────── */}
      <section style={{ background: '#ffffff', padding: '80px 0' }}>
        <div
          className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-start"
          style={{ maxWidth: '1200px', padding: '0 40px' }}
        >
          {/* Photo */}
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

          {/* Stats + buttons */}
          <div>
            <div className="flex flex-col gap-4 mb-8">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="flex items-center justify-between py-3 border-b"
                  style={{ borderColor: '#f3f4f8' }}
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
        </div>

        {/* Description */}
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '48px 40px 0' }}>
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

          <h4
            className="text-bni-navy font-bold text-lg mb-4"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            Program Highlights
          </h4>
          <ul className="flex flex-col gap-2">
            {highlights.map((h) => (
              <li
                key={h.label}
                className="flex gap-2 text-bni-slate text-sm"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                <span className="text-bni-blue font-bold shrink-0">•</span>
                <span>
                  <strong>{h.label}:</strong> {h.detail}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── FOUNDATIONAL PILLARS ────────────────────────────── */}
      <FoundationalPillars />

      {/* ── MEET THE MENTORS ────────────────────────────────── */}
      <MeetFounders heading="Meet the Mentors" />

      <CTABanner />
    </>
  )
}
