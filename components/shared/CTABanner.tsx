import Link from 'next/link'

const ENROLL_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSeO84OkbLX6EMl_jYJoiR_uHcraGbuaCU2Zg7txbpXjDnXo5Q/viewform?usp=header'

export default function CTABanner() {
  return (
    <section style={{ background: 'linear-gradient(rgb(13,23,135) 0%, rgb(7,13,79) 100%)' }}>
      <div
        className="mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 py-8"
        style={{ maxWidth: '1200px', padding: '32px 40px' }}
      >
        <h4
          className="text-white text-lg md:text-xl font-bold"
          style={{ fontFamily: 'Space Grotesk, sans-serif' }}
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
    </section>
  )
}
