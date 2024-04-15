import '@/styles/main.css'

import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import { mr } from '@/utils/class-authority-merge'
import { DashboardHeader } from '@/components/dashboard-header'
import { DashboardSidebar } from '@/components/dahsboard-sidebar'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { DashboardHeaderProfile } from '@/components/dashboard-header-profile'

export const metadata: Metadata = {
  title: 'EY Dashboard',
  description: 'Dashboard page',
  icons: {
    icon: '/assets/logo/ey-logo-black.png',
  },
}

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  if (!cookies().get('token')) {
    redirect('/')
  }

  return (
    <div className={mr('flex flex-col w-full h-screen max-h-screen')}>
      <div className='w-full h-[62px] max-h-[62px] bg-primary-black sticky inset-0'>
        <DashboardHeader />
      </div>
      <div className='flex-1 w-full flex overflow-hidden'>
        <div className='w-full h-full flex flex-col max-w-[300px] bg-primary-black sticky top-[62px]'>
          <div className='flex-1'>
            <DashboardSidebar />
          </div>
          <div>
            <DashboardHeaderProfile />
          </div>
        </div>
        <div className='flex-1 bg-primary-background pb-6 overflow-x-hidden overflow-y-auto'>{children}</div>
      </div>
    </div>
  )
}
