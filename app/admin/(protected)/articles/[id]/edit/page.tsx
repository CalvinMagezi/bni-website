import Link from 'next/link'
import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { updateArticle } from '@/app/actions/articles'

const inputStyle = { border: '1.5px solid #e5e7eb', borderRadius: '8px', padding: '10px 12px', fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#111', outline: 'none', width: '100%', boxSizing: 'border-box' as const }
const labelStyle = { display: 'block', fontSize: '13px', fontWeight: 500, color: '#374151', fontFamily: 'Inter, sans-serif', marginBottom: '6px' }

interface Props {
  params: Promise<{ id: string }>
}

export default async function EditArticlePage({ params }: Props) {
  const { id } = await params
  const supabase = await createClient()
  const { data: article } = await supabase.from('articles').select('*').eq('id', id).single()

  if (!article) notFound()

  return (
    <div style={{ maxWidth: '720px' }}>
      <Link href="/admin/articles" style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#6b7280', textDecoration: 'none' }}>
        ← Back to Articles
      </Link>
      <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '26px', fontWeight: 700, color: '#0d1787', margin: '16px 0 24px' }}>
        Edit Article
      </h1>

      <form action={updateArticle} style={{ background: '#fff', borderRadius: '14px', border: '1.5px solid #e5e7eb', padding: '28px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
        <input type="hidden" name="id" value={article.id} />
        <div>
          <label style={labelStyle}>Title</label>
          <input name="title" defaultValue={article.title} style={inputStyle} required />
        </div>
        <div>
          <label style={labelStyle}>Slug</label>
          <input name="slug" defaultValue={article.slug} style={inputStyle} required />
        </div>
        <div>
          <label style={labelStyle}>Excerpt</label>
          <textarea name="excerpt" rows={3} defaultValue={article.excerpt ?? ''} style={{ ...inputStyle, resize: 'vertical' as const }} />
        </div>
        <div>
          <label style={labelStyle}>Body (Markdown supported)</label>
          <textarea name="body" rows={14} defaultValue={article.body} style={{ ...inputStyle, resize: 'vertical' as const, lineHeight: 1.6 }} required />
        </div>
        <div>
          <label style={labelStyle}>Cover Image URL (optional)</label>
          <input name="cover_image_url" defaultValue={article.cover_image_url ?? ''} style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Published Date</label>
          <input name="published_date" type="date" defaultValue={article.published_date ?? ''} style={inputStyle} />
        </div>
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#374151' }}>
          <input name="is_featured" type="checkbox" defaultChecked={article.is_featured} />
          Feature this article on the Resources page
        </label>
        <button type="submit" style={{ padding: '12px 24px', borderRadius: '8px', border: 'none', background: '#1f2fe6', color: '#fff', fontFamily: 'Space Grotesk, sans-serif', fontSize: '14px', fontWeight: 700, cursor: 'pointer', alignSelf: 'flex-start' }}>
          Save Changes
        </button>
      </form>
    </div>
  )
}
