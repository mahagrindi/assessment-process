'use client'

import { type FC, forwardRef, type InputHTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { mr } from '@/utils/class-authority-merge'

const switchVariant = cva(
  'relative flex items-center p-px bg-gray-300 border-transparent text-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:ring-blue-600/30 disabled:opacity-50 disabled:pointer-events-none checked:bg-none checked:text-blue-600/30 checked:border-blue-600/30 before:shadow-sm focus:checked:border-blue-600/30 before:inline-block before:bg-primary-white checked:before:bg-blue-600 before:translate-x-0 checked:before:translate-x-[90%] before:rounded-full before:transform before:ring-0 before:transition before:ease-in-out before:duration-200',
  {
    variants: {
      size: {
        small: 'w-[35px] h-[21px] before:size-4',
        medium: 'w-11 h-6 before:size-5',
        large: 'w-[3.25rem] h-7 before:size-6',
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
        {label && (
          <label htmlFor={label} className={mr('text-sm font-[500] tracking-wide capitalize text-content-display')} style={{ width: width }}>
            <div>
              <span>{label}</span>
              {required && <span className='text-accent-error ml-1 text-sm'>*</span>}
            </div>
            <div>
              <p className='text-xs font-[500] text-content-disabled first-letter:uppercase'>{hint}</p>
            </div>
          </label>
        )}
        <input ref={ref} id={label} type='checkbox' className={mr(switchVariant({ size }))} {...rest} />
      </div>
      {error && <p className='text-xs font-[500] text-accent-error first-letter:uppercase'>{error}</p>}
    </div>
  )
})

Switch.displayName = 'Switch'
