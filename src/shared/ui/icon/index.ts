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

export * from './arrow-outline'
export * from './arrow-bold'
export * from './tea-cup-outline'
export * from './github-logo'
export * from './letter-bold'
export * from './check-outline'
export * from './copy-outline'
export * from './document-title-outline'
export * from './code-outline'
export * from './atom-outline'
export * from './user-outline'
export * from './sun-emoji'
export * from './moon-emoji'
export * from './house-emoji'
export * from './thinking-face-emoji'
export * from './construction-emoji'
export * from './clock-circle-outline'
export * from './calendar-mark-outline'
export * from './magnifier-outline'
export * from './label-emoji'
export * from './rocket-emoji'
export * from './note-book-emoji'
export * from './page-emoji'
export * from './tag-outline'
export * from './x-outline'
export * from './police-car-light-emoji'
export * from './refresh-outline'
export * from './rotate-spinner'
export * from './share-outline'
export * from './chat-round-outline'
export * from './link-outline'
export * from './menu-outline'
export * from './laptop-emoji'
export * from './new-tab-outline'
export * from './bubble-tea-emoji'
export * from './warning-color'
export * from './folded-hands-emoji'
