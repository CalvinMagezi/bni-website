import Link from 'next/link'
import { addArticle } from '@/app/actions/articles'

const inputStyle = { border: '1.5px solid #e5e7eb', borderRadius: '8px', padding: '10px 12px', fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#111', outline: 'none', width: '100%', boxSizing: 'border-box' as const }
const labelStyle = { display: 'block', fontSize: '13px', fontWeight: 500, color: '#374151', fontFamily: 'Inter, sans-serif', marginBottom: '6px' }

export default function NewArticlePage() {
  return (
    <div style={{ maxWidth: '720px' }}>
      <Link href="/admin/articles" style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#6b7280', textDecoration: 'none' }}>
        ← Back to Articles
      </Link>
      <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '26px', fontWeight: 700, color: '#0d1787', margin: '16px 0 24px' }}>
        Add Article
      </h1>

      <form action={addArticle} style={{ background: '#fff', borderRadius: '14px', border: '1.5px solid #e5e7eb', padding: '28px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
        <div>
          <label style={labelStyle}>Title</label>
          <input name="title" style={inputStyle} required />
        </div>
        <div>
          <label style={labelStyle}>Slug (optional — auto-generated from title)</label>
          <input name="slug" style={inputStyle} placeholder="my-article-title" />
        </div>
        <div>
          <label style={labelStyle}>Excerpt</label>
          <textarea name="excerpt" rows={3} style={{ ...inputStyle, resize: 'vertical' as const }} />
        </div>
        <div>
          <label style={labelStyle}>Body (Markdown supported)</label>
          <textarea name="body" rows={14} style={{ ...inputStyle, resize: 'vertical' as const, lineHeight: 1.6 }} required />
        </div>
        <div>
          <label style={labelStyle}>Cover Image URL (optional)</label>
          <input name="cover_image_url" style={inputStyle} placeholder="https://..." />
        </div>
        <div>
          <label style={labelStyle}>Published Date</label>
          <input name="published_date" type="date" style={inputStyle} />
        </div>
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#374151' }}>
          <input name="is_featured" type="checkbox" />
          Feature this article on the Resources page
        </label>
        <button type="submit" style={{ padding: '12px 24px', borderRadius: '8px', border: 'none', background: '#1f2fe6', color: '#fff', fontFamily: 'Space Grotesk, sans-serif', fontSize: '14px', fontWeight: 700, cursor: 'pointer', alignSelf: 'flex-start' }}>
          Publish Article
        </button>
      </form>
    </div>
  )
}
