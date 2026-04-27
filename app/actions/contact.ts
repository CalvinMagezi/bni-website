'use server'

import { createClient } from '@/lib/supabase/server'

export async function submitContact(formData: FormData) {
  const supabase = await createClient()
  const { error } = await supabase.from('contact_submissions').insert({
    name: formData.get('name') as string,
    email: formData.get('email') as string,
    phone: (formData.get('phone') as string) || null,
    message: formData.get('message') as string,
    agreed: formData.get('agreed') === 'on',
  })
  if (error) return { success: false, error: error.message }
  return { success: true }
}
