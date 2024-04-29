'use client'

import { type FC, useLayoutEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { getCookie } from 'cookies-next'
import { usePathname, useRouter } from 'next/navigation'

import { MdOutlineChevronRight, MdOutlineLogout, MdOutlineSettings } from 'react-icons/md'

import { mr } from '@/utils/class-authority-merge'
import { VerticalNavigation } from '@/ui/vertical-navigation'

import { logout } from '@/actions/auth-actions'

interface ComponentProps {}

export const DashboardHeaderProfile: FC<ComponentProps> = () => {
  const { push } = useRouter()
  const pathname: string = usePathname()

  const [user, setUser] = useState<AuthUserProfileType>()

  useLayoutEffect(() => {
    getCookie('user') && setUser(JSON.parse(getCookie('user') as string) as AuthUserProfileType)
  }, [])

  return (
    <div>
      <VerticalNavigation title='settings' icon={<MdOutlineSettings size={24} />} onClick={() => push('/dashboard/settings')} active={pathname === '/dashboard/settings'} />
      <div className='w-full h-[1px] bg-content-display' />
      <div className={mr('h-[82px]  flex items-center justify-center relative', pathname === '/dashboard/profile' && 'bg-content-display')}>
        <div className={mr('w-1 h-full bg-red-200', pathname.includes('dashboard/profile') ? 'bg-primary-yellow' : 'bg-primary-black')} />
        {!user ? (
          <div className='relative flex items-center justify-center px-3'>
            <div className='animate-ping absolute inline-flex h-3 w-3 rounded-full bg-yellow-400 opacity-75'></div>
            <div className='absolute inline-flex rounded-full h-3 w-3 bg-yellow-600'></div>
          </div>
        ) : (
          <button className='w-full px-3 flex-1 h-full cursor-pointer flex items-center gap-3 select-none' onClick={() => push('/dashboard/profile')}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={user.profileImage ? user.profileImage : 'https://api.dicebear.com/8.x/bottts-neutral/svg?seed=Sophie'} alt='' className='h-10 w-10 object-cover flex rounded-full' />
            <div className={'flex flex-1 flex-col items-start px-2'}>
              <p className='text-primary-white text-base capitalize'>{`${user.firstName} ${user.middleName ? user.middleName : ''} ${user.lastName}`}</p>
              <p className='text-gray-300 text-sm'>{user.username}</p>
            </div>
            <motion.span initial={{ rotate: 0 }} transition={{ type: 'just' }}>
              <MdOutlineChevronRight className='text-primary-white' size={24} />
            </motion.span>
          </button>
        )}
      </div>
      <div className='w-full h-[1px] bg-content-display' />
      <VerticalNavigation title='logout' icon={<MdOutlineLogout size={24} />} onClick={() => logout().then(() => push('/'))} />
    </div>
  )
}
