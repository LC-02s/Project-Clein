> &#128680; 해당 글에 나오는 예제 코드는 [Next.js v14](https://nextjs.org/docs/14) 및 [React v18](https://18.react.dev/)을 기준으로 작성되었습니다.

<br />

> &#128226; 어트랙션 프로젝트에 대한 소개글은 <a href="/projects/attraction" title="어트랙션 프로젝트 소개글">여기</a>에서 보실 수 있습니다.

<br />
<br />

## 구현 목표

저희는 실제로 서비스를 운영하는 것이 목표였기 때문에 유저 인증 관련 로직들에서는 보안이 매우 중요했고, 그에 따라 요구사항은 다음과 같았습니다.

<br />

> **요구사항**
>
> 1. 인증 관련 로직을 클라이언트에서 처리하지 않을 것
> 2. 클라이언트에서 스크립트로 접근할 수 있는 곳에 개인정보를 남기지 않을 것 <br />ex) 로컬 스토리지, 세션 스토리지, 쿼리 파라미터, 쿠키 등
> 3. 로그인 후 새로고침을 해도 일정 시간 동안은 로그인 상태가 풀리지 않을 것
> 4. 구글에서 지원하는 `OAuth`프로토콜을 사용할 것
> 5. `Next.js`환경에서의 서버 컴포넌트에서도 대응 가능해야 할 것

<br />
<br />

### 왜 브라우저에 개인정보를 저장하면 안될까?

`Redux`또는 `Zustand`같은 전역상태관리 라이브러리에서는 전역 상태의 유지를 위해 미들웨어의 형태로 `Persist`를 지원하는데요, 리액트 개발자라면 로그인을 구현할 때 `Persist`를 고려해본 적이 있을 것 같습니다.

<br />

꼭 `Persist`가 아니더라도 로컬스토리지 같은 곳에 유저 정보를 저장해놓고 쓰면 편리한데 왜 저장하지 말라고 하는 걸까요?

<br />

조금 진부한 대답이지만 역시나 `XSS`류의 공격을 대비하기 위함입니다

<br />
<br />

\* **XSS (교차 사이트 스크립팅)** : 클라이언트에서 악성 스크립트를 삽입 및 실행하여 사용자의 개인정보를 탈취하거나 추가적으로 연계하는 공격 방식

<br />
<br />

<img src="/public/docs/articles/secure-login-in-nextjs/assets/xss-example.png" alt="XSS 공격 예시" width="1280" height="430" />

<br />

리액트에서는 기본적으로 `innerHTML`을 막아두었기 때문에 위와 같이 단순한 공격 패턴은 먹히지 않겠지만, 만약 취약점이 발견되었을 경우 스크립트로 접근할 수 있는 모든 정보는 탈취될 수 있다고 생각해야합니다.

<br />

만약 스크립트로 접근할 수 있는 곳에 유저의 개인정보가 포함되어 있다면 보안 취약점이 발생했을 때 공격자에게 무방비로 유저들의 개인정보를 내어줄 수 밖에 없겠죠?

<br />

프론트엔드 개발자로써 할 수 있는 최선은 브라우저에서 취약점이 발생할 수 있는 코드를 최소화하고, 유저와 관련된 민감한 정보를 다룰 때는 최대한 서버에 위임하는 것입니다.

서버는 비교적 클라이언트 보다 보안 위협이 적기 때문이죠.

<br />

클라이언트에서 가장 보안수준이 높은 저장방식은 인메모리(변수)에 값을 저장하는 것입니다.

하지만 단독으로 사용하면 새로고침할 때 마다 휘발되기 때문에 유저 경험에 큰 차질이 생기죠.

<br />

그렇다고 스크립트로 접근할 수 있는 로컬스토리지, 세션스토리지, 쿠키 등에 유저 정보를 저장하기에는 `XSS`류의 공격에 취약할 수 있습니다.

<br />

그럼 어떻게 구현해야 할까요?

<br />
<br />

## 그래서 어떻게 구현했나?

<img src="/public/docs/articles/secure-login-in-nextjs/assets/login-flow.png" alt="로그인 플로우 차트" width="1280" height="586" />

<br />

결론적으로 저희는 `API Route`에 `HttpOnly`와 `SameSite`및 `Secure`옵션을 적용한 쿠키 방식을 채택하였고, 서버 컴포넌트용 훅을 만들어 서버 컴포넌트에서부터 유저 정보를 받아와서 상태를 관리하였습니다.

<br />

또한 `Rewrite`라는 `Next.js`의 프록시 기능을 활용하여 클라이언트의 모든 요청에 세션아이디를 포함한 쿠키가 담길 수 있도록 설계하였습니다.

