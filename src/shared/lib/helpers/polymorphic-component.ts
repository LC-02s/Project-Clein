export type ExtendedProps<Props = object, OverrideProps = object> = OverrideProps &
  Omit<Props, keyof OverrideProps>

export interface PolymorphicComponentProps<Props = object> {
  component?: React.ElementType | { (props: Props): React.ReactNode }
}

export interface PolymorphicComponent<VariantProps, DefaultProps = object>
  extends Pick<React.FC, 'displayName'> {
  <Props = object, ComponentProp extends PolymorphicComponentProps<Props> = object>(
    props: ComponentProp['component'] extends React.ElementType
      ? ExtendedProps<React.ComponentProps<ComponentProp['component']>, VariantProps> &
          Required<ComponentProp>
      : ComponentProp['component'] extends { (props: Props): React.ReactNode }
        ? ExtendedProps<Props, VariantProps> & Required<ComponentProp>
        : ExtendedProps<DefaultProps, VariantProps> & ComponentProp,
  ): React.ReactNode
}

export const createPolymorphicComponent = <VariantProps, DefaultProps = object>(
  component: React.FC<
    ExtendedProps<DefaultProps, VariantProps> & PolymorphicComponentProps<DefaultProps>
  >,
) => component as PolymorphicComponent<VariantProps, DefaultProps>
