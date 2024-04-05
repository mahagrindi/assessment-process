'use client'

import type { FC, InputHTMLAttributes } from 'react'

import { mr } from '@/utils/class-authority-merge'
import { cva, type VariantProps } from 'class-variance-authority'

const inputVariant = cva('px-2 disabled:bg-gray-100 disabled:pointer-events-none rounded outline-none', {
  variants: {
    variant: {
      default: 'w-full border-primary-border text-sm focus:border-gray-500 focus:ring-gray-500',
      error: 'w-full border-accent-error text-sm focus:border-gray-500 focus:ring-gray-500',
      success: 'w-full border-accent-success text-sm focus:border-gray-500 focus:ring-gray-500',
    },
    size: {
      default: 'h-[40px]',
      small: 'h-[60px]',
      large: 'h-[100px]',
    },
  },
  defaultVariants: {},
})

interface ComponentProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>, VariantProps<typeof inputVariant> {
  label: string
  hint?: string
  error?: string
}

export const Textarea: FC<ComponentProps> = ({ label, type = 'text', hint, error, variant = 'default', size = 'default', required = false, ...rest }) => (
  <div className='flex flex-col items-start gap-1 self-stretch'>
      {label && (
      <label htmlFor={label} className='text-sm font-[500] tracking-wide capitalize text-content-prompt'>
        <span>{label}</span>
        {required && <span className='text-accent-error ml-1 text-sm'>*</span>}
      </label>
    )}
               <textarea
              className={mr(inputVariant({ variant, size }))} 
              placeholder={label}
              name="pub"
              id="pub"
             
            ></textarea>

  </div>
)

Textarea.displayName = 'Textarea'
