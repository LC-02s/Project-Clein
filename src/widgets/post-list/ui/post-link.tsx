import type { PostItem as Item } from '@/entities/post'
import { BLOG_PATH } from '@/shared/config'
import type { SortedFromDateKey } from '@/shared/lib'
import {
  LinkWithLoader,
  Button,
  Badge,
  Icon,
  ReadingTimeText,
  Container,
  ThumbnailImage,
} from '@/shared/ui'

export interface PostItemProps extends Omit<Item, SortedFromDateKey> {
  date: string
}

export const PostLink: React.FC<PostItemProps> = ({
  id,
  title,
  description,
  thumbnail,
  readingTime,
  isWriting,
  date,
}) => (
  <Button
    href={`${BLOG_PATH}/${id}`}
    title={`포스트 바로가기: ${title}`}
    size={null}
    className="group h-auto flex-col items-stretch justify-between whitespace-normal p-3 xs:p-4 md:flex-row"
    component={LinkWithLoader}
  >
    <div className="mb-5 flex w-full items-start justify-center md:mb-0 md:w-60">
      <Container
        variant="image"
        round="xs"
        className="relative aspect-thumbnail w-full dark:group-hover:border-gray-500 dark:group-hover:bg-gray-600"
      >
        <ThumbnailImage {...thumbnail} priority />
      </Container>
    </div>
    <div className="flex w-full flex-col justify-between md:w-[calc(100%-16.5rem)]">
      <div className="space-y-2">
        <h3 className="block break-keep font-bold md:text-lg">{title}</h3>
        <p className="block break-keep text-sm text-gray-500 md:text-base dark:text-gray-400">
          {description}
        </p>
      </div>
      <p className="mt-6 flex items-center space-x-2">
        <Badge
          round="xs"
          className="group-hover:bg-white dark:group-hover:border-gray-500 dark:group-hover:bg-gray-600"
        >
          <Icon.CalendarMarkOutline className="mr-1.5" />
          {date}
        </Badge>
        <Badge
          round="xs"
          className="pr-2.5 group-hover:bg-white dark:group-hover:border-gray-500 dark:group-hover:bg-gray-600"
        >
          <Icon.ClockCircleOutline className="mr-1.5" />
          <ReadingTimeText value={readingTime} />
        </Badge>
        {(readingTime < 1 || isWriting) && (
          <span className="relative pl-6 text-xs font-bold text-yellow-500 before:absolute before:inset-y-0 before:left-2.5 before:my-auto before:size-1.5 before:rounded-full before:bg-yellow-500 md:text-sm dark:text-yellow-400 dark:before:bg-yellow-400">
            작성 중
          </span>
        )}
      </p>
    </div>
  </Button>
)
