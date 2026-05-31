import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

const STARS = ['⭐', '⭐⭐', '⭐⭐⭐', '⭐⭐⭐⭐', '⭐⭐⭐⭐⭐']

export default async function CamperFeedbackPage() {
  const supabase = await createClient()
  const { data: feedback } = await supabase
    .from('camper_feedback')
    .select('*')
    .order('created_at', { ascending: false })

  const rows = feedback ?? []
  const avgRating = rows.length > 0 ? (rows.reduce((sum, r) => sum + (r.rating ?? 0), 0) / rows.length).toFixed(1) : '—'
  const wouldReturn = rows.filter(r => r.would_return).length

  return (
    <div>
      <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '26px', fontWeight: 700, color: '#0d1787', marginBottom: '8px' }}>
        Camper Feedback
      </h1>
      <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#6b7280', marginBottom: '24px' }}>
        Post-camp feedback submitted by the campers themselves.
      </p>

      {/* Summary stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '28px' }}>
        {[
          { label: 'Total Responses', value: rows.length, color: '#1f2fe6' },
          { label: 'Avg Rating', value: `${avgRating}/5`, color: '#d97706' },
          { label: 'Would Return', value: `${wouldReturn}/${rows.length}`, color: '#059669' },
        ].map(s => (
          <div key={s.label} style={{ background: '#ffffff', borderRadius: '12px', border: '1.5px solid #e5e7eb', padding: '20px' }}>
            <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '28px', fontWeight: 700, color: s.color }}>{s.value}</div>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#6b7280' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {rows.length === 0 ? (
        <div style={{ background: '#ffffff', borderRadius: '14px', border: '1.5px solid #e5e7eb', padding: '48px', textAlign: 'center' }}>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '15px', color: '#9ca3af' }}>No feedback submitted yet.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {rows.map(fb => (
            <div key={fb.id} style={{ background: '#ffffff', borderRadius: '12px', border: '1.5px solid #e5e7eb', padding: '20px 24px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '12px' }}>
                <div>
                  <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '15px', fontWeight: 700, color: '#0d1787', margin: '0 0 2px' }}>
                    {fb.camper_name}
                    {fb.age && (
                      <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 400, color: '#6b7280', marginLeft: '6px' }}>
                        age {fb.age}
                      </span>
                    )}
                  </p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '18px', margin: '0 0 2px' }}>
                    {STARS[(fb.rating ?? 1) - 1]}
                  </p>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', color: fb.would_return ? '#059669' : '#9ca3af', margin: 0 }}>
                    {fb.would_return ? '✓ Would return' : '✗ Would not return'}
                  </p>
                </div>
              </div>

              {fb.favorite_part && (
                <div style={{ marginBottom: '8px' }}>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '4px' }}>
                    Favorite Part
                  </p>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#374151', margin: 0 }}>{fb.favorite_part}</p>
                </div>
              )}

              {fb.improvements && (
                <div style={{ marginBottom: '8px' }}>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '4px' }}>
                    What They&apos;d Change
                  </p>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#374151', margin: 0 }}>{fb.improvements}</p>
                </div>
              )}

              {fb.comments && (
                <div>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '4px' }}>
                    Additional Comments
                  </p>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#374151', margin: 0 }}>{fb.comments}</p>
                </div>
              )}

              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', color: '#d1d5db', marginTop: '12px', marginBottom: 0 }}>
                {fb.created_at ? new Date(fb.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : ''}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
