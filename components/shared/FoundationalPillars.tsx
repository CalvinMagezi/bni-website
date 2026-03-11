import Image from 'next/image'

const pillars = [
  {
    title: 'Spiritual Foundation',
    description: 'Daily devotions & Bible study, Purpose, Identity rooted in Christ',
    image: 'https://framerusercontent.com/images/ushcJaHUEQISMdAgpQ84KYQEY24.jpg',
    alt: 'Boys in prayer and spiritual study',
  },
  {
    title: 'Character Formation',
    description: 'Mentorship & accountability, Discipline, Family & community',
    image: 'https://framerusercontent.com/images/Ohp4bhiHSQKQOIGd0A4n46icVK4.jpg',
    alt: 'Young man developing character through mentorship',
  },
  {
    title: 'Holistic Development',
    description: 'Leadership lessons, Practical skills, Physical development',
    image: 'https://framerusercontent.com/images/PpPNLP5cXi4gOGPaBTA4sRgBUo.jpg',
    alt: 'Boys engaged in physical and leadership development activities',
  },
]

export default function FoundationalPillars({ topPadding = '80px' }: { topPadding?: string }) {
  return (
    <section className="pillars-section section-v-pad" style={{ background: '#f3f4f8', paddingTop: topPadding, paddingBottom: '100px' }}>
      <div className="section-inner" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 100px' }}>
        {/* Header row */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-14">
          <h2
            className="font-bold leading-tight"
            style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: 'clamp(2.2rem, 4vw, 3.44rem)',
              color: '#1f2fe6',
              maxWidth: '340px',
            }}
          >
            Our Foundational Pillars
          </h2>
          <p
            className="text-bni-slate text-sm md:text-base max-w-xs"
            style={{ fontFamily: 'Inter, sans-serif', paddingTop: '8px' }}
          >
            We develop boys holistically — spiritually, intellectually, physically, and socially
            through three pillars:
          </p>
        </div>

        {/* Pillar cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="relative overflow-hidden"
              style={{ borderRadius: '24px', aspectRatio: '327 / 390' }}
            >
              <Image
                src={pillar.image}
                alt={pillar.alt}
                fill
                className="object-cover"
                unoptimized
              />
              {/* Dark gradient overlay */}
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(rgba(0,0,0,0) 0%, rgba(0,0,0,0.82) 100%)',
                }}
              />
              {/* Text — 38px padding matching original */}
              <div className="absolute bottom-0 left-0 right-0" style={{ padding: '38px' }}>
                <h3
                  className="text-white font-bold text-xl mb-2"
                  style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                >
                  {pillar.title}
                </h3>
                <p
                  className="text-bni-light text-sm leading-relaxed"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {pillar.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
