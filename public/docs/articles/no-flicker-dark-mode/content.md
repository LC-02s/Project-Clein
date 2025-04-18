> &#128680; 해당 글에 나오는 예제 코드는 [React v18](https://18.react.dev/) 및 [Next.js v15](https://nextjs.org/docs), [Zustand v5](https://zustand-demo.pmnd.rs/), [TailWindCSS v3](https://v3.tailwindcss.com/docs/installation)을 기준으로 작성되었습니다.

<br />
<br />

## 서론

다크 모드 유저라면 위 썸네일 이미지와 같은 상황을 겪어본 적이 있을 것 같습니다. (거의 뭐 섬광탄이죠)

<br />

저는 원래 다크 모드만 사용하다가 요즘에는 상황에 따라 바꾸면서 사용하고 있는데요, `SPA`가 유행하면서 사이트를 새로고침할 일은 잘 없어졌지만 가끔 사이트를 새로고침 하거나 처음 진입할 때 테마가 맞지 않다면 스크립트가 로딩되는 시간동안 테마가 적용되지 않아 깜빡임(flicker)이 발생하는 경우가 있습니다.

<br />

아쉬운 상황이 또 있는데요, 상황에 따라 모드를 바꾸면서 사용하다 보니 한 번의 클릭으로 모든 사이트의 테마가 변경되지 않을 때마다 개발자로써 조금 아쉬운 느낌을 많이 받는 것 같습니다. 물론 각자의 사정이 있었겠지만, 테마 기능을 만들 때 "유저의 입장에서 조금만 더 신경을 썼다면 충분히 괜찮게 만들 수 있었지 않았을까?" 라는 생각이 들기 때문이죠. (사실 저도 그랬었습니다 😅)

<br />

그렇기에 오늘은 과거를 반성할 겸 상황에 따라 완성형 다크 모드 기능을 만드는 예제를 알아보겠습니다.

<br />
<br />

## 요구사항 분석

