import type { JSX } from 'react'

import { SourcingCronJob } from '@/components/sourcing-cron-job'
import { SourcingRequestContent } from '@/components/sourcing-request-content'

export default function Page(): JSX.Element {
  // TODO: Implement the following: - Should include the scrapper flask api to our application
  return (
    <div className='h-full min-h-full w-full flex flex-col'>
      <div className='mb-3'>
        <p className='text-2xl capitalize font-semibold'>sourcing</p>
        <p className='text-sm first-letter:capitalize mt-1 text-content-prompt'>update your startup sourcing settings here.</p>
      </div>
      <div className='flex flex-col gap-4 mt-6'>
        <SourcingCronJob />
        <SourcingRequestContent />
      </div>
    </div>
  )
}
