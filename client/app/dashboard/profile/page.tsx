import type { JSX } from 'react'
import { Linker } from '@/ui/link'
import { ContentHeader } from '@/components/content-header'
import { FaRegEdit } from 'react-icons/fa'

export default function Page(): JSX.Element {
  return (
    <div className='h-full min-h-full w-full'>
      <ContentHeader
        title={'Profile'}
        args={[<Linker size={'large'} title={'edit'} className={'gap-1'} key={'create-edit-consultant-element'} href={`/dashboard/settings`} icon={<FaRegEdit size={20} />} />]}
      />
    </div>
  )
}
