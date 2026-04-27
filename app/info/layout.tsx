import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Important Information',
  description:
    'Code of conduct, safety policies, supervision ratios, crisis management, facilities and faith values for the Boys Network International Rise & Thrive Bootcamp.',
  alternates: { canonical: 'https://boysnetworkinternational.com/info' },
  openGraph: {
    title: 'Important Information | Boys Network International',
    description: 'Camp policies, safety guidelines, and faith values for the Rise & Thrive Bootcamp.',
    url: 'https://boysnetworkinternational.com/info',
  },
}

export default function InfoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
