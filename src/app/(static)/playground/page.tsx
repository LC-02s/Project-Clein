import type { Metadata } from 'next'
import { UnderConstruction } from '@/entities/site'

export const metadata: Metadata = {
  title: 'Playground',
}

export default function PlaygroundMainPage() {
  return <UnderConstruction />
}
