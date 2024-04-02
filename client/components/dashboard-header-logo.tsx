'use client'

import type { FC } from 'react'
import Image from 'next/image'

export const DashboardHeaderLogo: FC = () => (
  <button className='h-full grid place-content-center outline-none'>
    <Image src={'/assets/logo/ey-logo-white.webp'} width={28} height={28} alt={'EY logo white header'} priority />
  </button>
)
