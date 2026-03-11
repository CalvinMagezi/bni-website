import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: {
    default: 'The Boys Network',
    template: '%s | The Boys Network',
  },
  description: 'Empowering boys to grow in faith, lead with purpose, and impact their world.',
  openGraph: {
    type: 'website',
    siteName: 'The Boys Network',
    title: 'The Boys Network',
    description: 'Empowering boys to grow in faith, lead with purpose, and impact their world.',
    url: 'https://boysnetworkinternational.com',
    images: [
      {
        url: 'https://framerusercontent.com/images/vbZJoECN49Ozc25QEKYqx9u6QQ.jpg',
        width: 1200,
        height: 630,
        alt: 'The Boys Network',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Boys Network',
    description: 'Empowering boys to grow in faith, lead with purpose, and impact their world.',
    images: ['https://framerusercontent.com/images/vbZJoECN49Ozc25QEKYqx9u6QQ.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { 'max-image-preview': 'large' },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Favicons — blue BNI mark, pulled directly from original site */}
        <link rel="icon" href="https://framerusercontent.com/images/bmEr6BuAPZ4ibh0n7jxJ57JU4.png" />
        <link rel="icon" href="https://framerusercontent.com/images/MYF1oZQHwenYMyaQdp54v7wA2OI.png" sizes="32x32" />
        <link rel="apple-touch-icon" href="https://framerusercontent.com/images/bmEr6BuAPZ4ibh0n7jxJ57JU4.png" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=Inter:wght@400;500;600;700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
