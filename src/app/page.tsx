import { LoadComplete } from '@/features/loader'
import { UnderConstruction } from '@/shared/ui'

export default function MainPage() {
  return (
    <main id="main" className="flex-1">
      <LoadComplete>
        <UnderConstruction />
      </LoadComplete>
    </main>
  )
}
