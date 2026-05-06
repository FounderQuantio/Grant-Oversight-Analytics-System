import React from 'react'

/**
 * MetricCard — KPI tile showing a label, value, sub-label and optional trend
 */
const MetricCard = ({
  label,
  value,
  sub,
  icon: Icon,
  accentColor = 'var(--accent-primary)',
  trend,       // { direction: 'up'|'down', value: string }
  alert = false,
}) => {
  return (
    <div style={{
      background: 'var(--bg-card)',
      border: `1px solid var(--border-default)`,
      borderTop: `3px solid ${alert ? 'var(--color-danger)' : accentColor}`,
      borderRadius: 'var(--radius-lg)',
      padding: 'var(--space-5)',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-3)',
      transition: 'border-color var(--transition-fast)',
    }}>
      {/* Header row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <span style={{
          fontSize: 11,
          fontWeight: 600,
          color: 'var(--text-muted)',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          fontFamily: 'var(--font-mono)',
        }}>
          {label}
        </span>
        {Icon && (
          <div style={{
            width: 32, height: 32,
            borderRadius: 'var(--radius-md)',
            background: `${accentColor}22`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Icon size={16} color={accentColor} />
          </div>
        )}
      </div>

      {/* Value */}
      <div style={{
        fontSize: 28,
        fontWeight: 700,
        color: alert ? 'var(--color-danger)' : 'var(--text-primary)',
        lineHeight: 1,
        letterSpacing: '-0.02em',
        fontFamily: 'var(--font-mono)',
      }}>
        {value}
      </div>

      {/* Sub label + trend */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        {sub && (
          <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{sub}</span>
        )}
        {trend && (
          <span style={{
            fontSize: 11,
            fontWeight: 600,
            color: trend.direction === 'up' ? 'var(--color-danger)' : 'var(--color-success)',
          }}>
            {trend.direction === 'up' ? '↑' : '↓'} {trend.value}
          </span>
        )}
      </div>
    </div>
  )
}

export default MetricCard
