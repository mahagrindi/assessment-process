'use client'

import type { FC, ReactElement } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { VerticalNavigation } from '@/ui/vertical-navigation'
import { MdOutlineAccountTree, MdOutlineAssignment, MdOutlineBolt, MdOutlineFolderCopy, MdOutlineLink, MdOutlinePeopleAlt, MdOutlineStackedLineChart } from 'react-icons/md'

const sidebarItems: { title: string; path: string; icon: ReactElement; scroll: boolean; subMenu?: { title: string; path: string }[] }[] = [
  { title: 'dashboard', path: '/dashboard', scroll: false, icon: <MdOutlineStackedLineChart size={24} /> },
  { title: 'activities', path: '/dashboard/activities', scroll: false, icon: <MdOutlineBolt size={24} /> },
  {
    title: 'programs',
    path: '/dashboard/programs',
    scroll: true,
    icon: <MdOutlineFolderCopy size={24} />,
    subMenu: [
      { title: 'overview', path: '/dashboard/programs' },
      { title: 'cohorts', path: '/dashboard/programs/cohorts' },
      { title: 'assessments', path: '/dashboard/programs/assessments' },
    ],
  },
  { title: 'startups', path: '/dashboard/startups', scroll: false, icon: <MdOutlineLink size={24} /> },
  {
    title: 'axes',
    path: '/dashboard/axes',
    scroll: true,
    icon: <MdOutlineAccountTree size={24} />,
    subMenu: [
      { title: 'overview', path: '/dashboard/axes' },
      { title: 'categories', path: '/dashboard/axes/categories' },
    ],
  },
  { title: 'consultants', path: '/dashboard/consultants', scroll: false, icon: <MdOutlinePeopleAlt size={24} /> },
  { title: 'evaluations', path: '/dashboard/evaluations', scroll: false, icon: <MdOutlineAssignment size={24} /> },
]

export const DashboardSidebar: FC = () => {
  const { push } = useRouter()
  const pathname: string = usePathname()

  return (
    <>
      {sidebarItems.map((item, index: number) => (
        <VerticalNavigation
          key={index}
          icon={item.icon}
          title={item.title}
          subMenu={item.subMenu}
          haveSubmenu={item.scroll}
          onClick={() => push(item.path)}
          active={item.path === '/dashboard' ? pathname === '/dashboard' : pathname.includes(item.path)}
        />
      ))}
    </>
  )
}
