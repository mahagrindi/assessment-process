'use client'
import { ButtonHTMLAttributes, FC, ReactElement, useEffect, useState } from 'react'

import { AnimatePresence, motion } from 'framer-motion'

import { mr } from '@/utils/class-authority-merge'
import { cva, type VariantProps } from 'class-variance-authority'
import { CgLoadbar, CgLoadbarAlt } from 'react-icons/cg'

const buttonVariant = cva(
  'relative w-full flex items-center justify-center border-[2px] border-content-display pointer-cursor disabled:bg-gray-200 disabled:border-gray-200 disabled:text-content-disabled disabled:pointer-events-none rounded',
  {
    variants: {
      variant: {
        default: 'bg-primary-yellow text-primary-background text-content-display hover:bg-primary-black hover:text-primary-white',
        primary: 'bg-content-display text-primary-white hover:bg-primary-white hover:text-content-display',
        secondary: 'bg-primary-white text-content-display hover:bg-content-display hover:text-primary-white',
        tertiary: 'bg-purple-400 border-purple-700 text-primary-white hover:bg-purple-300',
        info: 'bg-accent-link border-blue-700 text-primary-white hover:bg-blue-500',
        link: 'bg-gray-200 text-accent-link border-transparent hover:text-blue-500 hover:bg-gray-225',
        ghost: 'bg-transparent border-transparent text-content-display hover:bg-gray-200',
        error: 'bg-accent-error border-red-700 text-primary-white hover:bg-red-500',
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

interface ComponentProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariant> {
  icon?: ReactElement
  loading?: boolean
}

export const Button: FC<ComponentProps> = ({ title, icon, variant = 'default', size = 'default', className, loading = false, ...rest }) => {
  const [alternateLoading, setAlternateLoading] = useState<boolean>(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setAlternateLoading((prev) => !prev)
    }, 1500)

    return () => clearInterval(interval)
  }, [])

  const variants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  }

  return (
    <button
      className={mr(
        buttonVariant({
          className,
          variant,
          size,
        })
      )}
      {...rest}>
      {icon && icon}
      <p className={mr('text-sm font-[550] tracking-wide capitalize')}>
        {loading ? (
          <AnimatePresence>
            {alternateLoading ? (
              <motion.div layoutId='loading' initial='initial' animate='animate' exit='exit' variants={variants}>
                <CgLoadbar />
              </motion.div>
            ) : (
              <motion.div layoutId='loading' initial='initial' animate='animate' exit='exit' variants={variants}>
                <CgLoadbarAlt />
              </motion.div>
            )}
          </AnimatePresence>
        ) : (
          title
        )}
      </p>
      {loading && (
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 1.5, repeat: Infinity, repeatType: 'reverse', ease: 'linear' }} // Animation settings
          className={mr('absolute bottom-0 h-1 left-0 bg-content-display', variant === 'primary' && 'bg-primary-yellow', ['error', 'tertiary', 'info'].includes(variant!) && 'bg-primary-white')}
        />
      )}
    </button>
  )
}

Button.displayName = 'Button'
