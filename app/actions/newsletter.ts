'use server'

import { createClient } from '@/lib/supabase/server'

export async function submitNewsletter(email: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('newsletter_subscribers').insert({ email })
  if (error && error.code === '23505') return { success: true } // already subscribed — treat as success
  if (error) return { success: false, error: error.message }
  return { success: true }
}
