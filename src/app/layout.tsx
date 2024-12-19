import { cookies } from 'next/headers'
import type { Metadata } from 'next'
import type { PropsWithChildren } from 'react'
import { MAIN_PAGE_TITLE } from '@/views/main'
import { THEME_KEY, ThemeProvider } from '@/features/change-theme'
import { Pretendard } from './font'

import './globals.css'

export const metadata: Metadata = {
  title: MAIN_PAGE_TITLE,
  description: 'SI 퍼블리셔 출신 FE 개발자 클라인입니다!',
  openGraph: {
    type: 'website',
    siteName: MAIN_PAGE_TITLE,
    locale: 'ko_KR',
  },
  robots: { index: true, follow: true },
}

export default async function RootLayout({ children }: PropsWithChildren) {
  const cookieStore = await cookies()
  const theme = cookieStore.get(THEME_KEY)

  return (
    <html lang="ko" className={Pretendard.variable}>
      <ThemeProvider
        className="bg-white text-zinc-700 antialiased dark:bg-zinc-900 dark:text-zinc-50"
        defaultValue={theme?.value}
      >
        {children}
      </ThemeProvider>
    </html>
  )
}
