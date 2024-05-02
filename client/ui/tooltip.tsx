import { FC, ReactElement } from 'react'

interface ComponentProps {
  children: ReactElement
  text: string
}

export const Tooltip: FC<ComponentProps> = ({ children, text = 'hover me' }) => {
  return (
    <div className='w-full hs-tooltip inline-block [--placement:right]'>
      <button type='button' className='hs-tooltip-toggle'>
        {children}
        <span
          className='hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded shadow-sm dark:bg-neutral-700'
          role='tooltip'>
          {text}
        </span>
      </button>
    </div>
  )
}

Tooltip.displayName = 'Tooltip'
