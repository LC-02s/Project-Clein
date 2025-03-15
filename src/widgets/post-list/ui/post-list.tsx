import { type PostItem } from '@/entities/post'
import {
  type PropsWithClassName,
  type SortedFromDateKey,
  formatDateFromNow,
  omit,
} from '@/shared/lib'
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
    <div className="relative mb-4 flex flex-col-reverse items-center justify-between sm:flex-row">
      <h2 className="sr-only">포스트 목록</h2>
      <p className="mt-6 flex w-full items-center px-1 sm:mt-0 sm:w-auto">
        <Icon.PageEmoji className="mr-2" />
        <span className="block break-keep text-sm font-medium text-gray-500 md:text-base dark:text-gray-400">
          {length}개의 포스트가 있어요
        </span>
      </p>
      <div className="flex w-full items-center justify-end space-x-2 sm:w-auto">{children}</div>
    </div>
    <ul className="space-y-4">
      {contents.map((props) => (
        <li key={props.id}>
          <PostLink
            {...omit(props, ['createdAt', 'updatedAt'])}
            date={formatDateFromNow(props[sortedFrom])}
          />
        </li>
      ))}
    </ul>
  </div>
)
