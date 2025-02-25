import type { IconProps } from '../icon/interface'
import { type PropsWithClassName, cn, createPolymorphicComponent } from '../../lib'

export interface TechStackProps extends PropsWithClassName {
  icon?: React.FC<IconProps> | React.ReactNode
  name?: string
}

export const TechStack = createPolymorphicComponent<TechStackProps>(
  ({ icon: Icon, name, className, component: Component = 'span', ...props }) => (
    <Component
      className={cn(
        'flex items-center justify-center space-x-2 px-3 py-1 md:px-4 md:text-lg',
        className,
      )}
      {...props}
    >
      {!!Icon &&
        (typeof Icon === 'function' ? (
          <Icon className="size-5 drop-shadow md:size-6" />
        ) : (
          <span
            className="relative flex size-5 items-center justify-center drop-shadow md:size-6"
            style={{ fontSize: '1.2em' }}
          >
            {Icon}
          </span>
        ))}
      {!!name && <span className="font-bold text-gray-800 dark:text-gray-100">{name}</span>}
    </Component>
  ),
)
