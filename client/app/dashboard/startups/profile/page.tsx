
import React, { JSX } from 'react'
import { ContentHeader } from '@/components/content-header'
import { LuArrowLeftToLine, LuPlusCircle } from 'react-icons/lu'
import { Linker } from '@/ui/link'
import { useAuth } from '@/provider/user-provider'
import { ProfileHeader } from '@/components/Profile/profile-header'
import { HistoryOfAssesment } from '@/components/Profile/history-assessment'
import { FIND } from '@/actions/startup-server-actions'
import { ProfileHeaderStartup } from '@/components/Profile/profile-header-startup'
import Tabs from '@/ui/tabs/tabs'
import { StartupGeneralInformation } from '@/components/Profile/profile-startup-general-information'





export default async function Page({ searchParams }: { searchParams: { id: string } }): Promise<JSX.Element> {


  const startup  = (await FIND(searchParams.id)) || {}
  return (
    <div className='h-full min-h-full w-full'>
      <ContentHeader
        title={'Startup '}
        args={[
          <Linker key={'back-to-startups'} href={'/dashboard/startup'} title={'Go Back'} size={'large'} variant='link' icon={<LuArrowLeftToLine />} className={'gap-2 px-3'} />,
        ]}
      />

<ProfileHeaderStartup startup={startup} />

      <div className='bg-primary-white mt-5 border-[2px] border-gray-200'>


          <Tabs child1={<StartupGeneralInformation />} child2={<HistoryOfAssesment />} />
     
      </div>

    </div>
  )
}
