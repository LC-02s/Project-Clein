'use client'

import { useCallback, useRef } from 'react'

import {
  THEME_LABEL,
  THEME_LIST,
  THEME,
  cn,
  useTheme,
  useBooleanState,
  useBreakpoint,
  useOutsideClick,
  useWindowEvent,
  useCheckHydration,
} from '../../lib'
import { Button, Icon, DropdownToDialog } from '../../ui'

export const ThemeDropdownButton: React.FC = () => {
  const isHydrated = useCheckHydration()
  const { theme, systemTheme, setSystemTheme } = useTheme()

  const [isOpen, { setFalse: close, toggle }] = useBooleanState()
  const matchesLG = useBreakpoint('lg')

  const buttonRef = useRef<HTMLButtonElement>(null)
  const onClose = useCallback(() => {
    close()
    setTimeout(() => buttonRef.current?.focus(), 0)
  }, [close])

  const containerRef = useOutsideClick<HTMLDivElement>(() => {
    if (isOpen && matchesLG) onClose()
  })

  useWindowEvent('keydown', (e) => {
    if (isOpen && e.key === 'Escape') onClose()
  })

  return (
    <div ref={containerRef} className="relative">
      <Button
        ref={buttonRef}
        title={`테마 변경 메뉴 ${isOpen ? '닫기' : '열기'}`}
        variant="light"
        square
        onClick={toggle}
      >
        <Icon.SunEmoji
          className={cn(
            'absolute inset-0 m-auto text-lg opacity-0 transition-opacity md:text-xl',
            isHydrated && theme === THEME.LIGHT && 'animate-pop-spin opacity-100',
          )}
        />
        <Icon.MoonEmoji
          className={cn(
            'absolute inset-0 m-auto text-lg opacity-0 transition-opacity md:text-xl',
            isHydrated && theme === THEME.DARK && 'animate-pop-spin opacity-100',
          )}
        />
      </Button>
      <DropdownToDialog
        open={isOpen}
        onClose={onClose}
        breakpoint={!matchesLG}
        className="right-0 dark:bg-gray-800"
      >
        {THEME_LIST.map((value) => (
          <Button
            key={value}
            variant="subtle"
            title={`테마 변경: ${THEME_LABEL[value]}`}
            className="w-full md:h-9"
            onClick={() => {
              setSystemTheme(value)
              onClose()
            }}
            disabled={systemTheme === value}
          >
            {`${THEME_LABEL[value]}${systemTheme === value ? ' (선택됨)' : ''}`}
          </Button>
        ))}
      </DropdownToDialog>
    </div>
  )
}
