import type { Metadata } from 'next'
import { Suspense } from 'react'
import { createClient } from '@/lib/supabase/server'
import PageHero from '@/components/layout/PageHero'
import ResourcesTabs from '@/components/resources/ResourcesTabs'

export const metadata: Metadata = {
  title: 'Resources',
  description: 'Magazine issues, articles, and videos from The Boys Network International community.',
  alternates: { canonical: 'https://boysnetworkinternational.com/resources' },
}

export const dynamic = 'force-dynamic'

export default async function ResourcesPage() {
  const supabase = await createClient()

  const [{ data: issues }, { data: articles }, { data: videos }] = await Promise.all([
    supabase
      .from('magazine_issues')
      .select('id, title, issue_number, description, cover_image_url, published_date, is_featured')
      .order('published_date', { ascending: false }),
    supabase
      .from('articles')
      .select('id, title, slug, excerpt, cover_image_url, published_date, is_featured')
      .order('published_date', { ascending: false }),
    supabase
      .from('videos')
      .select('id, title, youtube_url, description, thumbnail_url, published_date, is_featured')
      .order('position', { ascending: true }),
  ])

  return (
    <>
      <PageHero
        title="Resources"
        subtitle="Magazine issues, articles, and videos from The Boys Network International community"
      />

      <section style={{ background: '#f8f9fb', padding: '64px 0 80px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px' }}>
          <Suspense fallback={<div style={{ fontFamily: 'Inter, sans-serif', color: '#6b7280' }}>Loading resources…</div>}>
            <ResourcesTabs
              issues={issues ?? []}
              articles={articles ?? []}
              videos={videos ?? []}
            />
          </Suspense>
        </div>
      </section>
    </>
  )
}
