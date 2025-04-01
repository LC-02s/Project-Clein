# Project Clein

![Clein's Portfolio 인트로](/public/images/og-image-main.jpg)

- **도메인**: https://clein-dev.com/
- **기여도**: 100% (개인 프로젝트)
- **기 간**: 2024.12 ~ 운영 중

<br />

## 프로젝트 소개

소개 랜딩페이지, 이력서, 블로그, 참여했던 프로젝트 모음 등의 내용으로 구성된 Next.js 기반 개인 포트폴리오 사이트 프로젝트입니다. 디자이너 시절부터 가지고 싶었던 제 작업물들을 모아두는 사이트와 함께 블로그 및 이력서를 포함하는 저의 모든 포트폴리오들을 한 곳에 정리해두고 편하게 보여주기 위해 만들게 되었습니다. 배포된 사이트는 [여기](https://clein-dev.com/)에서 보실 수 있습니다.

<br />

> 포트폴리오 템플릿으로 사용하는 것을 고려하여 개발하지 않았습니다. 템플릿으로는 사용하지 말아주세요.

<br />
<br />

## 사용 기술

<br />

### Next.js

- 컨텐츠를 보여주는 것에 특화된 사이트를 구축함에 있어 사용자 경험을 고려하여 `SSR` 방식을 선택했고, 이를 쉽게 구현하기 위해 도입하였습니다.
- 프로젝트 초기 부터 리소스 관리를 통한 운영 비용 절감을 고려하였기에, 만약 백엔드 로직이 필요한 경우가 생기더라도 내부에서 `Route Handler`를 통해 처리하여 서버 1개만으로 모든 것을 관리할 수 있는 점도 매력적이었습니다.

<br />

### TypeScript

- 예상하지 못한 런타임 에러를 미연에 방지하여 사이트의 안정성을 보장하기 위해 도입하였습니다.
- Next.js와 연계하여 API에 대한 요청 및 응답 스키마를 통합하여 관리할 수 있었습니다.

<br />

### Zustand

- `overlay` 요소나 반응형 `breakpoint`, 다크 모드 같이 사이트를 구성하는 UI를 만드는데 필요한 최소한의 전역 상태관리에 사용하기 위해 도입하였습니다.
- 개인적으로 `Redux`는 보일러플레이트 코드가 아쉽고, `Context API`는 최적화하기 번거로워 전역 상태관리에는 부적합하다고 생각합니다.

<br />

### Tanstack Query

- Next.js의 서버 컴포넌트와 `fetch` 조합만으로 구현하기에는 아쉬운 클라이언트에서 실행되는 UI 로직 내부에서의 서버 상태관리를 위해 도입하게 되었습니다.

<br />

### TailWindCSS

- 스타일을 작성함에 있어 클래스 또는 변수 작명에 신경을 쓰지 않아도 된다는 점과, 마크업과 스타일을 이동하는 컨텍스트 스위칭을 없앨 수 있다는 점이 마음에 들어 도입하게 되었습니다.
- `tailwind-merge` 와 `class-variance-authority` 등의 라이브러리를 함께 조합하여 컴포넌트 재사용성과 타입 안정성을 높일 수 있었습니다.

<br />

### Motion

- 특별한 처리 없이도 컴포넌트 라이프 사이클에 맞춰 손쉽게 애니메이션을 구현할 수 있는 DX를 제공한다는 점이 매력적이었습니다.
- 일반적인 UI에 더불어 Scroll Parallax UI를 구현하는 데에도 사용할 수 있었습니다.

<br />

### MDX

- `mdx` 언어를 사용하지는 않았지만 마크다운 문서를 편하게 파싱하기 위한 용도로 사용하기 위해 `next-mdx-remote` 패키지를 도입하였습니다.
- 마크다운 문서에 `HTML` 문법을 사용할 시 올바르게 파싱되지 않는 문제가 있어 정규 표현식을 활용한 [전처리 로직](/src/widgets/content/lib/index.ts)을 추가하였습니다.

<br />

### pnpm

- 배포 파이프라인에서의 빌드 속도와 로컬 환경에서의 패키지 용량 관리를 위해 도입하였습니다.

<br />
<br />

## 시작 가이드

<br />

### Requirement

- [node.js @^20](https://nodejs.org/ko)
- [pnpm @9.1.0](https://pnpm.io/ko/)

<br />

### Environment Variable

```bash
NEXT_PUBLIC_DOMAIN_ADDRESS="http://localhost:1007" # It's My Birthday!
NAVER_SITE_VERIFICATION=""
```

<br />

### Installation

```bash
pnpm install
pnpm dev
```

<br />

### Build

```bash
pnpm build
```

<br />
<br />

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).
