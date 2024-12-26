import { cookies } from 'next/headers'
import type { Metadata } from 'next'
import { Footer } from '@/widgets/footer'
import { Header } from '@/widgets/header'
import { THEME_KEY, ThemeDropdownButton, ThemeProvider } from '@/features/change-theme'
import {
  SITE_ADDRESS,
  MAIN_TITLE,
  MAIN_DESCRIPTION,
  MAIN_KEYWORDS,
  BLOG_KEYWORDS,
} from '@/entities/site'
import { BreakpointProvider, OverlayProvider } from '@/shared/lib'
import { Pretendard } from './font'

import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_ADDRESS),
  title: MAIN_TITLE,
  description: MAIN_DESCRIPTION,
  keywords: [...BLOG_KEYWORDS, ...MAIN_KEYWORDS],
  openGraph: {
    type: 'website',
    siteName: MAIN_TITLE,
    description: MAIN_DESCRIPTION,
    locale: 'ko_KR',
    images: {
      url: '/img/og-image-main.jpg',
      alt: MAIN_TITLE,
      type: 'image/jpg',
      width: 1200,
      height: 630,
    },
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
