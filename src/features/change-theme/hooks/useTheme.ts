'use client'

import Cookies from 'js-cookie'
import { create } from 'zustand'
import type { RealTheme, Theme } from '../types'
import { DEFAULT_REAL_THEME, DEFAULT_THEME, THEME_KEY } from '../constants'
import { matchDarkThemeMedia } from '../utils'

interface ThemeState {
  theme: Theme
  realTheme: RealTheme
  setTheme: (theme: Theme) => void
}

interface ThemeStore extends ThemeState {
  setRealTheme: (realTheme: RealTheme) => void
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

export const useThemeStore = create<ThemeStore>((set) => ({
  theme: DEFAULT_THEME,
  setTheme: (theme) => set(themeInterceptor(theme)),
  realTheme: DEFAULT_REAL_THEME,
  setRealTheme: (realTheme) => set({ realTheme }),
}))

export const useTheme: { (): ThemeState } = () => ({
  theme: useThemeStore((store) => store.theme),
  realTheme: useThemeStore((store) => store.realTheme),
  setTheme: useThemeStore((store) => store.setTheme),
})
