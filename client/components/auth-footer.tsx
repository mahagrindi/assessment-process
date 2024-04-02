import type { FC } from 'react'
import Link from 'next/link'

export const AuthFooter: FC = () => {
  return (
    <footer className='flex items-center justify-between'>
      <div>
        <Link passHref href={''} className='text-sm text-content-prompt capitalize'>
          {`${new Date().getFullYear()} AMC Ernst & Young.`}
        </Link>
      </div>
      <div className='flex items-center gap-6'>
        <p className='text-sm text-content-prompt capitalize'>privacy policy</p>
        <p className='text-sm text-content-prompt capitalize'>contact</p>
      </div>
    </footer>
  )
}
