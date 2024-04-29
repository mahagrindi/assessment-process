'use client'

import type { FC } from 'react'

import { MdMenu } from 'react-icons/md'

import { useDashboard } from '@/provider/dashboard-provider'

export const DashboardHeaderMenuIcon: FC = () => {
  const { toggleSidebar } = useDashboard()

  return (
    <button className='h-full grid place-content-center outline-none' type='button' onClick={toggleSidebar}>
      <MdMenu className='text-gray-300 hover:text-primary-white cursor-pointer' size={24} />
    </button>
  )
}
