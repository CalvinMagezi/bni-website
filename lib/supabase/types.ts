export type Json = string | number | boolean | null | { [key: string]: Json } | Json[]

export interface Database {
  public: {
    Tables: {
      posts: { Row: Post; Insert: Omit<Post, 'id' | 'created_at'>; Update: Partial<Post> }
      stories: { Row: Story; Insert: Omit<Story, 'id' | 'created_at'>; Update: Partial<Story> }
      camp_stats: { Row: CampStat; Insert: Omit<CampStat, 'id'>; Update: Partial<CampStat> }
      team_members: { Row: TeamMember; Insert: Omit<TeamMember, 'id' | 'created_at'>; Update: Partial<TeamMember> }
      gallery_albums: { Row: GalleryAlbum; Insert: Omit<GalleryAlbum, 'id' | 'created_at'>; Update: Partial<GalleryAlbum> }
      gallery_photos: { Row: GalleryPhoto; Insert: Omit<GalleryPhoto, 'id' | 'created_at'>; Update: Partial<GalleryPhoto> }
      contact_submissions: { Row: ContactSubmission; Insert: Omit<ContactSubmission, 'id' | 'created_at'>; Update: never }
      newsletter_subscribers: { Row: NewsletterSubscriber; Insert: Omit<NewsletterSubscriber, 'id' | 'created_at'>; Update: never }
      enrollment_intakes: { Row: EnrollmentIntake; Insert: Omit<EnrollmentIntake, 'id' | 'created_at'>; Update: never }
    }
  }
}

export interface Post {
  id: string
  author: string
  role: string
  avatar_url: string | null
  avatar_emoji: string | null
  time_label: string
  is_live: boolean
  text: string
  image_url: string | null
  image_aspect: 'portrait' | 'landscape' | null
  highlight_bg: string | null
  reactions: { fire: number; heart: number; clap: number }
  comments: number
  position: number
  created_at: string
}

export interface Story {
  id: string
  label: string
  image_url: string
  is_live: boolean
  position: number
  created_at: string
}

export interface CampStat {
  id: string
  label: string
  value: string
  icon: string
  position: number
}

export interface TeamMember {
  id: string
  name: string
  title: string
  image_url: string | null
  position: number
  created_at: string
}

export interface GalleryAlbum {
  id: string
  title: string
  slug: string
  cover_image: string
  photo_count: number
  created_at: string
}

export interface GalleryPhoto {
  id: string
  album_id: string
  src: string
  alt: string
  aspect: 'portrait' | 'landscape'
  position: number
  created_at: string
}

export interface ContactSubmission {
  id: string
  name: string
  email: string
  phone: string | null
  message: string
  agreed: boolean
  created_at: string
}

export interface NewsletterSubscriber {
  id: string
  email: string
  created_at: string
}

export interface EnrollmentIntake {
  id: string
  name: string
  age: string
  interest: string
  parent_email: string
  created_at: string
}