<br />

### 쿠키도 위험한거 아니었나?

브라우저에서 기본적으로 작동되는 쿠키는 사실 `XSS`공격에 취약하지만 특정 옵션을 통해 취약점들을 최대한 보완할 수 있습니다.

<br />

> **적용한 옵션들**
>
> - `HttpOnly`: 적용 시 자바스크립트 코드 상에서 접근이 불가능해지며, HTTP 요청에만 포함됩니다.
> - `SameSite`: `none`, `strict`, `lax`등의 옵션이 있습니다.
>   - `None`: 특별한 설정을 하지 않는 옵션입니다.
>   - `Strict`: 크로스 사이트 요청에는 항상 전송되지 않습니다.
>   - `Lax`: 크로스 사이트 요청 중 안전한 요청에만 전송됩니다.
> - `Secure`: HTTPS가 아닌 통신에서는 쿠키를 전송하지 않습니다.

<br />

<img src="/public/docs/articles/secure-login-in-nextjs/assets/cookie-options.png" alt="적용한 쿠키 옵션 예시" width="1280" height="94" />

<br />

\* `SameSite`옵션을 `Strict`로 설정하게 되면 리다이렉트 요청시에는 쿠키가 실리지 않아 후에 `Lax`옵션으로 변경하였습니다.

<br />
<br />

### 쿠키를 어떻게 생성할까?

`OAuth`방식의 로그인을 구현할 때는 보통 특정한 `callback_url`을 설정하고 로그인이 성공했을 경우 `code`를 포함한 쿼리 파라미터와 함께 `callback_url`로 요청을 보내줍니다.

`Next.js`를 사용한다면 아래와 같이 지정한 `callback_url`에 `API Route`를 생성하여 서버 단에서 로그인 로직을 처리할 수 있습니다.

<br />

```ts
// /api/oauth/callback/url/route.ts 예시 코드

import { cookies } from 'next/headers'
import { NextResponse, type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const queryParams = request.nextUrl.searchParams
  const code = queryParams.get('code')

  const response = await fetch('벡앤드_서버_주소/로그인_API_경로', {
    method: 'POST',
    body: JSON.stringify({ provider: 'google', code }),
  })

  if (!response.ok) {
    throw new Error('로그인 실패')
  }

  return NextResponse.redirect('프론트_서버_주소')
}
```

<br />

위 로직으로 모두 처리되면 좋겠지만 백엔드에서는 `Set-Cookie`헤더를 통해 세션아이디를 넘겨주었습니다.

원래라면 브라우저에 잘 도착하였겠지만 어떻게 보면 저희가 중간에서 요청을 한번 가로채는 것이기 때문에 별도의 처리 로직이 필요합니다.

<br />

```ts
// 응답받은 쿠키 헤더 파싱 후 새로운 쿠키를 설정하는 로직

const responseCookies = response.headers.get('Set-Cookie')
const parsedCookies = responseCookies
  .split(';')
  .map((s) => s.trim().split('='))
  .reduce((obj: { [key: string]: string }, [key, value]) => {
    return Object.assign(obj, { [key]: value ?? true })
  }, {})

cookies().set(SESSION_ID, parsedCookies[SESSION_ID], {
  path: '/',
  httpOnly: true,
  sameSite: 'strict',
  secure: true,
})
```

<br />

마지막으로 `API Route`내부에서 `NextResponse.redirect`API와 함께 에러가 터진다면 바로 500번대 에러가 클라이언트에 전달되기 때문에 적절한 예외처리 로직과 쿼리 파라미터를 활용한 인터렉션 처리까지 해주면 완성입니다.

<br />

```ts
try {
  // 로그인 로직

  return NextResponse.redirect('프론트_서버_주소/?로그인-성공')
} catch {
  cookies().delete(SESSION_ID) // 에러 발생 시 클라이언트에 남아있는 쿠키 삭제 처리

  return NextResponse.redirect('프론트_서버_주소/?로그인-실패')
}
```

<br />
<br />

### 서버 컴포넌트에서는 어떻게 접근할까?

자체적으로 지원하는 `cookies`API를 통해 요청 헤더에 쿠키를 직접 담아서 처리할 수 있습니다.

`Next.js`에서는 서버 측에서 동작하는 `fetch`API를 확장하여 제공하기 때문에, 쿠키가 캐싱이 될 수 있어 해당 부분만 신경 써주면 됩니다.

<br />

