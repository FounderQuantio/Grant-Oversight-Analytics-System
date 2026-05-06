import React, { useState } from 'react'
import { AlertTriangle, CheckCircle, Clock, ChevronDown, ChevronUp, Flag } from 'lucide-react'
import Card from '@components/ui/Card'
import { StatusBadge } from '@components/ui/Badge'
import { applications } from '@services/sampleData'
import { formatCurrency, formatDate, riskScoreToSeverity } from '@utils/formatters'

// ── Risk Score Gauge ─────────────────────────────────────────
const RiskGauge = ({ score }) => {
  const color = score >= 70 ? '#ef4444' : score >= 40 ? '#f59e0b' : '#10b981'
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
      <div style={{ position: 'relative', width: 60, height: 60 }}>
        <svg width="60" height="60" style={{ transform: 'rotate(-90deg)' }}>
          <circle cx="30" cy="30" r="24" fill="none" stroke="var(--border-default)" strokeWidth="6" />
          <circle
            cx="30" cy="30" r="24"
            fill="none"
            stroke={color}
            strokeWidth="6"
            strokeDasharray={`${(score / 100) * 150.8} 150.8`}
            strokeLinecap="round"
          />
        </svg>
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 13, fontWeight: 700, color, fontFamily: 'var(--font-mono)',
        }}>
          {score}
        </div>
      </div>
      <div style={{ fontSize: 9, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>
        Risk Score
      </div>
    </div>
  )
}

