'use client'

import { useIsomorphicLayoutEffect } from 'motion/react'
import { useCallback, useState } from 'react'
import { create } from 'zustand'
import useWindowEvent from './use-window-event'

export type BreakpointKey = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'

export type Breakpoint = Map<BreakpointKey, boolean>

type BreakpointEntry<T> = [BreakpointKey, T]

interface BreakpointStore {
  breakpoint: Breakpoint | null
  updateBreakpoint: (breakpoint: Breakpoint) => void
}

const INITIAL_ENTRIES: BreakpointEntry<string>[] = [
  ['xs', '20rem'],
  ['sm', '30rem'],
  ['md', '48rem'],
  ['lg', '64rem'],
  ['xl', '80rem'],
  ['2xl', '90rem'],
  ['3xl', '100rem'],
]

const useBreakpointStore = create<BreakpointStore>((set) => ({
  breakpoint: null,
  updateBreakpoint: (breakpoint) => set({ breakpoint }),
}))

export function useBreakpoint<T extends boolean | null>(point: BreakpointKey, defaultValue?: T) {
  return (useBreakpointStore((state) => state.breakpoint?.get(point)) ??
    defaultValue ??
    null) as T extends boolean ? boolean : boolean | null
}

export function BreakpointProvider({ children }: React.PropsWithChildren) {
  type MediaEntry = BreakpointEntry<MediaQueryList>
  type MatchesEntry = BreakpointEntry<boolean>

  const [mediaEntries, setMediaEntries] = useState<MediaEntry[] | null>(null)
  const updateBreakpoint = useBreakpointStore((state) => state.updateBreakpoint)

  const updateMedia = useCallback(() => {
    const entries = mediaEntries?.map<MatchesEntry>(([key, media]) => [key, media.matches])

    if (entries) {
      updateBreakpoint(new Map(entries))
    }
  }, [updateBreakpoint, mediaEntries])

  useIsomorphicLayoutEffect(() => {
    const entries = INITIAL_ENTRIES.map<MediaEntry>(([key, max]) => [
      key,
      window.matchMedia(`(max-width: ${max})`),
    ])

    setMediaEntries(entries)
  }, [])

  useIsomorphicLayoutEffect(updateMedia, [updateMedia])
  useWindowEvent('resize', updateMedia)

  return <>{children}</>
}
