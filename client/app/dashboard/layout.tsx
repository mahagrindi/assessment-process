import '@/styles/main.css'

import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import { mr } from '@/utils/class-authority-merge'
import { DashboardHeader } from '@/components/dashboard-header'
import { DashboardSidebar } from '@/components/dahsboard-sidebar'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'EY Dashboard',
  description: 'Dashboard page',
}

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  if (!cookies().get('token')) {
    redirect('/')
  }

  return (
    <div className={mr('flex flex-col w-full min-h-screen')}>
      <div className='w-full h-[62px] max-h-[62px] bg-primary-black'>
        <DashboardHeader />
      </div>
      <div className='flex-1 grid grid-cols-8'>
        <div className='col-span-1 bg-primary-black'>
          <DashboardSidebar />
        </div>
        <div className='bg-primary-background col-span-7 p-6'>{children}</div>
      </div>
    </div>
  )
}
