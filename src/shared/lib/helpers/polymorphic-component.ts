export type ExtendedProps<Props = object, OverrideProps = object> = OverrideProps &
  Omit<Props, keyof OverrideProps>

export interface PolymorphicComponentProps<Props = object> {
  component?: React.ElementType | React.FC<Props>
}

export interface PolymorphicComponent<DefaultProps, VariantProps = object>
  extends React.FC<
    ExtendedProps<DefaultProps, VariantProps> & PolymorphicComponentProps<DefaultProps>
  > {
  <Props = object, ComponentProp extends PolymorphicComponentProps<Props> = object>(
    props: ComponentProp['component'] extends React.ElementType
      ? ExtendedProps<React.ComponentProps<ComponentProp['component']>, VariantProps> &
          Required<ComponentProp>
      : ComponentProp['component'] extends React.FC<Props>
        ? ExtendedProps<Props, VariantProps> & Required<ComponentProp>
        : ExtendedProps<DefaultProps, VariantProps> & ComponentProp,
  ): React.ReactNode
}

export const createPolymorphicComponent = <DefaultProps, VariantProps = object>(
  component: React.FC<
    ExtendedProps<DefaultProps, VariantProps> & PolymorphicComponentProps<DefaultProps>
  >,
) => component as PolymorphicComponent<DefaultProps, VariantProps>
