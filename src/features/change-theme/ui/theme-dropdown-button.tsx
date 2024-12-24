'use client'

import { useCallback, useRef } from 'react'
import { cn, useBooleanState, useBreakpoint, useOutsideClick, useWindowEvent } from '@/shared/lib'
import { Button, Icon } from '@/shared/ui'
import { THEME_LABEL, THEME_LIST } from '../config'
import { useTheme } from '../model'
import ThemeDropdown from './theme-dropdown'

export default function ThemeDropdownButton() {
  const { theme, realTheme, setTheme } = useTheme()
  const [isOpen, { setFalse: close, toggle }] = useBooleanState()
  const lg = useBreakpoint('lg', false)
  const buttonRef = useRef<HTMLButtonElement | null>(null)

  const containerRef = useOutsideClick<HTMLDivElement>(() => {
    if (!lg) close()
  })

  const onClose = useCallback(() => {
    if (lg) {
      buttonRef.current?.focus()
    }

    close()
  }, [lg, close])

  useWindowEvent('keydown', (e) => {
    if (isOpen && e.key === 'Escape') close()
  })

  return (
    <div ref={containerRef} className="relative flex items-center justify-center">
      <Button ref={buttonRef} title="테마 변경" square onClick={toggle}>
        <Icon.SunEmoji
          className={cn(
            'absolute inset-0 m-auto text-xl opacity-0 transition-opacity',
            realTheme === 'light' && 'animate-pop-spin opacity-100',
          )}
        />
        <Icon.MoonEmoji
          className={cn(
            'absolute inset-0 m-auto text-xl opacity-0 transition-opacity',
            realTheme === 'dark' && 'animate-pop-spin opacity-100',
          )}
        />
        <span className="hidden-text">테마 변경</span>
      </Button>
      <ThemeDropdown open={isOpen} onClose={onClose} breakpoint={lg}>
        {THEME_LIST.map((value) => (
          <Button
            key={value}
            variant="subtle"
            title={`테마 변경: ${THEME_LABEL[value]}`}
            className="w-full text-base lg:h-9"
            onClick={() => {
              setTheme(value)
              close()
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
