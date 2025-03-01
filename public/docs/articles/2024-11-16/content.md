> &#128680; 해당 글에 나오는 예제 코드는 [React v18](https://18.react.dev/) 및 [Vite v5](https://v5.vite.dev/), [Emotion v11](https://emotion.sh/docs/introduction)을 기준으로 작성되었습니다.

<br />

> &#128226; 바쁘신 분들은 [개발환경 구축 과정](#개발환경-구축-과정)부터 보시는 것을 추천드립니다.

<br />
<br />

## 개발하게 된 배경

어쩌다보니 취준생 대상 밋업 행사 [Synergy Meet 2024](https://synergy-meet-2024.vercel.app/)의 랜딩페이지 제작을 담당하게 되었습니다.

<br />

당시 행사 시작까지 약 1달 정도 남아있었고 페이지 오픈까지의 여유 기간은 1주 정도였습니다.

<br />

상황을 정리해보면 행사를 소개하고 참가자를 모집하는 목적의 랜딩페이지를 최대한 빠른 시일내로 만들어야 했었고,

이번 기회에 평소 관심이 있었던 인터랙티브 웹 또한 구현해보고 싶었기 때문에 `React`와 `Vite`, `Emotion`의 조합을 선택하게 되었습니다.

<br />
<br />

### 왜 SSG(Static Site Generation) 방식을 차용해야 하는가?

보통의 랜딩페이지들은 대부분 간단한 정보 전달을 목적으로 하는 정적 페이지입니다.

생 `HTML`+`CSS`의 조합에 간단한 `jQuery` 정도로 구성해도 충분하죠.

신경써야할 부분이 있다면 검색 엔진 최적화 정도이지만 정적인 데이터를 다루기 때문에 미리 생성해두면 되는 부분입니다.

<br />

만약 위의 조합으로 개발한다면 따로 빌드를 하지 않아도 되기 때문에 자동으로 `SSG`를 적용한 상태가 됩니다.

개발환경을 따로 구축하지 않아도 돼서 오히려 더 편할 수도 있죠.

`Netlify`, `Vercel`, `AWS S3`과 같은 배포 플랫폼들은 폴더 기반의 라우팅을 지원하기 때문에 배포 또한 쉽습니다.

<br />

그런데 퍼블리셔 시절 `HTML`+`CSS`+`jQuery` 조합을 주로 사용하다 최근 `React`기반의 `SPA`환경으로 개발하고 있는 저의 입장에서는 조금 아쉬운 선택이었습니다.

아무리 간단한 정적 페이지 라고 하지만 그 안에서도 분명 반복되는 컴포넌트들이 존재할뿐더러, 위의 조합을 선택하게 된다면 다시 명령형으로 `UI`를 개발해야하기 때문이었죠. `React`의 좋은 개발 경험을 포기할 만큼 편하다고는 생각되지 않았습니다.

<br />

그렇기에 선택지가 `React`로 좁혀졌습니다. `React`는 메타 프레임워크 없이 그냥 사용한다면 기본적으로 `CSR`방식으로 동작하게 됩니다.

물론 요즘 구글의 크롤링 봇은 `JS` 실행 결과까지 파싱을 해줘서 `SEO`에 지장이 없을 수도 있습니다.

하지만 클라이언트 측에서 스크립트를 로딩하는 시점에 모든 마크업과 스타일을 렌더링을 해야하기 때문에 레이아웃 쉬프트 현상이 발생하는 등의 페이지 진입 초기에 대한 유저 경험이 좋지 않을 것으로 판단했습니다. 렌더링이 끝날 때까지 로딩화면을 띄워 둘 수도 있겠지만 그 역시 없앨 수 있다면 없애는 것이 유저 경험에 더 좋을 것이라고 생각했습니다.

<br />

### Next.js 같은 리액트 메타 프레임워크를 사용해도 되지 않았나?

`Next.js`에서는 `Static Route`에 자동으로 `SSG` 빌드를 제공해주기도 하고 숙련도 또한 조금 있었던 상태였기 때문에 `Next.js`를 사용했어도 좋았을 것 같습니다.

<br />

하지만 당시에는 어트랙션 서비스를 개발하며 `Next.js`의 하이드레이션 에러에 많이 당해서 `Next.js`에 대한 개발 경험이 좋지 않은 상태였었고,

결론적으로 `Vite`에서도 `SSR`예제를 제공하는 것을 확인했었기에 사전 렌더링 또한 가능할 것 같아 `React`와 `Vite`의 조합을 선택하게 되었습니다.

<br />

배포 플랫폼을 사용하면 무료로 운영할 수 있어 큰 문제는 되지 않았지만 정적 페이지 하나 서빙하는데 굳이 서버까지 돌려야 하는가라는 생각도 있었긴 했습니다.

<br />

### 왜 하필이면 Emotion을 사용했나?

당시에는 `TailWindCSS`와 `Styled Components`를 사용해본 상태였고, `SCSS`또한 경험해봤었던 상태였습니다.

<br />

개인적인 경험으로 `module CSS` 나 `SCSS` 같은 경우에는 스크립트를 함께 사용하기에 조금 아쉬운 느낌이 없지 않아 있었고, `Styled Components`의 경우에는 매번 스타일만을 위한 컴포넌트의 이름을 짓는 것이 번거로운 데다 `SSR` 환경설정이 복잡해 보였습니다. (`CSR` 환경에서만 사용해 봤었습니다.)

<br />

또한 당시에는 좋지 않은 방법으로 `TailWindCSS`를 사용했었기에 `TailWindCSS`의 개발 경험이 좋지 않았던 상태였어서, 익숙했던 `SCSS` 문법과 `SSR` 환경설정이 편한 데다 인라인 스타일 방식을 활용할 수 있는 `Emotion`으로 선택하게 되었습니다.

<br />
<br />

## 개발환경 구축 과정

잡설이 길었네요. 바로 시작해보겠습니다.

<br />
<br />

### Vite 및 React 설치

먼저 `Vite`와 함께 `React`를 설치해줍니다. 저는 패키지 매니저로 `pnpm`을 사용하였습니다.

(~~자랑스러운 한국인이 만든 SWC 컴파일러를 사용합시다.~~)

<br />

```text
pnpm create vite .

✔ Select a framework: › React
✔ Select a variant: › TypeScript + SWC

pnpm install
```

<br />

```text
src/
├── App.css
├── App.tsx
├── index.css
├── main.tsx
└── vite-env.d.ts
index.html
package.json
tsconfig.app.json
tsconfig.json
tsconfig.node.json
vite.config.ts
```

<br />

설치를 완료했다면 위와 같은 폴더 트리가 생성됩니다.

저희는 `SSG` 빌드 이전에 `SSR` 환경을 구축해야하기 때문에 [Vite React SSR 예제](https://github.com/vitejs/vite-plugin-react/tree/main/playground/ssr-react)를 참고하여 추가적인 세팅을 해줘야 합니다.

<br />
<br />

### Express.js를 활용한 개발서버 세팅

개발서버를 띄우는데 사용할 `Express.js`를 설치해줍니다.

<br />

```text
pnpm add -D express
```

<br />

설치가 완료되었다면 `Vite`의 공식문서와 예제코드를 참고하여 개발서버를 띄우는 `Node.js` 스크립트를 작성해줍니다.

기존 예제에서는 프로덕션을 커버하는 코드가 포함되어 있지만 저희는 `SSR`이 아닌 사전 렌더링이 목표이기 때문에 과감하게 생략하였습니다.

<br />

```js
// server.js

import fs from 'node:fs/promises'
import express from 'express'

// Constants
const port = process.env.PORT || 5173
const base = process.env.BASE || '/'

// Create http server
const app = express()

// Add Vite or respective production middlewares
const { createServer } = await import('vite')
const vite = await createServer({
  server: { middlewareMode: true },
  appType: 'custom',
  base,
})

const baseTemplate = await fs.readFile('./index.html', 'utf-8')
const { render } = await vite.ssrLoadModule('/src/entry-server.tsx')

app.use(vite.middlewares)

// Serve HTML
app.use('*', async (req, res) => {
  try {
    const url = req.originalUrl.replace(base, '')
    const template = await vite.transformIndexHtml(url, baseTemplate)

    const rendered = await render(url)
    const html = template
      .replace(`<!--app-head-->`, rendered.head ?? '')
      .replace(`<!--app-html-->`, rendered.html ?? '')

    res.status(200).set({ 'Content-Type': 'text/html' }).send(html)
  } catch (e) {
    vite?.ssrFixStacktrace(e)
    console.log(e.stack)
    res.status(500).end(e.stack)
  }
})

// Start http server
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`)
})
```

<br />

미리 작성된 `HTML` 템플릿과 `/src/entry-server.tsx`를 불러와서 렌더링한 후 `HTML`파일로 클라이언트에 제공하는 코드입니다.

<br />

해당 예제에서는 특정한 주석을 통해 `Head`태그와 `Body` 태그를 구별합니다.

`index.html` 파일에도 아래와 같이 적용해줍니다.

<br />

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite React SSG 예제</title>
    <!--app-head-->
  </head>
  <body>
    <div id="root"><!--app-html--></div>
    <script type="module" src="/src/entry-client.tsx"></script>
  </body>
</html>
```

