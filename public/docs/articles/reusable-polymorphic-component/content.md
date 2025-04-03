> &#128680; 해당 글에 나오는 예제 코드는 [React v19](https://react.dev/) 및 [TypeScript v5](https://www.typescriptlang.org/ko/)을 기준으로 작성되었습니다.

<br />
<br />

## 발단

다른 프로젝트에서 [만타인(Mantine)](https://mantine.dev/)이라는 라이브러리를 사용하여 UI를 구현하던 도중 해당 패턴을 경험하게 되었습니다. 만타인은 아래 예시와 같이 버튼 컴포넌트에 링크 컴포넌트를 주입하는 것이 가능했고, 컴포넌트를 주입할 경우 바뀐 `props`에 대한 타입 추론도 완벽하게 해주는 것이었죠. 디자인만 적용해주고 실제 렌더링은 주입한 컴포넌트를 그대로 렌더링 해주었습니다.

<br />

```tsx
// 당시 상황을 재현한 예시 코드

'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@mantine/core'
import { HomeIcon } from '../icon'

export const SituationExample: React.FC = () => (
  <>
    <Button variant="default" color="gray" title="이전 페이지 이동" onClick={useRouter().back}>
      뒤로가기
    </Button>
    <Button
      component={Link}
      href="/" // Link 컴포넌트는 href props를 필수 값으로 입력받기 때문에 해당 값을 지울 경우 타입 에러가 나게됩니다.
      title="메인 페이지 이동"
      variant="default"
      color="gray"
      leftSection={<HomeIcon />}
    >
      메인으로
    </Button>
  </>
)
```

<br />

개인적으로 해당 패턴에 대한 사용성(DX)이 정말 마음에 들었습니다. 저는 `Link`라는 컴포넌트에 `Button`이라는 디자인을 입혀주고 싶었고, 해당 패턴은 결국 `Button` 컴포넌트의 책임인 "버튼"이라는 디자인을 특정한 HTML 태그에 적용해주는 목적을 다 해준 것이죠. 실제로 렌더링되는 컴포넌트에 대한 결정권은 라이브러리가 아니라 코드를 작성하는 저에게 있었습니다.

<br />

생각해보면 저런 경우가 참 흔했던 것 같습니다. 웹 접근성을 고려하여 특정한 태그를 사용하고는 싶은데 공용 디자인 컴포넌트가 단일 태그만을 렌더링한다면 스타일 자체를 다시 작성하거나 적용된 스타일을 밖으로 빼내는 과정이 필요했죠. 라이브러리를 사용하는 경우도 비슷한 문제가 있었습니다. 제가 자주 사용하는 [motion](https://motion.dev/docs) 라이브러리의 경우 `motion.div`, `motion.li` 와 같이 HTML 태그 자체를 랩핑한 컴포넌트를 제공하기 때문에 공용 디자인 컴포넌트가 단일 태그만을 랜더링한다면 마찬가지로 함께 사용하기가 번거로웠습니다. `role`이라는 속성에 태그의 역할을 명시하는 WAI-ARIA(Web Accessibility Initiative - Accessible Rich Internet Applications) 패턴을 사용하는 경우에는 태그에 대한 자유도는 생기지만 `motion` 라이브러리와 같이 특정 컴포넌트가 필요한 경우에는 사용하지 못한다는 한계가 있어 충분한 의미가 있다고 생각했습니다.

<br />

### Polymorphic Component

찾아보니 해당 패턴을 영어로는 **Polymorphic Component**라 부르고, 한국어로는 **다형성 컴포넌트**라고 부르는 것 같았습니다. 객체지향에서의 다형성은 어떤 객체의 속성이나 기능이 상황에 따라 여러 가지 형태를 가질 수 있는 성질을 의미한다고 하는데, 여기서는 의역하면 **다양한 형태를 갖는 컴포넌트** 정도로 볼 수 있겠네요. 구현이 어렵지는 않아 보였습니다.

<br />
<br />

### Render Delegation

비슷한 개념으로는 **Render Delegation** 패턴이 있습니다. 의역하면 **렌더링 위임** 패턴 정도로 볼 수 있겠네요. 해당 패턴은 어트랙션 프로젝트에서 사용했던 `Shadcn/UI` 라이브러리를 통해 알게 되었습니다. 아래 예시와 같이 `asChild` 라는 `props`를 통해 `children`에 입력한 컴포넌트에 렌더링을 위임하는 것이죠.

<br />

```tsx
// Render Delegation 예시 코드

export const RenderDelegationExample: React.FC = () => (
  <DropdownMenuTrigger asChild>
    <button type="button">
      <Icon />
    </button>
  </DropdownMenuTrigger>
)
```

<br />

해당 패턴은 신기하긴 했지만 개인적으로 그렇게 좋은 사용성 인지는 의문이 들어 직접 구현해 보지는 않았습니다. 궁금하신 분들은 [Radix-UI 라이브러리](https://www.radix-ui.com/primitives/docs/utilities/slot)에서 유틸리티 컴포넌트로 제공하고 있으니 찾아보셔도 좋을 것 같습니다.

<br />
<br />

## 레거시 코드

마침 제 포트폴리오 사이트에서 공용 디자인 컴포넌트를 `TailWindCSS`와 `Class-Variance-Authority` 라이브러리를 활용하여 관리하고 있었기 때문에 바로 적용해 보았습니다.

<br />

먼저 기존에 사용하던 `Button` 컴포넌트입니다. 클래스까지 포함하게 되면 코드가 너무 길어져서 클래스만 따로 제외했습니다.

<br />

```tsx
// button.tsx

import { type VariantProps, cva } from 'class-variance-authority'
import { cn } from '../../lib'

export const buttonVariants = cva('', {
  variants: {
    variant: { filled: '', default: '', light: '', subtle: '' },
    color: { gray: '', info: '', warn: '' },
    size: { xs: '', sm: '', md: '', lg: '' },
    square: { true: '', false: '' },
    round: { xs: '', sm: '', md: '', lg: '', xl: '', full: '' },
  },
  compoundVariants: [
    { variant: ['default', 'light'], color: ['gray', 'info', 'warn'], class: '' },

    { variant: ['default', 'light', 'subtle'], color: 'gray', class: '' },
    { variant: ['default', 'light', 'subtle'], color: 'info', class: '' },
    { variant: ['default', 'light', 'subtle'], color: 'warn', class: '' },

    { variant: 'filled', color: 'gray', class: '' },
    { variant: 'filled', color: 'info', class: '' },
    { variant: 'filled', color: 'warn', class: '' },

    { size: 'xs', square: false, class: '' },
    { size: 'sm', square: false, class: '' },
    { size: 'md', square: false, class: '' },
    { size: 'lg', square: false, class: '' },

    { size: 'xs', square: true, class: '' },
    { size: 'sm', square: true, class: '' },
    { size: 'md', square: true, class: '' },
    { size: 'lg', square: true, class: '' },
  ],
  defaultVariants: {
    variant: 'default',
    color: 'gray',
    size: 'md',
    round: 'sm',
    square: false,
  },
})

export type ButtonVariantProps = VariantProps<typeof buttonVariants>

export type ButtonProps = React.JSX.IntrinsicElements['button'] & ButtonVariantProps

export const Button: React.FC<ButtonProps> = ({
  variant,
  color,
  size,
  round,
  square,
  className,
  children,
  ...props
}) => (
  <button
    type="button"
    className={cn(buttonVariants({ variant, color, size, round, square }), className)}
    {...props}
  >
    {children}
  </button>
)
```

<br />

코드를 보시면 `cva` 패키지를 통해 생성한 `buttonVariants` 함수를 통해 입력받은 `variants` 들을 기반으로 스타일을 생성하며, `Button` 컴포넌트는 해당 함수를 간단하게 랩핑만한 형태를 취하고 있습니다. 핵심은 `buttonVariants` 함수이며, 다형성 컴포넌트가 필요한 곳 마다 직접 호출하며 사용하고 있는 상황이었습니다.

<br />
<br />

## 요구사항 분석

바로 구현하기 전에 요구사항 분석부터 간단하게 해보겠습니다.

만타인에서 제공하는 `Polymorphic Component`는 아래와 같이 크게 3가지 상황에서 사용할 수 있었습니다.

<br />

> **Polymorphic Component 구현 요구사항**
>
> 1. `component props`가 없을 경우 지정한 기본 태그에 대한 `props` 상세 타입 추론
> 2. `component props`에 특정한 컴포넌트를 입력할 경우 해당 컴포넌트에 대한 `props` 타입 추론
> 3. `component props`에 태그 이름을 입력할 경우 해당 태그에 대한 `props` 상세 타입 추론
>    - 입력 시점에 사용 가능한 태그 이름이 추론되어야 함

<br />

```tsx
// 요구사항 예시 코드

import Link from 'next/link'
import { Button } from '@mantine/core'

export const Requirements: React.FC = () => (
  <>
    <Button />
    <Button component={Link} href="/" />
    <Button component="a" />
  </>
)
```

<br />
<br />

## 구현

최종적으로는 아래와 같은 형태로 구현하였습니다. 이렇게 보니 많이 복잡해 보이네요.

<br />

```ts
// polymorphic-component.ts

export type ExtendedProps<Props = object, OverrideProps = object> = OverrideProps &
  Omit<Props, keyof OverrideProps>

export interface PolymorphicComponentProps<Props = object> {
  component?: React.ElementType | { (props: Props): React.ReactNode } // 인덱스 시그니처를 통한 Type Narrowing
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
```

<br />

디자인 컴포넌트뿐만 아니라 일반적인 컴포넌트에서도 사용할 수 있게 입력받는 제네릭 타입을 필수 값인 `VariantProps`와 선택 값인 `DefaultProps` 두 가지로 분리하여 구현하였으며, 올바른 타입 확장을 고려하여 `React.FC` 인터페이스 대신 인덱스 시그니처를 활용한 `Type Narrowing`도 적용해 주었습니다.

<br />

또한 `PolymorphicComponent` 인터페이스를 그대로 디자인 컴포넌트의 구현체에 적용할 경우 컴포넌트 내부에서 전개 연산자로 추론한 `props`의 타입이 입력받은 컴포넌트와 맞지 않는 문제가 있어 아래와 같이 `createPolymorphicComponent` 함수를 따로 제공해 주었습니다. 현재 코드는 리액트 19버전을 사용하기 때문에 입력 값을 그대로 반환하는 형태의 타입 적용만을 위한 함수이지만 18버전 이하로 사용한다면 아마 `forwardRef` 함수를 함께 적용해 볼 것 같네요.

<br />

(리액트 19버전으로 넘어오면서 느낀 건데 `ref` 값을 `forwardRef` 함수 없이 `props`로 받는 건 정말 신세계인 것 같습니다 ㅋㅋ)

<br />

```ts
// polymorphic-component.ts

export const createPolymorphicComponent = <VariantProps, DefaultProps = object>(
  component: React.FC<
    ExtendedProps<DefaultProps, VariantProps> & PolymorphicComponentProps<DefaultProps>
  >,
) => component as PolymorphicComponent<VariantProps, DefaultProps>
```

<br />

```tsx
// createPolymorphicComponent 사용 예시

export type ButtonVariantProps = VariantProps<typeof buttonVariants>

export const Button = createPolymorphicComponent<
  ButtonVariantProps,
  React.JSX.IntrinsicElements['button']
>(
  ({
    variant,
    color,
    size,
    round,
    square,
    className,
    children,
    component: Component = 'button',
    ...props
  }) => (
    <Component
      type={Component === 'button' ? 'button' : undefined}
      className={cn(buttonVariants({ variant, color, size, round, square }), className)}
      {...props} // PolymorphicComponent 인터페이스를 그대로 사용한다면 이 부분에서 타입 에러가 발생하게 됩니다.
    >
      {children}
    </Component>
  ),
)
```

<br />

구현하면서 조금 신경썼던 부분이라면 타입 추론 성능이었습니다. `JSX`에서 제공하는 모든 HTML 태그의 갯수(`JSX.IntrinsicElements`)는 세어보니 약 176개 정도 되며, 각각의 상세 타입에는 300개가 넘는 속성에 대한 `props`가 있습니다. 잘 못 구현하게 되면 아래와 같이 타입스크립트에서 연산을 포기해 버리는 경우가 생기게 되죠. 어떻게든 구현한다고 해도 타입 추론을 할 때마다 5~10초씩 걸리는 경우도 있습니다.

<br />

```text
ts(2590): 식에서는 너무 복잡해서 표시할 수 없는 공용 구조체 형식을 생성합니다.
```

<br />

그런 경우들을 사전에 방지하고자 해당 코드에서는 삼항 연산자를 통해 타입스크립트가 모든 경우의 수에 대한 타입을 미리 생성하지 않고 동적으로 타입을 추론할 수 있게 했으며, 모든 HTML 태그에 대한 유니온 타입을 표현하는 `keyof JSX.IntrinsicElements` 타입 대신 리액트에서 제공하는 최적화가 완료된 `React.ElementType` 타입을 사용했습니다. 또한 타입 관계 캐싱을 통한 성능 향상을 위해 `type` 키워드 대신 `interface`로 작성한 부분도 있습니다.

<br />

아래 영상은 적용 결과입니다. 깔끔하네요. 👍

<br />

<video controls muted autoplay width="800" height="532">
  <source src="/public/docs/articles/reusable-polymorphic-component/assets/polymorphic-component-result.mp4" type="video/mp4" />
</video>

<br />
<br />

## 후기

이전에 어트랙션의 디자인 시스템을 구축할 때 `Styled-Component` 라이브러리를 통해 접했던 `as props`를 구현하다가 실패했던 적이 있었습니다. 생각해보면 해당 글에서 다루었던 내용과 똑같은 내용이었던 것 같아요. 그때 당시에는 타입스크립트에 대해 제대로 알지 못해서 구현에 실패했었지만 지금 시점에는 구현에 성공한 것을 보니 나름 성장했다는 것이 느껴져서 뿌듯하네요.

<br />

긴 글 읽어주셔서 감사합니다. 😊

<br />
<br />
