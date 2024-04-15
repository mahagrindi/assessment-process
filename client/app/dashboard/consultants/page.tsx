import { JSX, Suspense } from 'react'

import { LuPlusCircle } from 'react-icons/lu'
import { ColumnDef } from '@tanstack/react-table'
import { useAxios } from '@/hooks/useAxios'

import { Linker } from '@/ui/link'
import { ContentHeader } from '@/components/content-header'
import { DataTable } from '@/ui/storybook/data-table'
import { cookies } from 'next/headers'

async function getConsultants(): Promise<ConsultantResponseType> {
  return await useAxios
    .get('/api/user', {
      headers: { Authorization: `Bearer ${cookies().get('token')?.value}` },
    })
    .then((res) => res.data)
    .catch((err) => {
      throw new Error(err)
    })
}

export default async function Page(): Promise<JSX.Element> {
  const consultant: ConsultantResponseType = (await getConsultants()) || {}

  return (
    <div className='h-full min-h-full w-full'>
      <ContentHeader
        title={'consultants'}
        args={[<Linker key={'create-link-consultant-element'} title={'add new'} href={`/dashboard/consultants/create`} size={'large'} icon={<LuPlusCircle size={20} />} className={'gap-1 px-3'} />]}
      />

      <Suspense fallback='loading...'>
        <DataTable<ConsultantType> data={consultant.content} columns={columns} paging={consultant} />
      </Suspense>
    </div>
  )
}

const columns: ColumnDef<ConsultantType>[] = [
  {
    id: 'fullName',
    header: 'first name',
    accessorKey: 'fullName',
  },
  {
    id: 'email',
    header: 'email',
    accessorKey: 'email',
  },
]
