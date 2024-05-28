'use server'

import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'

import * as yup from 'yup'
import { formCohortSchema } from '@/validation/form-cohort-validation'

type Cohort = yup.InferType<typeof formCohortSchema>

export async function GET(page: number = 0, size: number = 10, sort: string = 'cohortStartDate', dir: string = 'desc', program: string = ''): Promise<CohortResponseType> {
  return await fetch(`${process.env.NEXT_PUBLIC_APP_SERVER}/api/program/cohort?page=${page}&size=${size}&sort=${sort},${dir}&programId=${program}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${cookies().get('token')?.value}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      revalidatePath('/dashboard/cohorts')
      return data
    })
    .catch((err) => {
      throw new Error(err.message)
    })
}

export async function POST(data: Cohort, program: string): Promise<CohortType> {
  return await fetch(`${process.env.NEXT_PUBLIC_APP_SERVER}/api/program/cohort?programId=${program}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${cookies().get('token')?.value}`,
      'Content-type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => {
      revalidatePath('/dashboard/programs/detail')
      return data
    })
    .catch((err) => {
      throw new Error(err.message)
    })
}

export async function FIND(id: string): Promise<CohortType> {
  return await fetch(`${process.env.NEXT_PUBLIC_APP_SERVER}/api/program/cohort/${id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${cookies().get('token')?.value}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      revalidatePath('/dashboard/programs/cohort/detail')
      return data
    })
    .catch((err) => {
      throw new Error(err.message)
    })
}

export async function PUT(data: Cohort): Promise<CohortType> {
  return await fetch(`${process.env.NEXT_PUBLIC_APP_SERVER}/api/program/cohort`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${cookies().get('token')?.value}`,
      'Content-type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => {
      revalidatePath('/dashboard/programs/detail')
      return data
    })
}

export async function DELETE(id: string): Promise<boolean> {
  return await fetch(`${process.env.NEXT_PUBLIC_APP_SERVER}/api/program/cohort/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${cookies().get('token')?.value}` },
  })
    .then((res) => res.json())
    .then((data) => {
      revalidatePath('/dashboard/programs/detail')
      return data
    })
    .catch((err) => {
      throw new Error(err.message)
    })
}

export async function GET_PROGRAMS(): Promise<ProgramType[]> {
  return await fetch(`${process.env.NEXT_PUBLIC_APP_SERVER}/api/program/list-programs`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${cookies().get('token')?.value}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      revalidatePath('/dashboard/programs/detail')
      return data
    })
    .catch((err) => {
      throw new Error(err.message)
    })
}
