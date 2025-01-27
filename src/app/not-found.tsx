import type { Metadata } from 'next'
import { MAIN_TITLE } from '@/shared/config'
import { NotFound } from '@/shared/ui'

export const metadata: Metadata = {
  title: `Page Not Found - ${MAIN_TITLE}`,
}

const NotFoundPage: React.FC = () => (
  <section id="not-found" className="flex-1">
    <NotFound />
  </section>
)

export default NotFoundPage
