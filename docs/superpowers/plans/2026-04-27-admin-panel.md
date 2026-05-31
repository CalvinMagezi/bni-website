# Admin Panel — Supabase + Next.js Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a full-stack admin panel at `/admin/*` backed by Supabase so a non-technical person can manage all BNI website content without touching code.

**Architecture:** Supabase (Postgres + Auth + Storage) provides the backend; Next.js App Router Server Components fetch public data from Supabase at runtime; Server Actions handle mutations from 'use client' forms; `middleware.ts` gates every `/admin/*` route except `/admin/login` via Supabase session cookies; all admin UI uses inline styles (Tailwind v4 does not reliably compile classes for new deeply-nested JSX in this repo).

**Tech Stack:** Next.js 15 App Router, @supabase/ssr, @supabase/supabase-js, Supabase Postgres, Supabase Auth (Google OAuth), Supabase Storage

---

## File Map

### New files — Supabase lib
- `lib/supabase/client.ts` — browser `createBrowserClient` for 'use client' components
- `lib/supabase/server.ts` — server `createServerClient` for Server Components & Actions
- `lib/supabase/types.ts` — generated Database type (manually written for this plan)

### New files — Middleware
- `middleware.ts` (root) — protect `/admin/*`, redirect unauthenticated to `/admin/login`

### New files — Admin app routes
- `app/admin/layout.tsx` — admin shell: sidebar nav + main area
- `app/admin/page.tsx` — dashboard: submission counts & quick links
- `app/admin/login/page.tsx` — Google OAuth sign-in button
- `app/admin/posts/page.tsx` — list all camp-live posts
- `app/admin/posts/new/page.tsx` — create post form
- `app/admin/posts/[id]/page.tsx` — edit post form
- `app/admin/stories/page.tsx` — list + create/delete stories
- `app/admin/stats/page.tsx` — edit 4 camp stat values
- `app/admin/gallery/page.tsx` — list albums
- `app/admin/gallery/new/page.tsx` — create album
- `app/admin/gallery/[id]/page.tsx` — manage photos in album
- `app/admin/team/page.tsx` — list + create/edit/delete team members
- `app/admin/inbox/page.tsx` — view contact submissions, newsletter subs, enrollments

### New files — Server Actions
- `app/actions/contact.ts` — insert contact_submissions row
- `app/actions/newsletter.ts` — insert newsletter_subscribers row
- `app/actions/enrollment.ts` — insert enrollment_intakes row

### Modified files — public pages read from Supabase
- `app/camp-live/page.tsx` — fetch posts, stories, campStats from Supabase
- `components/shared/MeetFounders.tsx` — fetch team_members from Supabase
- `app/gallery/page.tsx` — fetch gallery_albums from Supabase
- `app/gallery/the-inaugural-boys-network-camp-2025/page.tsx` — migrate to dynamic `[slug]` page
- `components/contact/ContactForm.tsx` — call `contactAction` Server Action
- `components/camp-live/NewsletterSignup.tsx` — call `newsletterAction` Server Action
- `components/camp-live/EnrollmentBot.tsx` — call `enrollmentAction` Server Action

### Modified files — app router
- `app/gallery/[slug]/page.tsx` — new dynamic route replacing the static slug folder

---

## Supabase SQL Schema (run once in Supabase SQL editor)

```sql
-- Posts (Camp Live feed)
create table posts (
  id          uuid primary key default gen_random_uuid(),
  author      text not null,
  role        text not null,
  avatar_url  text,
  avatar_emoji text,
  time_label  text not null default 'Just now',
  is_live     boolean not null default false,
  text        text not null,
  image_url   text,
  image_aspect text check (image_aspect in ('portrait','landscape')),
  highlight_bg text,
  reactions   jsonb not null default '{"fire":0,"heart":0,"clap":0}',
  comments    int not null default 0,
  position    int not null default 0,
  created_at  timestamptz default now()
);
alter table posts enable row level security;
create policy "public read" on posts for select using (true);
create policy "auth write" on posts for all using (auth.role() = 'authenticated');

-- Stories (Camp Live sidebar strip)
create table stories (
  id        uuid primary key default gen_random_uuid(),
  label     text not null,
  image_url text not null,
  is_live   boolean not null default false,
  position  int not null default 0,
  created_at timestamptz default now()
);
alter table stories enable row level security;
create policy "public read" on stories for select using (true);
create policy "auth write" on stories for all using (auth.role() = 'authenticated');

-- Camp stats (sidebar stats widget)
create table camp_stats (
  id       uuid primary key default gen_random_uuid(),
  label    text not null,
  value    text not null,
  icon     text not null,
  position int not null default 0
);
alter table camp_stats enable row level security;
create policy "public read" on camp_stats for select using (true);
create policy "auth write" on camp_stats for all using (auth.role() = 'authenticated');

-- Insert default stats
insert into camp_stats (label, value, icon, position) values
  ('Boys Enrolled',   '150',   '👦', 0),
  ('Days Running',    '3 / 7', '📅', 1),
  ('Mentors On-Site', '12',    '👨‍🏫', 2),
  ('Activities Today','6',     '⚡', 3);

-- Team members (founders / about page)
create table team_members (
  id        uuid primary key default gen_random_uuid(),
  name      text not null,
  title     text not null,
  image_url text,
  position  int not null default 0,
  created_at timestamptz default now()
);
alter table team_members enable row level security;
create policy "public read" on team_members for select using (true);
create policy "auth write" on team_members for all using (auth.role() = 'authenticated');

-- Insert default team
insert into team_members (name, title, image_url, position) values
  ('Bryan Muwonge',         'Founder, Executive & Marketing Director',         'https://framerusercontent.com/images/5v7dGA4WDpwIeNXkE4HwYyfNjcE.jpg', 0),
  ('Alyce Kampire Muwonge', 'Co-founder & Director Finance & Operations',      'https://framerusercontent.com/images/Mpfb4UC3smoeX6ukSqlYGSZvt2g.jpg', 1),
  ('Pastor Sam Muyinda',    'Co-founder & Director Programs & Impact',          'https://framerusercontent.com/images/xFGs0HH0etkFYMRyCi2kYJSgyE.jpg', 2),
  ('Martin',                'Director, Head of Partnerships',                  null, 3);

-- Gallery albums
create table gallery_albums (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  slug        text not null unique,
  cover_image text not null,
  photo_count int not null default 0,
  created_at  timestamptz default now()
);
alter table gallery_albums enable row level security;
create policy "public read" on gallery_albums for select using (true);
create policy "auth write" on gallery_albums for all using (auth.role() = 'authenticated');

-- Insert default album
insert into gallery_albums (title, slug, cover_image, photo_count) values
  ('The Inaugural Boys Network Camp 2025', 'the-inaugural-boys-network-camp-2025',
   'https://framerusercontent.com/images/zNckLAoaorpjAkb2LSzjVcez7A.jpg', 12);

-- Gallery photos
create table gallery_photos (
  id        uuid primary key default gen_random_uuid(),
  album_id  uuid not null references gallery_albums(id) on delete cascade,
  src       text not null,
  alt       text not null,
  aspect    text not null check (aspect in ('portrait','landscape')),
  position  int not null default 0,
  created_at timestamptz default now()
);
alter table gallery_photos enable row level security;
create policy "public read" on gallery_photos for select using (true);
create policy "auth write" on gallery_photos for all using (auth.role() = 'authenticated');

-- Insert default photos (for inaugural album — get album id first)
-- Run after inserting album; replace <ALBUM_ID> with actual id from gallery_albums
-- INSERT INTO gallery_photos (album_id, src, alt, aspect, position) VALUES ...
-- (Done via admin panel after setup)

-- Contact submissions
create table contact_submissions (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  email      text not null,
  phone      text,
  message    text not null,
  agreed     boolean not null default false,
  created_at timestamptz default now()
);
alter table contact_submissions enable row level security;
create policy "public insert" on contact_submissions for insert with check (true);
create policy "auth read"   on contact_submissions for select using (auth.role() = 'authenticated');

-- Newsletter subscribers
create table newsletter_subscribers (
  id         uuid primary key default gen_random_uuid(),
  email      text not null unique,
  created_at timestamptz default now()
);
alter table newsletter_subscribers enable row level security;
create policy "public insert" on newsletter_subscribers for insert with check (true);
create policy "auth read"   on newsletter_subscribers for select using (auth.role() = 'authenticated');

-- Enrollment intakes (from chatbot)
create table enrollment_intakes (
  id           uuid primary key default gen_random_uuid(),
  name         text not null,
  age          text not null,
  interest     text not null,
  parent_email text not null,
  created_at   timestamptz default now()
);
alter table enrollment_intakes enable row level security;
create policy "public insert" on enrollment_intakes for insert with check (true);
create policy "auth read"   on enrollment_intakes for select using (auth.role() = 'authenticated');
```

---

## Task 1: Install packages & configure environment variables

**Files:**
- Modify: `package.json` (via npm install)
- Create: `.env.local`

- [ ] **Step 1: Install Supabase packages**

