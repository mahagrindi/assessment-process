'use client'

import { type FC } from 'react'

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

interface ComponentProps {}

export const Calendar: FC<ComponentProps> = ({}) => {
  return <FullCalendar plugins={[dayGridPlugin]} initialView='dayGridMonth' height={'100%'} />
}
