import type { Metadata } from 'next'
import { LoadComplete } from '@/features/loader'
import { UnderConstruction } from '@/shared/ui'

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
