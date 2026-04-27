import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import PageHero from '@/components/layout/PageHero'
import CTABanner from '@/components/shared/CTABanner'
import { StaggerGrid, StaggerItem } from '@/components/shared/Animate'
import { createClient } from '@/lib/supabase/server'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const supabase = await createClient()
  const { data: album } = await supabase.from('gallery_albums').select('*').eq('slug', slug).single()
  if (!album) return {}
  return {
    title: album.title,
    description: `Photos from the ${album.title} — Boys Network International`,
    alternates: { canonical: `https://boysnetworkinternational.com/gallery/${album.slug}` },
    openGraph: {
      title: `${album.title} | Gallery`,
      url: `https://boysnetworkinternational.com/gallery/${album.slug}`,
      images: [{ url: album.cover_image, width: 1200, height: 630, alt: album.title }],
    },
  }
}

export default async function GalleryAlbumPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const supabase = await createClient()
  const { data: album } = await supabase.from('gallery_albums').select('*').eq('slug', slug).single()
  if (!album) notFound()
  const { data: photos } = await supabase.from('gallery_photos').select('*').eq('album_id', album.id).order('position')

  return (
    <>
      <PageHero title={album.title} />
      <section style={{ background: '#ffffff', padding: '80px 0' }}>
        <div className="section-inner" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px' }}>
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 text-bni-blue text-sm font-medium mb-10 hover:opacity-70 transition-opacity"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            ← Back to Gallery
          </Link>
          <StaggerGrid className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-5">
            {(photos ?? []).map((photo) => (
              <StaggerItem key={photo.id}>
                <div
                  className="relative w-full overflow-hidden"
                  style={{ borderRadius: '12px', aspectRatio: photo.aspect === 'portrait' ? '2/3' : '3/2' }}
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    className="object-cover object-top hover:scale-105 transition-transform duration-500"
                    unoptimized
                  />
                </div>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>
      <CTABanner />
    </>
  )
}
