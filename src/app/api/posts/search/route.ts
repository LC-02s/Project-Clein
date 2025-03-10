import { type NextRequest, NextResponse } from 'next/server'

import { KeywordEntity } from '@/database/keywords'
import { PostEntity } from '@/database/posts'
import { type SearchPostItem, type SearchPostResponse, SEARCH_POST_PARAMS } from '@/entities/post'
import { exceptionMessage } from '@/shared/api'
import { Pagination, pick, sortByDate } from '@/shared/lib'

export const GET = (request: NextRequest) => {
  const { searchParams } = request.nextUrl
  const query = searchParams.get(SEARCH_POST_PARAMS.QUERY)

  if (!query) {
    return NextResponse.json(exceptionMessage('검색어를 입력해주세요'), { status: 400 })
  }

  const word = query.toLowerCase()
  const targetPosts = PostEntity.getEntries()
    .filter(([, data]) => {
      return (
        data.title.toLowerCase().includes(word) ||
        data.description.toLowerCase().includes(word) ||
        data.thumbnail.alt.toLowerCase().includes(word) ||
        data.keywords.some((key) => KeywordEntity.findById(key).toLowerCase().includes(word)) ||
        data.externalTags?.some((tag) => tag.toLowerCase().includes(word))
      )
    })
    .map(([id, data]) => ({ id, ...data }))
    .sort(sortByDate().compare)

  const { page, range } = new Pagination(searchParams, targetPosts.length).response()
  const contents = range
    .map((index) => targetPosts[index])
    .filter((post) => !!post)
    .map<SearchPostItem>((post) => pick(post, ['id', 'title']))

  return NextResponse.json({ page, contents } satisfies SearchPostResponse)
}
