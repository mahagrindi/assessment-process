import { type JSX } from 'react'
import { ContentHeader } from '@/components/content-header'

export default function Page({ params, searchParams }: { params: { slug: string }; searchParams: { program: string; id: string } }): JSX.Element {
  return (
    <>
      <ContentHeader title={params.slug} />
    </>
  )
}
