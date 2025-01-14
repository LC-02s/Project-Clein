'use client'

import { createPortal } from 'react-dom'
import { cn } from '@/shared/lib'
import { Dialog, Dropdown } from '@/shared/ui'

interface SortDropdownProps {
  breakpoint: boolean
  open: boolean
  onClose: () => void
  className?: string
}

export default function SortDropdown({
  breakpoint,
  open: isOpen,
  onClose,
  className,
  children,
}: React.PropsWithChildren<SortDropdownProps>) {
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
    <Dropdown open={isOpen} className={cn('top-12 w-48 space-y-2', className)}>
      {children}
    </Dropdown>
  )
}
