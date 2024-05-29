'use client'

import { type JSX, useLayoutEffect, useState } from 'react'
import { LuArrowLeftToLine, LuFileEdit, LuSave } from 'react-icons/lu'

import { Linker } from '@/ui/link'
import { Button } from '@/ui/button'
import { DropDown } from '@/ui/dropdown'

import { ContentHeader } from '@/components/content-header'
import { GET_COHORTS, GET_STARTUPS } from '@/actions/evaluation-server-actions'

export default function Page({ params, searchParams }: { params: { slug: string }; searchParams: {} }): JSX.Element {
  const [startupList, setStartupList] = useState<StartupType[]>()
  const [cohortList, setCohortList] = useState<CohortType[]>()

  useLayoutEffect(() => {
    GET_STARTUPS().then((res) => setStartupList(res))
  }, [])

  useLayoutEffect(() => {
    GET_COHORTS().then((res) => setCohortList(res))
  }, [])

  return (
    <div className='w-full h-full min-h-full'>
      <ContentHeader
        title={'Assessment'}
        args={[
          <Linker key={'back-to-programs'} href={'/dashboard/assessments'} title={'Cancel'} size={'large'} variant='link' icon={<LuArrowLeftToLine />} className={'gap-2 px-3'} />,
          params.slug === 'create' ? (
            <Button key={'create-program-element'} variant={'primary'} title={'Save'} size={'large'} icon={<LuSave size={20} />} className={'gap-2 px-3'} />
          ) : (
            <Button key={'update-program-element'} variant={'secondary'} title={'Update'} size={'large'} icon={<LuFileEdit size={20} />} className={'gap-2 px-3'} />
          ),
        ]}
      />

      {startupList && <DropDown value={''} data={startupList.map((el) => ({ label: el.startupName, value: el.id! }))} onChange={() => {}} />}
      {cohortList && <DropDown value={''} data={cohortList.map((el) => ({ label: el.cohortName, value: el.id! }))} onChange={() => {}} />}
    </div>
  )
}
