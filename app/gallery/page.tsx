import type { Metadata } from 'next'
import Link from 'next/link'
import SafeImage from '@/components/shared/SafeImage'
import PageHero from '@/components/layout/PageHero'
import CTABanner from '@/components/shared/CTABanner'
import EmptyState from '@/components/shared/EmptyState'
import { StaggerGrid, StaggerItem } from '@/components/shared/Animate'
import { createClient } from '@/lib/supabase/server'

export const metadata: Metadata = {
  title: 'Gallery',
  description: 'Photos and moments from Boys Network International camps and programmes — the Rise & Thrive Bootcamp 2025.',
  alternates: { canonical: 'https://boysnetworkinternational.com/gallery' },
  openGraph: {
    title: 'Gallery | Boys Network International',
    description: 'Photos and moments from the Rise & Thrive Bootcamp and Boys Network International programmes.',
    url: 'https://boysnetworkinternational.com/gallery',
    images: [{ url: 'https://framerusercontent.com/images/zNckLAoaorpjAkb2LSzjVcez7A.jpg', width: 1200, height: 630, alt: 'Boys Network International Camp Gallery' }],
  },
}

export default async function GalleryPage() {
  const supabase = await createClient()
  const { data: collections } = await supabase
    .from('gallery_albums')
    .select('*')
    .order('created_at', { ascending: false })

  const albums = collections ?? []

  const heroSubtitle =
    albums.length > 0
      ? `Moments from our camps and events — ${albums.length} ${albums.length === 1 ? 'album' : 'albums'}`
      : 'Moments from our camps and events'

  // A lone card in a 3-column grid floats in dead space, so a sparse set
  // collapses to a centered, width-capped layout sized to its item count.
  const gridClassName =
    albums.length === 1
      ? 'grid grid-cols-1 gap-6 max-w-sm mx-auto'
      : albums.length === 2
        ? 'grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto'
        : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'

  return (
    <>
      <PageHero title="Gallery" subtitle={heroSubtitle} />

      <section style={{ background: '#ffffff', padding: '80px 0' }}>
        <div className="section-inner max-w-7xl mx-auto" style={{ padding: '0 40px' }}>
          {albums.length === 0 ? (
            <EmptyState
              icon="📸"
              title="No albums yet"
              description="Photos and moments from our camps will appear here. Check back after the next Rise & Thrive Bootcamp."
            />
          ) : (
          <StaggerGrid className={gridClassName}>
            {albums.map((col) => (
              <StaggerItem key={col.slug}>
              <Link
                href={`/gallery/${col.slug}`}
                className="group block"
              >
                <div
                  className="relative w-full overflow-hidden mb-4"
                  style={{ borderRadius: '12px', aspectRatio: '4/3' }}
                >
                  <SafeImage
                    src={col.cover_image}
                    alt={`Cover image for ${col.title}`}
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Hover overlay with "Discover More" label */}
                  <div
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: 'rgba(7,13,79,0.55)' }}
                  >
                    <span
                      className="text-white font-bold flex items-center gap-2"
                      style={{
                        fontFamily: 'Space Grotesk, sans-serif',
                        fontSize: '16px',
                        background: 'rgba(31,47,230,0.9)',
                        borderRadius: '100px',
                        padding: '10px 22px',
                        backdropFilter: 'blur(4px)',
                      }}
                    >
                      Discover More →
                    </span>
                  </div>
                </div>
                <h2
                  className="text-bni-navy font-bold text-lg group-hover:text-bni-blue transition-colors"
                  style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                >
                  {col.title}
                </h2>
                <p
                  className="text-bni-muted text-sm mt-1"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {col.photo_count} photos
                </p>
              </Link>
              </StaggerItem>
            ))}
          </StaggerGrid>
          )}
        </div>
      </section>

      <CTABanner />
    </>
  )
}
