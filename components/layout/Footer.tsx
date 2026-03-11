import Link from 'next/link'

const quickLinks = [
  { label: 'About', href: '/about-us' },
  { label: 'Programs', href: '/programs' },
  { label: 'Contact Us', href: '/contact-us' },
  { label: 'Important Info', href: '/info' },
]

const bottomLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about-us' },
  { label: 'Programs', href: '/programs' },
  { label: 'Contact', href: '/contact-us' },
]

export default function Footer() {
  return (
    <footer style={{ background: 'linear-gradient(rgb(13,23,135) 0%, rgb(7,13,79) 100%)' }}>
      {/* Main footer */}
      <div
        className="mx-auto py-16"
        style={{ maxWidth: '1200px', padding: '64px 40px 48px' }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <h3
              className="text-white text-xl font-bold mb-3"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              Boys Network International
            </h3>
            <p className="text-bni-light text-sm leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
              Empowering boys to grow in faith, lead with purpose, and impact their world.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <p
              className="text-white text-sm font-semibold mb-4 uppercase tracking-wider"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              Quick Links
            </p>
            <ul className="flex flex-col gap-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-bni-light text-sm hover:text-white transition-colors"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-6">
            <div>
              <p
                className="text-white text-sm font-semibold mb-1"
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              >
                Enroll
              </p>
              <p className="text-bni-light text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                0767961323 / 0747772656
              </p>
            </div>
            <div>
              <p
                className="text-white text-sm font-semibold mb-1"
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              >
                Need support?
              </p>
              <a
                href="mailto:join@boysnetwork.com"
                className="text-bni-light text-sm hover:text-white transition-colors"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                join@boysnetwork.com
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom strip */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <div
          className="mx-auto flex items-center gap-8 py-4"
          style={{ maxWidth: '1200px', padding: '16px 40px' }}
        >
          {bottomLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-bni-light text-xs hover:text-white transition-colors"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  )
}
