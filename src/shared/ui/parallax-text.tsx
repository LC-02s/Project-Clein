'use client'

import {
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'motion/react'
import { Fragment, useRef } from 'react'
import { useBreakpoint } from '@/shared/lib'

const wrap = ({ min = 0, max = 0, value = 0 }) => {
  const rangeSize = max - min

  return ((((value - min) % rangeSize) + rangeSize) % rangeSize) + min
}

export interface ParallaxTextProps extends React.PropsWithChildren {
  baseVelocity?: number
}

export const ParallaxText: React.FC<ParallaxTextProps> = ({ baseVelocity = 5, children }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef)
  const baseX = useMotionValue(0)
  const direction = useRef<1 | -1>(1)

  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 })
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], { clamp: false })

  const matches3XL = useBreakpoint('3xl')
  const matchesMD = useBreakpoint('md')
  const repeat = matches3XL ? 4 : matchesMD ? 3 : 2

  const x = useTransform(baseX, (value) => {
    const min = 0
    const max = min - 100 / repeat

    return `${wrap({ min, max, value }) || 0}%`
  })

  useAnimationFrame((_, delta) => {
    if (isInView) {
      const velocity = velocityFactor.get()
      const prev = baseX.get()
      const moveBy = direction.current * baseVelocity * (delta / 1000)

      if (velocity) {
        direction.current = velocity < 0 ? -1 : 1
      }

      baseX.set(prev + moveBy + direction.current * moveBy * velocity)
    }
  })

  return (
    <div ref={containerRef} className="w-full overflow-hidden py-2">
      <motion.div
        className="flex w-fit items-center overflow-hidden whitespace-nowrap"
        style={{ x, willChange: isInView ? 'transform' : 'auto' }}
      >
        {Array.from({ length: repeat }, (_, i) => (
          <Fragment key={i}>{children}</Fragment>
        ))}
      </motion.div>
    </div>
  )
}
