'use client'

import type { JSX } from 'react'
import { useAuth } from '@/provider/user-provider'

export default function Page(): JSX.Element {
  const { user } = useAuth()

  return (
    <div className='h-full min-h-full w-full flex flex-col'>
      <div className='mb-3'>
        <p className='text-2xl capitalize font-semibold'>security</p>
        <p className='text-sm first-letter:capitalize mt-1 text-content-prompt'>Manage your account settings and your preferences.</p>
      </div>

      <div>{JSON.stringify(user.firstName)}</div>
      <div>{JSON.stringify(user.lastName)}</div>
      <div>{JSON.stringify(user.middleName)}</div>
      <div>{JSON.stringify(user.profileImage)}</div>
      <div>{JSON.stringify(user.phoneNumber)}</div>
    </div>
  )
}
