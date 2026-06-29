import { getYouTubeEmbedUrl } from '@/lib/youtube'

interface YouTubeEmbedProps {
  url: string
  title: string
  className?: string
}

export default function YouTubeEmbed({ url, title, className }: YouTubeEmbedProps) {
  const embedUrl = getYouTubeEmbedUrl(url)
  if (!embedUrl) return null

  return (
    <div
      className={className}
      style={{ position: 'relative', width: '100%', paddingBottom: '56.25%', borderRadius: '16px', overflow: 'hidden', background: '#000' }}
    >
      <iframe
        src={embedUrl}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }}
      />
    </div>
  )
}
