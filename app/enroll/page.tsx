import type { Metadata } from 'next'
import EnrollmentForm from '@/components/enroll/EnrollmentForm'

export const metadata: Metadata = {
  title: 'Enroll — Rise & Thrive Bootcamp 2026',
  description: 'Complete your enrollment for the Rise & Thrive Bootcamp 2026. A 7-day mentorship camp for boys in Uganda — August 23–29, 2026.',
  alternates: { canonical: 'https://boysnetworkinternational.com/enroll' },
}

interface Props {
  searchParams: Promise<{ name?: string; age?: string; interest?: string; email?: string }>
}

export default async function EnrollPage({ searchParams }: Props) {
  const params = await searchParams

  const prefill = {
    boy_name: params.name ?? '',
    boy_age: params.age ?? '',
    interests: params.interest ? [params.interest] : [],
    parent_email: params.email ?? '',
  }

  return (
    <>
      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, #070d4f 0%, #1f2fe6 100%)', paddingTop: '120px', paddingBottom: '64px' }}>
        <div style={{ maxWidth: '680px', margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
          <span style={{ display: 'inline-block', background: 'rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.9)', borderRadius: '100px', padding: '6px 16px', fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 500, marginBottom: '16px', letterSpacing: '0.02em' }}>
            Rise &amp; Thrive Bootcamp 2026
          </span>
          <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(28px, 6vw, 44px)', fontWeight: 800, color: '#ffffff', lineHeight: 1.1, marginBottom: '16px' }}>
            Enroll Your Son
          </h1>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(14px, 2.5vw, 17px)', color: 'rgba(255,255,255,0.75)', lineHeight: 1.65, maxWidth: '480px', margin: '0 auto' }}>
            Complete the form below to secure your son&apos;s place at camp — 23–29 August 2026, Uganda.
          </p>
        </div>
      </div>

      {/* Form */}
      <div style={{ background: '#f8f9fb', padding: '48px 24px 80px' }}>
        <div style={{ maxWidth: '680px', margin: '0 auto' }}>
          <EnrollmentForm prefill={prefill} />
        </div>
      </div>
    </>
  )
}
