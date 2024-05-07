'use client'

import type { FC, ReactElement } from 'react'
import { Breadcrumb } from '@/ui/breadcrumb'

interface ComponentProps {
  title: string
  subtitle?: string
  isBreadcrumb?: boolean
  args?: ReactElement[]
}

export const ContentHeader: FC<ComponentProps> = ({ title, subtitle, isBreadcrumb = true, args }) => {
  return (
    <div className='w-full flex items-center justify-between p-6'>
      <div className='flex-1'>
        <div className='mb-3'>
          <p className='text-4xl capitalize font-semibold'>{title}</p>
          {subtitle && <p className='text-base first-letter:capitalize mt-1 text-content-prompt'>{subtitle}</p>}
        </div>
        {isBreadcrumb && <Breadcrumb />}
      </div>
      {args && <div className='grid grid-flow-col gap-2'>{...args}</div>}
    </div>
  )
}
