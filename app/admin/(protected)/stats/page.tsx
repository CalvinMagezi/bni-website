import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

async function updateStats(formData: FormData) {
  'use server'
  const supabase = await createClient()
  const ids = formData.getAll('id') as string[]
  await Promise.all(ids.map(id => supabase.from('camp_stats').update({
    label: formData.get(`label_${id}`) as string,
    value: formData.get(`value_${id}`) as string,
    icon:  formData.get(`icon_${id}`)  as string,
  }).eq('id', id)))
  redirect('/admin/stats')
}

export default async function AdminStatsPage() {
  const supabase = await createClient()
  const { data: stats } = await supabase.from('camp_stats').select('*').order('position')

  return (
    <div>
      <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '24px', fontWeight: 700, color: '#0d1787', marginBottom: '8px' }}>
        Camp Stats
      </h1>
      <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#6b7280', marginBottom: '28px' }}>
        These appear in the Camp Live sidebar stats widget.
      </p>
      <form action={updateStats} style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '600px' }}>
        {(stats ?? []).map(stat => (
          <div key={stat.id} style={{ background: '#fff', borderRadius: '12px', padding: '18px', border: '1.5px solid #e5e7eb', display: 'grid', gridTemplateColumns: '48px 1fr 1fr', gap: '12px', alignItems: 'center' }}>
            <input type="hidden" name="id" value={stat.id} />
            <input name={`icon_${stat.id}`} defaultValue={stat.icon} style={{ border: '1.5px solid #e5e7eb', borderRadius: '8px', padding: '8px', fontFamily: 'Inter, sans-serif', fontSize: '20px', textAlign: 'center', outline: 'none', background: '#f9fafb' }} />
            <div>
              <label style={{ display: 'block', fontSize: '11px', color: '#9ca3af', fontFamily: 'Inter, sans-serif', marginBottom: '3px' }}>Label</label>
              <input name={`label_${stat.id}`} defaultValue={stat.label} style={{ border: '1.5px solid #e5e7eb', borderRadius: '8px', padding: '8px 12px', fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#111', outline: 'none', background: '#fff', width: '100%', boxSizing: 'border-box' as const }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '11px', color: '#9ca3af', fontFamily: 'Inter, sans-serif', marginBottom: '3px' }}>Value</label>
              <input name={`value_${stat.id}`} defaultValue={stat.value} style={{ border: '1.5px solid #e5e7eb', borderRadius: '8px', padding: '8px 12px', fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#111', outline: 'none', background: '#fff', width: '100%', boxSizing: 'border-box' as const }} />
            </div>
          </div>
        ))}
        <button type="submit" style={{ padding: '11px 24px', borderRadius: '8px', border: 'none', background: '#1f2fe6', color: '#fff', fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: 500, cursor: 'pointer', alignSelf: 'flex-start', marginTop: '4px' }}>
          Save All Stats
        </button>
      </form>
    </div>
  )
}
