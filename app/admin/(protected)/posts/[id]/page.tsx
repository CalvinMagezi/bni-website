import Link from 'next/link'
import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import PostForm from '../PostForm'
import { updatePost } from '../actions'

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const { data: post } = await supabase.from('posts').select('*').eq('id', id).single()
  if (!post) notFound()

  const action = updatePost.bind(null, id)

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px' }}>
        <Link href="/admin/posts" style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#6b7280', textDecoration: 'none' }}>
          ← Back
        </Link>
        <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '22px', fontWeight: 700, color: '#0d1787' }}>
          Edit Post
        </h1>
      </div>
      <PostForm post={post} action={action} submitLabel="Save Changes" />
    </div>
  )
}
