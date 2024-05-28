'use client'

import { type FC, forwardRef, type ReactElement, type SelectHTMLAttributes, useEffect, useState } from 'react'
import { LuCheck, LuChevronDown } from 'react-icons/lu'

import { motion } from 'framer-motion'
import { cva, type VariantProps } from 'class-variance-authority'
import { mr } from '@/utils/class-authority-merge'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

const selectVariant = cva('h-full w-full flex items-center px-2 border-[2px] disabled:bg-gray-100 disabled:pointer-events-none rounded outline-none relative', {
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

    useEffect(() => {
      if (!searchParams.get(paramQuery)) {
        setSelectedValues([])
      }
    }, [paramQuery, searchParams])

    return (
      <div ref={ref} onBlur={() => console.log('mouse out')} className={mr('flex flex-col items-start gap-1 self-stretch select-none')}>
        {label && (
          <label htmlFor='select' className='text-sm font-[500] tracking-wide capitalize text-content-prompt'>
            <span>{label}</span>
            {required && <span className='text-accent-error ml-1 text-sm'>*</span>}
          </label>
        )}
        <div className={mr(selectVariant({ variant, size }), classname, isOpen && 'border-gray-500', error && 'border-accent-error focus:border-red-500 focus:ring-red-500')}>
          <div className='flex-1 h-full flex justify-between items-center gap-2'>
            <div onClick={() => setIsOpen(!isOpen)} className='flex-1 h-full flex items-center gap-2 cursor-pointer'>
              <div className='flex-1'>
                {selectedValues.length > 0 ? (
                  <div className='flex items-center gap-1'>
                    {selectedValues.length === 1
                      ? // Find the corresponding label for the selected value
                        data.find((item) => item.value === selectedValues[0])?.label || selectedValues[0]
                      : // Display labels of all selected values
                        selectedValues
                          .map(
                            (value) =>
                              // Find the corresponding label for each selected value
                              data.find((item) => item.value === value)?.label || value
                          )
                          .join(', ')}
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
          </div>
          {/* Render custom dropdown options with icon for selected elements */}
          {isOpen && (
            <div className='absolute z-10 top-full border-[2px] shadow-sm p-2 left-0 mt-1 w-full min-w-fit max-h-[300px] overflow-y-auto rounded-sm bg-primary-white'>
              {data &&
                data.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => handleSelectOption(item.value)}
                    className={mr(
                      'py-2 px-2 flex items-center border-[2px] border-transparent hover:border-gray-200 rounded gap-2 cursor-pointer hover:bg-gray-100 transition-colors capitalize',
                      selectedValues.includes(item.value) ? 'bg-gray-100 border-gray-200' : ''
                    )}>
                    <p className='flex-1 text-sm line-clamp-1'>{item.label}</p>
                    <LuCheck size={16} className={mr(selectedValues.includes(item.value) ? 'text-content-display' : 'text-transparent')} />
                  </div>
                ))}
            </div>
          )}
        </div>
        {isOpen && <div className='absolute top-0 left-0 w-full h-full bg-transparent' onClick={() => setIsOpen(false)} />}
        {!error && hint && <p className='text-xs font-[500] text-content-disabled first-letter:uppercase'>{hint}</p>}
        {error && <p className='text-xs font-[500] text-accent-error first-letter:uppercase'>{error}</p>}
      </div>
    )
  }
)

ServerSelect.displayName = 'ServerSelect'
