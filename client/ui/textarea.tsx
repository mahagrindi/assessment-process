import { type FC, forwardRef, type TextareaHTMLAttributes } from 'react'

import { mr } from '@/utils/class-authority-merge'
import { cva, type VariantProps } from 'class-variance-authority'

const textAreaVariant = cva('px-2 border-[2px] disabled:bg-gray-100 disabled:pointer-events-none rounded outline-none', {
  variants: {
    variant: {
      default: 'w-full border-primary-border text-sm focus:border-gray-500 focus:ring-gray-500',
      success: 'w-full border-accent-success text-sm focus:border-gray-500 focus:ring-gray-500',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

interface ComponentProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'>, VariantProps<typeof textAreaVariant> {
  label?: string
  hint?: string
  error?: string
}

export const TextArea: FC<ComponentProps> = forwardRef<HTMLTextAreaElement, ComponentProps>(({ label, hint, error, variant = 'default', required = false, ...rest }, ref) => (
  <div className='flex flex-col items-start gap-1 self-stretch'>
    {label && (
      <label htmlFor={label} className='text-sm font-[500] tracking-wide capitalize text-content-prompt'>
        <span>{label}</span>
        {required && <span className='text-accent-error ml-1 text-sm'>*</span>}
      </label>
    )}
    <textarea
      id={label}
      ref={ref}
      className={mr(textAreaVariant({ variant }), error && 'border-[2px] border-accent-error focus:border-red-500 focus:ring-red-500')}
      autoComplete='no'
      rows={5}
      {...rest}
    />
    {!error && hint && <p className='text-xs font-[500] text-content-disabled first-letter:uppercase'>{hint}</p>}
    {error && <p className='text-xs font-[500] text-accent-error first-letter:uppercase'>{error}</p>}
  </div>
))

TextArea.displayName = 'TextArea'
