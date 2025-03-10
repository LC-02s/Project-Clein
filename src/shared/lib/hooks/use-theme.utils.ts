import Cookies from 'js-cookie'

import { type ThemeState, type SystemTheme, THEME, THEME_STORE_KEY } from './use-theme.model'

export const matchDarkThemeMedia = () => window.matchMedia('(prefers-color-scheme: dark)')

export const themeInterceptor = (
  systemTheme: SystemTheme,
): Pick<ThemeState, 'theme' | 'systemTheme'> => {
  if (systemTheme === THEME.AUTO) {
    const { matches: isDarkTheme } = matchDarkThemeMedia()

    Cookies.remove(THEME_STORE_KEY)

    return { systemTheme, theme: isDarkTheme ? THEME.DARK : THEME.LIGHT }
  }

  Cookies.set(THEME_STORE_KEY, systemTheme)

  return { systemTheme, theme: systemTheme }
}
