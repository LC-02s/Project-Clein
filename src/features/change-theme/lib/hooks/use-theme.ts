import Cookies from 'js-cookie'
import { create } from 'zustand'
import { DEFAULT_REAL_THEME, DEFAULT_THEME, THEME_KEY } from '../../config'
import type { Theme, RealTheme } from '../../config'
import { matchDarkThemeMedia } from '../../lib'

export interface ThemeState {
  theme: Theme
  realTheme: RealTheme
  setTheme: (theme: Theme) => void
}

interface ThemeStore extends ThemeState {
  setRealTheme: (realTheme: RealTheme) => void
}

function themeInterceptor(theme: Theme): Pick<ThemeStore, 'theme' | 'realTheme'> {
  if (theme === 'system') {
    const { matches: isDarkTheme } = matchDarkThemeMedia()

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
