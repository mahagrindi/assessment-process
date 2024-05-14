import '@/styles/main.css'

import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { mr } from '@/utils/class-authority-merge'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  icons: {
    icon: '/assets/logo/ey-logo-black.webp',
  },
}

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang='en'>
      <body className={mr(inter.className, 'overscroll-none overflow-hidden')}>{children}</body>
    </html>
  )
}
