<table id="project-summary">
  <colgroup>
    <col />
    <col width="84%" />
  </colgroup>
  <tbody>
    <tr>
      <th>이름</th>
      <td>[{name}] [응.참.잘.]</td>
    </tr>
    <tr>
      <th>설명</th>
      <td>[{description}]</td>
    </tr>
    <tr>
      <th>유형</th>
      <td>[{type}]</td>
    </tr>
    <tr>
      <th>인원 구성</th>
      <td>프론트엔드 5명</td>
    </tr>
    <tr>
      <th>역할</th>
      <td>프론트엔드 개발, UI/UX 디자인 총괄</td>
    </tr>
    <tr>
      <th>기간</th>
      <td>[{period}]</td>
    </tr>
    <tr>
      <th>도메인</th>
      <td>[{serviceURL}]</td>
    </tr>
    <tr>
      <th>GitHub</th>
      <td>[{githubURL}]</td>
    </tr>
    <tr>
      <th>누적 사용자</th>
      <td>200명 대</td>
    </tr>
    <tr>
      <th>사용 기술</th>
      <td>
        <code>Next.js</code>&nbsp;<code>React</code>&nbsp;<code>TypeScript</code>&nbsp;<code>Zustand</code>&nbsp;<code>TailWindCSS</code>&nbsp;<code>Shadcn/UI</code>&nbsp;<code>Swiper.js</code>&nbsp;<code>HTML2Canvas</code>
      </td>
    </tr>
    <tr>
      <th>기여</th>
      <td>
        <ul>
          <li>부적 템플릿 선택 기능 개발</li>
          <li>
            <p>부적 템플릿 에디터 기능 개발</p>
            <ul>
              <li>텍스트 및 폰트 편집 기능 개발</li>
              <li>생성된 부적 이미지 저장 기능 개발</li>
            </ul>
          </li>
          <li>URI 기반 부적 공유 기능 개발</li>
          <li>프로젝트 배포 전담</li>
          <li>공통 디자인 컴포넌트 작업</li>
          <li>SEO 관련 메타데이터 작업</li>
          <li>웹 접근성 개선 및 반응형 작업</li>
          <li>서비스 기획 및 전반적인 UI/UX 디자인</li>
        </ul>
      </td>
    </tr>
    <tr>
      <th>비고</th>
      <td>테오의 스프린트 18기</td>
    </tr>
  </tbody>
</table>

<br />
<br />

