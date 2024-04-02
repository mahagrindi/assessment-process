import type { JSX } from 'react'
import Link from 'next/link'

import { Button } from '@/ui/button'
import { Input } from '@/ui/input'

export default function Page(): JSX.Element {
  return (
    <div className='w-full h-full flex items-center justify-center'>
      <div className='w-full max-w-sm flex flex-col gap-8'>
        <div className='grid gap-1'>
          <h1 className='w-full text-center text-3xl text-content-display font-[600] capitalize'>sign in</h1>
          <p className='w-full text-center text-sm text-content-prompt'>Sign in to access the dashboard.</p>
        </div>
        <div className='w-full grid gap-4'>
          <Input type='email' label={'work email'} />
          <div className='w-full flex flex-col gap-1'>
            <Input type='password' label={'password'} />
            <Link href={'/forget-password'} passHref className='text-sm text-accent-link font-[500] capitalize flex-1 text-end'>
              reset password?
            </Link>
          </div>
        </div>
        <div className='w-full'>
          <Button title={'sign in'} />
        </div>
      </div>
    </div>
  )
}
