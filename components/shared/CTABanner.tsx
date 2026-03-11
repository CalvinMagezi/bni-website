import Link from 'next/link'
import { FadeUp } from '@/components/shared/Animate'

const ENROLL_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSeO84OkbLX6EMl_jYJoiR_uHcraGbuaCU2Zg7txbpXjDnXo5Q/viewform?usp=header'

export default function CTABanner() {
  return (
    <section
      style={{
        background: 'linear-gradient(rgb(13,23,135) 0%, rgb(7,13,79) 100%)',
        padding: 'clamp(48px, 6vw, 72px) 0',
      }}
    >
      <div
        className="section-inner"
        style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px' }}
      >
        <FadeUp>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            {/* Text */}
            <div>
              <h4
                className="text-white font-bold leading-tight"
                style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)',
                }}
              >
                Ready to Become the Future Leader?
              </h4>
              <p
                className="text-white/60 text-sm mt-2"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Join the Boys Network International Rise &amp; Thrive Bootcamp 2026.
              </p>
            </div>

            {/* Button */}
            <Link
              href={ENROLL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 inline-flex items-center justify-center font-bold text-sm hover:opacity-90 transition-opacity"
              style={{
                background: '#ffffff',
                color: '#070d4f',
                borderRadius: '100px',
                padding: '14px 32px',
                fontFamily: 'Space Grotesk, sans-serif',
                whiteSpace: 'nowrap',
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
