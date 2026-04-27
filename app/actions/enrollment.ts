'use server'

import { createClient } from '@/lib/supabase/server'

export async function submitEnrollment(data: {
  name: string
  age: string
  interest: string
  parent_email: string
}) {
  const supabase = await createClient()
  const { error } = await supabase.from('enrollment_intakes').insert(data)
  if (error) return { success: false, error: error.message }
  return { success: true }
}
