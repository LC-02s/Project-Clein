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
