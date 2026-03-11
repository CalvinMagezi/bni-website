import type { Metadata } from 'next'
import PageHero from '@/components/layout/PageHero'
import ContactForm from '@/components/contact/ContactForm'
import CTABanner from '@/components/shared/CTABanner'
import { FadeUp, SlideLeft, SlideRight } from '@/components/shared/Animate'

export const metadata: Metadata = {
  title: 'Contact Us | The Boys Network',
  description:
    'Get in touch with Boys Network International. We\'d love to hear from you.',
}

const directors = [
  {
    name: 'Alyce Kampire Muwonge',
    title: 'Director',
    emails: ['akampire.boysnetworkint@gmail.com', 'alycemk@gmail.com'],
    phone: '+256 75 7026880',
  },
  {
    name: 'Bryan Muwonge',
    title: 'Director',
    emails: ['bmuwonge.boysnetworkint@gmail.com', 'muwongeb@gmail.com'],
    phone: '+256 70 400 6880',
  },
  {
    name: 'Sam Muyinda',
    title: 'Director',
    emails: ['smuyinda.boysnetworkint@gmail.com', 'muyindas@gmail.com'],
    phone: '+256 70 252 5277',
  },
]

const socialLinks = [
  { label: 'Facebook', href: '#', icon: '📘' },
  { label: 'Instagram', href: '#', icon: '📸' },
  { label: 'LinkedIn', href: '#', icon: '💼' },
  { label: 'X / Twitter', href: '#', icon: '𝕏' },
]

export default function ContactPage() {
  return (
    <>
      <PageHero title="Contact Us" />

      <section style={{ background: '#ffffff', padding: '80px 0' }}>
        <div
          className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 section-inner"
          style={{ maxWidth: '1200px', padding: '0 40px' }}
        >
          {/* Form */}
          <SlideLeft>
            <ContactForm />
          </SlideLeft>

          {/* Contact info */}
          <SlideRight>
          <div className="flex flex-col gap-10">
            {/* Directors */}
            <div>
              <h4
                className="text-bni-navy font-bold text-xl mb-6"
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              >
                Contact
              </h4>
              <div className="flex flex-col gap-4">
                {directors.map((d) => (
                  <div
                    key={d.name}
                    className="p-6 rounded-2xl"
                    style={{
                      background: '#f3f4f8',
                      border: '1.5px solid rgba(7,13,79,0.06)',
                    }}
                  >
                    <p
                      className="text-bni-navy font-bold text-base mb-3"
                      style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                    >
                      {d.name}
                      <span
                        className="ml-2 text-xs font-semibold px-2 py-0.5 rounded-full"
                        style={{ background: '#e8eaf0', color: '#515c63', fontFamily: 'Inter, sans-serif' }}
                      >
                        {d.title}
                      </span>
                    </p>
                    <div className="flex flex-col gap-1.5">
                      {d.emails.map((email) => (
                        <a
                          key={email}
                          href={`mailto:${email}`}
                          className="text-bni-blue text-sm hover:underline inline-flex items-center gap-1.5"
                          style={{ fontFamily: 'Inter, sans-serif' }}
                        >
                          <span style={{ fontSize: 12 }}>✉</span> {email}
                        </a>
                      ))}
                      <a
                        href={`tel:${d.phone.replace(/\s/g, '')}`}
                        className="text-bni-slate text-sm hover:text-bni-blue transition-colors inline-flex items-center gap-1.5 mt-1"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      >
                        <span style={{ fontSize: 12 }}>📞</span> {d.phone}
                      </a>
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
                Social Media
              </h4>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
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
