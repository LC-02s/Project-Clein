'use client'

import type { CommonErrorProps } from '@/shared/api'
import { ErrorFallback } from '@/shared/ui'

const CommonError: React.FC<CommonErrorProps> = (props) => (
  <section id="content" className="flex-1">
    <ErrorFallback {...props} />
  </section>
)

export default CommonError
