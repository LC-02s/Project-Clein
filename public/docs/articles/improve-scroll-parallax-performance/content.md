> &#128680; 해당 글에 나오는 예제 코드는 [Motion v11](https://motion.dev/docs/react-scroll-animations) 및 [Next.js v15](https://nextjs.org/docs), [React v19](https://react.dev/)을 기준으로 작성되었습니다.

<br />
<br />

## 문제 상황

포트폴리오 사이트의 메인페이지에 사용할 Scroll Parallax UI를 구현하다 문제가 생겼습니다. 아래 영상과 같이 제가 사용하는 기술 스택들을 나열해 놓고 스크롤에 따라 이동하는 방향과 속도의 가충치를 변경하는 로직이었는데 알 수 없는 이유로 성능 문제가 발생하였습니다. 해당 요소가 보이지 않는 곳에 있다가 스크롤을 해서 내려갈 경우 렌더링이 심하게 지연되었죠. 기간이 오래될 수록 지연 시간도 선형적으로 증가하였습니다.

<br />

<video controls muted autoplay width="1528" height="982">
  <source src="/public/docs/projects/portfolio-site/images/scroll-parallax-text-perfomance-issue.mp4" type="video/mp4" />
</video>

<br />

해당 영상을 녹화한 기기는 맥북 프로 16인치 M2 PRO 프로세서에 램 32GB 옵션이었습니다. 나름 괜찮은 성능을 제공하는 기기임에도 저 정도의 성능 문제가 생기는 것으로 미루어 보아 확실한 문제가 있다고 판단했었죠. 구형 안드로이드 모바일 기기에서 테스트해보니 아무것도 하지 않은 IDLE 상태에서도 프레임 드랍 현상이 있었습니다.

<br />
<br />

## 원인 분석

성능 이슈가 발생하게된 원인을 하나씩 분석해 보겠습니다.

<br />

기존 코드가 너무 길어 변경사항만 추적하는 식으로 보여드리겠습니다. 아래의 코드를 참고하여 글을 읽어 주세요.

(처음 참고했던 원본 코드는 <a href="https://motion.dev/docs/react-scroll-animations#scroll-velocity-and-direction" title="scroll velocity and direction">여기</a>에 있습니다.)

<br />

```tsx
// parallax-text.tsx - 초기 코드

'use client'

import {
  motion,
  useAnimationFrame,
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
  // 변수 선언
  const baseX = useMotionValue(0)
  const direction = useRef<1 | -1>(1)

  // 반응형에 따른 렌더링 배수 조정
  const matches3XL = useBreakpoint('3xl')
  const repeat = matches3XL ? 4 : 3

  // 스크롤 추적 및 가중치 변경 로직
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 })
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], { clamp: false })

  const x = useTransform(baseX, (value) => {
    const min = 0
    const max = min - 100 / repeat

    return `${wrap({ min, max, value }) || 0}%`
  })

  // 애니메이션 갱신 로직
  useAnimationFrame((_, delta) => {
    const velocity = velocityFactor.get()
    const prev = baseX.get()
    const moveBy = direction.current * baseVelocity * (delta / 1000)

    if (velocity) {
      direction.current = velocity < 0 ? -1 : 1
    }

    baseX.set(prev + moveBy + direction.current * moveBy * velocity)
  })

  // view 로직
  return (
    <div className="w-full overflow-hidden py-2">
      <motion.div
        className="flex w-fit items-center overflow-hidden whitespace-nowrap"
        style={{ x }}
      >
        {Array.from({ length: repeat }, (_, i) => (
          <Fragment key={i}>{children}</Fragment>
        ))}
      </motion.div>
    </div>
  )
}
```

<br />
<br />

### 추측 1. 요소 렌더링 갯수

첫 번째로 추측했던 부분은 렌더링 갯수였습니다. 해당 로직은 아래와 같이 한 줄에 약 10개 남짓의 기술 스택들을 자식요소로 전달하고 있었고, 반응형에 따라 3\~4배수로 렌더링 하는 상황이었습니다. 단순하게 계산해서 약 90\~120개 정도죠. 하지만 렌더링 갯수 자체는 더 줄이지는 못했습니다. 더 줄일 경우 의도한 디자인이 제대로 표현되지 않기 때문이었죠. 결과적으로는 원인이 아니긴 했습니다.

<br />