```bash
cd /Users/calvinmagezi/Documents/GitHub/bni-website
npm install @supabase/supabase-js @supabase/ssr
```

Expected: packages added, no peer-dep errors.

- [ ] **Step 2: Create .env.local with Supabase credentials**

In Supabase dashboard → Settings → API, copy Project URL and anon key.

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

- [ ] **Step 3: Verify build still passes**

```bash
npm run build
```

Expected: Build succeeds with no TypeScript errors.

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json .env.local
git commit -m "feat: install supabase/ssr and supabase-js"
```

---

## Task 2: Supabase client helpers & types

**Files:**
- Create: `lib/supabase/client.ts`
- Create: `lib/supabase/server.ts`
- Create: `lib/supabase/types.ts`

- [ ] **Step 1: Create browser client**

`lib/supabase/client.ts`:
```typescript
import { createBrowserClient } from '@supabase/ssr'
import type { Database } from './types'

export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
```

- [ ] **Step 2: Create server client**

`lib/supabase/server.ts`:
```typescript
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import type { Database } from './types'

export async function createClient() {
  const cookieStore = await cookies()
  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return cookieStore.getAll() },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {}
        },
      },
    }
  )
}
```

- [ ] **Step 3: Write minimal Database types**

`lib/supabase/types.ts`:
```typescript
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
```

- [ ] **Step 4: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add lib/
git commit -m "feat: supabase client helpers and database types"
```

---

## Task 3: Middleware — protect /admin/* routes

**Files:**
- Create: `middleware.ts` (root of project)

- [ ] **Step 1: Write middleware**

`middleware.ts`:
```typescript
import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return request.cookies.getAll() },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()
  const path = request.nextUrl.pathname

  if (path.startsWith('/admin') && path !== '/admin/login' && !user) {
    const url = request.nextUrl.clone()
    url.pathname = '/admin/login'
    return NextResponse.redirect(url)
  }

  if (path === '/admin/login' && user) {
    const url = request.nextUrl.clone()
    url.pathname = '/admin'
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}

export const config = {
  matcher: ['/admin/:path*'],
}
```

- [ ] **Step 2: Start dev server and verify redirect works**

```bash
npm run dev
```

Open http://localhost:3100/admin — should redirect to /admin/login.
Open http://localhost:3100/admin/login — should load (404 is fine, page not built yet).

- [ ] **Step 3: Commit**

```bash
git add middleware.ts
git commit -m "feat: middleware to protect /admin/* routes"
```

---

## Task 4: Admin login page (Google OAuth)

**Files:**
- Create: `app/admin/login/page.tsx`

First configure Supabase Auth:
1. Supabase dashboard → Authentication → Providers → Google → enable
2. Add Google Client ID + Secret (from Google Cloud Console OAuth 2.0 credentials)
3. Add redirect URL: `https://your-project-id.supabase.co/auth/v1/callback`
4. In Google Cloud Console Authorized redirect URIs add: `https://your-project-id.supabase.co/auth/v1/callback`
5. For local dev also add: `http://localhost:3100` as Supabase Site URL

- [ ] **Step 1: Write login page**

