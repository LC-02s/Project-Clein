export type IconProps = React.SVGProps<SVGSVGElement>
export interface ArrowIconProps extends IconProps {
  direction: keyof typeof _direction
}

export const _direction = {
  top: { deg: 0, label: '위쪽' },
  bottom: { deg: 180, label: '아래쪽' },
  left: { deg: 270, label: '왼쪽' },
  right: { deg: 90, label: '오른쪽' },
} as const

export const _arrowIconProps = ({ direction, style, ...props }: ArrowIconProps): IconProps => ({
  ...props,
  style: { transform: `rotate(${_direction[direction].deg}deg)`, ...style },
  'aria-label': `${_direction[direction].label} 화살표`,
})

// outline
export * from './arrow-outline'
export * from './tea-cup-outline'
export * from './check-outline'
export * from './copy-outline'
export * from './document-title-outline'
export * from './code-outline'
export * from './atom-outline'
export * from './user-outline'
export * from './clock-circle-outline'
export * from './calendar-mark-outline'
export * from './magnifier-outline'
export * from './tag-outline'
export * from './x-outline'
export * from './refresh-outline'
export * from './share-outline'
export * from './chat-round-outline'
export * from './link-outline'
export * from './menu-outline'
export * from './new-tab-outline'

// emoji
export * from './sun-emoji'
export * from './moon-emoji'
export * from './house-emoji'
export * from './thinking-face-emoji'
export * from './construction-emoji'
export * from './label-emoji'
export * from './rocket-emoji'
export * from './note-book-emoji'
export * from './page-emoji'
export * from './police-car-light-emoji'
export * from './laptop-emoji'
export * from './bubble-tea-emoji'
export * from './folded-hands-emoji'
export * from './light-bulb-emoji'

// bold
export * from './arrow-bold'
export * from './letter-bold'

// spinner
export * from './rotate-spinner'

// color
export * from './warning-color'

// logo
export * from './html-logo'
export * from './css-logo'
export * from './javascript-logo'

export * from './typescript-logo'
export * from './react-logo'
export * from './react-query-logo'
export * from './react-router-logo'
export * from './redux-logo'
export * from './next-js-logo'

export * from './sass-logo'
export * from './tailwindcss-logo'
export * from './framer-motion-logo'
export * from './mantine-logo'
export * from './storybook-logo'
export * from './vite-logo'
export * from './vitest-logo'
export * from './playwright-logo'
export * from './msw-logo'
export * from './zod-logo'
export * from './supabase-logo'
export * from './aws-amplify-logo'
export * from './docker-logo'
export * from './github-actions-logo'

export * from './github-logo'
export * from './notion-logo'
export * from './slack-logo'
export * from './jira-logo'
export * from './figma-logo'
export * from './adobe-photoshop-logo'
export * from './adobe-illustrator-logo'
export * from './adobe-xd-logo'
