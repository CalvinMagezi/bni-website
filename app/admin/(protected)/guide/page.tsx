export const metadata = { title: 'User Guide' }

const sections = [
  {
    id: 'login',
    icon: '🔐',
    title: 'Signing In',
    color: '#0d1787',
    steps: [
      { label: 'Go to the admin URL', detail: 'Visit boysnetworkinternational.com/admin/login in your browser.' },
      { label: 'Click "Continue with Google"', detail: 'A Google sign-in popup will appear.' },
      { label: 'Choose your authorised account', detail: 'Only accounts on the BNI allowed list can access the panel. If you see "Access Denied", contact the site administrator.' },
      { label: 'You\'re in!', detail: 'You\'ll be taken to the Dashboard automatically.' },
    ],
  },
  {
    id: 'dashboard',
    icon: '📊',
    title: 'Dashboard',
    color: '#1f2fe6',
    steps: [
      { label: 'Overview cards', detail: 'See at a glance how many posts, stories, messages, subscribers and enrollments have been received.' },
      { label: '+ New Camp Post', detail: 'Click this blue card to jump straight to creating a new post for the Camp Live feed.' },
      { label: 'View Inbox', detail: 'Click here to see all contact messages, newsletter sign-ups, and enrollment requests.' },
      { label: 'Left sidebar', detail: 'Use the sidebar to navigate between all sections at any time.' },
    ],
  },
  {
    id: 'posts',
    icon: '📝',
    title: 'Camp Posts',
    color: '#7c3aed',
    steps: [
      { label: 'What are posts?', detail: 'Posts appear on the Camp Live page as the main feed — like a social media timeline. Parents see these to follow along with the bootcamp.' },
      { label: 'Creating a post', detail: 'Click "+ New Post". Fill in the Author, Role, and the post text. Optionally attach a photo URL. Set "Is Live?" to Yes when you\'re ready to publish.' },
      { label: 'Draft vs Live', detail: 'Live = No keeps the post hidden. Switch to Yes only when it\'s ready to go public. You can always edit it later.' },
      { label: 'Order of posts', detail: 'The "Position" number controls order. Use 0 for the newest post, 1 for the next, and so on.' },
      { label: 'Editing a post', detail: 'Click "Edit" on any post in the list to update the text, photo, or status.' },
      { label: 'Deleting a post', detail: 'Click "Delete" to permanently remove a post. This cannot be undone.' },
    ],
  },
  {
    id: 'stories',
    icon: '🎬',
    title: 'Stories',
    color: '#db2777',
    steps: [
      { label: 'What are stories?', detail: 'Stories are the circular photo bubbles at the top of the Camp Live page — like Instagram Stories. Each one shows a participant or highlight.' },
      { label: 'Adding a story', detail: 'Scroll to the "Add Story" form. Enter the person\'s name (Label), paste an image URL, choose whether it\'s Live, and click Add.' },
      { label: 'Live status', detail: 'A story with Live = Yes shows a red "LIVE" badge on the Camp Live page.' },
      { label: 'Deleting a story', detail: 'Click "Delete" next to any story to remove it immediately.' },
    ],
  },
  {
    id: 'stats',
    icon: '📈',
    title: 'Camp Stats',
    color: '#059669',
    steps: [
      { label: 'What are stats?', detail: 'The 4 key numbers shown in the Camp Live sidebar — e.g. "47 Boys Enrolled" or "Day 3 of Camp". These update live on the website.' },
      { label: 'Editing stats', detail: 'Click into any field — the emoji, the label text, or the value — and type your update.' },
      { label: 'Saving', detail: 'Click "Save All Stats" to apply all changes at once. Changes go live on the website immediately.' },
    ],
  },
  {
    id: 'gallery',
    icon: '🖼️',
    title: 'Gallery',
    color: '#d97706',
    steps: [
      { label: 'Albums', detail: 'The gallery is organised into albums (e.g. "Rise & Thrive 2024"). Each album has a cover photo and a collection of photos inside.' },
      { label: 'Creating an album', detail: 'Click "+ New Album". Enter a title, a URL-friendly slug (no spaces, e.g. rise-thrive-2024), and a cover image URL.' },
      { label: 'Adding photos', detail: 'Click "Manage Photos" on any album. Use the Add Photo form at the bottom — paste the image URL and a short description.' },
      { label: 'Deleting photos', detail: 'Click "Delete" next to any photo. The photo count updates automatically.' },
      { label: 'Deleting an album', detail: 'Click "Delete" on an album card. This removes the album and its public gallery page.' },
    ],
  },
  {
    id: 'team',
    icon: '👥',
    title: 'Team Members',
    color: '#0891b2',
    steps: [
      { label: 'What is this?', detail: 'Team members appear in the "Meet the Founders" section on the About page.' },
      { label: 'Adding a member', detail: 'Fill in their Name, Title/role, and optionally paste a headshot image URL. Set an Order number (lower = first).' },
      { label: 'Removing a member', detail: 'Click "Remove" on their card. They will no longer appear on the public site.' },
    ],
  },
  {
    id: 'inbox',
    icon: '📬',
    title: 'Inbox',
    color: '#dc2626',
    steps: [
      { label: 'Read-only', detail: 'The Inbox collects all form submissions from the public website. You cannot delete entries here.' },
      { label: 'Contact Messages', detail: 'Submitted via the Contact page. Click any email address to open a reply in your email app.' },
      { label: 'Newsletter Subscribers', detail: 'Email addresses collected from the newsletter signup on the website.' },
      { label: 'Enrollment Intakes', detail: 'Submitted via the Camp Live enrollment chatbot. Shows the child\'s name, age, interest, and parent email.' },
    ],
  },
]

