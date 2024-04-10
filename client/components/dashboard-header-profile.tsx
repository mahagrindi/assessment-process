'use client'

import Link from 'next/link'
import { FC, useLayoutEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { MdLogout, MdOutlineChevronRight } from 'react-icons/md'
import { logout } from '@/lib/actions/auth-actions'
import { identify } from '@/lib/actions/current-user-action'

interface ComponentProps {}

export const DashboardHeaderProfile: FC<ComponentProps> = () => {
  const { push } = useRouter()
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const [user, setUser] = useState<AuthUserProfileType>()

  useLayoutEffect(() => {
    identify().then((res) => setUser(res))
  }, [])

  return (
    <div className='relative'>
      {!user ? (
        <div className='relative flex items-center justify-center'>
          <div className='animate-ping absolute inline-flex h-3 w-3 rounded-full bg-yellow-400 opacity-75'></div>
          <div className='absolute inline-flex rounded-full h-3 w-3 bg-yellow-600'></div>
        </div>
      ) : (
        <button className='h-full cursor-pointer flex items-center gap-3 select-none' onClick={() => setIsOpen(!isOpen)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={''} alt='' className='h-10 w-10 object-cover flex rounded-full' />
          <div className={'flex flex-1 flex-col items-start'}>
            <p className='text-primary-white text-sm capitalize'>{user?.fullName}</p>
            <p className='text-gray-300 text-xs'>{user?.email}</p>
          </div>
          <motion.span initial={{ rotate: 0 }} animate={{ rotate: isOpen ? 90 : 0 }} transition={{ type: 'just' }}>
            <MdOutlineChevronRight className='text-primary-white' size={24} />
          </motion.span>
        </button>
      )}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'just', duration: 0.3 }}
          className='absolute top-14 right-0 w-full bg-primary-black overflow-hidden rounded'>
          <div className='flex flex-col'>
            <Link passHref href={'/dashboard/profile'} className='px-3 h-12 text-gray-300 hover:text-primary-white bg-primary-black hover:bg-gray-500 flex items-center justify-between'>
              <p className='flex text-sm capitalize'>Profile</p>
            </Link>
            <Link passHref href={'/dashboard/settings'} className='px-3 h-12 text-gray-300 hover:text-primary-white bg-primary-black hover:bg-gray-500 flex items-center justify-between'>
              <p className='flex text-sm capitalize'>Settings</p>
            </Link>
            <div className='h-px bg-gray-500' />
            <button onClick={() => logout().then((_) => push('/'))} className='px-3 h-12 text-gray-300 hover:text-primary-white bg-primary-black hover:bg-gray-500 flex items-center justify-between'>
              <p className='flex text-sm capitalize'>Logout</p>
              <MdLogout size={18} />
            </button>
          </div>
        </motion.div>
      )}
    </div>
  )
}
