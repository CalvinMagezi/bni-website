'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { slugify } from '@/lib/slugify'

async function requireAdmin() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/admin/login')
  return supabase
}

export async function addArticle(formData: FormData) {
  const supabase = await requireAdmin()
  const title = formData.get('title') as string
  const slugInput = (formData.get('slug') as string)?.trim()
  const slug = slugInput || slugify(title)
  const published_raw = formData.get('published_date') as string

  await supabase.from('articles').insert({
    title,
    slug,
    excerpt: (formData.get('excerpt') as string) || null,
    body: formData.get('body') as string,
    cover_image_url: (formData.get('cover_image_url') as string) || null,
    published_date: published_raw || null,
    is_featured: formData.get('is_featured') === 'on',
  })

  revalidatePath('/resources')
  redirect('/admin/articles')
}

export async function updateArticle(formData: FormData) {
  const supabase = await requireAdmin()
  const id = formData.get('id') as string
  const title = formData.get('title') as string
  const slugInput = (formData.get('slug') as string)?.trim()
  const slug = slugInput || slugify(title)
  const published_raw = formData.get('published_date') as string

  await supabase.from('articles').update({
    title,
    slug,
    excerpt: (formData.get('excerpt') as string) || null,
    body: formData.get('body') as string,
    cover_image_url: (formData.get('cover_image_url') as string) || null,
    published_date: published_raw || null,
    is_featured: formData.get('is_featured') === 'on',
  }).eq('id', id)

  revalidatePath('/resources')
  revalidatePath(`/resources/articles/${slug}`)
  redirect('/admin/articles')
}

export async function deleteArticle(id: string) {
  const supabase = await requireAdmin()
  await supabase.from('articles').delete().eq('id', id)
  revalidatePath('/resources')
  redirect('/admin/articles')
}