```tsx
// app/page.tsx 예시 코드

const MainPageExample: React.FC = () => (
  <ParallaxText baseVelocity={2}>
    <TechStack name="HTML" icon={Icon.HTMLLogo} />
    <TechStack name="CSS" icon={Icon.CSSLogo} />
    <TechStack name="JavaScript" icon={Icon.JavaScriptLogo} />
    <TechStack name="TypeScript" icon={Icon.TypeScriptLogo} />
    <TechStack name="React" icon={Icon.ReactLogo} />
    <TechStack name="Next.js" icon={Icon.NextJSLogo} />
    <TechStack
      name="Tanstack Query"
      icon={<Image src="/images/tanstack-logo.png" alt="Tanstack Query 로고" fill />}
    />
    <TechStack
      name="Zustand"
      icon={<Image src="/images/zustand-logo.png" alt="Zustand 로고" fill />}
    />
    <TechStack name="Redux" icon={Icon.ReduxLogo} />
    <TechStack name="React Router" icon={Icon.ReactRouterLogo} />
    <TechStack name="Vite" icon={Icon.ViteLogo} />
    <TechStack name="Vitest" icon={Icon.VitestLogo} />
  </ParallaxText>
)
```

<br />
<br />

### 추측 2. Intersection Observer 사용

두 번째로 적용했던 방법은 `Intersection Observer` 였습니다. 요소가 화면에서 출력되지 않고 있을 때 변경사항이 누적되어 발생하는 현상이라고 추측했기 때문이었죠. 요소가 화면에 보이는 시점에 맞춰 애니메이션을 갱신하기로 했고, 결과는 성공적이었습니다.

<br />

`motion` 라이브러리는 `Intersection Observer`를 편하게 사용할 수 있는 `useInView` 훅을 제공해 주었기에 편하게 적용해 주었습니다.

<br />

```tsx
// parallax-text.tsx - Intersection Observer 적용

import { useInView } from 'motion/react'

export const ParallaxText: React.FC<ParallaxTextProps> = ({ baseVelocity = 5, children }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef)

  // 기존과 동일

  // 애니메이션 갱신 로직
  useAnimationFrame((_, delta) => {
    if (isInView) {
      // 기존 콜백 함수 코드
    }
  })

  return (
    <div ref={containerRef} className="w-full overflow-hidden py-2">
      {/* 기존과 동일 */}
    </div>
  )
}
```

<br />

아래는 적용 결과 영상입니다.

<br />

<video controls muted autoplay width="1528" height="982">
  <source src="/public/docs/projects/portfolio-site/images/scroll-parallax-text-perfomance-issue-improvement-1.mp4" type="video/mp4" />
</video>

<br />

해당 조치 덕분에 기존에 비해서는 많은 개선을 이루었지만 마지노선 느낌이었습니다. 모바일 기기에서의 프레임 드랍 현상은 계속 되었고 맥북에서도 간헐적으로 프레임 드랍이 있었죠.

<br />
<br />

## 후속 조치

아래는 프레임 드랍 현상을 해결하기 위해 취했던 후속 조치에 관한 내용들입니다. 하나씩 다뤄볼게요.

<br />
<br />

### 조치 1. CSS Will Change 속성 적용

