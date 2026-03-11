import Image from 'next/image'

interface Founder {
  name: string
  title: string
  image: string
}

interface MeetFoundersProps {
  heading?: string
}

const founders: Founder[] = [
  {
    name: 'Bryan Muwonge',
    title: 'Founder',
    image: 'https://framerusercontent.com/images/5v7dGA4WDpwIeNXkE4HwYyfNjcE.jpg',
  },
  {
    name: 'Alyce Kampire Muwonge',
    title: 'Co-Founder',
    image: 'https://framerusercontent.com/images/Mpfb4UC3smoeX6ukSqlYGSZvt2g.jpg',
  },
  {
    name: 'Pastor Sam Muyinda',
    title: 'Co-Founder',
    image: 'https://framerusercontent.com/images/xFGs0HH0etkFYMRyCi2kYJSgyE.jpg',
  },
]

export default function MeetFounders({ heading = 'Meet the Founders' }: MeetFoundersProps) {
  return (
    <section style={{ background: 'linear-gradient(rgb(13,23,135) 0%, rgb(7,13,79) 100%)' }}>
      <div
        className="mx-auto py-20"
        style={{ maxWidth: '1200px', padding: '80px 40px' }}
      >
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-14">
          <h2
            className="text-white text-3xl md:text-4xl font-bold"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            {heading}
          </h2>
          <p
            className="text-bni-light text-sm md:text-base max-w-xs"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Our mentors bring expertise and heart to every programme.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {founders.map((founder) => (
            <div key={founder.name} className="flex flex-col gap-3">
              <div
                className="relative w-full overflow-hidden"
                style={{ borderRadius: '12px', aspectRatio: '3/4' }}
              >
                <Image
                  src={founder.image}
                  alt={`${founder.name}, ${founder.title} of Boys Network International`}
                  fill
                  className="object-cover"
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
          ))}
        </div>
      </div>
    </section>
  )
}
