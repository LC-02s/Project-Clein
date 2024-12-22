'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/shared/lib'

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
      Clein&#39;s Portfolio
    </Link>
  )
}
