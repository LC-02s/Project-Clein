import type { Theme } from '../types'

export const THEME_KEY = 'theme'

export const DEFAULT_THEME: Theme = 'system'

export const THEME_LABEL: Record<Theme, string> = Object.freeze({
  system: '시스템 테마',
  light: '밝은 테마',
  dark: '어두운 테마',
})
