import Link from 'next/link'
import { MAIN_TITLE } from '../../config'
import { cn } from '../../lib'

export interface MainLogoProps {
  className?: string
  render?: typeof Link
}

export function MainLogo({ className, render: Component = Link }: MainLogoProps) {
  return (
    <Component href="/" title="메인으로" className={cn('block text-xl font-bold', className)}>
      {MAIN_TITLE}
    </Component>
  )
}
