'use client'

import { useIsomorphicLayoutEffect } from 'motion/react'
import { useEffect, useState } from 'react'
import { create } from 'zustand'

import {
  type SystemTheme,
  type Theme,
  type ThemeState,
  DEFAULT_THEME,
  DEFAULT_SYSTEM_THEME,
  THEME,
  THEME_LIST,
} from './use-theme.model'
import { matchDarkThemeMedia, themeInterceptor } from './use-theme.utils'

interface ThemeStore extends ThemeState {
  setTheme: (theme: Theme) => void
}

const useThemeStore = create<ThemeStore>((set) => ({
  systemTheme: DEFAULT_SYSTEM_THEME,
  setSystemTheme: (systemTheme) => set(themeInterceptor(systemTheme)),
  theme: DEFAULT_THEME,
  setTheme: (theme) => set({ theme }),
}))

export const useTheme = (): ThemeState => ({
  theme: useThemeStore((store) => store.theme),
  systemTheme: useThemeStore((store) => store.systemTheme),
  setSystemTheme: useThemeStore((store) => store.setSystemTheme),
})

export const useThemeProvider = (
  defaultValue: string = DEFAULT_SYSTEM_THEME,
): Pick<ThemeState, 'systemTheme'> => {
  const defaultTheme = THEME_LIST.includes(defaultValue as SystemTheme)
    ? (defaultValue as SystemTheme)
    : DEFAULT_SYSTEM_THEME

  const [darkThemeMedia, setMedia] = useState<MediaQueryList | null>(null)

  const systemTheme = useThemeStore((store) => store.systemTheme)
  const setSystemTheme = useThemeStore((store) => store.setSystemTheme)
  const setTheme = useThemeStore((store) => store.setTheme)

  useIsomorphicLayoutEffect(() => {
    setMedia(matchDarkThemeMedia)
    setSystemTheme(defaultTheme)
  }, [defaultTheme])

  useEffect(() => {
    const handleChange = (event: MediaQueryListEvent) => {
      if (systemTheme === THEME.AUTO) setTheme(event.matches ? THEME.DARK : THEME.LIGHT)
    }

    darkThemeMedia?.addEventListener('change', handleChange)

    return () => {
      darkThemeMedia?.removeEventListener('change', handleChange)
    }
  }, [darkThemeMedia, systemTheme, setTheme])

  return { systemTheme: !darkThemeMedia ? defaultTheme : systemTheme }
}
