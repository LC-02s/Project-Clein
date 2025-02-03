import type { SeparatedKeywordsKey } from '@/entities/post'
import type { PostDetail } from '@/entities/post'
import { type PropsWithClassName, cn } from '@/shared/lib'
import { KeywordsBadge } from './keywords-badge'
import { RelatedLink } from './related-link'

export interface ArticleFooterProps
  extends Pick<PostDetail, SeparatedKeywordsKey | 'related'>,
    PropsWithClassName {}

export const ArticleAside: React.FC<ArticleFooterProps> = ({
  tags,
  projects,
  series,
  related,
  className,
}) => (
  <aside className={cn('mt-12 md:mt-16', className)}>
    <div className="mb-8 space-y-6 md:mb-12">
      <KeywordsBadge keywords={tags} label="태그" />
      <KeywordsBadge keywords={projects} label="프로젝트" />
      <KeywordsBadge keywords={series} label="시리즈" />
    </div>
    <p className="items-stretch justify-between space-y-3 md:flex md:space-x-3 md:space-y-0">
      <RelatedLink post={related.prev} type="prev" />
      <RelatedLink post={related.next} type="next" />
    </p>
  </aside>
)
