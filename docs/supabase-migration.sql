-- Run this in the Supabase SQL Editor once the project is live.
-- All statements use IF NOT EXISTS so it's safe to re-run.

-- Full enrollment submissions (from the 4-step form)
create table if not exists enrollments (
  id uuid primary key default gen_random_uuid(),
  boy_name text not null,
  boy_age text,
  boy_dob text,
  school text,
  grade text,
  district text,
  interests text,
  dietary_needs text,
  medical_conditions text,
  can_swim boolean,
  parent_name text not null,
  relationship text,
  parent_phone text,
  parent_whatsapp text,
  parent_email text not null,
  emergency_name text,
  emergency_phone text,
  emergency_relationship text,
  photo_consent boolean not null default false,
  medical_consent boolean not null default false,
  rules_accepted boolean not null default false,
  terms_accepted boolean not null default false,
  payment_preference text,
  notes text,
  status text not null default 'pending',
  created_at timestamptz not null default now()
);

-- Post-camp feedback from parents
create table if not exists camp_feedback (
  id uuid primary key default gen_random_uuid(),
  parent_name text not null,
  parent_email text not null,
  son_name text not null,
  rating integer not null,
  improvements text,
  would_recommend boolean not null default true,
  comments text,
  created_at timestamptz not null default now()
);

-- Post-camp feedback from the campers themselves
create table if not exists camper_feedback (
  id uuid primary key default gen_random_uuid(),
  camper_name text not null,
  age text,
  rating integer not null,
  favorite_part text,
  improvements text,
  would_return boolean not null default true,
  comments text,
  created_at timestamptz not null default now()
);

-- Magazine/newsletter PDFs managed from admin
create table if not exists magazine_issues (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  issue_number text,
  description text,
  pdf_url text not null,
  cover_image_url text,
  published_date text,
  is_featured boolean not null default false,
  created_at timestamptz not null default now()
);

-- Partner organisations shown on the homepage
create table if not exists partners (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  logo_url text not null,
  website_url text,
  position int not null default 99,
  created_at timestamptz not null default now()
);

-- Hosted articles for the Resources hub
create table if not exists articles (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text,
  body text not null,
  cover_image_url text,
  published_date text,
  is_featured boolean not null default false,
  created_at timestamptz not null default now()
);

-- YouTube videos for the Resources hub
create table if not exists videos (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  youtube_url text not null,
  description text,
  thumbnail_url text,
  published_date text,
  position int not null default 99,
  is_featured boolean not null default false,
  created_at timestamptz not null default now()
);

-- Key/value settings editable from admin (camp dates, etc.)
create table if not exists site_settings (
  key text primary key,
  value text not null,
  updated_at timestamptz not null default now()
);

-- Seed default camp settings if not present
insert into site_settings (key, value)
values
  ('camp_date',     '2026-08-23'),
  ('camp_end_date', '2026-08-29'),
  ('camp_name',     'Rise & Thrive Bootcamp')
on conflict (key) do nothing;

-- RLS: admin reads all, public inserts only (enrollments, feedback, camp_feedback)
alter table enrollments     enable row level security;
alter table camp_feedback   enable row level security;
alter table camper_feedback enable row level security;
alter table magazine_issues enable row level security;
alter table partners        enable row level security;
alter table articles        enable row level security;
alter table videos          enable row level security;
alter table site_settings   enable row level security;

-- Allow anonymous INSERT (form submissions)
drop policy if exists "public insert enrollments" on enrollments;
create policy "public insert enrollments"
  on enrollments for insert to anon with check (true);

drop policy if exists "public insert feedback" on camp_feedback;
create policy "public insert feedback"
  on camp_feedback for insert to anon with check (true);

drop policy if exists "public insert camper feedback" on camper_feedback;
create policy "public insert camper feedback"
  on camper_feedback for insert to anon with check (true);

-- Allow authenticated (admin) to read/write everything
drop policy if exists "admin all enrollments" on enrollments;
create policy "admin all enrollments"
  on enrollments for all to authenticated using (true) with check (true);

drop policy if exists "admin all feedback" on camp_feedback;
create policy "admin all feedback"
  on camp_feedback for all to authenticated using (true) with check (true);

drop policy if exists "admin all camper feedback" on camper_feedback;
create policy "admin all camper feedback"
  on camper_feedback for all to authenticated using (true) with check (true);

drop policy if exists "admin all magazine" on magazine_issues;
create policy "admin all magazine"
  on magazine_issues for all to authenticated using (true) with check (true);

drop policy if exists "admin all partners" on partners;
create policy "admin all partners"
  on partners for all to authenticated using (true) with check (true);

drop policy if exists "admin all articles" on articles;
create policy "admin all articles"
  on articles for all to authenticated using (true) with check (true);

drop policy if exists "admin all videos" on videos;
create policy "admin all videos"
  on videos for all to authenticated using (true) with check (true);

drop policy if exists "admin all settings" on site_settings;
create policy "admin all settings"
  on site_settings for all to authenticated using (true) with check (true);

-- Public read for magazine and settings (needed by the site)
drop policy if exists "public read magazine" on magazine_issues;
create policy "public read magazine"
  on magazine_issues for select to anon using (true);

drop policy if exists "public read partners" on partners;
create policy "public read partners"
  on partners for select to anon using (true);

drop policy if exists "public read articles" on articles;
create policy "public read articles"
  on articles for select to anon using (true);

drop policy if exists "public read videos" on videos;
create policy "public read videos"
  on videos for select to anon using (true);

drop policy if exists "public read settings" on site_settings;
create policy "public read settings"
  on site_settings for select to anon using (true);

-- Seed default partners (safe to re-run)
insert into partners (name, logo_url, website_url, position)
select 'Partner Organisation', 'https://framerusercontent.com/images/y9Lt3M9oqgQXMYtQiFooT0GYDgg.png', null, 1
where not exists (select 1 from partners where name = 'Partner Organisation');

insert into partners (name, logo_url, website_url, position)
select 'Case Hospital', 'https://casemedservices.org/casemedcare/wp-content/uploads/sites/10/2021/02/caselogo.png', 'https://casemedservices.org/casemedcare/', 2
where not exists (select 1 from partners where name = 'Case Hospital');

insert into partners (name, logo_url, website_url, position)
select 'Mt. Horeb International School', 'https://mthoreb-ics.com/wp-content/uploads/2025/01/MT-HOREB-ICS-LOGO-FC.pdf.jpg', 'https://mthoreb-ics.com/', 3
where not exists (select 1 from partners where name = 'Mt. Horeb International School');
