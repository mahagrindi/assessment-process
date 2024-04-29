'use client'

import { type FC, forwardRef, type ReactElement, type SelectHTMLAttributes, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { LuCheck, LuChevronDown, LuX } from 'react-icons/lu'
import { mr } from '@/utils/class-authority-merge'
import { cva, type VariantProps } from 'class-variance-authority'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Chip } from '@/ui/chip'

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
  multi?: boolean
  paramQuery?: string
}

export const ServerSelect: FC<ComponentProps> = forwardRef<HTMLDivElement, ComponentProps>(
  ({ label, data, hint, error, variant = 'default', size = 'default', required = false, placeholder, classname, multi = false, paramQuery = 'selection' }, ref) => {
    const { push } = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const [isOpen, setIsOpen] = useState(false)
    const [selectedValues, setSelectedValues] = useState<string[]>([]) // Array to hold selected values

    // Add useEffect to handle initial selection preservation
    useEffect(() => {
      const urlSearchParams = new URLSearchParams(window.location.search)
      const selectedParam = urlSearchParams.get(paramQuery)
      if (selectedParam) {
        // Split the parameter string by comma to get individual selected values
        const selectedValuesFromParam = selectedParam.split(',')
        setSelectedValues(selectedValuesFromParam)
      }
    }, [paramQuery])

    const handleSelectOption = (value: string) => {
      // Update selectedValues based on multi-select
      const updatedValues = multi ? (selectedValues.includes(value) ? selectedValues.filter((val) => val !== value) : [...selectedValues, value]) : [value]
      setSelectedValues(updatedValues)

      // Join selected values by a delimiter (e.g., comma) for the search parameter
      const selectedString = updatedValues.join(',')

      const updatedSearchParams = new URLSearchParams(searchParams)
      updatedSearchParams.set(paramQuery, selectedString)
      updatedSearchParams.set('page', '1')
      push(`${pathname}?${updatedSearchParams.toString()}`)

      // Close dropdown if not multi-select
      if (!multi) {
        setIsOpen(!isOpen)
      }
    }

    const clearSelectedValue = () => {
      const updatedSearchParams = new URLSearchParams(searchParams)
      updatedSearchParams.set(paramQuery, '')
      updatedSearchParams.set('page', '1')
      push(`${pathname}?${updatedSearchParams.toString()}`)
      setSelectedValues([])
    }

    const dropdownRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
      const handleOutsideClick = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
          setIsOpen(false)
        }
      }

      if (isOpen) {
        document.addEventListener('mousedown', handleOutsideClick)
      } else {
        document.removeEventListener('mousedown', handleOutsideClick)
      }

      return () => {
        document.removeEventListener('mousedown', handleOutsideClick)
      }
    }, [isOpen])

    return (
      <div ref={ref} className={mr('flex flex-col items-start gap-1 self-stretch select-none relative')}>
        {label && (
          <label htmlFor='select' className='text-sm font-[500] tracking-wide capitalize text-content-prompt'>
            <span>{label}</span>
            {required && <span className='text-accent-error ml-1 text-sm'>*</span>}
          </label>
        )}
        <div className={mr(selectVariant({ variant, size }), classname, isOpen && 'border-gray-500', error && 'border-accent-error focus:border-red-500 focus:ring-red-500')}>
          <div className='flex-1 h-full flex justify-between items-center gap-2'>
            <div className='flex-1 h-full flex items-center gap-2 cursor-pointer' onClick={() => setIsOpen(!isOpen)}>
              <div className='flex-1'>
                {selectedValues.length > 0 ? (
                  <div className='flex items-center gap-1'>
                    {selectedValues.length === 1 ? selectedValues.join(',') : selectedValues.map((el, index) => <Chip key={index} size='small' title={el} />)}
                  </div>
                ) : placeholder ? (
                  placeholder
                ) : (
                  'Select...'
                )}
              </div>
              <motion.div initial={{ rotate: 0 }} animate={{ rotate: isOpen ? -180 : 0 }} transition={{ type: 'just' }}>
                <LuChevronDown size={16} className='text-content-display' />
              </motion.div>
            </div>
            {selectedValues.length > 0 && ( // Render clear button only if a value is selected
              <button onClick={clearSelectedValue} className='text-sm text-accent-error underline focus:outline-none'>
                <LuX />
              </button>
            )}
          </div>
          {/* Render custom dropdown options with icon for selected elements */}
          {isOpen && (
            <div ref={dropdownRef} className='absolute z-10 top-full left-0 mt-1 w-full max-h-48 overflow-y-auto bg-white rounded-sm shadow-lg bg-primary-white'>
              {data &&
                data.map((item, index) => (
                  <div key={index} className='py-2 px-4 flex items-center gap-2 cursor-pointer hover:bg-gray-100 transition-colors capitalize' onClick={() => handleSelectOption(item.value)}>
                    <p className='flex-1 text-sm'>{item.label}</p>
                    <LuCheck size={16} className={mr(selectedValues.includes(item.value) ? 'text-content-display' : 'text-transparent')} />
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
