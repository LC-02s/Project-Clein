'use client'

import { CONTENT_ID } from '@/widgets/skip-content'
import { type CommonErrorProps } from '@/shared/api'
import { ErrorFallback } from '@/shared/ui'

const CommonError: React.FC<CommonErrorProps> = (props) => (
  <section id={CONTENT_ID} className="flex-1">
    <ErrorFallback {...props} />
  </section>
)

export default CommonError
