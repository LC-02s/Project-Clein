'use client'

import { useCallback, useRef } from 'react'
import { cn, useBooleanState, useBreakpoint, useOutsideClick, useWindowEvent } from '@/shared/lib'
import { Button, Icon } from '@/shared/ui'
import { THEME_LABEL, THEME_LIST } from '../config'
import { useTheme } from '../lib'
import { ThemeDropdown } from './theme-dropdown'

export const ThemeDropdownButton: React.FC = () => {
  const { theme, realTheme, setTheme } = useTheme()

  const [isOpen, { setFalse: close, toggle }] = useBooleanState()
  const matchesLG = useBreakpoint('lg')

  const buttonRef = useRef<HTMLButtonElement>(null)
  const onClose = useCallback(() => {
    buttonRef.current?.focus()
    close()
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
            realTheme === 'light' && 'animate-pop-spin opacity-100',
          )}
        />
        <Icon.MoonEmoji
          className={cn(
            'absolute inset-0 m-auto text-lg opacity-0 transition-opacity md:text-xl',
            realTheme === 'dark' && 'animate-pop-spin opacity-100',
          )}
        />
      </Button>
      <ThemeDropdown open={isOpen} onClose={onClose} breakpoint={!matchesLG}>
        {THEME_LIST.map((value) => (
          <Button
            key={value}
            variant="subtle"
            title={`테마 변경: ${THEME_LABEL[value]}`}
            className="w-full md:h-9"
            onClick={() => {
              setTheme(value)
              onClose()
            }}
            disabled={theme === value}
          >
            {`${THEME_LABEL[value]}${theme === value ? ' (선택됨)' : ''}`}
          </Button>
        ))}
      </ThemeDropdown>
    </div>
  )
}
