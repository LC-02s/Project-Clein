'use client'

import { createPortal } from 'react-dom'
import { type PropsWithClassName, cn } from '@/shared/lib'
import { Dialog, Dropdown } from '@/shared/ui'

export interface SortDropdownProps extends React.PropsWithChildren<PropsWithClassName> {
  breakpoint: boolean
  open: boolean
  onClose: () => void
}

export const SortDropdown: React.FC<SortDropdownProps> = ({
  breakpoint,
  open: isOpen,
  onClose,
  className,
  children,
}) => {
  if (breakpoint) {
    return createPortal(
      <Dialog
        open={isOpen}
        onClose={onClose}
        size="xs"
        className="space-y-3 p-4 pb-5"
        cancelWithOutsideClick
        cancelWithEscape
      >
        {children}
      </Dialog>,
      document.body,
    )
  }

  return (
    <Dropdown open={isOpen} className={cn('top-12 w-48 space-y-2', className)}>
      {children}
    </Dropdown>
  )
}
