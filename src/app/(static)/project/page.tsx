import type { Metadata } from 'next'
import { LoadComplete } from '@/features/loader'
import { UnderConstruction } from '@/entities/site'

export const metadata: Metadata = {
  title: 'Project',
}

export default function ProjectMainPage() {
  return (
    <LoadComplete>
      <UnderConstruction />
    </LoadComplete>
  )
}
