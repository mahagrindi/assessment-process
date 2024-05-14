import { cookies } from 'next/headers';

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


export async function POST(axe: AxeType): Promise<AxeType> {
  console.log(axe);
  return fetch(`${process.env.NEXT_PUBLIC_APP_SERVER}/api/axes`, {
    method: 'POST',
    next: { revalidate: 0 },
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${cookies().get('token')?.value}` },
    body: JSON.stringify(axe),
  })
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => {
      throw new Error(err.message);
    });
}




export async function getAxeDetails(  id : string = '97864'): Promise<AxeType> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_SERVER}/api/axes/?id=${id}`, {
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