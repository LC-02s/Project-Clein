import { GISCUS_ADDRESS, GISCUS_FRAME_CLASS_NAME } from '@/shared/config'
import type { RealTheme } from '../../model'

export default function changeGiscusTheme(realTheme: RealTheme) {
  const selector = `.${GISCUS_FRAME_CLASS_NAME}`
  const iframe = document.querySelector<HTMLIFrameElement>(selector)
  const message = { giscus: { setConfig: { theme: realTheme } } }

  iframe?.contentWindow?.postMessage(message, GISCUS_ADDRESS)

  return !!iframe && !iframe.classList.contains(`${GISCUS_FRAME_CLASS_NAME}--loading`)
}
