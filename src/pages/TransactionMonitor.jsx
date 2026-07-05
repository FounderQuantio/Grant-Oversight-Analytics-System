import React, { useState, useMemo } from 'react'
import { Search, Filter, AlertCircle, ChevronDown, X } from 'lucide-react'
import Card from '@components/ui/Card'
import { StatusBadge, RiskBadge } from '@components/ui/Badge'
import { transactions, transactionSummary } from '@services/sampleData'
import { formatCurrency, formatDate } from '@utils/formatters'

// ── Filter Bar ───────────────────────────────────────────────
const FilterBar = ({ search, setSearch, riskFilter, setRiskFilter, statusFilter, setStatusFilter }) => (
  <div style={{
    display: 'flex',
    gap: 'var(--space-3)',
    alignItems: 'center',
    flexWrap: 'wrap',
  }}>
    {/* Search */}
    <div style={{ position: 'relative', flex: '1 1 220px' }}>
      <Search size={13} color="var(--text-muted)" style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)' }} />
      <input
        type="text"
        placeholder="Search vendor, ID, program..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{
          width: '100%',
          paddingLeft: 32,
          paddingRight: 12,
          height: 36,
          background: 'var(--bg-elevated)',
          border: '1px solid var(--border-default)',
          borderRadius: 'var(--radius-md)',
          color: 'var(--text-primary)',
          fontSize: 13,
          fontFamily: 'var(--font-sans)',
          outline: 'none',
        }}
        onFocus={e => e.target.style.border = '1px solid var(--border-accent)'}
        onBlur={e => e.target.style.border = '1px solid var(--border-default)'}
      />
    </div>

    {/* Risk filter */}
    <select
      value={riskFilter}
      onChange={e => setRiskFilter(e.target.value)}
      style={{
        height: 36, padding: '0 12px',
        background: 'var(--bg-elevated)',
        border: '1px solid var(--border-default)',
        borderRadius: 'var(--radius-md)',
        color: 'var(--text-secondary)',
        fontSize: 12,
        fontFamily: 'var(--font-mono)',
        cursor: 'pointer',
        outline: 'none',
      }}
    >
      <option value="ALL">All Risk Levels</option>
      <option value="HIGH">HIGH</option>
      <option value="MEDIUM">MEDIUM</option>
      <option value="LOW">LOW</option>
    </select>

    {/* Status filter */}
    <select
      value={statusFilter}
      onChange={e => setStatusFilter(e.target.value)}
      style={{
        height: 36, padding: '0 12px',
        background: 'var(--bg-elevated)',
        border: '1px solid var(--border-default)',
        borderRadius: 'var(--radius-md)',
        color: 'var(--text-secondary)',
        fontSize: 12,
        fontFamily: 'var(--font-mono)',
        cursor: 'pointer',
        outline: 'none',
      }}
    >
      <option value="ALL">All Statuses</option>
      <option value="FLAGGED">FLAGGED</option>
      <option value="UNDER REVIEW">UNDER REVIEW</option>
      <option value="CLEARED">CLEARED</option>
    </select>
  </div>
)

