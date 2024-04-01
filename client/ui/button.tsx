import type { FC, ButtonHTMLAttributes } from 'react'

import { mr } from '@/utils/class-authority-merge'
import { cva, type VariantProps } from 'class-variance-authority'

const buttonVariant = cva(
  'w-full flex items-center justify-center border border-content-display pointer-cursor disabled:bg-gray-200 disabled:border-gray-200 disabled:text-content-disabled disabled:pointer-events-none rounded',
  {
    variants: {
      variant: {
        default: 'bg-primary-yellow text-primary-background text-content-display hover:bg-primary-black hover:text-primary-white',
        primary: 'bg-content-display text-primary-white hover:bg-primary-white hover:text-content-display',
        secondary: 'bg-primary-white text-content-display hover:bg-primary-black hover:text-primary-white',
        link: 'text-accent-link border border-transparent hover:text-blue-500 hover:bg-gray-200',
        ghost: 'bg-transparent border border-transparent text-content-display hover:bg-gray-200',
        error: 'bg-accent-error border border-accent-error text-primary-white hover:bg-red-500',
      },
      size: {
        default: 'h-[40px] px-8',
        small: 'h-[32px] px-6',
        large: 'h-[48px] px-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

interface ComponentProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariant> {}

export const Button: FC<ComponentProps> = ({ title, variant = 'default', size = 'default', className, ...rest }) => (
  <button
    className={mr(
      buttonVariant({
        className,
        variant,
        size,
      })
    )}
    {...rest}>
    <p className={mr('text-sm font-[550] tracking-wide capitalize')}>{title}</p>
  </button>
)

Button.displayName = 'Button'
