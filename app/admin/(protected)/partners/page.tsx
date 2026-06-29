import { createClient } from '@/lib/supabase/server'
import Image from 'next/image'
import { redirect } from 'next/navigation'

const inputStyle = { border: '1.5px solid #e5e7eb', borderRadius: '8px', padding: '9px 12px', fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#111', outline: 'none', width: '100%', boxSizing: 'border-box' as const }
const labelStyle = { display: 'block', fontSize: '12px', color: '#6b7280', fontFamily: 'Inter, sans-serif', marginBottom: '4px' }

async function createPartner(formData: FormData) {
  'use server'
  const supabase = await createClient()
  await supabase.from('partners').insert({
    name: formData.get('name') as string,
    logo_url: formData.get('logo_url') as string,
    website_url: (formData.get('website_url') as string) || null,
    position: Number(formData.get('position') || 99),
  })
  redirect('/admin/partners')
}

async function updatePartner(formData: FormData) {
  'use server'
  const supabase = await createClient()
  await supabase.from('partners').update({
    name: formData.get('name') as string,
    logo_url: formData.get('logo_url') as string,
    website_url: (formData.get('website_url') as string) || null,
    position: Number(formData.get('position') || 99),
  }).eq('id', formData.get('id') as string)
  redirect('/admin/partners')
}

async function deletePartner(formData: FormData) {
  'use server'
  const supabase = await createClient()
  await supabase.from('partners').delete().eq('id', formData.get('id') as string)
  redirect('/admin/partners')
}

export default async function AdminPartnersPage() {
  const supabase = await createClient()
  const { data: partners } = await supabase.from('partners').select('*').order('position')

  return (
    <div style={{ maxWidth: '860px' }}>
      <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '24px', fontWeight: 700, color: '#0d1787', marginBottom: '24px' }}>
        Partners
      </h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '36px' }}>
        {(partners ?? []).map(partner => (
          <div key={partner.id} style={{ background: '#fff', borderRadius: '14px', border: '1.5px solid #e5e7eb', overflow: 'hidden' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '18px 20px', borderBottom: '1px solid #f3f4f6' }}>
              <div style={{ width: '120px', height: '48px', position: 'relative', flexShrink: 0 }}>
                <Image src={partner.logo_url} alt={partner.name} fill style={{ objectFit: 'contain' }} unoptimized />
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '15px', fontWeight: 700, color: '#0d1787', marginBottom: '1px' }}>{partner.name}</p>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#6b7280' }}>Position {partner.position}</p>
              </div>
              <form action={deletePartner}>
                <input type="hidden" name="id" value={partner.id} />
                <button type="submit" style={{ padding: '6px 14px', borderRadius: '7px', border: '1.5px solid #fecaca', background: '#fff5f5', color: '#ef4444', fontFamily: 'Inter, sans-serif', fontSize: '12px', cursor: 'pointer' }}>
                  Remove
                </button>
              </form>
            </div>
            <form action={updatePartner} style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <input type="hidden" name="id" value={partner.id} />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={labelStyle}>Name</label>
                  <input name="name" defaultValue={partner.name} style={inputStyle} required />
                </div>
                <div>
                  <label style={labelStyle}>Position</label>
                  <input name="position" type="number" defaultValue={partner.position} style={inputStyle} />
                </div>
              </div>
              <div>
                <label style={labelStyle}>Logo URL</label>
                <input name="logo_url" defaultValue={partner.logo_url} style={inputStyle} required />
              </div>
              <div>
                <label style={labelStyle}>Website URL (optional)</label>
                <input name="website_url" defaultValue={partner.website_url ?? ''} style={inputStyle} placeholder="https://..." />
              </div>
              <button type="submit" style={{ padding: '8px 18px', borderRadius: '7px', border: 'none', background: '#0d1787', color: '#fff', fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 500, cursor: 'pointer', alignSelf: 'flex-start' }}>
                Save
              </button>
            </form>
          </div>
        ))}
      </div>

      <div style={{ background: '#fff', borderRadius: '14px', padding: '24px', border: '1.5px solid #e5e7eb' }}>
        <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '16px', fontWeight: 700, color: '#0d1787', marginBottom: '16px' }}>Add Partner</h2>
        <form action={createPartner} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={labelStyle}>Name</label>
              <input name="name" style={inputStyle} placeholder="Organisation name" required />
            </div>
            <div>
              <label style={labelStyle}>Position</label>
              <input name="position" type="number" defaultValue={99} style={inputStyle} />
            </div>
          </div>
          <div>
            <label style={labelStyle}>Logo URL</label>
            <input name="logo_url" style={inputStyle} placeholder="https://..." required />
          </div>
          <div>
            <label style={labelStyle}>Website URL (optional)</label>
            <input name="website_url" style={inputStyle} placeholder="https://..." />
          </div>
          <button type="submit" style={{ padding: '10px 20px', borderRadius: '8px', border: 'none', background: '#1f2fe6', color: '#fff', fontFamily: 'Space Grotesk, sans-serif', fontSize: '14px', fontWeight: 700, cursor: 'pointer', alignSelf: 'flex-start' }}>
            Add Partner
          </button>
        </form>
      </div>
    </div>
  )
}
