import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import remarkBreaks from 'remark-breaks'
import remarkGfm from 'remark-gfm'
import type { MDXRemoteProps } from 'next-mdx-remote/rsc'

export const options: MDXRemoteProps['options'] = {
  mdxOptions: {
    remarkPlugins: [remarkGfm, remarkBreaks],
    rehypePlugins: [
      [rehypePrettyCode, { theme: { light: 'light-plus', dark: 'dark-plus' } }],
      rehypeSlug,
    ],
  },
}

export const IMAGE_COMPONENT_NAME = 'Image'