// ── Application Card ─────────────────────────────────────────
const AppCard = ({ app }) => {
  const [expanded, setExpanded] = useState(false)
  const severity = riskScoreToSeverity(app.riskScore)

  return (
    <Card style={{ padding: 0, overflow: 'hidden' }}>
      {/* Card header — always visible */}
      <div
        onClick={() => setExpanded(prev => !prev)}
        style={{
          padding: 'var(--space-5)',
          display: 'flex',
          gap: 'var(--space-4)',
          alignItems: 'flex-start',
          cursor: 'pointer',
          borderBottom: expanded ? '1px solid var(--border-subtle)' : 'none',
        }}
      >
        <RiskGauge score={app.riskScore} />

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8, marginBottom: 6 }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 2 }}>
                {app.applicant}
              </div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                {app.id} · {app.program}
              </div>
            </div>
            <StatusBadge status={app.status} />
          </div>

          <div style={{ display: 'flex', gap: 'var(--space-5)', flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontSize: 10, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>REQUESTED</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#f59e0b', fontFamily: 'var(--font-mono)' }}>
                {formatCurrency(app.requestedAmount)}
              </div>
            </div>
            <div>
              <div style={{ fontSize: 10, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>SUBMITTED</div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{formatDate(app.submissionDate)}</div>
            </div>
            <div>
              <div style={{ fontSize: 10, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>REVIEW DUE</div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{formatDate(app.dueDate)}</div>
            </div>
            <div>
              <div style={{ fontSize: 10, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>REVIEWER</div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{app.reviewer}</div>
            </div>
          </div>

          {/* Flags preview */}
          {app.flags.length > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8 }}>
              <Flag size={11} color="#ef4444" />
              <span style={{ fontSize: 11, color: '#ef4444', fontFamily: 'var(--font-mono)' }}>
                {app.flags.length} risk flag{app.flags.length !== 1 ? 's' : ''} detected
              </span>
            </div>
          )}
        </div>

        {expanded ? <ChevronUp size={16} color="var(--text-muted)" style={{ flexShrink: 0 }} /> : <ChevronDown size={16} color="var(--text-muted)" style={{ flexShrink: 0 }} />}
      </div>

      {/* Expanded flags */}
      {expanded && app.flags.length > 0 && (
        <div style={{ padding: 'var(--space-4) var(--space-5)' }}>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>
            Detected Risk Flags
          </div>
          {app.flags.map((flag, i) => (
            <div key={i} style={{
              display: 'flex',
              gap: 8,
              alignItems: 'flex-start',
              padding: 'var(--space-3)',
              background: 'rgba(239,68,68,0.07)',
              border: '1px solid rgba(239,68,68,0.15)',
              borderRadius: 'var(--radius-md)',
              marginBottom: 6,
            }}>
              <AlertTriangle size={12} color="#ef4444" style={{ flexShrink: 0, marginTop: 1 }} />
              <span style={{ fontSize: 12, color: '#ef4444', lineHeight: 1.5 }}>{flag}</span>
            </div>
          ))}

          <div style={{ display: 'flex', gap: 8, marginTop: 'var(--space-4)' }}>
            <button style={{
              padding: '6px 16px',
              background: '#ef4444',
              border: 'none',
              borderRadius: 'var(--radius-md)',
              color: '#fff',
              fontSize: 12, fontWeight: 600, cursor: 'pointer',
            }}>Reject Application</button>
            <button style={{
              padding: '6px 16px',
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border-default)',
              borderRadius: 'var(--radius-md)',
              color: 'var(--text-secondary)',
              fontSize: 12, cursor: 'pointer',
            }}>Request Documentation</button>
            <button style={{
              padding: '6px 16px',
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border-default)',
              borderRadius: 'var(--radius-md)',
              color: 'var(--text-secondary)',
              fontSize: 12, cursor: 'pointer',
            }}>Escalate to Senior Review</button>
          </div>
        </div>
      )}

      {expanded && app.flags.length === 0 && (
        <div style={{ padding: 'var(--space-4) var(--space-5)', display: 'flex', alignItems: 'center', gap: 8 }}>
          <CheckCircle size={14} color="#10b981" />
          <span style={{ fontSize: 13, color: '#10b981' }}>No risk flags detected — application eligible for approval processing.</span>
        </div>
      )}
    </Card>
  )
}

// ── Main Page ────────────────────────────────────────────────
const PreAwardApplications = () => {
  const [filter, setFilter] = useState('ALL')

  const filtered = applications.filter(a =>
    filter === 'ALL' || a.status === filter
  )

  const counts = {
    total:       applications.length,
    flagged:     applications.filter(a => a.status === 'RISK FLAGGED').length,
    review:      applications.filter(a => a.status === 'UNDER REVIEW').length,
    approved:    applications.filter(a => a.status === 'APPROVED').length,
  }

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>

      {/* Summary stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--space-3)' }}>
        {[
          { label: 'Total Applications', value: counts.total,   color: 'var(--text-primary)', filter: 'ALL' },
          { label: 'Risk Flagged',        value: counts.flagged, color: '#ef4444',             filter: 'RISK FLAGGED' },
          { label: 'Under Review',        value: counts.review,  color: '#f59e0b',             filter: 'UNDER REVIEW' },
          { label: 'Approved',            value: counts.approved, color: '#10b981',            filter: 'APPROVED' },
        ].map(({ label, value, color, filter: f }) => (
          <div
            key={label}
            onClick={() => setFilter(f)}
            style={{
              background: filter === f ? 'var(--bg-hover)' : 'var(--bg-card)',
              border: filter === f ? `1px solid ${color}40` : '1px solid var(--border-default)',
              borderTop: `3px solid ${color}`,
              borderRadius: 'var(--radius-md)',
              padding: 'var(--space-4)',
              cursor: 'pointer',
              transition: 'all var(--transition-fast)',
            }}
          >
            <div style={{ fontSize: 10, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>{label}</div>
            <div style={{ fontSize: 24, fontWeight: 700, color, fontFamily: 'var(--font-mono)' }}>{value}</div>
          </div>
        ))}
      </div>

      {/* Application cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        {filtered.map(app => <AppCard key={app.id} app={app} />)}
        {filtered.length === 0 && (
          <Card>
            <div style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: 13, padding: 'var(--space-8)' }}>
              No applications in this category.
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}

export default PreAwardApplications
