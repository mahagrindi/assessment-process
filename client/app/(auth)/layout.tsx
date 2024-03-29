import '@/styles/main.css'

import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { Inter } from 'next/font/google'

import { mr } from '@/lib/class-authority-merge'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'EY Evaluation Login',
  description: 'EY Evaluation login page',
}

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang='en'>
      <body className={mr(inter.className)}>{children}</body>
    </html>
  )
}
