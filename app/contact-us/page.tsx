import type { Metadata } from 'next'
import PageHero from '@/components/layout/PageHero'
import ContactForm from '@/components/contact/ContactForm'
import CTABanner from '@/components/shared/CTABanner'
import { SlideLeft, SlideRight } from '@/components/shared/Animate'

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
  { label: 'Facebook', href: '#' },
  { label: 'Instagram', href: '#' },
  { label: 'LinkedIn', href: '#' },
  { label: 'X', href: '#' },
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
              <div className="flex flex-col gap-6">
                {directors.map((d) => (
                  <div
                    key={d.name}
                    className="p-5 rounded-xl"
                    style={{ background: '#f3f4f8' }}
                  >
                    <p
                      className="text-bni-navy font-bold text-sm mb-1"
                      style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                    >
                      {d.name} | {d.title}
                    </p>
                    {d.emails.map((email) => (
                      <a
                        key={email}
                        href={`mailto:${email}`}
                        className="block text-bni-blue text-sm hover:underline"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      >
                        {email}
                      </a>
                    ))}
                    <a
                      href={`tel:${d.phone.replace(/\s/g, '')}`}
                      className="block text-bni-slate text-sm mt-1 hover:text-bni-blue transition-colors"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      {d.phone}
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Social media */}
            <div>
              <h4
                className="text-bni-navy font-bold text-xl mb-4"
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              >
                Social media
              </h4>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-bni-navy hover:bg-bni-blue hover:text-white transition-colors"
                    style={{
                      border: '1.5px solid #e5e7eb',
                      borderRadius: '100px',
                      fontFamily: 'Space Grotesk, sans-serif',
                    }}
                  >
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
