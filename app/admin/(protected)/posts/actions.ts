'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function createPost(formData: FormData) {
  const supabase = await createClient()
  const { error } = await supabase.from('posts').insert({
    author: formData.get('author') as string,
    role: formData.get('role') as string,
    avatar_url: (formData.get('avatar_url') as string) || null,
    avatar_emoji: (formData.get('avatar_emoji') as string) || null,
    time_label: (formData.get('time_label') as string) || 'Just now',
    is_live: formData.get('is_live') === 'true',
    text: formData.get('text') as string,
    image_url: (formData.get('image_url') as string) || null,
    image_aspect: ((formData.get('image_aspect') as string) || null) as 'portrait' | 'landscape' | null,
    highlight_bg: (formData.get('highlight_bg') as string) || null,
    reactions: { fire: 0, heart: 0, clap: 0 },
    comments: 0,
    position: Number(formData.get('position') || 0),
  })
  if (error) throw new Error(error.message)
  redirect('/admin/posts')
}

export async function updatePost(id: string, formData: FormData) {
  const supabase = await createClient()
  const { error } = await supabase.from('posts').update({
    author: formData.get('author') as string,
    role: formData.get('role') as string,
    avatar_url: (formData.get('avatar_url') as string) || null,
    avatar_emoji: (formData.get('avatar_emoji') as string) || null,
    time_label: (formData.get('time_label') as string) || 'Just now',
    is_live: formData.get('is_live') === 'true',
    text: formData.get('text') as string,
    image_url: (formData.get('image_url') as string) || null,
    image_aspect: ((formData.get('image_aspect') as string) || null) as 'portrait' | 'landscape' | null,
    highlight_bg: (formData.get('highlight_bg') as string) || null,
    position: Number(formData.get('position') || 0),
  }).eq('id', id)
  if (error) throw new Error(error.message)
  redirect('/admin/posts')
}

export async function deletePost(id: string) {
  const supabase = await createClient()
  await supabase.from('posts').delete().eq('id', id)
  redirect('/admin/posts')
}
