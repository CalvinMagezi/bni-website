'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import EmptyState from '@/components/shared/EmptyState'
import YouTubeEmbed from '@/components/resources/YouTubeEmbed'

type MagazineIssue = {
  id: string
  title: string
  issue_number: string | null
  description: string | null
  cover_image_url: string | null
  published_date: string | null
  is_featured: boolean
}

type Article = {
  id: string
  title: string
  slug: string
  excerpt: string | null
  cover_image_url: string | null
  published_date: string | null
  is_featured: boolean
}

type Video = {
  id: string
  title: string
  youtube_url: string
  description: string | null
  thumbnail_url: string | null
  published_date: string | null
  is_featured: boolean
}

const TABS = [
  { id: 'magazine', label: 'Magazine' },
  { id: 'articles', label: 'Articles' },
  { id: 'videos', label: 'Videos' },
] as const

type TabId = (typeof TABS)[number]['id']

function formatDate(date: string | null) {
  if (!date) return null
  return new Date(date).toLocaleDateString('en-GB', { month: 'long', year: 'numeric', day: 'numeric' })
}

function MagazineSection({ issues }: { issues: MagazineIssue[] }) {
  const featured = issues.find(i => i.is_featured) ?? issues[0]
  const rest = issues.filter(i => i.id !== featured?.id)

  if (issues.length === 0) {
    return (
      <EmptyState
        icon="📖"
        title="No magazine issues yet"
        description="Our first magazine issue is on its way. Check back soon for stories and updates from the TBNI community."
      />
    )
  }

  return (
    <>
      {featured && (
        <div style={{ marginBottom: '48px' }}>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', fontWeight: 600, color: '#1f2fe6', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '16px' }}>
            Latest Issue
          </p>
          <Link href={`/magazine/${featured.id}`} style={{ textDecoration: 'none' }}>
            <div style={{
              background: 'linear-gradient(135deg, #070d4f 0%, #1f2fe6 100%)',
              borderRadius: '24px',
              overflow: 'hidden',
              display: 'grid',
              gridTemplateColumns: featured.cover_image_url ? '1fr 1fr' : '1fr',
            }}>
              <div style={{ padding: 'clamp(32px, 5vw, 56px)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                {featured.issue_number && (
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: 'rgba(255,255,255,0.85)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '12px' }}>
                    Issue #{featured.issue_number}
                  </span>
                )}
                <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(22px, 4vw, 34px)', fontWeight: 800, color: '#ffffff', lineHeight: 1.15, marginBottom: '12px' }}>
                  {featured.title}
                </h2>
                {featured.description && (
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '15px', color: 'rgba(255,255,255,0.75)', lineHeight: 1.65, marginBottom: '24px' }}>
                    {featured.description}
                  </p>
                )}
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.15)', color: '#ffffff', borderRadius: '100px', padding: '10px 20px', fontFamily: 'Space Grotesk, sans-serif', fontSize: '14px', fontWeight: 700, width: 'fit-content' }}>
                  Read Now →
                </span>
              </div>
              {featured.cover_image_url && (
                <div style={{ position: 'relative', minHeight: '280px' }}>
                  <img src={featured.cover_image_url} alt={featured.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                </div>
              )}
            </div>
          </Link>
        </div>
      )}

      {rest.length > 0 && (
        <>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '20px' }}>
            All Issues
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px' }}>
            {rest.map(issue => (
              <Link key={issue.id} href={`/magazine/${issue.id}`} style={{ textDecoration: 'none' }}>
                <div style={{ background: '#ffffff', borderRadius: '16px', border: '1.5px solid #e5e7eb', overflow: 'hidden' }}>
                  {issue.cover_image_url ? (
                    <img src={issue.cover_image_url} alt={issue.title} style={{ width: '100%', aspectRatio: '3/4', objectFit: 'cover', display: 'block' }} />
                  ) : (
                    <div style={{ width: '100%', aspectRatio: '3/4', background: 'linear-gradient(135deg, #070d4f, #1f2fe6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px' }}>
                      📖
                    </div>
                  )}
                  <div style={{ padding: '16px' }}>
                    {issue.issue_number && (
                      <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', color: '#9ca3af', margin: '0 0 4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Issue #{issue.issue_number}
                      </p>
                    )}
                    <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '14px', fontWeight: 700, color: '#0d1787', margin: '0 0 4px', lineHeight: 1.3 }}>
                      {issue.title}
                    </p>
                    {issue.published_date && (
                      <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#9ca3af', margin: 0 }}>
                        {formatDate(issue.published_date)}
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </>
  )
}

function ArticlesSection({ articles }: { articles: Article[] }) {
  const featured = articles.find(a => a.is_featured) ?? articles[0]
  const rest = articles.filter(a => a.id !== featured?.id)

  if (articles.length === 0) {
    return (
      <EmptyState
        icon="📝"
        title="No articles yet"
        description="Articles and stories from the TBNI community will appear here soon."
      />
    )
  }

  return (
    <>
      {featured && (
        <div style={{ marginBottom: '48px' }}>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', fontWeight: 600, color: '#1f2fe6', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '16px' }}>
            Featured Article
          </p>
          <Link href={`/resources/articles/${featured.slug}`} style={{ textDecoration: 'none' }}>
            <div style={{
              background: '#ffffff',
              borderRadius: '24px',
              border: '1.5px solid #e5e7eb',
              overflow: 'hidden',
              display: 'grid',
              gridTemplateColumns: featured.cover_image_url ? '1fr 1fr' : '1fr',
            }}>
              <div style={{ padding: 'clamp(32px, 5vw, 48px)' }}>
                <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(22px, 4vw, 32px)', fontWeight: 800, color: '#0d1787', lineHeight: 1.2, marginBottom: '12px' }}>
                  {featured.title}
                </h2>
                {featured.excerpt && (
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '15px', color: '#6b7280', lineHeight: 1.65, marginBottom: '16px' }}>
                    {featured.excerpt}
                  </p>
                )}
                {featured.published_date && (
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#9ca3af', marginBottom: '16px' }}>
                    {formatDate(featured.published_date)}
                  </p>
                )}
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#1f2fe6', color: '#ffffff', borderRadius: '100px', padding: '10px 20px', fontFamily: 'Space Grotesk, sans-serif', fontSize: '14px', fontWeight: 700 }}>
                  Read Article →
                </span>
              </div>
              {featured.cover_image_url && (
                <img src={featured.cover_image_url} alt={featured.title} style={{ width: '100%', minHeight: '240px', objectFit: 'cover' }} />
              )}
            </div>
          </Link>
        </div>
      )}

      {rest.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
          {rest.map(article => (
            <Link key={article.id} href={`/resources/articles/${article.slug}`} style={{ textDecoration: 'none' }}>
              <div style={{ background: '#ffffff', borderRadius: '16px', border: '1.5px solid #e5e7eb', overflow: 'hidden', height: '100%' }}>
                {article.cover_image_url ? (
                  <img src={article.cover_image_url} alt={article.title} style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover', display: 'block' }} />
                ) : (
                  <div style={{ width: '100%', aspectRatio: '16/9', background: 'linear-gradient(135deg, #070d4f, #1f2fe6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '36px' }}>
                    📝
                  </div>
                )}
                <div style={{ padding: '16px' }}>
                  <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '15px', fontWeight: 700, color: '#0d1787', margin: '0 0 8px', lineHeight: 1.3 }}>
                    {article.title}
                  </p>
                  {article.excerpt && (
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#6b7280', margin: '0 0 8px', lineHeight: 1.5 }}>
                      {article.excerpt}
                    </p>
                  )}
                  {article.published_date && (
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#9ca3af', margin: 0 }}>
                      {formatDate(article.published_date)}
                    </p>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  )
}

function VideosSection({ videos }: { videos: Video[] }) {
  const featured = videos.find(v => v.is_featured) ?? videos[0]
  const rest = videos.filter(v => v.id !== featured?.id)

  if (videos.length === 0) {
    return (
      <EmptyState
        icon="▶️"
        title="No videos yet"
        description="YouTube videos from the TBNI community will appear here soon."
      />
    )
  }

  return (
    <>
      {featured && (
        <div style={{ marginBottom: '48px' }}>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', fontWeight: 600, color: '#1f2fe6', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '16px' }}>
            Featured Video
          </p>
          <div style={{ background: '#ffffff', borderRadius: '24px', border: '1.5px solid #e5e7eb', padding: '24px' }}>
            <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(20px, 3vw, 28px)', fontWeight: 800, color: '#0d1787', marginBottom: '8px' }}>
              {featured.title}
            </h2>
            {featured.description && (
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#6b7280', marginBottom: '16px', lineHeight: 1.6 }}>
                {featured.description}
              </p>
            )}
            <YouTubeEmbed url={featured.youtube_url} title={featured.title} />
          </div>
        </div>
      )}

      {rest.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
          {rest.map(video => (
              <div key={video.id} style={{ background: '#ffffff', borderRadius: '16px', border: '1.5px solid #e5e7eb', overflow: 'hidden' }}>
                <YouTubeEmbed url={video.youtube_url} title={video.title} />
                <div style={{ padding: '16px' }}>
                  <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '15px', fontWeight: 700, color: '#0d1787', margin: '0 0 8px' }}>
                    {video.title}
                  </p>
                  {video.description && (
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#6b7280', margin: 0, lineHeight: 1.5 }}>
                      {video.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
        </div>
      )}
    </>
  )
}

interface ResourcesTabsProps {
  issues: MagazineIssue[]
  articles: Article[]
  videos: Video[]
}

export default function ResourcesTabs({ issues, articles, videos }: ResourcesTabsProps) {
  const searchParams = useSearchParams()
  const tabParam = searchParams.get('tab')
  const activeTab: TabId = TABS.some(t => t.id === tabParam) ? (tabParam as TabId) : 'magazine'

  return (
    <>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '40px' }}>
        {TABS.map(tab => {
          const isActive = activeTab === tab.id
          return (
            <Link
              key={tab.id}
              href={`/resources?tab=${tab.id}`}
              style={{
                padding: '10px 20px',
                borderRadius: '100px',
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: '14px',
                fontWeight: 700,
                textDecoration: 'none',
                background: isActive ? '#1f2fe6' : '#ffffff',
                color: isActive ? '#ffffff' : '#374151',
                border: isActive ? '1.5px solid #1f2fe6' : '1.5px solid #e5e7eb',
              }}
            >
              {tab.label}
            </Link>
          )
        })}
      </div>

      {activeTab === 'magazine' && <MagazineSection issues={issues} />}
      {activeTab === 'articles' && <ArticlesSection articles={articles} />}
      {activeTab === 'videos' && <VideosSection videos={videos} />}
    </>
  )
}
