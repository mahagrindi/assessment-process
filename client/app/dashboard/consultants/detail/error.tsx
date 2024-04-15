'use client'

import type { JSX } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/ui/button'

export default function Error({ error }: { error: Error & { digest?: string } }): JSX.Element {
  const { push } = useRouter()

  return (
    <div className='flex flex-col items-center gap-6 w-full max-w-3xl mx-auto bg-primary-white border-[2px] border-gray-200 border-t-[2px] border-t-red-500 p-6 rounded'>
      <div className='w-full'>
        <h2 className='w-full text-2xl text-content-display font-semibold mb-1'>{error.name}</h2>
        <p className='w-full text-base text-accent-error font-[425]' dangerouslySetInnerHTML={{ __html: error.message }} />
        {error.digest && <p className='w-full text-xs text-content-prompt font-[425]'>Error digest: {error.digest}</p>}
      </div>
      <Button
        variant='error'
        title='go back'
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => push('/dashboard/consultants')
        }
        className='w-fit'
      />
    </div>
  )
}
