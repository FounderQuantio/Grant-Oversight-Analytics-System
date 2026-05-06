import React from 'react'
import {
  AreaChart, Area, BarChart, Bar, RadarChart, Radar, PolarGrid,
  PolarAngleAxis, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts'
import {
  AlertTriangle, TrendingUp, CheckCircle, Clock,
  DollarSign, Shield,
} from 'lucide-react'
import MetricCard from '@components/ui/MetricCard'
import Card from '@components/ui/Card'
import { StatusBadge } from '@components/ui/Badge'
import {
  riskMetrics, riskTrendData, riskDistribution, complianceScoreData,
} from '@services/sampleData'
import { formatCurrency } from '@utils/formatters'

// ── Custom Tooltip ───────────────────────────────────────────
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{
      background: 'var(--bg-elevated)',
      border: '1px solid var(--border-default)',
      borderRadius: 'var(--radius-md)',
      padding: 'var(--space-3) var(--space-4)',
      fontSize: 12,
      fontFamily: 'var(--font-mono)',
    }}>
      <div style={{ color: 'var(--text-secondary)', marginBottom: 4 }}>{label}</div>
      {payload.map((p, i) => (
        <div key={i} style={{ color: p.color, display: 'flex', gap: 8, alignItems: 'center' }}>
          <span>{p.name}:</span>
          <span style={{ fontWeight: 600 }}>{p.value}</span>
        </div>
      ))}
    </div>
  )
}