`app/admin/login/page.tsx`:
```typescript
'use client'

import { createClient } from '@/lib/supabase/client'

export default function AdminLoginPage() {
  async function signInWithGoogle() {
    const supabase = createClient()
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/admin` },
    })
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0d1787 0%, #070d4f 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div style={{
        background: '#ffffff',
        borderRadius: '20px',
        padding: '48px 40px',
        width: '100%',
        maxWidth: '400px',
        textAlign: 'center',
        boxShadow: '0 24px 64px rgba(7,13,79,0.3)',
      }}>
        <div style={{
          width: '56px',
          height: '56px',
          borderRadius: '14px',
          background: 'linear-gradient(135deg, #1f2fe6, #070d4f)',
          margin: '0 auto 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <path d="M14 4L20 10H17V18H11V10H8L14 4Z" fill="white"/>
            <rect x="8" y="20" width="12" height="2" rx="1" fill="white"/>
          </svg>
        </div>
        <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '22px', fontWeight: 700, color: '#0d1787', marginBottom: '8px' }}>
          BNI Admin
        </h1>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#6b7280', marginBottom: '32px' }}>
          Sign in with your authorised Google account to manage content.
        </p>
        <button
          onClick={signInWithGoogle}
          style={{
            width: '100%',
            padding: '14px 24px',
            borderRadius: '10px',
            border: '1.5px solid #e5e7eb',
            background: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            cursor: 'pointer',
            fontFamily: 'Inter, sans-serif',
            fontSize: '15px',
            fontWeight: 500,
            color: '#111827',
            transition: 'border-color 0.2s, box-shadow 0.2s',
          }}
          onMouseEnter={e => {
            const t = e.currentTarget
            t.style.borderColor = '#1f2fe6'
            t.style.boxShadow = '0 0 0 3px rgba(31,47,230,0.1)'
          }}
          onMouseLeave={e => {
            const t = e.currentTarget
            t.style.borderColor = '#e5e7eb'
            t.style.boxShadow = 'none'
          }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20">
            <path d="M19.6 10.23c0-.68-.06-1.36-.17-2H10v3.8h5.4a4.6 4.6 0 0 1-2 3.02v2.5h3.24c1.9-1.75 3-4.33 3-7.32z" fill="#4285F4"/>
            <path d="M10 20c2.7 0 4.96-.9 6.62-2.44l-3.24-2.5c-.9.6-2.05.95-3.38.95-2.6 0-4.8-1.75-5.58-4.12H1.06v2.59A10 10 0 0 0 10 20z" fill="#34A853"/>
            <path d="M4.42 11.89A6 6 0 0 1 4.1 10c0-.66.12-1.3.32-1.89V5.52H1.06A10 10 0 0 0 0 10c0 1.61.38 3.13 1.06 4.48l3.36-2.59z" fill="#FBBC05"/>
            <path d="M10 3.98c1.47 0 2.78.5 3.82 1.5l2.86-2.86A9.97 9.97 0 0 0 10 0 10 10 0 0 0 1.06 5.52l3.36 2.59C5.2 5.73 7.4 3.98 10 3.98z" fill="#EA4335"/>
          </svg>
          Continue with Google
        </button>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Test in browser**

Visit http://localhost:3100/admin/login — page should render with Google sign-in button.
Click button → Google OAuth flow → redirect back to /admin (after Google OAuth config is complete).

- [ ] **Step 3: Commit**

```bash
git add app/admin/login/
git commit -m "feat: admin login page with Google OAuth"
```

---

## Task 5: Admin layout shell (sidebar + nav)

**Files:**
- Create: `app/admin/layout.tsx`

- [ ] **Step 1: Write admin layout**

`app/admin/layout.tsx`:
```typescript
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: '📊' },
  { href: '/admin/posts', label: 'Camp Posts', icon: '📝' },
  { href: '/admin/stories', label: 'Stories', icon: '🎬' },
  { href: '/admin/stats', label: 'Camp Stats', icon: '📈' },
  { href: '/admin/gallery', label: 'Gallery', icon: '🖼️' },
  { href: '/admin/team', label: 'Team', icon: '👥' },
  { href: '/admin/inbox', label: 'Inbox', icon: '📬' },
]

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/admin/login')

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f8f9fb' }}>
      {/* Sidebar */}
      <aside style={{
        width: '240px',
        flexShrink: 0,
        background: '#0d1787',
        display: 'flex',
        flexDirection: 'column',
        padding: '24px 0',
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        overflowY: 'auto',
      }}>
        <div style={{ padding: '0 20px 28px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '17px', fontWeight: 700, color: '#ffffff' }}>
            BNI Admin
          </span>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', color: 'rgba(255,255,255,0.5)', marginTop: '2px' }}>
            {user.email}
          </p>
        </div>
        <nav style={{ padding: '16px 12px', flex: 1 }}>
          {navItems.map(item => (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 12px',
                borderRadius: '8px',
                fontFamily: 'Inter, sans-serif',
                fontSize: '14px',
                fontWeight: 500,
                color: 'rgba(255,255,255,0.8)',
                textDecoration: 'none',
                marginBottom: '2px',
                transition: 'background 0.15s, color 0.15s',
              }}
            >
              <span style={{ fontSize: '16px' }}>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>
        <div style={{ padding: '16px 12px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <form action="/auth/signout" method="post">
            <button
              type="submit"
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: '8px',
                border: 'none',
                background: 'rgba(255,255,255,0.08)',
                color: 'rgba(255,255,255,0.7)',
                fontFamily: 'Inter, sans-serif',
                fontSize: '13px',
                cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              Sign out
            </button>
          </form>
        </div>
      </aside>

      {/* Main content */}
      <main style={{ marginLeft: '240px', flex: 1, padding: '40px', minWidth: 0 }}>
        {children}
      </main>
    </div>
  )
}
```

- [ ] **Step 2: Create auth signout route**

`app/auth/signout/route.ts`:
```typescript
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function POST() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/admin/login')
}
```

- [ ] **Step 3: Verify admin layout renders**

With Google OAuth configured and signed in, visit http://localhost:3100/admin — sidebar should appear.

- [ ] **Step 4: Commit**

```bash
git add app/admin/layout.tsx app/auth/
git commit -m "feat: admin layout shell with sidebar nav and sign-out"
```

---

## Task 6: Admin dashboard page

**Files:**
- Create: `app/admin/page.tsx`

- [ ] **Step 1: Write dashboard page**

`app/admin/page.tsx`:
```typescript
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

export default async function AdminDashboard() {
  const supabase = await createClient()

  const [
    { count: postsCount },
    { count: storiesCount },
    { count: contactCount },
    { count: newsletterCount },
    { count: enrollmentCount },
  ] = await Promise.all([
    supabase.from('posts').select('*', { count: 'exact', head: true }),
    supabase.from('stories').select('*', { count: 'exact', head: true }),
    supabase.from('contact_submissions').select('*', { count: 'exact', head: true }),
    supabase.from('newsletter_subscribers').select('*', { count: 'exact', head: true }),
    supabase.from('enrollment_intakes').select('*', { count: 'exact', head: true }),
  ])

  const cards = [
    { label: 'Camp Posts', value: postsCount ?? 0, href: '/admin/posts', icon: '📝', color: '#1f2fe6' },
    { label: 'Stories', value: storiesCount ?? 0, href: '/admin/stories', icon: '🎬', color: '#7c3aed' },
    { label: 'Contact Messages', value: contactCount ?? 0, href: '/admin/inbox', icon: '✉️', color: '#059669' },
    { label: 'Newsletter Subs', value: newsletterCount ?? 0, href: '/admin/inbox', icon: '📧', color: '#d97706' },
    { label: 'Enrollments', value: enrollmentCount ?? 0, href: '/admin/inbox', icon: '🎒', color: '#dc2626' },
  ]

  return (
    <div>
      <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '26px', fontWeight: 700, color: '#0d1787', marginBottom: '8px' }}>
        Dashboard
      </h1>
      <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#6b7280', marginBottom: '32px' }}>
        Overview of all BNI platform content.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px', marginBottom: '40px' }}>
        {cards.map(card => (
          <Link key={card.label} href={card.href} style={{ textDecoration: 'none' }}>
            <div style={{
              background: '#ffffff',
              borderRadius: '14px',
              padding: '24px',
              border: '1.5px solid #e5e7eb',
              transition: 'border-color 0.2s, box-shadow 0.2s',
            }}>
              <div style={{ fontSize: '28px', marginBottom: '12px' }}>{card.icon}</div>
              <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '32px', fontWeight: 700, color: card.color, lineHeight: 1 }}>
                {card.value}
              </div>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#6b7280', marginTop: '4px' }}>
                {card.label}
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <Link href="/admin/posts/new" style={{
          display: 'block',
          background: 'linear-gradient(135deg, #1f2fe6, #070d4f)',
          borderRadius: '14px',
          padding: '24px',
          textDecoration: 'none',
        }}>
          <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '16px', fontWeight: 700, color: '#ffffff', marginBottom: '4px' }}>
            + New Camp Post
          </div>
          <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: 'rgba(255,255,255,0.7)' }}>
            Add a new post to the Camp Live feed
          </div>
        </Link>
        <Link href="/admin/inbox" style={{
          display: 'block',
          background: '#ffffff',
          borderRadius: '14px',
          padding: '24px',
          border: '1.5px solid #e5e7eb',
          textDecoration: 'none',
        }}>
          <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '16px', fontWeight: 700, color: '#0d1787', marginBottom: '4px' }}>
            View Inbox
          </div>
          <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#6b7280' }}>
            Contact messages, newsletter subs, enrollments
          </div>
        </Link>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add app/admin/page.tsx
git commit -m "feat: admin dashboard with counts overview"
```

---

## Task 7: Admin — Camp Posts CRUD

**Files:**
- Create: `app/admin/posts/page.tsx`
- Create: `app/admin/posts/new/page.tsx`
- Create: `app/admin/posts/[id]/page.tsx`
- Create: `app/admin/posts/actions.ts`

- [ ] **Step 1: Write Server Actions for posts**

`app/admin/posts/actions.ts`:
```typescript
'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function createPost(formData: FormData) {
  const supabase = await createClient()
  const { error } = await supabase.from('posts').insert({
    author: formData.get('author') as string,
    role: formData.get('role') as string,
    avatar_url: (formData.get('avatar_url') as string) || null,
    avatar_emoji: (formData.get('avatar_emoji') as string) || null,
    time_label: (formData.get('time_label') as string) || 'Just now',
    is_live: formData.get('is_live') === 'true',
    text: formData.get('text') as string,
    image_url: (formData.get('image_url') as string) || null,
    image_aspect: (formData.get('image_aspect') as 'portrait' | 'landscape') || null,
    highlight_bg: (formData.get('highlight_bg') as string) || null,
    reactions: { fire: 0, heart: 0, clap: 0 },
    comments: 0,
    position: Number(formData.get('position') || 0),
  })
  if (error) throw new Error(error.message)
  redirect('/admin/posts')
}

export async function updatePost(id: string, formData: FormData) {
  const supabase = await createClient()
  const { error } = await supabase.from('posts').update({
    author: formData.get('author') as string,
    role: formData.get('role') as string,
    avatar_url: (formData.get('avatar_url') as string) || null,
    avatar_emoji: (formData.get('avatar_emoji') as string) || null,
    time_label: (formData.get('time_label') as string) || 'Just now',
    is_live: formData.get('is_live') === 'true',
    text: formData.get('text') as string,
    image_url: (formData.get('image_url') as string) || null,
    image_aspect: (formData.get('image_aspect') as 'portrait' | 'landscape') || null,
    highlight_bg: (formData.get('highlight_bg') as string) || null,
    position: Number(formData.get('position') || 0),
  }).eq('id', id)
  if (error) throw new Error(error.message)
  redirect('/admin/posts')
}

export async function deletePost(id: string) {
  const supabase = await createClient()
  await supabase.from('posts').delete().eq('id', id)
  redirect('/admin/posts')
}
```

- [ ] **Step 2: Write posts list page**

`app/admin/posts/page.tsx`:
```typescript
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { deletePost } from './actions'

export default async function AdminPostsPage() {
  const supabase = await createClient()
  const { data: posts } = await supabase
    .from('posts')
    .select('id, author, role, time_label, is_live, position, text')
    .order('position', { ascending: true })

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '24px', fontWeight: 700, color: '#0d1787' }}>
          Camp Posts
        </h1>
        <Link href="/admin/posts/new" style={{
          display: 'inline-block',
          padding: '10px 20px',
          borderRadius: '8px',
          background: '#1f2fe6',
          color: '#ffffff',
          fontFamily: 'Inter, sans-serif',
          fontSize: '14px',
          fontWeight: 500,
          textDecoration: 'none',
        }}>
          + New Post
        </Link>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {(posts ?? []).map(post => (
          <div key={post.id} style={{
            background: '#ffffff',
            borderRadius: '12px',
            padding: '16px 20px',
            border: '1.5px solid #e5e7eb',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
          }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                {post.is_live && (
                  <span style={{ background: '#ef4444', color: '#fff', fontSize: '10px', fontWeight: 700, padding: '2px 8px', borderRadius: '100px', fontFamily: 'Inter, sans-serif' }}>
                    LIVE
                  </span>
                )}
                <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '14px', fontWeight: 600, color: '#111827' }}>
                  {post.author}
                </span>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#9ca3af' }}>
                  · {post.role} · {post.time_label}
                </span>
              </div>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#6b7280', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {post.text}
              </p>
            </div>
            <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
              <Link href={`/admin/posts/${post.id}`} style={{
                padding: '7px 14px',
                borderRadius: '7px',
                border: '1.5px solid #e5e7eb',
                background: '#f9fafb',
                fontFamily: 'Inter, sans-serif',
                fontSize: '13px',
                color: '#374151',
                textDecoration: 'none',
              }}>
                Edit
              </Link>
              <form action={deletePost.bind(null, post.id)}>
                <button type="submit" style={{
                  padding: '7px 14px',
                  borderRadius: '7px',
                  border: '1.5px solid #fecaca',
                  background: '#fff5f5',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '13px',
                  color: '#ef4444',
                  cursor: 'pointer',
                }}>
                  Delete
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Write post form component (shared by new + edit)**

`app/admin/posts/PostForm.tsx`:
```typescript
'use client'

import type { Post } from '@/lib/supabase/types'

interface PostFormProps {
  post?: Post
  action: (formData: FormData) => Promise<void>
  submitLabel: string
}

const fieldStyle: React.CSSProperties = {
  width: '100%',
  padding: '10px 14px',
  borderRadius: '8px',
  border: '1.5px solid #e5e7eb',
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  color: '#111827',
  outline: 'none',
  background: '#ffffff',
  boxSizing: 'border-box',
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontFamily: 'Inter, sans-serif',
  fontSize: '13px',
  fontWeight: 500,
  color: '#374151',
  marginBottom: '6px',
}

export default function PostForm({ post, action, submitLabel }: PostFormProps) {
  return (
    <form action={action} style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '680px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <div>
          <label style={labelStyle}>Author name *</label>
          <input name="author" required defaultValue={post?.author} style={fieldStyle} />
        </div>
        <div>
          <label style={labelStyle}>Role / Title *</label>
          <input name="role" required defaultValue={post?.role} style={fieldStyle} />
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <div>
          <label style={labelStyle}>Avatar image URL</label>
          <input name="avatar_url" defaultValue={post?.avatar_url ?? ''} style={fieldStyle} placeholder="https://..." />
        </div>
        <div>
          <label style={labelStyle}>Avatar emoji (if no image)</label>
          <input name="avatar_emoji" defaultValue={post?.avatar_emoji ?? ''} style={fieldStyle} placeholder="🔨" />
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
        <div>
          <label style={labelStyle}>Time label</label>
          <input name="time_label" defaultValue={post?.time_label ?? 'Just now'} style={fieldStyle} />
        </div>
        <div>
          <label style={labelStyle}>Position (sort order)</label>
          <input name="position" type="number" defaultValue={post?.position ?? 0} style={fieldStyle} />
        </div>
        <div>
          <label style={labelStyle}>Is Live?</label>
          <select name="is_live" defaultValue={post?.is_live ? 'true' : 'false'} style={fieldStyle}>
            <option value="false">No</option>
            <option value="true">Yes — show LIVE badge</option>
          </select>
        </div>
      </div>
      <div>
        <label style={labelStyle}>Post text *</label>
        <textarea name="text" required defaultValue={post?.text} rows={4} style={{ ...fieldStyle, resize: 'vertical' }} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <div>
          <label style={labelStyle}>Image URL</label>
          <input name="image_url" defaultValue={post?.image_url ?? ''} style={fieldStyle} placeholder="https://..." />
        </div>
        <div>
          <label style={labelStyle}>Image aspect ratio</label>
          <select name="image_aspect" defaultValue={post?.image_aspect ?? ''} style={fieldStyle}>
            <option value="">No image</option>
            <option value="landscape">Landscape (3:2)</option>
            <option value="portrait">Portrait (2:3)</option>
          </select>
        </div>
      </div>
      <div>
        <label style={labelStyle}>Highlight background colour (e.g. #fffbeb for yellow tint)</label>
        <input name="highlight_bg" defaultValue={post?.highlight_bg ?? ''} style={fieldStyle} placeholder="#fffbeb" />
      </div>
      <button type="submit" style={{
        padding: '12px 24px',
        borderRadius: '8px',
        border: 'none',
        background: '#1f2fe6',
        color: '#ffffff',
        fontFamily: 'Inter, sans-serif',
        fontSize: '15px',
        fontWeight: 500,
        cursor: 'pointer',
        alignSelf: 'flex-start',
      }}>
        {submitLabel}
      </button>
    </form>
  )
}
```

- [ ] **Step 4: Write new post page**

`app/admin/posts/new/page.tsx`:
```typescript
import Link from 'next/link'
import PostForm from '../PostForm'
import { createPost } from '../actions'

export default function NewPostPage() {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px' }}>
        <Link href="/admin/posts" style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#6b7280', textDecoration: 'none' }}>
          ← Back
        </Link>
        <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '22px', fontWeight: 700, color: '#0d1787' }}>
          New Camp Post
        </h1>
      </div>
      <PostForm action={createPost} submitLabel="Create Post" />
    </div>
  )
}
```

- [ ] **Step 5: Write edit post page**

`app/admin/posts/[id]/page.tsx`:
```typescript
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import PostForm from '../PostForm'
import { updatePost } from '../actions'

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const { data: post } = await supabase.from('posts').select('*').eq('id', id).single()
  if (!post) notFound()

  const action = updatePost.bind(null, id)

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px' }}>
        <Link href="/admin/posts" style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#6b7280', textDecoration: 'none' }}>
          ← Back
        </Link>
        <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '22px', fontWeight: 700, color: '#0d1787' }}>
          Edit Post
        </h1>
      </div>
      <PostForm post={post} action={action} submitLabel="Save Changes" />
    </div>
  )
}
```

- [ ] **Step 6: Commit**

```bash
git add app/admin/posts/
git commit -m "feat: admin camp posts CRUD (list, create, edit, delete)"
```

---

## Task 8: Admin — Stories, Stats, Team

**Files:**
- Create: `app/admin/stories/page.tsx`
- Create: `app/admin/stats/page.tsx`
- Create: `app/admin/team/page.tsx`

- [ ] **Step 1: Write stories page (list + create inline + delete)**

`app/admin/stories/page.tsx`:
```typescript
import { createClient } from '@/lib/supabase/server'
import Image from 'next/image'
import { redirect } from 'next/navigation'

