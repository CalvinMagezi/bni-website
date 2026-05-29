import type { ReactNode } from 'react'

interface EmptyStateProps {
  icon?: ReactNode
  title: string
  description?: string
  action?: ReactNode
}

export default function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div
      style={{
        maxWidth: '480px',
        margin: '0 auto',
        background: '#ffffff',
        border: '1.5px solid #e5e7eb',
        borderRadius: '20px',
        padding: 'clamp(32px, 5vw, 48px)',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '12px',
        boxShadow: '0 2px 16px rgba(7,13,79,0.05)',
      }}
    >
      {icon && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 64,
            height: 64,
            borderRadius: '16px',
            background: '#eef0fd',
            fontSize: 30,
            marginBottom: '4px',
          }}
        >
          {icon}
        </div>
      )}
      <h3
        style={{
          fontFamily: 'Space Grotesk, sans-serif',
          fontSize: '20px',
          fontWeight: 700,
          color: '#0d1787',
          margin: 0,
        }}
      >
        {title}
      </h3>
      {description && (
        <p
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '15px',
            lineHeight: 1.6,
            color: '#4b5563',
            margin: 0,
          }}
        >
          {description}
        </p>
      )}
      {action && <div style={{ marginTop: '8px' }}>{action}</div>}
    </div>
  )
}
