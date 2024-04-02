import type { FC } from 'react'

import { HeaderLogo } from '@/components/dashboard-header/header-logo'
import { HeaderMenuIcon } from '@/components/dashboard-header/header-menu-icon'
import { HeaderIcons } from '@/components/dashboard-header/header-icons'

export const HeaderDashboard: FC = () => {
  return (
    <nav className='h-full max-h-[72px] px-6 bg-primary-black flex items-center justify-between'>
      <div className='flex items-center gap-6'>
        <HeaderMenuIcon />
        <HeaderLogo />
      </div>
      <div className='h-full flex items-center gap-6'>
        <HeaderIcons />
      </div>
    </nav>
  )
}
