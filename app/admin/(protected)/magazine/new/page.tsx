import { addMagazineIssue } from '@/app/actions/magazine'

export default function NewMagazinePage() {
  return (
    <div style={{ maxWidth: '640px' }}>
      <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '26px', fontWeight: 700, color: '#0d1787', marginBottom: '8px' }}>
        Add Magazine Issue
      </h1>
      <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#6b7280', marginBottom: '32px' }}>
        Upload a new issue to the TBNI magazine library. Host the PDF on Supabase Storage or any public URL.
      </p>

      <form action={addMagazineIssue}>
        <div style={{ background: '#ffffff', borderRadius: '14px', border: '1.5px solid #e5e7eb', padding: '32px', display: 'flex', flexDirection: 'column', gap: '20px' }}>

          <div>
            <label style={{ display: 'block', fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>
              Title <span style={{ color: '#dc2626' }}>*</span>
            </label>
            <input
              name="title"
              required
              placeholder="e.g. The Boys Network International — Issue 27"
              style={{ width: '100%', border: '1.5px solid #e5e7eb', borderRadius: '8px', padding: '10px 14px', fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#1a1a2e', outline: 'none', boxSizing: 'border-box' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>
                Issue Number
              </label>
              <input
                name="issue_number"
                placeholder="27"
                style={{ width: '100%', border: '1.5px solid #e5e7eb', borderRadius: '8px', padding: '10px 14px', fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#1a1a2e', outline: 'none', boxSizing: 'border-box' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>
                Published Date
              </label>
              <input
                name="published_date"
                type="date"
                style={{ width: '100%', border: '1.5px solid #e5e7eb', borderRadius: '8px', padding: '10px 14px', fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#1a1a2e', outline: 'none', boxSizing: 'border-box' }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>
              PDF URL <span style={{ color: '#dc2626' }}>*</span>
            </label>
            <input
              name="pdf_url"
              type="url"
              required
              placeholder="https://..."
              style={{ width: '100%', border: '1.5px solid #e5e7eb', borderRadius: '8px', padding: '10px 14px', fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#1a1a2e', outline: 'none', boxSizing: 'border-box' }}
            />
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#9ca3af', marginTop: '4px' }}>
              Upload the PDF to Supabase Storage → magazine-pdfs bucket, then paste the public URL here.
            </p>
          </div>

          <div>
            <label style={{ display: 'block', fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>
              Cover Image URL
            </label>
            <input
              name="cover_image_url"
              type="url"
              placeholder="https://..."
              style={{ width: '100%', border: '1.5px solid #e5e7eb', borderRadius: '8px', padding: '10px 14px', fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#1a1a2e', outline: 'none', boxSizing: 'border-box' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>
              Description
            </label>
            <textarea
              name="description"
              rows={3}
              placeholder="Short description of this issue…"
              style={{ width: '100%', border: '1.5px solid #e5e7eb', borderRadius: '8px', padding: '10px 14px', fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#1a1a2e', outline: 'none', resize: 'vertical', boxSizing: 'border-box' }}
            />
          </div>

          <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
            <input name="is_featured" type="checkbox" style={{ width: '16px', height: '16px', accentColor: '#1f2fe6' }} />
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#374151' }}>Feature this issue (shown prominently on the magazine page)</span>
          </label>

          <div style={{ paddingTop: '8px', borderTop: '1px solid #f3f4f6' }}>
            <button
              type="submit"
              style={{
                background: '#1f2fe6',
                color: '#ffffff',
                border: 'none',
                borderRadius: '8px',
                padding: '12px 28px',
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: '14px',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              Publish Issue
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
