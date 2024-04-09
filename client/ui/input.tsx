import React, { FC, forwardRef, InputHTMLAttributes } from 'react'

import { mr } from '@/utils/class-authority-merge'
import { cva, type VariantProps } from 'class-variance-authority'

const inputVariant = cva('px-2 disabled:bg-gray-100 disabled:pointer-events-none rounded outline-none', {
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

interface ComponentProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>, VariantProps<typeof inputVariant> {
  label: string
  hint?: string
  error?: string
}

export const Input: FC<ComponentProps> = forwardRef<HTMLInputElement, ComponentProps>(
  ({ label, type = 'text', hint, error, variant = 'default', size = 'default', required = false, ...rest }, ref) => (
    <div className='flex flex-col items-start gap-1 self-stretch'>
      {label && (
        <label htmlFor={label} className='text-sm font-[500] tracking-wide capitalize text-content-prompt'>
          <span>{label}</span>
          {required && <span className='text-accent-error ml-1 text-sm'>*</span>}
        </label>
      )}
      <input
        ref={ref}
        id={label}
        type={type}
        className={mr(inputVariant({ variant, size }), error && 'border border-accent-error focus:border-red-500 focus:ring-red-500')}
        autoComplete='no'
        {...rest}
      />
      {!error && hint && <p className='text-xs font-[500] text-content-disabled first-letter:uppercase'>{hint}</p>}
      {error && <p className='text-xs font-[500] text-accent-error first-letter:uppercase'>{error}</p>}
    </div>
  )
)

Input.displayName = 'Input'
