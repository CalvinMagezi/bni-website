import { createClient } from '@/lib/supabase/server'
import { addVideo, deleteVideo } from '@/app/actions/videos'

export const dynamic = 'force-dynamic'

const inputStyle = { border: '1.5px solid #e5e7eb', borderRadius: '8px', padding: '10px 12px', fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#111', outline: 'none', width: '100%', boxSizing: 'border-box' as const }
const labelStyle = { display: 'block', fontSize: '13px', fontWeight: 500, color: '#374151', fontFamily: 'Inter, sans-serif', marginBottom: '6px' }

export default async function AdminVideosPage() {
  const supabase = await createClient()
  const { data: videos } = await supabase.from('videos').select('*').order('position')

  const rows = videos ?? []

  return (
    <div style={{ maxWidth: '860px' }}>
      <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '26px', fontWeight: 700, color: '#0d1787', marginBottom: '8px' }}>
        Videos
      </h1>
      <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#6b7280', marginBottom: '24px' }}>
        {rows.length} video{rows.length !== 1 ? 's' : ''} published
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '36px' }}>
        {rows.map(video => (
          <div key={video.id} style={{ background: '#fff', borderRadius: '12px', border: '1.5px solid #e5e7eb', padding: '20px 24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '15px', fontWeight: 700, color: '#0d1787', margin: 0 }}>
                  {video.title}
                </p>
                {video.is_featured && (
                  <span style={{ background: '#1f2fe618', color: '#1f2fe6', padding: '2px 8px', borderRadius: '100px', fontFamily: 'Inter, sans-serif', fontSize: '11px', fontWeight: 600 }}>
                    Featured
                  </span>
                )}
              </div>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#9ca3af', margin: 0, wordBreak: 'break-all' }}>
                {video.youtube_url}
              </p>
            </div>
            <form action={deleteVideo.bind(null, video.id)}>
              <button type="submit" style={{ padding: '7px 14px', borderRadius: '7px', border: '1.5px solid #fee2e2', background: '#fff5f5', fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 500, color: '#dc2626', cursor: 'pointer' }}>
                Delete
              </button>
            </form>
          </div>
        ))}
      </div>

      <div style={{ background: '#fff', borderRadius: '14px', border: '1.5px solid #e5e7eb', padding: '28px' }}>
        <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '18px', fontWeight: 700, color: '#0d1787', marginBottom: '18px' }}>
          Add YouTube Video
        </h2>
        <form action={addVideo} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div>
            <label style={labelStyle}>Title</label>
            <input name="title" style={inputStyle} required />
          </div>
          <div>
            <label style={labelStyle}>YouTube URL</label>
            <input name="youtube_url" style={inputStyle} placeholder="https://www.youtube.com/watch?v=..." required />
          </div>
          <div>
            <label style={labelStyle}>Description (optional)</label>
            <textarea name="description" rows={3} style={{ ...inputStyle, resize: 'vertical' as const }} />
          </div>
          <div>
            <label style={labelStyle}>Thumbnail URL (optional — auto from YouTube if blank)</label>
            <input name="thumbnail_url" style={inputStyle} placeholder="https://..." />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={labelStyle}>Published Date</label>
              <input name="published_date" type="date" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Position</label>
              <input name="position" type="number" defaultValue={99} style={inputStyle} />
            </div>
          </div>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#374151' }}>
            <input name="is_featured" type="checkbox" />
            Feature this video on the Resources page
          </label>
          <button type="submit" style={{ padding: '12px 24px', borderRadius: '8px', border: 'none', background: '#1f2fe6', color: '#fff', fontFamily: 'Space Grotesk, sans-serif', fontSize: '14px', fontWeight: 700, cursor: 'pointer', alignSelf: 'flex-start' }}>
            Add Video
          </button>
        </form>
      </div>
    </div>
  )
}
