'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about-us' },
  { label: 'Programs', href: '/programs' },
  { label: 'Contact', href: '/contact-us' },
  { label: 'Gallery', href: '/gallery' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 bg-white transition-shadow duration-300"
      style={{ height: '64px', boxShadow: scrolled ? '0 2px 12px rgba(0,0,0,0.08)' : 'none' }}
    >
      <div
        className="flex items-center justify-between h-full mx-auto"
        style={{ maxWidth: '1200px', padding: '0 40px' }}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0">
          <Image
            src="https://framerusercontent.com/images/zB5KOyiCxdp4LttYLBVC0dNDugQ.png"
            alt="Boys Network International logo"
            width={107}
            height={64}
            className="h-10 w-auto"
            unoptimized
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-bni-slate hover:text-bni-blue transition-colors"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Enroll Now */}
        <Link
          href="/programs"
          className="hidden md:inline-flex items-center text-white text-sm font-bold transition-opacity hover:opacity-90"
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

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className="block w-6 h-0.5 bg-bni-slate transition-transform duration-300"
            style={{ transform: menuOpen ? 'translateY(8px) rotate(45deg)' : 'none' }}
          />
          <span
            className="block w-6 h-0.5 bg-bni-slate transition-opacity duration-300"
            style={{ opacity: menuOpen ? 0 : 1 }}
          />
          <span
            className="block w-6 h-0.5 bg-bni-slate transition-transform duration-300"
            style={{ transform: menuOpen ? 'translateY(-8px) rotate(-45deg)' : 'none' }}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-bni-slate font-medium text-base"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/programs"
            className="inline-flex items-center justify-center text-white text-sm font-bold mt-2"
            style={{
              background: '#1f2fe6',
              borderRadius: '100px',
              padding: '12px 24px',
              fontFamily: 'Space Grotesk, sans-serif',
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
