'use client'

import { useIsomorphicLayoutEffect } from 'motion/react'
import { useCallback, useState } from 'react'
import { create } from 'zustand'
import useWindowEvent from './use-window-event'

interface Breakpoint {
  xs: boolean | null
  sm: boolean | null
  md: boolean | null
  lg: boolean | null
  xl: boolean | null
  xxl: boolean | null
}

interface BreakpointSetter {
  (breakpoint: Breakpoint): void
}

interface BreakpointStore {
  breakpoint: Breakpoint
  updateBreakpoint: BreakpointSetter
}

const useBreakpointStore = create<BreakpointStore>((set) => ({
  breakpoint: { xs: null, sm: null, md: null, lg: null, xl: null, xxl: null },
  updateBreakpoint: (breakpoint) => set({ breakpoint }),
}))

export function useBreakpoint<T extends boolean | null>(point: keyof Breakpoint, defaultValue?: T) {
  return (useBreakpointStore((state) => state.breakpoint[point]) ??
    defaultValue ??
    null) as T extends boolean ? boolean : boolean | null
}

export function BreakpointProvider({ children }: React.PropsWithChildren) {
  const [xs, setMediaXS] = useState<MediaQueryList | null>(null)
  const [sm, setMediaSM] = useState<MediaQueryList | null>(null)
  const [md, setMediaMD] = useState<MediaQueryList | null>(null)
  const [lg, setMediaLG] = useState<MediaQueryList | null>(null)
  const [xl, setMediaXL] = useState<MediaQueryList | null>(null)
  const [xxl, setMediaXXL] = useState<MediaQueryList | null>(null)

  const updateBreakpoint = useBreakpointStore((state) => state.updateBreakpoint)

  const updateMedia = useCallback(() => {
    updateBreakpoint({
      xs: xs?.matches ?? null,
      sm: sm?.matches ?? null,
      md: md?.matches ?? null,
      lg: lg?.matches ?? null,
      xl: xl?.matches ?? null,
      xxl: xxl?.matches ?? null,
    })
  }, [updateBreakpoint, xs, sm, md, lg, xl, xxl])

  useIsomorphicLayoutEffect(() => {
    setMediaXS(window.matchMedia('(max-width: 20rem)'))
    setMediaSM(window.matchMedia('(max-width: 30rem)'))
    setMediaMD(window.matchMedia('(max-width: 48rem)'))
    setMediaLG(window.matchMedia('(max-width: 64rem)'))
    setMediaXL(window.matchMedia('(max-width: 80rem)'))
    setMediaXXL(window.matchMedia('(max-width: 90rem)'))
  }, [])

  useIsomorphicLayoutEffect(updateMedia, [updateMedia])
  useWindowEvent('resize', updateMedia)

  return <>{children}</>
}
