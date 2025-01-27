import type { PostItem } from '@/entities/post'
import { type PropsWithClassName, type SortedFromDateKey, formatDateFromNow } from '@/shared/lib'
import { Icon } from '@/shared/ui'
import { PostLink } from './post-link'

export interface PostListProps extends React.PropsWithChildren<PropsWithClassName> {
  contents: PostItem[]
  length: number
  sortedFrom: SortedFromDateKey
}

export const PostList: React.FC<PostListProps> = ({
  contents,
  length,
  sortedFrom,
  className,
  children,
}) => (
  <div className={className}>
    <div className="mb-4 flex flex-col-reverse items-center justify-between sm:flex-row">
      <h2 className="mt-6 flex w-full items-center px-1 sm:mt-0 sm:w-auto">
        <Icon.PageEmoji className="mr-2" />
        <span className="block break-keep text-lg font-medium text-zinc-500 dark:text-zinc-400">
          {length}개의 포스트가 있어요
        </span>
      </h2>
      <div className="flex w-full items-center justify-end space-x-2 sm:w-auto">{children}</div>
    </div>
    <ul className="space-y-4">
      {contents.map((props) => (
        <li key={props.id}>
          <PostLink
            id={props.id}
            title={props.title}
            description={props.description}
            thumbnail={props.thumbnail}
            readingTime={props.readingTime}
            date={formatDateFromNow(props[sortedFrom])}
          />
        </li>
      ))}
    </ul>
  </div>
)
