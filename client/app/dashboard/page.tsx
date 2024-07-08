import type { JSX } from 'react'

import { ContentHeader } from '@/components/content-header'

import { StartupsBySectorCharts } from '@/ui/charts/startups-by-sector-charts'
import { StartupsByLabelCharts } from '@/ui/charts/startups-by-label-charts'
import { StartupsByCreatedATCharts } from '@/ui/charts/startups-by-created-at-charts'
import { AxeByStatusCharts } from '@/ui/charts/axe-by-status-charts'

import { GET_AXE_BY_STATUS, GET_STARTUP_BY_CREATED_AT, GET_STARTUPS_BY_LABEL_DATE, GET_STARTUPS_BY_SECTOR } from '@/actions/overview-server-actions'

export default async function Page(): Promise<JSX.Element> {
  const STARTUP_BY_SECTOR: { sector: string; count: number }[] = (await GET_STARTUPS_BY_SECTOR()) ?? []
  const STARTUP_BY_LABEL: { labelDate: string; count: number }[] = (await GET_STARTUPS_BY_LABEL_DATE()) ?? []
  const STARTUP_BY_CREATED_AT: { createdAt: string; count: number }[] = (await GET_STARTUP_BY_CREATED_AT()) ?? []
  const AXE_BY_STATUS: { status: string; count: number }[] = (await GET_AXE_BY_STATUS()) ?? { status: '', count: 0 }

  return (
    <div className='h-full min-h-full w-full flex flex-col'>
      <ContentHeader title={'Overview'} subtitle={'Dashboard for your app'} isBreadcrumb={false} />

      <div className='grid grid-cols-11 gap-6 p-6'>
        <StartupsBySectorCharts startups={STARTUP_BY_SECTOR} />
        <StartupsByLabelCharts startups={STARTUP_BY_LABEL} />
        <AxeByStatusCharts startups={AXE_BY_STATUS} />
        <StartupsByCreatedATCharts startups={STARTUP_BY_CREATED_AT.sort((a, b) => a.createdAt.localeCompare(b.createdAt))} />
      </div>
    </div>
  )
}
