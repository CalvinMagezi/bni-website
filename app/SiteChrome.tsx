'use client'

import { usePathname } from 'next/navigation'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import WhatsAppWidget from '@/components/shared/WhatsAppWidget'
import FloatingEnrollmentBot from '@/components/camp-live/FloatingEnrollmentBot'
import FabDock from '@/components/shared/FabDock'

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdmin = pathname.startsWith('/admin')
  const isCampLive = pathname.startsWith('/camp-live')

  return (
    <>
      {!isAdmin && <Navbar />}
      <main>{children}</main>
      {!isAdmin && <Footer />}
      {!isAdmin && (
        <FabDock>
          <WhatsAppWidget />
          {!isCampLive && <FloatingEnrollmentBot />}
        </FabDock>
      )}
    </>
  )
}
