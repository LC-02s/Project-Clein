'use client'

import { useThemeProvider } from '../model'

interface ThemeProviderProps
  extends Omit<React.JSX.IntrinsicElements['body'], 'defaultValue'> {
  defaultValue?: string
}

export default function ThemeProvider({
  defaultValue,
  children,
  ...props
}: ThemeProviderProps) {
  const { theme } = useThemeProvider(defaultValue)

  return (
    <body {...props} data-theme={theme}>
      {children}
    </body>
  )
}
