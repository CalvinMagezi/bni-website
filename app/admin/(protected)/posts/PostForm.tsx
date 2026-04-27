'use client'

import type { Post } from '@/lib/supabase/types'

interface PostFormProps {
  post?: Post
  action: (formData: FormData) => Promise<void>
  submitLabel: string
}

const fieldStyle: React.CSSProperties = {
  width: '100%',
  padding: '10px 14px',
  borderRadius: '8px',
  border: '1.5px solid #e5e7eb',
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  color: '#111827',
  outline: 'none',
  background: '#ffffff',
  boxSizing: 'border-box',
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontFamily: 'Inter, sans-serif',
  fontSize: '13px',
  fontWeight: 500,
  color: '#374151',
  marginBottom: '6px',
}

export default function PostForm({ post, action, submitLabel }: PostFormProps) {
  return (
    <form action={action} style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '680px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <div>
          <label style={labelStyle}>Author name *</label>
          <input name="author" required defaultValue={post?.author} style={fieldStyle} />
        </div>
        <div>
          <label style={labelStyle}>Role / Title *</label>
          <input name="role" required defaultValue={post?.role} style={fieldStyle} />
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <div>
          <label style={labelStyle}>Avatar image URL</label>
          <input name="avatar_url" defaultValue={post?.avatar_url ?? ''} style={fieldStyle} placeholder="https://..." />
        </div>
        <div>
          <label style={labelStyle}>Avatar emoji (if no image)</label>
          <input name="avatar_emoji" defaultValue={post?.avatar_emoji ?? ''} style={fieldStyle} placeholder="🔨" />
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
        <div>
          <label style={labelStyle}>Time label</label>
          <input name="time_label" defaultValue={post?.time_label ?? 'Just now'} style={fieldStyle} />
        </div>
        <div>
          <label style={labelStyle}>Position (sort order)</label>
          <input name="position" type="number" defaultValue={post?.position ?? 0} style={fieldStyle} />
        </div>
        <div>
          <label style={labelStyle}>Is Live?</label>
          <select name="is_live" defaultValue={post?.is_live ? 'true' : 'false'} style={fieldStyle}>
            <option value="false">No</option>
            <option value="true">Yes — show LIVE badge</option>
          </select>
        </div>
      </div>
      <div>
        <label style={labelStyle}>Post text *</label>
        <textarea name="text" required defaultValue={post?.text} rows={4} style={{ ...fieldStyle, resize: 'vertical' }} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <div>
          <label style={labelStyle}>Image URL</label>
          <input name="image_url" defaultValue={post?.image_url ?? ''} style={fieldStyle} placeholder="https://..." />
        </div>
        <div>
          <label style={labelStyle}>Image aspect ratio</label>
          <select name="image_aspect" defaultValue={post?.image_aspect ?? ''} style={fieldStyle}>
            <option value="">No image</option>
            <option value="landscape">Landscape (3:2)</option>
            <option value="portrait">Portrait (2:3)</option>
          </select>
        </div>
      </div>
      <div>
        <label style={labelStyle}>Highlight background colour (e.g. #fffbeb for yellow tint)</label>
        <input name="highlight_bg" defaultValue={post?.highlight_bg ?? ''} style={fieldStyle} placeholder="#fffbeb" />
      </div>
      <button type="submit" style={{
        padding: '12px 24px',
        borderRadius: '8px',
        border: 'none',
        background: '#1f2fe6',
        color: '#ffffff',
        fontFamily: 'Inter, sans-serif',
        fontSize: '15px',
        fontWeight: 500,
        cursor: 'pointer',
        alignSelf: 'flex-start',
      }}>
        {submitLabel}
      </button>
    </form>
  )
}
