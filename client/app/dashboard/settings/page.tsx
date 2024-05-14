import { Information } from '@/components/Profile/profile-general-information'
import type { JSX } from 'react'

export default function Page(): JSX.Element {
  return (
    <div className='h-full min-h-full w-full flex flex-col'>
      <div className='mb-3'>
        <p className='text-2xl capitalize font-semibold'>account</p>
        <p className='text-sm first-letter:capitalize mt-1 text-content-prompt'>Manage your account settings and your preferences.</p>

        <Information />
      </div>
    </div>
  )
}
