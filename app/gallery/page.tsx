import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import PageHero from '@/components/layout/PageHero'
import CTABanner from '@/components/shared/CTABanner'

export const metadata: Metadata = {
  title: 'Gallery | The Boys Network',
  description: 'Moments from Boys Network International camps and programmes.',
}

const collections = [
  {
    title: 'The Inaugural Boys Network Camp 2025',
    slug: 'the-inaugural-boys-network-camp-2025',
    coverImage: 'https://framerusercontent.com/images/PpPNLP5cXi4gOGPaBTA4sRgBUo.jpg',
    count: 3,
  },
]

export default function GalleryPage() {
  return (
    <>
      <PageHero title="Gallery" />

      <section style={{ background: '#ffffff', padding: '80px 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px' }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {collections.map((col) => (
              <Link
                key={col.slug}
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
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: 'rgba(31,47,230,0.15)' }}
                  />
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
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  )
}
