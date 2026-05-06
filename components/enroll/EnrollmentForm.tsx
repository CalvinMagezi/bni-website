'use client'

import { useState, useEffect } from 'react'
import { submitFullEnrollment } from '@/app/actions/enrollment-full'

const INTEREST_OPTIONS = [
  'Spiritual Growth',
  'Leadership Development',
  'Practical Skills',
  'Sports & Fitness',
  'Economic Empowerment',
]

const RELATIONSHIP_OPTIONS = ['Mother', 'Father', 'Guardian', 'Grandparent', 'Other']
const PAYMENT_OPTIONS = [
  { id: 'mtn', label: 'MTN MoMo', detail: '*165*3# · Merchant Code 657538' },
  { id: 'airtel', label: 'Airtel Money', detail: '*185*9# · Merchant Code 4395441' },
  { id: 'bank', label: 'Bank Transfer', detail: 'Absa Bank · BNINT (U) Limited · 6009569136' },
]

type FormData = {
  boy_name: string; boy_age: string; boy_dob: string; school: string; grade: string; district: string
  interests: string[]; dietary_needs: string; medical_conditions: string; can_swim: string
  parent_name: string; relationship: string; parent_phone: string; parent_whatsapp: string
  parent_email: string; emergency_name: string; emergency_phone: string; emergency_relationship: string
  photo_consent: boolean; medical_consent: boolean; rules_accepted: boolean; terms_accepted: boolean
  payment_preference: string; notes: string
}

const empty: FormData = {
  boy_name: '', boy_age: '', boy_dob: '', school: '', grade: '', district: '',
  interests: [], dietary_needs: '', medical_conditions: '', can_swim: '',
  parent_name: '', relationship: '', parent_phone: '', parent_whatsapp: '', parent_email: '',
  emergency_name: '', emergency_phone: '', emergency_relationship: '',
  photo_consent: false, medical_consent: false, rules_accepted: false, terms_accepted: false,
  payment_preference: '', notes: '',
}

const inputStyle: React.CSSProperties = {
  width: '100%', border: '1.5px solid #e5e7eb', borderRadius: '10px',
  padding: '11px 14px', fontFamily: 'Inter, sans-serif', fontSize: '14px',
  color: '#1a1a2e', outline: 'none', background: '#ffffff',
}

const labelStyle: React.CSSProperties = {
  fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 600,
  color: '#374151', marginBottom: '6px', display: 'block',
}

const STEPS = ['Boy\'s Details', 'Preferences & Health', 'Parent / Guardian', 'Consent & Submit']

function ProgressBar({ step }: { step: number }) {
  return (
    <div style={{ marginBottom: '32px' }}>
      <div className="flex items-center justify-between mb-3">
        {STEPS.map((label, i) => (
          <div key={label} className="flex flex-col items-center flex-1">
            <div
              className="flex items-center justify-center text-xs font-bold mb-1.5"
              style={{
                width: 32, height: 32, borderRadius: '50%',
                background: i + 1 <= step ? 'linear-gradient(135deg, #1f2fe6, #070d4f)' : '#f0f0f5',
                color: i + 1 <= step ? '#fff' : '#adbeca',
                fontFamily: 'Space Grotesk, sans-serif',
                flexShrink: 0,
              }}
            >
              {i + 1 < step ? '✓' : i + 1}
            </div>
            <span
              className="text-center hidden sm:block"
              style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', color: i + 1 === step ? '#070d4f' : '#adbeca', fontWeight: i + 1 === step ? 700 : 400, maxWidth: 72 }}
            >
              {label}
            </span>
          </div>
        ))}
      </div>
      <div style={{ height: 4, borderRadius: 99, background: '#f0f0f5', overflow: 'hidden' }}>
        <div style={{ height: '100%', borderRadius: 99, background: 'linear-gradient(90deg, #1f2fe6, #070d4f)', width: `${((step - 1) / (STEPS.length - 1)) * 100}%`, transition: 'width 0.4s ease' }} />
      </div>
    </div>
  )
}

