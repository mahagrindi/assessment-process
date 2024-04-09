import '@/styles/main.css'

import { ReactNode } from 'react'
import type { Metadata } from 'next'

import Image from 'next/image'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { BoxesCore } from '@/ui/storybook/boxes-core'
import { mr } from '@/utils/class-authority-merge'
import { AuthFooter } from '@/components/auth-footer'

export const metadata: Metadata = {
  title: 'EY Auth',
  description: 'Auth page',
}

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  if (cookies().get('token')) {
    redirect('/dashboard')
  }

  return (
    <div className={mr('bg-primary-background w-full min-h-screen grid grid-cols-8')}>
      <div className='bg-primary-black flex items-center justify-center p-6 col-span-4 relative overflow-hidden'>
        <BoxesCore />
        <div className='absolute bg-gradient-to-br from-transparent to-primary-black inset-0 w-full h-full flex items-center justify-center z-20 pointer-events-none'>
          <Image src='/assets/logo/ey-logo-white.png' width={175} height={200} alt={'logo auth logo'} priority />
        </div>
      </div>
      <div className='flex flex-col flex-1 p-6 col-span-4 gap-6'>
        <div className='flex-1'>{children}</div>
        <div>
          <AuthFooter />
        </div>
      </div>
    </div>
  )
}
