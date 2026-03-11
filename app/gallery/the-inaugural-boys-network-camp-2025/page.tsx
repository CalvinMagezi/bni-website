import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import PageHero from '@/components/layout/PageHero'
import CTABanner from '@/components/shared/CTABanner'

export const metadata: Metadata = {
  title: 'The Inaugural Boys Network Camp 2025 | Gallery | The Boys Network',
  description: 'Photos from the inaugural Boys Network International camp held in 2025.',
}

// The 3 visible camp photos captured during site analysis
const campPhotos = [
  {
    src: 'https://framerusercontent.com/images/5v7dGA4WDpwIeNXkE4HwYyfNjcE.jpg',
    alt: 'Camp leader speaking on stage at the inaugural Boys Network Camp 2025',
  },
  {
    src: 'https://framerusercontent.com/images/Mpfb4UC3smoeX6ukSqlYGSZvt2g.jpg',
    alt: 'Boys engaged in woodworking and hands-on practical skills at camp',
  },
  {
    src: 'https://framerusercontent.com/images/xFGs0HH0etkFYMRyCi2kYJSgyE.jpg',
    alt: 'Boy using power tools during practical skills training at the camp',
  },
  {
    src: 'https://framerusercontent.com/images/Ohp4bhiHSQKQOIGd0A4n46icVK4.jpg',
    alt: 'Young man studying and reading during the camp programme',
  },
  {
    src: 'https://framerusercontent.com/images/wTqdx68GnSCK8utE0lxruCFEK04.jpg',
    alt: 'Boys participating in outdoor physical activities at camp',
  },
  {
    src: 'https://framerusercontent.com/images/PpPNLP5cXi4gOGPaBTA4sRgBUo.jpg',
    alt: 'Group of boys smiling and bonding during the inaugural camp',
  },
]

export default function CampGalleryPage() {
  return (
    <>
      <PageHero title="The Inaugural Boys Network Camp 2025" />

      <section style={{ background: '#ffffff', padding: '80px 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px' }}>

          {/* Back link */}
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 text-bni-blue text-sm font-medium mb-10 hover:opacity-70 transition-opacity"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            ← Back to Gallery
          </Link>

          {/* Photo grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {campPhotos.map((photo) => (
              <div
                key={photo.src}
                className="relative w-full overflow-hidden"
                style={{ borderRadius: '12px', aspectRatio: '4/3' }}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
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
