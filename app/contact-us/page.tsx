import type { Metadata } from 'next'
import PageHero from '@/components/layout/PageHero'
import ContactForm from '@/components/contact/ContactForm'
import CTABanner from '@/components/shared/CTABanner'
import { FadeUp, SlideLeft, SlideRight } from '@/components/shared/Animate'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with Boys Network International. Reach our directors by email or phone, or send us a message directly.',
  alternates: { canonical: 'https://boysnetworkinternational.com/contact-us' },
  openGraph: {
    title: 'Contact Us | Boys Network International',
    description: 'Reach our directors by email or phone, or send us a message directly.',
    url: 'https://boysnetworkinternational.com/contact-us',
  },
}

const contactChannels = [
  {
    label: 'WhatsApp (MTN)',
    value: '+256 791 408 459',
    href: 'https://wa.me/256791408459?text=Hi%21%20I%27m%20on%20the%20Boys%20Network%20International%20website%20and%20I%27d%20like%20to%20learn%20more.',
    icon: '💬',
  },
  {
    label: 'Phone (Airtel)',
    value: '+256 741 132 842',
    href: 'tel:+256741132842',
    icon: '📞',
  },
  {
    label: 'Email',
    value: 'theboysnetworkinternational@gmail.com',
    href: 'mailto:theboysnetworkinternational@gmail.com',
    icon: '✉️',
  },
]

const paymentOptions = [
  {
    label: 'MTN MoMo',
    code: '657538',
    ussd: '*165*3#',
    name: 'BNINT - BOYS NETWORK INT',
  },
  {
    label: 'Airtel Money',
    code: '4395441',
    ussd: '*185*9#',
    name: 'BNINT - BOYS NETWORK INT',
  },
]

const socialLinks = [
  { label: 'TikTok', href: 'https://www.tiktok.com/@boysnetworkinternational', icon: '🎵' },
  { label: 'Instagram', href: 'https://instagram.com/boysnetworkint', icon: '📸' },
  { label: 'X / Twitter', href: 'https://twitter.com/BoysNetworkInt', icon: '𝕏' },
  { label: 'Facebook', href: '#', icon: '📘' },
  { label: 'LinkedIn', href: '#', icon: '💼' },
]

export default function ContactPage() {
  return (
    <>
      <PageHero title="Contact Us" />

      <section style={{ background: '#ffffff', padding: '80px 0' }}>
        <div
          className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 section-inner"
          style={{ maxWidth: '1200px', padding: '0 40px' }}
        >
          {/* Form */}
          <SlideLeft>
            <ContactForm />
          </SlideLeft>

          {/* Contact info */}
          <SlideRight>
          <div className="flex flex-col gap-10">
            {/* Company contact */}
            <div>
              <h4
                className="text-bni-navy font-bold text-xl mb-6"
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              >
                Get in Touch
              </h4>
              <div className="flex flex-col gap-4">
                {contactChannels.map((c) => (
                  <a
                    key={c.label}
                    href={c.href}
                    target={c.href.startsWith('http') ? '_blank' : undefined}
                    rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="p-5 rounded-2xl flex items-center gap-4 hover:shadow-md transition-shadow"
                    style={{
                      background: '#f3f4f8',
                      border: '1.5px solid rgba(7,13,79,0.06)',
                      textDecoration: 'none',
                    }}
                  >
                    <span style={{ fontSize: 24 }}>{c.icon}</span>
                    <div>
                      <p
                        className="text-bni-navy font-bold text-sm"
                        style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                      >
                        {c.label}
                      </p>
                      <p
                        className="text-bni-blue text-sm mt-0.5"
                        style={{ fontFamily: 'Inter, sans-serif', wordBreak: 'break-all' }}
                      >
                        {c.value}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Payment options */}
            <div>
              <h4
                className="text-bni-navy font-bold text-xl mb-5"
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              >
                Pay for Camp
              </h4>
              <div className="flex flex-col gap-3">
                {paymentOptions.map((p) => (
                  <div
                    key={p.label}
                    className="p-5 rounded-2xl flex items-center justify-between"
                    style={{
                      background: 'linear-gradient(135deg, #0d1787, #070d4f)',
                      border: '1.5px solid rgba(255,255,255,0.08)',
                    }}
                  >
                    <div>
                      <p
                        className="text-white font-bold text-sm"
                        style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                      >
                        {p.label}
                      </p>
                      <p
                        className="text-white/60 text-xs mt-0.5"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      >
                        {p.ussd} · {p.name}
                      </p>
                    </div>
                    <div
                      className="text-right"
                      style={{
                        background: p.label === 'MTN MoMo' ? '#f5c518' : '#ef4444',
                        borderRadius: '8px',
                        padding: '6px 14px',
                      }}
                    >
                      <p
                        className="font-bold text-base"
                        style={{ fontFamily: 'Space Grotesk, sans-serif', color: p.label === 'MTN MoMo' ? '#070d4f' : '#fff' }}
                      >
                        {p.code}
                      </p>
                      <p
                        style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, color: p.label === 'MTN MoMo' ? '#070d4f' : '#fff', opacity: 0.8 }}
                      >
                        Merchant Code
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social media */}
            <div>
              <h4
                className="text-bni-navy font-bold text-xl mb-5"
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              >
                Follow Us
              </h4>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target={s.href !== '#' ? '_blank' : undefined}
                    rel={s.href !== '#' ? 'noopener noreferrer' : undefined}
                    className="inline-flex items-center gap-2 font-semibold text-sm text-bni-navy hover:bg-bni-blue hover:text-white hover:border-bni-blue transition-all"
                    style={{
                      border: '1.5px solid #d1d5db',
                      borderRadius: '100px',
                      padding: '10px 20px',
                      fontFamily: 'Space Grotesk, sans-serif',
                    }}
                  >
                    <span style={{ fontSize: 15 }}>{s.icon}</span>
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
          </SlideRight>
        </div>
      </section>

      <CTABanner />
    </>
  )
}
