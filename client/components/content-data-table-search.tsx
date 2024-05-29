'use client'

import { type ChangeEvent, type FC, useEffect, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { LuSearch } from 'react-icons/lu'
import { mr } from '@/utils/class-authority-merge'

interface ComponentProps {
  placeholder: string
  className?: string
  value?: string
}

export const SearchInput: FC<ComponentProps> = ({ placeholder, className }) => {
  // TODO: Implement search functionality with debounce to avoid throttle
  const [search, setSearchValue] = useState<string>()

  const { push } = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newSearchValue = e.target.value
    setSearchValue(newSearchValue)

    const updatedSearchParams = new URLSearchParams(searchParams)
    updatedSearchParams.set('query', newSearchValue)
    updatedSearchParams.set('page', '1')
    push(`${pathname}?${updatedSearchParams.toString()}`)
  }

  // Reset input value if query param is empty
  useEffect(() => {
    if (!searchParams.get('query')) {
      setSearchValue('')
    }
  }, [searchParams])

  return (
    <div className={mr('w-full flex-1 flex items-center px-2 h-10 border-[2px] text-gray-400 focus-within:border-content-display rounded border-primary-border text-sm outline-none', className)}>
      <LuSearch size={20} className='flex' />
      <input
        type='text'
        placeholder={placeholder}
        value={search}
        className='w-full h-full leading-6 select-none px-2 border-none outline-none placeholder:capitalize placeholder:text-gray-400 focus:outline-none focus:ring-0'
        onChange={handleInputChange}
      />
    </div>
  )
}
