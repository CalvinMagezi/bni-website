'use client'

import { useState, useTransition, useEffect } from 'react'
import { getCampSettings, saveCampSettings } from '@/app/actions/settings'

export default function SettingsPage() {
  const [settings, setSettings] = useState({ camp_date: '', camp_end_date: '', camp_name: '' })
  const [saved, setSaved] = useState(false)
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    getCampSettings().then(setSettings)
  }, [])

  function update(field: keyof typeof settings, value: string) {
    setSettings(s => ({ ...s, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    startTransition(async () => {
      await saveCampSettings(fd)
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    })
  }

  return (
    <div style={{ maxWidth: '640px' }}>
      <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '26px', fontWeight: 700, color: '#0d1787', marginBottom: '8px' }}>
        Camp Settings
      </h1>
      <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#6b7280', marginBottom: '32px' }}>
        Update camp dates and name — changes apply site-wide immediately.
      </p>

      <form onSubmit={handleSubmit}>
        <div style={{ background: '#ffffff', borderRadius: '14px', border: '1.5px solid #e5e7eb', padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div>
            <label style={{ display: 'block', fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>
              Camp Name
            </label>
            <input
              name="camp_name"
              value={settings.camp_name}
              onChange={e => update('camp_name', e.target.value)}
              placeholder="Rise & Thrive Bootcamp"
              style={{ width: '100%', border: '1.5px solid #e5e7eb', borderRadius: '8px', padding: '10px 14px', fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#1a1a2e', outline: 'none', boxSizing: 'border-box' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>
                Camp Start Date
              </label>
              <input
                name="camp_date"
                type="date"
                value={settings.camp_date}
                onChange={e => update('camp_date', e.target.value)}
                style={{ width: '100%', border: '1.5px solid #e5e7eb', borderRadius: '8px', padding: '10px 14px', fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#1a1a2e', outline: 'none', boxSizing: 'border-box' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>
                Camp End Date
              </label>
              <input
                name="camp_end_date"
                type="date"
                value={settings.camp_end_date}
                onChange={e => update('camp_end_date', e.target.value)}
                style={{ width: '100%', border: '1.5px solid #e5e7eb', borderRadius: '8px', padding: '10px 14px', fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#1a1a2e', outline: 'none', boxSizing: 'border-box' }}
              />
            </div>
          </div>

          <div style={{ paddingTop: '8px', borderTop: '1px solid #f3f4f6', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              type="submit"
              disabled={isPending}
              style={{
                background: isPending ? '#9ca3af' : '#1f2fe6',
                color: '#ffffff',
                border: 'none',
                borderRadius: '8px',
                padding: '10px 24px',
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: '14px',
                fontWeight: 700,
                cursor: isPending ? 'not-allowed' : 'pointer',
              }}
            >
              {isPending ? 'Saving…' : 'Save Settings'}
            </button>
            {saved && (
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#059669' }}>
                ✓ Saved successfully
              </span>
            )}
          </div>
        </div>
      </form>

      <div style={{ marginTop: '24px', background: '#fffbeb', border: '1.5px solid #fde68a', borderRadius: '12px', padding: '16px 20px' }}>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#92400e', margin: 0 }}>
          <strong>Note:</strong> The countdown timer on the homepage reads from these settings. After saving, the site automatically revalidates.
        </p>
      </div>
    </div>
  )
}
