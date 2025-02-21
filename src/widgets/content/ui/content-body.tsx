'use server'

import { MDXRemote } from 'next-mdx-remote/rsc'
import { cn } from '@/shared/lib'
import { options } from '../config'
import { type ContentMapper, parseHTMLContent } from '../lib'
import { EmptyContent } from './empty-content'
import { components, htmlComponents } from './mdx-components'

export interface ContentParserProps
  extends Omit<React.JSX.IntrinsicElements['div'], keyof React.PropsWithChildren> {
  content: string
  mapper?: ContentMapper
}

export const ContentBody: React.FC<ContentParserProps> = async ({
  content,
  mapper,
  className,
  ...props
}) => {
  if (!content) {
    return <EmptyContent />
  }

  return (
    <div
      className={cn('py-12 text-base text-gray-700 md:text-lg dark:text-gray-200', className)}
      {...props}
    >
      <MDXRemote
        components={components}
        options={options}
        source={parseHTMLContent(content, htmlComponents, mapper)}
      />
    </div>
  )
}
