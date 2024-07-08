'use client'

import { FC } from 'react'
import dynamic from 'next/dynamic'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

interface ComponentProps {
  startups: { labelDate: string; count: number }[]
}

export const StartupsByLabelCharts: FC<ComponentProps> = ({ startups }) => {
  // Function to extract year from labelDate string
  const extractYear = (dateString: string): string => {
    const yearRegex = /\b\d{4}\b/ // Regex to match first occurrence of 4-digit number
    const match = dateString.match(yearRegex)
    return match ? match[0] : '' // Return the matched year or empty string if not found
  }

  // Group startups by year
  const startupsByYear = startups.reduce(
    (acc, startup) => {
      const year = extractYear(startup.labelDate)
      if (!acc[year]) {
        acc[year] = 0
      }
      acc[year] += startup.count
      return acc
    },
    {} as { [key: string]: number }
  )

  // Extract labels (years) and counts from grouped data
  const labelDates = Object.keys(startupsByYear)
  const counts = Object.values(startupsByYear)

  return (
    <div className='col-span-5 flex flex-col items-center bg-white border-[2px] rounded-sm bg-primary-white p-4 gap-2'>
      <div className='w-full'>
        <h2 className='text-xl font-bold text-content-display capitalize'>Startups By Label Date</h2>
        <p className='text-sm text-content-prompt'>A summary of the number of startups by label date.</p>
      </div>
      <Chart
        type='bar'
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
            categories: labelDates,
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
