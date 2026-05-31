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

export interface CamperFeedbackData {
  camper_name: string
  age?: string
  rating: number
  favorite_part?: string
  improvements?: string
  would_return: boolean
  comments?: string
}

export async function submitCamperFeedback(data: CamperFeedbackData) {
  const supabase = await createClient()
  const { error } = await supabase.from('camper_feedback').insert({
    camper_name: data.camper_name,
    age: data.age || null,
    rating: data.rating,
    favorite_part: data.favorite_part || null,
    improvements: data.improvements || null,
    would_return: data.would_return,
    comments: data.comments || null,
  })
  if (error) return { success: false, error: error.message }
  return { success: true }
}
