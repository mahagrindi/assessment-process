import type { JSX } from 'react'
import { LuPlus } from 'react-icons/lu'

import { Linker } from '@/ui/link'

import { ContentHeader } from '@/components/content-header'

export default function Page(): JSX.Element {
  return (
    <div className='h-full min-h-full w-full'>
      <ContentHeader
        title={'programs'}
        args={[<Linker key={'create-link-program'} title={'new program'} href={`/dashboard/programs`} size={'large'} icon={<LuPlus size={20} />} className={'gap-2 px-3'} />]}
      />
    </div>
  )
}
