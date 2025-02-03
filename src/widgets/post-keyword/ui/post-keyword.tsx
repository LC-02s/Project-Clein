import type { GetPostListResponse, Keyword, PostListParamsKey } from '@/entities/post'
import { POST_LIST_PARAMS } from '@/entities/post'
import { type PropsWithClassName, cn, createSearchParamsToURL, DEFAULT_PAGE } from '@/shared/lib'
import { FallbackRender, Icon } from '@/shared/ui'
import { BadgeLink, BarLink, type KeywordLinkProps } from './keyword-link'
import { KeywordList } from './keyword-list'
import { KeywordTitle } from './keyword-title'

export interface PostKeywordProps
  extends PropsWithClassName,
    Pick<GetPostListResponse, 'keywords'> {
  baseURL: string
}

export const PostKeyword: React.FC<PostKeywordProps> = ({
  baseURL,
  keywords: { current, tags, series, projects, total },
  className,
}) => {
  const href = createSearchParamsToURL<PostListParamsKey>(baseURL)
  const props = (keyword: Keyword) => {
    const { PAGE, KEYWORD } = POST_LIST_PARAMS
    const isActive = current === keyword

    return {
      href: href([PAGE, DEFAULT_PAGE], [KEYWORD, !isActive && keyword]),
      active: isActive,
    } satisfies Pick<KeywordLinkProps, 'href' | 'active'>
  }

  return (
    <div className={cn('h-fit w-full space-y-6', className)}>
      <FallbackRender render={tags.length <= 0}>
        <div>
          <KeywordTitle label="태그" icon={Icon.LabelEmoji} />
          <KeywordList
            className="flex flex-wrap items-center justify-start gap-2"
            list={tags}
            renderItem={({ id, ...rest }) => <BadgeLink label="태그" {...props(id)} {...rest} />}
          >
            <li>
              <BadgeLink
                href={href([POST_LIST_PARAMS.PAGE, DEFAULT_PAGE])}
                label="태그"
                name="전체"
                length={total}
                active={!current}
              />
            </li>
          </KeywordList>
        </div>
      </FallbackRender>
      <FallbackRender render={series.length <= 0}>
        <div>
          <KeywordTitle label="시리즈" icon={Icon.NoteBookEmoji} />
          <KeywordList
            className="space-y-2"
            list={series}
            renderItem={({ id, ...rest }) => <BarLink label="시리즈" {...props(id)} {...rest} />}
          />
        </div>
      </FallbackRender>
      <FallbackRender render={projects.length <= 0}>
        <div>
          <KeywordTitle label="프로젝트" icon={Icon.RocketEmoji} />
          <KeywordList
            className="space-y-2"
            list={projects}
            renderItem={({ id, ...rest }) => <BarLink label="프로젝트" {...props(id)} {...rest} />}
          />
        </div>
      </FallbackRender>
    </div>
  )
}