<br />

마지막으로 `package.json`에 `dev` 스크립트를 추가해주면 끝입니다.

<br />

```json
{
  "scripts": {
    "dev": "node server"
  }
}
```

<br />
<br />

> 원래는 예제코드에 제가 참고했었던 `server.js` 코드 원본이 포함되어 있었지만 글을 수정하는 현재 시점(2024-12-30)기준 삭제되어서 [관련 PR링크](https://github.com/vitejs/vite-plugin-react/pull/397/files)로 대체하겠습니다. 살펴보니 `vite.config.ts`에 모두 통합되었네요.

<br />
<br />

### Server Side Rendering 및 Hydration 과정

위의 `server.js` 예제코드에서 보셨듯이 저희는 `src/main.tsx` 코드를 목적에 따라 2가지로 분리해줘야합니다.

<br />

```tsx
// src/entry-server.tsx

import { renderToString } from 'react-dom/server'
import { App } from '@/app'

export function render() {
  const html = renderToString(<App />)

  return { html }
}
```

<br />

`src/entry-server.ts`에서는 `react-dom/server`패키지의 `renderToString` API를 활용하여 인터페이스에 맞게 `App`컴포넌트를 정적 `HTML`파일로 생성해줍니다.

<br />

```tsx
// src/entry-client.tsx

import { hydrateRoot } from 'react-dom/client'
import { App } from '@/app'

hydrateRoot(document.getElementById('root')!, <App />)
```

<br />

`src/entry-client.ts`에서는 `react-dom/client`패키지의 `hydrateRoot` API를 활용하여 `src/entry-server.ts`에서 생성한 마크업에 하이드레이션 과정을 입혀줍니다.

<br />

여기까지의 과정 중에서 살짝 주의할 점은 `src/entry-server.ts`에서 생성한 마크업과 `src/entry-client.ts`에서 진행한 하이드레이션 과정 사이의 불일치가 있다면 하이드레이션 에러가 발생하기 때문에 가능하면 `App` 컴포넌트에 모든 로직을 통합시켜 주는 것이 좋습니다.

<br />
<br />

> &#128226; `Emotion`을 사용하지 않으실 분들은 [Pre Renderer 세팅](#pre-renderer-세팅)부터 보시는 것을 추천드립니다.

<br />
<br />

### Emotion Server 세팅

필요한 `Emotion` 패키지 설치 부터 해보겠습니다.

<br />

```text
pnpm add @emotion/react @emotion/cache @emotion/server
```

<br />

설치를 마쳤다면 `Emotion`의 공식 문서에 나오는 내용을 따라 세팅을 진행해줍니다.

<br />

`tsconfig.app.json`와 `vite.config.ts`에 아래와 같이 컴파일러 옵션을 설정해줍니다.

(기본적으로 `css props`를 사용하는 옵션입니다.)

<br />

```json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "@emotion/react"
  }
}
```

<br />

```ts
// vite.config.ts

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react({ jsxImportSource: '@emotion/react' })],
})
```

<br />

설정을 마쳤다면, `App` 컴포넌트를 `Cache Provider`로 감싸줍니다.

<br />

```tsx
// src/app/App.tsx

import { StrictMode } from 'react'
import type { EmotionCache } from '@emotion/cache'
import { CacheProvider, Global } from '@emotion/react'
import { globalStyle } from './App.style'

interface ApplicationProps {
  cache: EmotionCache
}

export default function App({ cache }: ApplicationProps) {
  return (
    <StrictMode>
      <CacheProvider value={cache}>
        <Global styles={globalStyle} />
      </CacheProvider>
    </StrictMode>
  )
}
```

<br />

`EmotionCache`는 `App` 컴포넌트 외부에서 환경에 따라 주입을 받아야하기 때문에 `src/entry-client.tsx`와 `src/entry-server.tsx`에 추가적인 설정을 해주면 끝입니다.

<br />

```tsx
// src/entry-client.tsx

import { hydrateRoot } from 'react-dom/client'
import createCache from '@emotion/cache'
import { App } from '@/app'

const mainEl = document.getElementById('root')!
const cache = createCache({ key: EMOTION_PREFIX })

hydrateRoot(mainEl, <App cache={cache} />)
```

<br />

위 코드에서 `EMOTION_PREFIX`로 설정한 `key`는 클라이언트와 서버에 같은 임의의 문자열을 넣어주면 됩니다.

설정한 `key`가 `Emotion`이 생성해주는 클래스명의 접두사로 붙습니다.

저는 프로젝트의 약자를 따서 `sm-` 으로 했습니다.

<br />

ex) `1wwzq5u` -> `sm--1wwzq5u`

