import { Container } from '@/shared/ui'
import { ArticleLinkCopyButton } from './article-link-copy-button'
import { TableOfContent } from './table-of-content'

export const ArticleContent: React.FC = () => (
  <Container className="relative flex flex-1 flex-col overflow-hidden border pb-2 before:absolute before:inset-x-0 before:top-12 before:z-10 before:h-6 before:bg-gradient-to-b before:from-white after:absolute after:inset-x-0 after:bottom-2 after:z-10 after:h-6 after:bg-gradient-to-t after:from-white dark:before:from-zinc-800 dark:after:from-zinc-800">
    <Container
      round="none"
      className="relative z-20 flex items-center justify-between border-b px-3 py-2.5"
    >
      <h2 className="text-lg font-bold">목차</h2>
      <ArticleLinkCopyButton />
    </Container>
    <TableOfContent className="flex-1 px-3" />
  </Container>
)
