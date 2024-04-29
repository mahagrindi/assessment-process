'use client'

import { type FC, forwardRef, type InputHTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { mr } from '@/utils/class-authority-merge'

const switchVariant = cva(
  'relative flex items-center justify-start bg-primary-white border-gray-300 focus:ring-content-display text-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 checked:focus:border-accent-success before:border before:border-gray-500 before:bg-gray-300 before:rounded-full before:transform before:transition before:ease-in-out before:duration-200 before:ring-0 before:focus:outline-none before:focus:ring-0 checked:bg-none checked:border-accent-success checked:before:bg-accent-success checked: checked:text-green-200 disabled:bg-gray-100 disabled:border-gray-225 disabled:before:border-gray-300 disabled:checked:text-gray-100 disabled:checked:before:bg-green-400 disabled:before:cursor-not-allowed',
  {
    variants: {
      size: {
        small: 'w-8 h-4 before:size-[18px] before:translate-x-[-25%] checked:before:translate-x-[90%]',
        medium: 'w-10 h-5 before:size-[24px] before:translate-x-[-25%] checked:before:translate-x-[85%]',
        large: 'w-12 h-6 before:size-[32px] before:translate-x-[-25%] checked:before:translate-x-[70%]',
      },
    },
    defaultVariants: {
      size: 'medium',
    },
  }
)

interface ComponentProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>, VariantProps<typeof switchVariant> {
  label: string
  hint?: string
  error?: string
  width?: number
}

export const Switch: FC<ComponentProps> = forwardRef<HTMLInputElement, ComponentProps>(({ size = 'small', width, label, value, hint, error, required = false, hidden = false, ...rest }, ref) => {
  return (
    <div className='flex flex-col items-start gap-1 self-stretch'>
      <div className='flex items-center gap-6'>
        <label htmlFor={label} className={mr('txt-sm font-[500] tracking-wide capitalize text-content-prompt')} style={{ width: width }}>
          <div>
            <span>{label}</span>
            {required && <span className='text-accent-error ml-1 text-sm'>*</span>}
          </div>
          <div>
            <p className='text-xs font-[500] text-content-disabled first-letter:uppercase'>{hint}</p>
          </div>
        </label>
        <input ref={ref} id={label} type='checkbox' className={mr(switchVariant({ size }))} {...rest} />
      </div>
      {error && <p className='text-xs font-[500] text-accent-error first-letter:uppercase'>{error}</p>}
    </div>
  )
})

Switch.displayName = 'Switch'
