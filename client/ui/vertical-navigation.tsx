'use client'

import type { FC, ReactElement, ButtonHTMLAttributes } from 'react'
import { useState } from 'react'

import { motion } from 'framer-motion'
import { mr } from '@/utils/class-authority-merge'
import { MdOutlineChevronRight } from 'react-icons/md'
import Link from 'next/link'

interface ComponentProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean
  haveSubmenu?: boolean
  icon?: ReactElement
}

export const VerticalNavigation: FC<ComponentProps> = ({ title, active = false, haveSubmenu = false, icon, ...rest }) => {
  const [isDropped, setIsDropDown] = useState<boolean>(active)

  return haveSubmenu ? (
    <div>
      <button className={mr('flex-1 w-full h-12 flex items-center gap-3', active ? 'text-primary-white bg-gray-500' : 'text-gray-300 bg-primary-black')} onClick={() => setIsDropDown(!isDropped)}>
        <div className={mr('w-1 h-full', active ? 'bg-primary-yellow' : 'bg-primary-black')} />
        <div className={'flex-1 flex items-center justify-between gap-3 px-3'}>
          {icon && icon}
          <p className={mr('text-sm w-full text-start capitalize', active ? 'text-primary-white' : 'text-gray-300')}>{title}</p>
          <motion.span initial={{ rotate: 0 }} animate={{ rotate: isDropped ? 90 : 0 }} transition={{ type: 'just' }}>
            <MdOutlineChevronRight className={mr('text-gray-300', active ? 'text-primary-white' : 'text-gray-300')} size={24} />
          </motion.span>
        </div>
      </button>
    </div>
  ) : (
    <button className={mr('flex-1 w-full h-12 flex items-center gap-3', active ? 'text-primary-white bg-gray-500' : 'text-gray-300 bg-primary-black')} {...rest}>
      <div className={mr('w-1 h-full', active ? 'bg-primary-yellow' : 'bg-primary-black')} />
      <div className={'flex-1 flex items-center justify-between gap-3 px-3'}>
        {icon && icon}
        <p className={mr('text-sm w-full text-start capitalize', active ? 'text-primary-white' : 'text-gray-300')}>{title}</p>
      </div>
    </button>
  )
}

VerticalNavigation.displayName = 'VerticalNavigation'
