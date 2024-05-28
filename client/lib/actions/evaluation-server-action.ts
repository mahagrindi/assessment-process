'use server'

import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'

export async function getEvaluationForms(): Promise<FormEvaluationResponseType[]> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_SERVER}/api/form-evaluations/list`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${cookies().get('token')?.value}` },
    })
    if (!response.ok) {
      throw new Error('Failed to fetch evaluation forms')
    }
    return await response.json()
  } catch (error) {
    throw new Error('error')
  }
}

export async function getEvaluationFormsByID(id: string = ''): Promise<FormEvaluationResponseType> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_SERVER}/api/form-evaluations/${id}`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${cookies().get('token')?.value}` },
    })
    if (!response.ok) {
      throw new Error('Failed to fetch evaluation form By ID ')
    }
    return await response.json()
  } catch (error) {
    throw new Error('error')
  }
}

export async function POST(form: FormEvaluation): Promise<FormEvaluation> {
  console.log(form)
  return fetch(`${process.env.NEXT_PUBLIC_APP_SERVER}/api/form-evaluations`, {
    method: 'POST',
    next: { revalidate: 0 },
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${cookies().get('token')?.value}` },
    body: JSON.stringify(form),
  })
    .then((res) => res.json())
    .then((data) => {
      revalidatePath('/dashboard/evaluations')
      return data
    })
    .catch((err) => {
      throw new Error(err.message)
    })
}

export async function CreateCpoie(id: string): Promise<void> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_SERVER}/api/form-evaluations/copies?id=${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cookies().get('token')?.value}`,
      },
    })

    if (!response.ok) {
      throw new Error('Failed to create copies')
    }

    // Revalidate data associated with '/dashboard/evaluations' page
    revalidatePath('/dashboard/evaluations')
  } catch (error) {
    console.error('Failed to create copies:', error)
    // Handle error, show user feedback, etc.
  }
}

export async function PUT() {
  return 'PUT'
}
