import { BlogLayout, KeywordsDrawerTrigger } from '@/widgets/blog-layout'
import { PageController } from '@/widgets/page-controller'
import { PostKeyword } from '@/widgets/post-keyword'
import { PostList } from '@/widgets/post-list'
import { Profile, ProfileSkeleton } from '@/widgets/profile'
import { SortDropdownButton } from '@/features/change-sort-type'
import { LinkWithLoader } from '@/features/loader'
import { type PostListParamsKey, getPostList, POST_LIST_PARAMS } from '@/entities/post'
import type { SearchParams } from '@/shared/api'
import { BLOG_PATH } from '@/shared/config'
import {
  createSearchParamsFilter,
  joinSortParams,
  DEFAULT_PAGE_SIZE,
  DEFAULT_SORT_PARAMS,
} from '@/shared/lib'

interface BlogMainPageProps {
  searchParams: Promise<SearchParams>
}

const BlogMainPage: React.FC<BlogMainPageProps> = async ({ searchParams }) => {
  const { page, contents, sorted, keywords } = await getPostList(await searchParams)
  const sortParams = joinSortParams(sorted.from, sorted.at)

  const href = createSearchParamsFilter<PostListParamsKey>({
    params: [
      [POST_LIST_PARAMS.PAGE, page.current],
      [POST_LIST_PARAMS.SIZE, page.size, DEFAULT_PAGE_SIZE],
      [POST_LIST_PARAMS.SORT, sortParams, DEFAULT_SORT_PARAMS],
      [POST_LIST_PARAMS.KEYWORD, keywords.current],
    ],
    pathname: BLOG_PATH,
  })

  return (
    <BlogLayout
      profile={<Profile />}
      profileFallback={ProfileSkeleton}
      keywords={
        <PostKeyword
          baseURL={href([POST_LIST_PARAMS.KEYWORD, POST_LIST_PARAMS.PAGE])}
          keywords={keywords}
        />
      }
    >
      <PostList contents={contents} length={page.length} sortedFrom={sorted.from}>
        <KeywordsDrawerTrigger active={!!keywords.current} />
        <SortDropdownButton<PostListParamsKey>
          sortParams={sortParams}
          paramsKey={POST_LIST_PARAMS.SORT}
          baseURL={href([POST_LIST_PARAMS.SORT])}
          renderLink={LinkWithLoader}
          className="-right-2"
        />
      </PostList>
      <PageController
        page={page}
        baseURL={href([POST_LIST_PARAMS.PAGE])}
        className="mt-8 border-t pl-0.5 pt-6"
      />
    </BlogLayout>
  )
}

export default BlogMainPage
