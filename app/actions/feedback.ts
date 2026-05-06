'use server'

import { createClient } from '@/lib/supabase/server'

export interface FeedbackData {
  parent_name: string
  parent_email: string
  son_name: string
  rating: number
  improvements: string
  would_recommend: boolean
  comments?: string
}

export async function submitFeedback(data: FeedbackData) {
  const supabase = await createClient()
  const { error } = await supabase.from('camp_feedback').insert({
    parent_name: data.parent_name,
    parent_email: data.parent_email,
    son_name: data.son_name,
    rating: data.rating,
    improvements: data.improvements,
    would_recommend: data.would_recommend,
    comments: data.comments || null,
  })
  if (error) return { success: false, error: error.message }
  return { success: true }
}
