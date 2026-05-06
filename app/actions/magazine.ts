'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

export async function addMagazineIssue(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/admin/login')

  const published_raw = formData.get('published_date') as string
  await supabase.from('magazine_issues').insert({
    title: formData.get('title') as string,
    issue_number: formData.get('issue_number') as string || null,
    description: formData.get('description') as string || null,
    pdf_url: formData.get('pdf_url') as string,
    cover_image_url: formData.get('cover_image_url') as string || null,
    published_date: published_raw || null,
    is_featured: formData.get('is_featured') === 'on',
  })

  revalidatePath('/magazine')
  revalidatePath('/admin/magazine')
  redirect('/admin/magazine')
}

export async function deleteMagazineIssue(id: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/admin/login')

  await supabase.from('magazine_issues').delete().eq('id', id)
  revalidatePath('/magazine')
  revalidatePath('/admin/magazine')
  redirect('/admin/magazine')
}
