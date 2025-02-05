/* eslint-disable @next/next/no-img-element */

import type { MDXRemoteProps } from 'next-mdx-remote/rsc'
import { cn } from '@/shared/lib'
import { badgeVariants, containerVariants } from '@/shared/ui'
import { CodeBlock } from './code-block'
import { LinkText } from './link-text'

export const components: MDXRemoteProps['components'] = {
  h1: (props) => (
    <h2
      {...props}
      className="mb-6 break-keep border-b border-gray-200 pb-4 pt-8 text-xl font-bold md:mb-8 md:pb-5 md:pt-12 md:text-3xl dark:border-gray-600"
    >
      {props.children}
    </h2>
  ),
  h2: (props) => (
    <h3
      {...props}
      className="mb-6 break-keep border-b border-gray-200 pb-4 pt-8 text-xl font-bold md:mb-8 md:pb-5 md:pt-12 md:text-3xl dark:border-gray-600"
    >
      {props.children}
    </h3>
  ),
  h3: (props) => (
    <h4 {...props} className="mb-6 break-keep pt-8 text-lg font-bold md:mb-8 md:pt-12 md:text-2xl">
      {props.children}
    </h4>
  ),
  h4: (props) => (
    <h5 {...props} className="mb-6 break-keep pt-8 font-bold md:mb-8 md:pt-12 md:text-xl">
      {props.children}
    </h5>
  ),
  h5: (props) => (
    <h6 {...props} className="mb-6 break-keep pt-8 font-bold md:mb-8 md:pt-12 md:text-xl">
      {props.children}
    </h6>
  ),
  h6: (props) => (
    <p {...props} className="mb-6 break-keep pt-8 font-bold md:mb-8 md:pt-12 md:text-xl">
      {props.children}
    </p>
  ),
  p: (props) => (
    <p {...props} className="break-keep leading-loose">
      {props.children}
    </p>
  ),
  a: ({ href, children }) => <LinkText href={href || '/'}>{children}</LinkText>,
  pre: (props) => (
    <CodeBlock
      {...props}
      className="bg-[var(--shiki-light-bg)] text-[var(--shiki-light)] dark:bg-[var(--shiki-dark-bg)] dark:text-[var(--shiki-dark)]"
    >
      {props.children}
    </CodeBlock>
  ),
  code: (props) => (
    <code
      {...props}
      className={
        !props['data-theme']
          ? cn(
              badgeVariants({ round: 'xs' }),
              'm-0.5 mr-1 inline-flex whitespace-nowrap bg-gray-50 px-1 py-0.5 text-sm font-medium text-gray-700 group-[]:bg-white md:text-base dark:bg-gray-800 dark:text-gray-50 group-[]:dark:bg-gray-700',
            )
          : undefined
      }
    >
      {props.children}
    </code>
  ),
  span: (props) => (
    <span
      {...props}
      className={
        props.style ? 'text-[var(--shiki-light)] dark:text-[var(--shiki-dark)]' : undefined
      }
    >
      {props.children}
    </span>
  ),
  strong: (props) => (
    <strong {...props} className="break-keep font-bold">
      {props.children}
    </strong>
  ),
  del: (props) => (
    <del {...props} className="break-keep line-through">
      {props.children}
    </del>
  ),
  blockquote: (props) => (
    <blockquote
      {...props}
      className="group space-y-2 overflow-hidden break-keep rounded-lg border-l-4 border-gray-200 bg-gray-50 p-5 pl-6 dark:border-gray-600 dark:bg-gray-800"
    >
      {props.children}
    </blockquote>
  ),
  ul: (props) => (
    <ul
      {...props}
      className="list-none space-y-2 py-2 *:before:absolute *:before:left-1.5 *:before:top-3 *:before:size-1.5 *:before:rounded-full *:before:bg-gray-500 *:before:dark:bg-gray-400"
      style={{ counterReset: 'list' }}
    >
      {props.children}
    </ul>
  ),
  ol: (props) => (
    <ol
      {...props}
      className="list-none space-y-2 py-2 *:before:absolute *:before:left-0 *:before:top-0 *:before:text-gray-500 *:before:content-[counter(list)'.'] *:before:dark:text-gray-400"
      style={{ counterReset: 'list' }}
    >
      {props.children}
    </ol>
  ),
  li: (props) => (
    <li {...props} className="relative break-keep pl-7" style={{ counterIncrement: 'list' }}>
      {props.children}
    </li>
  ),
  table: (props) => (
    <table {...props} className="w-full table-auto border-collapse">
      {props.children}
    </table>
  ),
  th: (props) => (
    <th
      {...props}
      className="break-keep border border-gray-200 bg-gray-50 p-2 font-bold dark:border-gray-700 dark:bg-gray-800"
    >
      {props.children}
    </th>
  ),
  td: (props) => (
    <td {...props} className="break-keep border border-gray-200 p-2 dark:border-gray-700">
      {props.children}
    </td>
  ),
  img: (props) => (
    <span
      className={cn(
        containerVariants({ variant: 'image', layer: 'middle' }),
        'flex items-center justify-center',
      )}
    >
      <img {...props} alt={props.alt} src={props.src} className="object-cover" loading="lazy" />
    </span>
  ),
}
