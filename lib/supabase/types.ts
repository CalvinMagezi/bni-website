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
  bio: string | null
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

export type Enrollment = {
  id: string
  boy_name: string
  boy_age: string | null
  boy_dob: string | null
  school: string | null
  grade: string | null
  district: string | null
  interests: string | null
  dietary_needs: string | null
  medical_conditions: string | null
  can_swim: boolean | null
  parent_name: string
  relationship: string | null
  parent_phone: string | null
  parent_whatsapp: string | null
  parent_email: string
  emergency_name: string | null
  emergency_phone: string | null
  emergency_relationship: string | null
  photo_consent: boolean
  medical_consent: boolean
  rules_accepted: boolean
  terms_accepted: boolean
  payment_preference: string | null
  notes: string | null
  status: string
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
      enrollments: {
        Row: Enrollment
        Insert: Omit<Enrollment, 'id' | 'created_at'>
        Update: Partial<Omit<Enrollment, 'id' | 'created_at'>>
        Relationships: []
      }
      camp_feedback: {
        Row: {
          id: string
          parent_name: string
          parent_email: string
          son_name: string
          rating: number
          improvements: string | null
          would_recommend: boolean
          comments: string | null
          created_at: string
        }
        Insert: {
          parent_name: string
          parent_email: string
          son_name: string
          rating: number
          improvements?: string | null
          would_recommend: boolean
          comments?: string | null
        }
        Update: Record<string, never>
        Relationships: []
      }
      magazine_issues: {
        Row: {
          id: string
          title: string
          issue_number: string | null
          description: string | null
          pdf_url: string
          cover_image_url: string | null
          published_date: string | null
          is_featured: boolean
          created_at: string
        }
        Insert: {
          title: string
          issue_number?: string | null
          description?: string | null
          pdf_url: string
          cover_image_url?: string | null
          published_date?: string | null
          is_featured?: boolean
        }
        Update: Partial<{
          title: string
          issue_number: string | null
          description: string | null
          pdf_url: string
          cover_image_url: string | null
          published_date: string | null
          is_featured: boolean
        }>
        Relationships: []
      }
      site_settings: {
        Row: {
          key: string
          value: string
          updated_at: string
        }
        Insert: {
          key: string
          value: string
          updated_at?: string
        }
        Update: {
          key?: string
          value?: string
          updated_at?: string
        }
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
