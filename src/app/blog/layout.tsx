import type { Metadata } from 'next'
import { BLOG_PAGE_TITLE } from '@/entities/page'

export const metadata: Metadata = {
  title: {
    template: `%s - ${BLOG_PAGE_TITLE}`,
    default: BLOG_PAGE_TITLE,
  },
  description: 'SI 퍼블리셔 출신 FE 개발자의 기술 블로그',
  keywords: ['기술 블로그', '프론트엔드 기술 블로그', BLOG_PAGE_TITLE],
  openGraph: {
    type: 'website',
    siteName: BLOG_PAGE_TITLE,
    locale: 'ko_KR',
  },
}

export default function BlogLayout({ children }: React.PropsWithChildren) {
  return (
    <section id="content" className="relative flex-1">
      {children}
    </section>
  )
}
