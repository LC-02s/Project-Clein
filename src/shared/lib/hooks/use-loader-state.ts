'use client'

import { useRouter as useNextRouter } from 'next/navigation'
import { create } from 'zustand'

export interface LoaderSwitchState {
  on: () => void
  off: () => void
}

export interface LoaderStore extends LoaderSwitchState {
  isLoading: boolean
}

export const useLoaderState = create<LoaderStore>((set) => ({
  isLoading: false,
  on: () => set({ isLoading: true }),
  off: () => set({ isLoading: false }),
}))

export const useLoaderSwitch = (): LoaderSwitchState => ({
  on: useLoaderState((store) => store.on),
  off: useLoaderState((store) => store.off),
})

interface AppRouterInstanceWithLoader extends ReturnType<typeof useNextRouter>, LoaderSwitchState {}

export const useRouter = (): AppRouterInstanceWithLoader => {
  const router = useNextRouter()
  const loader = useLoaderSwitch()

  const push: typeof router.push = (href, options) => {
    if (href !== `${location.pathname}${location.search}`) {
      loader.on()
    } else {
      loader.off()
    }

    router.push(href, options)
  }

  const replace: typeof router.replace = (href, options) => {
    if (href !== `${location.pathname}${location.search}`) {
      loader.on()
    } else {
      loader.off()
    }

    router.replace(href, options)
  }

  return { ...router, ...loader, push, replace }
}
