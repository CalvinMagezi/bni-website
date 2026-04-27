import Image from 'next/image'
import { FadeUp, StaggerGrid, StaggerItem } from '@/components/shared/Animate'
import { createClient } from '@/lib/supabase/server'

interface MeetFoundersProps {
  heading?: string
}

export default async function MeetFounders({ heading = 'Meet the Founders' }: MeetFoundersProps) {
  const supabase = await createClient()
  const { data: founders } = await supabase
    .from('team_members')
    .select('*')
    .order('position')

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
        <StaggerGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {(founders ?? []).map((founder) => (
            <StaggerItem key={founder.name}>
            <div className="flex flex-col gap-4">
              <div
                className="relative w-full overflow-hidden"
                style={{ borderRadius: '16px', aspectRatio: '327 / 306' }}
              >
                {founder.image_url ? (
                  <Image
                    src={founder.image_url}
                    alt={`${founder.name}, ${founder.title} of Boys Network International`}
                    fill
                    className="object-cover object-top"
                    unoptimized
                  />
                ) : (
                  <div
                    className="w-full h-full flex items-center justify-center"
                    style={{ background: 'rgba(255,255,255,0.08)' }}
                  >
                    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="40" cy="32" r="18" fill="rgba(255,255,255,0.2)" />
                      <ellipse cx="40" cy="70" rx="28" ry="16" fill="rgba(255,255,255,0.2)" />
                    </svg>
                  </div>
                )}
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
