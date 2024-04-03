'use client'

import type { FC } from 'react'
import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

import { MdLogout, MdOutlineChevronRight } from 'react-icons/md'

interface ComponentProps {
  image: string
  name: string
  email: string
}

export const DashboardHeaderProfile: FC<ComponentProps> = ({ image, name, email }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <div className='relative'>
      <button className='h-full cursor-pointer flex items-center gap-3 select-none' onClick={() => setIsOpen(!isOpen)}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image} alt='' className='h-10 w-10 object-cover flex rounded-full' />
        <div className={'flex flex-1 flex-col items-start'}>
          <p className='text-primary-white text-sm capitalize'>{name}</p>
          <p className='text-gray-300 text-xs'>{email}</p>
        </div>
        <motion.span initial={{ rotate: 0 }} animate={{ rotate: isOpen ? 90 : 0 }} transition={{ type: 'just' }}>
          <MdOutlineChevronRight className='text-primary-white' size={24} />
        </motion.span>
      </button>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'just', duration: 0.3 }}
          className='absolute top-14 right-0 w-full bg-primary-black overflow-hidden rounded'>
          <div className='flex flex-col'>
            <Link passHref href='' className='px-3 h-12 text-gray-300 hover:text-primary-white bg-primary-black hover:bg-gray-500 flex items-center justify-between'>
              <p className='flex text-sm capitalize'>Profile</p>
            </Link>
            <Link passHref href='' className='px-3 h-12 text-gray-300 hover:text-primary-white bg-primary-black hover:bg-gray-500 flex items-center justify-between'>
              <p className='flex text-sm capitalize'>Settings</p>
            </Link>
            <div className='h-px bg-gray-500' />
            <button className='px-3 h-12 text-gray-300 hover:text-primary-white bg-primary-black hover:bg-gray-500 flex items-center justify-between'>
              <p className='flex text-sm capitalize'>Logout</p>
              <MdLogout size={18} />
            </button>
          </div>
        </motion.div>
      )}
    </div>
  )
}
