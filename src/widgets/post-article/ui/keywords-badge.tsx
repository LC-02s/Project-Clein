import { POST_LIST_PARAMS, type MappedKeyword, type PostListParamsKey } from '@/entities/post'
import { BLOG_PATH } from '@/shared/config'
import { createSearchParamsToURL, DEFAULT_PAGE } from '@/shared/lib'
import { Button, LinkWithLoader } from '@/shared/ui'

export interface KeywordsBadgeProps {
  keywords: MappedKeyword[]
  label: string
}

export const KeywordsBadge: React.FC<KeywordsBadgeProps> = ({ keywords, label }) => {
  if (keywords.length <= 0) {
    return null
  }

  const href = createSearchParamsToURL<PostListParamsKey>(BLOG_PATH)

  return (
    <div className="items-start justify-start md:flex">
      <h3 className="mb-2 whitespace-nowrap px-1 pr-2 text-base font-medium text-gray-500 md:mb-0 md:w-32 md:text-lg md:leading-9 dark:text-gray-400">
        관련 {label} :
      </h3>
      <ul className="flex flex-wrap items-center justify-start gap-2 md:w-[calc(100%-8rem)]">
        {keywords.map(({ id, name }) => (
          <li key={id}>
            <Button
              href={href([POST_LIST_PARAMS.PAGE, DEFAULT_PAGE], [POST_LIST_PARAMS.KEYWORD, id])}
              title={`페이지 이동: ${name} ${label}별 모아보기`}
              color="info"
              className="py-1 md:h-9"
              component={LinkWithLoader}
            >
              {name}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  )
}
