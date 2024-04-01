import type { JSX } from 'react'

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
          <Input type='password' label={'password'} />
        </div>
        <div className='w-full'>
          <Button title={'EY button'} />
        </div>
      </div>
    </div>
  )
}
