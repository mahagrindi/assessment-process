import { type JSX, Suspense } from 'react'
import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { LuPlusCircle } from 'react-icons/lu'
import { ContentHeader } from '@/components/content-header'
import { Linker } from '@/ui/link'
import { DataTable } from '@/ui/storybook/data-table'
import { startupColumns } from '@/constants/data-tables-headers/startup-datatable-header'

export const metadata: Metadata = {
  title: 'EY Dashboard',
  description: 'Dashboard page',
  icons: {
    icon: '/assets/logo/ey-logo-black.png',
  },
}

async function getStartups(page: number = 0, size: number = 10): Promise<StartupResponseType> {
  return await fetch(`${process.env.NEXT_PUBLIC_APP_SERVER}/api/startup?page=${page}&size=${size}`, {
    method: 'GET',
    next: { revalidate: 0 },
    headers: { Authorization: `Bearer ${cookies().get('token')?.value}` },
  })
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => {
      throw new Error(err.message)
    })
}

export default async function Page({ searchParams }: { searchParams: { page: string; size: string } }): Promise<JSX.Element> {
  const startups: StartupResponseType = (await getStartups(Number(searchParams.page) - 1, Number(searchParams.size))) || {}

  return (
    <div className='h-full min-h-full w-full'>
      <ContentHeader
        title={'startups'}
        args={[
          <Linker key={'create-link-consultant'} size={'large'} title={'add new'} className={'gap-1 px-3'} href={`/dashboard/consultants/create`} icon={<LuPlusCircle className='flex' size={18} />} />,
        ]}
      />

      <Suspense key={searchParams.page + searchParams.size} fallback='loading...'>
        <DataTable<StartupType> data={startups.content} columns={startupColumns} paging={startups} />
      </Suspense>
    </div>
  )
}
