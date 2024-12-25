import type { Metadata } from 'next'
import { UnderConstruction } from '@/entities/page'

export const metadata: Metadata = {
  title: 'Playground',
}

export default function PlaygroundMainPage() {
  return <UnderConstruction />
}
