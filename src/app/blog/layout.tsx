import type { Metadata } from 'next'
import type { PropsWithChildren } from 'react'
import { BLOG_PAGE_TITLE } from '@/views/blog'

export const metadata: Metadata = {
  title: {
    template: `%s - ${BLOG_PAGE_TITLE}`,
    default: BLOG_PAGE_TITLE,
  },
  description: 'SI 퍼블리셔 출신 FE 개발자의 기술 블로그',
  openGraph: {
    type: 'website',
    siteName: BLOG_PAGE_TITLE,
    locale: 'ko_KR',
  },
}

export default function BlogLayout({ children }: PropsWithChildren) {
  return <>{children}</>
}
