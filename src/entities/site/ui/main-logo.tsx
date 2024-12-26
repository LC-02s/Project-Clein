'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/shared/lib'
import { MAIN_TITLE } from '../config'

interface MainLogoProps {
  className?: string
}

export default function MainLogo({ className }: MainLogoProps) {
  const pathname = usePathname()

  return (
    <Link
      href="/"
      title="메인으로"
      className={cn('block text-xl font-bold', className)}
      onClick={(e) => {
        if (pathname === '/') e.preventDefault()
      }}
    >
      {MAIN_TITLE}
    </Link>
  )
}
