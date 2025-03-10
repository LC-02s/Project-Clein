import { type Metadata } from 'next'

import { THUMBNAIL_SIZE, BLOG_DESCRIPTION, BLOG_KEYWORDS, BLOG_TITLE } from '@/shared/config'

export const metadata: Metadata = {
  title: {
    template: `%s - ${BLOG_TITLE}`,
    absolute: BLOG_TITLE,
  },
  description: BLOG_DESCRIPTION,
  keywords: [...BLOG_KEYWORDS],
  openGraph: {
    type: 'website',
    siteName: BLOG_TITLE,
    description: BLOG_DESCRIPTION,
    locale: 'ko_KR',
    images: {
      url: '/images/og-image-blog.jpg',
      alt: BLOG_TITLE,
      type: 'image/jpg',
      ...THUMBNAIL_SIZE,
    },
  },
}

const BlogLayout: React.FC<React.PropsWithChildren> = ({ children }) => <>{children}</>

export default BlogLayout
