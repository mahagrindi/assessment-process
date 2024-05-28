import type { JSX } from 'react'
import { ContentHeader } from '@/components/content-header'
import { LuArrowLeftToLine, LuPlusCircle } from 'react-icons/lu'
import { Linker } from '@/ui/link'

export default function Page({ searchParams }: { searchParams: { q: string } }): JSX.Element {
  if (!searchParams.q) {
    throw new Error('No search query provided try adding `<code>?q=...</code>` to the url')
  }

  return (
    <div className='h-full min-h-full w-full'>
      <ContentHeader
        title={'consultants'}
        args={[
          <Linker key={'back-to-consultants'} href={'/dashboard/consultants'} title={'Cancel'} size={'large'} variant='link' icon={<LuArrowLeftToLine />} className={'gap-2 px-3'} />,
          <Linker key={'edit-consultant-element'} title={'edit'} variant={'link'} href={`/dashboard/consultants/create`} size={'large'} icon={<LuPlusCircle size={20} />} className={'gap-1 px-3'} />,
        ]}
      />
    </div>
  )
}
