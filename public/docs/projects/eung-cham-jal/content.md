<table id="project-summary">
  <colgroup>
    <col />
    <col width="84%" />
  </colgroup>
  <tbody>
    <tr>
      <th>이름</th>
      <td>%{name}% [응.참.잘.]</td>
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
      <th>인원 구성</th>
      <td>프론트엔드 5명</td>
    </tr>
    <tr>
      <th>역할</th>
      <td>프론트엔드 개발, UI/UX 디자인 총괄</td>
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
      <th>누적 사용자</th>
      <td>200명 대</td>
    </tr>
    <tr>
      <th>사용 기술</th>
      <td data-tech-stack>
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
>    - [정보 구조도](#정보-구조도)
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

%{thumbnail}%

<br />

%{name}%은 제공되는 부적 템플릿을 통하여 사용자가 원하는 부적을 손쉽게 만들어낸 후 공유까지 해볼 수 있는 커스텀 부적 메이커 서비스입니다.

<br />

- 언제, 어디서나 쉽게 발행할 수 있는 디지털 부적
- 자유롭게 원하는 형태 및 문구를 고를 수 있는 부적

<br />

을 통해 주변 사람들에게 부담되지 않는 소소한 응원을 전달해 보고자 시작하게 되었습니다.

<br />

### 정보 구조도

<table>
  <thead>
    <tr>
      <th>작업 단위</th>
      <th colspan="2">기능 및 구성</th>
      <th>상세 내용</th>
      <th>기여</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td rowspan="3">인트로 페이지</td>
      <td colspan="2">서비스 키 비주얼</td>
      <td></td>
      <td data-center>O</td>
    </tr>
    <tr>
      <td colspan="2">시작하기 버튼</td>
      <td>클릭 시 이름 작성 페이지 이동</td>
      <td data-center>O</td>
    </tr>
    <tr>
      <td colspan="2">누적 부적 생성 횟수 출력</td>
      <td>Notion API 활용</td>
      <td data-center>X</td>
    </tr>
    <tr>
      <td rowspan="2">이름 작성 페이지</td>
      <td colspan="2">이름 입력 인풋</td>
      <td>기본 값으로 랜덤 이름 생성</td>
      <td data-center>X</td>
    </tr>
    <tr>
      <td colspan="2">다음으로 버튼</td>
      <td>클릭 시 부적 템플릿 선택 페이지 이동</td>
      <td data-center>X</td>
    </tr>
    <tr>
      <td rowspan="2">부적 템플릿 선택 페이지</td>
      <td colspan="2">부적 템플릿 선택 슬라이드</td>
      <td></td>
      <td data-center>O</td>
    </tr>
    <tr>
      <td colspan="2">다음으로 버튼</td>
      <td>클릭 시 부적 템플릿 편집 페이지 이동</td>
      <td data-center>O</td>
    </tr>
    <tr>
      <td rowspan="6">부적 템플릿 편집 페이지</td>
      <td colspan="2">편집 중인 부적 이미지 미리보기</td>
      <td>개별 텍스트 영역 클릭 시 편집 기능 활성화</td>
      <td data-center>O</td>
    </tr>
    <tr>
      <td rowspan="3">폰트 편집 기능</td>
      <td>텍스트 별 폰트 종류 변경</td>
      <td rowspan="3">변경 시 미리보기와 동기화</td>
      <td data-center>O</td>
    </tr>
    <tr>
      <td>텍스트 별 폰트 두께 변경</td>
      <td data-center>O</td>
    </tr>
    <tr>
      <td>텍스트 별 폰트 크기 변경</td>
      <td data-center>O</td>
    </tr>
    <tr>
      <td colspan="2">텍스트 수정 인풋</td>
      <td>내용 입력 시 미리보기와 동기화</td>
      <td data-center>O</td>
    </tr>
    <tr>
      <td colspan="2">저장하기 버튼</td>
      <td>부적 생성 결과 페이지 이동</td>
      <td data-center>O</td>
    </tr>
    <tr>
      <td rowspan="5">부적 생성 결과 페이지</td>
      <td colspan="2">안내 문구 출력</td>
      <td>입력받은 이름 사용</td>
      <td data-center>X</td>
    </tr>
    <tr>
      <td colspan="2">편집된 부적 이미지 미리보기 출력</td>
      <td></td>
      <td data-center>O</td>
    </tr>
    <tr>
      <td colspan="2">소장하기 버튼</td>
      <td>클릭 시 편집된 부적 이미지 저장</td>
      <td data-center>X</td>
    </tr>
    <tr>
      <td colspan="2">부적 링크 공유하기 버튼</td>
      <td>클릭 시 클립보드에 부적 공유 링크 복사</td>
      <td data-center>O</td>
    </tr>
    <tr>
      <td colspan="2">하나 더 만들기 버튼</td>
      <td>클릭 시 인트로 페이지 이동</td>
      <td data-center>X</td>
    </tr>
    <tr>
      <td rowspan="4">부적 공유 페이지</td>
      <td colspan="2">안내 문구 출력</td>
      <td>입력받은 이름 사용</td>
      <td data-center>X</td>
    </tr>
    <tr>
      <td colspan="2">공유된 부적 이미지 미리보기 출력</td>
      <td></td>
      <td data-center>O</td>
    </tr>
    <tr>
      <td colspan="2">나도 만들어 보기 버튼</td>
      <td>클릭 시 인트로 페이지 이동</td>
      <td data-center>X</td>
    </tr>
    <tr>
      <td colspan="2">소장하기 버튼</td>
      <td>클릭 시 공유된 부적 이미지 저장</td>
      <td data-center>X</td>
    </tr>
  </tbody>
</table>

<br />
<br />

### 시연 영상

<table data-max-md>
  <colgroup>
    <col width="50%" />
    <col width="50%" />
  </colgroup>
  <thead>
    <tr>
      <th>템플릿 편집</th>
      <th>결과물 저장 및 공유</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <video controls muted width="1064" height="1972">
          <source src="/public/docs/projects/eung-cham-jal/assets/edit-template.mp4" type="video/mp4" />
        </video>
      </td>
      <td>
        <video controls muted width="1064" height="1972">
          <source src="/public/docs/projects/eung-cham-jal/assets/save-and-share.mp4" type="video/mp4" />
        </video>
      </td>
    </tr>
  </tbody>
</table>

<br />
<br />

### 역할

랜덤 이름 생성 기능과 부적 생성 횟수 누적 기능 중 노션 API를 활용한 부분을 제외한 거의 대부분의 핵심 로직에 기여했으며, 프로젝트 배포를 전담하였습니다.

(GitHub Insights Contributors 기준 커밋 1위, 코드 추가 2위, 코드 삭제 1위입니다.)

<br />

프로젝트 기획 단계에서 구두로만 결정된 MVP 작업 단위를 와이어 프레임으로 시각화함으로써 팀원 분들의 서비스 이해도를 높여 실 개발 단계 이전의 의견 조율을 원활하게 이끌었습니다.

<br />

(아래 이미지 참조)

<br />

<img src="/public/docs/projects/eung-cham-jal/assets/wire-frame.jpg" alt="응참잘 와이어 프레임 산출물" width="1758" height="846" />

<br />
<br />

전반적인 UI/UX 디자인을 총괄하였으며, 서비스 내에서 사용되는 부적 템플릿 또한 전부 직접 디자인 하였습니다. UI 디자인은 짧은 시간 동안 혼자 시안 제작과 기능 개발을 모두 수행하기는 힘들었기 때문에 서비스의 메인 키 비주얼을 제외한 나머지는 전반적인 UI 디자인 컨셉을 정한 후 공용 디자인 컴포넌트를 먼저 작업하여 사용하는 방식으로 진행하였습니다.

<br />

(아래 이미지 참조)

<br />

<img src="/public/docs/projects/eung-cham-jal/assets/ui-concept.jpg" alt="응참잘 UI 디자인 컨셉" width="1812" height="768" />

<br />

<img src="/public/docs/projects/eung-cham-jal/assets/charm-templates.jpg" alt="응참잘 부적 템플릿 피그마 파일 캡처" width="1200" height="568" />

<br />
<br />

## 사용 기술

팀원들 간 주로 사용하는 기술들이 모두 달랐기에 기본적으로 팀원들과의 합의 과정을 거쳐 선택된 기술들입니다.

<br />

### 기술적 고민

프론트엔드 개발자만 5명으로 구성된 상태에서 1주일 안에 상기의 MVP를 구현해야 했었지만 기획한 기능 중 아래와 같은 기능들을 구현하기 위해서는 일반적으로 데이터베이스와 스토리지 서비스가 요구되는 상황이었습니다.

<br />

> **DB 필요 기능**
>
> 1. 편집한 부적 이미지를 타인에게 공유하는 기능
> 2. 지금까지 생성된 부적 갯수 누적 기능

<br />

저희는 당시 시간과 인력 등 가용할 수 있는 리소스가 부족한 상태였기에 최대한 백엔드 서버와 데이터베이스 및 스토리지 서비스를 사용하지 않고 MVP를 구현하는 것을 목표로 하였습니다.

<br />
<br />

### Next.js

- 링크를 공유 방식을 기반하는 부적 공유 기능에 사용자 경험을 고려하여 SSR을 적용하고자 하였고, 이를 쉽게 구현하기 위해 도입하였습니다.
- 또한 저희는 프론트엔드 개발자만 5명으로 구성된 팀이었기에 혹시나 있을 백엔드 로직 대응을 고려한 선택이었습니다.

<br />

### TypeScript

- 예상하지 못한 런타임 에러를 미연에 방지하여 사이트의 안정성을 보장하기 위해 도입하였습니다.

<br />

### Zustand

- 템플릿 편집 기능 등 클라이언트 측 상태 관리가 필요한 로직에 사용하기 위해 도입하였습니다.
- 개인적으로 Redux는 보일러플레이트 코드가 아쉽고, Context API는 최적화하기 번거로워 전역 상태관리에는 부적합하다고 생각합니다.

<br />

### TailWindCSS + Shadcn/UI

- TailWindCSS는 러닝 커브가 조금 있지만 팀원들 모두 사용할 수 있는 상태였고, Next.js와 잘 어울리며 쉽게 커스텀이 가능한 컴포넌트 라이브러리인 Shadcn/UI가 당시 상황에 적합하다고 판단하여 도입하였습니다.

<br />

### Swiper.js

- 사전 기획 단계에서 부적 템플릿 선택 UI를 고민하던 중 Swiper에서 괜찮은 템플릿을 [데모](https://swiperjs.com/demos#effect-cards)로 제공하는 것을 발견하여 도입하였습니다.

<br />

### HTML2Canvas

- 핵심 기능 중 하나인 부적 이미지 저장 기능을 쉽게 구현하기 위해 도입하였습니다.

<br />
<br />

### 아쉬웠던 점

시간상 프로젝트 초기에 컨벤션을 구체적으로 정하지 못해 코드 작성 방식을 통일하지 못했던 점과, 첫 번째 스프린트 이후 추가적인 스프린트를 지속하며 제품을 개선해보는 경험을 해보지 못했던게 아쉬웠습니다.

<br />
<br />

## 트러블 슈팅

<br />

### URI 기반 이미지 공유 기능 관련 414 상태 코드 이슈

저희는 최대한 백엔드 서버와 데이터베이스 및 스토리지 서비스를 사용하지 않고 MVP를 구현하는 것이 목표였기 때문에 이미지 공유 기능을 기획할 때 아래의 방법들을 고안하였습니다.

<br />

> **이미지 공유 기능 구현 계획**
>
> 1. 생성된 이미지를 `base64`로 인코딩하여 URL 쿼리 파라미터를 통해 공유
> 2. 생성된 이미지를 구성하는 메타데이터를 URL 쿼리 파라미터로 공유하여 페이지 진입 시점에 이미지 재 생성
> 3. 생성된 이미지를 데이터베이스 및 스토리지 서비스를 활용하여 저장 및 링크 공유

<br />

3번 계획은 마지막 보루로 두었고, 먼저 1번 계획으로 구현을 시도하였습니다. 1번 계획은 생성된 이미지를 `base64`로 인코딩하여 URL 쿼리 파라미터를 통해 공유하는 방식이었는데, 해당 방식은 URL이 많이 길어지는 문제가 있긴했지만 복잡하지 않은 이미지는 충분히 공유가 가능했었습니다. 하지만 생성된 부적 이미지는 복잡한 축에 속했고, 부적 이미지를 `base64`로 인코딩하여 쿼리 파라미터로 공유할 경우 414(URI Too Long) 상태 코드 이슈가 발생했습니다.

<br />

414 HTTP 상태 코드는 찾아보니 드물게 아래의 경우에서 발생한다는 것을 파악했고,

<br />

> **414 HTTP 상태 코드 발생 원인**
>
> 1. 클라이언트가 POST 요청을 부적절하게 긴 쿼리 정보를 가진 GET 요청으로 변환한 경우
> 2. 클라이언트가 리디렉션 루프(예: 자신의 접미사를 가리키는 리디렉션된 URI 접두사)에 빠진 경우
> 3. 또는 서버의 잠재적인 보안 허점을 악용하려는 클라이언트의 공격을 받는 경우

<br />

저희는 첫 번째 경우에 해당하여 해당 문제를 해결하기 위해 2번 계획인 생성된 이미지를 구성하는 메타데이터를 URL 쿼리 파라미터로 공유하여 페이지 진입 시점에 이미지 재 생성하는 방식으로 변경하여 문제를 해결할 수 있었습니다.

<br />

하지만 URL에 메타데이터를 담아서 공유하는 방식 또한 공유되는 URL이 길어지는 문제는 동일하게 가지고 있어, 제품 개선을 위한 추가적인 스프린트가 진행되었다면 아마 [`lz-string`](https://www.npmjs.com/package/lz-string)이라는 문자열 압축 라이브러리를 사용하여 공유되는 URL의 길이를 줄이는 작업을 추진해봤을 것 같습니다.

<br />
<br />

### HTML2Canvas 라이브러리 관련 스타일 충돌 이슈

이미 `HTML2Canvas` 라이브러리를 통해 부적 이미지 출력 기능을 개발한 상태에서, 나중에 구현한 부적 템플릿 결과물을 실제로 출력해보니 부적 이미지가 아래와 같은 형태로 스타일이 올바르게 적용되지 않는 문제가 있었습니다.

<br />

<table data-max-md>
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
        <img src="/public/docs/projects/eung-cham-jal/assets/charm-success.png" alt="원래 기대했던 결과물" width="1000" height="1400" />
      </td>
      <td>
        <img src="/public/docs/projects/eung-cham-jal/assets/charm-failed.png" alt="올바른 스타일 적용에 실패한 결과물" width="1000" height="1400" />
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

해당 프로젝트는 테오의 스프린트 18기 진행 중 구성되었으며, 1주일 간의 짧은 기간(기획 5일, 개발 2일)동안 MVP를 만든 후 배포까지 완수하는 목적으로 진행되었습니다. 테오의 스프린트는 지원자 분들이 대부분 프론트엔드 개발자로 구성되어 디자이너 지원자가 선택한 아이디어를 가진 팀은 경쟁률이 강해 초기 목표했었던 디자이너와의 협업은 경험해보지 못해 조금 아쉬웠지만, 스프린트를 통해 다양한 방식의 기획 및 설계 프로세스를 배울 수 있었습니다.

<br />

특히

<br />
<br />
