import { MDXRemote, type MDXRemoteProps } from 'next-mdx-remote/rsc'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import remarkBreaks from 'remark-breaks'
import remarkGfm from 'remark-gfm'
import { cn } from '@/shared/lib'
import components from './mdx-components'

interface ContentParserProps extends Omit<React.JSX.IntrinsicElements['div'], 'children'> {
  content: string
}

const options: MDXRemoteProps['options'] = {
  mdxOptions: {
    remarkPlugins: [remarkGfm, remarkBreaks],
    rehypePlugins: [
      [rehypePrettyCode, { theme: { light: 'light-plus', dark: 'dark-plus' } }],
      rehypeSlug,
    ],
  },
}

export default async function ContentBody({ content, className, ...props }: ContentParserProps) {
  return (
    <div
      className={cn('py-12 text-base text-zinc-800 md:text-lg dark:text-zinc-200', className)}
      {...props}
    >
      <MDXRemote source={content} components={components} options={options} />
    </div>
  )
}
