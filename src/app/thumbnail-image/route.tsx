import { readFile } from 'fs/promises'
import { resolve } from 'path'
import { ImageResponse } from 'next/og'
import type { NextRequest } from 'next/server'
import { MAIN_TITLE, THUMBNAIL_SIZE } from '@/shared/config'

const options: ConstructorParameters<typeof ImageResponse>[1] = {
  ...THUMBNAIL_SIZE,
  emoji: 'twemoji',
  fonts: [
    {
      data: await readFile(resolve('src/app/font/pretendard-bold.otf')),
      name: 'Pretendard',
      weight: 700,
      style: 'normal',
    },
  ],
}

const thumbnailStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  padding: 80,
  fontFamily: options.fonts?.[0].name,
  fontWeight: options.fonts?.[0].weight,
  fontSize: 100,
  color: '#fff',
  WebkitTextStrokeWidth: 8,
  WebkitTextStrokeColor: 'rgba(255, 255, 255, 0.24)',
  wordBreak: 'keep-all',
  backgroundColor: '#3f3f46',
  backgroundImage: `url(${process.env.NEXT_PUBLIC_DOMAIN_ADDRESS}/img/thumbnail-background.jpg)`,
  backgroundPosition: 'center',
  backgroundSize: 'cover',
}

export const GET = (request: NextRequest) => {
  const { searchParams } = request.nextUrl
  const text = searchParams.get('text') || MAIN_TITLE

  return new ImageResponse(<div style={thumbnailStyle}>{text}</div>, options)
}
