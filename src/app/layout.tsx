import { cookies } from 'next/headers'
import type { Metadata } from 'next'
import { MAIN_PAGE_TITLE } from '@/views/main'
import { Footer } from '@/widgets/footer'
import { THEME_KEY, ThemeProvider } from '@/features/change-theme'
import { OverlayProvider } from '@/shared/lib'
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

export default async function RootLayout({ children }: React.PropsWithChildren) {
  const cookieStore = await cookies()
  const theme = cookieStore.get(THEME_KEY)

  return (
    <html lang="ko" className={Pretendard.variable}>
      <ThemeProvider
        className="relative flex min-h-screen min-w-[17.5rem] flex-col items-stretch justify-start bg-white text-zinc-800 antialiased dark:bg-zinc-900 dark:text-zinc-50"
        defaultValue={theme?.value}
      >
        <OverlayProvider>
          {children}
          <Footer />
        </OverlayProvider>
      </ThemeProvider>
    </html>
  )
}
