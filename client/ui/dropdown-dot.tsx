// components/Dropdown.tsx
import React, { useState, useEffect, useRef } from 'react'
import { LuShare2, LuCopyPlus, LuEye, LuPenSquare } from 'react-icons/lu'
import { CreateCpoie } from '@/lib/actions/evaluation-server-action'
import { revalidatePath } from 'next/cache'
interface Props {
  id: string
}
const DropdownDot: React.FC<Props> = ({ id }) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleCreateCopies = async () => {
    try {
      await CreateCpoie(id)
      revalidatePath('/dashboard/evaluations')
    } catch (error) {
      console.error('Failed to create copies:', error)
      // Handle error, show user feedback, etc.
    }
  }

  return (
    <div className='relative inline-block text-left' ref={dropdownRef}>
      <button
        type='button'
        className='inline-flex justify-center w-full     bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none'
        id='menu-button'
        aria-expanded={isOpen}
        aria-haspopup='true'
        onClick={toggleDropdown}>
        <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 6v.01M12 12v.01M12 18v.01'></path>
        </svg>
      </button>

      <div
        className={`absolute   -right-2    top-8  bg-primary-white border    mt-2 w-56      transition-all duration-200 ease-in-out ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}
        role='menu'
        aria-orientation='vertical'
        aria-labelledby='menu-button'>
        <div className='py-1 grid grid-cols-1  divide-y ' role='none'>
          <a href='#' className='flex flex-row text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100' role='menuitem'>
            <LuEye className='m-1 mt-2 ' />

            <p className='m-1  '> Detail </p>
          </a>
          <a href={`/dashboard/evaluations/edit?id=${id}`} className='flex flex-row text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100' role='menuitem'>
            <LuPenSquare className='m-1 mt-2 ' />

            <p className='m-1  '> Edit </p>
          </a>
          <a href='#' className='flex flex-row text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100' role='menuitem'>
            <LuShare2 className='m-1 mt-2 ' />
            <p className='m-1  '> Shear</p>
          </a>
          <a onClick={() => handleCreateCopies()} className='flex flex-row text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100' role='menuitem'>
            <LuCopyPlus className='m-1 mt-2 ' />
            <p className='m-1  '> Create Copies </p>
          </a>
        </div>
      </div>
    </div>
  )
}

export default DropdownDot
