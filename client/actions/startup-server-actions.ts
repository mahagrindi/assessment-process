'use server'

import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'

export async function GET(page: number = 0, size: number = 10, sort: string = 'startupCreatedAt', dir: string = 'desc', query: string = '', sector: string = ''): Promise<StartupResponseType> {
  return await fetch(`${process.env.NEXT_PUBLIC_APP_SERVER}/api/startup?page=${page}&size=${size}&sort=${sort},${dir}&query=${query}&sector=${sector}`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${cookies().get('token')?.value}` },
  })
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => {
      throw new Error(err.message)
    })
}

export async function GET_ACTIVITY_SECTOR(): Promise<string[]> {
  return await fetch(`${process.env.NEXT_PUBLIC_APP_SERVER}/api/startup/activity-sector`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${cookies().get('token')?.value}` },
  })
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => {
      throw new Error(err.message)
    })
}

export async function POST() {
  return 'POST'
}

export async function PUT() {
  return 'PUT'
}

export async function DELETE(id: string): Promise<StartupType> {
  return await fetch(`${process.env.NEXT_PUBLIC_APP_SERVER}/api/startup/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${cookies().get('token')?.value}` },
  })
    .then((res) => res.json())
    .then((data) => {
      revalidatePath('/dashboard/startups')
      return data
    })
    .catch((err) => {
      throw new Error(err.message)
    })
}
