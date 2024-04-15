import type { JSX } from 'react'
import { Breadcrumb } from '@/ui/breadcrumb'

export default function Page(): JSX.Element {
  return (
    <div className='w-full max-w-[1440px] mx-auto'>
      <p className='text-3xl capitalize font-semibold mb-3'>consultants</p>
      <Breadcrumb />
    </div>
  )
}
