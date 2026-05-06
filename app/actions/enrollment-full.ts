'use server'

import { createClient } from '@/lib/supabase/server'

export interface FullEnrollmentData {
  boy_name: string
  boy_age: string
  boy_dob: string
  school: string
  grade: string
  district: string
  interests: string
  dietary_needs: string
  medical_conditions: string
  can_swim: boolean | null
  parent_name: string
  relationship: string
  parent_phone: string
  parent_whatsapp: string
  parent_email: string
  emergency_name: string
  emergency_phone: string
  emergency_relationship: string
  photo_consent: boolean
  medical_consent: boolean
  rules_accepted: boolean
  terms_accepted: boolean
  payment_preference: string
  notes: string
}

export async function submitFullEnrollment(data: FullEnrollmentData) {
  const supabase = await createClient()
  const { error } = await supabase.from('enrollments').insert({
    boy_name: data.boy_name,
    boy_age: data.boy_age || null,
    boy_dob: data.boy_dob || null,
    school: data.school || null,
    grade: data.grade || null,
    district: data.district || null,
    interests: data.interests || null,
    dietary_needs: data.dietary_needs || null,
    medical_conditions: data.medical_conditions || null,
    can_swim: data.can_swim,
    parent_name: data.parent_name,
    relationship: data.relationship || null,
    parent_phone: data.parent_phone || null,
    parent_whatsapp: data.parent_whatsapp || null,
    parent_email: data.parent_email,
    emergency_name: data.emergency_name || null,
    emergency_phone: data.emergency_phone || null,
    emergency_relationship: data.emergency_relationship || null,
    photo_consent: data.photo_consent,
    medical_consent: data.medical_consent,
    rules_accepted: data.rules_accepted,
    terms_accepted: data.terms_accepted,
    payment_preference: data.payment_preference || null,
    notes: data.notes || null,
    status: 'pending',
  })
  if (error) return { success: false, error: error.message }
  return { success: true }
}
