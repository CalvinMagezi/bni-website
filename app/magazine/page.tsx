import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import PageHero from '@/components/layout/PageHero'

export const metadata: Metadata = {
  title: 'TBNI Magazine',
  description: 'Read the Boys Network International magazine — stories, updates, and inspiration from the BNI community.',
  alternates: { canonical: 'https://boysnetworkinternational.com/magazine' },
}

export const dynamic = 'force-dynamic'

export default async function MagazinePage() {
  const supabase = await createClient()
  const { data: issues } = await supabase
    .from('magazine_issues')
    .select('id, title, issue_number, description, cover_image_url, published_date, is_featured')
    .order('published_date', { ascending: false })

  const rows = issues ?? []
  const featured = rows.find(r => r.is_featured) ?? rows[0]
  const rest = rows.filter(r => r.id !== featured?.id)

  return (
    <>
      <PageHero
        title="TBNI Magazine"
        subtitle="Stories, inspiration, and updates from the Boys Network community"
      />

      <section style={{ background: '#f8f9fb', padding: '64px 0 80px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px' }}>

          {rows.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 0' }}>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', color: '#9ca3af' }}>
                No magazine issues published yet. Check back soon!
              </p>
            </div>
          ) : (
            <>
              {/* Featured issue */}
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
                          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '12px' }}>
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
                          <img
                            src={featured.cover_image_url}
                            alt={featured.title}
                            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                          />
                        </div>
                      )}
                    </div>
                  </Link>
                </div>
              )}

              {/* Archive grid */}
              {rest.length > 0 && (
                <>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '20px' }}>
                    All Issues
                  </p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px' }}>
                    {rest.map(issue => (
                      <Link key={issue.id} href={`/magazine/${issue.id}`} style={{ textDecoration: 'none' }}>
                        <div style={{ background: '#ffffff', borderRadius: '16px', border: '1.5px solid #e5e7eb', overflow: 'hidden', transition: 'box-shadow 0.2s', cursor: 'pointer' }}>
                          {issue.cover_image_url ? (
                            <img
                              src={issue.cover_image_url}
                              alt={issue.title}
                              style={{ width: '100%', aspectRatio: '3/4', objectFit: 'cover', display: 'block' }}
                            />
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
                                {new Date(issue.published_date).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}
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
          )}
        </div>
      </section>
    </>
  )
}