// ── Transaction Detail Panel ─────────────────────────────────
const DetailPanel = ({ txn, onClose }) => {
  if (!txn) return null
  return (
    <div style={{
      position: 'fixed',
      top: 0, right: 0, bottom: 0,
      width: 400,
      background: 'var(--bg-surface)',
      borderLeft: '1px solid var(--border-default)',
      zIndex: 100,
      display: 'flex',
      flexDirection: 'column',
      boxShadow: '-8px 0 32px rgba(0,0,0,0.5)',
      animation: 'fadeIn 0.25s ease',
    }}>
      {/* Panel header */}
      <div style={{
        padding: 'var(--space-5)',
        borderBottom: '1px solid var(--border-subtle)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexShrink: 0,
      }}>
        <div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{txn.id}</div>
          <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-primary)' }}>{txn.vendor}</div>
        </div>
        <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
          <X size={18} />
        </button>
      </div>

      {/* Panel body */}
      <div style={{ flex: 1, overflowY: 'auto', padding: 'var(--space-5)' }}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 'var(--space-5)' }}>
          <StatusBadge status={txn.status} />
          <RiskBadge level={txn.riskLevel} />
        </div>

        {[
          ['Amount',        formatCurrency(txn.amount)],
          ['Invoice Ref',   txn.invoiceRef],
          ['Grant Program', txn.grantProgram],
          ['Category',      txn.category],
          ['Date',          formatDate(txn.date)],
        ].map(([k, v]) => (
          <div key={k} style={{ marginBottom: 'var(--space-4)' }}>
            <div style={{ fontSize: 10, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>{k}</div>
            <div style={{ fontSize: 13, color: 'var(--text-primary)', fontFamily: k === 'Amount' || k === 'Invoice Ref' ? 'var(--font-mono)' : 'inherit', fontWeight: k === 'Amount' ? 700 : 400 }}>{v}</div>
          </div>
        ))}

        {txn.flags.length > 0 && (
          <div>
            <div style={{ fontSize: 10, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>Fraud Flags</div>
            {txn.flags.map((flag, i) => (
              <div key={i} style={{
                display: 'flex',
                gap: 8,
                alignItems: 'flex-start',
                padding: 'var(--space-3)',
                background: 'rgba(239,68,68,0.08)',
                border: '1px solid rgba(239,68,68,0.2)',
                borderRadius: 'var(--radius-md)',
                marginBottom: 6,
              }}>
                <AlertCircle size={13} color="#ef4444" style={{ flexShrink: 0, marginTop: 1 }} />
                <span style={{ fontSize: 12, color: '#ef4444' }}>{flag}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Actions */}
      <div style={{
        padding: 'var(--space-4)',
        borderTop: '1px solid var(--border-subtle)',
        display: 'flex',
        gap: 8,
      }}>
        <button style={{
          flex: 1, height: 36,
          background: 'var(--accent-primary)',
          border: 'none',
          borderRadius: 'var(--radius-md)',
          color: '#fff',
          fontSize: 12,
          fontWeight: 600,
          cursor: 'pointer',
        }}>Escalate</button>
        <button style={{
          flex: 1, height: 36,
          background: 'var(--bg-elevated)',
          border: '1px solid var(--border-default)',
          borderRadius: 'var(--radius-md)',
          color: 'var(--text-secondary)',
          fontSize: 12,
          cursor: 'pointer',
        }}>Mark Cleared</button>
      </div>
    </div>
  )
}

// ── Main Page ────────────────────────────────────────────────
const TransactionMonitor = () => {
  const [search, setSearch]             = useState('')
  const [riskFilter, setRiskFilter]     = useState('ALL')
  const [statusFilter, setStatusFilter] = useState('ALL')
  const [selected, setSelected]         = useState(null)

  const filtered = useMemo(() => {
    return transactions.filter(t => {
      const matchSearch = !search || [t.vendor, t.id, t.grantProgram].some(f =>
        f.toLowerCase().includes(search.toLowerCase())
      )
      const matchRisk   = riskFilter   === 'ALL' || t.riskLevel === riskFilter
      const matchStatus = statusFilter === 'ALL' || t.status === statusFilter
      return matchSearch && matchRisk && matchStatus
    })
  }, [search, riskFilter, statusFilter])

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>

      {/* Summary row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--space-3)' }}>
        {[
          { label: 'Total Volume',   value: formatCurrency(transactionSummary.totalVolume, true), color: 'var(--text-primary)' },
          { label: 'Flagged',        value: transactionSummary.flaggedCount,   color: '#ef4444' },
          { label: 'Under Review',   value: transactionSummary.underReviewCount, color: '#f59e0b' },
          { label: 'Flagged Value',  value: formatCurrency(transactionSummary.flaggedValue, true), color: '#ef4444' },
        ].map(({ label, value, color }) => (
          <div key={label} style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-default)',
            borderRadius: 'var(--radius-md)',
            padding: 'var(--space-4)',
          }}>
            <div style={{ fontSize: 10, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>{label}</div>
            <div style={{ fontSize: 22, fontWeight: 700, color, fontFamily: 'var(--font-mono)' }}>{value}</div>
          </div>
        ))}
      </div>

      {/* Filter bar */}
      <FilterBar
        search={search} setSearch={setSearch}
        riskFilter={riskFilter} setRiskFilter={setRiskFilter}
        statusFilter={statusFilter} setStatusFilter={setStatusFilter}
      />

      {/* Transaction table */}
      <Card style={{ overflow: 'hidden', padding: 0 }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 700 }}>
            <thead>
              <tr style={{ background: 'var(--bg-elevated)' }}>
                {['Transaction ID', 'Vendor', 'Amount', 'Date', 'Program', 'Status', 'Risk', 'Flags'].map(h => (
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
              {filtered.map((txn) => (
                <tr
                  key={txn.id}
                  onClick={() => setSelected(selected?.id === txn.id ? null : txn)}
                  style={{
                    borderBottom: '1px solid var(--border-subtle)',
                    cursor: 'pointer',
                    background: selected?.id === txn.id ? 'rgba(91,127,166,0.08)' : 'transparent',
                    transition: 'background var(--transition-fast)',
                  }}
                  onMouseEnter={e => { if (selected?.id !== txn.id) e.currentTarget.style.background = 'var(--bg-hover)' }}
                  onMouseLeave={e => { if (selected?.id !== txn.id) e.currentTarget.style.background = 'transparent' }}
                >
                  <td style={{ padding: 'var(--space-3) var(--space-4)', fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-accent)' }}>{txn.id}</td>
                  <td style={{ padding: 'var(--space-3) var(--space-4)', fontSize: 13, color: 'var(--text-primary)', maxWidth: 180 }}>
                    <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{txn.vendor}</div>
                  </td>
                  <td style={{ padding: 'var(--space-3) var(--space-4)', fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 600, color: txn.riskLevel === 'HIGH' ? '#ef4444' : 'var(--text-primary)', whiteSpace: 'nowrap' }}>
                    {formatCurrency(txn.amount)}
                  </td>
                  <td style={{ padding: 'var(--space-3) var(--space-4)', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>{formatDate(txn.date)}</td>
                  <td style={{ padding: 'var(--space-3) var(--space-4)', fontSize: 12, color: 'var(--text-secondary)', maxWidth: 160 }}>
                    <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{txn.grantProgram}</div>
                  </td>
                  <td style={{ padding: 'var(--space-3) var(--space-4)' }}><StatusBadge status={txn.status} size="xs" /></td>
                  <td style={{ padding: 'var(--space-3) var(--space-4)' }}><RiskBadge level={txn.riskLevel} size="xs" /></td>
                  <td style={{ padding: 'var(--space-3) var(--space-4)' }}>
                    {txn.flags.length > 0 ? (
                      <span style={{ fontSize: 11, color: '#ef4444', fontFamily: 'var(--font-mono)', display: 'flex', alignItems: 'center', gap: 4 }}>
                        <AlertCircle size={11} /> {txn.flags.length}
                      </span>
                    ) : (
                      <span style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div style={{ padding: 'var(--space-10)', textAlign: 'center', color: 'var(--text-muted)', fontSize: 13 }}>
              No transactions match the current filters.
            </div>
          )}
        </div>
      </Card>

      {/* Detail panel */}
      {selected && <DetailPanel txn={selected} onClose={() => setSelected(null)} />}
    </div>
  )
}

export default TransactionMonitor
