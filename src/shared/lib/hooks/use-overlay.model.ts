import { create } from 'zustand'

export interface OverlayElementState {
  isOpen: boolean
  close: () => void
  exit: () => void
}

export interface CreateOverlayElement {
  (props: OverlayElementState): React.ReactNode
}

export interface OverlayControllerProps {
  overlayElement: CreateOverlayElement
  onExit: () => void
  returnToFocus: (close?: () => void) => void
  controlRef: React.Ref<OverlayControlRef>
}

export interface OverlayControlRef {
  close: () => void
}

interface OverlayStore {
  overlay: Map<string, React.ReactNode>
  mount(id: string, element: React.ReactNode): void
  unmount(id: string): void
}

export const useOverlayStore = create<OverlayStore>((set) => ({
  overlay: new Map(),

  mount: (id, element) =>
    set(({ overlay }) => {
      overlay.set(id, element)

      return { overlay: new Map(overlay) }
    }),

  unmount: (id) =>
    set((prev) => {
      const { overlay } = prev
      const success = overlay.delete(id)

      if (!success) {
        return prev
      }

      return { overlay: new Map(overlay) }
    }),
}))
