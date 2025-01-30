import { create } from 'zustand'

export interface RemoteOpenState {
  isOpen: boolean
  toggle: () => void

  effect: (() => void) | null
  setEffect: (effect: (() => void) | null) => void

  closeWithEffect: () => void
}

export const useRemoteOpenState = create<RemoteOpenState>((set) => ({
  isOpen: false,
  toggle: () => set(({ isOpen }) => ({ isOpen: !isOpen })),

  effect: null,
  setEffect: (effect) => set({ effect }),

  closeWithEffect: () =>
    set(({ effect }) => {
      setTimeout(() => effect?.(), 0)

      return { isOpen: false }
    }),
}))
