import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { deleteArticle } from '@/app/actions/articles'

export const dynamic = 'force-dynamic'

export default async function AdminArticlesPage() {
  const supabase = await createClient()
  const { data: articles } = await supabase
    .from('articles')
    .select('*')
    .order('published_date', { ascending: false })

  const rows = articles ?? []

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '26px', fontWeight: 700, color: '#0d1787', marginBottom: '4px' }}>
            Articles
          </h1>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#6b7280' }}>
            {rows.length} article{rows.length !== 1 ? 's' : ''} published
          </p>
        </div>
        <Link
          href="/admin/articles/new"
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
          + Add Article
        </Link>
      </div>

      {rows.length === 0 ? (
        <div style={{ background: '#ffffff', borderRadius: '14px', border: '1.5px solid #e5e7eb', padding: '48px', textAlign: 'center' }}>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '15px', color: '#9ca3af', marginBottom: '16px' }}>No articles yet.</p>
          <Link href="/admin/articles/new" style={{ color: '#1f2fe6', fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: 600, textDecoration: 'none' }}>
            Add your first article →
          </Link>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {rows.map(article => (
            <div
              key={article.id}
              style={{ background: '#ffffff', borderRadius: '12px', border: '1.5px solid #e5e7eb', padding: '20px 24px', display: 'flex', alignItems: 'center', gap: '20px' }}
            >
              {article.cover_image_url && (
                <img
                  src={article.cover_image_url}
                  alt={article.title}
                  style={{ width: '72px', height: '48px', objectFit: 'cover', borderRadius: '6px', flexShrink: 0 }}
                />
              )}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                  <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '15px', fontWeight: 700, color: '#0d1787', margin: 0 }}>
                    {article.title}
                  </p>
                  {article.is_featured && (
                    <span style={{ background: '#1f2fe618', color: '#1f2fe6', padding: '2px 8px', borderRadius: '100px', fontFamily: 'Inter, sans-serif', fontSize: '11px', fontWeight: 600 }}>
                      Featured
                    </span>
                  )}
                </div>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#9ca3af', margin: 0 }}>
                  /resources/articles/{article.slug}
                </p>
              </div>
              <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                <Link
                  href={`/admin/articles/${article.id}/edit`}
                  style={{ padding: '7px 14px', borderRadius: '7px', border: '1.5px solid #e5e7eb', fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 500, color: '#374151', textDecoration: 'none' }}
                >
                  Edit
                </Link>
                <Link
                  href={`/resources/articles/${article.slug}`}
                  target="_blank"
                  style={{ padding: '7px 14px', borderRadius: '7px', border: '1.5px solid #e5e7eb', fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 500, color: '#374151', textDecoration: 'none' }}
                >
                  View
                </Link>
                <form action={deleteArticle.bind(null, article.id)}>
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
