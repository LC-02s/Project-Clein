import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { PostRepository } from '@/database/posts'
import { ContentBody } from '@/widgets/content'
import {
  ARTICLE_ID,
  ARTICLE_COMMENT_ID,
  ArticleHeader,
  ArticleThumbnail,
  ArticleAside,
  ArticleSideBar,
  ArticleSummary,
  ArticleShareButton,
  ArticleContent,
  ArticleNavigator,
} from '@/widgets/post-article'
import { Giscus } from '@/features/change-theme'
import { type PostId, getPostDetail } from '@/entities/post'
import { THUMBNAIL_SIZE, BLOG_DESCRIPTION, BLOG_KEYWORDS, NICKNAME } from '@/shared/config'
import { extractImageType } from '@/shared/lib'
import { BackgroundGrid } from '@/shared/ui'

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
      <div className="relative mx-auto flex justify-center">
        <div className="py-screen wrapper-xl xl:max-w-[calc(100%-18rem)] 3xl:max-w-screen-xl">
          <article id="article">
            <ArticleHeader title={post.title} description={post.description} />
            <ArticleThumbnail {...post.thumbnail} />
            <ContentBody id={ARTICLE_ID} content={post.content} />
          </article>
          <ArticleAside
            tags={post.tags}
            projects={post.projects}
            series={post.series}
            related={post.related}
          />
          <Giscus id={ARTICLE_COMMENT_ID} className="pt-24 md:pt-32" />
        </div>
        <ArticleSideBar>
          <ArticleSummary
            createdAt={post.createdAt}
            updatedAt={post.updatedAt}
            readingTime={post.readingTime}
          />
          <ArticleShareButton title={post.title} description={post.description} />
          <ArticleContent />
          <ArticleNavigator />
        </ArticleSideBar>
      </div>
      <BackgroundGrid />
    </>
  )
}

export default PostDetailPage
