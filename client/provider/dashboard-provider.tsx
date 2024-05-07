'use client'

import type { JSX, ReactElement } from 'react'
import { createContext, useContext, useState } from 'react'
import { DashboardStore, dashboardStore } from '@/provider/store/dashboard-store'

interface ComponentProps {
  children: ReactElement
}

export default function DashboardProvider({ children }: ComponentProps): JSX.Element {
  const [sidebarState, setSidebarState] = useState<boolean>(dashboardStore.sidebarState)

  const toggleSidebar = () => {
    setSidebarState(!sidebarState)
    console.log('sidebarState', sidebarState)
  }

  return <DashboardContext.Provider value={{ sidebarState, toggleSidebar }}>{children}</DashboardContext.Provider>
}

const DashboardContext = createContext<DashboardStore>(dashboardStore)
export const useDashboard = () => useContext(DashboardContext)
