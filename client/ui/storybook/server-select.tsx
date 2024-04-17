'use client'

import { type FC, forwardRef, type ReactElement, type SelectHTMLAttributes, useState } from 'react'
import { motion } from 'framer-motion'

import { LuChevronDown, LuX } from 'react-icons/lu'
import { mr } from '@/utils/class-authority-merge'
import { cva, type VariantProps } from 'class-variance-authority'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

const selectVariant = cva('h-full flex items-center px-2 border-[2px] disabled:bg-gray-100 disabled:pointer-events-none rounded outline-none', {
  variants: {
    variant: {
      default: 'border-gray-225 text-sm focus:border-gray-500 focus:ring-gray-500',
      success: 'border-accent-success text-sm focus:border-gray-500 focus:ring-gray-500',
    },
    size: {
      default: 'h-10',
      small: 'h-9',
      large: 'h-11',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
})

interface ComponentProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'>, VariantProps<typeof selectVariant> {
  label?: string
  hint?: string
  error?: string
  data: { label: string | ReactElement; value: string }[]
  placeholder?: string | ReactElement
  classname?: string
}

export const ServerSelect: FC<ComponentProps> = forwardRef<HTMLDivElement, ComponentProps>(
  ({ label, data, hint, error, variant = 'default', size = 'default', required = false, placeholder, classname, ...rest }, ref) => {
    const { push } = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const [isOpen, setIsOpen] = useState(false)
    const [selectedValue, setSelectedValue] = useState<string>('')

    const toggleDropdown = () => {
      setIsOpen(!isOpen)
    }

    const handleSelectOption = (value: string) => {
      setSelectedValue(value)

      const updatedSearchParams = new URLSearchParams(searchParams)
      updatedSearchParams.set('sector', value)
      updatedSearchParams.set('page', '1')
      push(`${pathname}?${updatedSearchParams.toString()}`)

      toggleDropdown()
    }

    const clearSelectedValue = () => {
      const updatedSearchParams = new URLSearchParams(searchParams)
      updatedSearchParams.set('sector', '')
      updatedSearchParams.set('page', '1')
      push(`${pathname}?${updatedSearchParams.toString()}`)
      setSelectedValue('')
    }

    return (
      <div ref={ref} className={mr('flex flex-col items-start gap-1 self-stretch select-none relative')}>
        {label && (
          <label htmlFor='select' className='text-sm font-[500] tracking-wide capitalize text-content-prompt'>
            <span>{label}</span>
            {required && <span className='text-accent-error ml-1 text-sm'>*</span>}
          </label>
        )}
        <div className={mr(selectVariant({ variant, size }), classname, isOpen && 'border-gray-500', error && 'border-accent-error focus:border-red-500 focus:ring-red-500')}>
          <div className='flex-1 flex justify-between items-center gap-2'>
            <div className='flex-1 flex items-center gap-2 cursor-pointer' onClick={toggleDropdown}>
              <div className='flex-1'>{selectedValue ? selectedValue : placeholder ? placeholder : 'Select...'}</div>
              <motion.div initial={{ rotate: 0 }} animate={{ rotate: isOpen ? -180 : 0 }} transition={{ type: 'just' }}>
                <LuChevronDown size={16} className='text-content-display' />
              </motion.div>
            </div>
            {selectedValue && ( // Render clear button only if a value is selected
              <button onClick={clearSelectedValue} className='text-sm text-accent-error underline focus:outline-none'>
                <LuX />
              </button>
            )}
          </div>
          {/* Render custom dropdown options */}
          {isOpen && (
            <div className='absolute z-10 top-full left-0 mt-1 w-full max-h-48 overflow-y-auto bg-white rounded shadow-lg bg-primary-white'>
              {data &&
                data.map((item, index) => (
                  <div key={index} className='py-2 px-4 cursor-pointer hover:bg-gray-100 transition-colors' onClick={() => handleSelectOption(item.value)}>
                    {item.label}
                  </div>
                ))}
            </div>
          )}
        </div>
        {!error && hint && <p className='text-xs font-[500] text-content-disabled first-letter:uppercase'>{hint}</p>}
        {error && <p className='text-xs font-[500] text-accent-error first-letter:uppercase'>{error}</p>}
      </div>
    )
  }
)

ServerSelect.displayName = 'ServerSelect'
