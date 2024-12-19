import type { Metadata } from 'next'
import { MAIN_PAGE_TITLE } from '@/views/main'

export const metadata: Metadata = {
  title: `Page Not Found - ${MAIN_PAGE_TITLE}`,
}

export default function NotFoundPage() {
  return <></>
}
