'use client'

import { createPortal } from 'react-dom'
import { Dialog, Dropdown } from '@/shared/ui'

export interface ThemeDropdownProps extends React.PropsWithChildren {
  breakpoint: boolean
  open: boolean
  onClose: () => void
}

export const ThemeDropdown: React.FC<ThemeDropdownProps> = ({
  breakpoint,
  open: isOpen,
  onClose,
  children,
}) => {
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
