import type { PostDetail } from '@/entities/post'

export type ArticleHeaderProps = Pick<PostDetail, 'title' | 'description'>

export const ArticleHeader: React.FC<ArticleHeaderProps> = ({ title, description }) => (
  <header className="mb-8 border-zinc-200 md:mb-12 md:border-b md:pb-16 dark:border-zinc-600">
    <h2 className="break-keep text-2xl font-bold md:text-3xl">{title}</h2>
    <p className="mt-6 break-keep text-lg text-zinc-500 md:text-xl dark:text-zinc-400">
      {description}
    </p>
  </header>
)
