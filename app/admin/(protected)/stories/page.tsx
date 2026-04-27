import { createClient } from '@/lib/supabase/server'
import Image from 'next/image'
import { redirect } from 'next/navigation'

async function createStory(formData: FormData) {
  'use server'
  const supabase = await createClient()
  await supabase.from('stories').insert({
    label: formData.get('label') as string,
    image_url: formData.get('image_url') as string,
    is_live: formData.get('is_live') === 'true',
    position: Number(formData.get('position') || 99),
  })
  redirect('/admin/stories')
}

async function deleteStory(formData: FormData) {
  'use server'
  const supabase = await createClient()
  await supabase.from('stories').delete().eq('id', formData.get('id') as string)
  redirect('/admin/stories')
}

export default async function AdminStoriesPage() {
  const supabase = await createClient()
  const { data: stories } = await supabase.from('stories').select('*').order('position')

  return (
    <div>
      <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '24px', fontWeight: 700, color: '#0d1787', marginBottom: '24px' }}>
        Stories
      </h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '32px' }}>
        {(stories ?? []).map(story => (
          <div key={story.id} style={{ background: '#fff', borderRadius: '12px', padding: '14px 18px', border: '1.5px solid #e5e7eb', display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '50%', overflow: 'hidden', flexShrink: 0, background: '#f0f0f5', position: 'relative' }}>
              <Image src={story.image_url} alt={story.label} fill style={{ objectFit: 'cover' }} unoptimized />
            </div>
            <div style={{ flex: 1 }}>
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: 600, color: '#111' }}>{story.label}</span>
              {story.is_live && <span style={{ marginLeft: '8px', background: '#ef4444', color: '#fff', fontSize: '10px', fontWeight: 700, padding: '2px 7px', borderRadius: '100px', fontFamily: 'Inter, sans-serif' }}>LIVE</span>}
            </div>
            <form action={deleteStory}>
              <input type="hidden" name="id" value={story.id} />
              <button type="submit" style={{ padding: '6px 12px', borderRadius: '7px', border: '1.5px solid #fecaca', background: '#fff5f5', color: '#ef4444', fontFamily: 'Inter, sans-serif', fontSize: '12px', cursor: 'pointer' }}>
                Delete
              </button>
            </form>
          </div>
        ))}
      </div>

      <div style={{ background: '#fff', borderRadius: '14px', padding: '24px', border: '1.5px solid #e5e7eb' }}>
        <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '16px', fontWeight: 700, color: '#0d1787', marginBottom: '16px' }}>
          Add Story
        </h2>
        <form action={createStory} style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 80px 80px', gap: '12px', alignItems: 'end' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', color: '#6b7280', fontFamily: 'Inter, sans-serif', marginBottom: '4px' }}>Label</label>
            <input name="label" required style={{ border: '1.5px solid #e5e7eb', borderRadius: '8px', padding: '8px 12px', fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#111', outline: 'none', background: '#fff', width: '100%', boxSizing: 'border-box' as const }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '12px', color: '#6b7280', fontFamily: 'Inter, sans-serif', marginBottom: '4px' }}>Image URL</label>
            <input name="image_url" required style={{ border: '1.5px solid #e5e7eb', borderRadius: '8px', padding: '8px 12px', fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#111', outline: 'none', background: '#fff', width: '100%', boxSizing: 'border-box' as const }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '12px', color: '#6b7280', fontFamily: 'Inter, sans-serif', marginBottom: '4px' }}>Live?</label>
            <select name="is_live" style={{ border: '1.5px solid #e5e7eb', borderRadius: '8px', padding: '8px 12px', fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#111', outline: 'none', background: '#fff', width: '100%', boxSizing: 'border-box' as const }}>
              <option value="false">No</option>
              <option value="true">Yes</option>
            </select>
          </div>
          <button type="submit" style={{ padding: '8px 16px', borderRadius: '8px', border: 'none', background: '#1f2fe6', color: '#fff', fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 500, cursor: 'pointer' }}>
            Add
          </button>
        </form>
      </div>
    </div>
  )
}
