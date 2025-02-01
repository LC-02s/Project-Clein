import { cn } from '@/shared/lib'

export interface BackgroundGridProps {
  position?: keyof typeof backgroundGridStyles
}

const backgroundGridStyles = {
  top: {
    className: 'top-0',
    maskImage: 'linear-gradient(black, transparent)',
  },
  bottom: {
    className: 'bottom-0',
    maskImage: 'linear-gradient(transparent, black)',
  },
}

export const BackgroundGrid: React.FC<React.JSX.IntrinsicElements['div'] & BackgroundGridProps> = ({
  position = 'bottom',
  className,
  style,
  children,
}) => (
  <div
    className={cn(
      'absolute inset-x-0 z-[-1] h-80 overflow-hidden bg-grid bg-repeat',
      backgroundGridStyles[position].className,
      className,
    )}
    style={{ maskImage: backgroundGridStyles[position].maskImage, ...style }}
  >
    {children}
  </div>
)
