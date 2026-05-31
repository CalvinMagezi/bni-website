'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Logo from '@/components/shared/Logo'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about-us' },
  { label: 'Programs', href: '/programs' },
  { label: 'Magazine', href: '/magazine' },
  { label: 'Contact', href: '/contact-us' },
  { label: 'Camp Live', href: '/camp-live', live: true },
]

function LiveDot() {
  return (
    <span
      aria-hidden="true"
      className="inline-block rounded-full animate-pulse"
      style={{ width: '8px', height: '8px', background: '#ef4444', marginRight: '7px' }}
    />
  )
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  // Home matches only the exact root; other links match their path or any nested route.
  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`)

  return (
    <header
      className="fixed z-50"
      style={{
        top: '16px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'calc(100% - 24px)',
        maxWidth: '1160px',
      }}
    >
      {/* Glass pill */}
      <div
        className="relative flex items-center justify-between"
        style={{
          backdropFilter: 'blur(55px)',
          WebkitBackdropFilter: 'blur(55px)',
          background: 'rgba(7, 13, 79, 0.55)',
          borderRadius: '99px',
          border: '1px solid rgba(255,255,255,0.12)',
          padding: '0 20px',
          height: '60px',
        }}
      >
        {/* Logo — mark-only variant stays crisp at navbar size; wordmark text is dropped */}
        <Link href="/" className="flex items-center shrink-0">
          <Logo variant="mark" className="h-[34px] w-auto" />
        </Link>

        {/* Desktop Nav — absolutely centered within the pill */}
        <nav
          className="hidden md:flex items-center gap-8"
          style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}
        >
          {navLinks.map((link) => {
            const active = isActive(link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? 'page' : undefined}
                className="relative inline-flex items-center text-sm font-medium transition-colors hover:text-white"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  color: active ? '#ffffff' : 'rgba(255,255,255,0.9)',
                }}
                aria-label={link.live ? 'Camp Live (live now)' : undefined}
              >
                {link.live && <LiveDot />}
                {link.label}
                {active && (
                  <span
                    aria-hidden="true"
                    className="absolute rounded-full"
                    style={{
                      width: '4px',
                      height: '4px',
                      background: '#ffffff',
                      bottom: '-7px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                    }}
                  />
                )}
              </Link>
            )
          })}
        </nav>

        {/* Enroll Now */}
        <Link
          href="/programs"
          className="hidden md:inline-flex items-center text-white text-sm font-bold transition-opacity hover:opacity-90 shrink-0"
          style={{
            background: '#1f2fe6',
            borderRadius: '100px',
            padding: '10px 22px',
            fontFamily: 'Space Grotesk, sans-serif',
            fontWeight: 700,
          }}
        >
          Enroll Now
        </Link>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2 ml-auto"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className="block w-5 h-0.5 bg-white transition-transform duration-300"
            style={{ transform: menuOpen ? 'translateY(8px) rotate(45deg)' : 'none' }}
          />
          <span
            className="block w-5 h-0.5 bg-white transition-opacity duration-300"
            style={{ opacity: menuOpen ? 0 : 1 }}
          />
          <span
            className="block w-5 h-0.5 bg-white transition-transform duration-300"
            style={{ transform: menuOpen ? 'translateY(-8px) rotate(-45deg)' : 'none' }}
          />
        </button>
      </div>

      {/* Mobile slide-down menu */}
      {menuOpen && (
        <div
          className="md:hidden mt-2 flex flex-col"
          style={{
            backdropFilter: 'blur(55px)',
            WebkitBackdropFilter: 'blur(55px)',
            background: 'rgba(10, 20, 80, 0.92)',
            borderRadius: '24px',
            border: '1px solid rgba(255,255,255,0.12)',
            padding: '8px 24px 24px',
          }}
        >
          {navLinks.map((link) => {
            const active = isActive(link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? 'page' : undefined}
                className="flex items-center border-b border-white/10 last:border-0"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  color: active ? '#ffffff' : 'rgba(255,255,255,0.92)',
                  fontSize: '17px',
                  fontWeight: active ? 700 : 500,
                  padding: '16px 0',
                  letterSpacing: '-0.01em',
                }}
                onClick={() => setMenuOpen(false)}
                aria-label={link.live ? 'Camp Live (live now)' : undefined}
              >
                {active && !link.live && (
                  <span
                    aria-hidden="true"
                    className="inline-block rounded-full"
                    style={{ width: '6px', height: '6px', background: '#ffffff', marginRight: '10px' }}
                  />
                )}
                {link.live && <LiveDot />}
                {link.label}
              </Link>
            )
          })}
          <Link
            href="/programs"
            className="inline-flex items-center justify-center text-white font-bold mt-5"
            style={{
              background: '#1f2fe6',
              borderRadius: '100px',
              padding: '14px 28px',
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: '15px',
            }}
            onClick={() => setMenuOpen(false)}
          >
            Enroll Now
          </Link>
        </div>
      )}
    </header>
  )
}
