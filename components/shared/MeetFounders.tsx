import Image from 'next/image'
import { FadeUp, StaggerGrid, StaggerItem } from '@/components/shared/Animate'

interface MeetFoundersProps {
  heading?: string
}

const founders = [
  {
    name: 'Bryan Muwonge',
    title: 'Founder',
    image: 'https://framerusercontent.com/images/5v7dGA4WDpwIeNXkE4HwYyfNjcE.jpg',
  },
  {
    name: 'Alyce Kampire Muwonge',
    title: 'Co- Founder',
    image: 'https://framerusercontent.com/images/Mpfb4UC3smoeX6ukSqlYGSZvt2g.jpg',
  },
  {
    name: 'Pastor Sam Muyinda',
    title: 'Co- Founder',
    image: 'https://framerusercontent.com/images/xFGs0HH0etkFYMRyCi2kYJSgyE.jpg',
  },
]

export default function MeetFounders({ heading = 'Meet the Founders' }: MeetFoundersProps) {
  return (
    <section style={{ background: 'linear-gradient(rgb(13,23,135) 0%, rgb(7,13,79) 100%)' }}>
      <div className="section-inner section-v-pad" style={{ maxWidth: '1200px', margin: '0 auto', padding: '100px' }}>
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-14">
          <FadeUp>
            <h2
              className="text-white font-bold leading-tight"
              style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: 'clamp(2.2rem, 4vw, 3.44rem)',
              }}
            >
              {heading}
            </h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p
              className="text-bni-light text-sm md:text-base max-w-xs"
              style={{ fontFamily: 'Inter, sans-serif', paddingTop: '8px' }}
            >
              Our mentors bring expertise and heart to every programme.
            </p>
          </FadeUp>
        </div>

        {/* Cards */}
        <StaggerGrid className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {founders.map((founder) => (
            <StaggerItem key={founder.name}>
            <div className="flex flex-col gap-4">
              <div
                className="relative w-full overflow-hidden"
                style={{ borderRadius: '16px', aspectRatio: '327 / 306' }}
              >
                <Image
                  src={founder.image}
                  alt={`${founder.name}, ${founder.title} of Boys Network International`}
                  fill
                  className="object-cover object-top"
                  unoptimized
                />
              </div>
              <div>
                <h4
                  className="text-white font-bold text-base"
                  style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                >
                  {founder.name}
                </h4>
                <p
                  className="text-bni-light text-sm"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {founder.title}
                </p>
              </div>
            </div>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </div>
    </section>
  )
}
