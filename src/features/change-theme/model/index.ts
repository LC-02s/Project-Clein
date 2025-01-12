export type RealTheme = 'light' | 'dark'

export type Theme = RealTheme | 'system'

export interface ThemeState {
  theme: Theme
  realTheme: RealTheme
  setTheme: (theme: Theme) => void
}

export interface ThemeStore extends ThemeState {
  setRealTheme: (realTheme: RealTheme) => void
}