`Intersection Observer`를 적용했음에도 계속 프레임 드랍 현상이 있어 가장 처음 취했던 조치는 `CSS`의 `will-change` 속성이었습니다. 관련 [MDN 문서](https://developer.mozilla.org/ko/docs/Web/CSS/will-change)를 참고해보면 아래와 같이 설명하고 있습니다.

<br />

> **Will Change 속성 요약**
>
> will-change CSS 속성은 요소에 예상되는 변화의 종류에 관한 힌트를 브라우저에 제공케 한다. 그래서 실제 요소가 변화되기 전에 미리 브라우저는 적절하게 최적화할 수 있다. 이러한 종류의 최적화는 잠재적으로 성능 비용이 큰 작업을 그것이 실제로 요구되기 전에 미리 실행함으로써 페이지의 반응성을 증가시킬 수 있다.

<br />

정리해보면 요소의 스타일이 변경되는 시점에 브라우저에 해당 속성을 통해 미리 변경을 예고해주면 브라우저의 렌더링 엔진이 최적화를 시도한다는 내용이었습니다. 저의 경우에는 `motion` 라이브러리에서 제공하는 `x`값이 `will-change` 속성이 지원하는 `transform` 속성을 기반하기도 했고, `Intersection Observer`가 요소를 캐치한 순간이 요소의 스타일에 영향을 주는 시점이기 때문에 `isInView` 변수를 트리거로 사용해 주었습니다. 해당 조치는 충분한 성능적인 이점을 볼 수 있겠다고 예상했었죠.

<br />
<br />

```tsx
// parallax-text.tsx - CSS Will Change 속성 적용

export const ParallaxText: React.FC<ParallaxTextProps> = ({ baseVelocity = 5, children }) => {
  // 기존과 동일

  return (
    <div ref={containerRef} className="w-full overflow-hidden py-2">
      <motion.div
        className="flex w-fit items-center overflow-hidden whitespace-nowrap"
        style={{ x, willChange: isInView ? 'transform' : 'auto' }} // CSS Will Change 속성 적용
      >
        {/* 기존과 동일 */}
      </motion.div>
    </div>
  )
}
```

<br />

하지만 기대와는 다르게 해당 조치는 아주 미미한 프레임 개선만을 이루어 주었습니다. 실질적인 원인은 아니었던 것이죠.

<br />
<br />

### 조치 2. 렌더링 갯수 조정

위의 [추측 1](#추측-1-요소-렌더링-갯수)에서 갯수를 조정하는 것은 하지 않겠다고 했지만 모바일 뷰에서는 2배수까지 줄여도 의도한 디자인 표현에는 문제가 없어 모바일 뷰에서만 따로 배수를 줄여 주었습니다. 지푸라기라도 잡는 심정이었어요.

<br />

```tsx
// parallax-text.tsx - 렌더링 갯수 조정

export const ParallaxText: React.FC<ParallaxTextProps> = ({ baseVelocity = 5, children }) => {
  // 기존과 동일

  // 반응형에 따른 렌더링 배수 조정
  const matches3XL = useBreakpoint('3xl')
  const matchesMD = useBreakpoint('md')
  const repeat = matches3XL ? 4 : matchesMD ? 3 : 2

  // 기존과 동일

  return (
    <div ref={containerRef} className="w-full overflow-hidden py-2">
      {/* 기존과 동일 */}
    </div>
  )
}
```

<br />

하지만 해당 조치도 아주 미미한 개선만을 이루어 주었습니다. 실질적인 원인이 아니었죠.

<br />
<br />

## 실질적 원인

위의 원인 분석과 후속 조치 단계로 인해 실 사용할 수 있을 정도로 성능 개선을 이뤘긴 했지만 가장 큰 원인은 따로 있었습니다. 기술 스택 컴포넌트에서 주입 받는 아이콘 컴포넌트에 사용했던 `drop-shadow` 유틸리티 클래스 때문이었습니다. 정확히는 `svg` 요소에 적용된 `filter: drop-shadow()` 스타일 때문이었죠.

<br />

```tsx
// 모든 사태의 진범이었던 기술 스택 컴포넌트 예시 코드

export const TechStackExample: React.FC = ({ icon: Icon, label }) => (
  <span>
    <Icon className="drop-shadow" />
    {label}
  </span>
)
```

<br />

해당 내용은 이슈 상황을 재현하다가 우연히 발견하게 되었는데, 궁금해서 따로 찾아보니 `filter: drop-shadow()` 속성 자체가 매우 큰 성능을 요구한다고 하네요. 약 90\~120개 가량의 `svg` 요소에 전부 `drop-shadow` 속성을 적용한데에다 애니메이션까지 주어서 벌어진 일이었습니다. 스크롤에 따른 이동 속도 가중치까지 두었으니 브라우저 입장에서는 지옥이었던거죠. 저는 해당 필터가 없어도 큰 문제가 되지 않아 바로 없애서 해결해 주었는데, 그림자가 꼭 필요한 경우라면 `png`나 `gif`, `webp`와 같이 알파 채널을 지원하는 이미지 포맷과 함께 적용하는 방법이 유일하지 않을까 싶습니다.

<br />

아래는 최적화 이전 초기 코드 + `filter: drop-shadow()` 스타일 적용 여부에 따른 비교 영상입니다.

<br />

<table>
  <colgroup>
    <col width="50%" />
    <col width="50%" />
  </colgroup>
  <tbody>
    <tr>
      <th>스타일 적용 O</th>
      <th>스타일 적용 X</th>
    </tr>
    <tr>
      <td>
        <video controls muted autoplay width="1528" height="982">
          <source src="/public/docs/projects/portfolio-site/images/scroll-parallax-text-perfomance-issue.mp4" type="video/mp4" />
        </video>
      </td>
      <td>
        <video controls muted autoplay width="1528" height="982">
          <source src="/public/docs/projects/portfolio-site/images/scroll-parallax-text-perfomance-issue-improvement-2.mp4" type="video/mp4" />
        </video>
      </td>
    </tr>
  </tbody>
</table>

<br />
<br />

> **`filter: drop-shadow()` 성능 이슈 관련글 발췌**
>
> - [[Lottie] Drop shadow causes poor performance issue #2856](https://github.com/airbnb/lottie-web/issues/2856)
> - [[GSAP] Performance issues with scrollTrigger and dropshadows.](https://gsap.com/community/forums/topic/35484-performance-issues-with-scrolltrigger-and-dropshadows/)

<br />
<br />

## 후기

생각보다 너무 어처구니 없는 이유였네요. 제가 주로 사용했던 `Adobe PhotoShop` 이나 최근 자주 사용했던 `Figma` 같은 디자인 툴에서는 `Drop Shadow` 효과가 그렇게 큰 성능이 필요하지 않았던 기억이 있어 상상도 못했던 것 같습니다. 오늘도 문제는 다양한 이유로 발생한다는 것을 배우게 되었네요.

<br />

긴 글 읽어주셔서 감사합니다. 😊

<br />
<br />
