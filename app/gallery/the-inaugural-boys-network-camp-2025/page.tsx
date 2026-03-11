import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import PageHero from '@/components/layout/PageHero'
import CTABanner from '@/components/shared/CTABanner'

export const metadata: Metadata = {
  title: 'The Inaugural Boys Network Camp 2025 | Gallery | The Boys Network',
  description: 'Photos from the inaugural Boys Network International camp held in 2025.',
}

// All 12 photos extracted directly from the original site (Framer CDN)
// aspect: 'portrait' = 2:3 (1024×1536), 'landscape' = 3:2 (1024×683)
const campPhotos: { src: string; alt: string; aspect: 'portrait' | 'landscape' }[] = [
  { src: 'https://framerusercontent.com/images/tHvY3AbJZ8zaSnRhxUWdzbSA4cY.jpg',  alt: 'Boys Network Camp 2025 — activity session', aspect: 'portrait' },
  { src: 'https://framerusercontent.com/images/23E8Glzn2lG32ufwoYudaeHWI2M.jpg',  alt: 'Boys Network Camp 2025 — mentorship moment', aspect: 'portrait' },
  { src: 'https://framerusercontent.com/images/FItTHEGhmchbftUSG01x7HznJQ.jpg',   alt: 'Boys Network Camp 2025 — leadership workshop', aspect: 'portrait' },
  { src: 'https://framerusercontent.com/images/6CNYl3k4sfCKAgpMNH3l0zQ6XQo.jpg',  alt: 'Boys Network Camp 2025 — group activity', aspect: 'landscape' },
  { src: 'https://framerusercontent.com/images/2hVv3DmxdxAfuR3ce5DxKlxry4o.jpg',  alt: 'Boys Network Camp 2025 — camp programme', aspect: 'portrait' },
  { src: 'https://framerusercontent.com/images/VrM5zXzaGHj1y4jxYG5JjfkgZc.jpg',   alt: 'Boys Network Camp 2025 — practical skills', aspect: 'portrait' },
  { src: 'https://framerusercontent.com/images/ugzMo1jx88Hsj49Qgi5SEuppg.jpg',    alt: 'Boys Network Camp 2025 — outdoor session', aspect: 'landscape' },
  { src: 'https://framerusercontent.com/images/YHnOeCG842ZFYULBtDXkOYTtKaA.jpg',  alt: 'Boys Network Camp 2025 — spiritual foundation', aspect: 'portrait' },
  { src: 'https://framerusercontent.com/images/UkulDs9QxnuajA52Ju4VjH61jk.jpg',   alt: 'Boys Network Camp 2025 — character formation', aspect: 'portrait' },
  { src: 'https://framerusercontent.com/images/2Oaz7IRaE7fcY5T2G8vQSGw4ueU.jpg',  alt: 'Boys Network Camp 2025 — holistic development', aspect: 'portrait' },
  { src: 'https://framerusercontent.com/images/A5LgDdUsG2rJSt74nFgiwqTqsM.jpg',   alt: 'Boys Network Camp 2025 — community engagement', aspect: 'landscape' },
  { src: 'https://framerusercontent.com/images/6mPfUJONO954I5liILa9tzMyP4.jpg',   alt: 'Boys Network Camp 2025 — camp highlights', aspect: 'portrait' },
]

export default function CampGalleryPage() {
  return (
    <>
      <PageHero title="The Inaugural Boys Network Camp 2025" />

      <section style={{ background: '#ffffff', padding: '80px 0' }}>
        <div className="section-inner" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px' }}>

          {/* Back link */}
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 text-bni-blue text-sm font-medium mb-10 hover:opacity-70 transition-opacity"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            ← Back to Gallery
          </Link>

          {/* Photo grid — portrait and landscape at their native ratios */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-5">
            {campPhotos.map((photo) => (
              <div
                key={photo.src}
                className="relative w-full overflow-hidden"
                style={{
                  borderRadius: '12px',
                  aspectRatio: photo.aspect === 'portrait' ? '2/3' : '3/2',
                }}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover object-top hover:scale-105 transition-transform duration-500"
                  unoptimized
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  )
}
