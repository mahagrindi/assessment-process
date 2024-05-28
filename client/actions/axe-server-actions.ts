'use server'

import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'

import * as yup from 'yup'
import { formAxeSchema } from '@/validation/form-axe-validation'

type Axe = yup.InferType<typeof formAxeSchema>

export async function GET(query: string = '', status: string = '', page: number = 0, size: number = 10, sort: string = 'createdAt', dir: string = 'desc'): Promise<AxeResponseType> {
  return await fetch(`${process.env.NEXT_PUBLIC_APP_SERVER}/api/axe?page=${page}&size=${size}&sort=${sort},${dir}&query=${query}&status=${status}`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${cookies().get('token')?.value}` },
    next: { revalidate: 0 },
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

export async function FIND(id: string): Promise<AxeType> {
  return await fetch(`${process.env.NEXT_PUBLIC_APP_SERVER}/api/axe/${id}`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${cookies().get('token')?.value}` },
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

export async function POST(data: Axe): Promise<AxeType> {
  return await fetch(`${process.env.NEXT_PUBLIC_APP_SERVER}/api/axe`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${cookies().get('token')?.value}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
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

export async function PUT(data: Axe): Promise<AxeType> {
  return await fetch(`${process.env.NEXT_PUBLIC_APP_SERVER}/api/axe`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${cookies().get('token')?.value}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
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
