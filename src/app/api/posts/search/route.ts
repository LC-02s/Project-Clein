import { type NextRequest, NextResponse } from 'next/server'
import { KeywordRepository } from '@/database/posts'
import type { PostId, PostItem, SearchPostResponse } from '@/entities/post'
import { convertPostItem, SEARCH_POST_PARAMS } from '@/entities/post'
import { exceptionMessage } from '@/shared/api'
import { Pagination, sortByDate } from '@/shared/lib'
import { PostDB } from '../route'

const searchIndexOfPost = [...PostDB].map<[PostId, string]>(([id, post]) => [
  id,
  [
    post.title,
    post.description,
    post.keywords.map((k) => KeywordRepository.findById(k)).join(' '),
    post.externalTags?.join(' ') ?? '',
    post.thumbnail.alt,
    post.content,
  ]
    .join(' ')
    .toLowerCase(),
])

export const GET = (request: NextRequest) => {
  const { searchParams } = request.nextUrl
  const query = searchParams.get(SEARCH_POST_PARAMS.QUERY)

  if (!query) {
    return NextResponse.json(exceptionMessage('검색어를 입력해주세요'), { status: 400 })
  }

  const word = query.toLowerCase()
  const targetPosts = searchIndexOfPost
    .filter(([, index]) => index.includes(word))
    .map(([id]) => convertPostItem(PostDB.get(id)!))
    .sort(sortByDate().compare)

  const pagination = new Pagination<PostItem>(searchParams, targetPosts.length)

  return NextResponse.json({
    ...pagination.response((list: PostItem[], index: number) => {
      const post = targetPosts[index]

      if (post) {
        list.push(post)
      }

      return list
    }),
  } satisfies SearchPostResponse)
}
