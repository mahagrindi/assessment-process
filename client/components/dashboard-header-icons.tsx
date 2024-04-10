import type { FC, ReactNode } from 'react'

import { MdCalendarMonth, MdOutlineNotificationsNone, MdOutlineSettings } from 'react-icons/md'
import Link from 'next/link'

export const DashboardHeaderIcons: FC = () => (
  <div className='h-full flex flex-row-reverse items-center gap-6'>
    {navigation_icons.map((item, index) => (
      <Link key={index} href={item.href} passHref className='flex items-center justify-center outline-none'>
        {item.icon}
      </Link>
    ))}
  </div>
)

const navigation_icons: { icon: ReactNode; href: string }[] = [
  { icon: <MdOutlineSettings className='text-gray-300 hover:text-primary-white cursor-pointer' size={24} />, href: '/dashboard/settings' },
  { icon: <MdCalendarMonth className='text-gray-300 hover:text-primary-white cursor-pointer' size={24} />, href: '/dashboard/calendar' },
  { icon: <MdOutlineNotificationsNone className='text-gray-300 hover:text-primary-white cursor-pointer' size={24} />, href: '/dashboard/notifications' },
]
