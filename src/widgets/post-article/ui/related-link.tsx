import { LinkWithLoader } from '@/features/loader'
import type { PostDetail } from '@/entities/post'
import { BLOG_PATH } from '@/shared/config'
import { cn } from '@/shared/lib'
import { buttonVariants } from '@/shared/ui'

const relatedLinkVariants = {
  prev: { label: '이전', comment: '처음', style: { items: 'items-start', align: 'text-left' } },
  next: { label: '다음', comment: '마지막', style: { items: 'items-end', align: 'text-right' } },
}

export interface RelatedLinkProps {
  post: PostDetail['related']['prev']
  type: keyof typeof relatedLinkVariants
}

export const RelatedLink: React.FC<RelatedLinkProps> = ({ post, type }) => {
  const { label, comment, style } = relatedLinkVariants[type]

  if (!post) {
    return (
      <span className="hidden items-center justify-center overflow-hidden rounded-lg bg-zinc-50 p-3 font-medium text-zinc-500 md:flex md:w-[calc(50%-0.5rem)] md:text-lg dark:bg-zinc-800 dark:text-zinc-400">
        {comment} 포스트에요
      </span>
    )
  }

  return (
    <LinkWithLoader
      href={`${BLOG_PATH}/${post.id}`}
      title={`${label} 포스트 바로가기: ${post.title}`}
      className={cn(
        buttonVariants({ size: 'md' }),
        'h-auto flex-col justify-center overflow-hidden py-3 md:w-[calc(50%-0.5rem)] md:px-4 md:text-lg',
        style.items,
      )}
    >
      <span
        className={cn('block text-sm text-zinc-500 md:text-base dark:text-zinc-400', style.align)}
      >
        {label} 포스트
      </span>
      <strong className={cn('mt-1 block w-full truncate font-bold', style.align)}>
        {post.title}
      </strong>
    </LinkWithLoader>
  )
}
