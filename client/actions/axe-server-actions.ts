'use server'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'

import * as yup from 'yup'
  


/* list of axes with pagenation and filter */

export async function GET(
  axe_name: string = '',
  visibility: boolean | undefined = undefined, // Make visibility parameter optional
  page: number = 0,
  size: number = 10,
  sort: string = 'createdAt',
  dir: string = 'desc'
): Promise<AxeResponseType> {
  const token = cookies().get('token')?.value;

  const queryParams = new URLSearchParams({
    axe_name: axe_name,
    visibility: visibility !== undefined ? String(visibility) : '',
    page: String(page),
    size: String(size),
    sort: sort,
    dir: dir,
  });

  const url = `${process.env.NEXT_PUBLIC_APP_SERVER}/api/axes?${queryParams.toString()}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch data from the server');
    }

    return response.json();
  } catch (error) {
    throw new Error("error");
  }
}

/* creat of axes  */

export async function POST(axe: AxeType): Promise<AxeType> {
  console.log(axe);
  return fetch(`${process.env.NEXT_PUBLIC_APP_SERVER}/api/axes`, {
    method: 'POST',
    next: { revalidate: 0 },
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${cookies().get('token')?.value}` },
    body: JSON.stringify(axe),
  })
    .then((res) => res.json())
     .then((data) => {
      revalidatePath('/dashboard/consultants')
      return data
    })
    .catch((err) => {
      throw new Error(err.message);
    });
}



/* find axes by ID  */
 
export async function FIND(id: string): Promise<AxeType> {
 return await fetch(`${process.env.NEXT_PUBLIC_APP_SERVER}/api/axes/${id}`, {
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


/* Update Axe */

export async function PUT(axe: AxeType): Promise<AxeType> {
  return await fetch(`${process.env.NEXT_PUBLIC_APP_SERVER}/api/axes/`, {
    method: 'PUT',
    next: { revalidate: 0 },
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${cookies().get('token')?.value}` },
    body: JSON.stringify(axe),
  })
    .then((res) => res.json())
    .then((data) => {
     
      return data
    })
    .catch((err) => {
      throw new Error(err.message)
    })
}


export async function PUTVisibility(id: string): Promise<AxeType> {
 return await fetch(`${process.env.NEXT_PUBLIC_APP_SERVER}/api/axes/${id}`, {
    method: 'PUT',
    next: { revalidate: 0 }, 
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
