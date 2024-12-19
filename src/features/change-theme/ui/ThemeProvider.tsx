'use client'

import { useIsomorphicLayoutEffect } from 'motion/react'
import { useEffect, useMemo, useState } from 'react'
import type { JSX } from 'react'
import { DEFAULT_THEME, THEME_LIST } from '../constants'
import { useThemeStore } from '../hooks'
import { matchDarkThemeMedia } from '../utils'

interface ThemeProviderProps {
  defaultValue?: string
}

export default function ThemeProvider({
  defaultValue = DEFAULT_THEME,
  children,
  ...props
}: ThemeProviderProps & Omit<JSX.IntrinsicElements['body'], 'defaultValue'>) {
  const defaultTheme = useMemo(
    () => THEME_LIST.find((theme) => theme === defaultValue) || DEFAULT_THEME,
    [defaultValue],
  )

  const [darkThemeMedia, setMedia] = useState<MediaQueryList | null>(null)

  const theme = useThemeStore((store) => store.theme)
  const setTheme = useThemeStore((store) => store.setTheme)
  const setRealTheme = useThemeStore((store) => store.setRealTheme)

  useIsomorphicLayoutEffect(() => {
    setMedia(matchDarkThemeMedia)
    setTheme(defaultTheme)
  }, [defaultTheme])

  useEffect(() => {
    const handleChange = (event: MediaQueryListEvent) => {
      if (theme === 'system') {
        setRealTheme(event.matches ? 'dark' : 'light')
      }
    }

    darkThemeMedia?.addEventListener('change', handleChange)

    return () => {
      darkThemeMedia?.removeEventListener('change', handleChange)
    }
  }, [darkThemeMedia, theme, setRealTheme])

  return (
    <body {...props} data-theme={!darkThemeMedia ? defaultTheme : theme}>
      {children}
    </body>
  )
}