<br />

```tsx
// src/entry-server.tsx

import { renderToString } from 'react-dom/server'
import createEmotionServer from '@emotion/server/create-instance'
import createCache from '@emotion/cache'
import { App } from '@/app'

export function render() {
  const cache = createCache({ key: EMOTION_PREFIX })
  const { extractCriticalToChunks, constructStyleTagsFromChunks } = createEmotionServer(cache)
  const html = renderToString(<App cache={cache} />)
  const head = constructStyleTagsFromChunks(extractCriticalToChunks(html))

  return { html, head }
}
```

<br />

위 코드에서 추출한 `Emotion`의 스타일들은 `Head` 태그에 들어가게 됩니다.

왜 굳이 `Head` 태그에 넣냐는 질문을 하실 수도 있는데 분리하지 않아도 돌아가기는 합니다.

분리하지 않으면 `Emotion`에서 각 컴포넌트의 형제요소로 `style`태그를 추가한 후 하이드레이션 과정에서 다시 `Head` 태그로 넣어줍니다.

신기하게 하이드레이션 에러도 나지 않더군요.

<br />
<br />

### Pre Renderer 세팅

이제 정말 마지막 단계입니다.

<br />

지금까지 저희는 `Vite`와 `React`, `Emotion`을 활용한 **서버 사이드 렌더링** 예제코드를 만들었습니다.

