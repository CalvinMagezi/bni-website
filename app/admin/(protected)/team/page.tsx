import { createClient } from '@/lib/supabase/server'
import Image from 'next/image'
import { redirect } from 'next/navigation'

async function createMember(formData: FormData) {
  'use server'
  const supabase = await createClient()
  await supabase.from('team_members').insert({
    name: formData.get('name') as string,
    title: formData.get('title') as string,
    image_url: (formData.get('image_url') as string) || null,
    position: Number(formData.get('position') || 99),
  })
  redirect('/admin/team')
}

async function deleteMember(formData: FormData) {
  'use server'
  const supabase = await createClient()
  await supabase.from('team_members').delete().eq('id', formData.get('id') as string)
  redirect('/admin/team')
}

export default async function AdminTeamPage() {
  const supabase = await createClient()
  const { data: members } = await supabase.from('team_members').select('*').order('position')

  return (
    <div>
      <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '24px', fontWeight: 700, color: '#0d1787', marginBottom: '24px' }}>
        Team Members
      </h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '14px', marginBottom: '32px' }}>
        {(members ?? []).map(m => (
          <div key={m.id} style={{ background: '#fff', borderRadius: '14px', padding: '20px', border: '1.5px solid #e5e7eb', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', overflow: 'hidden', background: '#f0f0f5', position: 'relative', flexShrink: 0 }}>
              {m.image_url
                ? <Image src={m.image_url} alt={m.name} fill style={{ objectFit: 'cover' }} unoptimized />
                : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>👤</div>
              }
            </div>
            <div>
              <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '15px', fontWeight: 700, color: '#0d1787', marginBottom: '2px' }}>{m.name}</p>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#6b7280' }}>{m.title}</p>
            </div>
            <form action={deleteMember}>
              <input type="hidden" name="id" value={m.id} />
              <button type="submit" style={{ padding: '6px 14px', borderRadius: '7px', border: '1.5px solid #fecaca', background: '#fff5f5', color: '#ef4444', fontFamily: 'Inter, sans-serif', fontSize: '12px', cursor: 'pointer' }}>
                Remove
              </button>
            </form>
          </div>
        ))}
      </div>

      <div style={{ background: '#fff', borderRadius: '14px', padding: '24px', border: '1.5px solid #e5e7eb', maxWidth: '600px' }}>
        <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '16px', fontWeight: 700, color: '#0d1787', marginBottom: '16px' }}>Add Member</h2>
        <form action={createMember} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#6b7280', fontFamily: 'Inter, sans-serif', marginBottom: '4px' }}>Name *</label>
              <input name="name" required style={{ border: '1.5px solid #e5e7eb', borderRadius: '8px', padding: '9px 12px', fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#111', outline: 'none', width: '100%', boxSizing: 'border-box' as const }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#6b7280', fontFamily: 'Inter, sans-serif', marginBottom: '4px' }}>Title *</label>
              <input name="title" required style={{ border: '1.5px solid #e5e7eb', borderRadius: '8px', padding: '9px 12px', fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#111', outline: 'none', width: '100%', boxSizing: 'border-box' as const }} />
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#6b7280', fontFamily: 'Inter, sans-serif', marginBottom: '4px' }}>Image URL</label>
              <input name="image_url" style={{ border: '1.5px solid #e5e7eb', borderRadius: '8px', padding: '9px 12px', fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#111', outline: 'none', width: '100%', boxSizing: 'border-box' as const }} placeholder="https://..." />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#6b7280', fontFamily: 'Inter, sans-serif', marginBottom: '4px' }}>Order</label>
              <input name="position" type="number" defaultValue={99} style={{ border: '1.5px solid #e5e7eb', borderRadius: '8px', padding: '9px 12px', fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#111', outline: 'none', width: '100%', boxSizing: 'border-box' as const }} />
            </div>
          </div>
          <button type="submit" style={{ padding: '10px 20px', borderRadius: '8px', border: 'none', background: '#1f2fe6', color: '#fff', fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: 500, cursor: 'pointer', alignSelf: 'flex-start' }}>
            Add Member
          </button>
        </form>
      </div>
    </div>
  )
}
