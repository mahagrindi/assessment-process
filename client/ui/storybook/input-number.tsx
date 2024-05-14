'use client'

import { type FC, forwardRef, type InputHTMLAttributes, useEffect, useState } from 'react'
import { HiMinus, HiPlus } from 'react-icons/hi2'

import { mr } from '@/utils/class-authority-merge'
import { cva, type VariantProps } from 'class-variance-authority'

const inputNumberVariant = cva('px-2 flex items-center border-[2px] disabled:bg-gray-100 disabled:pointer-events-none rounded outline-none', {
  variants: {
    variant: {
      default: 'w-full border-primary-border text-sm focus:border-gray-500 focus:ring-gray-500',
      success: 'w-full border-accent-success text-sm focus:border-gray-500 focus:ring-gray-500',
    },
    size: {
      default: 'h-10',
      small: 'h-8',
      large: 'h-12',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
})

interface ComponentProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange'>, VariantProps<typeof inputNumberVariant> {
  value?: number
  min?: number
  max?: number
  label?: string
  hint?: string
  error?: string
  onChange: (value: string) => void
}

export const InputNumber: FC<ComponentProps> = forwardRef<HTMLInputElement, ComponentProps>(
  ({ variant = 'default', size = 'default', value: initialValue = 1, min = 1, max = 100, label, hint, error, required = false, onChange, ...rest }, ref) => {
    const [value, setValue] = useState(initialValue)

    useEffect(() => {
      onChange(value.toString())
    }, [value]) // eslint-disable-line react-hooks/exhaustive-deps

    return (
      <div className='flex flex-col items-start gap-1 self-stretch'>
        {label && (
          <label htmlFor={label} className='text-sm font-[500] tracking-wide capitalize text-content-prompt'>
            <span>{label}</span>
            {required && <span className='text-accent-error ml-1 text-sm'>*</span>}
          </label>
        )}
        <div className={mr(inputNumberVariant({ variant, size }), error && 'border-[2px] border-accent-error focus:border-red-500 focus:ring-red-500')}>
          <div className='w-full flex justify-between items-center gap-x-3'>
            <div>
              <input ref={ref} id={label} className='p-0 bg-transparent border-0 text-gray-800 focus:ring-0' type='number' readOnly value={value} {...rest} />
            </div>
            <div className='flex justify-end items-center gap-x-1.5'>
              <button
                onClick={() => {
                  if (value > min) {
                    setValue((prevValue) => prevValue - 1)
                  }
                }}
                className={`size-6 flex justify-center items-center text-sm font-medium rounded-full border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 ${
                  value === min ? 'disabled:opacity-50 disabled:pointer-events-none' : ''
                }`}
                disabled={value === min}>
                <HiMinus strokeWidth={1} strokeLinejoin={'round'} strokeLinecap={'round'} className='flex' />
              </button>
              <button
                type='button'
                onClick={() => {
                  if (value < max) {
                    setValue((prevValue) => prevValue + 1)
                  }
                }}
                className={`size-6 flex justify-center items-center text-sm font-medium rounded-full border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 ${
                  value === max ? 'disabled:opacity-50 disabled:pointer-events-none' : ''
                }`}
                disabled={value === max}>
                <HiPlus strokeWidth={1} strokeLinejoin={'round'} strokeLinecap={'round'} className='flex' />
              </button>
            </div>
          </div>
        </div>
        {hint && <p className='text-xs font-[500] text-content-disabled first-letter:uppercase'>{hint}</p>}
        {error && <p className='text-xs font-[500] text-accent-error first-letter:uppercase'>{error}</p>}
      </div>
    )
  }
)

InputNumber.displayName = 'InputNumber'
