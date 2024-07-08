'use client'

import { type FC } from 'react'

import dynamic from 'next/dynamic'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

interface ComponentProps {
  startups: { sector: string; count: number }[]
}

export const StartupsBySectorCharts: FC<ComponentProps> = ({ startups }) => {
  const sectors = startups.map((startup) => startup.sector)
  const counts = startups.map((startup) => startup.count)

  return (
    <div className='col-span-3 flex flex-col items-center bg-white border-[2px] rounded-sm bg-primary-white p-4 gap-2'>
      <div className='w-full'>
        <h2 className='text-xl font-bold text-content-display capitalize'>Startups By Sector</h2>
        <p className='text-sm text-content-prompt'>A summary of the number of startups in each sector.</p>
      </div>
      <Chart
        type='pie'
        width={280}
        height={280}
        series={counts}
        options={{
          chart: {
            toolbar: {
              show: false,
            },
          },
          title: {
            text: '',
          },
          colors: ['#0a095a', '#168736', '#00897b', '#750e5c', '#d81b60', '#ff4236', '#f76900'],
          labels: sectors,
          legend: {
            show: false,
          },
        }}
      />
    </div>
  )
}
