import Image from 'next/image'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { DEFAULT_PARTNERS } from '@/lib/default-partners'
import { FadeIn } from '@/components/shared/Animate'

export default async function Partners() {
  const supabase = await createClient()
  const { data: partners } = await supabase
    .from('partners')
    .select('name, logo_url, website_url, position')
    .order('position')

  const rows = partners && partners.length > 0 ? partners : DEFAULT_PARTNERS

  return (
    <section style={{ background: '#ffffff', paddingTop: '70px', paddingBottom: '70px' }}>
      <div className="section-inner" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 100px' }}>
        <FadeIn>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
            <h3
              className="font-semibold text-3xl shrink-0"
              style={{ fontFamily: 'Space Grotesk, sans-serif', color: '#000000' }}
            >
              Partners
            </h3>
            {rows.map(partner => {
              const logoEl = (
                <div className="relative shrink-0" style={{ height: '82px', width: '250px' }}>
                  <Image
                    src={partner.logo_url}
                    alt={`${partner.name} logo`}
                    fill
                    className="object-contain"
                    unoptimized
                  />
                </div>
              )

              if (partner.website_url) {
                return (
                  <Link
                    key={partner.name}
                    href={partner.website_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={partner.name}
                  >
                    {logoEl}
                  </Link>
                )
              }

              return <div key={partner.name}>{logoEl}</div>
            })}
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
