<table id="project-summary">
  <colgroup>
    <col />
    <col width="84%" />
  </colgroup>
  <tbody>
    <tr>
      <th>이름</th>
      <td>%{name}%</td>
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
      <th rowspan="2">GitHub</th>
      <td>[v2] %{githubURL}%</td>
    </tr>
    <tr>
      <td>[v1] %{githubURL}%/tree/ver.1</td>
    </tr>
    <tr>
      <th>사용 기술</th>
      <td data-tech-stack>
        <code>React</code>&nbsp;<code>TypeScript</code>&nbsp;<code>React-Router</code>&nbsp;<code>React-Hook-Form</code>&nbsp;<code>CKEditor</code>&nbsp;<code>IndexedDB</code>
        <br />
        <strong>v2 변경 내역</strong><br />
        <ul>
          <li><code>Redux-Toolkit</code> -> <code>Zustand</code></li>
          <li><code>Styled-Components</code> -> <code>TailWindCSS</code> + <code>Motion</code></li>
          <li><code>npm</code> -> <code>pnpm</code></li>
          <li><code>CRA</code> -> <code>Vite</code></li>
          <li><code>moment.js</code> -> <code>day.js</code></li>
        </ul>
      </td>
    </tr>
    <tr>
      <th>비고</th>
      <td>구름톤 트레이닝 마지막 프론트엔드 PBL 과제</td>
    </tr>
  </tbody>
</table>

<br />
<br />

