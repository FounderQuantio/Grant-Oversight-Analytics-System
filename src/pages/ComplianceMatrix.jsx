import React, { useState, useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { CheckCircle, AlertCircle, XCircle, FileText } from 'lucide-react'
import Card from '@components/ui/Card'
import { StatusBadge } from '@components/ui/Badge'
import { complianceControls, complianceDomainSummary } from '@services/sampleData'
import { formatDate, calcComplianceScore } from '@utils/formatters'

// ── Domain Filter Tabs ───────────────────────────────────────
const DomainTabs = ({ selected, onChange }) => {
  const domains = ['ALL', ...new Set(complianceControls.map(c => c.domain))]

  return (
    <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
      {domains.map(d => (
        <button
          key={d}
          onClick={() => onChange(d)}
          style={{
            padding: '5px 12px',
            background: selected === d ? 'var(--accent-primary)' : 'var(--bg-elevated)',
            border: selected === d ? '1px solid var(--accent-primary)' : '1px solid var(--border-default)',
            borderRadius: 'var(--radius-md)',
            color: selected === d ? '#fff' : 'var(--text-secondary)',
            fontSize: 11,
            fontFamily: 'var(--font-mono)',
            cursor: 'pointer',
            transition: 'all var(--transition-fast)',
            whiteSpace: 'nowrap',
          }}
        >
          {d === 'ALL' ? 'All Domains' : d}
        </button>
      ))}
    </div>
  )
}

// ── Control Row ──────────────────────────────────────────────
const StatusIcon = ({ status }) => {
  const map = {
    COMPLIANT: <CheckCircle size={14} color="#10b981" />,
    PARTIAL:   <AlertCircle size={14} color="#f59e0b" />,
    'NON-COMPLIANT': <XCircle size={14} color="#ef4444" />,
  }
  return map[status] || null
}

const ControlRow = ({ control }) => (
  <tr
    style={{ borderBottom: '1px solid var(--border-subtle)', transition: 'background var(--transition-fast)' }}
    onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-hover)'}
    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
  >
    <td style={{ padding: 'var(--space-3) var(--space-4)', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)' }}>
      {control.id}
    </td>
    <td style={{ padding: 'var(--space-3) var(--space-4)', fontSize: 11, color: 'var(--text-accent)', fontFamily: 'var(--font-mono)' }}>
      {control.ref}
    </td>
    <td style={{ padding: 'var(--space-3) var(--space-4)', fontSize: 13, color: 'var(--text-primary)', maxWidth: 280 }}>
      {control.control}
    </td>
    <td style={{ padding: 'var(--space-3) var(--space-4)', fontSize: 12, color: 'var(--text-secondary)' }}>
      {control.domain}
    </td>
    <td style={{ padding: 'var(--space-3) var(--space-4)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <StatusIcon status={control.status} />
        <StatusBadge status={control.status} size="xs" />
      </div>
    </td>
    <td style={{ padding: 'var(--space-3) var(--space-4)', fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
      {formatDate(control.lastReview)}
    </td>
    <td style={{ padding: 'var(--space-3) var(--space-4)', fontSize: 12, color: 'var(--text-secondary)' }}>
      {control.owner}
    </td>
    <td style={{ padding: 'var(--space-3) var(--space-4)', maxWidth: 200 }}>
      {control.notes ? (
        <span style={{ fontSize: 11, color: '#f59e0b' }}>{control.notes}</span>
      ) : control.evidence ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <FileText size={11} color="#10b981" />
          <span style={{ fontSize: 11, color: '#10b981', fontFamily: 'var(--font-mono)' }}>{control.evidence}</span>
        </div>
      ) : (
        <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>—</span>
      )}
    </td>
  </tr>
)

// ── Domain Summary Chart ─────────────────────────────────────
const DomainChart = () => {
  const data = complianceDomainSummary.map(d => ({
    name: d.domain.split(' ').slice(0, 2).join(' '),
    Compliant: d.compliant,
    Partial: d.partial,
    'Non-Compliant': d.nonCompliant,
  }))

  return (
    <Card>
      <h3 style={{ fontSize: 14, fontWeight: 600, margin: '0 0 4px' }}>Compliance by Domain</h3>
      <p style={{ fontSize: 12, color: 'var(--text-muted)', margin: '0 0 var(--space-5)' }}>
        Control status distribution across all regulatory domains
      </p>
      <ResponsiveContainer width="100%" height={180}>
        <BarChart data={data} barSize={12}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" vertical={false} />
          <XAxis dataKey="name" tick={{ fontSize: 10, fill: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 10, fill: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border-default)',
              borderRadius: 8,
              fontSize: 12,
              fontFamily: 'var(--font-mono)',
            }}
          />
          <Legend wrapperStyle={{ fontSize: 11, fontFamily: 'var(--font-mono)' }} />
          <Bar dataKey="Compliant"     fill="#10b981" radius={[2,2,0,0]} />
          <Bar dataKey="Partial"       fill="#f59e0b" radius={[2,2,0,0]} />
          <Bar dataKey="Non-Compliant" fill="#ef4444" radius={[2,2,0,0]} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  )
}

// ── Main Page ────────────────────────────────────────────────
const ComplianceMatrix = () => {
  const [domainFilter, setDomainFilter] = useState('ALL')
  const overallScore = calcComplianceScore(complianceControls)

  const filtered = useMemo(() =>
    domainFilter === 'ALL'
      ? complianceControls
      : complianceControls.filter(c => c.domain === domainFilter),
    [domainFilter]
  )

  const counts = {
    compliant:    filtered.filter(c => c.status === 'COMPLIANT').length,
    partial:      filtered.filter(c => c.status === 'PARTIAL').length,
    nonCompliant: filtered.filter(c => c.status === 'NON-COMPLIANT').length,
  }

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>

      {/* Overview row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 'var(--space-4)' }}>

        {/* Overall score */}
        <Card accent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-3)', textAlign: 'center' }}>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Overall Compliance Score
          </div>
          <div style={{
            fontSize: 64,
            fontWeight: 700,
            fontFamily: 'var(--font-mono)',
            color: overallScore >= 80 ? '#10b981' : overallScore >= 60 ? '#f59e0b' : '#ef4444',
            lineHeight: 1,
          }}>
            {overallScore}%
          </div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
            Across {complianceControls.length} mapped controls
          </div>
          <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap', justifyContent: 'center' }}>
            {['2 CFR Part 200', 'GAO Green Book', 'COSO'].map(f => (
              <span key={f} style={{ padding: '2px 8px', background: 'rgba(91,127,166,0.1)', border: '1px solid rgba(91,127,166,0.2)', borderRadius: 'var(--radius-sm)', fontSize: 10, color: 'var(--text-accent)', fontFamily: 'var(--font-mono)' }}>{f}</span>
            ))}
          </div>
        </Card>

        <DomainChart />
      </div>

      {/* Status summary row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-3)' }}>
        {[
          { label: 'Compliant',     value: counts.compliant,    color: '#10b981', icon: CheckCircle },
          { label: 'Partial',       value: counts.partial,      color: '#f59e0b', icon: AlertCircle },
          { label: 'Non-Compliant', value: counts.nonCompliant, color: '#ef4444', icon: XCircle },
        ].map(({ label, value, color, icon: Icon }) => (
          <div key={label} style={{
            background: 'var(--bg-card)',
            border: `1px solid ${color}30`,
            borderRadius: 'var(--radius-md)',
            padding: 'var(--space-4)',
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-3)',
          }}>
            <div style={{ width: 36, height: 36, borderRadius: 'var(--radius-md)', background: `${color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon size={18} color={color} />
            </div>
            <div>
              <div style={{ fontSize: 22, fontWeight: 700, color, fontFamily: 'var(--font-mono)' }}>{value}</div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'var(--font-mono)' }}>{label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Domain tabs */}
      <DomainTabs selected={domainFilter} onChange={setDomainFilter} />

      {/* Controls table */}
      <Card style={{ overflow: 'hidden', padding: 0 }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 900 }}>
            <thead>
              <tr style={{ background: 'var(--bg-elevated)' }}>
                {['Control ID', 'Regulation Ref', 'Control Description', 'Domain', 'Status', 'Last Review', 'Control Owner', 'Notes / Evidence'].map(h => (
                  <th key={h} style={{
                    padding: 'var(--space-3) var(--space-4)',
                    textAlign: 'left',
                    fontSize: 10,
                    fontWeight: 600,
                    color: 'var(--text-muted)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    fontFamily: 'var(--font-mono)',
                    borderBottom: '1px solid var(--border-subtle)',
                    whiteSpace: 'nowrap',
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(c => <ControlRow key={c.id} control={c} />)}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}

export default ComplianceMatrix
