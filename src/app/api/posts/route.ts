import { type NextRequest, NextResponse } from 'next/server'

import { KeywordEntity, SeriesEntity } from '@/database/keywords'
import { PostEntity } from '@/database/posts'
import { ProjectEntity } from '@/database/projects'
import {
  type GetPostListResponse,
  type PostItem,
  type Keyword,
  type PostId,
  POST_LIST_PARAMS,
  computeReadingTime,
  createSeparateKeywords,
} from '@/entities/post'
import { getMarkdownContent } from '@/shared/api'
import { Pagination, omit, sortByDate } from '@/shared/lib'

export const GET = async (request: NextRequest) => {
  const { searchParams } = request.nextUrl

  const postKeysAll = PostEntity.getKeys()
  const postByKeywordMap = postKeysAll.reduce((map, id) => {
    PostEntity.findById(id).keywords.forEach((keyword) => {
      map.set(keyword, (map.get(keyword) ?? new Set<PostId>()).add(id))
    })

    return map
  }, new Map<Keyword, Set<PostId>>())

  const keywordParams = searchParams.get(POST_LIST_PARAMS.KEYWORD)
  const keyword =
    keywordParams && postByKeywordMap.has(keywordParams as Keyword)
      ? (keywordParams as Keyword)
      : null

  const targetPostIds = keyword ? [...postByKeywordMap.get(keyword)!] : postKeysAll

  const sortParams = searchParams.get(POST_LIST_PARAMS.SORT)
  const { sorted, compare } = sortByDate<PostItem>(sortParams)

  const { page, range } = new Pagination(searchParams, targetPostIds.length).response()
  const targetPosts = range
    .map((index) => targetPostIds[index])
    .filter((postId) => !!postId)
    .map(async (id) => {
      const content = await getMarkdownContent(`/articles/${id}`).catch(() => '')
      const post = PostEntity.findById(id)

      return {
        ...omit(post, ['keywords', 'externalTags']),
        id,
        readingTime: computeReadingTime(content),
      } as PostItem
    })

  const sortedContents: PostItem[] = (await Promise.all(targetPosts)).sort(compare)

  const separateKeywords = createSeparateKeywords({
    projects: new Set(ProjectEntity.getKeys()),
    series: new Set(SeriesEntity.getKeys()),
  })

  return NextResponse.json({
    page,
    contents: sortedContents,
    sorted,
    keywords: {
      current: keyword,
      total: postKeysAll.length,
      ...separateKeywords([...postByKeywordMap.keys()], (keyword) => ({
        id: keyword,
        name: KeywordEntity.findById(keyword),
        length: postByKeywordMap.get(keyword)!.size,
      })),
    },
  } satisfies GetPostListResponse)
}
