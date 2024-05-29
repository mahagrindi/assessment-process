import '@/styles/main.css'

import type { ReactNode } from 'react'
import type { Metadata } from 'next'

import { DashboardHeader } from '@/components/dashboard-header'
import { DashboardSidebar } from '@/components/dahsboard-sidebar'

import { mr } from '@/utils/class-authority-merge'
import { Toaster } from 'sonner'

import DashboardProvider from '@/provider/dashboard-provider'

export const metadata: Metadata = {
  title: 'EY Dashboard',
  description: 'Dashboard page',
  icons: {
    icon: '/assets/logo/ey-logo-black.webp',
  },
}

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <DashboardProvider>
      <div className={mr('flex flex-col w-full h-screen max-h-screen')}>
        <div className='w-full h-[62px] max-h-[62px] bg-primary-black sticky inset-0'>
          <DashboardHeader />
        </div>
        <div className='flex-1 w-full flex overflow-hidden'>
          <DashboardSidebar />
          <div className='flex-1 bg-primary-background pb-6 overflow-x-hidden overflow-y-auto'>
            <Toaster />
            {children}
          </div>
        </div>
      </div>
    </DashboardProvider>
  )
}
