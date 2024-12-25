import { cookies } from 'next/headers'
import type { Metadata } from 'next'
import { Footer } from '@/widgets/footer'
import { Header } from '@/widgets/header'
import { THEME_KEY, ThemeDropdownButton, ThemeProvider } from '@/features/change-theme'
import { MAIN_PAGE_TITLE, BLOG_PAGE_TITLE, NICKNAME_KR, NICKNAME } from '@/entities/page'
import { BreakpointProvider, OverlayProvider } from '@/shared/lib'
import { Pretendard } from './font'

import './globals.css'

export const metadata: Metadata = {
  title: MAIN_PAGE_TITLE,
  description: `SI 퍼블리셔 출신 FE 개발자 ${NICKNAME_KR}입니다!`,
  keywords: [
    '기술 블로그',
    '프론트엔드 기술 블로그',
    '프론트엔드 개발자 포트폴리오',
    '개발자 포트폴리오',
    '포트폴리오 사이트',
    '프론트엔드 개발',
    '퍼블리셔 포트폴리오',
    `${NICKNAME_KR}의 포트폴리오`,
    `${NICKNAME_KR}의 포트폴리오 사이트`,
    NICKNAME_KR,
    NICKNAME,
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
            <Header>
              <ThemeDropdownButton />
            </Header>
            {children}
            <Footer />
          </OverlayProvider>
        </BreakpointProvider>
      </ThemeProvider>
    </html>
  )
}
