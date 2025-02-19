'use server'

import { MDXRemote } from 'next-mdx-remote/rsc'
import { cn } from '@/shared/lib'
import { options } from '../config'
import { parseHTMLContent } from '../lib'
import { components, htmlComponents } from './mdx-components'

export interface ContentParserProps
  extends Omit<React.JSX.IntrinsicElements['div'], keyof React.PropsWithChildren> {
  content: string
}

export const ContentBody: React.FC<ContentParserProps> = async ({
  content,
  className,
  ...props
}) => (
  <div
    className={cn('py-12 text-base text-gray-700 md:text-lg dark:text-gray-200', className)}
    {...props}
  >
    <MDXRemote
      components={components}
      options={options}
      source={parseHTMLContent(content, htmlComponents)}
    />
  </div>
)