export default function AdminGuidePage() {
  return (
    <div style={{ maxWidth: '800px' }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #0d1787, #070d4f)',
        borderRadius: '16px',
        padding: '32px 36px',
        marginBottom: '32px',
        color: '#fff',
      }}>
        <div style={{ fontSize: '36px', marginBottom: '12px' }}>📖</div>
        <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '26px', fontWeight: 700, marginBottom: '8px' }}>
          BNI Admin Panel — User Guide
        </h1>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '15px', color: 'rgba(255,255,255,0.75)', lineHeight: 1.6 }}>
          Everything you need to manage the Boys Network International website. No technical knowledge required.
        </p>
        <a
          href="/admin-guide.pdf"
          download
          style={{
            display: 'inline-block',
            marginTop: '20px',
            padding: '10px 20px',
            borderRadius: '8px',
            background: 'rgba(255,255,255,0.15)',
            border: '1px solid rgba(255,255,255,0.3)',
            color: '#fff',
            fontFamily: 'Inter, sans-serif',
            fontSize: '13px',
            fontWeight: 500,
            textDecoration: 'none',
          }}
        >
          ⬇ Download PDF Version
        </a>
      </div>

      {/* Quick nav */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '32px' }}>
        {sections.map(s => (
          <a
            key={s.id}
            href={`#${s.id}`}
            style={{
              padding: '6px 14px',
              borderRadius: '100px',
              background: '#fff',
              border: '1.5px solid #e5e7eb',
              fontFamily: 'Inter, sans-serif',
              fontSize: '13px',
              color: '#374151',
              textDecoration: 'none',
            }}
          >
            {s.icon} {s.title}
          </a>
        ))}
      </div>

      {/* Sections */}
      {sections.map((section, si) => (
        <div key={section.id} id={section.id} style={{ marginBottom: '28px' }}>
          <div style={{
            background: '#fff',
            borderRadius: '14px',
            border: '1.5px solid #e5e7eb',
            overflow: 'hidden',
          }}>
            {/* Section header */}
            <div style={{
              background: section.color,
              padding: '16px 24px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}>
              <span style={{ fontSize: '22px' }}>{section.icon}</span>
              <div>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', color: 'rgba(255,255,255,0.6)', marginBottom: '1px' }}>
                  SECTION {si + 1}
                </p>
                <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '18px', fontWeight: 700, color: '#fff' }}>
                  {section.title}
                </h2>
              </div>
            </div>

            {/* Steps */}
            <div style={{ padding: '8px 0' }}>
              {section.steps.map((step, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    gap: '16px',
                    padding: '16px 24px',
                    borderBottom: i < section.steps.length - 1 ? '1px solid #f3f4f6' : 'none',
                    alignItems: 'flex-start',
                  }}
                >
                  <div style={{
                    width: '26px',
                    height: '26px',
                    borderRadius: '50%',
                    background: section.color,
                    color: '#fff',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '12px',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    marginTop: '1px',
                  }}>
                    {i + 1}
                  </div>
                  <div>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: 600, color: '#111827', marginBottom: '3px' }}>
                      {step.label}
                    </p>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#6b7280', lineHeight: 1.6 }}>
                      {step.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}

      {/* Tips box */}
      <div style={{
        background: '#fffbeb',
        border: '1.5px solid #fde68a',
        borderRadius: '14px',
        padding: '24px',
        marginBottom: '28px',
      }}>
        <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '16px', fontWeight: 700, color: '#92400e', marginBottom: '14px' }}>
          💡 Helpful Tips
        </h3>
        {[
          ['Image URLs', 'The site uses image URLs instead of file uploads. To use a photo, upload it to Google Drive with public sharing and copy the direct link, or use any hosted image URL.'],
          ['Drafts vs Live', 'Always create posts as "Live = No" first. Review how they look, then switch to "Live = Yes" to publish. You can always switch back.'],
          ['Ordering content', 'The Position number controls what appears first. Position 0 = top. Position 99 = bottom. You can use any numbers you like.'],
          ['Nothing is instant except stats', 'Posts and stories only appear after you set them to Live. Camp Stats appear as soon as you click "Save All Stats".'],
          ['Can\'t undo deletes', 'Deletions are permanent. If you accidentally delete something, contact the site administrator to restore it from the database.'],
        ].map(([title, detail]) => (
          <div key={title} style={{ marginBottom: '12px', display: 'flex', gap: '12px' }}>
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 600, color: '#78350f', minWidth: '140px', paddingTop: '1px' }}>{title}</span>
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#78350f', lineHeight: 1.6 }}>{detail}</span>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div style={{ textAlign: 'center', padding: '20px 0 40px' }}>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#9ca3af' }}>
          BNI Admin Panel · User Guide · For internal use only
        </p>
      </div>
    </div>
  )
}
