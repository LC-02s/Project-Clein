import { create } from 'zustand'

export interface LoaderState {
  isLoading: boolean
  on: (withLoad?: () => void) => void
  off: () => void
}

export const useLoaderState = create<LoaderState>((set) => ({
  isLoading: false,
  on: (withLoad) =>
    set((prev) => {
      if (prev.isLoading) {
        withLoad?.()

        return prev
      }

      return { isLoading: true }
    }),
  off: () => set({ isLoading: false }),
}))

export const useLoaderSwitch: () => Pick<LoaderState, 'on' | 'off'> = () => ({
  on: useLoaderState((store) => store.on),
  off: useLoaderState((store) => store.off),
})
