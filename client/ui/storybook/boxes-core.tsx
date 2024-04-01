'use client'

import type { FC, JSX } from 'react'
import { memo } from 'react'
import { motion } from 'framer-motion'

import { mr } from '@/utils/class-authority-merge'

interface ComponentProps {
  className?: string
}

export const BoxesCore: FC<ComponentProps & Record<string, any>> = ({ className, ...rest }) => {
  const rows: number[] = new Array(25).fill(0)
  const cols: number[] = new Array(25).fill(0)

  const colors: string[] = ['#ffe60095', '#ffe60085', '#ffe60070', '#ffe60055', '#ffe60040', '#ffe60025', '#ffe60010', '#ffe60005']

  const getRandomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)]
  }

  const memoizedSVG: JSX.Element = (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth='1.5'
      stroke='currentColor'
      className='absolute h-6 w-10 -top-[14px] -left-[22px] text-slate-700 stroke-[1px] pointer-events-none'>
      <path strokeLinecap='round' strokeLinejoin='round' d='M12 6v12m6-6H6' />
    </svg>
  )

  return (
    <div
      style={{
        transform: `translate(-40%,-60%) skewX(-48deg) skewY(14deg) scale(0.675) rotate(0deg) translateZ(0)`,
      }}
      className={mr('left-1/4 p-4 -top-1/4 flex -translate-x-1/2 -translate-y-1/2 w-full h-full z-0 ', className)}
      {...rest}>
      {rows.map((_, i) => (
        <motion.div key={`row${i}`} className='w-48 h-24 border-l border-slate-700 relative'>
          {cols.map((_, j) => (
            <motion.div
              whileHover={{
                backgroundColor: `${getRandomColor()}`,
                transition: { duration: 0 },
              }}
              animate={{
                transition: { duration: 2 },
              }}
              key={`col${j}`}
              className='w-48 h-24 border-r border-t border-content-display relative'>
              {j % 2 === 0 && i % 2 === 0 ? memoizedSVG : null}
            </motion.div>
          ))}
        </motion.div>
      ))}
    </div>
  )
}

export const Boxes = memo(BoxesCore)
