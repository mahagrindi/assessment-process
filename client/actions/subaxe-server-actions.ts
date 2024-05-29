'use server'

import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'

import * as yup from 'yup'
import { formSubAxeSchema } from '@/validation/form-subaxe-validation'

type AxeSub = yup.InferType<typeof formSubAxeSchema>

export async function FIND(id: string): Promise<AxeSubType> {
  return fetch(`${process.env.NEXT_PUBLIC_APP_SERVER}/api/axe/sub/${id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${cookies().get('token')?.value}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      revalidatePath('/dashboard/axes')
      return data
    })
    .catch((err) => {
      throw new Error(err.message)
    })
}

export async function POST(axe: string, data: AxeSub): Promise<AxeSubType> {
  return fetch(`${process.env.NEXT_PUBLIC_APP_SERVER}/api/axe/sub?axeId=${axe}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${cookies().get('token')?.value}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => {
      revalidatePath(`/dashboard/axes/detail?id=${axe}`)
      return data
    })
    .catch((err) => {
      throw new Error(err.message)
    })
}

export async function PUT(id: string, subAxe: AxeSub): Promise<AxeSubType> {
  return fetch(`${process.env.NEXT_PUBLIC_APP_SERVER}/api/axe/sub`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${cookies().get('token')?.value}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(subAxe),
  })
    .then((res) => res.json())
    .then((data) => {
      revalidatePath(`/dashboard/axes/detail?id=${id}`)
      return data
    })
    .catch((err) => {
      throw new Error(err.message)
    })
}

export async function DELETE(id: string): Promise<boolean> {
  return fetch(`${process.env.NEXT_PUBLIC_APP_SERVER}/api/axe/sub/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${cookies().get('token')?.value}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      revalidatePath('/dashboard/axes')
      return data
    })
    .catch((err) => {
      throw new Error(err.message)
    })
}
