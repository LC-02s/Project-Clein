import type { Metadata } from 'next'
import { NotFound, MAIN_PAGE_TITLE } from '@/entities/site'

export const metadata: Metadata = {
  title: `Page Not Found - ${MAIN_PAGE_TITLE}`,
}

export default function NotFoundPage() {
  return (
    <section id="not-found" className="flex-1">
      <NotFound />
    </section>
  )
}
