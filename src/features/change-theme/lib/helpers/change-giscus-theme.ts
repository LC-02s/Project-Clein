import { GISCUS_ADDRESS, GISCUS_FRAME_CLASS_NAME } from '@/entities/site'
import type { RealTheme } from '../../model'

export default function changeGiscusTheme(realTheme: RealTheme) {
  const iframe = document.querySelector<HTMLIFrameElement>(`.${GISCUS_FRAME_CLASS_NAME}`)
  const message = { giscus: { setConfig: { theme: realTheme } } }

  iframe?.contentWindow?.postMessage(message, GISCUS_ADDRESS)
}
