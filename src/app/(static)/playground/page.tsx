import { type Metadata } from 'next'

import { UnderConstruction } from '@/shared/ui'

export const metadata: Metadata = {
  title: 'Playground',
}

const PlaygroundMainPage: React.FC = () => <UnderConstruction />

export default PlaygroundMainPage
