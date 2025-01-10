import type { Metadata } from 'next'
import { LoadComplete } from '@/features/loader'
import { UnderConstruction } from '@/entities/site'

export const metadata: Metadata = {
  title: 'About',
}

export default function AboutPage() {
  return (
    <LoadComplete>
      <UnderConstruction />
    </LoadComplete>
  )
}
