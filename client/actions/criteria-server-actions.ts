'use server'

import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'

import * as yup from 'yup'
import { formCriteriaSchema } from '@/validation/form-criteria-validation'

type Criteria = yup.InferType<typeof formCriteriaSchema>

export async function GET(
  name: string = '',
  query: string = '',
  status: string = '',
  page: number = 0,
  size: number = 10,
  sort: string = 'createdAt',
  dir: string = 'desc'
): Promise<AxeSubCriteriaResponseType> {
  return fetch(`${process.env.NEXT_PUBLIC_APP_SERVER}/api/axe/sub/criteria?page=${page}&size=${size}&sort=${sort},${dir}&query=${query}&name=${name}&status=${status}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${cookies().get('token')?.value}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      revalidatePath('/dashboard/axes/criteria')
      return data
    })
    .catch((err) => {
      throw new Error(err.message)
    })
}

export async function FIND(id: string): Promise<AxeSubCriteriaType> {
  return fetch(`${process.env.NEXT_PUBLIC_APP_SERVER}/api/axe/sub/criteria/${id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${cookies().get('token')?.value}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      revalidatePath('/dashboard/axes/criteria')
      return data
    })
    .catch((err) => {
      throw new Error(err.message)
    })
}

export async function POST(sub: string, data: Criteria): Promise<AxeSubCriteriaType> {
  return fetch(`${process.env.NEXT_PUBLIC_APP_SERVER}/api/axe/sub/criteria?subId=${sub}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${cookies().get('token')?.value}`,
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => {
      revalidatePath('/dashboard/axes/criteria')
      return data
    })
    .catch((err) => {
      throw new Error(err.message)
    })
}

export async function PUT(data: Criteria): Promise<AxeSubCriteriaType> {
  return fetch(`${process.env.NEXT_PUBLIC_APP_SERVER}/api/axe/sub/criteria`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${cookies().get('token')?.value}`,
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => {
      revalidatePath('/dashboard/axes/criteria')
      return data
    })
    .catch((err) => {
      throw new Error(err.message)
    })
}

export async function DELETE(id: string): Promise<AxeSubCriteriaType> {
  console.log('DELETE', id)
  return fetch(`${process.env.NEXT_PUBLIC_APP_SERVER}/api/axe/sub/criteria/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${cookies().get('token')?.value}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log('DELETE INSIDE', id)
      revalidatePath('/dashboard/axes/criteria')
      return data
    })
    .catch((err) => {
      throw new Error(err.message)
    })
}

export async function GET_SUB_LIST(): Promise<AxeSubType[]> {
  return fetch(`${process.env.NEXT_PUBLIC_APP_SERVER}/api/axe/sub`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${cookies().get('token')?.value}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      return data
    })
    .catch((err) => {
      throw new Error(err.message)
    })
}
