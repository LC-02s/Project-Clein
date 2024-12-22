import { cookies } from 'next/headers'
import type { Metadata } from 'next'
import { BLOG_PAGE_TITLE } from '@/views/blog'
import { MAIN_PAGE_TITLE } from '@/views/main'
import { Footer } from '@/widgets/footer'
import { THEME_KEY, ThemeDropdownButton, ThemeProvider } from '@/features/change-theme'
import { BreakpointProvider, OverlayProvider } from '@/shared/lib'
import { Pretendard } from './font'

import './globals.css'

export const metadata: Metadata = {
  title: MAIN_PAGE_TITLE,
  description: 'SI 퍼블리셔 출신 FE 개발자 클라인입니다!',
  keywords: [
    '기술 블로그',
    '프론트엔드 기술 블로그',
    '클라인의 포트폴리오',
    '클라인의 포트폴리오 사이트',
    '프론트엔드 개발자 포트폴리오',
    '개발자 포트폴리오',
    '포트폴리오 사이트',
    '프론트엔드 개발',
    '퍼블리셔 포트폴리오',
    '클라인',
    'clein',
    MAIN_PAGE_TITLE,
    BLOG_PAGE_TITLE,
  ],
  openGraph: {
    type: 'website',
    siteName: MAIN_PAGE_TITLE,
    locale: 'ko_KR',
  },
  robots: { index: true, follow: true },
}

export default async function RootLayout({ children }: React.PropsWithChildren) {
  const cookieStore = await cookies()
  const theme = cookieStore.get(THEME_KEY)

  return (
    <html lang="ko" className={Pretendard.variable}>
      <ThemeProvider
        className="relative flex min-h-screen min-w-[17.5rem] flex-col items-stretch justify-start bg-white text-zinc-800 antialiased dark:bg-zinc-900 dark:text-zinc-50"
        defaultValue={theme?.value}
      >
        <BreakpointProvider>
          <OverlayProvider>
            <ThemeDropdownButton />
            {children}
            <Footer />
          </OverlayProvider>
        </BreakpointProvider>
      </ThemeProvider>
    </html>
  )
}
