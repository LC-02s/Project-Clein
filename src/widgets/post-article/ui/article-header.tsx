import { type PostDetail } from '@/entities/post'

export type ArticleHeaderProps = React.PropsWithChildren<Pick<PostDetail, 'title' | 'description'>>

export const ArticleHeader: React.FC<ArticleHeaderProps> = ({ title, description, children }) => (
  <header className="mb-8 border-gray-200 md:mb-12 md:border-b md:pb-16 dark:border-gray-600">
    <h2 className="break-keep text-2xl font-bold md:text-3xl">{title}</h2>
    <p className="mt-4 break-keep text-gray-500 md:mt-6 md:text-xl dark:text-gray-400">
      {description}
    </p>
    {children}
  </header>
)
