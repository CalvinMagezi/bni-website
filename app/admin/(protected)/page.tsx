import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

export default async function AdminDashboard() {
  const supabase = await createClient()

  const [
    { count: postsCount },
    { count: storiesCount },
    { count: contactCount },
    { count: newsletterCount },
    { count: enrollmentCount },
  ] = await Promise.all([
    supabase.from('posts').select('*', { count: 'exact', head: true }),
    supabase.from('stories').select('*', { count: 'exact', head: true }),
    supabase.from('contact_submissions').select('*', { count: 'exact', head: true }),
    supabase.from('newsletter_subscribers').select('*', { count: 'exact', head: true }),
    supabase.from('enrollment_intakes').select('*', { count: 'exact', head: true }),
  ])

  const cards = [
    { label: 'Camp Posts', value: postsCount ?? 0, href: '/admin/posts', icon: '📝', color: '#1f2fe6' },
    { label: 'Stories', value: storiesCount ?? 0, href: '/admin/stories', icon: '🎬', color: '#7c3aed' },
    { label: 'Contact Messages', value: contactCount ?? 0, href: '/admin/inbox', icon: '✉️', color: '#059669' },
    { label: 'Newsletter Subs', value: newsletterCount ?? 0, href: '/admin/inbox', icon: '📧', color: '#d97706' },
    { label: 'Enrollments', value: enrollmentCount ?? 0, href: '/admin/inbox', icon: '🎒', color: '#dc2626' },
  ]

  return (
    <div>
      <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '26px', fontWeight: 700, color: '#0d1787', marginBottom: '8px' }}>
        Dashboard
      </h1>
      <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#6b7280', marginBottom: '32px' }}>
        Overview of all BNI platform content.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px', marginBottom: '40px' }}>
        {cards.map(card => (
          <Link key={card.label} href={card.href} style={{ textDecoration: 'none' }}>
            <div style={{
              background: '#ffffff',
              borderRadius: '14px',
              padding: '24px',
              border: '1.5px solid #e5e7eb',
            }}>
              <div style={{ fontSize: '28px', marginBottom: '12px' }}>{card.icon}</div>
              <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '32px', fontWeight: 700, color: card.color, lineHeight: 1 }}>
                {card.value}
              </div>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#6b7280', marginTop: '4px' }}>
                {card.label}
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <Link href="/admin/posts/new" style={{
          display: 'block',
          background: 'linear-gradient(135deg, #1f2fe6, #070d4f)',
          borderRadius: '14px',
          padding: '24px',
          textDecoration: 'none',
        }}>
          <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '16px', fontWeight: 700, color: '#ffffff', marginBottom: '4px' }}>
            + New Camp Post
          </div>
          <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: 'rgba(255,255,255,0.7)' }}>
            Add a new post to the Camp Live feed
          </div>
        </Link>
        <Link href="/admin/inbox" style={{
          display: 'block',
          background: '#ffffff',
          borderRadius: '14px',
          padding: '24px',
          border: '1.5px solid #e5e7eb',
          textDecoration: 'none',
        }}>
          <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '16px', fontWeight: 700, color: '#0d1787', marginBottom: '4px' }}>
            View Inbox
          </div>
          <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#6b7280' }}>
            Contact messages, newsletter subs, enrollments
          </div>
        </Link>
      </div>
    </div>
  )
}