[서론](#서론)에서 다루었던 내용을 구체적인 요구사항으로 정리해 보면 다음과 같았습니다.

<br />

> **다크 모드 기능 요구사항**
>
> 1. 시스템 테마, 밝은 테마, 어두운 테마 3가지를 지원할 것
> 2. 시스템 테마일 때는 브라우저(OS) 테마가 변경될 때 사이트 테마도 동기화될 것
> 3. 페이지를 새로고침하거나 처음 진입 할 때 설정해둔 테마가 깜빡임(flicker) 없이 자연스럽게 유지될 것

<br />

하나씩 만족시키며 구현해보도록 하겠습니다.

<br />
<br />

## 스타일 세팅

다크 모드를 도입하게 되면 일반적으로는 UI를 만들 때마다 다크 모드를 적용하는 절차를 요하게 됩니다. 유저들이 다크 모드를 사용하며 겪게 되는 UX도 물론 중요하지만 개발하는 입장에서의 DX도 놓치면 안 되기에 스타일 관리 또한 굉장히 중요한 부분이라고 할 수 있습니다.

<br />

해당 글에서는 기본적인 `CSS Variable`을 관리하는 방식을 먼저 다루고 `TailWindCSS`와 함께 사용하는 방식을 다뤄보겠습니다.

<br />
<br />

### CSS Variable

아래와 같이 그레이스케일이라는 CSS 변수를 만들어 각각의 컬러 레벨을 다크 테마와 1 대 1 대응하여 관리하는 방식입니다.

처음 다크 모드 기능을 구현할 때 가장 먼저 구상하고 사용했던 방식입니다.

<br />

```css
body {
  --gray-scale-000: #ffffff;
  --gray-scale-100: #eef1f3;
  --gray-scale-200: #d8dfe3;
  --gray-scale-300: #a9b5bc;
  --gray-scale-400: #94a1a8;
  --gray-scale-500: #727e84;
  --gray-scale-600: #54595b;
  --gray-scale-700: #323539;
  --gray-scale-800: #232629;
  --gray-scale-900: #131517;
}

@media (prefers-color-scheme: dark) {
  body {
    --gray-scale-000: #232629;
    --gray-scale-100: #323539;
    --gray-scale-200: #54595b;
    --gray-scale-300: #54595b;
    --gray-scale-400: #727e84;
    --gray-scale-500: #94a1a8;
    --gray-scale-600: #a9b5bc;
    --gray-scale-700: #d8dfe3;
    --gray-scale-800: #eef1f3;
    --gray-scale-900: #eef1f3;
  }
}
```

<br />

일반적인 CSS in JS 라이브러리를 사용하는 경우에는 아래와 같이 상수 파일을 분리하여 관리할 수 있고, `TailWindCSS`의 경우에는 `tailwind.config.ts` 파일에 아래와 같은 스크립트를 추가해주면 유틸리티 클래스로 사용할 수 있습니다.

<br />

```ts
// colors.ts

export const grayScale000 = 'var(--gray-scale-000)'
export const grayScale100 = 'var(--gray-scale-100)'
export const grayScale200 = 'var(--gray-scale-200)'
export const grayScale300 = 'var(--gray-scale-300)'
export const grayScale400 = 'var(--gray-scale-400)'
export const grayScale500 = 'var(--gray-scale-500)'
export const grayScale600 = 'var(--gray-scale-600)'
export const grayScale700 = 'var(--gray-scale-700)'
export const grayScale800 = 'var(--gray-scale-800)'
export const grayScale900 = 'var(--gray-scale-900)'

// index.ts

export * as colors from './colors'
```

<br />

```ts
// tailwind.config.ts

export default {
  theme: {
    extend: {
      colors: {
        gray: Array.from({ length: 10 }).reduce((scale, _, index) => {
          return Object.assign(scale, { [`${index}00`]: `var(--gray-scale-${index}00)` })
        }, {}),
      },
    },
  },
}
```

<br />

해당 방식의 가장 큰 장점은 컬러 시스템 설계만 잘 한다면 UI 로직을 다룰 때마다 조건부로 스타일을 작성하지 않아도 되며, 거의 모든 CSS 라이브러리 또는 프레임워크에 융화될 수 있다는 점입니다.

<br />

장점이 있다면 단점도 있겠죠. 단점은 이미 소개되었습니다. 앞의 장점에서 다뤘던 **컬러 시스템 설계만 잘 한다면**이라는 전제 조건입니다.

디자인 측면에서의 다크 모드는 생각보다 고려해야할 점이 굉장히 많습니다. 기본적으로는 다크 모드의 컬러는 라이트 모드의 컬러와 1 대 1 로 대응되지 않고, 다크 모드 고유의 UI를 필요로 하는 경우가 많아 설계가 보통 어렵습니다.

<br />

예시로는 어두운 배경에서는 밝은 배경보다 대비가 더 선명하게 느껴지기 때문에 라이트 모드와는 달리 조금 더 섬세한 레이어의 분리가 필요한 경우가 있습니다. 아래 예시의 경우 라이트 모드에서는 흰색으로 통일되었던 배경, 카드, 버튼 컴포넌트의 색상이 다크 모드가 적용되면 각각 다른 색상으로 분리되게 됩니다.

<br />

<img src="/public/docs/articles/no-flicker-dark-mode/assets/theme-compare.png" alt="라이트 모드 다크 모드 UI 비교 예시" width="1800" height="945" />

<br />

이외에도 그림자로 분리했던 레이어를 라인을 활용해서 분리하는 경우와 테마별로 색의 채도를 다르게 적용해야 하는 경우 등 수많은 케이스가 존재하기 때문에 변화하는 요구사항에 대응하려면 변수 간의 레이어를 조정하여 관리할 필요성이 대두됩니다. 아래는 원시 값을 다루는 `primitive` 레이어와 일반적으로 사용할 `semantic` 레이어로 분리하고 일반적인 범주를 벗어나는 UI의 경우에만 따로 커스텀을 하는 접근 방식입니다.

<br />

```css
/* primitive layer */

:root {
  --gray-000: #ffffff;
  --gray-100: #eef1f3;
  --gray-200: #d8dfe3;
  --gray-300: #a9b5bc;
  --gray-400: #94a1a8;
  --gray-500: #727e84;
  --gray-600: #54595b;
  --gray-700: #323539;
  --gray-800: #232629;
  --gray-900: #131517;
}

/* semantic layer */

body {
  --gray-scale-000: var(--gray-000);
  --gray-scale-100: var(--gray-100);
  --gray-scale-200: var(--gray-200);
  --gray-scale-300: var(--gray-300);
  --gray-scale-400: var(--gray-400);
  --gray-scale-500: var(--gray-500);
  --gray-scale-600: var(--gray-600);
  --gray-scale-700: var(--gray-700);
  --gray-scale-800: var(--gray-800);
  --gray-scale-900: var(--gray-900);
}

@media (prefers-color-scheme: dark) {
  body {
    --gray-scale-000: var(--gray-800);
    --gray-scale-100: var(--gray-700);
    --gray-scale-200: var(--gray-600);
    --gray-scale-300: var(--gray-600);
    --gray-scale-400: var(--gray-500);
    --gray-scale-500: var(--gray-400);
    --gray-scale-600: var(--gray-300);
    --gray-scale-700: var(--gray-200);
    --gray-scale-800: var(--gray-100);
    --gray-scale-900: var(--gray-100);
  }
}
```

<br />

```ts
// colors/primitive.ts

export const gray000 = 'var(--gray-000)'
export const gray100 = 'var(--gray-100)'
export const gray200 = 'var(--gray-200)'
export const gray300 = 'var(--gray-300)'
export const gray400 = 'var(--gray-400)'
export const gray500 = 'var(--gray-500)'
export const gray600 = 'var(--gray-600)'
export const gray700 = 'var(--gray-700)'
export const gray800 = 'var(--gray-800)'
export const gray900 = 'var(--gray-900)'

// colors/semantic.ts

export const grayScale000 = 'var(--gray-scale-000)'
export const grayScale100 = 'var(--gray-scale-100)'
export const grayScale200 = 'var(--gray-scale-200)'
export const grayScale300 = 'var(--gray-scale-300)'
export const grayScale400 = 'var(--gray-scale-400)'
export const grayScale500 = 'var(--gray-scale-500)'
export const grayScale600 = 'var(--gray-scale-600)'
export const grayScale700 = 'var(--gray-scale-700)'
export const grayScale800 = 'var(--gray-scale-800)'
export const grayScale900 = 'var(--gray-scale-900)'

// colors/index.ts

export * as primitive from './primitive'
export * as semantic from './semantic'

// index.ts

export * as colors from './colors'
```

<br />

이렇게만 사용하게 되면 브라우저 테마에 귀속되어 유저가 테마를 직접 선택하지는 못하기에 클래스 또는 `HTML`의 `dataset`을 활용하여 테마를 변경하는 예제를 살펴보겠습니다.

<br />

```css
/* primitive layer */

:root {
  --gray-000: #ffffff;
  --gray-100: #eef1f3;
  --gray-200: #d8dfe3;
  --gray-300: #a9b5bc;
  --gray-400: #94a1a8;
  --gray-500: #727e84;
  --gray-600: #54595b;
  --gray-700: #323539;
  --gray-800: #232629;
  --gray-900: #131517;
}

/* semantic layer */

body {
  --gray-scale-000: var(--gray-000);
  --gray-scale-100: var(--gray-100);
  --gray-scale-200: var(--gray-200);
  --gray-scale-300: var(--gray-300);
  --gray-scale-400: var(--gray-400);
  --gray-scale-500: var(--gray-500);
  --gray-scale-600: var(--gray-600);
  --gray-scale-700: var(--gray-700);
  --gray-scale-800: var(--gray-800);
  --gray-scale-900: var(--gray-900);
}

@media (prefers-color-scheme: dark) {
  body {
    --gray-scale-000: var(--gray-800);
    --gray-scale-100: var(--gray-700);
    --gray-scale-200: var(--gray-600);
    --gray-scale-300: var(--gray-600);
    --gray-scale-400: var(--gray-500);
    --gray-scale-500: var(--gray-400);
    --gray-scale-600: var(--gray-300);
    --gray-scale-700: var(--gray-200);
    --gray-scale-800: var(--gray-100);
    --gray-scale-900: var(--gray-100);
  }
}

body.dark,
body[data-theme='dark'] {
  --gray-scale-000: var(--gray-800);
  --gray-scale-100: var(--gray-700);
  --gray-scale-200: var(--gray-600);
  --gray-scale-300: var(--gray-600);
  --gray-scale-400: var(--gray-500);
  --gray-scale-500: var(--gray-400);
  --gray-scale-600: var(--gray-300);
  --gray-scale-700: var(--gray-200);
  --gray-scale-800: var(--gray-100);
  --gray-scale-900: var(--gray-100);
}
```

<br />

위와 같이 컬러 스키마를 정의한 후 테마를 변경할 때마다 그에 맞는 스크립트를 실행해주면됩니다. 컬러 스키마 정의가 중복되는 문제는 [아래](#방법-1-csr-및-ssr-환경-모두-가능--권장)에서 다룰 스크립트를 적용하거나 [CSS 프레임워크](#tailwindcss)를 사용하면 충분히 해결할 수 있습니다.

<br />

```js
// class 사용 스크립트 예시
document.body.classList.add('dark')
document.body.classList.remove('dark')

document.body.classList.toggle('dark', isDarkTheme) // 통합

// dataset 사용 스크립트 예시
document.body.dataset.theme = 'dark'
document.body.dataset.theme = ''
```

<br />
<br />

### TailWindCSS

`TailWindCSS`는 호불호가 많이 갈리는 CSS 프레임워크입니다. 불호이신 분들 중 대부분은 유틸리티 클래스와 문법을 숙지하고 있어야 하는 진입 장벽과 스타일 작성 후에는 가독성이 떨어진다는 점을 이유로 꼽습니다. 저도 초반에는 부트스트랩이 떠올라서 꺼려 했었지만 프로젝트에서 몇 번 접해보고는 생각이 달라졌었습니다. 유틸리티 클래스는 몇 가지 원칙을 기반하여 작성되어 사용하다 보면 모르는 클래스이지만 공식 인텔리 센스를 사용하여 조금만 뒤져봐도 원하는 클래스를 추론할 수 있었고, `tailwind-merge` 와 `class-variance-authority` 등의 라이브러리를 함께 조합하여 사용할 경우 사용성 또한 극대화되어 여타 CSS in JS 라이브러리들과 크게 차이를 느끼지 못한데다 오히려 더 편하게 느껴졌습니다.

<br />

무엇보다 가장 마음에 드는 것은 직접 클래스 작명에 신경을 쓰지 않아도 된다는 점과, 마크업과 스타일을 이동하는 컨텍스트 스위칭이 사라져 생산성을 크게 향상시켜주었다는 점입니다. `eslint-plugin-tailwindcss` 플러그인을 활용한 유틸리티 클래스 순서 자동 정렬과 많은 유틸리티 클래스를 스타일 시트에 모두 포함하지 않고 빌드 타임에 자동으로 사용하는 클래스만 포함시켜주는 것도 무시 못 할 장점입니다.

<br />

잡설이 길었네요. 이어가자면 위의 `CSS Variable` 방식을 사용할 때에는 다크모드를 요하는 스타일을 작성할 때마다 선택자로 `.dark` 클래스를 붙이거나 미디어 쿼리를 사용하는 방식이 일반적입니다. 매번 이렇게 스타일을 작성하려면 DX가 많이 떨어지겠죠. 하지만 `TailWindCSS`를 사용하게 되면 아래와 같은 형식으로 사용할 수 있습니다.

<br />

```css
/* 일반적인 사용 예시 */

span {
  color: var(--gray-500);
}
@media (prefers-color-scheme: dark) {
  span {
    color: var(--gray-400);
  }
}
.dark span {
  color: var(--gray-400);
}
```

<br />

```html
<!-- TailWindCSS 사용 예시 -->

<span class="text-gray-500 dark:text-gray-400">다크 모드</span>
```

<br />

작성해야하는 코드 양이 절대적으로 줄어든 모습입니다. 불필요하게 HTML 파일과 CSS 파일을 왔다갔다 하지 않아도 되죠.

<br />

또한 설정을 통해 실제로 적용되는 선택자를 커스텀 할 수도 있습니다.

<br />

```ts
// tailwind.config.ts

export default {
  darkMode: 'selector', // 클래스 선택자에 따라 결정
  darkMode: ['selector', '[data-theme="dark"]'], // 속성 선택자에 따라 결정
}
```

<br />

위와 같이 설정할 경우 기본적으로는 클래스 선택자 또는 속성 선택자에만 반응하지만 아래와 같이 설정할 경우 스크립트에 의존하지 않고 개인화된 테마를 커버할 수 있습니다.

<br />

```ts
// tailwind.config.ts

export default {
  darkMode: [
    'variant',
    [
      '@media (prefers-color-scheme: dark) { &:not([data-theme="light"], [data-theme="light"] *) }',
      '&:is([data-theme="dark"], [data-theme="dark"] *)',
    ],
  ],
}
```

<br />

```css
/* 빌드 결과물 */

.text-gray-500 {
  --tw-text-opacity: 1;
  color: rgb(113 113 122 / var(--tw-text-opacity, 1));
}
@media (prefers-color-scheme: dark) {
  .dark\:text-gray-400:not([data-theme='light'], [data-theme='light'] *) {
    --tw-text-opacity: 1;
    color: rgb(161 161 170 / var(--tw-text-opacity, 1));
  }
}
.dark\:text-gray-400:is([data-theme='dark'], [data-theme='dark'] *) {
  --tw-text-opacity: 1;
  color: rgb(161 161 170 / var(--tw-text-opacity, 1));
}
```

<br />

`prefers-color-scheme` 미디어 쿼리와 `TailWindCSS`는 하위 브라우저 호환성이 좋지 않기 때문에 만약 브라우저 호환성이 중요한 프로젝트라면 [아래](#방법-1-csr-및-ssr-환경-모두-가능--권장)에서 다룰 스크립트와 함께 클래스 선택자를 활용하여 시스템 테마 지원 여부에 따라 테마를 결정하는 방향이 좋을 듯 합니다.

<br />

\* `TailWindCSS` 3버전은 공식적으로 **최신 안정 버전**의 `Chrome`, `Firefox`, `Edge`, `Safari` 브라우저 지원과 함께 `IE`지원을 하지 않기 때문에 브라우저 호환성이 중요한 프로젝트에서는 좋은 선택이 아닐 수 있습니다.

<br />
<br />

## 상태 관리

지금까지는 [요구사항 1번](#요구사항-분석)을 만족하는 코드를 다뤄보았습니다. 이제 기본적인 상태 관리와 함께 [요구사항 2번](#요구사항-분석)을 만족하는 로직을 작성해 보겠습니다.

<br />
<br />

### 전역 상태 관리 with Zustand

저는 처음 상태 관리를 도입할 때에는 `Redux`를 사용했었습니다. 당시 `Flux` 아키텍처와 `Action Creator`, `Store`, `Reducer`, `Selector` 등의 전반적인 데이터 흐름을 공부하며 이해에 어려움을 겪었었던 기억이 있는데요, 개념이 너무 복잡하기도 했고 보일러플레이트 또한 매우 많아서 그랬었던 것 같습니다. 하지만 `Zustand`를 사용해 보니 다시는 리덕스를 사용하던 시절로 돌아갈 수 없게 되었습니다. `Zustand`를 보며 "동일한 개념에 대한 구현을 이렇게 다르게 할 수 있구나" 와 "추상화는 이런식으로 해야하는구나" 라는 것을 느꼈었던 것 같습니다.

<br />

그렇기에 `Zustand`를 활용하여 테마 상태 관리를 해보겠습니다.

<br />

```ts
// use-theme.model.ts

export const THEME = { AUTO: 'auto', LIGHT: 'light', DARK: 'dark' } as const

export type SystemTheme = (typeof THEME)[keyof typeof THEME] // "auto" | "light" | "dark"

export type Theme = Exclude<SystemTheme, typeof THEME.AUTO> // "light" | "dark"
```

<br />

기본적인 스키마입니다. 실제 적용되는 테마와 시스템에서만 사용되는 개념인 시스템 테마로 나누어 관리합니다.

<br />

```ts
// use-theme.ts

import { create } from 'zustand'

export interface ThemeStore {
  theme: Theme
  setTheme: (theme: Theme) => void
  systemTheme: SystemTheme
  setSystemTheme: (systemTheme: SystemTheme) => void
}

export const useThemeStore = create<ThemeStore>((set) => ({
  theme: THEME.LIGHT,
  setTheme: (theme) => set({ theme }),
  systemTheme: THEME.AUTO,
  setSystemTheme: (systemTheme) => set({ systemTheme }),
}))

export const useSetTheme = () => {
  const setSystemTheme = useThemeStore((store) => store.setSystemTheme)
  const setTheme = useCallback(
    (systemTheme: SystemTheme) => {
      setSystemTheme(systemTheme)

      if (systemTheme === THEME.AUTO) {
        localStorage.removeItem(THEME_STORE_KEY)
        return
      }

      localStorage.setItem(THEME_STORE_KEY, systemTheme)
    },
    [setSystemTheme],
  )

  return setTheme
}
```

<br />

```ts
// use-theme.utils.ts

export const matchDarkThemeMedia = () => window.matchMedia('(prefers-color-scheme: dark)')
```

<br />

```tsx
// use-setting-theme.ts

import { useEffect, useState, useCallback } from 'react'

export const useSettingTheme = () => {
  const [darkThemeMedia] = useState(matchDarkThemeMedia)

  const setSystemTheme = useThemeStore((store) => store.setSystemTheme)
  const systemTheme = useThemeStore((store) => store.systemTheme)
  const isAutoTheme = systemTheme === THEME.AUTO

  const setTheme = useThemeStore((store) => store.setTheme)
  const setThemeWithClassName = useCallback(
    (isDarkTheme: boolean) => {
      document.body.classList.toggle('dark', isDarkTheme)
      setTheme(isDarkTheme ? THEME.DARK : THEME.LIGHT)
    },
    [setTheme],
  )

  useEffect(() => {
    // 테마 기본 값 세팅

    const defaultValue = localStorage.getItem(THEME_STORE_KEY)

    if (defaultValue && Object.values(THEME).includes(defaultValue as SystemTheme)) {
      setSystemTheme(defaultValue as SystemTheme)
    }
  }, [setSystemTheme])

  useEffect(() => {
    // 시스템 테마 변경에 따른 동기화

    setThemeWithClassName(isAutoTheme ? darkThemeMedia.matches : systemTheme === THEME.DARK)
  }, [systemTheme, isAutoTheme, darkThemeMedia, setThemeWithClassName])

  useEffect(() => {
    // 시스템 테마일 경우 브라우저(OS) 테마 감지 후 동기화

    const handleChange = (event: MediaQueryListEvent) => {
      if (isAutoTheme) setThemeWithClassName(event.matches)
    }

    darkThemeMedia.addEventListener('change', handleChange)

    return () => {
      darkThemeMedia.removeEventListener('change', handleChange)
    }
  }, [darkThemeMedia, isAutoTheme, setThemeWithClassName])
}
```

<br />

[요구사항 2번](#요구사항-분석)까지 만족하는 상태 관리 로직입니다. 최상위 컴포넌트에 `useSettingTheme` 훅을 호출하여 사용합니다. 해당 코드는 리액트의 철학도 어느 정도 반영되었고 나름 잘 동작하지만 이 방식에는 문제가 있습니다. [서론](#서론)에서 다루었던 깜빡임(flicker) 문제죠. 해당 스크립트가 로딩될 때 까지 유저는 자신이 설정한 테마와 맞지 않는 화면을 보게됩니다. 어떻게 하면 초기 로딩 없이 상태를 유지할 수 있을까요?

<br />
<br />

## 상태의 유지 (Advanced)

이제 [요구사항 3번](#요구사항-분석)만이 남았습니다. 핵심은 유저에게 있는 특정한 데이터를 화면을 로드하기 전에 불러오는 것입니다.

<br />
<br />

### 방법 1 (CSR 및 SSR 환경 모두 가능 / 권장)

첫 번째 방법은 `body` 태그의 첫 번째 자식 요소로 동기식 `script` 태그를 넣어주어 페이지가 로드되기 시작하자마자 테마 조회 로직을 실행시켜주는 것입니다. 해당 방식의 장점은 특정한 환경에 구애받지 않으며, 별도로 서버의 자원이 필요하지 않다는 점과 하위 브라우저 호환성이 좋다는 점이 있습니다. 혹시나 다른 스코프에 영향을 줄 수 있기 때문에 즉시 실행 함수로 감싸주었습니다.

<br />

```html
<!-- index.html -->

<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>테마 조회 로직 예시</title>
  </head>
  <body>
    <script>
      ;(function () {
        try {
          const value = localStorage.getItem('theme') || 'auto'
          const currentTheme = ['auto', 'light', 'dark'].includes(value) ? value : 'auto'

          if (currentTheme === 'dark') {
            document.body.classList.add('dark')
            return
          }

          if (
            currentTheme === 'auto' &&
            window.matchMedia('(prefers-color-scheme: dark)').matches
          ) {
            document.body.classList.add('dark')
            return
          }
        } catch (e) {
          console.error(e)
        }
      })()
    </script>
    <main><!-- 페이지 시작점 --></main>
  </body>
</html>
```

<br />
<br />

Next.js 에서는 아래와 같이 사용할 수 있습니다. 마크업을 렌더링한 후 스크립트를 적용하는 하이드레이션 과정에서 렌더링한 마크업과 적용된 마크업이 다를 경우 하이드레이션 에러를 내게 됩니다. 해당 문제는 의도된 동작으로 볼 수 있기 때문에 `body` 태그에 `suppressHydrationWarning` 옵션을 주어 해결할 수 있습니다.

<br />

```tsx
// theme-schema-script.tsx

export const ThemeSchemaScript: React.FC = () => (
  <script
    dangerouslySetInnerHTML={{
      __html: `
      ;(function () {
        try {
          const value = localStorage.getItem('theme') || 'auto'
          const currentTheme = ['auto', 'light', 'dark'].includes(value) ? value : 'auto'

          if (currentTheme === 'dark') {
            document.body.classList.add('dark')
            return
          }

          if (
            currentTheme === 'auto' &&
            window.matchMedia('(prefers-color-scheme: dark)').matches
          ) {
            document.body.classList.add('dark')
            return
          }
        } catch (e) {
          console.error(e)
        }
      })()
    `,
    }}
  />
)
```

<br />

```tsx
// app/layout.tsx

const RootLayout: React.FC<React.PropsWithChildren> = ({ children }) => (
  <html lang="ko">
    <body className="bg-white dark:bg-gray-800" suppressHydrationWarning>
      <ThemeSchemaScript />
      {children}
    </body>
  </html>
)

export default RootLayout
```

<br />
<br />

### 방법 2 (Only SSR / Next.js)

2번째 방법은 쿠키를 사용하는 것입니다. 설정한 테마를 쿠키 스토어에 저장해두고 SSR 시점에 해당 쿠키를 `HTML`에 포함시켜주는 것이죠. 보안이 중요하다면 Next.js의 `Route Handler` 또는 `Server Action`을 사용하겠지만 테마 정보는 빈번하게 변경될 수 있고 치명적인 보안 위협이 되는 정보는 아니기에 `js-cookie` 라이브러리를 활용하여 클라이언트 사이드에서 관리해주었습니다.

<br />

```bash
pnpm add js-cookie
```

<br />

```ts
import Cookies from 'js-cookie'

export const useSetTheme = () => {
  const setSystemTheme = useThemeStore((store) => store.setSystemTheme)
  const setTheme = useCallback(
    (systemTheme: SystemTheme) => {
      setSystemTheme(systemTheme)

      if (systemTheme === THEME.AUTO) {
        // localStorage.removeItem(THEME_STORE_KEY)
        Cookies.remove(THEME_STORE_KEY)
        return
      }

      // localStorage.setItem(THEME_STORE_KEY, systemTheme)
      Cookies.set(THEME_STORE_KEY, systemTheme)
    },
    [setSystemTheme],
  )

  return setTheme
}
```

<br />

패키지 설치 후 `localStorage` 부분을 대체해줍니다.

<br />

이번 방식은 서버에서 부터 직접적으로 상태를 내려줄 수 있기에 `body` 태그를 활용한 `Provider`를 적용해주었습니다. 간단한 유효성 검사 후 `props`로 전달해주며, 동기화 해주는 로직이 상태로 통합되었습니다. (해당 방식은 상태로 `HTML` 태그에 값을 전달하기 때문에 `suppressHydrationWarning` 옵션이 필요하지 않습니다)

<br />

```tsx
// theme-provider.tsx

'use client'

export const useThemeProvider = (
  defaultValue: string = THEME.AUTO,
): Pick<ThemeStore, 'systemTheme'> => {
  const defaultTheme = Object.values(THEME).includes(defaultValue as SystemTheme)
    ? (defaultValue as SystemTheme)
    : THEME.AUTO

  const [darkThemeMedia, setMedia] = useState<MediaQueryList | null>(null)

  const setTheme = useThemeStore((store) => store.setTheme)
  const setSystemTheme = useThemeStore((store) => store.setSystemTheme)

  const systemTheme = useThemeStore((store) => store.systemTheme)
  const isAutoTheme = systemTheme === THEME.AUTO

  useIsomorphicLayoutEffect(() => {
    // 기본값 및 미디어쿼리 세팅

    setMedia(matchDarkThemeMedia)
    setSystemTheme(defaultTheme)
  }, [defaultTheme])

  useEffect(() => {
    // 시스템 테마 변경에 따른 동기화

    if (isAutoTheme) {
      setTheme(darkThemeMedia.matches ? THEME.DARK : THEME.LIGHT)
    } else {
      setTheme(systemTheme)
    }
  }, [systemTheme, isAutoTheme, darkThemeMedia, setThemeWithClassName])

  useEffect(() => {
    // 시스템 테마일 경우 브라우저(OS) 테마 감지 후 동기화

    const handleChange = (event: MediaQueryListEvent) => {
      if (isAutoTheme) setTheme(event.matches ? THEME.DARK : THEME.LIGHT)
    }

    darkThemeMedia?.addEventListener('change', handleChange)

    return () => {
      darkThemeMedia?.removeEventListener('change', handleChange)
    }
  }, [darkThemeMedia, isAutoTheme, setTheme])

  // Hydration이 되지 않은 상태일 경우 기본값 사용
  return { systemTheme: !darkThemeMedia ? defaultTheme : systemTheme }
}

export interface ThemeProviderProps
  extends Omit<React.JSX.IntrinsicElements['body'], 'defaultValue'> {
  defaultValue?: string
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  defaultValue,
  children,
  ...props
}) => {
  const { systemTheme } = useThemeProvider(defaultValue)

  return (
    <body {...props} data-theme={systemTheme}>
      {children}
    </body>
  )
}
```

<br />

Next.js의 `cookies` API를 통해 `ThemeProvider`에 초기 값을 전달해줍니다.

<br />

```tsx
// app/layout.tsx

import { cookies } from 'next/headers'

const RootLayout: React.FC<React.PropsWithChildren> = async ({ children }) => {
  const cookieStore = await cookies()
  const theme = cookieStore.get(THEME_STORE_KEY)

  return (
    <html lang="ko">
      <ThemeProvider
        className="bg-white text-gray-800 antialiased dark:bg-gray-900 dark:text-gray-50"
        defaultValue={theme?.value}
      >
        {children}
      </ThemeProvider>
    </html>
  )
}

export default RootLayout
```

<br />

해당 방식은 [GitHub 사이트](https://github.com/)의 테마 UX가 마음에 들어 어떻게 테마를 관리하는지 궁금해서 이것저것 뒤져보다가 쿠키를 통해 관리하는 것을 본 후 착안하여 적용해본 방식입니다. GitHub은 다양한 테마를 지원하기 때문에 서버에서 관리하는 것이 적합하다고 생각되지만 단순히 라이트, 다크 모드만 지원한다면 저는 [방법 1](#방법-1-csr-및-ssr-환경-모두-가능--권장)이 리소스를 덜 써도 되기에 조금 더 적합하다고 생각하였습니다.

<br />
<br />

## 후기

처음에는 큰 생각없이 구현했던 기능이어서 짧게 작성하려고 했었는데, 글을 쓰면서 다시 공부해보니 브라우저의 동작 원리나 스타일 관리 방법론 등 관련된 방대한 개념을 접하게 되어 조금 더 녹여내고 싶은 욕심에 생각보다 글이 길어진 것 같습니다.

<br />

긴 글 읽어주셔서 감사합니다. 😊
