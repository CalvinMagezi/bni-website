import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const supabase = await createClient()
  const { data } = await supabase.from('articles').select('title, excerpt').eq('slug', slug).single()
  if (!data) return { title: 'Article' }
  return {
    title: data.title,
    description: data.excerpt ?? 'Read this article from The Boys Network International.',
  }
}

export const dynamic = 'force-dynamic'

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  const supabase = await createClient()
  const { data: article } = await supabase.from('articles').select('*').eq('slug', slug).single()

  if (!article) notFound()

  return (
    <>
      <div style={{ background: 'linear-gradient(135deg, #070d4f 0%, #1f2fe6 100%)', paddingTop: '100px', paddingBottom: '48px' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto', padding: '0 24px' }}>
          <Link
            href="/resources?tab=articles"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'rgba(255,255,255,0.7)', fontFamily: 'Inter, sans-serif', fontSize: '13px', textDecoration: 'none', marginBottom: '20px' }}
          >
            ← All Articles
          </Link>
          {article.published_date && (
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: 'rgba(255,255,255,0.65)', marginBottom: '12px' }}>
              {new Date(article.published_date).toLocaleDateString('en-GB', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
          )}
          <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(28px, 5vw, 42px)', fontWeight: 800, color: '#ffffff', lineHeight: 1.15, marginBottom: '12px' }}>
            {article.title}
          </h1>
          {article.excerpt && (
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', color: 'rgba(255,255,255,0.8)', lineHeight: 1.65 }}>
              {article.excerpt}
            </p>
          )}
        </div>
      </div>

      {article.cover_image_url && (
        <div style={{ maxWidth: '960px', margin: '-32px auto 0', padding: '0 24px' }}>
          <img
            src={article.cover_image_url}
            alt={article.title}
            style={{ width: '100%', maxHeight: '420px', objectFit: 'cover', borderRadius: '16px', boxShadow: '0 16px 48px rgba(0,0,0,0.15)' }}
          />
        </div>
      )}

      <article style={{ maxWidth: '760px', margin: '0 auto', padding: '48px 24px 80px' }}>
        <div
          className="article-body"
          style={{ fontFamily: 'Inter, sans-serif', fontSize: '17px', lineHeight: 1.75, color: '#374151' }}
        >
          <ReactMarkdown>{article.body}</ReactMarkdown>
        </div>
      </article>
    </>
  )
}
