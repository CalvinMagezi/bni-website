import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { deleteMagazineIssue } from '@/app/actions/magazine'

export const dynamic = 'force-dynamic'

export default async function AdminMagazinePage() {
  const supabase = await createClient()
  const { data: issues } = await supabase
    .from('magazine_issues')
    .select('*')
    .order('published_date', { ascending: false })

  const rows = issues ?? []

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '26px', fontWeight: 700, color: '#0d1787', marginBottom: '4px' }}>
            Magazine
          </h1>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#6b7280' }}>
            {rows.length} issue{rows.length !== 1 ? 's' : ''} published
          </p>
        </div>
        <Link
          href="/admin/magazine/new"
          style={{
            background: '#1f2fe6',
            color: '#ffffff',
            borderRadius: '8px',
            padding: '10px 20px',
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: '14px',
            fontWeight: 700,
            textDecoration: 'none',
          }}
        >
          + Add Issue
        </Link>
      </div>

      {rows.length === 0 ? (
        <div style={{ background: '#ffffff', borderRadius: '14px', border: '1.5px solid #e5e7eb', padding: '48px', textAlign: 'center' }}>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '15px', color: '#9ca3af', marginBottom: '16px' }}>No magazine issues yet.</p>
          <Link href="/admin/magazine/new" style={{ color: '#1f2fe6', fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: 600, textDecoration: 'none' }}>
            Add your first issue →
          </Link>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {rows.map(issue => (
            <div
              key={issue.id}
              style={{ background: '#ffffff', borderRadius: '12px', border: '1.5px solid #e5e7eb', padding: '20px 24px', display: 'flex', alignItems: 'center', gap: '20px' }}
            >
              {issue.cover_image_url && (
                <img
                  src={issue.cover_image_url}
                  alt={issue.title}
                  style={{ width: '52px', height: '68px', objectFit: 'cover', borderRadius: '6px', flexShrink: 0 }}
                />
              )}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                  <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '15px', fontWeight: 700, color: '#0d1787', margin: 0 }}>
                    {issue.title}
                  </p>
                  {issue.is_featured && (
                    <span style={{ background: '#1f2fe618', color: '#1f2fe6', padding: '2px 8px', borderRadius: '100px', fontFamily: 'Inter, sans-serif', fontSize: '11px', fontWeight: 600 }}>
                      Featured
                    </span>
                  )}
                </div>
                {issue.issue_number && (
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#9ca3af', margin: 0 }}>
                    Issue #{issue.issue_number} {issue.published_date && `· ${new Date(issue.published_date).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}`}
                  </p>
                )}
              </div>
              <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                <a
                  href={issue.pdf_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ padding: '7px 14px', borderRadius: '7px', border: '1.5px solid #e5e7eb', fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 500, color: '#374151', textDecoration: 'none' }}
                >
                  View PDF
                </a>
                <form action={deleteMagazineIssue.bind(null, issue.id)}>
                  <button
                    type="submit"
                    style={{ padding: '7px 14px', borderRadius: '7px', border: '1.5px solid #fee2e2', background: '#fff5f5', fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 500, color: '#dc2626', cursor: 'pointer' }}
                  >
                    Delete
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
