import type { ImageData as ArticleThumbnailProps } from '@/shared/lib'
import { Container, ThumbnailImage } from '@/shared/ui'

export const ArticleThumbnail: React.FC<ArticleThumbnailProps> = (props) => (
  <Container variant="image" layer="middle" className="flex items-center justify-center">
    <ThumbnailImage {...props} quality={100} priority />
  </Container>
)
