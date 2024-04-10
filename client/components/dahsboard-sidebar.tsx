'use client'

import type { FC, ReactElement } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { VerticalNavigation } from '@/ui/vertical-navigation'
import { MdOutlineStackedLineChart, MdOutlineFolderCopy, MdOutlinePeopleAlt, MdOutlineLink } from 'react-icons/md'

const sidebarItems: { title: string; path: string; icon: ReactElement; scroll: boolean }[] = [
  { title: 'overview', path: '/dashboard', scroll: false, icon: <MdOutlineStackedLineChart size={24} /> },
  { title: 'programs', path: '/dashboard/programs', scroll: true, icon: <MdOutlineFolderCopy size={24} /> },
  { title: 'consultants', path: '/dashboard/consultants', scroll: false, icon: <MdOutlinePeopleAlt size={24} /> },
  { title: 'startups', path: '/dashboard/startups', scroll: false, icon: <MdOutlineLink size={24} /> },
  { title: 'Form Builder', path: '/dashboard/form-bulider', scroll: false, icon: <MdOutlineLink size={24} /> },
]

export const DashboardSidebar: FC = () => {
  const { push } = useRouter()
  const pathname: string = usePathname()

  return (
    <>
      {sidebarItems.map((item, index: number) => (
        <VerticalNavigation key={index} title={item.title} icon={item.icon} haveSubmenu={item.scroll} active={pathname.includes(item.path)} onClick={() => push(item.path)} />
      ))}
    </>
  )
}
