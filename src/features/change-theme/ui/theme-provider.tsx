'use client'

import { useThemeProvider } from '../lib'

export interface ThemeProviderProps
  extends Omit<React.JSX.IntrinsicElements['body'], 'defaultValue'> {
  defaultValue?: string
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  defaultValue,
  children,
  ...props
}) => {
  const { theme } = useThemeProvider(defaultValue)

  return (
    <body {...props} data-theme={theme}>
      {children}
    </body>
  )
}
