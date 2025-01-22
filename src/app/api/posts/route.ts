import { type NextRequest, NextResponse } from 'next/server'
import { PostRepository } from '@/database/posts'
import type { GetPostListResponse, PostItem, Keyword } from '@/entities/post'
import {
  connectPostDB,
  connectPostByKeywordDB,
  convertPostItem,
  POST_LIST_PARAMS,
} from '@/entities/post'
import { sortByDate, Pagination } from '@/shared/lib'

export const PostDB = await connectPostDB()

export const PostByKeywordDB = await connectPostByKeywordDB()

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl

  const keywordParams = searchParams.get(POST_LIST_PARAMS.KEYWORD)
  const keyword =
    keywordParams && PostByKeywordDB.has(keywordParams as Keyword)
      ? (keywordParams as Keyword)
      : null

  const targetPosts = keyword
    ? [...PostByKeywordDB.get(keyword)!.values()]
    : PostRepository.getKeys()

  const sortParams = searchParams.get(POST_LIST_PARAMS.SORT)
  const { sorted, compare } = sortByDate<PostItem>(sortParams)

  const sortedPostItems = targetPosts.map((id) => convertPostItem(PostDB.get(id)!)).sort(compare)
  const pagination = new Pagination<PostItem>(searchParams, sortedPostItems.length)

  return NextResponse.json({
    ...pagination.response((list: PostItem[], index: number) => {
      const post = sortedPostItems[index]

      if (post) {
        list.push(post)
      }

      return list
    }),
    sorted,
    keyword,
  } satisfies GetPostListResponse)
}
