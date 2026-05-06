import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'

interface Props {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const supabase = await createClient()
  const { data } = await supabase.from('magazine_issues').select('title, description').eq('id', id).single()
  if (!data) return { title: 'Magazine' }
  return {
    title: data.title,
    description: data.description ?? 'Read the TBNI Magazine',
  }
}

export const dynamic = 'force-dynamic'

export default async function MagazineIssuePage({ params }: Props) {
  const { id } = await params
  const supabase = await createClient()
  const { data: issue } = await supabase
    .from('magazine_issues')
    .select('*')
    .eq('id', id)
    .single()

  if (!issue) notFound()

  return (
    <>
      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #070d4f 0%, #1f2fe6 100%)', paddingTop: '100px', paddingBottom: '40px' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto', padding: '0 24px' }}>
          <Link
            href="/magazine"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'rgba(255,255,255,0.7)', fontFamily: 'Inter, sans-serif', fontSize: '13px', textDecoration: 'none', marginBottom: '20px' }}
          >
            ← All Issues
          </Link>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '24px', flexWrap: 'wrap' }}>
            {issue.cover_image_url && (
              <img
                src={issue.cover_image_url}
                alt={issue.title}
                style={{ width: '80px', height: '104px', objectFit: 'cover', borderRadius: '8px', boxShadow: '0 8px 32px rgba(0,0,0,0.3)' }}
              />
            )}
            <div>
              {issue.issue_number && (
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px' }}>
                  Issue #{issue.issue_number}
                  {issue.published_date && ` · ${new Date(issue.published_date).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}`}
                </p>
              )}
              <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(22px, 5vw, 34px)', fontWeight: 800, color: '#ffffff', lineHeight: 1.15, margin: 0 }}>
                {issue.title}
              </h1>
              {issue.description && (
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '15px', color: 'rgba(255,255,255,0.75)', marginTop: '8px', lineHeight: 1.6 }}>
                  {issue.description}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* PDF Viewer */}
      <div style={{ background: '#1a1a1a', minHeight: '80vh', padding: '24px' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <iframe
            src={`${issue.pdf_url}#toolbar=1&navpanes=0&scrollbar=1`}
            style={{ width: '100%', height: '85vh', border: 'none', borderRadius: '8px', background: '#ffffff' }}
            title={issue.title}
          />
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <a
              href={issue.pdf_url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.1)', color: '#ffffff', borderRadius: '100px', padding: '10px 24px', fontFamily: 'Space Grotesk, sans-serif', fontSize: '14px', fontWeight: 700, textDecoration: 'none' }}
            >
              ↗ Open Full PDF
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
