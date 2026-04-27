import Link from 'next/link'
import PostForm from '../PostForm'
import { createPost } from '../actions'

export default function NewPostPage() {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px' }}>
        <Link href="/admin/posts" style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#6b7280', textDecoration: 'none' }}>
          ← Back
        </Link>
        <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '22px', fontWeight: 700, color: '#0d1787' }}>
          New Camp Post
        </h1>
      </div>
      <PostForm action={createPost} submitLabel="Create Post" />
    </div>
  )
}
