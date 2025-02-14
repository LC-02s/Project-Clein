import { CONTENT_ID } from '@/widgets/skip-content'
import { NotFound } from '@/shared/ui'

const NotFoundPage: React.FC = () => (
  <section id={CONTENT_ID} className="flex-1">
    <NotFound />
  </section>
)

export default NotFoundPage
