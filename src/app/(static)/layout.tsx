import type { Metadata } from 'next'
import { CONTENT_ID } from '@/widgets/skip-content'
import { MAIN_TITLE } from '@/shared/config'

export const metadata: Metadata = {
  title: {
    template: `%s - ${MAIN_TITLE}`,
    default: MAIN_TITLE,
  },
}

const StaticLayout: React.FC<React.PropsWithChildren> = ({ children }) => (
  <section id={CONTENT_ID} className="relative flex-1">
    {children}
  </section>
)

export default StaticLayout
