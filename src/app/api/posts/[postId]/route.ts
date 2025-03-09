import { type NextRequest, NextResponse } from 'next/server'
import { KeywordEntity, SeriesEntity } from '@/database/keywords'
import { PostEntity } from '@/database/posts'
import { ProjectEntity } from '@/database/projects'
import type { GetPostDetailResponse, MappedKeyword, PostId } from '@/entities/post'
import { computeReadingTime, createSeparateKeywords } from '@/entities/post'
import { exceptionMessage, getMarkdownContent } from '@/shared/api'
import { orderByDateAsc } from '@/shared/lib'

interface GetPostDetailParams {
  params: Promise<{ postId: PostId }>
}

export const GET = async (_: NextRequest, { params }: GetPostDetailParams) => {
  const { postId } = await params
  const post = PostEntity.findById(postId)

  if (!post) {
    return NextResponse.json(exceptionMessage('요청하신 포스트를 찾지 못했어요'), { status: 404 })
  }

  const content = await getMarkdownContent(`/articles/${postId}`).catch(() => '')

  const { keywords, ...rest } = post
  const separateKeywords = createSeparateKeywords({
    projects: new Set(ProjectEntity.getKeys()),
    series: new Set(SeriesEntity.getKeys()),
  })

  const postKeys = PostEntity.getKeys().sort(orderByDateAsc)
  const currentIndex = postKeys.findIndex((key) => key === postId)

  const prevPostId = postKeys[currentIndex - 1]
  const nextPostId = postKeys[currentIndex + 1]

  return NextResponse.json({
    post: {
      id: postId,
      content,
      readingTime: computeReadingTime(content),
      ...rest,
      ...separateKeywords<MappedKeyword>(keywords, (keyword) => ({
        id: keyword,
        name: KeywordEntity.findById(keyword),
      })),
      related: {
        prev: prevPostId ? { id: prevPostId, title: PostEntity.findById(prevPostId).title } : null,
        next: nextPostId ? { id: nextPostId, title: PostEntity.findById(nextPostId).title } : null,
      },
    },
  } satisfies GetPostDetailResponse)
}
