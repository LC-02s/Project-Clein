import Image from 'next/image'

import { THUMBNAIL_SIZE } from '../../config'
import { type ImageData } from '../../lib'

export type ThumbnailImageProps = ImageData &
  Omit<React.ComponentProps<typeof Image>, keyof ImageData>

export const ThumbnailImage: React.FC<ThumbnailImageProps> = ({ src, alt, ...props }) => (
  <Image src={src} alt={alt} {...THUMBNAIL_SIZE} {...props} />
)
