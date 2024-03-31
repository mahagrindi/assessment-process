import type { FC } from 'react'
import Image from 'next/image'

export const NavBarAuth: FC = () => {
  return (
    <nav className='bg-primary-yellow w-full h-full max-h-[58px]'>
      <div className='max-w-[1440px] mx-auto my-0 flex items-center justify-center'>
        <Image src='/assets/logo/ey-logo-black.png' width={42} height={42} alt={'logo auth logo'} priority />
      </div>
    </nav>
  )
}