남은 건 정말 쉬운데 서버에서 `HTML`을 만들어서 보내주듯이 지금껏 해왔던 것처럼 빌드 할 때 똑같이 렌더링 시켜주면 끝입니다.

<br />

```js
// pre-render.js

import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const startedAt = Date.now()
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const toAbsolute = (p) => path.resolve(__dirname, p)

const indexPath = toAbsolute('dist/index.html')
const template = await fs.readFile(indexPath, 'utf-8')

const { render } = await import('./dist/server/entry-server.js')
const rendered = render()

const html = template
  .replace(`<!--app-head-->`, rendered.head ?? '')
  .replace(`<!--app-html-->`, rendered.html ?? '')

await Promise.all([
  fs.writeFile(indexPath, html),
  fs.rm(toAbsolute('dist/server'), { recursive: true, force: true }),
])

console.log('\n' + `✓ pre render in ${Date.now() - startedAt}ms`)
```

<br />

사전 렌더링 스크립트 입니다.

`Vite`를 통해 미리 빌드해 둔 `index.html` 템플릿과 `entry-server.js`를 기반으로 위에서 추가한 `server.js`와 동일하게 렌더링을 수행하게됩니다.

`entry-server.js`는 빌드 시점에만 사용하고 클라이언트에서는 사용되지 않기에 빌드가 끝난 후 삭제처리 해주었습니다.

