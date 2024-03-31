import '@/styles/main.css'

import { ReactNode } from 'react'
import type { Metadata } from 'next'

import { mr } from '@/lib/class-authority-merge'
import { NavBarAuth } from '@/templates/navbar/navbar-auth'
import { FooterAuth } from '@/templates/footer/footer-auth'

export const metadata: Metadata = {
  title: 'EY Auth',
  description: 'Auth page',
}

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <div className={mr('bg-primary-background w-full min-h-screen grid grid-cols-8')}>
      <div className='bg-primary-yellow flex p-6 col-span-2'>
        <NavBarAuth />
      </div>
      <div className='flex flex-col flex-1 p-6 col-span-6'>
        <div className='flex-1'>{children}</div>
        <div>
          <FooterAuth />
        </div>
      </div>
    </div>
  )
}
