'use client'

import { useEffect } from 'react'
import { GISCUS_ADDRESS, GISCUS_CLASS_NAME, GITHUB } from '@/entities/site'
import { useTimeout } from '@/shared/lib'
import { cn } from '@/shared/lib'
import { changeGiscusTheme, useTheme } from '../lib'

export default function Giscus({
  className,
  ...props
}: Omit<React.JSX.IntrinsicElements['div'], 'children'>) {
  const { start } = useTimeout()
  const { realTheme } = useTheme()

  useEffect(() => {
    const id = `${GISCUS_CLASS_NAME}-client-loader`
    const failed = !changeGiscusTheme(realTheme)

    if (failed) {
      start(() => {
        const scriptEl = document.createElement('script')

        scriptEl.id = id
        scriptEl.src = `${GISCUS_ADDRESS}/client.js`
        scriptEl.async = true
        scriptEl.crossOrigin = 'anonymous'

        scriptEl.setAttribute('data-repo', `${GITHUB.USER_ID}/${GITHUB.REPO.NAME}`)
        scriptEl.setAttribute('data-repo-id', GITHUB.REPO.ID)
        scriptEl.setAttribute('data-category', GITHUB.REPO.CATEGORY.NAME)
        scriptEl.setAttribute('data-category-id', GITHUB.REPO.CATEGORY.ID)
        scriptEl.setAttribute('data-mapping', 'pathname')
        scriptEl.setAttribute('data-strict', '0')
        scriptEl.setAttribute('data-reactions-enabled', '1')
        scriptEl.setAttribute('data-emit-metadata', '1')
        scriptEl.setAttribute('data-input-position', 'top')
        scriptEl.setAttribute('data-theme', realTheme)
        scriptEl.setAttribute('data-lang', 'ko')
        scriptEl.setAttribute('data-loading', 'lazy')

        document.getElementById(id)?.remove()
        document.body.appendChild(scriptEl)
      }, 300)
    }

    return () => {
      document.getElementById(id)?.remove()
    }
  }, [realTheme, start])

  return <div className={cn(GISCUS_CLASS_NAME, className)} {...props} />
}
