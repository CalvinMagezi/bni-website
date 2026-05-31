import { FadeUp, StaggerGrid, StaggerItem } from '@/components/shared/Animate'
import SafeImage from '@/components/shared/SafeImage'
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
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: 'clamp(60px, 8vw, 100px) clamp(20px, 6vw, 80px)' }}>

        {/* Header */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '60px', maxWidth: '600px' }}>
          <FadeUp>
            <h2
              style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: 'clamp(2rem, 4vw, 3.2rem)',
                fontWeight: 700,
                color: '#ffffff',
                lineHeight: 1.1,
              }}
            >
              {heading}
            </h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '15px', color: 'rgba(255,255,255,0.85)', lineHeight: 1.6, marginTop: '8px' }}>
              Our mentors bring decades of real-world experience and a deep commitment to raising the next generation of men.
            </p>
          </FadeUp>
        </div>

        {/* Cards */}
        <StaggerGrid style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 460px), 1fr))', gap: '20px' }}>
          {(founders ?? []).map((founder) => (
            <StaggerItem key={founder.id}>
              <div style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '20px',
                padding: '28px',
                display: 'flex',
                gap: '24px',
                alignItems: 'flex-start',
                backdropFilter: 'blur(8px)',
              }}>
                {/* Photo */}
                <div style={{
                  width: '96px',
                  height: '96px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  flexShrink: 0,
                  background: 'rgba(255,255,255,0.1)',
                  position: 'relative',
                  border: '2px solid rgba(255,255,255,0.15)',
                }}>
                  <SafeImage
                    src={founder.image_url}
                    alt={founder.name}
                    fallback="avatar"
                    objectPosition="top"
                  />
                </div>

                {/* Text */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h4 style={{
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontSize: '17px',
                    fontWeight: 700,
                    color: '#ffffff',
                    marginBottom: '3px',
                  }}>
                    {founder.name}
                  </h4>
                  <p style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '12px',
                    fontWeight: 500,
                    color: 'rgba(255,255,255,0.7)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    marginBottom: '12px',
                  }}>
                    {founder.title}
                  </p>
                  {founder.bio && (
                    <p style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '13.5px',
                      color: 'rgba(255,255,255,0.7)',
                      lineHeight: 1.75,
                      display: '-webkit-box',
                      WebkitLineClamp: 5,
                      WebkitBoxOrient: 'vertical' as const,
                      overflow: 'hidden',
                    }}>
                      {founder.bio}
                    </p>
                  )}
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </div>
    </section>
  )
}
