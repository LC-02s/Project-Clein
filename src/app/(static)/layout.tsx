import { CONTENT_ID } from '@/widgets/skip-content'

const StaticLayout: React.FC<React.PropsWithChildren> = ({ children }) => (
  <section id={CONTENT_ID} className="relative flex-1">
    {children}
  </section>
)

export default StaticLayout