심심해서 빌드 속도 측정 코드도 추가하였습니다.

<br />

참고로 현재 코드에서는 라우팅을 배제하였습니다.

만약 라우팅이 필요하다면 따로 `pages` 폴더와 `href props`를 만들어 관리할 수도 있지만 크게 추천하지는 않습니다.

(라우팅이 필요하다면 메타 프레임워크를 사용하는 것이 맞다고 생각됩니다.)

<br />
<br />

> 원래는 예제코드에 제가 참고했었던 `pre-render.js` 코드 원본이 포함되어 있었지만 글을 수정하는 현재 시점(2024-12-30)기준 삭제되어서 [관련 PR링크](https://github.com/vitejs/vite-plugin-react/pull/397/files)로 대체하겠습니다.

<br />
<br />

```json
{
  "scripts": {
    "build": "pnpm build:client && pnpm build:server && node pre-render",
    "build:client": "tsc -b && vite build --outDir dist",
    "build:server": "tsc -b && vite build --ssr src/entry-server.tsx --outDir dist/server"
  }
}
```

<br />

마지막으로 순서에 신경쓰며 빌드 커맨드를 추가해줍니다.

<br />
<br />

이제 추가한 빌드 커맨드를 실행시켜주면 아래와 같이 훌륭한 결과물을 얻을 수 있습니다.

사전 렌더링이 끝나기까지 약 1.3 ~ 1.4초 정도가 소요되네요.

<br />

```text
pnpm build

> synergy-meet-2024@0.0.0 build /Users/synergy-meet-2024
> pnpm build:client && pnpm build:server && node pre-render

> synergy-meet-2024@0.0.0 build:client /Users/synergy-meet-2024
> vite build --outDir dist

vite v5.4.5 building for production...
✓ 555 modules transformed.
dist/index.html                   1.37 kB │ gzip:   0.56 kB
dist/assets/index-Be9b3THL.css    6.39 kB │ gzip:   2.85 kB
dist/assets/index-C7t9bpzN.js   430.71 kB │ gzip: 136.80 kB
✓ built in 967ms

> synergy-meet-2024@0.0.0 build:server /Users/synergy-meet-2024
> vite build --ssr src/entry-server.tsx --outDir dist/server

vite v5.4.5 building SSR bundle for production...
✓ 127 modules transformed.
dist/server/entry-server.js  96.91 kB
✓ built in 235ms

✓ pre render in 163ms
```

<br />
<br />

아래는 빌드 결과에 대한 이미지입니다.

<br />

<img src="/public/docs/articles/2024-11-16/images/build-result-1.jpg" alt="SSG 빌드 결과 1" width="1458" height="795" />

<br />

<img src="/public/docs/articles/2024-11-16/images/build-result-2.jpg" alt="SSG 빌드 결과 2" width="1467" height="692" />

<br />
<br />

## 후기

죄송합니다. 글이 생각보다 너무 길어졌네요.

<br />

해당 행사는 아쉽게도 기획 단계에서 스폰서와의 협의에 실패하여 무산된 채로 웹페이지만 남겨지게 되었습니다. &#128514;

열심히 만든 웹사이트가 쓸모가 없어져 아쉽긴 하지만 리액트 기반의 인터랙티브 웹도 시도를 해봤고, `SSG` 빌드 파이프라인도 직접 구축해볼 수 있어서 나름 값진 경험이었던 것 같습니다.

<br />

(~~만약 다음에 이런 기회가 또 생긴다면 템플릿 그대로 돌려 써도 되고요~~)

<br />

긴 글 읽어주셔서 감사합니다. :)
