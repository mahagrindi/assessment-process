'use client'

import { type FC, forwardRef, type ReactElement } from 'react'
import { cva, VariantProps } from 'class-variance-authority'
import { mr } from '@/utils/class-authority-merge'

const chipVariants = cva('relative w-fit flex items-center justify-center gap-2 border-[2px] rounded-full select-none', {
  variants: {
    variant: {
      default: 'bg-gray-100/30 border-gray-250 text-content-display',
      content: 'bg-purple-100/30 border-purple-500 text-purple-500',
      alternative: 'bg-content-display/30 border-content-display text-content-display',
      success: 'bg-green-100/30 border-accent-success text-accent-success',
      danger: 'bg-red-100/30 border-accent-error text-accent-error',
      info: 'bg-blue-100/30 border-accent-link text-accent-link',
      warning: 'bg-orange-100/30 border-accent-warning text-accent-warning',
      ghost: 'bg-gray-400/30 border-gray-400 text-gray-400',
    },
    size: {
      default: 'font-[525] text-sm px-2 py-1 h-7 max-h-7',
      small: 'font-[525] text-xs px-2 py-1 h-5 max-h-5 leading-5',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

interface ComponentProps extends VariantProps<typeof chipVariants> {
  icon?: ReactElement
  title?: string
  className?: string
}

export const Chip: FC<ComponentProps> = forwardRef<HTMLDivElement, ComponentProps>(({ title, icon, variant = 'default', size = 'default', className }, ref) => {
  return (
    <div ref={ref} className={mr(chipVariants({ variant, size }), className)}>
      {icon && <div>{icon}</div>}
      {title && <p>{title}</p>}
    </div>
  )
})

Chip.displayName = 'Chip'
