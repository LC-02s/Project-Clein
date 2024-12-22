'use client'

import { createPortal } from 'react-dom'
import { Dialog, Dropdown } from '@/shared/ui'

interface ThemeDropdownProps {
  breakpoint: boolean
  open: boolean
  onClose: () => void
}

export default function ThemeDropdown({
  breakpoint,
  open: isOpen,
  onClose,
  children,
}: React.PropsWithChildren<ThemeDropdownProps>) {
  if (breakpoint) {
    return createPortal(
      <Dialog
        open={isOpen}
        onClose={onClose}
        size="xs"
        className="space-y-3 pb-6"
        cancelWithOutsideClick
        cancelWithEscape
      >
        {children}
      </Dialog>,
      document.body,
    )
  }

  return (
    <Dropdown open={isOpen} className="right-0 top-12 w-48 space-y-2 dark:bg-zinc-800">
      {children}
    </Dropdown>
  )
}