```ts
'use server'

import { cookies } from 'next/headers'

export default async function getUserInfo() {
  const response = await fetch('백엔드_서버_주소/인증이_필요한_API_경로', {
    headers: {
      'Content-Type': 'application/json',
      Cookie: `${SESSION_ID}=${cookies().get(SESSION_ID)?.value ?? ''}`,
    },
    credentials: 'include',
    cache: 'no-store',
    next: { revalidate: 0 },
  })

  if (!response.ok) {
    throw new Error('에러 발생')
  }

  const { data } = await response.json()

  return { data, response }
}
```

<br />

`cookies`API는 서버 컴포넌트에서도 똑같이 동작합니다.

아래는 이미 로그인 한 유저를 메인페이지로 리다이렉트하는 코드를 포함한 로그인 페이지 예시입니다.

<br />

```tsx
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default function SignInPage() {
  const isLogin = cookies().has(SESSION_ID)

  if (isLogin) {
    return redirect('프론트_서버_주소/?이미-로그인-되어있음')
  }

  return <SignIn />
}
```

<br />

### 상태 관리는 어떻게 했나?

현재까지의 로직으로는 로그인한 직후는 잘 동작하지만 새로고침하면 로그인이 풀리게됩니다.

저희는 `Next.js`의 `layout.tsx`를 활용하여 루트 경로에 서버용 훅을 사용하여 유저 정보를 받아온 후, `props`를 통해 `context api`에 넘겨주어 상태 관리를 구현하였습니다.

<br />

```tsx
// /app/layout.tsx 예시 코드

'use server'

export default async function RootLayout({ children }: React.PropsWithChildren) {
  const authProps = await useSession()

  return <AuthProvider {...authProps}>{children}</AuthProvider>
}
```

<br />

```ts
// useSession 예시 코드

'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function useSession(): Promise<AuthState> {
  const cookieStore = cookies()
  const sessionId = cookieStore.get(SESSION_ID)?.value
  const isLogin = !!sessionId

  if (!isLogin) {
    return { isLogin: false }
  }

  try {
    // 유저 정보 조회 로직

    return { isLogin: true }
  } catch {
    return redirect('프론트_서버_주소/?로그인-실패')
  }
}
```

<br />

루트 경로의 `layout.tsx`는 서버 컴포넌트이기 때문에 새로고침을 할 때 마다 서버에서 유저 정보 갱신을 수행하며, 갱신 후 `context provider`에 `props`를 통해 상태 값을 전달합니다.

<br />

```tsx
// AuthProvider 예시 코드

'use client'

import { createContext, useContext } from 'react'

const AuthContext = createContext<AuthState>({
  isLogin: false,
})

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children, ...authProps }: React.PropsWithChildren<AuthState>) {
  return <AuthContext.Provider value={authProps}>{children}</AuthContext.Provider>
}
```

<br />
<br />

### Protected Route 구현

`Protected Route`는 클라이언트 환경이라면 보통 `HOC`패턴으로 많이 구현하게 됩니다.

하지만 저희는 서버 컴포넌트인 `page.tsx`에서도 사용해야 했기에, `context api`를 활용한 `useAuth`커스텀 훅은 서버 컴포넌트 환경에서는 실행될 수 없었습니다.

그래서 저희는 조금은 다른 방식으로 `children`을 통해 `WithAuth`컴포넌트를 구현하였습니다.

<br />

```tsx
// WithAuth.tsx 예시 코드

'use client'

import { useAuth } from '../model'

export default function WithAuth({ children }: React.PropsWithChildren) {
  const { isLogin } = useAuth()

  if (isLogin) {
    return children
  }

  return <NeedLogin />
}
```

<br />

```tsx
// WithAuth.tsx 사용 예시 코드 (/my-page/page.tsx)

'use server'

export default function MyPage() {
  return (
    <WithAuth>
      <MyPageContent />
    </WithAuth>
  )
}
```

<br />

<img src="/public/docs/articles/secure-login-in-nextjs/assets/need-login-fallback.png" alt="WithAuth 결과 UI" width="1280" height="609" />

<br />
<br />

## 결론

당연하겠지만 현재 차용하고 있는 방식 또한 완벽할 수 없고, 장단이 존재합니다.

세션 방식은 서버에 부담이 많이 가기 때문에 만료되는 주기가 짧아 유저가 다시 로그인을 수행해야하는 주기가 짧아졌으며, 세션이 만료되었을 때의 에러처리 또한 쉽지만은 않았습니다.

<br />

다른 의견이 있다면 댓글로 공유 부탁드리겠습니다.

<br />

긴 글 읽어주셔서 감사합니다. 😊
