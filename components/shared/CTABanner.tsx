import Link from 'next/link'
import { FadeUp } from '@/components/shared/Animate'

const ENROLL_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSeO84OkbLX6EMl_jYJoiR_uHcraGbuaCU2Zg7txbpXjDnXo5Q/viewform?usp=header'

export default function CTABanner() {
  return (
    <section style={{ background: '#ffffff', paddingBottom: '80px' }}>
      <div className="section-inner" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 100px' }}>
        {/* Rounded card — not full viewport width */}
        <FadeUp>
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-6"
          style={{
            background: 'linear-gradient(rgb(13,23,135) 0%, rgb(7,13,79) 100%)',
            borderRadius: '24px',
            padding: 'clamp(24px, 4vw, 36px) clamp(24px, 5vw, 48px)',
          }}
        >
          <h4
            className="text-white font-bold"
            style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(1.1rem, 2vw, 1.35rem)' }}
          >
            Ready to become the future leader
          </h4>
          <Link
            href={ENROLL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center text-white text-sm font-bold hover:opacity-90 transition-opacity"
            style={{
              background: '#1f2fe6',
              borderRadius: '100px',
              padding: '14px 28px',
              fontFamily: 'Space Grotesk, sans-serif',
            }}
          >
            Enroll Now
          </Link>
        </div>
        </FadeUp>
      </div>
    </section>
  )
}
