import Cookies from 'js-cookie'
import { create } from 'zustand'
import type { Theme, ThemeState, ThemeStore } from './interface'
import { DEFAULT_REAL_THEME, DEFAULT_THEME, THEME_KEY } from '../config'
import { matchDarkThemeMedia } from '../lib'

function themeInterceptor(theme: Theme): Pick<ThemeStore, 'theme' | 'realTheme'> {
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
