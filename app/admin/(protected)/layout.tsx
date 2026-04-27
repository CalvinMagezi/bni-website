import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: '📊' },
  { href: '/admin/posts', label: 'Camp Posts', icon: '📝' },
  { href: '/admin/stories', label: 'Stories', icon: '🎬' },
  { href: '/admin/stats', label: 'Camp Stats', icon: '📈' },
  { href: '/admin/gallery', label: 'Gallery', icon: '🖼️' },
  { href: '/admin/team', label: 'Team', icon: '👥' },
  { href: '/admin/inbox', label: 'Inbox', icon: '📬' },
]

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const ALLOWED_EMAILS = ['calvin.m.magezi@gmail.com']
  if (!user || !ALLOWED_EMAILS.includes(user.email ?? '')) redirect('/admin/login')

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f8f9fb' }}>
      {/* Sidebar */}
      <aside style={{
        width: '240px',
        flexShrink: 0,
        background: '#0d1787',
        display: 'flex',
        flexDirection: 'column',
        padding: '24px 0',
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        overflowY: 'auto',
      }}>
        <div style={{ padding: '0 20px 28px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '17px', fontWeight: 700, color: '#ffffff' }}>
            BNI Admin
          </span>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', color: 'rgba(255,255,255,0.5)', marginTop: '2px' }}>
            {user.email}
          </p>
        </div>
        <nav style={{ padding: '16px 12px', flex: 1 }}>
          {navItems.map(item => (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 12px',
                borderRadius: '8px',
                fontFamily: 'Inter, sans-serif',
                fontSize: '14px',
                fontWeight: 500,
                color: 'rgba(255,255,255,0.8)',
                textDecoration: 'none',
                marginBottom: '2px',
              }}
            >
              <span style={{ fontSize: '16px' }}>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>
        <div style={{ padding: '16px 12px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <form action="/auth/signout" method="post">
            <button
              type="submit"
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: '8px',
                border: 'none',
                background: 'rgba(255,255,255,0.08)',
                color: 'rgba(255,255,255,0.7)',
                fontFamily: 'Inter, sans-serif',
                fontSize: '13px',
                cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              Sign out
            </button>
          </form>
        </div>
      </aside>

      {/* Main content */}
      <main style={{ marginLeft: '240px', flex: 1, padding: '40px', minWidth: 0 }}>
        {children}
      </main>
    </div>
  )
}
