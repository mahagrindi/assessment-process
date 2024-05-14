'use client'

import { type FC, forwardRef, type ReactElement, type SelectHTMLAttributes, useEffect, useState } from 'react'
import { LuCheck, LuChevronDown } from 'react-icons/lu'

import { motion } from 'framer-motion'
import { cva, type VariantProps } from 'class-variance-authority'
import { mr } from '@/utils/class-authority-merge'

const selectVariant = cva('h-full w-full flex items-center px-2 border-[2px] disabled:bg-gray-100 disabled:pointer-events-none rounded outline-none', {
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

interface ComponentProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size' | 'onChange'>, VariantProps<typeof selectVariant> {
  label?: string
  hint?: string
  error?: string
  data: { label: string | ReactElement; value: string }[]
  placeholder?: string | ReactElement
  classname?: string
  multi?: boolean
  value: string
  onChange: (e: string) => void
}

export const DropDown: FC<ComponentProps> = forwardRef<HTMLDivElement, ComponentProps>(
  ({ label, data, hint, error, variant = 'default', size = 'default', required = false, placeholder, classname, multi = false, value, onChange }, ref) => {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedValues, setSelectedValues] = useState<string[]>([]) // Array to hold selected values

    useEffect(() => {
      if (value && !selectedValues.length) {
        const defaultValue = value.split(',')
        const validDefaultValues = defaultValue.filter((val) => data.some((item) => item.value === val))
        setSelectedValues(validDefaultValues)
      }
    }, [value, data, selectedValues])

    const handleSelectOption = (value: string) => {
      // Update selectedValues based on multi-select
      const updatedValues = multi ? (selectedValues.includes(value) ? selectedValues.filter((val) => val !== value) : [...selectedValues, value]) : [value]
      setSelectedValues(updatedValues)

      // Join selected values by a delimiter (e.g., comma) for the search parameter
      const selectedString = updatedValues.join(',')

      onChange(selectedString)

      if (!multi) {
        setIsOpen(!isOpen)
      }
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
          <div className='flex-1 h-full flex justify-between items-center gap-2'>
            <div onClick={() => setIsOpen(!isOpen)} className='flex-1 h-full flex items-center gap-2 cursor-pointer'>
              <div className='flex-1'>
                {selectedValues.length > 0 ? (
                  <div className='flex items-center gap-1'>{selectedValues.length === 1 ? selectedValues.join(',') : `${selectedValues.length} selected`}</div>
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
        {!error && hint && <p className='text-xs font-[500] text-content-disabled first-letter:uppercase'>{hint}</p>}
        {error && <p className='text-xs font-[500] text-accent-error first-letter:uppercase'>{error}</p>}
      </div>
    )
  }
)

DropDown.displayName = 'DropDown'
