'use client'

import { type FC } from 'react'

import dynamic from 'next/dynamic'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

interface ComponentProps {
  startups: { status: string; count: number }[]
}

export const AxeByStatusCharts: FC<ComponentProps> = ({ startups }) => {
  const status = startups.map((startup) => startup.status)
  const counts = startups.map((startup) => startup.count)

  return (
    <div className='col-span-3 flex flex-col items-center bg-white border-[2px] rounded-sm bg-primary-white p-4 gap-2'>
      <div className='w-full'>
        <h2 className='text-xl font-bold text-content-display capitalize'>Axe Visibility</h2>
        <p className='text-sm text-content-prompt'>A summary of the number of axes by visibility status.</p>
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
          colors: ['#4caf50', '#e53935'],
          labels: status,
          legend: {
            show: false,
          },
        }}
      />
    </div>
  )
}
