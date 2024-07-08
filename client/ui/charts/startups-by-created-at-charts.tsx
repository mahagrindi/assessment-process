'use client'

import { FC } from 'react'
import dynamic from 'next/dynamic'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

interface ComponentProps {
  startups: { createdAt: string; count: number }[]
}

export const StartupsByCreatedATCharts: FC<ComponentProps> = ({ startups }) => {
  const createdAT = startups.map((startup) => startup.createdAt)
  const counts = startups.map((startup) => startup.count)

  return (
    <div className='col-span-5 flex flex-col items-center bg-white border-[2px] rounded-sm bg-primary-white p-4 gap-2'>
      <div className='w-full'>
        <h2 className='text-xl font-bold text-content-display capitalize'>Startups By Creation Date</h2>
        <p className='text-sm text-content-prompt'>A summary of the number of startups created in each year.</p>
      </div>
      <Chart
        type='line'
        width={580}
        height={240}
        series={[
          {
            name: 'Startups',
            data: counts,
          },
        ]}
        options={{
          chart: {
            type: 'bar',
            height: 240,
            toolbar: {
              show: false,
            },
          },
          plotOptions: {
            bar: {
              columnWidth: '40%',
              borderRadius: 2,
            },
          },
          colors: ['#020617'],
          xaxis: {
            categories: createdAT,
            axisTicks: {
              show: false,
            },
            axisBorder: {
              show: false,
            },
            labels: {
              style: {
                colors: '#616161',
                fontSize: '12px',
                fontFamily: 'inherit',
                fontWeight: 400,
              },
            },
          },
          yaxis: {
            labels: {
              style: {
                colors: '#616161',
                fontSize: '12px',
                fontFamily: 'inherit',
                fontWeight: 400,
              },
            },
          },
          grid: {
            show: true,
            borderColor: '#dddddd',
            strokeDashArray: 5,
            xaxis: {
              lines: {
                show: true,
              },
            },
            padding: {
              top: 5,
              right: 20,
            },
          },
          fill: {
            opacity: 0.8,
          },
          tooltip: {
            theme: 'dark',
          },
        }}
      />
    </div>
  )
}
