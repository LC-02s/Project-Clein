import { type NextRequest, NextResponse } from 'next/server'
import { KeywordRepository, SeriesRepository } from '@/database/keywords'
import { PostRepository } from '@/database/posts'
import { ProjectRepository } from '@/database/projects'
import type { GetPostListResponse, PostItem, Keyword, PostId } from '@/entities/post'
import { POST_LIST_PARAMS, computeReadingTime, createSeparateKeywords } from '@/entities/post'
import { getMarkdownContent } from '@/shared/api'
import { sortByDate, Pagination } from '@/shared/lib'

export const GET = async (request: NextRequest) => {
  const { searchParams } = request.nextUrl

  const postKeysAll = PostRepository.getKeys()
  const postByKeywordMap = postKeysAll.reduce((map, id) => {
    PostRepository.findById(id).keywords.forEach((keyword) => {
      map.set(keyword, (map.get(keyword) ?? new Set()).add(id))
    })

    return map
  }, new Map<Keyword, Set<PostId>>())

  const keywordParams = searchParams.get(POST_LIST_PARAMS.KEYWORD)
  const keyword =
    keywordParams && postByKeywordMap.has(keywordParams as Keyword)
      ? (keywordParams as Keyword)
      : null

  const targetPostIds = keyword ? [...postByKeywordMap.get(keyword)!.values()] : postKeysAll

  const sortParams = searchParams.get(POST_LIST_PARAMS.SORT)
  const { sorted, compare } = sortByDate<PostItem>(sortParams)

  const { page, range } = new Pagination(searchParams, targetPostIds.length).response()
  const targetPosts = range
    .map((index) => targetPostIds[index])
    .filter((post) => !!post)
    .map<Promise<PostItem>>(async (id) => ({
      id,
      readingTime: computeReadingTime(await getMarkdownContent(`/articles/${id}`)),
      ...PostRepository.findById(id),
    }))

  const contents: PostItem[] = await Promise.all(targetPosts)

  const separateKeywords = createSeparateKeywords({
    projects: new Set(ProjectRepository.getKeys()),
    series: new Set(SeriesRepository.getKeys()),
  })

  return NextResponse.json({
    page,
    contents: contents.sort(compare),
    sorted,
    keywords: {
      current: keyword,
      total: postKeysAll.length,
      ...separateKeywords([...postByKeywordMap.keys()], (keyword) => ({
        id: keyword,
        name: KeywordRepository.findById(keyword),
        length: postByKeywordMap.get(keyword)!.size,
      })),
    },
  } satisfies GetPostListResponse)
}
