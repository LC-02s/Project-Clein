'use client'

import { useEffect } from 'react'

import { GITHUB } from '../config'
import { type Theme, useTheme, cn, useCheckHydration } from '../lib'

const GISCUS_ADDRESS = 'https://giscus.app'
const GISCUS_CLASS_NAME = 'giscus'
const GISCUS_FRAME_CLASS_NAME = `${GISCUS_CLASS_NAME}-frame`

const changeGiscusTheme = (theme: Theme) => {
  const selector = `.${GISCUS_FRAME_CLASS_NAME}`
  const iframe = document.querySelector<HTMLIFrameElement>(selector)
  const message = { giscus: { setConfig: { theme } } }

  iframe?.contentWindow?.postMessage(message, GISCUS_ADDRESS)

  return !!iframe && !iframe.classList.contains(`${GISCUS_FRAME_CLASS_NAME}--loading`)
}

export type CommentProps = Omit<React.JSX.IntrinsicElements['div'], keyof React.PropsWithChildren>

export const Comment: React.FC<CommentProps> = ({ className, ...props }) => {
  const { theme } = useTheme()
  const isHydrated = useCheckHydration()

  useEffect(() => {
    const id = `${GISCUS_CLASS_NAME}-client-loader`
    const failed = !changeGiscusTheme(theme)

    if (isHydrated && failed) {
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
      scriptEl.setAttribute('data-theme', theme)
      scriptEl.setAttribute('data-lang', 'ko')
      scriptEl.setAttribute('data-loading', 'lazy')

      document.getElementById(id)?.remove()
      document.body.appendChild(scriptEl)
    }

    return () => {
      document.getElementById(id)?.remove()
    }
  }, [theme, isHydrated])

  return <div className={cn(GISCUS_CLASS_NAME, className)} {...props} />
}
