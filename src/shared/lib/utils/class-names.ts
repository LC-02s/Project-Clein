import { cx } from 'class-variance-authority'
import { twMerge } from 'tailwind-merge'

export default function cn(...inputs: Parameters<typeof cx>) {
  return twMerge(cx(inputs))
}
