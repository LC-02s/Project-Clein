'use client'

import { useRef, useCallback } from 'react'
import {
  createSearchParamsToURL,
  DEFAULT_SORT_PARAMS,
  SORT_PARAMS_LABEL_MAP,
  useBooleanState,
  useBreakpoint,
  useLockBodyScroll,
  useOutsideClick,
  useWindowEvent,
  type LiteralSortParams,
  type PropsWithClassName,
} from '@/shared/lib'
import { Button, DropdownToDialog, Icon } from '@/shared/ui'
import { SortLink } from './sort-link'

export interface SortDropdownButtonProps<K extends string> extends PropsWithClassName {
  baseURL: string
  sortParams: LiteralSortParams
  paramsKey: K
}

export const SortDropdownButton = <K extends string>({
  sortParams,
  baseURL,
  paramsKey,
  className,
}: SortDropdownButtonProps<K>): React.ReactNode => {
  const href = createSearchParamsToURL<K>(baseURL)

  const [isOpen, { setFalse: close, toggle }] = useBooleanState()
  const matchesLG = useBreakpoint('lg')
  const isDropdownAndOpen = isOpen && matchesLG

  const buttonRef = useRef<HTMLButtonElement>(null)
  const onClose = useCallback(() => {
    close()
    setTimeout(() => buttonRef.current?.focus(), 0)
  }, [close])

  const containerRef = useOutsideClick<HTMLDivElement>(() => {
    if (isDropdownAndOpen) onClose()
  })

  useWindowEvent('keydown', (e) => {
    if (isOpen && e.key === 'Escape') onClose()
  })

  useLockBodyScroll(isDropdownAndOpen)

  return (
    <div ref={containerRef} className="relative">
      <Button
        ref={buttonRef}
        title={`정렬 순 변경 메뉴 ${isOpen ? '닫기' : '열기'}`}
        onClick={toggle}
      >
        <span className="mr-2 pl-1">{SORT_PARAMS_LABEL_MAP.get(sortParams) ?? '정렬 옵션'}</span>
        <Icon.ArrowBold direction={isDropdownAndOpen ? 'top' : 'bottom'} />
      </Button>
      <DropdownToDialog
        breakpoint={!matchesLG}
        open={isOpen}
        onClose={onClose}
        className={className}
      >
        {[...SORT_PARAMS_LABEL_MAP].map(([params, label]) => (
          <SortLink
            key={params}
            href={href([paramsKey, params !== DEFAULT_SORT_PARAMS && params])}
            title={`정렬 순 변경: ${label}`}
            onClick={onClose}
            disabled={params === sortParams}
          >
            {`${label}${params === sortParams ? ' (선택됨)' : ''}`}
          </SortLink>
        ))}
      </DropdownToDialog>
    </div>
  )
}
