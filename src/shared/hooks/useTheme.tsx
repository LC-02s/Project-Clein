'use client'

import Cookies from 'js-cookie'
import { useIsomorphicLayoutEffect } from 'motion/react'
import { type JSX, useEffect, useMemo, useState } from 'react'
import { create } from 'zustand'
import type { RealTheme, Theme } from '../types'
import { DEFAULT_THEME, THEME_KEY, THEME_LIST } from '../constants'

interface ThemeState {
  theme: Theme
  realTheme: RealTheme
  setTheme: (theme: Theme) => void
}

interface ThemeStore extends ThemeState {
  setRealTheme: (realTheme: RealTheme) => void
}

function matchDarkThemeMedia() {
  return window.matchMedia('(prefers-color-scheme: dark)')
}

function themeInterceptor(
  theme: Theme,
): Pick<ThemeStore, 'theme' | 'realTheme'> {
  if (theme === 'system') {
    const isDarkTheme = matchDarkThemeMedia().matches

    Cookies.remove(THEME_KEY)

    return { theme, realTheme: isDarkTheme ? 'dark' : 'light' }
  }

  Cookies.set(THEME_KEY, theme)

  return { theme, realTheme: theme }
}

const useThemeStore = create<ThemeStore>((set) => ({
  theme: DEFAULT_THEME,
  setTheme: (theme) => set(themeInterceptor(theme)),
  realTheme: 'light',
  setRealTheme: (realTheme) => set({ realTheme }),
}))

interface ThemeProviderProps {
  defaultValue?: string
}

export function ThemeProvider({
  defaultValue = DEFAULT_THEME,
  children,
  ...props
}: ThemeProviderProps & Omit<JSX.IntrinsicElements['body'], 'defaultValue'>) {
  const defaultTheme = useMemo(
    () => THEME_LIST.find((theme) => theme === defaultValue) || DEFAULT_THEME,
    [defaultValue],
  )

  const [darkThemeMedia, setMedia] = useState<MediaQueryList | null>(null)

  const theme = useThemeStore((store) => store.theme)
  const setTheme = useThemeStore((store) => store.setTheme)
  const setRealTheme = useThemeStore((store) => store.setRealTheme)

  useIsomorphicLayoutEffect(() => {
    setMedia(matchDarkThemeMedia)
    setTheme(defaultTheme)
  }, [defaultTheme])

  useEffect(() => {
    const handleChange = (event: MediaQueryListEvent) => {
      if (theme === 'system') {
        setRealTheme(event.matches ? 'dark' : 'light')
      }
    }

    darkThemeMedia?.addEventListener('change', handleChange)

    return () => {
      darkThemeMedia?.removeEventListener('change', handleChange)
    }
  }, [darkThemeMedia, theme, setRealTheme])

  return (
    <body {...props} data-theme={!darkThemeMedia ? defaultTheme : theme}>
      {children}
    </body>
  )
}

export const useTheme: { (): ThemeState } = () => ({
  theme: useThemeStore((store) => store.theme),
  realTheme: useThemeStore((store) => store.realTheme),
  setTheme: useThemeStore((store) => store.setTheme),
})
