import { createSearchParamsToURL } from '../utils'

export interface ImageData {
  src: string
  alt: string
}

export const getThumbnailData = (text: string): ImageData => ({
  alt: text,
  src: createSearchParamsToURL('/thumbnail-image')(['text', text]),
})