export default function EnrollmentForm({ prefill }: { prefill?: Partial<FormData> }) {
  const [step, setStep] = useState(1)
  const [data, setData] = useState<FormData>({ ...empty, ...prefill })
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')

  function set(field: keyof FormData, value: FormData[keyof FormData]) {
    setData(d => ({ ...d, [field]: value }))
  }

  function toggleInterest(opt: string) {
    setData(d => ({
      ...d,
      interests: d.interests.includes(opt) ? d.interests.filter(i => i !== opt) : [...d.interests, opt],
    }))
  }

  async function handleSubmit() {
    setSubmitting(true)
    setError('')
    const result = await submitFullEnrollment({
      ...data,
      interests: data.interests.join(', '),
      can_swim: data.can_swim === 'yes' ? true : data.can_swim === 'no' ? false : null,
    })
    setSubmitting(false)
    if (result.success) setDone(true)
    else setError(result.error ?? 'Something went wrong. Please try again.')
  }

  if (done) {
    return (
      <div className="text-center py-16 flex flex-col items-center gap-6">
        <div style={{ fontSize: 56 }}>🎉</div>
        <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.75rem', fontWeight: 700, color: '#070d4f' }}>
          Enrollment Received!
        </h2>
        <p style={{ fontFamily: 'Inter, sans-serif', color: '#515c63', maxWidth: 480, lineHeight: 1.7 }}>
          Thank you, <strong>{data.parent_name}</strong>! We&apos;ve received {data.boy_name}&apos;s enrollment for the Rise & Thrive Bootcamp 2026. You&apos;ll receive a confirmation and payment instructions at <strong>{data.parent_email}</strong>.
        </p>
        {data.payment_preference && (
          <div style={{ background: '#f0f3ff', border: '1.5px solid rgba(31,47,230,0.15)', borderRadius: '16px', padding: '20px 28px', maxWidth: 380 }}>
            <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, color: '#070d4f', marginBottom: 8 }}>
              Next: Complete Payment
            </p>
            {PAYMENT_OPTIONS.filter(p => p.id === data.payment_preference).map(p => (
              <div key={p.id}>
                <p style={{ fontFamily: 'Inter, sans-serif', color: '#515c63', fontSize: 14 }}><strong>{p.label}</strong></p>
                <p style={{ fontFamily: 'Inter, sans-serif', color: '#515c63', fontSize: 13 }}>{p.detail}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div>
      <ProgressBar step={step} />

      {/* Step 1 — Boy's Details */}
      {step === 1 && (
        <div className="flex flex-col gap-5">
          <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.25rem', fontWeight: 700, color: '#070d4f', marginBottom: 4 }}>
            About the Boy
          </h3>

          <div>
            <label style={labelStyle}>Full Name *</label>
            <input style={inputStyle} value={data.boy_name} onChange={e => set('boy_name', e.target.value)} placeholder="e.g. David Muwonge" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label style={labelStyle}>Age</label>
              <input style={inputStyle} value={data.boy_age} onChange={e => set('boy_age', e.target.value)} placeholder="e.g. 14" />
            </div>
            <div>
              <label style={labelStyle}>Date of Birth</label>
              <input type="date" style={inputStyle} value={data.boy_dob} onChange={e => set('boy_dob', e.target.value)} />
            </div>
          </div>

          <div>
            <label style={labelStyle}>School</label>
            <input style={inputStyle} value={data.school} onChange={e => set('school', e.target.value)} placeholder="School name" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label style={labelStyle}>Grade / Class</label>
              <input style={inputStyle} value={data.grade} onChange={e => set('grade', e.target.value)} placeholder="e.g. S2 / Grade 8" />
            </div>
            <div>
              <label style={labelStyle}>District / Area</label>
              <input style={inputStyle} value={data.district} onChange={e => set('district', e.target.value)} placeholder="e.g. Kampala" />
            </div>
          </div>
        </div>
      )}

      {/* Step 2 — Preferences & Health */}
      {step === 2 && (
        <div className="flex flex-col gap-6">
          <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.25rem', fontWeight: 700, color: '#070d4f', marginBottom: 4 }}>
            Camp Preferences & Health
          </h3>

          <div>
            <label style={labelStyle}>Areas of Interest * (select all that apply)</label>
            <div className="flex flex-wrap gap-2 mt-2">
              {INTEREST_OPTIONS.map(opt => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => toggleInterest(opt)}
                  style={{
                    border: `1.5px solid ${data.interests.includes(opt) ? '#1f2fe6' : '#e5e7eb'}`,
                    background: data.interests.includes(opt) ? '#eef0fd' : '#fff',
                    color: data.interests.includes(opt) ? '#1f2fe6' : '#515c63',
                    borderRadius: '100px',
                    padding: '8px 16px',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '13px',
                    fontWeight: data.interests.includes(opt) ? 600 : 400,
                    cursor: 'pointer',
                    transition: 'all 0.15s',
                  }}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label style={labelStyle}>Dietary Requirements</label>
            <input style={inputStyle} value={data.dietary_needs} onChange={e => set('dietary_needs', e.target.value)} placeholder="e.g. vegetarian, nut allergy — or None" />
          </div>

          <div>
            <label style={labelStyle}>Medical Conditions / Allergies</label>
            <textarea
              style={{ ...inputStyle, minHeight: 80, resize: 'vertical' }}
              value={data.medical_conditions}
              onChange={e => set('medical_conditions', e.target.value)}
              placeholder="List any relevant medical conditions or allergies, or write 'None'"
            />
          </div>

          <div>
            <label style={labelStyle}>Can the boy swim?</label>
            <div className="flex gap-3 mt-1">
              {['yes', 'no'].map(v => (
                <button
                  key={v}
                  type="button"
                  onClick={() => set('can_swim', v)}
                  style={{
                    border: `1.5px solid ${data.can_swim === v ? '#1f2fe6' : '#e5e7eb'}`,
                    background: data.can_swim === v ? '#eef0fd' : '#fff',
                    color: data.can_swim === v ? '#1f2fe6' : '#515c63',
                    borderRadius: '100px',
                    padding: '8px 24px',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '14px',
                    fontWeight: data.can_swim === v ? 600 : 400,
                    cursor: 'pointer',
                    textTransform: 'capitalize',
                  }}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Step 3 — Parent / Guardian */}
      {step === 3 && (
        <div className="flex flex-col gap-5">
          <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.25rem', fontWeight: 700, color: '#070d4f', marginBottom: 4 }}>
            Parent / Guardian Details
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label style={labelStyle}>Full Name *</label>
              <input style={inputStyle} value={data.parent_name} onChange={e => set('parent_name', e.target.value)} placeholder="Parent/guardian full name" />
            </div>
            <div>
              <label style={labelStyle}>Relationship to Boy</label>
              <select style={inputStyle} value={data.relationship} onChange={e => set('relationship', e.target.value)}>
                <option value="">Select…</option>
                {RELATIONSHIP_OPTIONS.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label style={labelStyle}>Phone Number *</label>
              <input style={inputStyle} value={data.parent_phone} onChange={e => set('parent_phone', e.target.value)} placeholder="+256 7XX XXX XXX" />
            </div>
            <div>
              <label style={labelStyle}>WhatsApp Number</label>
              <input style={inputStyle} value={data.parent_whatsapp} onChange={e => set('parent_whatsapp', e.target.value)} placeholder="Same as above if same" />
            </div>
          </div>

          <div>
            <label style={labelStyle}>Email Address *</label>
            <input type="email" style={inputStyle} value={data.parent_email} onChange={e => set('parent_email', e.target.value)} placeholder="parent@email.com" />
          </div>

          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#adbeca', marginTop: -8 }}>
            Emergency Contact (different person if possible)
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-1">
              <label style={labelStyle}>Emergency Contact Name</label>
              <input style={inputStyle} value={data.emergency_name} onChange={e => set('emergency_name', e.target.value)} placeholder="Full name" />
            </div>
            <div>
              <label style={labelStyle}>Phone</label>
              <input style={inputStyle} value={data.emergency_phone} onChange={e => set('emergency_phone', e.target.value)} placeholder="+256 7XX XXX XXX" />
            </div>
            <div>
              <label style={labelStyle}>Relationship</label>
              <input style={inputStyle} value={data.emergency_relationship} onChange={e => set('emergency_relationship', e.target.value)} placeholder="e.g. Uncle" />
            </div>
          </div>
        </div>
      )}

      {/* Step 4 — Consent & Submit */}
      {step === 4 && (
        <div className="flex flex-col gap-6">
          <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.25rem', fontWeight: 700, color: '#070d4f', marginBottom: 4 }}>
            Consent & Final Details
          </h3>

          {/* Summary */}
          <div style={{ background: '#f9faff', border: '1.5px solid rgba(31,47,230,0.1)', borderRadius: '16px', padding: '20px 24px' }}>
            <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '13px', color: '#070d4f', marginBottom: 10 }}>
              ENROLLMENT SUMMARY
            </p>
            <div className="grid grid-cols-2 gap-y-2 gap-x-4">
              {[
                ['Boy', data.boy_name], ['Age', data.boy_age],
                ['School', data.school], ['Grade', data.grade],
                ['Parent', data.parent_name], ['Email', data.parent_email],
                ['Phone', data.parent_phone], ['Interests', data.interests.join(', ')],
              ].map(([k, v]) => v && (
                <div key={k}>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#adbeca' }}>{k}</span>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#374151', marginTop: 1 }}>{v}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Consents */}
          <div className="flex flex-col gap-4">
            {[
              { key: 'photo_consent', label: 'I consent to Boys Network International photographing or filming my son and using this content for non-commercial promotional purposes.' },
              { key: 'medical_consent', label: 'In case of a medical emergency during the camp, I authorise BNI staff to seek appropriate medical treatment for my son.' },
              { key: 'rules_accepted', label: 'I confirm that my son understands and will abide by the camp rules and code of conduct.' },
              { key: 'terms_accepted', label: 'I agree to the Boys Network International Terms & Conditions.' },
            ].map(({ key, label }) => (
              <label key={key} className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={data[key as keyof FormData] as boolean}
                  onChange={e => set(key as keyof FormData, e.target.checked)}
                  style={{ marginTop: 2, flexShrink: 0, accentColor: '#1f2fe6', width: 16, height: 16 }}
                />
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#374151', lineHeight: 1.6 }}>{label}</span>
              </label>
            ))}
          </div>

          {/* Payment preference */}
          <div>
            <label style={{ ...labelStyle, marginBottom: 10 }}>Preferred Payment Method</label>
            <div className="flex flex-col gap-2">
              {PAYMENT_OPTIONS.map(p => (
                <label key={p.id} className="flex items-center gap-3 cursor-pointer p-4 rounded-xl" style={{ border: `1.5px solid ${data.payment_preference === p.id ? '#1f2fe6' : '#e5e7eb'}`, background: data.payment_preference === p.id ? '#eef0fd' : '#fff', transition: 'all 0.15s' }}>
                  <input type="radio" name="payment" value={p.id} checked={data.payment_preference === p.id} onChange={() => set('payment_preference', p.id)} style={{ accentColor: '#1f2fe6' }} />
                  <div>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '14px', color: '#070d4f' }}>{p.label}</p>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#adbeca' }}>{p.detail}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div>
            <label style={labelStyle}>Any additional notes? (optional)</label>
            <textarea style={{ ...inputStyle, minHeight: 70, resize: 'vertical' }} value={data.notes} onChange={e => set('notes', e.target.value)} placeholder="Anything else we should know…" />
          </div>

          {error && <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#dc2626' }}>{error}</p>}
        </div>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between mt-8">
        {step > 1 ? (
          <button
            type="button"
            onClick={() => setStep(s => (s - 1) as typeof step)}
            style={{ border: '1.5px solid #e5e7eb', background: '#fff', borderRadius: '100px', padding: '12px 24px', fontFamily: 'Space Grotesk, sans-serif', fontSize: '14px', fontWeight: 600, color: '#374151', cursor: 'pointer' }}
          >
            ← Back
          </button>
        ) : <div />}

        {step < 4 ? (
          <button
            type="button"
            onClick={() => {
              if (step === 1 && !data.boy_name.trim()) { setError('Please enter the boy\'s name.'); return }
              if (step === 3 && (!data.parent_name.trim() || !data.parent_email.trim())) { setError('Parent name and email are required.'); return }
              setError('')
              setStep(s => (s + 1) as typeof step)
            }}
            style={{ background: 'linear-gradient(135deg, #1f2fe6, #070d4f)', borderRadius: '100px', padding: '12px 28px', fontFamily: 'Space Grotesk, sans-serif', fontSize: '14px', fontWeight: 700, color: '#fff', cursor: 'pointer', border: 'none' }}
          >
            Continue →
          </button>
        ) : (
          <button
            type="button"
            disabled={submitting || !data.photo_consent || !data.medical_consent || !data.rules_accepted || !data.terms_accepted}
            onClick={handleSubmit}
            style={{
              background: (submitting || !data.photo_consent || !data.medical_consent || !data.rules_accepted || !data.terms_accepted) ? '#d1d5db' : 'linear-gradient(135deg, #1f2fe6, #070d4f)',
              borderRadius: '100px', padding: '12px 28px',
              fontFamily: 'Space Grotesk, sans-serif', fontSize: '14px', fontWeight: 700,
              color: '#fff', cursor: submitting ? 'wait' : 'pointer', border: 'none',
              transition: 'background 0.2s',
            }}
          >
            {submitting ? 'Submitting…' : 'Submit Enrollment ✓'}
          </button>
        )}
      </div>
      {error && step < 4 && <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#dc2626', marginTop: 8 }}>{error}</p>}
    </div>
  )
}
