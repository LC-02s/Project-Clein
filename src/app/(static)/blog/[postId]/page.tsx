import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { PostRepository } from '@/database/posts'
import { ContentBody } from '@/widgets/content'
import {
  ARTICLE_ID,
  ARTICLE_COMMENT_ID,
  ArticleHeader,
  ArticleAside,
  ArticleSummary,
  ArticleShareButton,
  ArticleCommentAnchor,
  ArticleLinkCopyButton,
} from '@/widgets/post-article'
import { Author } from '@/widgets/profile'
import { type PostId, getPostDetail } from '@/entities/post'
import { THUMBNAIL_SIZE, BLOG_DESCRIPTION, BLOG_KEYWORDS, NICKNAME } from '@/shared/config'
import { extractImageType } from '@/shared/lib'
import { BackgroundGrid, Comment, Container, ThumbnailImage } from '@/shared/ui'

interface PostDetailPageParams {
  postId: PostId
}

interface PostDetailPageProps {
  params: Promise<PostDetailPageParams>
}

export const generateStaticParams = () =>
  PostRepository.getKeys().map<PostDetailPageParams>((key) => ({ postId: key }))

export const generateMetadata = async ({ params }: PostDetailPageProps): Promise<Metadata> => {
  try {
    const { postId } = await params
    const { post } = await getPostDetail(postId)

    const tags = post.tags.map((tag) => tag.name)
    const externalTags = post.externalTags ?? []

    return {
      title: post.title,
      description: post.description || BLOG_DESCRIPTION,
      keywords: [...externalTags, ...tags, ...BLOG_KEYWORDS],
      openGraph: {
        type: 'article',
        publishedTime: post.createdAt,
        modifiedTime: post.updatedAt,
        tags: [...externalTags, ...tags],
        authors: NICKNAME,
        locale: 'ko_KR',
        images: {
          url: post.thumbnail.src,
          alt: post.thumbnail.alt,
          type: extractImageType(post.thumbnail.src),
          ...THUMBNAIL_SIZE,
        },
      },
    }
  } catch {
    return {}
  }
}

const PostDetailPage: React.FC<PostDetailPageProps> = async ({ params }) => {
  const { postId } = await params
  const { post } = await getPostDetail(postId, ({ status }) => {
    if (status === 404) notFound()
  })

  return (
    <>
      <div className="py-screen wrapper-xl">
        <div className="mb-8 flex items-center justify-end space-x-2">
          <ArticleShareButton title={post.title} description={post.description} />
          <ArticleCommentAnchor />
          <ArticleLinkCopyButton />
        </div>
        <article id="article">
          <ArticleHeader title={post.title} description={post.description}>
            <Author className="mt-6 md:mt-12" />
            <ArticleSummary
              createdAt={post.createdAt}
              updatedAt={post.updatedAt}
              readingTime={post.readingTime}
              className="mt-2 md:mt-3"
            />
          </ArticleHeader>
          <Container variant="image" layer="middle" className="flex items-center justify-center">
            <ThumbnailImage {...post.thumbnail} quality={100} priority />
          </Container>
          <ContentBody id={ARTICLE_ID} content={post.content} />
        </article>
        <ArticleAside
          tags={post.tags}
          projects={post.projects}
          series={post.series}
          related={post.related}
        />
        <Comment id={ARTICLE_COMMENT_ID} className="pt-24 md:pt-32" />
      </div>
      <BackgroundGrid />
    </>
  )
}

export default PostDetailPage
