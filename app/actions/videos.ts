'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

async function requireAdmin() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/admin/login')
  return supabase
}

export async function addVideo(formData: FormData) {
  const supabase = await requireAdmin()
  const published_raw = formData.get('published_date') as string

  await supabase.from('videos').insert({
    title: formData.get('title') as string,
    youtube_url: formData.get('youtube_url') as string,
    description: (formData.get('description') as string) || null,
    thumbnail_url: (formData.get('thumbnail_url') as string) || null,
    published_date: published_raw || null,
    position: Number(formData.get('position') || 99),
    is_featured: formData.get('is_featured') === 'on',
  })

  revalidatePath('/resources')
  redirect('/admin/videos')
}

export async function deleteVideo(id: string) {
  const supabase = await requireAdmin()
  await supabase.from('videos').delete().eq('id', id)
  revalidatePath('/resources')
  redirect('/admin/videos')
}
