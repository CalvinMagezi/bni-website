'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function getCampSettings() {
  const supabase = await createClient()
  const { data } = await supabase.from('site_settings').select('key, value')
  const map: Record<string, string> = {}
  for (const row of data ?? []) map[row.key] = row.value
  return {
    camp_date: map.camp_date ?? '2026-08-23',
    camp_end_date: map.camp_end_date ?? '2026-08-29',
    camp_name: map.camp_name ?? 'Rise & Thrive Bootcamp',
  }
}

export async function saveCampSettings(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { success: false, error: 'Not authenticated' }

  const pairs = [
    { key: 'camp_date', value: formData.get('camp_date') as string },
    { key: 'camp_end_date', value: formData.get('camp_end_date') as string },
    { key: 'camp_name', value: formData.get('camp_name') as string },
  ]

  for (const pair of pairs) {
    if (!pair.value) continue
    await supabase.from('site_settings').upsert({ key: pair.key, value: pair.value, updated_at: new Date().toISOString() })
  }

  revalidatePath('/')
  revalidatePath('/programs')
  return { success: true }
}
