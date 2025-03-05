/* eslint-disable tailwindcss/no-custom-classname */

import type { MDXRemoteProps } from 'next-mdx-remote/rsc'
import { Badge, Container } from '@/shared/ui'
import { adjustPublicPath, getHTMLParseInterface } from '../lib'
import { CodeBlock } from './code-block'
import { ContentImage } from './content-image'
import { LinkText } from './link-text'

export const htmlComponents = [
  getHTMLParseInterface('table')((props) => (
    <div className="group-table overflow-x-auto rounded-md border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
      <table {...props} className="w-full min-w-96 table-auto">
        {props.children}
      </table>
    </div>
  )),
  getHTMLParseInterface('thead')((props) => (
    <thead {...props} className="border-b border-gray-200 dark:border-gray-700">
      {props.children}
    </thead>
  )),
  getHTMLParseInterface('tr')((props) => (
    <tr {...props} className="peer border-gray-200 peer-[]:border-t dark:border-gray-700">
      {props.children}
    </tr>
  )),
  getHTMLParseInterface('th')((props) => (
    <th
      className="break-keep border-r border-gray-200 bg-gray-50 px-3 py-2 text-sm font-medium last:border-none md:text-base dark:border-gray-700 dark:bg-gray-800"
      rowSpan={Number((props as Record<string, string>).rowspan) || props.rowSpan}
      colSpan={Number((props as Record<string, string>).colspan) || props.colSpan}
      style={props.style}
    >
      {props.children}
    </th>
  )),
  getHTMLParseInterface('td')((props) => (
    <td
      className="break-keep border-r border-gray-200 px-3 py-2 last:border-none dark:border-gray-700"
      rowSpan={Number((props as Record<string, string>).rowspan) || props.rowSpan}
      colSpan={Number((props as Record<string, string>).colspan) || props.colSpan}
      style={props.style}
    >
      {props.children}
    </td>
  )),
  getHTMLParseInterface('ul')((props) => (
    <ul
      {...props}
      className="group-list list-none space-y-1 py-2 *:before:absolute *:before:left-1.5 *:before:top-2.5 *:before:size-1.5 *:before:rounded-full *:before:bg-gray-500 md:space-y-2 *:before:dark:bg-gray-400"
      style={{ counterReset: 'list' }}
    >
      {props.children}
    </ul>
  )),
  getHTMLParseInterface('ol')((props) => (
    <ol
      {...props}
      className="group-list list-none space-y-1 py-2 *:before:absolute *:before:left-0 *:before:top-0 *:before:text-gray-500 *:before:content-[counter(list)'.'] md:space-y-2 *:before:dark:text-gray-400"
      style={{ counterReset: 'list' }}
    >
      {props.children}
    </ol>
  )),
  getHTMLParseInterface('li')((props) => (
    <li {...props} className="relative break-keep pl-7" style={{ counterIncrement: 'list' }}>
      {props.children}
    </li>
  )),
  getHTMLParseInterface('h1')((props) => (
    <h2
      {...props}
      className="mb-6 break-keep border-b border-gray-200 pb-4 pt-8 text-xl font-bold md:mb-8 md:pb-5 md:pt-12 md:text-3xl dark:border-gray-600"
    >
      {props.children}
    </h2>
  )),
  getHTMLParseInterface('h2')((props) => (
    <h3
      {...props}
      className="mb-6 break-keep border-b border-gray-200 pb-4 pt-8 text-xl font-bold md:mb-8 md:pb-5 md:pt-12 md:text-3xl dark:border-gray-600"
    >
      {props.children}
    </h3>
  )),
  getHTMLParseInterface('h3')((props) => (
    <h4 {...props} className="mb-6 break-keep pt-8 text-lg font-bold md:mb-8 md:pt-12 md:text-2xl">
      {props.children}
    </h4>
  )),
  getHTMLParseInterface('h4')((props) => (
    <h5 {...props} className="mb-6 break-keep pt-8 font-bold md:mb-8 md:pt-12 md:text-xl">
      {props.children}
    </h5>
  )),
  getHTMLParseInterface('h5')((props) => (
    <h6 {...props} className="mb-6 break-keep pt-8 font-bold md:mb-8 md:pt-12 md:text-xl">
      {props.children}
    </h6>
  )),
  getHTMLParseInterface('h6')((props) => (
    <p {...props} className="mb-6 break-keep pt-8 font-bold md:mb-8 md:pt-12 md:text-xl">
      {props.children}
    </p>
  )),
  getHTMLParseInterface('img')((props) => (
    <ContentImage {...props} className="group-[-table]:my-1 group-[-table]:rounded" />
  )),
  getHTMLParseInterface('video')(({ width, height, children }) => (
    <Container
      variant="image"
      layer="middle"
      className="group-[-table]:my-1 group-[-table]:rounded"
    >
      <video controls muted autoPlay width={width} height={height}>
        {children}
      </video>
    </Container>
  )),
  getHTMLParseInterface('source')(({ src = '', ...props }) => (
    <source {...props} src={adjustPublicPath(src)} />
  )),
  getHTMLParseInterface('p')((props) => (
    <p {...props} className="break-keep group-[-list]:leading-7 md:leading-loose">
      {props.children}
    </p>
  )),
  getHTMLParseInterface('a')(({ href, children }) => (
    <LinkText href={href || '/'}>{children}</LinkText>
  )),
  getHTMLParseInterface('strong')((props) => (
    <strong {...props} className="break-keep font-bold">
      {props.children}
    </strong>
  )),
  getHTMLParseInterface('del')((props) => (
    <del {...props} className="break-keep text-gray-500 line-through dark:text-gray-400">
      {props.children}
    </del>
  )),
  getHTMLParseInterface('blockquote')((props) => (
    <blockquote
      {...props}
      className="group-blockquote space-y-2 overflow-hidden break-keep rounded-lg border-l-4 border-gray-200 bg-gray-50 p-5 pl-6 dark:border-gray-600 dark:bg-gray-800"
    >
      {props.children}
    </blockquote>
  )),
  getHTMLParseInterface('code')((props) => {
    if (!(props as Record<string, unknown>)['data-theme']) {
      return (
        <Badge
          round="xs"
          component="code"
          className="m-0.5 inline-flex whitespace-nowrap bg-gray-50 px-1 py-0.5 text-sm font-medium text-gray-700 group-[-blockquote]:bg-white md:text-base dark:bg-gray-800 dark:text-gray-50 group-[-blockquote]:dark:bg-gray-700"
        >
          {props.children}
        </Badge>
      )
    }

    return <code {...props}>{props.children}</code>
  }),
  getHTMLParseInterface('pre')((props) => (
    <CodeBlock
      {...props}
      className="bg-[var(--shiki-light-bg)] text-[var(--shiki-light)] dark:bg-[var(--shiki-dark-bg)] dark:text-[var(--shiki-dark)]"
    >
      {props.children}
    </CodeBlock>
  )),
  getHTMLParseInterface('span')((props) => (
    <span
      {...props}
      className={
        props.style ? 'text-[var(--shiki-light)] dark:text-[var(--shiki-dark)]' : undefined
      }
    >
      {props.children}
    </span>
  )),
]

export const components: MDXRemoteProps['components'] = {
  ...htmlComponents.reduce((map, { tagName, displayName, component }) => {
    return Object.assign(map, {
      [tagName]: component,
      [displayName]: component,
    })
  }, {}),
}
