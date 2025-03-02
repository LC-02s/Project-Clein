'use client'

import { useSyncExternalStore } from 'react'

export const useCheckHydration = () =>
  useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  )
