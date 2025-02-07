'use client'

import { createPortal } from 'react-dom'
import { type PropsWithClassName, cn } from '../../lib'
import { Dialog, Dropdown } from '../../ui'

export interface DropdownToDialogProps extends React.PropsWithChildren<PropsWithClassName> {
  breakpoint: boolean
  open: boolean
  onClose: () => void
}

export const DropdownToDialog: React.FC<DropdownToDialogProps> = ({
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
