'use client'

import type { FC } from 'react'

import { usePathname } from 'next/navigation'

import { Linker } from '@/ui/link'

export const SettingSidebar: FC = () => {
  const pathname: string = usePathname()

  return (
    <div className='flex-1 max-w-[300px] flex flex-col   gap-1'>
      {items.map((path, index) => (
        <Linker key={index} href={path.path} title={path.name} className='justify-start' variant={pathname === path.path ? 'link' : 'ghost'} size={'large'} />
      ))}
    </div>
  )
}

const items: { name: string; path: string }[] = [
  { name: 'account', path: '/dashboard/settings' },
  { name: 'security', path: '/dashboard/settings/security' },
  // { name: 'notifications', path: '/dashboard/settings/notifications' },
  { name: 'integrations', path: '/dashboard/settings/integrations' },
  { name: 'sourcing', path: '/dashboard/settings/sourcing' },
]
