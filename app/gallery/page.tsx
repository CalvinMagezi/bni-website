import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import PageHero from '@/components/layout/PageHero'
import CTABanner from '@/components/shared/CTABanner'
import { StaggerGrid, StaggerItem } from '@/components/shared/Animate'

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

const collections = [
  {
    title: 'The Inaugural Boys Network Camp 2025',
    slug: 'the-inaugural-boys-network-camp-2025',
    coverImage: 'https://framerusercontent.com/images/zNckLAoaorpjAkb2LSzjVcez7A.jpg',
    count: 12,
  },
]

export default function GalleryPage() {
  return (
    <>
      <PageHero title="Gallery" />

      <section style={{ background: '#ffffff', padding: '80px 0' }}>
        <div className="section-inner" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px' }}>
          <StaggerGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {collections.map((col) => (
              <StaggerItem key={col.slug}>
              <Link
                href={`/gallery/${col.slug}`}
                className="group block"
              >
                <div
                  className="relative w-full overflow-hidden mb-4"
                  style={{ borderRadius: '12px', aspectRatio: '4/3' }}
                >
                  <Image
                    src={col.coverImage}
                    alt={`Cover image for ${col.title}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    unoptimized
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
                  {col.count} photos
                </p>
              </Link>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      <CTABanner />
    </>
  )
}