// ── Risk Distribution Table ──────────────────────────────────
const RiskDistributionTable = () => (
  <Card style={{ overflow: 'hidden', padding: 0 }}>
    <div style={{ padding: 'var(--space-5) var(--space-6)', borderBottom: '1px solid var(--border-subtle)' }}>
      <h3 style={{ fontSize: 14, fontWeight: 600, margin: 0 }}>Risk Distribution by Category</h3>
      <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2, marginBottom: 0 }}>
        Active flags sorted by financial exposure
      </p>
    </div>
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr style={{ background: 'var(--bg-elevated)' }}>
          {['Category', 'Flags', 'Exposure Value', 'Severity'].map(h => (
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
            }}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {riskDistribution.map((row, i) => (
          <tr key={i} style={{ borderBottom: '1px solid var(--border-subtle)' }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-hover)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            <td style={{ padding: 'var(--space-3) var(--space-4)', fontSize: 13, color: 'var(--text-primary)' }}>
              {row.category}
            </td>
            <td style={{ padding: 'var(--space-3) var(--space-4)', fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 600 }}>
              {row.count}
            </td>
            <td style={{ padding: 'var(--space-3) var(--space-4)', fontFamily: 'var(--font-mono)', fontSize: 13, color: '#f59e0b' }}>
              {formatCurrency(row.value)}
            </td>
            <td style={{ padding: 'var(--space-3) var(--space-4)' }}>
              <StatusBadge status={row.severity} size="xs" />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </Card>
)

// ── Main Dashboard Page ──────────────────────────────────────
const RiskDashboard = () => {
  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>

      {/* Section header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981', boxShadow: '0 0 6px #10b981' }} />
            <span style={{ fontSize: 10, color: '#10b981', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
              LIVE MONITORING
            </span>
          </div>
          <p style={{ fontSize: 13, color: 'var(--text-muted)', margin: 0 }}>
            Aligned with GAO Green Book · COSO Framework · OMB 2 CFR Part 200
          </p>
        </div>
        <div style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
          FY 2024 Q4
        </div>
      </div>

      {/* KPI Metrics Row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: 'var(--space-4)',
      }}>
        <MetricCard
          label="Total Flagged"
          value={riskMetrics.totalFlagged}
          sub="Active fraud indicators"
          icon={AlertTriangle}
          accentColor="var(--color-danger)"
          alert
          trend={{ direction: 'up', value: '+13%' }}
        />
        <MetricCard
          label="High Risk"
          value={riskMetrics.highRisk}
          sub="Immediate review required"
          icon={Shield}
          accentColor="#ef4444"
          alert
        />
        <MetricCard
          label="Pending Review"
          value={riskMetrics.pendingReview}
          sub="Awaiting adjudication"
          icon={Clock}
          accentColor="var(--color-warning)"
        />
        <MetricCard
          label="Resolved"
          value={riskMetrics.resolvedThisMonth}
          sub="This month"
          icon={CheckCircle}
          accentColor="var(--color-success)"
          trend={{ direction: 'down', value: '-5%' }}
        />
        <MetricCard
          label="Grant Portfolio"
          value={formatCurrency(riskMetrics.totalGrantValue, true)}
          sub="Total administered value"
          icon={DollarSign}
          accentColor="var(--accent-primary)"
        />
        <MetricCard
          label="At-Risk Value"
          value={formatCurrency(riskMetrics.atRiskValue, true)}
          sub="Under active investigation"
          icon={TrendingUp}
          accentColor="var(--color-warning)"
          alert
        />
      </div>

      {/* Charts Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>

        {/* Trend Chart */}
        <Card>
          <h3 style={{ fontSize: 14, fontWeight: 600, margin: '0 0 4px' }}>6-Month Risk Trend</h3>
          <p style={{ fontSize: 12, color: 'var(--text-muted)', margin: '0 0 var(--space-5)' }}>
            Flagged vs resolved fraud indicators
          </p>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={riskTrendData}>
              <defs>
                <linearGradient id="gFlagged" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#ef4444" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gResolved" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: 11, fontFamily: 'var(--font-mono)' }} />
              <Area type="monotone" dataKey="flagged"  stroke="#ef4444" fill="url(#gFlagged)"  strokeWidth={2} name="Flagged" />
              <Area type="monotone" dataKey="resolved" stroke="#10b981" fill="url(#gResolved)" strokeWidth={2} name="Resolved" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        {/* Compliance Radar */}
        <Card>
          <h3 style={{ fontSize: 14, fontWeight: 600, margin: '0 0 4px' }}>Compliance Score by Domain</h3>
          <p style={{ fontSize: 12, color: 'var(--text-muted)', margin: '0 0 var(--space-5)' }}>
            Actual score vs 2 CFR 200 benchmark
          </p>
          <ResponsiveContainer width="100%" height={200}>
            <RadarChart data={complianceScoreData}>
              <PolarGrid stroke="var(--border-subtle)" />
              <PolarAngleAxis dataKey="name" tick={{ fontSize: 10, fill: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }} />
              <Radar name="Score"     dataKey="score"     stroke="#2563eb" fill="#2563eb" fillOpacity={0.25} strokeWidth={2} />
              <Radar name="Benchmark" dataKey="benchmark" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.1}  strokeWidth={1} strokeDasharray="5 5" />
              <Legend wrapperStyle={{ fontSize: 11, fontFamily: 'var(--font-mono)' }} />
              <Tooltip content={<CustomTooltip />} />
            </RadarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Risk Distribution Table */}
      <RiskDistributionTable />

      {/* Compliance framework badges */}
      <div style={{
        display: 'flex',
        gap: 'var(--space-3)',
        flexWrap: 'wrap',
        padding: 'var(--space-4) var(--space-5)',
        background: 'var(--bg-surface)',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border-subtle)',
      }}>
        <span style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginRight: 8 }}>
          Compliance Frameworks:
        </span>
        {['GAO Green Book', 'COSO Framework', 'OMB 2 CFR Part 200', 'Single Audit Act'].map(f => (
          <span key={f} style={{
            padding: '2px 10px',
            background: 'rgba(37,99,235,0.1)',
            border: '1px solid rgba(37,99,235,0.2)',
            borderRadius: 'var(--radius-sm)',
            fontSize: 11,
            color: 'var(--text-accent)',
            fontFamily: 'var(--font-mono)',
          }}>{f}</span>
        ))}
      </div>
    </div>
  )
}

export default RiskDashboard
