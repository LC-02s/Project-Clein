import { type NextRequest, NextResponse } from 'next/server'
import { KeywordRepository } from '@/database/keywords'
import { PostRepository } from '@/database/posts'
import type { SearchPostItem, SearchPostResponse } from '@/entities/post'
import { SEARCH_POST_PARAMS } from '@/entities/post'
import { exceptionMessage } from '@/shared/api'
import { Pagination, sortByDate } from '@/shared/lib'

export const GET = (request: NextRequest) => {
  const { searchParams } = request.nextUrl
  const query = searchParams.get(SEARCH_POST_PARAMS.QUERY)

  if (!query) {
    return NextResponse.json(exceptionMessage('검색어를 입력해주세요'), { status: 400 })
  }

  const word = query.toLowerCase()
  const targetPosts = PostRepository.getEntries()
    .filter(([, data]) => {
      return (
        data.title.toLowerCase().includes(word) ||
        data.description.toLowerCase().includes(word) ||
        data.thumbnail.alt.toLowerCase().includes(word) ||
        data.keywords.some((key) => KeywordRepository.findById(key).toLowerCase().includes(word)) ||
        data.externalTags?.some((tag) => tag.toLowerCase().includes(word))
      )
    })
    .map(([id]) => ({ id, ...PostRepository.findById(id) }))
    .sort(sortByDate().compare)

  const { page, range } = new Pagination(searchParams, targetPosts.length).response()
  const contents = range
    .map((index) => targetPosts[index])
    .filter((data) => !!data)
    .map<SearchPostItem>(({ id, title }) => ({ id, title }))

  return NextResponse.json({ page, contents } satisfies SearchPostResponse)
}
