import { type NextRequest, NextResponse } from 'next/server'

import { KeywordEntity, SeriesEntity } from '@/database/keywords'
import { PostEntity } from '@/database/posts'
import { ProjectEntity } from '@/database/projects'
import {
  type GetPostDetailResponse,
  type MappedKeyword,
  type PostId,
  computeReadingTime,
  createSeparateKeywords,
} from '@/entities/post'
import { exceptionMessage, getMarkdownContent } from '@/shared/api'
import { pick, sortByDate, joinSortParams, SORT_TYPE, SORTED_FROM_DATE } from '@/shared/lib'

interface GetPostDetailParams {
  params: Promise<{ postId: PostId }>
}

export const GET = async (_: NextRequest, { params }: GetPostDetailParams) => {
  const { postId } = await params
  const { compare } = sortByDate(joinSortParams(SORTED_FROM_DATE.CREATE, SORT_TYPE.ASC))
  const posts = PostEntity.getEntries()
    .map(([id, data]) => Object.assign(data, { id }))
    .sort(compare)

  const currentIndex = posts.findIndex(({ id, createdAt }) => {
    return id === postId || createdAt.split(' ')[0] === postId // NOTE - 레거시 ID 대응
  })

  if (!(0 <= currentIndex && currentIndex < posts.length)) {
    return NextResponse.json(exceptionMessage('요청하신 포스트를 찾지 못했어요'), { status: 404 })
  }

  const { id: targetId, keywords, ...rest } = posts[currentIndex]
  const content = await getMarkdownContent(`/articles/${targetId}`).catch(() => '')

  const separateKeywords = createSeparateKeywords({
    projects: new Set(ProjectEntity.getKeys()),
    series: new Set(SeriesEntity.getKeys()),
  })

  const prevPostId = posts[currentIndex - 1]?.id
  const nextPostId = posts[currentIndex + 1]?.id

  return NextResponse.json({
    post: {
      id: targetId,
      content,
      readingTime: computeReadingTime(content),
      ...rest,
      ...separateKeywords<MappedKeyword>(keywords, (keyword) => ({
        id: keyword,
        name: KeywordEntity.findById(keyword),
      })),
      related: {
        prev: prevPostId
          ? { id: prevPostId, ...pick(PostEntity.findById(prevPostId), ['title']) }
          : null,
        next: nextPostId
          ? { id: nextPostId, ...pick(PostEntity.findById(nextPostId), ['title']) }
          : null,
      },
    },
  } satisfies GetPostDetailResponse)
}
