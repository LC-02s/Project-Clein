import { cookies } from 'next/headers'
import type { Metadata } from 'next'
import { ProjectEntity } from '@/database/projects'
import { Footer } from '@/widgets/footer'
import { Header } from '@/widgets/header'
import { SearchBarTrigger } from '@/widgets/search-bar'
import { SkipContent } from '@/widgets/skip-content'
import { QueryProvider } from '@/shared/api'
import {
  THUMBNAIL_SIZE,
  MAIN_TITLE,
  MAIN_DESCRIPTION,
  MAIN_KEYWORDS,
  BLOG_KEYWORDS,
  NICKNAME,
  USER_GITHUB_ADDRESS,
} from '@/shared/config'
import { BreakpointProvider, extractImageType, OverlayViewer, THEME_STORE_KEY } from '@/shared/lib'
import { LoadingProgressBar, ThemeDropdownButton, ThemeProvider } from '@/shared/ui'
import { Pretendard } from './assets/font'

import './assets/style/globals.css'

const { thumbnail } = ProjectEntity.findById('portfolio-site')

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_DOMAIN_ADDRESS!),
  title: {
    template: `%s - ${MAIN_TITLE}`,
    default: MAIN_TITLE,
  },
  description: MAIN_DESCRIPTION,
  keywords: [...BLOG_KEYWORDS, ...MAIN_KEYWORDS],
  applicationName: MAIN_TITLE,
  authors: {
    url: USER_GITHUB_ADDRESS,
    name: NICKNAME,
  },
  creator: NICKNAME,
  publisher: NICKNAME,
  openGraph: {
    type: 'website',
    siteName: MAIN_TITLE,
    description: MAIN_DESCRIPTION,
    locale: 'ko_KR',
    images: {
      url: thumbnail.src,
      alt: thumbnail.alt,
      type: extractImageType(thumbnail.src),
      ...THUMBNAIL_SIZE,
    },
  },
  robots: { index: true, follow: true },
}

const RootLayout: React.FC<React.PropsWithChildren> = async ({ children }) => {
  const cookieStore = await cookies()
  const theme = cookieStore.get(THEME_STORE_KEY)

  return (
    <html lang="ko" className={Pretendard.variable}>
      <ThemeProvider
        className="relative flex min-h-screen min-w-[17.5rem] flex-col items-stretch justify-start bg-white text-gray-800 antialiased dark:bg-gray-900 dark:text-gray-50"
        defaultValue={theme?.value}
      >
        <SkipContent />
        <BreakpointProvider>
          <QueryProvider>
            <Header>
              <SearchBarTrigger />
              <ThemeDropdownButton />
            </Header>
            <LoadingProgressBar />
            {children}
            <OverlayViewer />
            <Footer />
          </QueryProvider>
        </BreakpointProvider>
      </ThemeProvider>
    </html>
  )
}

export default RootLayout