> **목차**
>
> 1. [프로젝트 소개](#프로젝트-소개)
>    - [시연 영상](#시연-영상)
>    - [역할](#역할)
> 2. [사용 기술](#사용-기술)
>    - [기술적 고민](#기술적-고민)
>    - [아쉬웠던 점](#아쉬웠던-점)
> 3. [트러블 슈팅](#트러블-슈팅)
>    - [URI 기반 이미지 공유 기능 관련 414 상태 코드 이슈](#uri-기반-이미지-공유-기능-관련-414-상태-코드-이슈)
>    - [HTML2Canvas 라이브러리 관련 스타일 충돌 이슈](#html2canvas-라이브러리-관련-스타일-충돌-이슈)
>    - [Zustand Selector 관련 이슈](#zustand-selector-관련-이슈)
> 4. [인사이트](#인사이트)

<br />
<br />

## 프로젝트 소개

<img src="/public/docs/projects/eung-cham-jal/images/intro.png" alt="[{name}]" width="1200" height="630" />

<br />

[{name}]은 제공되는 부적 템플릿을 통하여 사용자가 원하는 부적을 손쉽게 만들어낸 후 공유까지 해볼 수 있는 커스텀 부적 메이커 서비스입니다.

<br />

- 언제, 어디서나 쉽게 발행할 수 있는 디지털 부적
- 자유롭게 원하는 형태 및 문구를 고를 수 있는 부적

<br />

을 통해 주변 사람들에게 부담되지 않는 소소한 응원을 전달해 보고자 시작하게 되었습니다.

<br />

### 시연 영상

<br />
<br />

### 역할

랜덤 이름 생성 기능과 부적 생성 횟수 누적 기능 중 노션 API를 활용한 부분을 제외한 거의 대부분의 로직에 기여했으며, 프로젝트 배포를 전담하였습니다.

(GitHub Insights Contributors 기준 커밋 1위, 코드 추가 2위, 코드 삭제 1위입니다.)

<br />

프로젝트 기획 단계에서 구두로만 결정된 MVP 작업 단위를 와이어 프레임으로 시각화하여 팀원 분들의 서비스 이해도를 높여 실 개발 단계 이전의 의견 조율을 원활하게 이끌었습니다.

<br />

(아래 이미지 참조)

<br />

<img src="/public/docs/projects/eung-cham-jal/images/wire-frame.jpg" alt="응참잘 와이어 프레임 산출물" width="1758" height="846" />

<br />

전반적인 UI/UX 디자인을 총괄하였으며, 서비스 내에서 사용되는 부적 템플릿 또한 전부 직접 디자인 하였습니다. UI 디자인은 짧은 시간 동안 혼자 시안 제작과 기능 개발을 모두 수행하기는 힘들었기 때문에 서비스의 메인 키 비주얼을 제외한 나머지는 전반적인 UI 디자인 컨셉을 정한 후 공용 디자인 컴포넌트를 먼저 작업하여 사용하는 방식으로 진행하였습니다.

<br />

(아래 이미지 참조)

<br />

<img src="/public/docs/projects/eung-cham-jal/images/ui-concept.jpg" alt="응참잘 UI 디자인 컨셉" width="1812" height="768" />

<br />

<img src="/public/docs/projects/eung-cham-jal/images/charm-templates.jpg" alt="응참잘 부적 템플릿 피그마 파일 캡처" width="1200" height="568" />

<br />
<br />

## 사용 기술

<br />

### 기술적 고민

저희는 프론트엔드 개발자만 5명으로 구성된 팀이었습니다.

<br />

> **DB 필요 기능**
>
> 1. 편집한 부적 이미지를 타인에게 공유하는 기능
> 2. 지금까지 생성된 부적 갯수 누적 기능

<br />

### 아쉬웠던 점

<br />
<br />

## 트러블 슈팅

<br />

### URI 기반 이미지 공유 기능 관련 414 상태 코드 이슈

<br />
<br />

### HTML2Canvas 라이브러리 관련 스타일 충돌 이슈

이미 `HTML2Canvas` 라이브러리를 통해 부적 이미지 출력 기능을 개발한 상태에서, 나중에 구현한 부적 템플릿 결과물을 실제로 출력해보니 부적 이미지가 아래와 같은 형태로 스타일이 올바르게 적용되지 않는 문제가 있었습니다.

<br />

<table>
  <colgroup>
    <col width="50%" />
    <col width="50%" />
  </colgroup>
  <thead>
    <tr>
      <th>기대한 결과물</th>
      <th>출력된 결과물</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <img src="/public/docs/projects/eung-cham-jal/images/charm-success.png" alt="원래 기대했던 결과물" width="1000" height="1400" />
      </td>
      <td>
        <img src="/public/docs/projects/eung-cham-jal/images/charm-failed.png" alt="올바른 스타일 적용에 실패한 결과물" width="1000" height="1400" />
      </td>
    </tr>
  </tbody>
</table>

<br />

관련 이슈를 찾아보니 `HTML2Canvas` 라이브러리에서 `HTML` 요소의 위치 값 계산에 사용하는 스타일 중 하나가 `TailWindCSS`의 기본 `Preflight` 스타일과 충돌되는 이슈가 있어 아래 `CSS`를 적용하여 해결하였습니다. 또한 템플릿에 사용했던 스타일 중 라이브러리가 지원하지 않는 스타일도 여럿 발견되어서 정식 출시 전에 조속히 수정할 수 있었습니다.

<br />

```css
@layer base {
  img {
    @apply inline-block;
  }
}
```

<br />
<br />

### Zustand Selector 관련 이슈

`Zustand`를 사용하여 부적 편집 기능을 개발하던 도중 아래와 같은 형태의 코드에서 `Selector` 함수에 명시한 상태가 올바르게 반환되지 않는 문제가 있었습니다.

<br />

```ts
import { create } from 'zustand'

const useTemplateStore = create<TemplateStore>((set) => ({})) // 상세한 스토어 코드는 생략하였습니다.

export const useTemplate = (): TemplateState =>
  useTemplateStore((store) => ({
    currentId: store.currentId,
    ratio: store.ratio,
    backgroundURL: store.backgroundURL,
    contentsLength: store.contentsLength,
  }))
```

<br />

원인은 `Selector` 함수 내부에서 기존의 상태가 아닌 새로운 객체를 생성하여 반환할 경우 새로운 상태를 `Dispatch` 받았을 때 변경된 값을 올바르게 비교하여 적시에 렌더링 시키지 못해 발생하는 문제였습니다. 결국 사용자 이슈였죠. 이후부터 전역 상태를 객체의 형태로 반환하고 싶을 때는 아래와 같은 형태로 작성하게 되었습니다.

<br />

```ts
export const useTemplate = (): TemplateState => ({
  currentId: useTemplateStore((store) => store.currentId),
  ratio: useTemplateStore((store) => store.ratio),
  backgroundURL: useTemplateStore((store) => store.backgroundURL),
  contentsLength: useTemplateStore((store) => store.contentsLength),
})
```

<br />
<br />

## 인사이트

해당 프로젝트는 테오의 스프린트 18기 진행 중 구성되었으며, 1주일 간의 짧은 기간(기획 5일, 개발 2일)동안 MVP를 만든 후 배포까지 완수하는 목적으로 진행되었습니다.

<br />
<br />
