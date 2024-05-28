'use server'

import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'

import * as yup from 'yup'
import { formChallengeSchema } from '@/validation/form-challenge-validation'

type Challenge = yup.InferType<typeof formChallengeSchema>

export async function POST(data: Challenge, cohort: string): Promise<ChallengeType> {
  return await fetch(`${process.env.NEXT_PUBLIC_APP_SERVER}/api/program/cohort/challenge?cohortId=${cohort}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${cookies().get('token')?.value}`,
    },
    body: JSON.stringify(data),
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

export async function FIND(id: string): Promise<ChallengeType> {
  return await fetch(`${process.env.NEXT_PUBLIC_APP_SERVER}/api/program/cohort/challenge/${id}`, {
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

export async function PUT(id: string, data: Challenge): Promise<ChallengeType> {
  return await fetch(`${process.env.NEXT_PUBLIC_APP_SERVER}/api/program/cohort/challenge/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${cookies().get('token')?.value}`,
    },
    body: JSON.stringify(data),
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

export async function DELETE(id: string): Promise<boolean> {
  return await fetch(`${process.env.NEXT_PUBLIC_APP_SERVER}/api/program/cohort/challenge/${id}`, {
    method: 'DELETE',
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
