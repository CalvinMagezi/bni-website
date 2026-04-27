import { createClient } from '@/lib/supabase/server'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'

async function deleteAlbum(formData: FormData) {
  'use server'
  const supabase = await createClient()
  await supabase.from('gallery_albums').delete().eq('id', formData.get('id') as string)
  redirect('/admin/gallery')
}

export default async function AdminGalleryPage() {
  const supabase = await createClient()
  const { data: albums } = await supabase.from('gallery_albums').select('*').order('created_at', { ascending: false })

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '24px', fontWeight: 700, color: '#0d1787' }}>
          Gallery Albums
        </h1>
        <Link href="/admin/gallery/new" style={{ display: 'inline-block', padding: '10px 20px', borderRadius: '8px', background: '#1f2fe6', color: '#fff', fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: 500, textDecoration: 'none' }}>
          + New Album
        </Link>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
        {(albums ?? []).map(album => (
          <div key={album.id} style={{ background: '#fff', borderRadius: '14px', overflow: 'hidden', border: '1.5px solid #e5e7eb' }}>
            <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9' }}>
              <Image src={album.cover_image} alt={album.title} fill style={{ objectFit: 'cover' }} unoptimized />
            </div>
            <div style={{ padding: '16px' }}>
              <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '15px', fontWeight: 700, color: '#0d1787', marginBottom: '4px' }}>{album.title}</p>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#9ca3af', marginBottom: '12px' }}>{album.photo_count} photos · /{album.slug}</p>
              <div style={{ display: 'flex', gap: '8px' }}>
                <Link href={`/admin/gallery/${album.id}`} style={{ flex: 1, padding: '8px 0', borderRadius: '8px', border: '1.5px solid #e5e7eb', background: '#f9fafb', fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#374151', textDecoration: 'none', textAlign: 'center' }}>
                  Manage Photos
                </Link>
                <form action={deleteAlbum}>
                  <input type="hidden" name="id" value={album.id} />
                  <button type="submit" style={{ padding: '8px 14px', borderRadius: '8px', border: '1.5px solid #fecaca', background: '#fff5f5', color: '#ef4444', fontFamily: 'Inter, sans-serif', fontSize: '13px', cursor: 'pointer' }}>
                    Delete
                  </button>
                </form>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
