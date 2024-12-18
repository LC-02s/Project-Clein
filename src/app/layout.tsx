import { cookies } from 'next/headers'
import type { Metadata } from 'next'
import type { PropsWithChildren } from 'react'
import { THEME_KEY } from '@/shared/constants'
import { ThemeProvider } from '@/shared/hooks'
import { Pretendard } from './font'

import './globals.css'

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
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
