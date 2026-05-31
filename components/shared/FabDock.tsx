'use client'

import { useEffect, useRef, useState } from 'react'

const SCROLL_DELTA = 8

export default function FabDock({ children }: { children: React.ReactNode }) {
  const [hidden, setHidden] = useState(false)
  const lastScrollY = useRef(0)
  const panelOpen = useRef(false)

  useEffect(() => {
    lastScrollY.current = window.scrollY

    function onScroll() {
      const y = window.scrollY
      const delta = y - lastScrollY.current
      if (Math.abs(delta) < SCROLL_DELTA) return
      lastScrollY.current = y

      if (panelOpen.current || y < 80) {
        setHidden(false)
        return
      }
      setHidden(delta > 0)
    }

    // The bot dispatches this when its chat panel opens/closes so we never
    // hide an active conversation behind a scroll gesture.
    function onPanelToggle(e: Event) {
      panelOpen.current = (e as CustomEvent<boolean>).detail
      if (panelOpen.current) setHidden(false)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('fab-panel-toggle', onPanelToggle as EventListener)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('fab-panel-toggle', onPanelToggle as EventListener)
    }
  }, [])

  return (
    <div
      data-hidden={hidden ? 'true' : 'false'}
      style={{
        // A transform here makes this the containing block for the fixed FABs,
        // so the slide-away transform moves them while their own bottom/right
        // offsets still anchor to the bottom-right corner.
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        transform: hidden ? 'translateY(140%)' : 'translateY(0)',
        opacity: hidden ? 0 : 1,
        transition: 'transform 0.3s ease, opacity 0.3s ease',
        zIndex: 1000,
      }}
      className="fab-dock"
    >
      {children}
    </div>
  )
}
