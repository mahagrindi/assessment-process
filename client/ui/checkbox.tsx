'use client'

import { type FC, forwardRef, type InputHTMLAttributes } from 'react'
import { cva, VariantProps } from 'class-variance-authority'
import { mr } from '@/utils/class-authority-merge'

const checkboxVariant = cva('border-primary-border rounded-sm text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none', {
  variants: {
    size: {
      small: 'p-[6px]',
      medium: 'p-[10px]',
      large: 'p-[12px]',
    },
  },
  defaultVariants: {
    size: 'medium',
  },
})

interface ComponentProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>, VariantProps<typeof checkboxVariant> {
  label: string
  hint?: string
  error?: string
  width?: number
}

export const Checkbox: FC<ComponentProps> = forwardRef<HTMLInputElement, ComponentProps>(({ size = 'medium', width, label, value, hint, error, required = false, hidden = false, ...rest }, ref) => {
  return (
    <div className='flex flex-col items-start gap-1 self-stretch'>
      <div className='flex items-center gap-6'>
        <label htmlFor={label} className={mr('text-sm font-[500] capitalize text-content-display')} style={{ width: width }}>
          <div>
            <span>{label}</span>
            {required && <span className='text-accent-error ml-1 text-sm'>*</span>}
          </div>
          <div>
            <p className='text-xs font-[500] text-content-disabled first-letter:uppercase'>{hint}</p>
          </div>
        </label>
        <input ref={ref} id={label} type='checkbox' className={mr(checkboxVariant({ size }))} {...rest} />
      </div>
      {error && <p className='text-xs font-[500] text-accent-error first-letter:uppercase'>{error}</p>}
    </div>
  )
})

Checkbox.displayName = 'Checkbox'
