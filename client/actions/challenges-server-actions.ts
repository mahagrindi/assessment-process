'use server'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'

import * as yup from 'yup'

export async function GET_ALL(): Promise<ChallengesTypelist> {
  return await fetch(`${process.env.NEXT_PUBLIC_APP_SERVER}/api/challenges`, {
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

/* update CriteriaType  */
