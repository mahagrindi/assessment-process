'use client'

import { type FC } from 'react'
import { HiXMark } from 'react-icons/hi2'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

interface ComponentProps {
  filter: { name: string; option: string }[]
}

export const FilterOptions: FC<ComponentProps> = ({ filter }) => {
  const { push } = useRouter()
  const pathname: string = usePathname()
  const searchParams = useSearchParams()

  const updateSearchParams = (key: string) => {
    const params = new URLSearchParams(searchParams)
    params.delete(key) // Remove the key from search parameters
    push(`${pathname}?${params.toString()}`)
  }

  return (
    <div className='flex items-center gap-2'>
      {filter.map(
        (f: { name: string; option: string }, index: number) =>
          f.option && (
            <div key={index} className='flex items-center gap-2 rounded bg-primary-white border-[2px] border-primary-border py-1 px-[6px] shadow-sm'>
              <div className='flex items-center gap-1'>
                <p className='text-[15px] font-medium capitalize'>{f.name}:</p>
                <p className='text-[15px] font-medium capitalize text-content-disabled'>{f.option.toLowerCase()}</p>
              </div>
              <HiXMark size={20} strokeWidth={1} strokeLinejoin={'round'} strokeLinecap={'round'} className='flex cursor-pointer text-accent-error' onClick={() => updateSearchParams(f.name)} />
            </div>
          )
      )}
    </div>
  )
}
