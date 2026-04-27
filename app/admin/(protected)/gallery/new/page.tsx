import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

async function createAlbum(formData: FormData) {
  'use server'
  const supabase = await createClient()
  const rawSlug = formData.get('slug') as string
  const title = formData.get('title') as string
  const slug = (rawSlug || title).toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
  const { error } = await supabase.from('gallery_albums').insert({
    title,
    slug,
    cover_image: formData.get('cover_image') as string,
    photo_count: 0,
  })
  if (error) throw new Error(error.message)
  redirect('/admin/gallery')
}

const fieldStyle: React.CSSProperties = {
  border: '1.5px solid #e5e7eb',
  borderRadius: '8px',
  padding: '10px 14px',
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  color: '#111',
  outline: 'none',
  background: '#fff',
  width: '100%',
  boxSizing: 'border-box',
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontFamily: 'Inter, sans-serif',
  fontSize: '13px',
  fontWeight: 500,
  color: '#374151',
  marginBottom: '6px',
}

export default function NewAlbumPage() {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px' }}>
        <Link href="/admin/gallery" style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#6b7280', textDecoration: 'none' }}>← Back</Link>
        <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '22px', fontWeight: 700, color: '#0d1787' }}>New Album</h1>
      </div>
      <form action={createAlbum} style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '520px' }}>
        <div><label style={labelStyle}>Album title *</label><input name="title" required style={fieldStyle} /></div>
        <div><label style={labelStyle}>URL slug (auto-generated from title if blank)</label><input name="slug" style={fieldStyle} placeholder="e.g. camp-2026-highlights" /></div>
        <div><label style={labelStyle}>Cover image URL *</label><input name="cover_image" required style={fieldStyle} placeholder="https://..." /></div>
        <button type="submit" style={{ padding: '12px 24px', borderRadius: '8px', border: 'none', background: '#1f2fe6', color: '#fff', fontFamily: 'Inter, sans-serif', fontSize: '15px', fontWeight: 500, cursor: 'pointer', alignSelf: 'flex-start' }}>
          Create Album
        </button>
      </form>
    </div>
  )
}
