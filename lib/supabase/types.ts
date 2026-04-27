export type Json = string | number | boolean | null | { [key: string]: Json } | Json[]

export type Post = {
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

export type Story = {
  id: string
  label: string
  image_url: string
  is_live: boolean
  position: number
  created_at: string
}

export type CampStat = {
  id: string
  label: string
  value: string
  icon: string
  position: number
}

export type TeamMember = {
  id: string
  name: string
  title: string
  image_url: string | null
  position: number
  created_at: string
}

export type GalleryAlbum = {
  id: string
  title: string
  slug: string
  cover_image: string
  photo_count: number
  created_at: string
}

export type GalleryPhoto = {
  id: string
  album_id: string
  src: string
  alt: string
  aspect: 'portrait' | 'landscape'
  position: number
  created_at: string
}

export type ContactSubmission = {
  id: string
  name: string
  email: string
  phone: string | null
  message: string
  agreed: boolean
  created_at: string
}

export type NewsletterSubscriber = {
  id: string
  email: string
  created_at: string
}

export type EnrollmentIntake = {
  id: string
  name: string
  age: string
  interest: string
  parent_email: string
  created_at: string
}

export type Database = {
  public: {
    Tables: {
      posts: {
        Row: Post
        Insert: Omit<Post, 'id' | 'created_at'>
        Update: Partial<Omit<Post, 'id' | 'created_at'>>
        Relationships: []
      }
      stories: {
        Row: Story
        Insert: Omit<Story, 'id' | 'created_at'>
        Update: Partial<Omit<Story, 'id' | 'created_at'>>
        Relationships: []
      }
      camp_stats: {
        Row: CampStat
        Insert: Omit<CampStat, 'id'>
        Update: Partial<Omit<CampStat, 'id'>>
        Relationships: []
      }
      team_members: {
        Row: TeamMember
        Insert: Omit<TeamMember, 'id' | 'created_at'>
        Update: Partial<Omit<TeamMember, 'id' | 'created_at'>>
        Relationships: []
      }
      gallery_albums: {
        Row: GalleryAlbum
        Insert: Omit<GalleryAlbum, 'id' | 'created_at'>
        Update: Partial<Omit<GalleryAlbum, 'id' | 'created_at'>>
        Relationships: []
      }
      gallery_photos: {
        Row: GalleryPhoto
        Insert: Omit<GalleryPhoto, 'id' | 'created_at'>
        Update: Partial<Omit<GalleryPhoto, 'id' | 'created_at'>>
        Relationships: []
      }
      contact_submissions: {
        Row: ContactSubmission
        Insert: Omit<ContactSubmission, 'id' | 'created_at'>
        Update: Record<string, never>
        Relationships: []
      }
      newsletter_subscribers: {
        Row: NewsletterSubscriber
        Insert: Omit<NewsletterSubscriber, 'id' | 'created_at'>
        Update: Record<string, never>
        Relationships: []
      }
      enrollment_intakes: {
        Row: EnrollmentIntake
        Insert: Omit<EnrollmentIntake, 'id' | 'created_at'>
        Update: Record<string, never>
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
  }
}
