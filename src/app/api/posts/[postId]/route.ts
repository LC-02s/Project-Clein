import { type NextRequest, NextResponse } from 'next/server'
import { KeywordRepository, SeriesRepository } from '@/database/keywords'
import { PostRepository } from '@/database/posts'
import { ProjectRepository } from '@/database/projects'
import type { GetPostDetailResponse, MappedKeyword, PostId } from '@/entities/post'
import { computeReadingTime, createSeparateKeywords } from '@/entities/post'
import { exceptionMessage, getMarkdownContent } from '@/shared/api'
import { orderByDateAsc } from '@/shared/lib'

interface GetPostDetailParams {
  params: Promise<{ postId: PostId }>
}

export const GET = async (_: NextRequest, { params }: GetPostDetailParams) => {
  const { postId } = await params
  const post = PostRepository.findById(postId)

  if (!post) {
    return NextResponse.json(exceptionMessage('요청하신 포스트를 찾지 못했어요'), { status: 404 })
  }

  const content = await getMarkdownContent(`/articles/${postId}`).catch(() => '')

  const { keywords, ...rest } = post
  const separateKeywords = createSeparateKeywords({
    projects: new Set(ProjectRepository.getKeys()),
    series: new Set(SeriesRepository.getKeys()),
  })

  const postKeys = PostRepository.getKeys().sort(orderByDateAsc)
  const currentIndex = postKeys.findIndex((key) => key === postId)

  const prevPostId = currentIndex ? postKeys[currentIndex - 1] : null
  const nextPostId = currentIndex !== postKeys.length - 1 ? postKeys[currentIndex + 1] : null

  return NextResponse.json({
    post: {
      id: postId,
      content,
      readingTime: computeReadingTime(content),
      ...rest,
      ...separateKeywords<MappedKeyword>(keywords, (keyword) => ({
        id: keyword,
        name: KeywordRepository.findById(keyword),
      })),
      related: {
        prev: prevPostId
          ? { id: prevPostId, title: PostRepository.findById(prevPostId).title }
          : null,
        next: nextPostId
          ? { id: nextPostId, title: PostRepository.findById(nextPostId).title }
          : null,
      },
    },
  } satisfies GetPostDetailResponse)
}
