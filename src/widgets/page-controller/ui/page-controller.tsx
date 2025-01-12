import { LoadComplete } from '@/features/loader'
import { type PageInfo, type PaginationParamsKey, PAGINATION_PARAMS } from '@/shared/lib'
import { cn, createSearchParamsToURL } from '@/shared/lib'
import { buttonVariants, Icon } from '@/shared/ui'
import PageInput from './page-input'
import PageLink from './page-link'

interface PageControllerProps extends PageInfo {
  baseURL: string
  className?: string
}

export default function PageController({ page, className, baseURL }: PageControllerProps) {
  const href = createSearchParamsToURL<PaginationParamsKey>(baseURL)
  const linkStyle = buttonVariants()

  return (
    <LoadComplete>
      <div
        className={cn(
          'flex flex-col items-center justify-between space-y-6 border-zinc-200 sm:flex-row sm:space-y-0 dark:border-zinc-600',
          className,
        )}
      >
        <PageInput
          value={page.current}
          max={page.total}
          baseURL={baseURL}
          className="w-full sm:w-auto"
        />
        <div className="flex w-full items-center justify-end space-x-2 sm:w-auto sm:justify-center">
          <PageLink
            href={href([PAGINATION_PARAMS.PAGE, page.current - 1])}
            title="이전 페이지 이동"
            className={linkStyle}
            disabled={page.first}
          >
            <Icon.ArrowOutline direction="left" />
            <span className="ml-2 pr-1">이전</span>
          </PageLink>
          <PageLink
            href={href([PAGINATION_PARAMS.PAGE, page.current + 1])}
            title="다음 페이지 이동"
            className={linkStyle}
            disabled={page.last}
          >
            <span className="mr-2 pl-1">다음</span>
            <Icon.ArrowOutline direction="right" />
          </PageLink>
        </div>
      </div>
    </LoadComplete>
  )
}
