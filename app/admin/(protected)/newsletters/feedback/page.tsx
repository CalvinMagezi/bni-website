import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

const STARS = ['⭐', '⭐⭐', '⭐⭐⭐', '⭐⭐⭐⭐', '⭐⭐⭐⭐⭐']

export default async function FeedbackPage() {
  const supabase = await createClient()
  const { data: feedback } = await supabase
    .from('camp_feedback')
    .select('*')
    .order('created_at', { ascending: false })

  const rows = feedback ?? []
  const avgRating = rows.length > 0 ? (rows.reduce((sum, r) => sum + (r.rating ?? 0), 0) / rows.length).toFixed(1) : '—'
  const wouldRecommend = rows.filter(r => r.would_recommend).length

  return (
    <div>
      <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '26px', fontWeight: 700, color: '#0d1787', marginBottom: '8px' }}>
        Parent Feedback
      </h1>
      <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#6b7280', marginBottom: '24px' }}>
        Post-camp feedback submitted by parents and guardians.
      </p>

      {/* Summary stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '28px' }}>
        {[
          { label: 'Total Responses', value: rows.length, color: '#1f2fe6' },
          { label: 'Avg Rating', value: `${avgRating}/5`, color: '#d97706' },
          { label: 'Would Recommend', value: `${wouldRecommend}/${rows.length}`, color: '#059669' },
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
                    {fb.parent_name}
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 400, color: '#6b7280', marginLeft: '6px' }}>
                      re: {fb.son_name}
                    </span>
                  </p>
                  <a href={`mailto:${fb.parent_email}`} style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#1f2fe6', textDecoration: 'none' }}>
                    {fb.parent_email}
                  </a>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '18px', margin: '0 0 2px' }}>
                    {STARS[(fb.rating ?? 1) - 1]}
                  </p>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', color: fb.would_recommend ? '#059669' : '#9ca3af', margin: 0 }}>
                    {fb.would_recommend ? '✓ Would recommend' : '✗ Would not recommend'}
                  </p>
                </div>
              </div>

              {fb.improvements && (
                <div style={{ marginBottom: '8px' }}>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '4px' }}>
                    Suggested Improvements
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
