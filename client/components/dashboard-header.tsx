import type { FC } from 'react'

import { DashboardHeaderLogo } from '@/components/dashboard-header-logo'
import { DashboardHeaderMenuIcon } from '@/components/dashboard-header-menu-icon'
import { DashboardHeaderIcons } from '@/components/dashboard-header-icons'

export const DashboardHeader: FC = () => {
  return (
    <nav className='h-full max-h-[62px] px-6 bg-primary-black flex items-center justify-between'>
      <div className='flex items-center gap-6'>
        <DashboardHeaderMenuIcon />
        <DashboardHeaderLogo />
      </div>
      <div className='h-full flex items-center gap-6'>
        <DashboardHeaderIcons />
      </div>
    </nav>
  )
}
