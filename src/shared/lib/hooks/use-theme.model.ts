export type SystemTheme = (typeof THEME)[keyof typeof THEME]

export type Theme = Exclude<SystemTheme, typeof THEME.AUTO>

export interface ThemeState {
  theme: Theme
  systemTheme: SystemTheme
  setSystemTheme: (systemTheme: SystemTheme) => void
}

export const THEME = { AUTO: 'auto', LIGHT: 'light', DARK: 'dark' } as const

export const THEME_LABEL = {
  [THEME.AUTO]: '시스템 테마',
  [THEME.LIGHT]: '밝은 테마',
  [THEME.DARK]: '어두운 테마',
} as const

export const DEFAULT_THEME: SystemTheme = THEME.AUTO

export const DEFAULT_REAL_THEME: Theme = THEME.LIGHT

export const THEME_LIST = Object.values(THEME)

export const THEME_STORE_KEY = 'theme'
