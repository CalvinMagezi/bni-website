import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import WhatsAppWidget from '@/components/shared/WhatsAppWidget'

const OG_IMAGE = 'https://framerusercontent.com/images/zNckLAoaorpjAkb2LSzjVcez7A.jpg'
const SITE_URL = 'https://boysnetworkinternational.com'
const SITE_NAME = 'Boys Network International'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Nurturing Potential, Shaping Lives`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    'Boys Network International empowers boys through faith-based mentorship, leadership development and the Rise & Thrive Bootcamp — raising purpose-driven young men in Uganda.',
  keywords: [
    'boys mentorship Uganda',
    'faith-based camp Uganda',
    'boys leadership development',
    'Rise and Thrive Bootcamp',
    'Boys Network International',
    'Christian mentorship boys',
    'youth development Uganda',
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: 'website',
    locale: 'en_UG',
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Nurturing Potential, Shaping Lives`,
    description:
      'Empowering boys to grow in faith, lead with purpose, and impact their world through the Rise & Thrive Bootcamp.',
    url: SITE_URL,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: `${SITE_NAME} — Rise & Thrive Bootcamp` }],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_NAME,
    description: 'Empowering boys to grow in faith, lead with purpose, and impact their world.',
    images: [OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  verification: {
    // Add Google Search Console / Bing verification tokens here when available
    // google: 'XXXX',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Google Fonts — preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=Inter:wght@400;500;600;700;900&display=swap"
          rel="stylesheet"
        />
        {/* Favicons */}
        <link rel="icon" href="https://framerusercontent.com/images/bmEr6BuAPZ4ibh0n7jxJ57JU4.png" />
        <link rel="icon" href="https://framerusercontent.com/images/MYF1oZQHwenYMyaQdp54v7wA2OI.png" sizes="32x32" />
        <link rel="apple-touch-icon" href="https://framerusercontent.com/images/bmEr6BuAPZ4ibh0n7jxJ57JU4.png" />
      </head>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppWidget />
      </body>
    </html>
  )
}
