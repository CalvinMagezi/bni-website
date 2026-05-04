import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/admin'

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      const forwardedHost = request.headers.get('x-forwarded-host')
      const forwardedProto = request.headers.get('x-forwarded-proto') ?? 'https'
      const isLocal = process.env.NODE_ENV === 'development'
      const target = isLocal
        ? `${origin}${next}`
        : forwardedHost
          ? `${forwardedProto}://${forwardedHost}${next}`
          : `${origin}${next}`
      return NextResponse.redirect(target)
    }
  }

  return NextResponse.redirect(`${origin}/admin/login?error=auth_callback_failed`)
}
