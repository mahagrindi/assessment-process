import type { JSX } from 'react'
import { Breadcrumb } from '@/ui/breadcrumb'

export default function Page({ searchParams }: { searchParams: { q: string } }): JSX.Element {
  if (!searchParams.q) {
    throw new Error('No search query provided try adding `<code>?q=...</code>` to the url')
  }

  return (
    <div className='w-full max-w-[1440px] mx-auto'>
      <p className='text-3xl capitalize font-semibold mb-3'>consultants details</p>
      <Breadcrumb />
    </div>
  )
}
