import { MDXRemote } from 'next-mdx-remote/rsc'
import { type PropsWithClassName, cn, createPolymorphicComponent } from '@/shared/lib'
import { FallbackRender } from '@/shared/ui'
import { options } from '../config'
import { type ContentMapper, parseHTMLContent } from '../lib'
import { EmptyContent } from './empty-content'
import { components, htmlComponents } from './mdx-components'

export interface ContentParserProps extends PropsWithClassName {
  content: string
  mapper?: ContentMapper
}

export const ContentBody = createPolymorphicComponent<
  ContentParserProps,
  Omit<React.JSX.IntrinsicElements['div'], keyof React.PropsWithChildren>
>(({ content, mapper, className, component: Component = 'div', ...props }) => (
  <FallbackRender render={!content} component={<EmptyContent />}>
    <Component
      className={cn('py-12 text-base text-gray-700 md:text-lg dark:text-gray-200', className)}
      {...props}
    >
      <MDXRemote
        components={components}
        options={options}
        source={parseHTMLContent(content, htmlComponents, mapper)}
      />
    </Component>
  </FallbackRender>
))
