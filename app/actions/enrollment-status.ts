'use server'

import { createClient } from '@/lib/supabase/server'

export type EnrollmentStatus = {
  found: false
} | {
  found: true
  boy_name: string
  status: string
  payment_preference: string | null
  created_at: string
}

export async function checkEnrollmentStatus(email: string): Promise<EnrollmentStatus> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('enrollments')
    .select('boy_name, status, payment_preference, created_at')
    .eq('parent_email', email.toLowerCase().trim())
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle()

  if (!data) return { found: false }

  return {
    found: true,
    boy_name: data.boy_name,
    status: data.status ?? 'pending',
    payment_preference: data.payment_preference ?? null,
    created_at: data.created_at,
  }
}
