export function parseYouTubeVideoId(url: string): string | null {
  try {
    const parsed = new URL(url.trim())
    const host = parsed.hostname.replace(/^www\./, '')

    if (host === 'youtu.be') {
      const id = parsed.pathname.slice(1).split('/')[0]
      return id || null
    }

    if (host === 'youtube.com' || host === 'm.youtube.com') {
      if (parsed.pathname === '/watch') {
        return parsed.searchParams.get('v')
      }
      const embedMatch = parsed.pathname.match(/^\/embed\/([^/?]+)/)
      if (embedMatch?.[1]) return embedMatch[1]
      const shortsMatch = parsed.pathname.match(/^\/shorts\/([^/?]+)/)
      if (shortsMatch?.[1]) return shortsMatch[1]
    }
  } catch {
    return null
  }

  return null
}

export function getYouTubeEmbedUrl(url: string): string | null {
  const id = parseYouTubeVideoId(url)
  return id ? `https://www.youtube.com/embed/${id}` : null
}

export function getYouTubeThumbnailUrl(url: string): string | null {
  const id = parseYouTubeVideoId(url)
  return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : null
}
