import type { Metadata } from 'next'
import PageHero from '@/components/layout/PageHero'
import ContactForm from '@/components/contact/ContactForm'
import CTABanner from '@/components/shared/CTABanner'
import { FadeUp, SlideLeft, SlideRight } from '@/components/shared/Animate'
import { Chat, Phone, Mail, TikTok, Instagram, XTwitter, LinkedIn } from '@/components/shared/Icons'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with The Boys Network International. Reach our directors by email or phone, or send us a message directly.',
  alternates: { canonical: 'https://boysnetworkinternational.com/contact-us' },
  openGraph: {
    title: 'Contact Us | The Boys Network International',
    description: 'Reach our directors by email or phone, or send us a message directly.',
    url: 'https://boysnetworkinternational.com/contact-us',
  },
}

const contactChannels = [
  {
    label: 'WhatsApp (MTN)',
    value: '+256 791 408 459',
    href: 'https://wa.me/256791408459?text=Hi%21%20I%27m%20on%20The%20Boys%20Network%20International%20website%20and%20I%27d%20like%20to%20learn%20more.',
    Icon: Chat,
  },
  {
    label: 'Phone (Airtel)',
    value: '+256 741 132 842',
    href: 'tel:+256741132842',
    Icon: Phone,
  },
  {
    label: 'Email',
    value: 'theboysnetworkinternational@gmail.com',
    href: 'mailto:theboysnetworkinternational@gmail.com',
    Icon: Mail,
  },
]

const paymentOptions = [
  {
    label: 'MTN MoMo',
    code: '657538',
    codeLabel: 'Merchant Code',
    line: '*165*3# · BNINT - BOYS NETWORK INT',
    accent: '#f5c518',
    accentText: '#070d4f',
  },
  {
    label: 'Airtel Money',
    code: '4395441',
    codeLabel: 'Merchant Code',
    line: '*185*9# · BNINT - BOYS NETWORK INT',
    accent: '#ef4444',
    accentText: '#ffffff',
  },
  {
    label: 'Bank Transfer',
    code: '6009569136',
    codeLabel: 'Account No.',
    line: 'Absa Bank · BNINT (U) Limited',
    accent: '#ffffff',
    accentText: '#070d4f',
  },
]

const socialLinks = [
  { label: 'TikTok', href: 'https://www.tiktok.com/@boysnetworkint', Icon: TikTok },
  { label: 'Instagram', href: 'https://instagram.com/boysnetworkint', Icon: Instagram },
  { label: 'X / Twitter', href: 'https://twitter.com/BoysNetworkInt', Icon: XTwitter },
  { label: 'LinkedIn', href: 'https://ug.linkedin.com/in/the-boys-network-international-9790a5375', Icon: LinkedIn },
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
                    <c.Icon size={24} className="text-bni-blue shrink-0" />
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
                    className="flex items-center justify-between gap-4"
                    style={{
                      background: 'linear-gradient(135deg, #0d1787, #070d4f)',
                      border: '1.5px solid rgba(255,255,255,0.08)',
                      borderRadius: '16px',
                      padding: '22px 24px',
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
                        className="text-white/85 text-xs mt-1"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      >
                        {p.line}
                      </p>
                    </div>
                    <div
                      className="text-right shrink-0"
                      style={{
                        background: p.accent,
                        borderRadius: '10px',
                        padding: '10px 16px',
                      }}
                    >
                      <p
                        className="font-bold text-base"
                        style={{ fontFamily: 'Space Grotesk, sans-serif', color: p.accentText, letterSpacing: '0.02em' }}
                      >
                        {p.code}
                      </p>
                      <p
                        style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, color: p.accentText, opacity: 0.8 }}
                      >
                        {p.codeLabel}
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
                    aria-label={s.label}
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
                    <s.Icon size={16} />
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
