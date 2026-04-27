'use client'

import { createClient } from '@/lib/supabase/client'

export default function AdminLoginPage() {
  async function signInWithGoogle() {
    const supabase = createClient()
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/admin` },
    })
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0d1787 0%, #070d4f 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div style={{
        background: '#ffffff',
        borderRadius: '20px',
        padding: '48px 40px',
        width: '100%',
        maxWidth: '400px',
        textAlign: 'center',
        boxShadow: '0 24px 64px rgba(7,13,79,0.3)',
      }}>
        <div style={{
          width: '56px',
          height: '56px',
          borderRadius: '14px',
          background: 'linear-gradient(135deg, #1f2fe6, #070d4f)',
          margin: '0 auto 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <path d="M14 4L20 10H17V18H11V10H8L14 4Z" fill="white"/>
            <rect x="8" y="20" width="12" height="2" rx="1" fill="white"/>
          </svg>
        </div>
        <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '22px', fontWeight: 700, color: '#0d1787', marginBottom: '8px' }}>
          BNI Admin
        </h1>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#6b7280', marginBottom: '32px' }}>
          Sign in with your authorised Google account to manage content.
        </p>
        <button
          onClick={signInWithGoogle}
          style={{
            width: '100%',
            padding: '14px 24px',
            borderRadius: '10px',
            border: '1.5px solid #e5e7eb',
            background: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            cursor: 'pointer',
            fontFamily: 'Inter, sans-serif',
            fontSize: '15px',
            fontWeight: 500,
            color: '#111827',
          }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20">
            <path d="M19.6 10.23c0-.68-.06-1.36-.17-2H10v3.8h5.4a4.6 4.6 0 0 1-2 3.02v2.5h3.24c1.9-1.75 3-4.33 3-7.32z" fill="#4285F4"/>
            <path d="M10 20c2.7 0 4.96-.9 6.62-2.44l-3.24-2.5c-.9.6-2.05.95-3.38.95-2.6 0-4.8-1.75-5.58-4.12H1.06v2.59A10 10 0 0 0 10 20z" fill="#34A853"/>
            <path d="M4.42 11.89A6 6 0 0 1 4.1 10c0-.66.12-1.3.32-1.89V5.52H1.06A10 10 0 0 0 0 10c0 1.61.38 3.13 1.06 4.48l3.36-2.59z" fill="#FBBC05"/>
            <path d="M10 3.98c1.47 0 2.78.5 3.82 1.5l2.86-2.86A9.97 9.97 0 0 0 10 0 10 10 0 0 0 1.06 5.52l3.36 2.59C5.2 5.73 7.4 3.98 10 3.98z" fill="#EA4335"/>
          </svg>
          Continue with Google
        </button>
      </div>
    </div>
  )
}
