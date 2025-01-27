export type IconProps = React.SVGProps<SVGSVGElement>
export interface ArrowIconProps extends IconProps {
  direction: keyof typeof _directionToDeg
}

export const _directionToDeg = { top: 0, bottom: 180, left: 270, right: 90 } as const

export const _arrowIconProps = ({ direction, style, ...props }: ArrowIconProps): IconProps => ({
  ...props,
  style: { ...style, transform: `rotate(${_directionToDeg[direction]}deg)` },
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
