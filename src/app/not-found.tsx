import type { Metadata } from 'next'
import { MAIN_TITLE } from '@/shared/config'
import { NotFound } from '@/shared/ui'

export const metadata: Metadata = {
  title: `Page Not Found - ${MAIN_TITLE}`,
}

export default function NotFoundPage() {
  return (
    <section id="not-found" className="flex-1">
      <NotFound />
    </section>
  )
}
