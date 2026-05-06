import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

const STATUS_COLORS: Record<string, string> = {
  pending: '#d97706',
  confirmed: '#059669',
  cancelled: '#dc2626',
}

export default async function EnrollmentsPage() {
  const supabase = await createClient()

  const { data: enrollments } = await supabase
    .from('enrollments')
    .select('*')
    .order('created_at', { ascending: false })

  const rows = enrollments ?? []

  const stats = {
    total: rows.length,
    pending: rows.filter(r => r.status === 'pending').length,
    confirmed: rows.filter(r => r.status === 'confirmed').length,
  }

  return (
    <div>
      <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '26px', fontWeight: 700, color: '#0d1787', marginBottom: '8px' }}>
        Enrollments
      </h1>
      <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#6b7280', marginBottom: '24px' }}>
        Full enrollment submissions from the enroll page.
      </p>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '28px' }}>
        {[
          { label: 'Total', value: stats.total, color: '#1f2fe6' },
          { label: 'Pending', value: stats.pending, color: '#d97706' },
          { label: 'Confirmed', value: stats.confirmed, color: '#059669' },
        ].map(s => (
          <div key={s.label} style={{ background: '#ffffff', borderRadius: '12px', border: '1.5px solid #e5e7eb', padding: '20px' }}>
            <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '28px', fontWeight: 700, color: s.color }}>{s.value}</div>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#6b7280' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {rows.length === 0 ? (
        <div style={{ background: '#ffffff', borderRadius: '14px', border: '1.5px solid #e5e7eb', padding: '48px', textAlign: 'center' }}>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '15px', color: '#9ca3af' }}>No enrollments yet.</p>
        </div>
      ) : (
        <div style={{ background: '#ffffff', borderRadius: '14px', border: '1.5px solid #e5e7eb', overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f9fafb', borderBottom: '1.5px solid #e5e7eb' }}>
                  {['Boy\'s Name', 'Age', 'School', 'Parent', 'Email', 'Payment', 'Status', 'Submitted'].map(h => (
                    <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontFamily: 'Inter, sans-serif', fontSize: '12px', fontWeight: 600, color: '#6b7280', whiteSpace: 'nowrap' }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={r.id} style={{ borderBottom: i < rows.length - 1 ? '1px solid #f3f4f6' : 'none' }}>
                    <td style={{ padding: '12px 16px', fontFamily: 'Space Grotesk, sans-serif', fontSize: '14px', fontWeight: 600, color: '#0d1787', whiteSpace: 'nowrap' }}>
                      {r.boy_name}
                    </td>
                    <td style={{ padding: '12px 16px', fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#374151' }}>
                      {r.boy_age ?? '—'}
                    </td>
                    <td style={{ padding: '12px 16px', fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#374151', maxWidth: '160px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {r.school ?? '—'}
                    </td>
                    <td style={{ padding: '12px 16px', fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#374151', whiteSpace: 'nowrap' }}>
                      {r.parent_name}
                    </td>
                    <td style={{ padding: '12px 16px', fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#374151', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      <a href={`mailto:${r.parent_email}`} style={{ color: '#1f2fe6', textDecoration: 'none' }}>{r.parent_email}</a>
                    </td>
                    <td style={{ padding: '12px 16px', fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#374151', whiteSpace: 'nowrap' }}>
                      {r.payment_preference ?? '—'}
                    </td>
                    <td style={{ padding: '12px 16px', whiteSpace: 'nowrap' }}>
                      <span style={{
                        display: 'inline-block',
                        padding: '3px 10px',
                        borderRadius: '100px',
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '12px',
                        fontWeight: 600,
                        background: `${STATUS_COLORS[r.status] ?? '#6b7280'}18`,
                        color: STATUS_COLORS[r.status] ?? '#6b7280',
                      }}>
                        {r.status ?? 'pending'}
                      </span>
                    </td>
                    <td style={{ padding: '12px 16px', fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#9ca3af', whiteSpace: 'nowrap' }}>
                      {r.created_at ? new Date(r.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
