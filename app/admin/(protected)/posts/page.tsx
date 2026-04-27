import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { deletePost } from './actions'

export default async function AdminPostsPage() {
  const supabase = await createClient()
  const { data: posts } = await supabase
    .from('posts')
    .select('id, author, role, time_label, is_live, position, text')
    .order('position', { ascending: true })

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '24px', fontWeight: 700, color: '#0d1787' }}>
          Camp Posts
        </h1>
        <Link href="/admin/posts/new" style={{
          display: 'inline-block',
          padding: '10px 20px',
          borderRadius: '8px',
          background: '#1f2fe6',
          color: '#ffffff',
          fontFamily: 'Inter, sans-serif',
          fontSize: '14px',
          fontWeight: 500,
          textDecoration: 'none',
        }}>
          + New Post
        </Link>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {(posts ?? []).map(post => (
          <div key={post.id} style={{
            background: '#ffffff',
            borderRadius: '12px',
            padding: '16px 20px',
            border: '1.5px solid #e5e7eb',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
          }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                {post.is_live && (
                  <span style={{ background: '#ef4444', color: '#fff', fontSize: '10px', fontWeight: 700, padding: '2px 8px', borderRadius: '100px', fontFamily: 'Inter, sans-serif' }}>
                    LIVE
                  </span>
                )}
                <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '14px', fontWeight: 600, color: '#111827' }}>
                  {post.author}
                </span>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#9ca3af' }}>
                  · {post.role} · {post.time_label}
                </span>
              </div>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#6b7280', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {post.text}
              </p>
            </div>
            <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
              <Link href={`/admin/posts/${post.id}`} style={{
                padding: '7px 14px',
                borderRadius: '7px',
                border: '1.5px solid #e5e7eb',
                background: '#f9fafb',
                fontFamily: 'Inter, sans-serif',
                fontSize: '13px',
                color: '#374151',
                textDecoration: 'none',
              }}>
                Edit
              </Link>
              <form action={deletePost.bind(null, post.id)}>
                <button type="submit" style={{
                  padding: '7px 14px',
                  borderRadius: '7px',
                  border: '1.5px solid #fecaca',
                  background: '#fff5f5',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '13px',
                  color: '#ef4444',
                  cursor: 'pointer',
                }}>
                  Delete
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
