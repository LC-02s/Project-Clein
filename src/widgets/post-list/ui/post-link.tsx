import Image from 'next/image'
import { LinkWithLoader } from '@/features/loader'
import type { PostItem as Item } from '@/entities/post'
import { BLOG_PATH } from '@/shared/config'
import type { SortedFromDateKey } from '@/shared/lib'
import { cn } from '@/shared/lib'
import { buttonVariants, Badge, Icon, ReadingTimeText, Container } from '@/shared/ui'

export interface PostItemProps extends Omit<Item, SortedFromDateKey> {
  date: string
}

export const PostLink: React.FC<PostItemProps> = ({
  id,
  title,
  description,
  thumbnail,
  readingTime,
  date,
}) => (
  <LinkWithLoader
    href={`${BLOG_PATH}/${id}`}
    title={`포스트 바로가기: ${title}`}
    className={cn(
      buttonVariants({ size: 'none' }),
      'group h-auto flex-col items-stretch justify-between whitespace-normal p-3 xs:p-4 md:flex-row',
    )}
  >
    <div className="mb-5 flex w-full items-start justify-center md:mb-0 md:w-60">
      <Container
        variant="image"
        round="xs"
        className="relative aspect-thumbnail w-full dark:group-hover:border-zinc-500 dark:group-hover:bg-zinc-600"
      >
        <Image src={thumbnail.src} alt={thumbnail.alt} width={1200} height={630} priority />
      </Container>
    </div>
    <div className="flex w-full flex-col justify-between md:w-[calc(100%-16.5rem)]">
      <div className="space-y-2">
        <h3 className="block break-keep font-bold xs:text-lg">{title}</h3>
        <p className="block break-keep text-sm text-zinc-500 xs:text-base dark:text-zinc-400">
          {description}
        </p>
      </div>
      <p className="mt-6 flex items-center space-x-2">
        <Badge
          size="sm"
          round="xs"
          className="group-hover:bg-white dark:group-hover:border-zinc-500 dark:group-hover:bg-zinc-600"
        >
          <Icon.CalendarMarkOutline className="mr-1.5" />
          {date}
        </Badge>
        <Badge
          size="sm"
          round="xs"
          className="pr-2.5 group-hover:bg-white dark:group-hover:border-zinc-500 dark:group-hover:bg-zinc-600"
        >
          <Icon.ClockCircleOutline className="mr-1.5" />
          <ReadingTimeText value={readingTime} />
        </Badge>
      </p>
    </div>
  </LinkWithLoader>
)
