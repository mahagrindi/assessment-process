import type { JSX } from 'react'

import { Calendar } from '@/components/calendar'

export default function Page(): JSX.Element {
  return (
    <div className='h-full max-h-full w-full'>
      <Calendar />
    </div>
  )
}
