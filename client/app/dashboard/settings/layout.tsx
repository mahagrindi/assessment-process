import type { ReactNode } from 'react'

import { ContentHeader } from '@/components/content-header'
import { SettingSidebar } from '@/components/setting-sidebar'

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <div className='h-full min-h-full w-full flex flex-col'>
      <ContentHeader title={'Settings'} />
      <hr className='border-primary-contrast border-t-2 mx-6' />
      <div className='flex-1 bg-primary-background p-6 overflow-x-hidden overflow-y-auto flex items-start gap-6'>
        <SettingSidebar />
        <div className='flex-1 w-full h-full'>{children}</div>
      </div>
    </div>
  )
}
