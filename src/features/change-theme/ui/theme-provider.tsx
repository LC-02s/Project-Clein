'use client'

import { useThemeProvider } from '../lib'

export interface ThemeProviderProps
  extends Omit<React.JSX.IntrinsicElements['body'], 'defaultValue'> {
  defaultValue?: string
}

export function ThemeProvider({ defaultValue, children, ...props }: ThemeProviderProps) {
  const { theme } = useThemeProvider(defaultValue)

  return (
    <body {...props} data-theme={theme}>
      {children}
    </body>
  )
}
