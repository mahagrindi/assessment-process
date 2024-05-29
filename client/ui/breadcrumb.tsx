'use client'

import type { FC } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { LuChevronRight } from 'react-icons/lu'

interface ComponentProps {}

export const Breadcrumb: FC<ComponentProps> = ({}) => {
  const pathname: string = usePathname()

  return (
    <div className='flex gap-1'>
      {pathname
        .split('/')
        .filter((path) => path !== '')
        .map((path, index, paths) => (
          <div key={index} className={`flex gap-1 text-content-disabled last:text-content-display ${index === paths.length - 1 ? 'font-[500]' : ''}`}>
            {index < paths.length - 1 ? (
              <Link href={`/${paths.slice(0, index + 1).join('/')}`} className='text-sm leading-5 capitalize'>
                {path.replace('-', ' ')}
              </Link>
            ) : (
              <p className='text-sm leading-5 capitalize'>{path.replaceAll('-', ' ')}</p>
            )}
            {index < paths.length - 1 && <LuChevronRight size={18} />}
          </div>
        ))}
    </div>
  )
}

Breadcrumb.displayName = 'Breadcrumb'
