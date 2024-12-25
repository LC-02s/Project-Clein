import type { Metadata } from 'next'
import { MAIN_PAGE_TITLE } from '@/entities/page'

export const metadata: Metadata = {
  title: {
    template: `%s - ${MAIN_PAGE_TITLE}`,
    default: MAIN_PAGE_TITLE,
  },
}

export default function StaticLayout({ children }: React.PropsWithChildren) {
  return (
    <section id="content" className="relative flex-1">
      {children}
    </section>
  )
}
