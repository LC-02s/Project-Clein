'use client'

import { useRef, useCallback } from 'react'
import type Link from 'next/link'
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
import { Button, Icon } from '@/shared/ui'
import { SortDropdown } from './sort-dropdown'
import { SortLink } from './sort-link'

export interface SortDropdownButtonProps<K extends string> extends PropsWithClassName {
  baseURL: string
  sortParams: LiteralSortParams
  paramsKey: K
  renderLink?: typeof Link
}

export const SortDropdownButton = <K extends string>({
  sortParams,
  baseURL,
  paramsKey,
  className,
  renderLink,
}: SortDropdownButtonProps<K>): React.ReactNode => {
  const href = createSearchParamsToURL<K>(baseURL)

  const [isOpen, { setFalse: close, toggle }] = useBooleanState()
  const lg = useBreakpoint('lg', true)
  const isDropdownAndOpen = isOpen && lg

  const buttonRef = useRef<HTMLButtonElement>(null)
  const onClose = useCallback(() => {
    buttonRef.current?.focus()
    close()
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
      <Button ref={buttonRef} title="정렬 순 변경" onClick={toggle}>
        <span className="mr-2 pl-1">{SORT_PARAMS_LABEL_MAP.get(sortParams) ?? '정렬 옵션'}</span>
        <Icon.ArrowBold direction={isDropdownAndOpen ? 'top' : 'bottom'} />
      </Button>
      <SortDropdown breakpoint={!lg} open={isOpen} onClose={onClose} className={className}>
        {[...SORT_PARAMS_LABEL_MAP].map(([params, label]) => (
          <SortLink
            key={params}
            href={href([paramsKey, params !== DEFAULT_SORT_PARAMS && params])}
            title={`정렬 순 변경: ${label}`}
            onClick={onClose}
            disabled={params === sortParams}
            render={renderLink}
          >
            {`${label}${params === sortParams ? ' (선택됨)' : ''}`}
          </SortLink>
        ))}
      </SortDropdown>
    </div>
  )
}
