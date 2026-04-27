import { createClient } from '@/lib/supabase/server'
import Image from 'next/image'
import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'

async function addPhoto(albumId: string, formData: FormData) {
  'use server'
  const supabase = await createClient()
  await supabase.from('gallery_photos').insert({
    album_id: albumId,
    src: formData.get('src') as string,
    alt: formData.get('alt') as string,
    aspect: formData.get('aspect') as 'portrait' | 'landscape',
    position: Number(formData.get('position') || 99),
  })
  const { count } = await supabase.from('gallery_photos').select('*', { count: 'exact', head: true }).eq('album_id', albumId)
  await supabase.from('gallery_albums').update({ photo_count: count ?? 0 }).eq('id', albumId)
  redirect(`/admin/gallery/${albumId}`)
}

async function deletePhoto(formData: FormData) {
  'use server'
  const supabase = await createClient()
  const photoId = formData.get('photo_id') as string
  const albumId = formData.get('album_id') as string
  await supabase.from('gallery_photos').delete().eq('id', photoId)
  const { count } = await supabase.from('gallery_photos').select('*', { count: 'exact', head: true }).eq('album_id', albumId)
  await supabase.from('gallery_albums').update({ photo_count: count ?? 0 }).eq('id', albumId)
  redirect(`/admin/gallery/${albumId}`)
}

const fieldStyle: React.CSSProperties = {
  border: '1.5px solid #e5e7eb',
  borderRadius: '8px',
  padding: '8px 12px',
  fontFamily: 'Inter, sans-serif',
  fontSize: '13px',
  color: '#111',
  outline: 'none',
  background: '#fff',
  width: '100%',
  boxSizing: 'border-box',
}

export default async function AlbumDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const { data: album } = await supabase.from('gallery_albums').select('*').eq('id', id).single()
  if (!album) notFound()
  const { data: photos } = await supabase.from('gallery_photos').select('*').eq('album_id', id).order('position')
  const addPhotoAction = addPhoto.bind(null, id)

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px' }}>
        <Link href="/admin/gallery" style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#6b7280', textDecoration: 'none' }}>← Back</Link>
        <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '22px', fontWeight: 700, color: '#0d1787' }}>{album.title}</h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '12px', marginBottom: '32px' }}>
        {(photos ?? []).map(photo => (
          <div key={photo.id} style={{ background: '#fff', borderRadius: '12px', overflow: 'hidden', border: '1.5px solid #e5e7eb' }}>
            <div style={{ position: 'relative', width: '100%', aspectRatio: photo.aspect === 'portrait' ? '2/3' : '3/2' }}>
              <Image src={photo.src} alt={photo.alt} fill style={{ objectFit: 'cover' }} unoptimized />
            </div>
            <div style={{ padding: '10px 12px' }}>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', color: '#9ca3af', marginBottom: '8px' }}>{photo.aspect} · pos {photo.position}</p>
              <form action={deletePhoto}>
                <input type="hidden" name="photo_id" value={photo.id} />
                <input type="hidden" name="album_id" value={id} />
                <button type="submit" style={{ padding: '5px 12px', borderRadius: '6px', border: '1.5px solid #fecaca', background: '#fff5f5', color: '#ef4444', fontFamily: 'Inter, sans-serif', fontSize: '12px', cursor: 'pointer' }}>
                  Delete
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>

      <div style={{ background: '#fff', borderRadius: '14px', padding: '24px', border: '1.5px solid #e5e7eb', maxWidth: '640px' }}>
        <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '16px', fontWeight: 700, color: '#0d1787', marginBottom: '16px' }}>Add Photo</h2>
        <form action={addPhotoAction} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div><label style={{ display: 'block', fontSize: '12px', color: '#6b7280', fontFamily: 'Inter, sans-serif', marginBottom: '4px' }}>Image URL *</label><input name="src" required style={fieldStyle} placeholder="https://..." /></div>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '12px' }}>
            <div><label style={{ display: 'block', fontSize: '12px', color: '#6b7280', fontFamily: 'Inter, sans-serif', marginBottom: '4px' }}>Alt text *</label><input name="alt" required style={fieldStyle} /></div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#6b7280', fontFamily: 'Inter, sans-serif', marginBottom: '4px' }}>Aspect</label>
              <select name="aspect" style={fieldStyle}>
                <option value="portrait">Portrait (2:3)</option>
                <option value="landscape">Landscape (3:2)</option>
              </select>
            </div>
            <div><label style={{ display: 'block', fontSize: '12px', color: '#6b7280', fontFamily: 'Inter, sans-serif', marginBottom: '4px' }}>Order</label><input name="position" type="number" defaultValue={99} style={fieldStyle} /></div>
          </div>
          <button type="submit" style={{ padding: '10px 20px', borderRadius: '8px', border: 'none', background: '#1f2fe6', color: '#fff', fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: 500, cursor: 'pointer', alignSelf: 'flex-start' }}>
            Add Photo
          </button>
        </form>
      </div>
    </div>
  )
}