async function createStory(formData: FormData) {
  'use server'
  const supabase = await createClient()
  await supabase.from('stories').insert({
    label: formData.get('label') as string,
    image_url: formData.get('image_url') as string,
    is_live: formData.get('is_live') === 'true',
    position: Number(formData.get('position') || 99),
  })
  redirect('/admin/stories')
}

async function deleteStory(formData: FormData) {
  'use server'
  const supabase = await createClient()
  await supabase.from('stories').delete().eq('id', formData.get('id') as string)
  redirect('/admin/stories')
}

export default async function AdminStoriesPage() {
  const supabase = await createClient()
  const { data: stories } = await supabase.from('stories').select('*').order('position')

  const fieldStyle = 'border:1.5px solid #e5e7eb;border-radius:8px;padding:8px 12px;font-family:Inter,sans-serif;font-size:13px;color:#111;outline:none;background:#fff;width:100%;box-sizing:border-box'

  return (
    <div>
      <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '24px', fontWeight: 700, color: '#0d1787', marginBottom: '24px' }}>
        Stories
      </h1>

      {/* Existing stories */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '32px' }}>
        {(stories ?? []).map(story => (
          <div key={story.id} style={{ background: '#fff', borderRadius: '12px', padding: '14px 18px', border: '1.5px solid #e5e7eb', display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '50%', overflow: 'hidden', flexShrink: 0, background: '#f0f0f5', position: 'relative' }}>
              <Image src={story.image_url} alt={story.label} fill style={{ objectFit: 'cover' }} unoptimized />
            </div>
            <div style={{ flex: 1 }}>
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: 600, color: '#111' }}>{story.label}</span>
              {story.is_live && <span style={{ marginLeft: '8px', background: '#ef4444', color: '#fff', fontSize: '10px', fontWeight: 700, padding: '2px 7px', borderRadius: '100px' }}>LIVE</span>}
            </div>
            <form action={deleteStory}>
              <input type="hidden" name="id" value={story.id} />
              <button type="submit" style={{ padding: '6px 12px', borderRadius: '7px', border: '1.5px solid #fecaca', background: '#fff5f5', color: '#ef4444', fontFamily: 'Inter, sans-serif', fontSize: '12px', cursor: 'pointer' }}>
                Delete
              </button>
            </form>
          </div>
        ))}
      </div>

      {/* Add new story */}
      <div style={{ background: '#fff', borderRadius: '14px', padding: '24px', border: '1.5px solid #e5e7eb' }}>
        <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '16px', fontWeight: 700, color: '#0d1787', marginBottom: '16px' }}>
          Add Story
        </h2>
        <form action={createStory} style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 80px 80px', gap: '12px', alignItems: 'end' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', color: '#6b7280', fontFamily: 'Inter, sans-serif', marginBottom: '4px' }}>Label</label>
            <input name="label" required style={{ border: '1.5px solid #e5e7eb', borderRadius: '8px', padding: '8px 12px', fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#111', outline: 'none', background: '#fff', width: '100%', boxSizing: 'border-box' as const }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '12px', color: '#6b7280', fontFamily: 'Inter, sans-serif', marginBottom: '4px' }}>Image URL</label>
            <input name="image_url" required style={{ border: '1.5px solid #e5e7eb', borderRadius: '8px', padding: '8px 12px', fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#111', outline: 'none', background: '#fff', width: '100%', boxSizing: 'border-box' as const }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '12px', color: '#6b7280', fontFamily: 'Inter, sans-serif', marginBottom: '4px' }}>Live?</label>
            <select name="is_live" style={{ border: '1.5px solid #e5e7eb', borderRadius: '8px', padding: '8px 12px', fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#111', outline: 'none', background: '#fff', width: '100%', boxSizing: 'border-box' as const }}>
              <option value="false">No</option>
              <option value="true">Yes</option>
            </select>
          </div>
          <button type="submit" style={{ padding: '8px 16px', borderRadius: '8px', border: 'none', background: '#1f2fe6', color: '#fff', fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 500, cursor: 'pointer' }}>
            Add
          </button>
        </form>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Write camp stats page (inline edit all 4 rows)**

`app/admin/stats/page.tsx`:
```typescript
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

async function updateStats(formData: FormData) {
  'use server'
  const supabase = await createClient()
  const ids = formData.getAll('id') as string[]
  await Promise.all(ids.map(id => supabase.from('camp_stats').update({
    label: formData.get(`label_${id}`) as string,
    value: formData.get(`value_${id}`) as string,
    icon:  formData.get(`icon_${id}`)  as string,
  }).eq('id', id)))
  redirect('/admin/stats')
}

export default async function AdminStatsPage() {
  const supabase = await createClient()
  const { data: stats } = await supabase.from('camp_stats').select('*').order('position')

  return (
    <div>
      <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '24px', fontWeight: 700, color: '#0d1787', marginBottom: '8px' }}>
        Camp Stats
      </h1>
      <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#6b7280', marginBottom: '28px' }}>
        These appear in the Camp Live sidebar stats widget.
      </p>
      <form action={updateStats} style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '600px' }}>
        {(stats ?? []).map(stat => (
          <div key={stat.id} style={{ background: '#fff', borderRadius: '12px', padding: '18px', border: '1.5px solid #e5e7eb', display: 'grid', gridTemplateColumns: '48px 1fr 1fr', gap: '12px', alignItems: 'center' }}>
            <input type="hidden" name="id" value={stat.id} />
            <input name={`icon_${stat.id}`} defaultValue={stat.icon} style={{ border: '1.5px solid #e5e7eb', borderRadius: '8px', padding: '8px', fontFamily: 'Inter, sans-serif', fontSize: '20px', textAlign: 'center', outline: 'none', background: '#f9fafb' }} />
            <div>
              <label style={{ display: 'block', fontSize: '11px', color: '#9ca3af', fontFamily: 'Inter, sans-serif', marginBottom: '3px' }}>Label</label>
              <input name={`label_${stat.id}`} defaultValue={stat.label} style={{ border: '1.5px solid #e5e7eb', borderRadius: '8px', padding: '8px 12px', fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#111', outline: 'none', background: '#fff', width: '100%', boxSizing: 'border-box' as const }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '11px', color: '#9ca3af', fontFamily: 'Inter, sans-serif', marginBottom: '3px' }}>Value</label>
              <input name={`value_${stat.id}`} defaultValue={stat.value} style={{ border: '1.5px solid #e5e7eb', borderRadius: '8px', padding: '8px 12px', fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#111', outline: 'none', background: '#fff', width: '100%', boxSizing: 'border-box' as const }} />
            </div>
          </div>
        ))}
        <button type="submit" style={{ padding: '11px 24px', borderRadius: '8px', border: 'none', background: '#1f2fe6', color: '#fff', fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: 500, cursor: 'pointer', alignSelf: 'flex-start', marginTop: '4px' }}>
          Save All Stats
        </button>
      </form>
    </div>
  )
}
```

- [ ] **Step 3: Write team members page (list + create + delete)**

`app/admin/team/page.tsx`:
```typescript
import { createClient } from '@/lib/supabase/server'
import Image from 'next/image'
import { redirect } from 'next/navigation'

async function createMember(formData: FormData) {
  'use server'
  const supabase = await createClient()
  await supabase.from('team_members').insert({
    name: formData.get('name') as string,
    title: formData.get('title') as string,
    image_url: (formData.get('image_url') as string) || null,
    position: Number(formData.get('position') || 99),
  })
  redirect('/admin/team')
}

async function deleteMember(formData: FormData) {
  'use server'
  const supabase = await createClient()
  await supabase.from('team_members').delete().eq('id', formData.get('id') as string)
  redirect('/admin/team')
}

export default async function AdminTeamPage() {
  const supabase = await createClient()
  const { data: members } = await supabase.from('team_members').select('*').order('position')

  return (
    <div>
      <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '24px', fontWeight: 700, color: '#0d1787', marginBottom: '24px' }}>
        Team Members
      </h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '14px', marginBottom: '32px' }}>
        {(members ?? []).map(m => (
          <div key={m.id} style={{ background: '#fff', borderRadius: '14px', padding: '20px', border: '1.5px solid #e5e7eb', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', overflow: 'hidden', background: '#f0f0f5', position: 'relative', flexShrink: 0 }}>
              {m.image_url
                ? <Image src={m.image_url} alt={m.name} fill style={{ objectFit: 'cover' }} unoptimized />
                : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>👤</div>
              }
            </div>
            <div>
              <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '15px', fontWeight: 700, color: '#0d1787', marginBottom: '2px' }}>{m.name}</p>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#6b7280' }}>{m.title}</p>
            </div>
            <form action={deleteMember}>
              <input type="hidden" name="id" value={m.id} />
              <button type="submit" style={{ padding: '6px 14px', borderRadius: '7px', border: '1.5px solid #fecaca', background: '#fff5f5', color: '#ef4444', fontFamily: 'Inter, sans-serif', fontSize: '12px', cursor: 'pointer' }}>
                Remove
              </button>
            </form>
          </div>
        ))}
      </div>

      <div style={{ background: '#fff', borderRadius: '14px', padding: '24px', border: '1.5px solid #e5e7eb', maxWidth: '600px' }}>
        <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '16px', fontWeight: 700, color: '#0d1787', marginBottom: '16px' }}>Add Member</h2>
        <form action={createMember} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#6b7280', fontFamily: 'Inter, sans-serif', marginBottom: '4px' }}>Name *</label>
              <input name="name" required style={{ border: '1.5px solid #e5e7eb', borderRadius: '8px', padding: '9px 12px', fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#111', outline: 'none', width: '100%', boxSizing: 'border-box' as const }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#6b7280', fontFamily: 'Inter, sans-serif', marginBottom: '4px' }}>Title *</label>
              <input name="title" required style={{ border: '1.5px solid #e5e7eb', borderRadius: '8px', padding: '9px 12px', fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#111', outline: 'none', width: '100%', boxSizing: 'border-box' as const }} />
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#6b7280', fontFamily: 'Inter, sans-serif', marginBottom: '4px' }}>Image URL</label>
              <input name="image_url" style={{ border: '1.5px solid #e5e7eb', borderRadius: '8px', padding: '9px 12px', fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#111', outline: 'none', width: '100%', boxSizing: 'border-box' as const }} placeholder="https://..." />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#6b7280', fontFamily: 'Inter, sans-serif', marginBottom: '4px' }}>Order</label>
              <input name="position" type="number" defaultValue={99} style={{ border: '1.5px solid #e5e7eb', borderRadius: '8px', padding: '9px 12px', fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#111', outline: 'none', width: '100%', boxSizing: 'border-box' as const }} />
            </div>
          </div>
          <button type="submit" style={{ padding: '10px 20px', borderRadius: '8px', border: 'none', background: '#1f2fe6', color: '#fff', fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: 500, cursor: 'pointer', alignSelf: 'flex-start' }}>
            Add Member
          </button>
        </form>
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Commit**

```bash
git add app/admin/stories/ app/admin/stats/ app/admin/team/
git commit -m "feat: admin stories, camp stats, and team members management"
```

---

## Task 9: Admin — Gallery management

**Files:**
- Create: `app/admin/gallery/page.tsx`
- Create: `app/admin/gallery/new/page.tsx`
- Create: `app/admin/gallery/[id]/page.tsx`

- [ ] **Step 1: Write gallery albums list**

`app/admin/gallery/page.tsx`:
```typescript
import { createClient } from '@/lib/supabase/server'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'

async function deleteAlbum(formData: FormData) {
  'use server'
  const supabase = await createClient()
  await supabase.from('gallery_albums').delete().eq('id', formData.get('id') as string)
  redirect('/admin/gallery')
}

export default async function AdminGalleryPage() {
  const supabase = await createClient()
  const { data: albums } = await supabase.from('gallery_albums').select('*').order('created_at', { ascending: false })

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '24px', fontWeight: 700, color: '#0d1787' }}>
          Gallery Albums
        </h1>
        <Link href="/admin/gallery/new" style={{ display: 'inline-block', padding: '10px 20px', borderRadius: '8px', background: '#1f2fe6', color: '#fff', fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: 500, textDecoration: 'none' }}>
          + New Album
        </Link>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
        {(albums ?? []).map(album => (
          <div key={album.id} style={{ background: '#fff', borderRadius: '14px', overflow: 'hidden', border: '1.5px solid #e5e7eb' }}>
            <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9' }}>
              <Image src={album.cover_image} alt={album.title} fill style={{ objectFit: 'cover' }} unoptimized />
            </div>
            <div style={{ padding: '16px' }}>
              <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '15px', fontWeight: 700, color: '#0d1787', marginBottom: '4px' }}>{album.title}</p>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#9ca3af', marginBottom: '12px' }}>{album.photo_count} photos · /{album.slug}</p>
              <div style={{ display: 'flex', gap: '8px' }}>
                <Link href={`/admin/gallery/${album.id}`} style={{ flex: 1, padding: '8px 0', borderRadius: '8px', border: '1.5px solid #e5e7eb', background: '#f9fafb', fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#374151', textDecoration: 'none', textAlign: 'center' }}>
                  Manage Photos
                </Link>
                <form action={deleteAlbum}>
                  <input type="hidden" name="id" value={album.id} />
                  <button type="submit" style={{ padding: '8px 14px', borderRadius: '8px', border: '1.5px solid #fecaca', background: '#fff5f5', color: '#ef4444', fontFamily: 'Inter, sans-serif', fontSize: '13px', cursor: 'pointer' }}>
                    Delete
                  </button>
                </form>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Write new album page**

`app/admin/gallery/new/page.tsx`:
```typescript
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

async function createAlbum(formData: FormData) {
  'use server'
  const supabase = await createClient()
  const { error } = await supabase.from('gallery_albums').insert({
    title: formData.get('title') as string,
    slug: (formData.get('slug') as string).toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
    cover_image: formData.get('cover_image') as string,
    photo_count: 0,
  })
  if (error) throw new Error(error.message)
  redirect('/admin/gallery')
}

const fieldStyle: React.CSSProperties = { border: '1.5px solid #e5e7eb', borderRadius: '8px', padding: '10px 14px', fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#111', outline: 'none', background: '#fff', width: '100%', boxSizing: 'border-box' }
const labelStyle: React.CSSProperties = { display: 'block', fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 500, color: '#374151', marginBottom: '6px' }

export default function NewAlbumPage() {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px' }}>
        <Link href="/admin/gallery" style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#6b7280', textDecoration: 'none' }}>← Back</Link>
        <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '22px', fontWeight: 700, color: '#0d1787' }}>New Album</h1>
      </div>
      <form action={createAlbum} style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '520px' }}>
        <div><label style={labelStyle}>Album title *</label><input name="title" required style={fieldStyle} /></div>
        <div><label style={labelStyle}>URL slug (auto-generated from title if blank)</label><input name="slug" style={fieldStyle} placeholder="e.g. camp-2026-highlights" /></div>
        <div><label style={labelStyle}>Cover image URL *</label><input name="cover_image" required style={fieldStyle} placeholder="https://..." /></div>
        <button type="submit" style={{ padding: '12px 24px', borderRadius: '8px', border: 'none', background: '#1f2fe6', color: '#fff', fontFamily: 'Inter, sans-serif', fontSize: '15px', fontWeight: 500, cursor: 'pointer', alignSelf: 'flex-start' }}>
          Create Album
        </button>
      </form>
    </div>
  )
}
```

- [ ] **Step 3: Write album detail / photo management page**

`app/admin/gallery/[id]/page.tsx`:
```typescript
import { createClient } from '@/lib/supabase/server'
import Image from 'next/image'
import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'

async function addPhoto(albumId: string, formData: FormData) {
  'use server'
  const supabase = await createClient()
  await supabase.from('gallery_photos').insert({
    album_id: albumId,
    src: formData.get('src') as string,
    alt: formData.get('alt') as string,
    aspect: formData.get('aspect') as 'portrait' | 'landscape',
    position: Number(formData.get('position') || 99),
  })
  // Update photo_count
  const { count } = await supabase.from('gallery_photos').select('*', { count: 'exact', head: true }).eq('album_id', albumId)
  await supabase.from('gallery_albums').update({ photo_count: count ?? 0 }).eq('id', albumId)
  redirect(`/admin/gallery/${albumId}`)
}

async function deletePhoto(formData: FormData) {
  'use server'
  const supabase = await createClient()
  const photoId = formData.get('photo_id') as string
  const albumId = formData.get('album_id') as string
  await supabase.from('gallery_photos').delete().eq('id', photoId)
  const { count } = await supabase.from('gallery_photos').select('*', { count: 'exact', head: true }).eq('album_id', albumId)
  await supabase.from('gallery_albums').update({ photo_count: count ?? 0 }).eq('id', albumId)
  redirect(`/admin/gallery/${albumId}`)
}

const fieldStyle: React.CSSProperties = { border: '1.5px solid #e5e7eb', borderRadius: '8px', padding: '8px 12px', fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#111', outline: 'none', background: '#fff', width: '100%', boxSizing: 'border-box' }

export default async function AlbumDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const { data: album } = await supabase.from('gallery_albums').select('*').eq('id', id).single()
  if (!album) notFound()
  const { data: photos } = await supabase.from('gallery_photos').select('*').eq('album_id', id).order('position')
  const addPhotoAction = addPhoto.bind(null, id)

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px' }}>
        <Link href="/admin/gallery" style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#6b7280', textDecoration: 'none' }}>← Back</Link>
        <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '22px', fontWeight: 700, color: '#0d1787' }}>{album.title}</h1>
      </div>

      {/* Photo grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '12px', marginBottom: '32px' }}>
        {(photos ?? []).map(photo => (
          <div key={photo.id} style={{ background: '#fff', borderRadius: '12px', overflow: 'hidden', border: '1.5px solid #e5e7eb' }}>
            <div style={{ position: 'relative', width: '100%', aspectRatio: photo.aspect === 'portrait' ? '2/3' : '3/2' }}>
              <Image src={photo.src} alt={photo.alt} fill style={{ objectFit: 'cover' }} unoptimized />
            </div>
            <div style={{ padding: '10px 12px' }}>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', color: '#9ca3af', marginBottom: '8px' }}>{photo.aspect} · pos {photo.position}</p>
              <form action={deletePhoto}>
                <input type="hidden" name="photo_id" value={photo.id} />
                <input type="hidden" name="album_id" value={id} />
                <button type="submit" style={{ padding: '5px 12px', borderRadius: '6px', border: '1.5px solid #fecaca', background: '#fff5f5', color: '#ef4444', fontFamily: 'Inter, sans-serif', fontSize: '12px', cursor: 'pointer' }}>
                  Delete
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>

      {/* Add photo form */}
      <div style={{ background: '#fff', borderRadius: '14px', padding: '24px', border: '1.5px solid #e5e7eb', maxWidth: '640px' }}>
        <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '16px', fontWeight: 700, color: '#0d1787', marginBottom: '16px' }}>Add Photo</h2>
        <form action={addPhotoAction} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div><label style={{ display: 'block', fontSize: '12px', color: '#6b7280', fontFamily: 'Inter, sans-serif', marginBottom: '4px' }}>Image URL *</label><input name="src" required style={fieldStyle} placeholder="https://..." /></div>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '12px' }}>
            <div><label style={{ display: 'block', fontSize: '12px', color: '#6b7280', fontFamily: 'Inter, sans-serif', marginBottom: '4px' }}>Alt text *</label><input name="alt" required style={fieldStyle} /></div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#6b7280', fontFamily: 'Inter, sans-serif', marginBottom: '4px' }}>Aspect</label>
              <select name="aspect" style={fieldStyle}>
                <option value="portrait">Portrait (2:3)</option>
                <option value="landscape">Landscape (3:2)</option>
              </select>
            </div>
            <div><label style={{ display: 'block', fontSize: '12px', color: '#6b7280', fontFamily: 'Inter, sans-serif', marginBottom: '4px' }}>Order</label><input name="position" type="number" defaultValue={99} style={fieldStyle} /></div>
          </div>
          <button type="submit" style={{ padding: '10px 20px', borderRadius: '8px', border: 'none', background: '#1f2fe6', color: '#fff', fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: 500, cursor: 'pointer', alignSelf: 'flex-start' }}>
            Add Photo
          </button>
        </form>
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Commit**

```bash
git add app/admin/gallery/
git commit -m "feat: admin gallery album and photo management"
```

---

## Task 10: Admin — Inbox (read-only submissions)

**Files:**
- Create: `app/admin/inbox/page.tsx`

- [ ] **Step 1: Write inbox page**

`app/admin/inbox/page.tsx`:
```typescript
import { createClient } from '@/lib/supabase/server'

export default async function AdminInboxPage() {
  const supabase = await createClient()
  const [
    { data: contacts },
    { data: subscribers },
    { data: enrollments },
  ] = await Promise.all([
    supabase.from('contact_submissions').select('*').order('created_at', { ascending: false }).limit(50),
    supabase.from('newsletter_subscribers').select('*').order('created_at', { ascending: false }).limit(100),
    supabase.from('enrollment_intakes').select('*').order('created_at', { ascending: false }).limit(50),
  ])

  const sectionTitle = (title: string) => (
    <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '18px', fontWeight: 700, color: '#0d1787', marginBottom: '16px', marginTop: '36px' }}>
      {title}
    </h2>
  )

  const cellStyle: React.CSSProperties = { padding: '12px 16px', fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#374151', borderBottom: '1px solid #f0f0f5', verticalAlign: 'top' }
  const headStyle: React.CSSProperties = { ...cellStyle, fontWeight: 600, color: '#6b7280', fontSize: '11px', textTransform: 'uppercase' as const, letterSpacing: '0.04em', background: '#f9fafb' }
  const tableStyle: React.CSSProperties = { width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: '12px', overflow: 'hidden', border: '1.5px solid #e5e7eb' }

  return (
    <div>
      <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '24px', fontWeight: 700, color: '#0d1787' }}>
        Inbox
      </h1>
      <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#6b7280', marginBottom: '4px' }}>
        All submissions from the public website — read only.
      </p>

      {sectionTitle(`Contact Messages (${contacts?.length ?? 0})`)}
      <table style={tableStyle}>
        <thead>
          <tr>
            {['Date', 'Name', 'Email', 'Phone', 'Message'].map(h => <th key={h} style={headStyle}>{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {(contacts ?? []).map(c => (
            <tr key={c.id}>
              <td style={cellStyle}>{new Date(c.created_at).toLocaleDateString()}</td>
              <td style={cellStyle}>{c.name}</td>
              <td style={cellStyle}><a href={`mailto:${c.email}`} style={{ color: '#1f2fe6', textDecoration: 'none' }}>{c.email}</a></td>
              <td style={cellStyle}>{c.phone || '—'}</td>
              <td style={{ ...cellStyle, maxWidth: '300px', whiteSpace: 'pre-wrap' }}>{c.message}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {sectionTitle(`Newsletter Subscribers (${subscribers?.length ?? 0})`)}
      <table style={tableStyle}>
        <thead>
          <tr>
            {['Date', 'Email'].map(h => <th key={h} style={headStyle}>{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {(subscribers ?? []).map(s => (
            <tr key={s.id}>
              <td style={cellStyle}>{new Date(s.created_at).toLocaleDateString()}</td>
              <td style={cellStyle}><a href={`mailto:${s.email}`} style={{ color: '#1f2fe6', textDecoration: 'none' }}>{s.email}</a></td>
            </tr>
          ))}
        </tbody>
      </table>

      {sectionTitle(`Enrollment Intakes (${enrollments?.length ?? 0})`)}
      <table style={tableStyle}>
        <thead>
          <tr>
            {['Date', 'Name', 'Age', 'Interest', 'Parent Email'].map(h => <th key={h} style={headStyle}>{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {(enrollments ?? []).map(e => (
            <tr key={e.id}>
              <td style={cellStyle}>{new Date(e.created_at).toLocaleDateString()}</td>
              <td style={cellStyle}>{e.name}</td>
              <td style={cellStyle}>{e.age}</td>
              <td style={cellStyle}>{e.interest}</td>
              <td style={cellStyle}><a href={`mailto:${e.parent_email}`} style={{ color: '#1f2fe6', textDecoration: 'none' }}>{e.parent_email}</a></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add app/admin/inbox/
git commit -m "feat: admin inbox for contact, newsletter, and enrollment submissions"
```

---

## Task 11: Server Actions for public form submissions

**Files:**
- Create: `app/actions/contact.ts`
- Create: `app/actions/newsletter.ts`
- Create: `app/actions/enrollment.ts`

- [ ] **Step 1: Write contact action**

`app/actions/contact.ts`:
```typescript
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
```

- [ ] **Step 2: Write newsletter action**

`app/actions/newsletter.ts`:
```typescript
'use server'

import { createClient } from '@/lib/supabase/server'

export async function submitNewsletter(email: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('newsletter_subscribers').insert({ email })
  if (error && error.code === '23505') return { success: true } // already subscribed
  if (error) return { success: false, error: error.message }
  return { success: true }
}
```

- [ ] **Step 3: Write enrollment action**

`app/actions/enrollment.ts`:
```typescript
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
```

- [ ] **Step 4: Commit**

```bash
git add app/actions/
git commit -m "feat: server actions for contact, newsletter, and enrollment submissions"
```

---

## Task 12: Wire Server Actions into public forms

**Files:**
- Modify: `components/contact/ContactForm.tsx`
- Modify: `components/camp-live/NewsletterSignup.tsx`
- Modify: `components/camp-live/EnrollmentBot.tsx`

- [ ] **Step 1: Update ContactForm to call submitContact**

In `components/contact/ContactForm.tsx`, replace the `handleSubmit` function:

```typescript
// Add import at top (after existing imports):
import { submitContact } from '@/app/actions/contact'

// Replace handleSubmit:
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  const fd = new FormData()
  fd.set('name', form.name)
  fd.set('email', form.email)
  fd.set('phone', form.phone)
  fd.set('message', form.message)
  fd.set('agreed', form.agreed ? 'on' : '')
  const result = await submitContact(fd)
  if (result.success) setSubmitted(true)
}
```

- [ ] **Step 2: Update NewsletterSignup to call submitNewsletter**

In `components/camp-live/NewsletterSignup.tsx`, replace `handleSubmit`:

```typescript
// Add import at top:
import { submitNewsletter } from '@/app/actions/newsletter'

// Replace handleSubmit:
async function handleSubmit(e: React.FormEvent) {
  e.preventDefault()
  if (!email.trim()) return
  await submitNewsletter(email.trim())
  setDone(true)
}
```

- [ ] **Step 3: Update EnrollmentBot to call submitEnrollment at the 'done' step**

In `components/camp-live/EnrollmentBot.tsx`, find the `'parent'` case in `handleSubmit` and update it:

```typescript
// Add import at top:
import { submitEnrollment } from '@/app/actions/enrollment'

// In the 'parent' case, replace the botSay call block with:
case 'parent':
  userSay(val)
  const intakeData = { ...data, parent_email: val }
  setData(d => ({ ...d, parent: val }))
  setStep('done')
  // Fire and forget — don't block the UI
  submitEnrollment({
    name: data.name,
    age: data.age,
    interest: data.interest,
    parent_email: val,
  })
  botSay(
    `Perfect! Here's a summary of your intake:\n\n👤 Name: ${data.name}\n📅 Age: ${data.age}\n⭐ Interest: ${data.interest}\n📧 Parent email: ${val}\n\nWe'll send full details to that email shortly. Welcome to the Boys Network family! 🙌`,
    800
  )
  break
```

- [ ] **Step 4: Build and verify no TypeScript errors**

```bash
npm run build
```

Expected: Build completes without errors.

- [ ] **Step 5: Commit**

```bash
git add components/contact/ContactForm.tsx components/camp-live/NewsletterSignup.tsx components/camp-live/EnrollmentBot.tsx
git commit -m "feat: wire contact, newsletter, and enrollment forms to Supabase"
```

---

## Task 13: Update public pages to read from Supabase

**Files:**
- Modify: `app/camp-live/page.tsx`
- Modify: `components/shared/MeetFounders.tsx`
- Modify: `app/gallery/page.tsx`
- Create: `app/gallery/[slug]/page.tsx`
- Delete: `app/gallery/the-inaugural-boys-network-camp-2025/page.tsx` (replaced by dynamic route)

- [ ] **Step 1: Convert camp-live page to read from Supabase**

Replace the hardcoded `stories`, `posts`, and `campStats` arrays at the top of `app/camp-live/page.tsx` with Supabase fetches. The page is a Server Component (no `'use client'`), so this works directly:

```typescript
// Remove the hardcoded stories, posts, campStats const arrays.
// Add at the top of CampLivePage function body (before return):

import { createClient } from '@/lib/supabase/server'

export default async function CampLivePage() {
  const supabase = await createClient()
  const [
    { data: stories },
    { data: posts },
    { data: campStats },
  ] = await Promise.all([
    supabase.from('stories').select('*').order('position'),
    supabase.from('posts').select('*').order('position'),
    supabase.from('camp_stats').select('*').order('position'),
  ])
  // ... rest of JSX unchanged, just replace references:
  // stories → (stories ?? [])
  // posts → (posts ?? [])
  // campStats → (campStats ?? [])
  // post.imageAspect → post.image_aspect
  // post.highlight → post.highlight_bg
  // story.live → story.is_live
  // post.live → post.is_live
  // post.avatar → post.avatar_url
```

Note: The DB column names differ slightly from the hardcoded object keys. The full mapping is:
- `post.imageAspect` → `post.image_aspect`
- `post.highlight` → `post.highlight_bg`  
- `post.avatar` → `post.avatar_url`
- `story.live` → `story.is_live`
- `post.live` → `post.is_live`

- [ ] **Step 2: Convert MeetFounders to fetch from Supabase**

`components/shared/MeetFounders.tsx` is a Server Component (no `'use client'`). Replace the hardcoded `founders` array:

```typescript
import { createClient } from '@/lib/supabase/server'

// Remove: const founders = [...]

export default async function MeetFounders({ heading = 'Meet the Founders' }: MeetFoundersProps) {
  const supabase = await createClient()
  const { data: founders } = await supabase
    .from('team_members')
    .select('*')
    .order('position')
  
  // Replace founder.image with founder.image_url in JSX
  // (founders ?? []).map(founder => ...)
```

- [ ] **Step 3: Convert gallery page to read from Supabase**

`app/gallery/page.tsx` — replace hardcoded `collections` array:

```typescript
import { createClient } from '@/lib/supabase/server'

// Remove: const collections = [...]

export default async function GalleryPage() {
  const supabase = await createClient()
  const { data: collections } = await supabase
    .from('gallery_albums')
    .select('*')
    .order('created_at', { ascending: false })
  // JSX unchanged — col.slug, col.coverImage, col.title, col.count
  // DB columns: col.slug ✓, col.cover_image (was coverImage), col.title ✓, col.photo_count (was count)
  // Update: col.coverImage → col.cover_image, col.count → col.photo_count
```

- [ ] **Step 4: Create dynamic gallery slug page**

Delete `app/gallery/the-inaugural-boys-network-camp-2025/page.tsx` and create `app/gallery/[slug]/page.tsx`:

```typescript
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import PageHero from '@/components/layout/PageHero'
import CTABanner from '@/components/shared/CTABanner'
import { StaggerGrid, StaggerItem } from '@/components/shared/Animate'
import { createClient } from '@/lib/supabase/server'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const supabase = await createClient()
  const { data: album } = await supabase.from('gallery_albums').select('*').eq('slug', slug).single()
  if (!album) return {}
  return {
    title: album.title,
    description: `Photos from the ${album.title} — Boys Network International`,
    alternates: { canonical: `https://boysnetworkinternational.com/gallery/${album.slug}` },
    openGraph: {
      title: `${album.title} | Gallery`,
      url: `https://boysnetworkinternational.com/gallery/${album.slug}`,
      images: [{ url: album.cover_image, width: 1200, height: 630, alt: album.title }],
    },
  }
}

export default async function GalleryAlbumPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const supabase = await createClient()
  const { data: album } = await supabase.from('gallery_albums').select('*').eq('slug', slug).single()
  if (!album) notFound()
  const { data: photos } = await supabase.from('gallery_photos').select('*').eq('album_id', album.id).order('position')

  return (
    <>
      <PageHero title={album.title} />
      <section style={{ background: '#ffffff', padding: '80px 0' }}>
        <div className="section-inner" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px' }}>
          <Link href="/gallery" className="inline-flex items-center gap-2 text-bni-blue text-sm font-medium mb-10 hover:opacity-70 transition-opacity" style={{ fontFamily: 'Inter, sans-serif' }}>
            ← Back to Gallery
          </Link>
          <StaggerGrid className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-5">
            {(photos ?? []).map((photo) => (
              <StaggerItem key={photo.id}>
                <div className="relative w-full overflow-hidden" style={{ borderRadius: '12px', aspectRatio: photo.aspect === 'portrait' ? '2/3' : '3/2' }}>
                  <Image src={photo.src} alt={photo.alt} fill className="object-cover object-top hover:scale-105 transition-transform duration-500" unoptimized />
                </div>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>
      <CTABanner />
    </>
  )
}
```

- [ ] **Step 5: Build and verify**

```bash
npm run build
```

Expected: Build completes. The old static slug page is gone; the dynamic one handles it.

- [ ] **Step 6: Commit**

```bash
git add app/camp-live/page.tsx components/shared/MeetFounders.tsx app/gallery/ 
git rm app/gallery/the-inaugural-boys-network-camp-2025/page.tsx
git commit -m "feat: update public pages to read from Supabase instead of hardcoded data"
```

---

## Task 14: Run SQL schema in Supabase & seed data

**Files:** (none — Supabase dashboard action)

- [ ] **Step 1: Run schema SQL**

In Supabase dashboard → SQL Editor → paste the full SQL from the "Supabase SQL Schema" section above → Run.

- [ ] **Step 2: Configure Google OAuth in Supabase**

1. Supabase dashboard → Authentication → Providers → Google
2. Enable Google provider
3. Add Client ID and Client Secret from Google Cloud Console
4. Copy the Callback URL shown in Supabase and add it to Google Cloud Console → Authorized redirect URIs
5. In Supabase → Authentication → URL Configuration: set Site URL to `http://localhost:3100` for local dev

- [ ] **Step 3: Seed gallery photos for inaugural album**

In Supabase SQL Editor, get the inaugural album ID:
```sql
select id from gallery_albums where slug = 'the-inaugural-boys-network-camp-2025';
```

Then insert the 12 photos (replace `<ALBUM_ID>` with actual UUID):
```sql
insert into gallery_photos (album_id, src, alt, aspect, position) values
  ('<ALBUM_ID>', 'https://framerusercontent.com/images/tHvY3AbJZ8zaSnRhxUWdzbSA4cY.jpg', 'Boys Network Camp 2025 — activity session', 'portrait', 0),
  ('<ALBUM_ID>', 'https://framerusercontent.com/images/23E8Glzn2lG32ufwoYudaeHWI2M.jpg', 'Boys Network Camp 2025 — mentorship moment', 'portrait', 1),
  ('<ALBUM_ID>', 'https://framerusercontent.com/images/FItTHEGhmchbftUSG01x7HznJQ.jpg', 'Boys Network Camp 2025 — leadership workshop', 'portrait', 2),
  ('<ALBUM_ID>', 'https://framerusercontent.com/images/6CNYl3k4sfCKAgpMNH3l0zQ6XQo.jpg', 'Boys Network Camp 2025 — group activity', 'landscape', 3),
  ('<ALBUM_ID>', 'https://framerusercontent.com/images/2hVv3DmxdxAfuR3ce5DxKlxry4o.jpg', 'Boys Network Camp 2025 — camp programme', 'portrait', 4),
  ('<ALBUM_ID>', 'https://framerusercontent.com/images/VrM5zXzaGHj1y4jxYG5JjfkgZc.jpg', 'Boys Network Camp 2025 — practical skills', 'portrait', 5),
  ('<ALBUM_ID>', 'https://framerusercontent.com/images/ugzMo1jx88Hsj49Qgi5SEuppg.jpg', 'Boys Network Camp 2025 — outdoor session', 'landscape', 6),
  ('<ALBUM_ID>', 'https://framerusercontent.com/images/YHnOeCG842ZFYULBtDXkOYTtKaA.jpg', 'Boys Network Camp 2025 — spiritual foundation', 'portrait', 7),
  ('<ALBUM_ID>', 'https://framerusercontent.com/images/UkulDs9QxnuajA52Ju4VjH61jk.jpg', 'Boys Network Camp 2025 — character formation', 'portrait', 8),
  ('<ALBUM_ID>', 'https://framerusercontent.com/images/2Oaz7IRaE7fcY5T2G8vQSGw4ueU.jpg', 'Boys Network Camp 2025 — holistic development', 'portrait', 9),
  ('<ALBUM_ID>', 'https://framerusercontent.com/images/A5LgDdUsG2rJSt74nFgiwqTqsM.jpg', 'Boys Network Camp 2025 — community engagement', 'landscape', 10),
  ('<ALBUM_ID>', 'https://framerusercontent.com/images/6mPfUJONO954I5liILa9tzMyP4.jpg', 'Boys Network Camp 2025 — camp highlights', 'portrait', 11);

-- Update photo count
update gallery_albums set photo_count = 12 where slug = 'the-inaugural-boys-network-camp-2025';
```

Also seed the Camp Live posts from the hardcoded data (run in SQL editor with similar INSERT statements for posts and stories).

- [ ] **Step 4: Verify end-to-end in browser**

1. Start dev server: `npm run dev`
2. Visit http://localhost:3100/camp-live — posts and stories should load from Supabase
3. Visit http://localhost:3100/gallery — album from Supabase
4. Visit http://localhost:3100/gallery/the-inaugural-boys-network-camp-2025 — photos from Supabase
5. Visit http://localhost:3100/admin — Google OAuth redirect → login → admin dashboard

---

## Task 15: Vercel environment variables + production deploy

**Files:** (Vercel dashboard configuration)

- [ ] **Step 1: Add env vars to Vercel**

In Vercel dashboard → Project → Settings → Environment Variables, add:
- `NEXT_PUBLIC_SUPABASE_URL` — your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — your Supabase anon key

Set for: Production, Preview, Development.

- [ ] **Step 2: Update Supabase redirect URLs for production**

In Supabase → Authentication → URL Configuration:
- Site URL: `https://boysnetworkinternational.com`
- Add Redirect URL: `https://boysnetworkinternational.com/admin`
- Add Redirect URL: `https://bni-website-jade.vercel.app/admin` (Vercel preview URL)

- [ ] **Step 3: Push to main and verify Vercel deployment**

```bash
git push origin main
```

Watch Vercel build logs. Verify production site loads camp-live, gallery, and admin correctly.

---

## Self-Review: Spec Coverage Check

| Requirement | Task |
|---|---|
| Supabase tables for all content types | SQL Schema section |
| Supabase Auth (Google OAuth) | Task 4, Task 14 |
| Middleware protects /admin/* | Task 3 |
| Admin login page | Task 4 |
| Admin layout shell | Task 5 |
| Dashboard with counts | Task 6 |
| Camp posts CRUD | Task 7 |
| Stories CRUD | Task 8 |
| Camp stats edit | Task 8 |
| Gallery albums + photos | Task 9 |
| Team members CRUD | Task 8 |
| Inbox (submissions view) | Task 10 |
| Contact form → Supabase | Task 11, 12 |
| Newsletter → Supabase | Task 11, 12 |
| Enrollment bot → Supabase | Task 11, 12 |
| Public pages read from DB | Task 13 |
| Production deploy | Task 15 |

No gaps found.
