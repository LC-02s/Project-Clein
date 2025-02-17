'use client'

import Image from 'next/image'
import { useState } from 'react'
import { PUBLIC_PATH } from '@/shared/config'
import { type ImageData, THEME, cn, useCheckHydration, useTheme } from '@/shared/lib'
import { containerVariants, Icon } from '@/shared/ui'

interface InnerImageProps extends ImageData {
  onError?: () => void
}

const InnerImage: React.FC<InnerImageProps> = (props) => (
  <Image
    src={props.src.startsWith(PUBLIC_PATH) ? props.src.replace(PUBLIC_PATH, '') : props.src}
    alt={props.alt}
    loading="lazy"
    quality={100}
    fill
    onError={props.onError}
  />
)

export interface ContentImageProps extends ImageData {
  width: number
  height: number
  'data-dark-src'?: string
}

export const ContentImage: React.FC<ContentImageProps> = (props) => {
  const isHydrated = useCheckHydration()

  const { theme } = useTheme()
  const isDarkTheme = theme === THEME.DARK

  const ratio = props.height / props.width
  const [isError, setIsError] = useState(Number.isNaN(ratio))

  return (
    <div
      className={cn(
        containerVariants({ variant: 'image', layer: 'middle' }),
        'relative flex w-full items-center justify-center overflow-hidden',
      )}
      style={{ paddingBottom: isError ? undefined : `${(ratio * 100).toFixed(4)}%` }}
    >
      {!isError &&
        (isHydrated ? (
          <InnerImage
            src={isDarkTheme && !!props['data-dark-src'] ? props['data-dark-src'] : props.src}
            alt={props.alt}
            onError={() => setIsError(true)}
          />
        ) : (
          <span className="absolute inset-0 inline-flex items-center justify-center">
            <Icon.RotateSpinner className="size-7 text-gray-500 dark:text-gray-400" />
          </span>
        ))}
      {isError && (
        <p className="flex select-none flex-col items-center justify-center px-3 py-12">
          <Icon.WarningColor className="mb-3 size-9 md:size-12" />
          <span className="break-keep pb-2 text-center text-sm font-medium text-gray-500 md:text-lg dark:text-gray-400">
            이미지를 불러오는데 실패했어요
          </span>
        </p>
      )}
    </div>
  )
}
