'use server'

import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'


export async function GET_FORM(): Promise<string[]> {
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

