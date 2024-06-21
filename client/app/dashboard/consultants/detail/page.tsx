
import React, { JSX } from 'react'
import { ContentHeader } from '@/components/content-header'
import { LuArrowLeftToLine, LuPlusCircle } from 'react-icons/lu'
import { Linker } from '@/ui/link'
import { useAuth } from '@/provider/user-provider'
import { ProfileHeader } from '@/components/Profile/profile-header'
import { HistoryOfAssesment } from '@/components/Profile/history-assessment'
import { FIND } from '@/actions/consultant-server-actions'





  export default async function Page({ searchParams }: { searchParams: { q: string } }): Promise<JSX.Element> {


    const user  = (await FIND(searchParams.q)) || {}
  return (
    <div className='h-full min-h-full w-full'>
      <ContentHeader
        title={'consultants'}
        args={[
          <Linker key={'back-to-consultants'} href={'/dashboard/consultants'} title={'Go Back'} size={'large'} variant='link' icon={<LuArrowLeftToLine />} className={'gap-2 px-3'} />,
        ]}
      />


      <ProfileHeader user={user} />

      <div className='bg-primary-white mt-5 border-[2px] border-gray-200'>

        <div className="flex flex-row  my-5 ">
          <HistoryOfAssesment />
        </div>
      </div>

    </div>
  )
}
