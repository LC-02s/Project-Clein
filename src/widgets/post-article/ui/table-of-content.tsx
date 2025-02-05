'use client'

import { useEffect, useState } from 'react'
import { type PropsWithClassName, cn, createScrollToSection } from '@/shared/lib'
import { Icon } from '@/shared/ui'
import { ARTICLE_ASIDE_CLOSE_CLASS_NAME, ARTICLE_ID } from '../config'

export const TableOfContent: React.FC<PropsWithClassName> = ({ className }) => {
  const [isLoading, setLoading] = useState(true)
  const [elements, setElements] = useState<HTMLHeadingElement[]>([])

  useEffect(() => {
    const articleEl = document.getElementById(ARTICLE_ID)
    const titleEls = articleEl?.querySelectorAll<HTMLHeadingElement>('h3,h4') ?? []

    setElements([...titleEls])
    setLoading(false)
  }, [])

  if (isLoading) {
    return (
      <div className={cn('flex items-center justify-center pb-12', className)}>
        <Icon.RotateSpinner className="size-8 text-gray-500 dark:text-gray-400" />
      </div>
    )
  }

  return (
    <div className={cn('overflow-y-auto overscroll-none py-4', className)}>
      <ul className="space-y-2 text-gray-500 dark:text-gray-400">
        {elements.map((heading) => {
          const href = `#${heading.id ?? 'none'}`

          return (
            <li key={href}>
              <a
                href={href}
                className={cn(
                  'block break-keep pl-2 font-medium hover:text-blue-700 hover:underline dark:hover:text-blue-300',
                  heading.tagName === 'H4' && 'pl-6',
                  ARTICLE_ASIDE_CLOSE_CLASS_NAME,
                )}
                title={`영역 이동: ${heading.textContent ?? ''}`}
                onClick={createScrollToSection(href)}
              >
                {heading.textContent}
              </a>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
