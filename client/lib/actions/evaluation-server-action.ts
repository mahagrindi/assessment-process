'use server'

import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'


export async function getEvaluationForms(): Promise<FormEvaluationResponseType[]> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_SERVER}/api/form-evaluations/list`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${cookies().get('token')?.value}` },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch evaluation forms');
    }
    return await response.json();
  } catch (error) {
    throw new Error("error" );
  }
}




export async function getEvaluationFormsByID(  id : string = ''): Promise<FormEvaluationResponseType> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_SERVER}/api/form-evaluations/${id}`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${cookies().get('token')?.value}` },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch evaluation form By ID ');
    }
    return await response.json();
  } catch (error) {
    throw new Error("error" );
  }
}


export async function POST() {
  return 'POST'
}

export async function PUT() {
  return 'PUT'
}

