import type { Metadata } from 'next'
import Image from 'next/image'
import { FadeUp, FadeIn, StaggerGrid, StaggerItem } from '@/components/shared/Animate'
import NewsletterSignup from '@/components/camp-live/NewsletterSignup'
import FloatingEnrollmentBot from '@/components/camp-live/FloatingEnrollmentBot'
import CTABanner from '@/components/shared/CTABanner'
import { createClient } from '@/lib/supabase/server'

export const metadata: Metadata = {
  title: 'Camp Live Hub',
  description: 'Real-time stories, updates and highlights from the Boys Network International Rise & Thrive Bootcamp — for parents, supporters, and the BNI community.',
  alternates: { canonical: 'https://boysnetworkinternational.com/camp-live' },
  openGraph: {
    title: 'Camp Live Hub | Boys Network International',
    description: 'Real-time stories, updates and highlights from the Rise & Thrive Bootcamp.',
    url: 'https://boysnetworkinternational.com/camp-live',
    images: [{ url: 'https://framerusercontent.com/images/zNckLAoaorpjAkb2LSzjVcez7A.jpg', width: 1200, height: 630, alt: 'Boys Network International Rise & Thrive Bootcamp' }],
  },
}

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

  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────── */}
      <section
        className="camp-live-hero"
        style={{
          background: 'linear-gradient(135deg, #0d1787 0%, #070d4f 100%)',
          paddingTop: '120px',
          paddingBottom: '56px',
        }}
      >
        <div className="section-inner" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px' }}>
          <FadeUp>
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span
                className="flex items-center gap-2 text-white text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full"
                style={{ background: '#ef4444', fontFamily: 'Inter, sans-serif' }}
              >
                <span className="inline-block w-2 h-2 rounded-full bg-white animate-pulse" />
                Live Now
              </span>
              <span className="text-white/50 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                Rise &amp; Thrive Bootcamp 2026
              </span>
            </div>
            <h1
              className="text-white font-bold leading-tight mb-3"
              style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(2rem, 4vw, 3rem)' }}
            >
              Camp Live Hub
            </h1>
            <p className="text-white/70 text-base max-w-xl" style={{ fontFamily: 'Inter, sans-serif' }}>
              Real-time stories, updates and highlights from the camp floor — for parents, supporters, and the BNI community.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ── STORIES ROW ───────────────────────────────────────── */}
      <section style={{ background: '#fafafa', borderBottom: '1px solid #f0f0f5', padding: '24px 0' }}>
        <div className="section-inner" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px' }}>
          <div className="scrollbar-hide flex gap-4 sm:gap-6 overflow-x-auto pb-1">
            {(stories ?? []).map((story) => (
              <div key={story.label} className="flex flex-col items-center gap-2 shrink-0 cursor-pointer group">
                {/* Ring */}
                <div
                  style={{
                    padding: '2.5px',
                    borderRadius: '50%',
                    background: story.is_live
                      ? 'linear-gradient(135deg, #ef4444, #f97316)'
                      : 'linear-gradient(135deg, #1f2fe6, #070d4f)',
                  }}
                >
                  <div
                    className="relative overflow-hidden"
                    style={{
                      width: 62,
                      height: 62,
                      borderRadius: '50%',
                      border: '2.5px solid #fafafa',
                    }}
                  >
                    <Image
                      src={story.image_url}
                      alt={story.label}
                      fill
                      className="object-cover object-top group-hover:scale-110 transition-transform duration-300"
                      unoptimized
                    />
                  </div>
                </div>
                <span
                  className="text-xs text-center"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    color: '#515c63',
                    maxWidth: 68,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {story.label}
                </span>
                {story.is_live && (
                  <span
                    className="text-xs font-bold -mt-1"
                    style={{ color: '#ef4444', fontFamily: 'Inter, sans-serif', fontSize: 10 }}
                  >
                    LIVE
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MAIN CONTENT ──────────────────────────────────────── */}
      <section style={{ background: '#f5f5f8', padding: '48px 0 96px' }}>
        <div className="section-inner" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px' }}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {/* ── FEED (2 cols wide) ─────────────────────────── */}
            <div className="md:col-span-2 flex flex-col gap-5 md:gap-7">
              {(posts ?? []).map((post, i) => (
                <FadeUp key={post.id} delay={i * 0.05}>
                  <article
                    style={{
                      background: post.highlight_bg ?? '#ffffff',
                      borderRadius: '24px',
                      overflow: 'hidden',
                      boxShadow: '0 4px 24px rgba(7,13,79,0.08)',
                      border: '1px solid rgba(0,0,0,0.05)',
                    }}
                  >
                    {/* ── Header ── */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '28px 32px 20px' }}>
                      {/* Avatar */}
                      <div
                        style={{
                          position: 'relative',
                          flexShrink: 0,
                          overflow: 'hidden',
                          width: 52,
                          height: 52,
                          borderRadius: '50%',
                          background: '#e8eaf0',
                          boxShadow: '0 0 0 3px #f0f0f5',
                        }}
                      >
                        {post.avatar_url ? (
                          <Image src={post.avatar_url} alt={post.author} fill className="object-cover object-top" unoptimized />
                        ) : (
                          <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', fontSize: 22 }}>
                            {post.avatar_emoji}
                          </span>
                        )}
                      </div>

                      {/* Name + meta */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '1rem', color: '#070d4f', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {post.author}
                        </p>
                        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#adbeca', marginTop: '4px' }}>
                          {post.role} · {post.time_label}
                        </p>
                      </div>

                      {/* LIVE badge */}
                      {post.is_live && (
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 700, padding: '6px 12px', borderRadius: '100px', background: '#fef2f2', color: '#ef4444', fontFamily: 'Inter, sans-serif', letterSpacing: '0.05em', flexShrink: 0 }}>
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                          LIVE
                        </span>
                      )}
                    </div>

                    {/* ── Caption ── */}
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '15px', lineHeight: 1.65, color: '#2d2d3e', padding: post.image_url ? '0 32px 24px' : '0 32px 28px' }}>
                      {post.text}
                    </p>

                    {/* ── Media ── */}
                    {post.image_url && (
                      <div style={{ padding: '0 24px 24px' }}>
                        <div
                          style={{
                            position: 'relative',
                            width: '100%',
                            overflow: 'hidden',
                            borderRadius: '16px',
                            aspectRatio: post.image_aspect === 'portrait' ? '4/5' : '16/9',
                          }}
                        >
                          <Image
                            src={post.image_url}
                            alt={`Camp photo by ${post.author}`}
                            fill
                            className="object-cover object-top"
                            unoptimized
                          />
                        </div>
                      </div>
                    )}

                    {/* ── Reactions ── */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 32px 20px', borderTop: '1px solid #f0f0f5' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                        {[
                          { emoji: '🔥', count: post.reactions?.fire },
                          { emoji: '❤️', count: post.reactions?.heart },
                          { emoji: '👏', count: post.reactions?.clap },
                        ].map(({ emoji, count }) => (
                          <button
                            key={emoji}
                            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#515c63', background: 'none', border: 'none', cursor: 'pointer', opacity: 1 }}
                          >
                            {emoji} <span>{count}</span>
                          </button>
                        ))}
                      </div>
                      <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#adbeca' }}>
                        💬 {post.comments} comments
                      </span>
                    </div>
                  </article>
                </FadeUp>
              ))}
            </div>

            {/* ── SIDEBAR ───────────────────────────────────── */}
            <div className="flex flex-col gap-6">

              {/* Live stats */}
              <FadeUp delay={0.1}>
                <div
                  className="sidebar-card"
                  style={{
                    background: '#ffffff',
                    borderRadius: '20px',
                    padding: '24px',
                    boxShadow: '0 2px 16px rgba(7,13,79,0.06)',
                    border: '1px solid rgba(0,0,0,0.04)',
                  }}
                >
                  <div className="flex items-center gap-2 mb-5">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    <p className="font-bold text-sm" style={{ fontFamily: 'Space Grotesk, sans-serif', color: '#070d4f' }}>
                      Live Camp Stats
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-2">
                    {(campStats ?? []).map((stat) => (
                      <div
                        key={stat.label}
                        className="flex flex-col items-center justify-center text-center p-4"
                        style={{ background: '#f5f5f8', borderRadius: '14px' }}
                      >
                        <span className="text-2xl mb-1.5">{stat.icon}</span>
                        <p className="font-bold text-lg leading-none" style={{ fontFamily: 'Space Grotesk, sans-serif', color: '#070d4f' }}>
                          {stat.value}
                        </p>
                        <p className="text-xs mt-1" style={{ fontFamily: 'Inter, sans-serif', color: '#adbeca' }}>
                          {stat.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeUp>

              {/* Newsletter */}
              <FadeUp delay={0.15}>
                <NewsletterSignup />
              </FadeUp>

              {/* Quick enroll CTA */}
              <FadeUp delay={0.2}>
                <div
                  className="sidebar-card"
                  style={{
                    background: '#ffffff',
                    borderRadius: '20px',
                    padding: '24px',
                    boxShadow: '0 2px 16px rgba(7,13,79,0.06)',
                    border: '1px solid rgba(0,0,0,0.04)',
                  }}
                >
                  <p className="font-bold mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif', color: '#070d4f', fontSize: '1rem' }}>
                    🏕️ Enroll for 2026
                  </p>
                  <p className="text-sm mb-5 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif', color: '#515c63' }}>
                    Spots are filling fast. Secure your boy's place at the next Rise &amp; Thrive Bootcamp.
                  </p>
                  <a
                    href="https://wa.me/256757026880?text=Hi%2C%20I%27d%20like%20to%20enroll%20my%20son%20in%20the%20Rise%20%26%20Thrive%20Bootcamp"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center text-white text-sm font-bold py-3 rounded-full hover:opacity-90 transition-opacity"
                    style={{ background: 'linear-gradient(135deg, #1f2fe6, #070d4f)', fontFamily: 'Space Grotesk, sans-serif' }}
                  >
                    Start Enrollment →
                  </a>
                </div>
              </FadeUp>

              {/* Enrollment bot hint */}
              <FadeUp delay={0.25}>
                <div
                  className="flex items-center gap-3 p-4"
                  style={{
                    background: 'linear-gradient(135deg, #eef0fd, #f0f0ff)',
                    borderRadius: '16px',
                    border: '1px solid rgba(31,47,230,0.1)',
                  }}
                >
                  <span style={{ fontSize: 28 }}>🏕️</span>
                  <div>
                    <p className="text-sm font-bold" style={{ fontFamily: 'Space Grotesk, sans-serif', color: '#070d4f' }}>
                      Chat to Enroll
                    </p>
                    <p className="text-xs mt-0.5" style={{ fontFamily: 'Inter, sans-serif', color: '#515c63' }}>
                      Use the chat button in the bottom-left corner
                    </p>
                  </div>
                </div>
              </FadeUp>

            </div>

          </div>
        </div>
      </section>

      <CTABanner />

      {/* Floating enrollment chatbot */}
      <FloatingEnrollmentBot />
    </>
  )
}
