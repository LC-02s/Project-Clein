import type { Metadata } from 'next'
import { MAIN_TITLE } from '@/entities/site'

export const metadata: Metadata = {
  title: {
    template: `%s - ${MAIN_TITLE}`,
    default: MAIN_TITLE,
  },
}

export default function StaticLayout({ children }: React.PropsWithChildren) {
  return (
    <section id="content" className="relative flex-1">
      {children}
    </section>
  )
}
