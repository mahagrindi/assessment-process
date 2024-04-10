'use client'

import type { FC } from 'react'

import { mr } from '@/utils/class-authority-merge'
import { cva, VariantProps } from 'class-variance-authority'
import { motion } from 'framer-motion'
import { MdCheckCircle, MdClose, MdError, MdInfo, MdWarning } from 'react-icons/md'

const toastVariant = cva('z-20 w-full max-w-[350px] top-4 right-4 absolute py-2 px-3 rounded', {
  variants: {
    variant: {
      default: 'border-[2px] bg-primary-white',
      error: 'border-[2px] border-accent-error bg-red-100 bg-opacity-20',
      warning: 'border-[2px] border-accent-warning bg-orange-100 bg-opacity-20',
      success: 'border-[2px] border-accent-success bg-green-100 bg-opacity-20',
      info: 'border-[2px] border-accent-link bg-blue-100 bg-opacity-20',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

interface ComponentProps extends VariantProps<typeof toastVariant> {
  title?: string
  message?: string
  close?: () => void
}

export const Toast: FC<ComponentProps & Record<string, any>> = ({ title, message, variant = 'default', className, close }) => {
  const decideIcon = () => {
    switch (variant) {
      case 'error':
        return <MdError size={21} className='text-accent-error' />
      case 'warning':
        return <MdWarning size={21} className='text-accent-warning' />
      case 'success':
        return <MdCheckCircle size={21} className='text-accent-success' />
      case 'info':
        return <MdInfo size={21} className='text-accent-link' />
      default:
        return <MdInfo size={21} className='text-accent-link' />
    }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={mr(toastVariant({ className, variant }))}>
      <div>
        <div className='grid grid-cols-12'>
          <div className='col-span-1 place-content-center'>{decideIcon()}</div>
          <p className='col-span-11 place-content-center font-[550] text-base capitalize'>{title}</p>
        </div>
        <div className='grid grid-cols-12'>
          <div className='col-span-1' />
          <p className='col-span-11 text-sm text-content-prompt'>{message}</p>
        </div>
      </div>
      <div>
        <MdClose size={21} className='absolute top-2 right-2 text-content-prompt cursor-pointer' onClick={close} />
      </div>
    </motion.div>
  )
}

Toast.displayName = 'Toast'
