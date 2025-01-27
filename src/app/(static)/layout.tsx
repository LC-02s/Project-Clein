import type { Metadata } from 'next'
import { MAIN_TITLE } from '@/shared/config'

export const metadata: Metadata = {
  title: {
    template: `%s - ${MAIN_TITLE}`,
    default: MAIN_TITLE,
  },
}

const StaticLayout: React.FC<React.PropsWithChildren> = ({ children }) => (
  <section id="content" className="relative flex-1">
    {children}
  </section>
)

export default StaticLayout
