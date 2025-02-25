import type { PostDetail } from '@/entities/post'
import { type SortedFromDateKey, type PropsWithClassName, cn } from '@/shared/lib'
import { Container, ReadingTimeText } from '@/shared/ui'

export type ArticleSummaryProps = PropsWithClassName<
  Pick<PostDetail, 'readingTime' | SortedFromDateKey>
>

export const ArticleSummary: React.FC<ArticleSummaryProps> = ({
  createdAt,
  updatedAt,
  readingTime,
  className,
}) => (
  <Container
    className={cn('block w-full space-y-2 border p-4 text-sm md:text-base', className)}
    component="dl"
  >
    <div className="flex">
      <dt className="w-14 md:w-16">작성일 :</dt>
      <dd>{createdAt}</dd>
    </div>
    {createdAt !== updatedAt && (
      <div className="flex">
        <dt className="w-14 md:w-16">수정일 :</dt>
        <dd>{updatedAt}</dd>
      </div>
    )}
    <div className="flex">
      <dt className="w-14 md:w-16" style={{ letterSpacing: -0.32 }}>
        분 &nbsp;&nbsp; 량 :
      </dt>
      <dd>
        <ReadingTimeText value={readingTime} />
      </dd>
    </div>
  </Container>
)
