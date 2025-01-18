'use server'

import { MDXRemote } from 'next-mdx-remote/rsc'
import { cn } from '@/shared/lib'
import { options } from '../config'
import { components } from './mdx-components'

export interface ContentParserProps extends Omit<React.JSX.IntrinsicElements['div'], 'children'> {
  content: string
}

export async function ContentBody({ content, className, ...props }: ContentParserProps) {
  return (
    <div
      className={cn('py-12 text-base text-zinc-800 md:text-lg dark:text-zinc-200', className)}
      {...props}
    >
      <MDXRemote source={content} components={components} options={options} />
    </div>
  )
}
