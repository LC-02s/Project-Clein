import type { PostDetail } from '@/entities/post'
import { type SortedFromDateKey, type PropsWithClassName, cn } from '@/shared/lib'
import { containerVariants, ReadingTimeText } from '@/shared/ui'

export interface ArticleSummaryProps
  extends Pick<PostDetail, 'readingTime' | SortedFromDateKey>,
    PropsWithClassName {}

export const ArticleSummary: React.FC<ArticleSummaryProps> = ({
  createdAt,
  updatedAt,
  readingTime,
}) => (
  <dl className={cn(containerVariants(), 'block w-full space-y-2 border p-3')}>
    <div className="flex">
      <dt className="w-16">작성일 :</dt>
      <dd>{createdAt}</dd>
    </div>
    {createdAt !== updatedAt && (
      <div className="flex">
        <dt className="w-16">수정일 :</dt>
        <dd>{updatedAt}</dd>
      </div>
    )}
    <div className="flex">
      <dt className="w-16" style={{ letterSpacing: -0.32 }}>
        분 &nbsp;&nbsp; 량 :
      </dt>
      <dd>
        <ReadingTimeText value={readingTime} />
      </dd>
    </div>
  </dl>
)
