'use server'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'

import * as yup from 'yup'

/* update sub axe */

export async function PUT_SUBAXE(subaxe: SubAxeType): Promise<SubAxeType> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_SERVER}/api/sub-axes`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cookies().get('token')?.value}`,
      },
      body: JSON.stringify(subaxe),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    revalidatePath(`/dashboard/axes/detail?q=${subaxe.fk_axe_id}`)
    return data
  } catch (err) {
    throw new Error(`Failed to add sub-axe`)
  }
}

/* find SUB-axes by ID  */

export async function FIND_SUBAXE(id: String): Promise<SubAxeType> {
  return await fetch(`${process.env.NEXT_PUBLIC_APP_SERVER}/api/sub-axes/${id}`, {
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

/*  change visibility of sub-axe */
export async function PUTVisibilitySubAxe(id: String): Promise<SubAxeType> {
  return await fetch(`${process.env.NEXT_PUBLIC_APP_SERVER}/api/sub-axes/${id}`, {
    method: 'PUT',
    next: { revalidate: 0 },
    headers: { Authorization: `Bearer ${cookies().get('token')?.value}` },
  })
    .then((res) => res.json())
    .then((data) => {
      revalidatePath(`/dashboard/axes/detail?q=${data.fk_axe_id}`)
      return data
    })
    .catch((err) => {
      throw new Error(err.message)
    })
}

/* add Criterias to sub-axe */

export async function POST_Criterias(criteria: CriteriaType, subaxeId: String): Promise<CriteriaType> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_SERVER}/api/sub-axes/criteria?subaxeId=${subaxeId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cookies().get('token')?.value}`,
      },
      body: JSON.stringify(criteria),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    revalidatePath(`/dashboard/axes/detail/sub-axe?q=${subaxeId}`)
    return data
  } catch (err) {
    throw new Error(`Failed to add  criteria `)
  }
}

/*  change visibility of Criterias */
export async function PUTVisibilityCriterias(id: String): Promise<CriteriaType> {
  return await fetch(`${process.env.NEXT_PUBLIC_APP_SERVER}/api/criteria/${id}`, {
    method: 'PUT',
    next: { revalidate: 0 },
    headers: { Authorization: `Bearer ${cookies().get('token')?.value}` },
  })
    .then((res) => res.json())
    .then((data) => {
      revalidatePath(`/dashboard/axes/detail/sub-axe?id=${data.fk_subaxe_id}`)
      return data
    })
    .catch((err) => {
      throw new Error(err.message)
    })
}

/*  get Criteria by id */

export async function GET_Criteria(id: String): Promise<CriteriaType> {
  return await fetch(`${process.env.NEXT_PUBLIC_APP_SERVER}/api/criteria/${id}`, {
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

export async function PUT_Criteria(criteria: CriteriaType): Promise<CriteriaType> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_SERVER}/api/criteria`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cookies().get('token')?.value}`,
      },
      body: JSON.stringify(criteria),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    revalidatePath(`/dashboard/axes/detail/sub-axe?id=${criteria.fk_subaxe_id}`)
    return data
  } catch (err) {
    throw new Error(`Failed to add sub-axe`)
  }
}
