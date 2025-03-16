<table id="project-summary">
  <colgroup>
    <col />
    <col width="84%" />
  </colgroup>
  <tbody>
    <tr>
      <th>이름</th>
      <td>%{name}% [시너지밋 2024]</td>
    </tr>
    <tr>
      <th>설명</th>
      <td>%{description}%</td>
    </tr>
    <tr>
      <th>유형</th>
      <td>%{type}%</td>
    </tr>
    <tr>
      <th>기간</th>
      <td>%{period}%</td>
    </tr>
    <tr>
      <th>도메인</th>
      <td>%{serviceURL}%</td>
    </tr>
    <tr>
      <th>GitHub</th>
      <td>%{githubURL}%</td>
    </tr>
    <tr>
      <th>사용 기술</th>
      <td>
        <code>React</code>&nbsp;<code>TypeScript</code>&nbsp;<code>Vite</code>&nbsp;<code>Zustand</code>&nbsp;<code>Emotion</code>&nbsp;<code>Motion</code>&nbsp;<code>Swiper.js</code>&nbsp;<code>Express.js</code>&nbsp;<code>pnpm</code>
      </td>
    </tr>
    <tr>
      <th>관련 포스트</th>
      <td>%{posts}%</td>
    </tr>
  </tbody>
</table>

<br />
<br />

> **목차**
>
> 1. [프로젝트 소개](#프로젝트-소개)
>    - [시연 영상](#시연-영상)
> 2. [사용 기술](#사용-기술)
>    - [기술적 고민](#기술적-고민)
>    - [아쉬웠던 점](#아쉬웠던-점)

<br />
<br />

## 프로젝트 소개

%{thumbnail}%

<br />

%{name}%는 개발 분야 취업 준비생들끼리 모여 취업 준비 관련 정보를 공유하고, 각자가 진행했던 프로젝트를 토대로 세션 발표를 진행한 후 서로 피드백을 주고받으면서 함께 성장하기 위해 기획된 밋업 행사인 **시너지 밋 2024**의 모집 홍보용 랜딩 페이지입니다. 해당 프로젝트는 기획 단계에서 스폰서와의 협의에 실패하여 장소 대관을 하지 못해 행사가 무산된 관계로 후일을 기약하며 템플릿으로 남겨두었습니다.

<br />

### 시연 영상

<video controls muted autoplay width="1528" height="990">
  <source src="/public/docs/projects/synergy-meet-2024/images/video.mp4" type="video/mp4" />
</video>

<br />
<br />

## 사용 기술

<br />

### 기술적 고민

요약하면 별도의 라우팅과 데이터의 갱신이 없는 정적 페이지 하나를 일주일 내로 개발해야하는 상황이었습니다. 기술 스택으로 `HTML`, `CSS`, `jQuery`를 선택할 수 있었지만 DX를 고려하여 리액트와 타입스크립트 기반의 기술들을 선택하였고, 사용하는 리소스를 고려하여 별도의 서버를 두지 않는 방향으로 결정하였습니다. 하지만 리액트는 기본적으로 `CSR` 방식으로 동작하기에 정적 페이지의 UX를 고려하여 최종적으로 서버 없이 정적 파일만 빌드하여 서빙하는 `SSG` 환경을 구축하고자 하였습니다.

<br />
<br />

### React

- 선언적으로 UI를 개발할 수 있고, 반복되는 UI들을 컴포넌트 단위로 분리하여 재사용하기 쉽다는 이점이 있어 도입하였습니다.

<br />
<br />

### TypeScript

- 예상하지 못한 런타임 에러를 미연에 방지하여 사이트의 안정성을 보장하기 위해 도입하였습니다.

<br />
<br />

### Vite

- 제공되는 `SSR` 템플릿을 활용하여 별도의 서버 없이 `SSG` 빌드 파이프라인 또한 쉽게 구축할 수 있을 것 같아 도입하였습니다.
- 구축한 SSG 빌드 파이프라인 관련 글은 <a href="/blog/simple-react-ssg-pipeline" title="간단한 리액트 SSG 빌드 파이프라인 구축하기">여기</a>에서 볼 수 있습니다.

<br />
<br />

### Zustand

- `overlay` 요소나 반응형 `breakpoint` 같이 사이트를 구성하는 UI를 만드는데 필요한 최소한의 전역 상태관리에 사용하기 위해 도입하였습니다.
- 개인적으로 `Redux`는 보일러플레이트 코드가 아쉽고, `Context API`는 최적화하기 번거로워 전역 상태관리에는 부적합하다고 생각합니다.

<br />
<br />

### Emotion

- 기존에 사용해 보지는 않았지만 당시 익숙했던 `SCSS` 문법과 `SSR`을 지원했고, 인라인 스타일 방식으로도 활용할 수 있어 사용하기 편할 것 같아 도입하였습니다.
- 개인적인 경험으로 `module CSS` 나 `SCSS` 같은 경우에는 스크립트와 함께 사용하기에는 아쉬운 느낌이 없지 않아 있고, `Styled Components`의 경우에는 매번 스타일을 위한 컴포넌트의 이름을 작명하는 것이 번거로웠으며, 작성한 이후에는 가독성 또한 좋지 않았습니다.
- `Emotion`은 사용해 보니 인라인 스타일로 사용할 경우에는 가독성이 많이 떨어졌고, 변수를 따로 분리할 경우 클래스명이 변수명으로 변경되었을 뿐이지 결국 작명을 해야 하는 것은 동일했습니다. (이후부터 `TailWindCSS`로 정착하게 되었습니다.)

<br />
<br />

### Motion

- 메인 키 비주얼을 구성하는 Scroll Linked Animation 기법을 쉽게 구현하기 위해 도입하였습니다.
- 특별한 처리 없이도 컴포넌트 라이프 사이클에 맞춰 손쉽게 애니메이션을 구현할 수 있는 DX를 제공한다는 점 또한 매력적이었습니다.

<br />
<br />

### Express.js

- 로컬 환경에서 개발 서버를 띄우기 위한 용도로 도입하였습니다.
- 이전 버전에서는 핫리로딩 시 변경사항이 조금씩 누락되는 문제가 있지만 `Vite` 최신 버전 부터는 별도의 옵션으로 지원되어 설치하지 않아도 됩니다.

<br />
<br />

### pnpm

- 배포 파이프라인에서의 빌드 속도와 로컬 환경에서의 패키지 용량 관리를 위해 도입하였습니다.

<br />
<br />

### 아쉬웠던 점

결과물에 비해 기술들을 과하게 사용했다는 생각이 들었습니다. DX를 조금 포기하고 `HTML`, `CSS`, `jQuery` 조합과 함께 `GitHub Pages` 플랫폼을 사용했다면 훨씬 빠르게 개발 후 더욱 간결하게 관리할 수 있었을 것 같습니다.

<br />
<br />
