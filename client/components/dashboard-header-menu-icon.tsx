'use client'

import type { FC } from 'react'
import { MdMenu } from 'react-icons/md'

export const DashboardHeaderMenuIcon: FC = () => (
  <button className='h-full grid place-content-center outline-none'>
    <MdMenu className='text-gray-300 hover:text-primary-white cursor-pointer' size={24} />
  </button>
)