> **목차**
>
> 1. [프로젝트 소개](#프로젝트-소개)
> 2. [사용 기술](#사용-기술)
>    - [변경 사항](#변경-사항)

<br />
<br />

## 프로젝트 소개

%{thumbnail}%

<br />

**PBL**은 **Problem Based Learning**의 약자로 구름톤 트레이닝 과정에서 플레이어들이 수행하게 되는 **문제 해결 기반 학습**을 의미합니다. 해당 프로젝트는 PBL 과제로부터 시작하였지만 과제에서 주어진 요구사항을 모두 구현하는 것에 그치지 않고, 한 걸음 더 나아가 실사용할 수 있는 웹 기반 노트 앱을 만들기 위해 시작하게 되었습니다.

<br />
<br />

## 사용 기술

아래는 %{name}%에 사용된 기술과 사용한 이유입니다.

<br />

### React

- 브라우저 내에서 불필요한 리로딩을 최소화하여 레퍼런스인 애플 노트 앱과 최대한 비슷한 UX를 쉽게 구현하기 위해 도입하였습니다.
- 선언적으로 UI를 개발할 수 있고, 반복되는 UI들을 컴포넌트 단위로 분리하여 재사용하기 쉽다는 이점 또한 매력적이었습니다.

<br />

### Indexed DB

- 별도의 백엔드 없이 클라이언트로만 구성된 해당 프로젝트의 특성상 유저가 생성한 노트 데이터를 영구적으로 저장하기 위해 브라우저에서 제공하는 비동기식 NoSQL 데이터베이스인 `Indexed DB`를 사용하였습니다.
- 데이터 저장에 5MB의 상한선이 있는 `Local Storage`와 다르게 유저 PC 저장 공간의 최대 50% 까지 사용할 수 있었고, `PWA` 설치 시 오프라인에서도 동작할 수 있는 어플리케이션을 만들 수 있었습니다.

<br />

### React Router

- 프로젝트 초기에는 라우터 없이 폴더 기능 구현을 시도했었지만, 폴더와 노트에 대한 여러 상태들을 직접 관리하려다 보니 어플리케이션의 복잡도가 불필요하게 증가된다고 판단하여 추가로 도입하게 되었습니다.
- 도입 후 라우터의 도움을 받아 폴더 기능을 새로 구현하여 기존에 사용했던 불필요한 중간 변수들과 액션 함수들을 최소화할 수 있었습니다.

<br />

### React Hook Form

- 폴더 생성 및 수정 시 이름에 대한 유효성 검사를 쉽게 구현할 수 있고, `useRef` 기반으로 동작하여 불필요한 컴포넌트의 리렌더링을 줄여 성능을 개선할 수 있기에 도입하게 되었습니다.

<br />

### TypeScript

- 복잡한 어플리케이션을 구현함에 있어 실수로 인해 예상하지 못한 런타임에러를 최대한 방지하고자 도입하였습니다.

<br />
<br />

### 변경 사항

<br />

#### Redux (RTK) -> Zustand

> 서비스 특성상 전역 상태 변경이 빈번하게 일어나기에 복잡한 상태들을 조금 더 쉽게 중앙 집중적으로 관리하기 위해 도입했었습니다.

<br />

위의 이유로 리덕스를 도입했었지만, 리덕스는 불필요한 보일러 플레이트 코드가 많아 유지보수에 악영향을 주었기에 요구되는 보일러 플레이트 코드를 줄여 훨씬 깔끔한 DX를 제공하는 `Zustand`로 변경하게 되었습니다. 프로젝트 폴더 구조 컨벤션의 변경사항에 맞춰 도메인 별 스토어 코드들을 `entities` 레이어의 `model` 세그먼트에서 통합하여 관리할 수 있었습니다.

<br />

#### Styled Components -> TailWindCSS + Motion

> - 유지보수를 고려해서 테마 별 스타일을 편리하게 관리하기 위해 `Styled Components`의 `Theme Provider`를 사용했었습니다.
> - 서비스 특성상 전역 상태 변경이 다수 발생되어 그에 따른 스타일 변경을 쉽게 조건부로 관리할 수 있다는 것 또한 매력적이었습니다.

<br />

위의 이유들로 `Styled Components`를 도입했었지만, `Theme Provider`는 `React`의 `Context-API`를 기반으로 제작되어 테마를 변경할 때마다 불필요한 리렌더링이 발생되는 문제가 있었기에 `CSS Variable`을 사용하는 방식으로 변경하며 덜어내었고, 마크업과 스타일을 오고가는 컨텍스트 스위칭과 변수(컴포넌트) 작명에 대한 피로감, 최종적으로는 무분별한 스타일 컴포넌트 사용으로 인한 가독성 저하의 문제를 해결하기 위해 `TailWindCSS`로 변경하게 되었습니다.

<br />

`Motion` 라이브러리는 v1에서 미흡했었던 페이지 전환 애니메이션을 라우터와 컴포넌트 라이프 사이클에 맞춰 쉽게 구현하기 위해 추가로 도입하였습니다. 기존에 `Styled Components`와 `CSS` 조합으로만 구성했었던 애니메이션들을 모두 `Motion` 라이브러리를 활용한 방식으로 전환하였고, 그에따라 레이아웃을 잡는 용도로만 스타일을 사용할 수 있어 스타일에 대한 가독성과 유지 보수성 향상에 도움을 주었습니다.

<br />

#### 무질서한 폴더 구조 -> FSD 아키텍처 통일

기존에는 특정한 기준 없이 일반적인 폴더 구조 컨벤션을 사용했었습니다. 하지만 세부적인 부분에서 명확한 기준을 두지 않아 코드가 존재해야 하는 폴더를 예측하지 못해 유지보수에 악영향을 주는 문제가 있어, 해당 문제를 해결하기 위해 v2에서는 폴더 구조를 FSD 아키텍처로 통일하여 코드의 유지 보수성을 향상시킬 수 있었습니다.

<br />

#### CRA -> Vite

해당 프로젝트는 기존에 CRA(Create React App)을 기반으로 구축되었지만 현시점에서 Deprecated 되기도 했었고, Vite는 ESM을 사용하여 초기 빌드 시간과 HMR(Hot Module Replacement) 속도가 Webpack 기반의 CRA에 비해 훨씬 빠르다는 장점이 있었기에 Vite로 변경하게 되었습니다.

<br />

#### npm -> pnpm

배포 파이프라인에서의 빌드 속도와 로컬 환경에서의 패키지 용량 관리를 위해 변경하게 되었습니다.

<br />
<br />
