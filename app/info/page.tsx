'use client'

import { useState } from 'react'
import PageHero from '@/components/layout/PageHero'
import CTABanner from '@/components/shared/CTABanner'


const sections = [
  {
    title: 'Code of Conduct',
    content: `Boys Network International expects every participant to uphold our core values of respect, integrity, and community. Every boy attending the camp is expected to:

• Treat fellow participants, mentors, and staff with dignity and respect
• Participate actively and honestly in all sessions and activities
• Maintain a positive, encouraging attitude toward peers
• Abstain from bullying, discrimination, or harmful behaviour of any kind
• Honour the camp's spiritual values and faith-centred environment
• Follow all instructions from mentors and staff

Violations of the code of conduct may result in the participant being sent home. We believe every boy is capable of excellence — and we hold them to that standard.`,
  },
  {
    title: 'Safety & Protection',
    content: `The safety of every boy in our care is our highest priority. Boys Network International maintains a comprehensive Child Protection Plan which includes:

• Pre-screened mentors and staff with verified backgrounds
• Strict no-corporal-punishment policy — all discipline is restorative
• Secure camp perimeter with controlled access points
• 24-hour supervision with mentor presence in all activity areas
• Zero tolerance for abuse, harassment, or inappropriate conduct
• Emergency response protocols in place for all scenarios

All staff are trained in child safeguarding and are required to report any concerns immediately.`,
  },
  {
    title: 'People & Supervision',
    content: `Our team is carefully selected to ensure the right adult-to-child ratio and a nurturing environment:

• Maximum ratio of 1 mentor per 10 boys during all activities
• Senior leadership present on-site throughout the entire camp duration
• Dedicated medical staff and first-aiders on standby at all times
• All mentors undergo orientation and values alignment before each camp
• Discipline policy is firm, fair, and restorative — never punitive or humiliating
• Parents and guardians are notified immediately of any welfare concerns`,
  },
  {
    title: 'Crisis Management and Communication',
    content: `We are prepared for the unexpected. Our crisis management framework ensures that every situation is handled swiftly and transparently:

• Dedicated emergency contact line operational 24/7 during camp
• Incident reporting protocol: mentors → camp director → parents → authorities as appropriate
• First aid kits available at all activity sites
• Nearest hospital and emergency services pre-identified and on speed dial
• Parents receive daily updates via WhatsApp group and are contacted immediately in any emergency
• Post-incident review conducted after any significant event`,
  },
  {
    title: 'Facilities and Wellness',
    content: `We are committed to providing a comfortable, clean, and safe physical environment:

Accommodation: Boys are housed in supervised dormitories, segregated by age group. Bedding and basic toiletries are provided.

Health Services: A qualified nurse is present on-site throughout the camp. Participants must submit a medical history form prior to arrival. All medications are managed and administered by the medical team.

Food Services: Three nutritious meals are provided daily plus snacks. Dietary requirements and allergies are accommodated — please notify us in advance.

Hygiene: Regular cleaning schedules are maintained. Participants are taught and expected to maintain personal hygiene standards.`,
  },
  {
    title: 'Transport and Logistics',
    content: `Safe, reliable transport is arranged for all participants:

• All vehicles used are licensed, insured, and regularly inspected
• Only verified, experienced drivers are engaged
• Routes are pre-planned and communicated to parents in advance
• Real-time location updates provided to parents during travel
• No participant travels alone — adults are present on all journeys
• Drop-off and pick-up points are clearly communicated prior to camp

Parents are responsible for getting their boys to the designated assembly point. Assistance can be arranged for those with transport difficulties — please contact us in advance.`,
  },
  {
    title: 'Faith & Family Values',
    content: `Faith is at the heart of everything we do at Boys Network International:

Spiritual Formation: Daily devotions, worship sessions, and Bible study are woven throughout each day. Our approach is grounded in Christian faith while remaining respectful of all participants.

Prayer: Boys are encouraged to develop a personal prayer life and to intercede for their families and communities.

Parent Communication: We partner with parents as the primary authority in a boy's life. Weekly summaries are shared and parents are encouraged to continue conversations at home.

Family Roles: Boys learn about their responsibilities as sons, brothers, and future husbands and fathers — building a strong foundation for family life.`,
  },
]

function AccordionItem({
  title,
  content,
  isOpen,
  onToggle,
}: {
  title: string
  content: string
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <div
      className="border-b"
      style={{ borderColor: '#e5e7eb' }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-5 text-left"
      >
        <h3
          className="font-bold text-base md:text-lg"
          style={{
            fontFamily: 'Space Grotesk, sans-serif',
            color: isOpen ? '#1f2fe6' : '#0d1787',
          }}
        >
          {title}
        </h3>
        <span
          className="shrink-0 ml-4 text-xl font-light transition-transform duration-300"
          style={{
            color: '#1f2fe6',
            transform: isOpen ? 'rotate(45deg)' : 'none',
          }}
        >
          +
        </span>
      </button>
      {isOpen && (
        <div className="pb-6">
          <p
            className="text-bni-slate text-sm leading-loose whitespace-pre-line"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            {content}
          </p>
        </div>
      )}
    </div>
  )
}

export default function InfoPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <>
      <PageHero title="Important Information" />

      <section style={{ background: '#ffffff', padding: '80px 0' }}>
        <div className="section-inner" style={{ maxWidth: '860px', margin: '0 auto', padding: '0 40px' }}>
          <p
            className="text-bni-slate text-base leading-relaxed mb-12"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Please read through this information carefully before enrolling your son or ward in
            the Boys Network International camp. If you have any questions, don&apos;t hesitate
            to{' '}
            <a href="/contact-us" className="text-bni-blue hover:underline">
              contact us
            </a>
            .
          </p>

          <div>
            {sections.map((section, index) => (
              <AccordionItem
                key={section.title}
                title={section.title}
                content={section.content}
                isOpen={openIndex === index}
                onToggle={() => setOpenIndex(openIndex === index ? null : index)}
              />
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  )
}
