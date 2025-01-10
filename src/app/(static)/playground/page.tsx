import type { Metadata } from 'next'
import { LoadComplete } from '@/features/loader'
import { UnderConstruction } from '@/entities/site'

export const metadata: Metadata = {
  title: 'Playground',
}

export default function PlaygroundMainPage() {
  return (
    <LoadComplete>
      <UnderConstruction />
    </LoadComplete>
  )
}
