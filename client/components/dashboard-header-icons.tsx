import type { FC } from 'react'

import { MdOutlineSettings, MdCalendarMonth, MdOutlineNotificationsNone } from 'react-icons/md'

export const DashboardHeaderIcons: FC = () => (
  <div className='h-full flex flex-row-reverse items-center gap-6'>
    <button className='flex items-center justify-center outline-none'>
      <MdOutlineSettings className='text-gray-300 hover:text-primary-white cursor-pointer' size={24} />
    </button>
    <button className='flex items-center justify-center outline-none'>
      <MdCalendarMonth className='text-gray-300 hover:text-primary-white cursor-pointer' size={24} />
    </button>
    <button className='flex items-center justify-center outline-none'>
      <MdOutlineNotificationsNone className='text-gray-300 hover:text-primary-white cursor-pointer' size={24} />
    </button>
  </div>
)
