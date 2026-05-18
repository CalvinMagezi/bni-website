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
alter table magazine_issues enable row level security;
alter table site_settings   enable row level security;

-- Allow anonymous INSERT (form submissions)
create policy if not exists "public insert enrollments"
  on enrollments for insert to anon with check (true);

create policy if not exists "public insert feedback"
  on camp_feedback for insert to anon with check (true);

-- Allow authenticated (admin) to read/write everything
create policy if not exists "admin all enrollments"
  on enrollments for all to authenticated using (true) with check (true);

create policy if not exists "admin all feedback"
  on camp_feedback for all to authenticated using (true) with check (true);

create policy if not exists "admin all magazine"
  on magazine_issues for all to authenticated using (true) with check (true);

create policy if not exists "admin all settings"
  on site_settings for all to authenticated using (true) with check (true);

-- Public read for magazine and settings (needed by the site)
create policy if not exists "public read magazine"
  on magazine_issues for select to anon using (true);

create policy if not exists "public read settings"
  on site_settings for select to anon using (true);
