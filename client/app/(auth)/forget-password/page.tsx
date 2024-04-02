import type { JSX } from 'react'
import Link from 'next/link'

import { Input } from '@/ui/input'
import { Button } from '@/ui/button'

export default function Page(): JSX.Element {
  return (
    <div className='w-full h-full flex items-center justify-center'>
      <div className='w-full max-w-sm flex flex-col gap-8'>
        <div className='grid gap-1'>
          <h1 className='w-full text-center text-3xl text-content-display font-[600] capitalize'>Reset Password</h1>
          <p className='w-full text-center text-sm text-content-prompt'>Enter your work email to receive an email confirming you password reset.</p>
        </div>
        <div className='w-full grid gap-4'>
          <div className='w-full flex flex-col gap-1'>
            <Input type='email' label={'work email'} />
            <Link href={'/'} passHref className='text-sm text-accent-link font-[500] capitalize flex-1 text-end'>
              login instead!
            </Link>
          </div>
        </div>
        <div className='w-full'>
          <Button title={'Request New Password'} />
        </div>
      </div>
    </div>
  )
}
