import type { Metadata } from 'next'
import { MAIN_PAGE_TITLE } from '@/views/main'

export const metadata: Metadata = {
  title: {
    template: `%s - ${MAIN_PAGE_TITLE}`,
    default: MAIN_PAGE_TITLE,
  },
}

export default function StaticLayout({ children }: React.PropsWithChildren) {
  return <>{children}</>
}
