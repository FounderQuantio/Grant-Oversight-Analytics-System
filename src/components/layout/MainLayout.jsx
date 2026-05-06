import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'
import { useApp } from '@services/AppContext'

const MainLayout = () => {
  const { sidebarOpen } = useApp()

  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      overflow: 'hidden',
      background: 'var(--bg-base)',
    }}>
      <Sidebar />

      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        minWidth: 0,
      }}>
        <Header />

        <main style={{
          flex: 1,
          overflowY: 'auto',
          padding: 'var(--space-6)',
          background: 'var(--bg-base)',
        }}>
          <Outlet />
        </main>

        {/* Footer bar */}
        <footer style={{
          height: 32,
          background: 'var(--bg-surface)',
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          padding: '0 var(--space-6)',
          gap: 'var(--space-6)',
          flexShrink: 0,
        }}>
          <span style={{ fontSize: 10, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
            GFDS V4 · Aligned with 2 CFR Part 200 · GAO Green Book · COSO Framework
          </span>
          <span style={{ marginLeft: 'auto', fontSize: 10, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
            Data as of {new Date().toLocaleDateString('en-US')} · SYSTEM ACTIVE
          </span>
        </footer>
      </div>
    </div>
  )
}

export default MainLayout
