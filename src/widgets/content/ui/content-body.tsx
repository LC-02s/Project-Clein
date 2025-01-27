'use server'

import { MDXRemote } from 'next-mdx-remote/rsc'
import { cn } from '@/shared/lib'
import { options } from '../config'
import { components } from './mdx-components'

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
    className={cn('py-12 text-base text-zinc-800 md:text-lg dark:text-zinc-200', className)}
    {...props}
  >
    <MDXRemote source={content} components={components} options={options} />
  </div>
)
