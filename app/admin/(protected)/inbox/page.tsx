import { createClient } from '@/lib/supabase/server'

export default async function AdminInboxPage() {
  const supabase = await createClient()
  const [
    { data: contacts },
    { data: subscribers },
    { data: enrollments },
  ] = await Promise.all([
    supabase.from('contact_submissions').select('*').order('created_at', { ascending: false }).limit(50),
    supabase.from('newsletter_subscribers').select('*').order('created_at', { ascending: false }).limit(100),
    supabase.from('enrollment_intakes').select('*').order('created_at', { ascending: false }).limit(50),
  ])

  const cellStyle: React.CSSProperties = {
    padding: '12px 16px',
    fontFamily: 'Inter, sans-serif',
    fontSize: '13px',
    color: '#374151',
    borderBottom: '1px solid #f0f0f5',
    verticalAlign: 'top',
  }

  const headStyle: React.CSSProperties = {
    padding: '12px 16px',
    fontFamily: 'Inter, sans-serif',
    fontSize: '11px',
    fontWeight: 600,
    color: '#6b7280',
    textTransform: 'uppercase',
    letterSpacing: '0.04em',
    background: '#f9fafb',
    borderBottom: '1px solid #f0f0f5',
    verticalAlign: 'top',
    textAlign: 'left',
  }

  const tableStyle: React.CSSProperties = {
    width: '100%',
    borderCollapse: 'collapse',
    background: '#fff',
    borderRadius: '12px',
    overflow: 'hidden',
    border: '1.5px solid #e5e7eb',
  }

  const sectionTitle = (title: string) => (
    <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '18px', fontWeight: 700, color: '#0d1787', marginBottom: '16px', marginTop: '36px' }}>
      {title}
    </h2>
  )

  return (
    <div>
      <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '24px', fontWeight: 700, color: '#0d1787' }}>
        Inbox
      </h1>
      <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#6b7280', marginBottom: '4px' }}>
        All submissions from the public website — read only.
      </p>

      {sectionTitle(`Contact Messages (${contacts?.length ?? 0})`)}
      <div style={{ overflowX: 'auto' }}>
        <table style={tableStyle}>
          <thead>
            <tr>
              {['Date', 'Name', 'Email', 'Phone', 'Message'].map(h => <th key={h} style={headStyle}>{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {(contacts ?? []).map(c => (
              <tr key={c.id}>
                <td style={cellStyle}>{new Date(c.created_at).toLocaleDateString()}</td>
                <td style={cellStyle}>{c.name}</td>
                <td style={cellStyle}><a href={`mailto:${c.email}`} style={{ color: '#1f2fe6', textDecoration: 'none' }}>{c.email}</a></td>
                <td style={cellStyle}>{c.phone || '—'}</td>
                <td style={{ ...cellStyle, maxWidth: '300px', whiteSpace: 'pre-wrap' }}>{c.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {sectionTitle(`Newsletter Subscribers (${subscribers?.length ?? 0})`)}
      <div style={{ overflowX: 'auto' }}>
        <table style={tableStyle}>
          <thead>
            <tr>
              {['Date', 'Email'].map(h => <th key={h} style={headStyle}>{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {(subscribers ?? []).map(s => (
              <tr key={s.id}>
                <td style={cellStyle}>{new Date(s.created_at).toLocaleDateString()}</td>
                <td style={cellStyle}><a href={`mailto:${s.email}`} style={{ color: '#1f2fe6', textDecoration: 'none' }}>{s.email}</a></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {sectionTitle(`Enrollment Intakes (${enrollments?.length ?? 0})`)}
      <div style={{ overflowX: 'auto' }}>
        <table style={tableStyle}>
          <thead>
            <tr>
              {['Date', 'Name', 'Age', 'Interest', 'Parent Email'].map(h => <th key={h} style={headStyle}>{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {(enrollments ?? []).map(e => (
              <tr key={e.id}>
                <td style={cellStyle}>{new Date(e.created_at).toLocaleDateString()}</td>
                <td style={cellStyle}>{e.name}</td>
                <td style={cellStyle}>{e.age}</td>
                <td style={cellStyle}>{e.interest}</td>
                <td style={cellStyle}><a href={`mailto:${e.parent_email}`} style={{ color: '#1f2fe6', textDecoration: 'none' }}>{e.parent_email}</a></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
