'use server'

import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'

import * as yup from 'yup'
import { formConsultantSchema } from '@/validation/form-consultant-validation'

type Consultant = yup.InferType<typeof formConsultantSchema>

export async function GET(
  query: string = '',
  title: string = '',
  status: string = '',
  dep: string = '',
  page: number = 0,
  size: number = 10,
  sort: string = 'createdAt',
  dir: string = 'desc'
): Promise<ConsultantResponseType> {
  return await fetch(`${process.env.NEXT_PUBLIC_APP_SERVER}/api/user?page=${page}&size=${size}&sort=${sort},${dir}&query=${query}&title=${title}&status=${status}&dep=${dep}`, {
    method: 'GET',
    next: { revalidate: 0 },
    headers: { Authorization: `Bearer ${cookies().get('token')?.value}` },
  })
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => {
      throw new Error(err.message)
    })
}

export async function GET_DEPARTMENT(): Promise<string[]> {
  return await fetch(`${process.env.NEXT_PUBLIC_APP_SERVER}/api/user/departments`, {
    method: 'GET',
    next: { revalidate: 0 },
    headers: { Authorization: `Bearer ${cookies().get('token')?.value}` },
  })
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => {
      throw new Error(err.message)
    })
}

export async function GET_JOB_TITLES(): Promise<string[]> {
  return await fetch(`${process.env.NEXT_PUBLIC_APP_SERVER}/api/user/job-titles`, {
    method: 'GET',
    next: { revalidate: 0 },
    headers: { Authorization: `Bearer ${cookies().get('token')?.value}` },
  })
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => {
      throw new Error(err.message)
    })
}

export async function POST(consultant: Consultant): Promise<ConsultantType> {
  return await fetch(`${process.env.NEXT_PUBLIC_APP_SERVER}/api/user`, {
    method: 'POST',
    next: { revalidate: 0 },
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${cookies().get('token')?.value}` },
    body: JSON.stringify(consultant),
  })
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => {
      throw new Error(err.message)
    })
}

export async function PUT(consultant: Consultant): Promise<ConsultantType> {
  return await fetch(`${process.env.NEXT_PUBLIC_APP_SERVER}/api/user`, {
    method: 'PUT',
    next: { revalidate: 0 },
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${cookies().get('token')?.value}` },
    body: JSON.stringify(consultant),
  })
    .then((res) => res.json())
    .then((data) => {
      revalidatePath('/dashboard/consultants')
      return data
    })
    .catch((err) => {
      throw new Error(err.message)
    })
}

export async function FIND(id: string): Promise<ConsultantType> {
  return await fetch(`${process.env.NEXT_PUBLIC_APP_SERVER}/api/user/${id}`, {
    method: 'GET',
    next: { revalidate: 0 },
    headers: { Authorization: `Bearer ${cookies().get('token')?.value}` },
  })
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => {
      throw new Error(err.message)
    })
}
