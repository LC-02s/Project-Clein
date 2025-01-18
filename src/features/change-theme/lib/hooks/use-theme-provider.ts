'use client'

import { useIsomorphicLayoutEffect } from 'motion/react'
import { useMemo, useState, useEffect } from 'react'
import { DEFAULT_THEME, THEME_LIST } from '../../config'
import { matchDarkThemeMedia } from '../../lib'
import { useThemeStore } from './use-theme'

export function useThemeProvider(defaultValue: string = DEFAULT_THEME) {
  const defaultTheme = useMemo(() => {
    return THEME_LIST.find((theme) => theme === defaultValue) || DEFAULT_THEME
  }, [defaultValue])

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

  return { theme: !darkThemeMedia ? defaultTheme : theme }
}
