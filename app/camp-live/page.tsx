import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import CTABanner from '@/components/shared/CTABanner'
import { FadeUp, FadeIn, StaggerGrid, StaggerItem } from '@/components/shared/Animate'
import NewsletterSignup from '@/components/camp-live/NewsletterSignup'
import EnrollmentBot from '@/components/camp-live/EnrollmentBot'

export const metadata: Metadata = {
  title: 'Camp Live | The Boys Network',
  description: 'Real-time updates, stories and highlights from the Boys Network International Rise & Thrive Bootcamp.',
}

// ── Stories ──────────────────────────────────────────────────────
const stories = [
  { label: 'Bryan M.', image: 'https://framerusercontent.com/images/5v7dGA4WDpwIeNXkE4HwYyfNjcE.jpg', live: true },
  { label: 'Alyce K.', image: 'https://framerusercontent.com/images/Mpfb4UC3smoeX6ukSqlYGSZvt2g.jpg', live: false },
  { label: 'Day 3', image: 'https://framerusercontent.com/images/tHvY3AbJZ8zaSnRhxUWdzbSA4cY.jpg', live: true },
  { label: 'Skills', image: 'https://framerusercontent.com/images/23E8Glzn2lG32ufwoYudaeHWI2M.jpg', live: false },
  { label: 'Devotion', image: 'https://framerusercontent.com/images/YHnOeCG842ZFYULBtDXkOYTtKaA.jpg', live: false },
  { label: 'Sports', image: 'https://framerusercontent.com/images/VrM5zXzaGHj1y4jxYG5JjfkgZc.jpg', live: false },
  { label: 'Sam M.', image: 'https://framerusercontent.com/images/xFGs0HH0etkFYMRyCi2kYJSgyE.jpg', live: false },
]

// ── Feed posts ────────────────────────────────────────────────────
const posts = [
  {
    id: 1,
    author: 'Bryan Muwonge',
    role: 'Founder & Lead Mentor',
    avatar: 'https://framerusercontent.com/images/5v7dGA4WDpwIeNXkE4HwYyfNjcE.jpg',
    time: 'Just now',
    live: true,
    text: "🔴 We are LIVE from Day 3 of the Rise & Thrive Bootcamp! The energy in this room is absolutely electric. These boys are transforming right before our eyes. Swipe to see this morning's highlights 👇",
    image: 'https://framerusercontent.com/images/zNckLAoaorpjAkb2LSzjVcez7A.jpg',
    imageAspect: 'landscape',
    reactions: { fire: 42, heart: 31, clap: 19 },
    comments: 8,
  },
  {
    id: 2,
    author: 'Camp Updates',
    role: 'Official BNI Account',
    avatar: 'https://framerusercontent.com/images/Bzl1MQ2nbPIpGlSNl4HuF8ffMyE.png',
    time: '1h ago',
    live: false,
    text: "📢 Parents Visiting Day is this Saturday, 10am – 2pm at the campsite. Please bring a valid ID. Boys will be presenting projects they've built during the week — you won't want to miss it!",
    image: null,
    imageAspect: null,
    highlight: '#fffbeb',
    reactions: { fire: 12, heart: 58, clap: 34 },
    comments: 14,
  },
  {
    id: 3,
    author: 'Alyce Kampire Muwonge',
    role: 'Co-Founder',
    avatar: 'https://framerusercontent.com/images/Mpfb4UC3smoeX6ukSqlYGSZvt2g.jpg',
    time: '2h ago',
    live: false,
    text: "Morning devotions just wrapped up. Watching these boys open their Bibles and lead each other in prayer is exactly why we started this. Proverbs 22:6 is coming alive this week 🙏✨",
    image: 'https://framerusercontent.com/images/tHvY3AbJZ8zaSnRhxUWdzbSA4cY.jpg',
    imageAspect: 'portrait',
    reactions: { fire: 28, heart: 91, clap: 44 },
    comments: 21,
  },
  {
    id: 4,
    author: 'Skills Workshop',
    role: 'Camp Activity',
    avatar: null,
    avatarEmoji: '🔨',
    time: '4h ago',
    live: false,
    text: "Carpentry, cooking, financial literacy — our boys are getting their hands dirty and their minds sharp. Today's practical skills session had every single participant fully engaged. This is holistic development in action.",
    image: 'https://framerusercontent.com/images/23E8Glzn2lG32ufwoYudaeHWI2M.jpg',
    imageAspect: 'portrait',
    reactions: { fire: 67, heart: 43, clap: 55 },
    comments: 11,
  },
  {
    id: 5,
    author: 'Pastor Sam Muyinda',
    role: 'Co-Founder & Spiritual Director',
    avatar: 'https://framerusercontent.com/images/xFGs0HH0etkFYMRyCi2kYJSgyE.jpg',
    time: 'Yesterday',
    live: false,
    text: "Day 2 recap: Leadership session today was powerful. Each boy was asked to stand up and describe one quality of a great leader. The answers we heard were beyond their years. The next generation of leaders is rising 🦁",
    image: 'https://framerusercontent.com/images/FItTHEGhmchbftUSG01x7HznJQ.jpg',
    imageAspect: 'portrait',
    reactions: { fire: 38, heart: 72, clap: 29 },
    comments: 16,
  },
]

