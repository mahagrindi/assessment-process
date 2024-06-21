import React, { JSX } from 'react'
import ChartLine from '@/components/ChartLine'

export default function Page(): JSX.Element {
  return <>
    <div className="bg-white shadow-lg p-4">
      <ChartLine />
    </div>
  </>
}
