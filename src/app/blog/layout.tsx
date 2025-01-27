import type { Metadata } from 'next'
import { BLOG_DESCRIPTION, BLOG_KEYWORDS, BLOG_TITLE } from '@/shared/config'

export const metadata: Metadata = {
  title: {
    template: `%s - ${BLOG_TITLE}`,
    default: BLOG_TITLE,
  },
  description: BLOG_DESCRIPTION,
  keywords: [...BLOG_KEYWORDS],
  openGraph: {
    type: 'website',
    siteName: BLOG_TITLE,
    description: BLOG_DESCRIPTION,
    locale: 'ko_KR',
    images: {
      url: '/img/og-image-blog.jpg',
      alt: BLOG_TITLE,
      type: 'image/jpg',
      width: 1200,
      height: 630,
    },
  },
}

const BlogLayout: React.FC<React.PropsWithChildren> = ({ children }) => (
  <section id="content" className="relative flex-1">
    {children}
  </section>
)

export default BlogLayout
