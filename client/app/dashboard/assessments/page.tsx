import { type JSX } from 'react'
import { MdOutlineCreate } from 'react-icons/md'

import { Linker } from '@/ui/link'

import { ContentHeader } from '@/components/content-header'

export default async function page(): Promise<JSX.Element> {
  return (
    <div className='w-full h-full min-h-full'>
      <ContentHeader
        title={'Assessments'}
        args={[
          <Linker
            size={'large'}
            title={'New Assessment'}
            icon={<MdOutlineCreate size={20} />}
            key={'create-link-consultant-element'}
            href={`/dashboard/assessments/create`}
            className={'gap-2 px-3 flex-row-reverse'}
          />,
        ]}
      />
    </div>
  )
}
