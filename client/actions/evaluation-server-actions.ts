'use server'

import { cookies } from 'next/headers'

export async function GET_STARTUPS(): Promise<StartupType[]> {
  return await fetch(`${process.env.NEXT_PUBLIC_APP_SERVER}/api/startup/get-startup-list`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${cookies().get('token')?.value}`,
    },
  })
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => {
      throw new Error(err)
    })
}

export async function GET_COHORTS(): Promise<CohortType[]> {
  return await fetch(`${process.env.NEXT_PUBLIC_APP_SERVER}/api/program/cohort/get-cohort-list`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${cookies().get('token')?.value}`,
    },
  })
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => {
      throw new Error(err)
    })
}
