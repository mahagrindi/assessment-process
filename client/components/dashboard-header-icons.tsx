import type { FC, ReactNode } from 'react'

import { MdCalendarMonth, MdOutlineLanguage, MdOutlineNotificationsNone } from 'react-icons/md'
import Link from 'next/link'

export const DashboardHeaderIcons: FC = () => (
  <div className='h-full flex flex-row items-center'>
    {navigation_icons.map((item, index) => (
      <Link
        key={index}
        href={item.href}
        passHref
        className='h-full w-[62px] hover:bg-content-display text-gray-300 hover:text-primary-white cursor-pointer flex items-center justify-center outline-none'>
        {item.icon}
      </Link>
    ))}
  </div>
)

const navigation_icons: { icon: ReactNode; href: string }[] = [
  // language
  { icon: <MdOutlineLanguage size={24} />, href: '/dashboard/language' },
  { icon: <MdOutlineNotificationsNone size={24} />, href: '/dashboard/notifications' },
  { icon: <MdCalendarMonth size={24} />, href: '/dashboard/calendar' },
]
