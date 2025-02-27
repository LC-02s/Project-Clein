'use client'

import Image from 'next/image'
import { useState } from 'react'
import { PUBLIC_PATH } from '@/shared/config'
import { cn, THEME, useCheckHydration, useTheme } from '@/shared/lib'
import { Container, ExternalLink, FallbackRender, Icon } from '@/shared/ui'

const ImageErrorFallback: React.FC = () => (
  <p className="flex select-none flex-col items-center justify-center px-3 py-12">
    <Icon.WarningColor className="mb-3 size-9 md:size-12" />
    <span className="break-keep pb-2 text-center text-sm font-medium text-gray-500 md:text-lg dark:text-gray-400">
      이미지를 불러오는데 실패했어요
    </span>
  </p>
)

const ImageLoader: React.FC = () => (
  <span className="absolute inset-0 inline-flex items-center justify-center">
    <Icon.RotateSpinner className="size-7 text-gray-500 dark:text-gray-400" />
  </span>
)

export const ContentImage: React.FC<
  React.JSX.IntrinsicElements['img'] & { 'data-dark-src'?: string }
> = (props) => {
  const isHydrated = useCheckHydration()

  const { theme } = useTheme()
  const isDarkTheme = theme === THEME.DARK

  const raw = isDarkTheme && !!props['data-dark-src'] ? props['data-dark-src'] : props.src || ''
  const src = raw.startsWith(PUBLIC_PATH) ? raw.replace(PUBLIC_PATH, '') : raw

  const ratio = (Number(props.height ?? 0) || 0) / (Number(props.width ?? 0) || 0)
  const [isError, setIsError] = useState(!ratio)

  return (
    <Container
      variant="image"
      layer="middle"
      className={cn('relative flex w-full items-center justify-center', props.className)}
      style={{ paddingBottom: isError ? undefined : `${(ratio * 100).toFixed(4)}%` }}
    >
      <FallbackRender render={isError} component={<ImageErrorFallback />}>
        <FallbackRender render={!isHydrated} component={<ImageLoader />}>
          <ExternalLink href={src} title="이미지 크게 보기" className="absolute inset-0">
            <Image
              src={src}
              alt={props.alt || ''}
              loading="lazy"
              quality={100}
              fill
              onError={() => setIsError(true)}
            />
          </ExternalLink>
        </FallbackRender>
      </FallbackRender>
    </Container>
  )
}
