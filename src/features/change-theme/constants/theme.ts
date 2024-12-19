import type { RealTheme, Theme } from '../types'

export const THEME_KEY = 'theme'

export const DEFAULT_THEME: Theme = 'system'

export const DEFAULT_REAL_THEME: RealTheme = 'light'

export const THEME_LABEL: Record<Theme, string> = Object.freeze({
  system: '시스템 테마',
  light: '밝은 테마',
  dark: '어두운 테마',
})

export const THEME_LIST: Theme[] = ['system', 'light', 'dark']
