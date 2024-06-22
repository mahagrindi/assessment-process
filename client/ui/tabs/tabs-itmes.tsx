'use client'
import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { mr } from '@/utils/class-authority-merge'

import { useRouter } from 'next/router'
import { identify } from '@/lib/actions/current-user-action'

export default function TabItem({ href  ,children }: Readonly<{ href: string  , children: ReactNode }>) {
     const router = useRouter()

  return (
    <li>
      <a
       
       href={href}
        className={`flex justify-center border-b-4 border-transparent hover:text-indigo-600 hover:border-indigo-600 py-4 ${
          router.asPath === href ? 'text-indigo-600 border-indigo-600' : 'text-gray-500'
        }`}
      >
        {children}
      </a>
    </li>
  )
}