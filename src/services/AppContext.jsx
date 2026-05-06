import React, { createContext, useContext, useState } from 'react'

const AppContext = createContext(null)

export const AppProvider = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [selectedTransaction, setSelectedTransaction] = useState(null)
  const [selectedApplication, setSelectedApplication] = useState(null)
  const [alertCount, setAlertCount] = useState(47)

  const toggleSidebar = () => setSidebarOpen(prev => !prev)

  return (
    <AppContext.Provider value={{
      sidebarOpen,
      toggleSidebar,
      selectedTransaction,
      setSelectedTransaction,
      selectedApplication,
      setSelectedApplication,
      alertCount,
      setAlertCount,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
