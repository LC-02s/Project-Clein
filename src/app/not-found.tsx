import type { Metadata } from 'next'
import { NotFound, MAIN_PAGE_TITLE } from '@/entities/page'

export const metadata: Metadata = {
  title: `Page Not Found - ${MAIN_PAGE_TITLE}`,
}

export default function NotFoundPage() {
  return (
    <section className="wrapper flex flex-1 flex-col items-center justify-center pb-[16vh] pt-[12vh]">
      <NotFound />
    </section>
  )
}
