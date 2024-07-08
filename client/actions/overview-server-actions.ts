'use server'

import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'

export async function GET_STARTUPS_BY_SECTOR(): Promise<{ sector: string; count: number }[]> {
  return await fetch(`${process.env.NEXT_PUBLIC_APP_SERVER}/api/overview/startup-activity-sector`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${cookies().get('token')?.value}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      revalidatePath('/dashboard')
      return data
    })
}

export async function GET_STARTUPS_BY_LABEL_DATE(): Promise<{ labelDate: string; count: number }[]> {
  return await fetch(`${process.env.NEXT_PUBLIC_APP_SERVER}/api/overview/startup-label-date`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${cookies().get('token')?.value}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      revalidatePath('/dashboard')
      return data
    })
}

export async function GET_STARTUP_BY_CREATED_AT(): Promise<{ createdAt: string; count: number }[]> {
  return await fetch(`${process.env.NEXT_PUBLIC_APP_SERVER}/api/overview/startup-createdAt`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${cookies().get('token')?.value}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      revalidatePath('/dashboard')
      return data
    })
}

export async function GET_AXE_BY_STATUS(): Promise<{ status: string; count: number }[]> {
  return await fetch(`${process.env.NEXT_PUBLIC_APP_SERVER}/api/overview/axe-status`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${cookies().get('token')?.value}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      revalidatePath('/dashboard')
      return data
    })
}