// ── Stats ─────────────────────────────────────────────────────────
const campStats = [
  { label: 'Boys Enrolled', value: '150', icon: '👦' },
  { label: 'Days Running', value: '3 / 7', icon: '📅' },
  { label: 'Mentors On-Site', value: '12', icon: '👨‍🏫' },
  { label: 'Activities Today', value: '6', icon: '⚡' },
]

export default function CampLivePage() {
  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────── */}
      <section
        style={{
          background: 'linear-gradient(135deg, #0d1787 0%, #070d4f 100%)',
          paddingTop: '120px',
          paddingBottom: '48px',
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
      <section style={{ background: '#fafafa', borderBottom: '1px solid #f0f0f5', padding: '20px 0' }}>
        <div className="section-inner" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px' }}>
          <div className="flex gap-5 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
            {stories.map((story) => (
              <div key={story.label} className="flex flex-col items-center gap-2 shrink-0 cursor-pointer group">
                {/* Ring */}
                <div
                  style={{
                    padding: '2.5px',
                    borderRadius: '50%',
                    background: story.live
                      ? 'linear-gradient(135deg, #ef4444, #f97316)'
                      : 'linear-gradient(135deg, #1f2fe6, #070d4f)',
                  }}
                >
                  <div
                    className="relative overflow-hidden"
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: '50%',
                      border: '2px solid #fafafa',
                    }}
                  >
                    <Image
                      src={story.image}
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
                {story.live && (
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
      <section style={{ background: '#f5f5f8', padding: '40px 0 80px' }}>
        <div className="section-inner" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px' }}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* ── FEED (2 cols wide) ─────────────────────────── */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              {posts.map((post, i) => (
                <FadeUp key={post.id} delay={i * 0.05}>
                  <article
                    style={{
                      background: post.highlight ?? '#ffffff',
                      borderRadius: '20px',
                      overflow: 'hidden',
                      boxShadow: '0 2px 16px rgba(7,13,79,0.06)',
                      border: '1px solid rgba(0,0,0,0.04)',
                    }}
                  >
                    {/* Post header */}
                    <div className="flex items-center gap-3 p-4 pb-3">
                      {/* Avatar */}
                      <div
                        className="relative shrink-0 overflow-hidden"
                        style={{ width: 44, height: 44, borderRadius: '50%', background: '#e8eaf0' }}
                      >
                        {post.avatar ? (
                          <Image src={post.avatar} alt={post.author} fill className="object-cover object-top" unoptimized />
                        ) : (
                          <span className="flex items-center justify-center w-full h-full text-xl">{post.avatarEmoji}</span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-sm truncate" style={{ fontFamily: 'Space Grotesk, sans-serif', color: '#070d4f' }}>
                          {post.author}
                        </p>
                        <p className="text-xs" style={{ fontFamily: 'Inter, sans-serif', color: '#adbeca' }}>
                          {post.role} · {post.time}
                        </p>
                      </div>
                      {post.live && (
                        <span
                          className="flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full shrink-0"
                          style={{ background: '#fef2f2', color: '#ef4444', fontFamily: 'Inter, sans-serif' }}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                          LIVE
                        </span>
                      )}
                    </div>

                    {/* Caption */}
                    <p
                      className="px-4 pb-3 text-sm leading-relaxed"
                      style={{ fontFamily: 'Inter, sans-serif', color: '#2d2d3e' }}
                    >
                      {post.text}
                    </p>

                    {/* Media */}
                    {post.image && (
                      <div
                        className="relative w-full overflow-hidden mx-0"
                        style={{ aspectRatio: post.imageAspect === 'portrait' ? '4/5' : '16/9' }}
                      >
                        <Image
                          src={post.image}
                          alt={`Camp photo by ${post.author}`}
                          fill
                          className="object-cover object-top"
                          unoptimized
                        />
                      </div>
                    )}

                    {/* Reactions */}
                    <div className="flex items-center justify-between px-4 py-3">
                      <div className="flex items-center gap-4">
                        <button className="flex items-center gap-1.5 text-sm hover:opacity-70 transition-opacity" style={{ fontFamily: 'Inter, sans-serif', color: '#515c63', background: 'none', border: 'none', cursor: 'pointer' }}>
                          🔥 <span>{post.reactions.fire}</span>
                        </button>
                        <button className="flex items-center gap-1.5 text-sm hover:opacity-70 transition-opacity" style={{ fontFamily: 'Inter, sans-serif', color: '#515c63', background: 'none', border: 'none', cursor: 'pointer' }}>
                          ❤️ <span>{post.reactions.heart}</span>
                        </button>
                        <button className="flex items-center gap-1.5 text-sm hover:opacity-70 transition-opacity" style={{ fontFamily: 'Inter, sans-serif', color: '#515c63', background: 'none', border: 'none', cursor: 'pointer' }}>
                          👏 <span>{post.reactions.clap}</span>
                        </button>
                      </div>
                      <span className="text-xs" style={{ fontFamily: 'Inter, sans-serif', color: '#adbeca' }}>
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
                  style={{
                    background: '#ffffff',
                    borderRadius: '20px',
                    padding: '20px',
                    boxShadow: '0 2px 16px rgba(7,13,79,0.06)',
                    border: '1px solid rgba(0,0,0,0.04)',
                  }}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <span
                      className="w-2 h-2 rounded-full bg-red-500 animate-pulse"
                    />
                    <p className="font-bold text-sm" style={{ fontFamily: 'Space Grotesk, sans-serif', color: '#070d4f' }}>
                      Live Camp Stats
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {campStats.map((stat) => (
                      <div
                        key={stat.label}
                        className="flex flex-col items-center justify-center text-center p-3"
                        style={{ background: '#f5f5f8', borderRadius: '12px' }}
                      >
                        <span className="text-xl mb-1">{stat.icon}</span>
                        <p className="font-bold text-lg leading-none" style={{ fontFamily: 'Space Grotesk, sans-serif', color: '#070d4f' }}>
                          {stat.value}
                        </p>
                        <p className="text-xs mt-0.5" style={{ fontFamily: 'Inter, sans-serif', color: '#adbeca' }}>
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
                  style={{
                    background: '#ffffff',
                    borderRadius: '20px',
                    padding: '20px',
                    boxShadow: '0 2px 16px rgba(7,13,79,0.06)',
                    border: '1px solid rgba(0,0,0,0.04)',
                  }}
                >
                  <p className="font-bold mb-1" style={{ fontFamily: 'Space Grotesk, sans-serif', color: '#070d4f', fontSize: '1rem' }}>
                    🏕️ Enroll for 2026
                  </p>
                  <p className="text-sm mb-4" style={{ fontFamily: 'Inter, sans-serif', color: '#515c63' }}>
                    Spots are filling fast. Secure your boy's place at the next Rise & Thrive Bootcamp.
                  </p>
                  <Link
                    href="#enrollment"
                    className="block text-center text-white text-sm font-bold py-3 rounded-full hover:opacity-90 transition-opacity"
                    style={{ background: 'linear-gradient(135deg, #1f2fe6, #070d4f)', fontFamily: 'Space Grotesk, sans-serif' }}
                  >
                    Start Enrollment →
                  </Link>
                </div>
              </FadeUp>
            </div>

          </div>
        </div>
      </section>

      {/* ── ENROLLMENT BOT ────────────────────────────────────── */}
      <section id="enrollment" style={{ background: '#ffffff', padding: '80px 0' }}>
        <div className="section-inner" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px' }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left — copy */}
            <FadeUp>
              <p
                className="text-xs font-bold uppercase tracking-widest mb-3"
                style={{ fontFamily: 'Inter, sans-serif', color: '#1f2fe6' }}
              >
                Automated Enrollment
              </p>
              <h2
                className="font-bold leading-tight mb-5"
                style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', color: '#070d4f' }}
              >
                Register in Under 2 Minutes
              </h2>
              <p className="text-base leading-relaxed mb-6" style={{ fontFamily: 'Inter, sans-serif', color: '#515c63' }}>
                Our enrollment assistant collects your details, matches your interest area to the right programme, and passes everything to our team — before you even fill out the formal registration form.
              </p>
              <ul className="flex flex-col gap-3">
                {[
                  'No long forms — just a quick conversation',
                  'Your interest area matched to the right track',
                  'Parent notified instantly via email',
                  'Team follows up within 24 hours',
                ].map(item => (
                  <li key={item} className="flex items-start gap-3 text-sm" style={{ fontFamily: 'Inter, sans-serif', color: '#515c63' }}>
                    <span className="text-bni-blue font-bold shrink-0 mt-0.5">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </FadeUp>

            {/* Right — bot */}
            <FadeUp delay={0.15}>
              <EnrollmentBot />
            </FadeUp>
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  )
}
