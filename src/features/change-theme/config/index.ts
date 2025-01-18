export const THEME_KEY = 'theme'

export const THEME = { SYSTEM: 'system', LIGHT: 'light', DARK: 'dark' } as const

export const THEME_LABEL = {
  [THEME.SYSTEM]: '시스템 테마',
  [THEME.LIGHT]: '밝은 테마',
  [THEME.DARK]: '어두운 테마',
} as const

export type Theme = (typeof THEME)[keyof typeof THEME]

export type RealTheme = Exclude<Theme, typeof THEME.SYSTEM>

export const DEFAULT_THEME: Theme = THEME.SYSTEM

export const DEFAULT_REAL_THEME: RealTheme = THEME.LIGHT

export const THEME_LIST = Object.values(THEME)
