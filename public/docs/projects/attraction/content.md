<table id="project-summary">
  <colgroup>
    <col />
    <col width="84%" />
  </colgroup>
  <tbody>
    <tr>
      <th>이름</th>
      <td>%{name}% [어트랙션]</td>
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
      <td>프론트엔드 3명, 백엔드 3명</td>
    </tr>
    <tr>
      <th>역할</th>
      <td>프론트엔드 개발, 디자인 시스템 구축, UI/UX 디자인 총괄</td>
    </tr>
    <tr>
      <th>기간</th>
      <td>%{period}%</td>
    </tr>
    <tr>
      <th>상태</th>
      <td>서비스 종료됨</td>
    </tr>
    <tr>
      <th>도메인</th>
      <td>https://attraction.run <code>deprecated</code></td>
    </tr>
    <tr>
      <th>GitHub</th>
      <td>%{githubURL}%</td>
    </tr>
    <tr>
      <th>MAU</th>
      <td>50명 대 (Beta)</td>
    </tr>
    <tr>
      <th>사용 기술</th>
      <td data-tech-stack>
        <code>Next.js</code>&nbsp;<code>React</code>&nbsp;<code>TypeScript</code>&nbsp;<code>Tanstack-Query</code>&nbsp;<code>MSW</code>&nbsp;<code>pnpm-workspace</code>&nbsp;<code>tsup</code>&nbsp;<code>Vitest</code>&nbsp;<code>Testing-Library</code>&nbsp;<code>StoryBook</code>&nbsp;<code>TailWindCSS</code>&nbsp;<code>Framer-Motion</code>&nbsp;<code>SCSS</code>&nbsp;<code>Shadcn/UI</code>&nbsp;<code>GitHub-Actions</code>&nbsp;<code>AWS-Amplify</code>&nbsp;<code>ESLint</code>&nbsp;<code>Husky</code>&nbsp;<code>commitlint</code>&nbsp;<code>Next-PWA</code>
      </td>
    </tr>
    <tr>
      <th>기여</th>
      <td>
        <ul>
          <li>
            <p>디자인 시스템 구축 및 문서화</p>
            <ul>
              <li>Shadcn/UI를 활용하여 초기 디자인 시스템 구축 및 StoryBook 문서화</li>
              <li>Vitest 및 Testing-Library 를 활용하여 공용 커스텀 훅 및 디자인 컴포넌트 로직 검증</li>
              <li>TailWindCSS Preflight 스타일 중복 적용의 이유로 SCSS 환경에서 재 구축</li>
            </ul>
          </li>
          <li>Route Handler 및 Server Action을 활용한 구글 로그인 기능 고도화</li>
          <li>
            <p>아티클 보관함 기능 개발</p>
            <ul>
              <li>아티클 필터링 및 검색 기능 개발</li>
              <li>아티클 무한 스크롤 기능 개발</li>
              <li>아티클 상세 iFrame 뷰 기능 개발 및 지난 아티클 뷰 연계</li>
              <li>서버 컴포넌트 환경에서 정적 HTML 파일 내 특정 Anchor 태그 검열 기능 개발</li>
              <li>낙관적 업데이트 적용 아티클 스크롤 추적 기능 개발</li>
              <li>아티클 북마크 기능 개발</li>
            </ul>
          </li>
          <li>Query Key Factor 방식을 도입하여 효율적인 엔티티 레이어 도메인 로직 관리</li>
          <li>공용 컴포넌트에 컴파운드 패턴을 도입하여 DX 향상</li>
          <li>MSW를 활용한 API Mocking을 통해 초기 프론트엔드 개발 일정 딜레이 최소화</li>
          <li>공지사항 기능 개발</li>
          <li>다크모드 기능 개발</li>
          <li>SEO 관련 메타데이터 작업</li>
          <li>웹 접근성 개선 및 반응형 작업</li>
          <li>서비스 기획 및 전반적인 UI/UX 디자인</li>
        </ul>
      </td>
    </tr>
    <tr>
      <th>관련 포스트</th>
      <td>%{posts}%</td>
    </tr>
    <tr>
      <th>비고</th>
      <td>구름톤 트레이닝 6회차 파이널 프로젝트 인기상 수상</td>
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
> 3. [인사이트](#인사이트)
>    - [유저 피드백을 통한 제품 개선](#유저-피드백을-통한-제품-개선)
>    - [유지 가능한 코드와 협업 프로세스의 중요성](#유지-가능한-코드와-협업-프로세스의-중요성)

<br />
<br />

## 프로젝트 소개

%{thumbnail}%

<br />

어트랙션은 기존 뉴스레터 시스템을 사용하면서 느꼈던 **정보의 파편화**, **불편한 UI 및 UX**, **개인 맞춤형 시스템의 부재** 등 다양한 문제를 해결하고자 구축하게 된 뉴스레터 통합 관리 서비스입니다. 어트랙션은 아래의 소개 이미지와 같은 핵심 기능들로 상기의 다양한 문제들을 해결하려 하였습니다.

<br />
<br />

<table>
  <colgroup>
    <col width="33.3333%" />
    <col width="33.3333%" />
    <col width="33.3333%" />
  </colgroup>
  <thead>
    <tr>
      <th colspan="3">어트랙션 소개 이미지</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <img src="/public/docs/projects/attraction/assets/introduce-1-light.png" data-dark-src="/public/docs/projects/attraction/assets/introduce-1-dark.png" alt="뉴스레터 맞춤 추천 - 좋은 뉴스레터를 놓치고 싶지 않다면? 관심사를 기반으로 뉴스레터를 추천해드려요!" width="860" height="1864" />
      </td>
      <td>
        <img src="/public/docs/projects/attraction/assets/introduce-2-light.png" data-dark-src="/public/docs/projects/attraction/assets/introduce-2-dark.png" alt="메일함 자동 정리 - 쏟아지는 뉴스레터로 인해 메일함 정리가 힘드셨나요? 오직 뉴스레터에만 집중할 수 있도록 자동으로 모아드려요!" width="860" height="1864" />
      </td>
      <td>
        <img src="/public/docs/projects/attraction/assets/introduce-3-light.png" data-dark-src="/public/docs/projects/attraction/assets/introduce-3-dark.png" alt="뉴스레터 구독 관리 - 귀찮게 하나하나 찾아다닐 필요 없이 여러 뉴스레터를 한 곳에서 간편하게 관리해요!" width="860" height="1864" />
      </td>
    </tr>
  </tbody>
</table>

<br />
<br />

### 정보 구조도

<span data-red>\*</span>**옵저버**: 로그인 하지 않은 유저 (Observer)

<br />

<table data-max-md>
  <thead>
    <tr>
      <th colspan="3">작업 단위</th>
      <th colspan="2">기능 및 구성</th>
      <th>상세 내용</th>
      <th>기여</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td rowspan="22">홈</td>
      <td rowspan="9" colspan="2">옵저버</td>
      <td rowspan="2">로그인 유도 배너</td>
      <td>문구 출력</td>
      <td>뉴스레터의 모든 것 어트랙션에서 쉽고 간편하게</td>
      <td data-center>O</td>
    </tr>
    <tr>
      <td>로그인 하러갈래요!</td>
      <td>클릭 시 로그인 페이지 이동</td>
      <td data-center>O</td>
    </tr>
    <tr>
      <td rowspan="7">트렌디한 뉴스레터</td>
      <td rowspan="3">카테고리 탭메뉴</td>
      <td>뉴스레터 카테고리 출력</td>
      <td data-center>O</td>
    </tr>
    <tr>
      <td>좌우 스와이프 기능 지원</td>
      <td data-center>O</td>
    </tr>
    <tr>
      <td>클릭 시 해당 뉴스레터 목록 출력</td>
      <td data-center>O</td>
    </tr>
    <tr>
      <td rowspan="3">뉴스레터 목록 출력</td>
      <td>뉴스레터 썸네일, 이름, 요약 구성</td>
      <td data-center>O</td>
    </tr>
    <tr>
      <td>선택된 카테고리 별 뉴스레터 출력</td>
      <td data-center>O</td>
    </tr>
    <tr>
      <td>클릭 시 해당 뉴스레터 상세 뷰 페이지 이동</td>
      <td data-center>O</td>
    </tr>
    <tr>
      <td>추천 탭</td>
      <td>옵저버 대상 추천 뉴스레터 출력</td>
      <td data-center>X</td>
    </tr>
    <tr>
      <td rowspan="7" colspan="2">유저</td>
      <td rowspan="5">최근 받은 아티클</td>
      <td>보관함 바로가기</td>
      <td>클릭 시 아티클 보관함 이동</td>
      <td data-center>O</td>
    </tr>
    <tr>
      <td rowspan="4">아티클 카드 출력</td>
      <td>아티클 썸네일, 분량, 제목, 읽은 양 구성</td>
      <td data-center>O</td>
    </tr>
    <tr>
      <td>뉴스레터 썸네일, 이름, 받은 날짜 구성</td>
      <td data-center>O</td>
    </tr>
    <tr>
      <td>좌우 스와이프 기능 지원</td>
      <td data-center>O</td>
    </tr>
    <tr>
      <td>클릭 시 아티클 보관함 -> 상세 뷰 이동</td>
      <td data-center>O</td>
    </tr>
    <tr>
      <td rowspan="2">트렌디한 뉴스레터</td>
      <td>카테고리 탭메뉴</td>
      <td>유저 관심사 기반 정렬 지원</td>
      <td data-center>X</td>
    </tr>
    <tr>
      <td>추천 탭</td>
      <td>유저 관심사 기반 뉴스레터 추천</td>
      <td data-center>X</td>
    </tr>
    <tr>
      <td rowspan="6" colspan="2">공통</td>
      <td rowspan="5">유저 랭킹</td>
      <td rowspan="2">아티클 탭</td>
      <td>아티클을 많이 읽은 기준</td>
      <td data-center>O</td>
    </tr>
    <tr>
      <td>클릭 시 해당하는 유저 랭킹 출력</td>
      <td data-center>O</td>
    </tr>
    <tr>
      <td rowspan="2">스트릭 탭</td>
      <td>아티클을 지속적으로 읽은 기준</td>
      <td data-center>O</td>
    </tr>
    <tr>
      <td>클릭 시 해당하는 유저 랭킹 출력</td>
      <td data-center>O</td>
    </tr>
    <tr>
      <td>대상 유저 랭킹 출력</td>
      <td>순위, 프로필 이미지, 이름, 문구 구성</td>
      <td data-center>O</td>
    </tr>
    <tr>
      <td>배너 광고</td>
      <td>문구 출력</td>
      <td>이 자리에 배너 걸어드립니다</td>
      <td data-center>O</td>
    </tr>
  </tbody>
</table>

<br />

<table data-max-md>
  <thead>
    <tr>
      <th colspan="3">작업 단위</th>
      <th colspan="2">기능 및 구성</th>
      <th>상세 내용</th>
      <th>기여</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td rowspan="6">레이아웃</td>
      <td rowspan="3">헤더</td>
      <td rowspan="1">옵저버</td>
      <td rowspan="1"></td>
      <td></td>
      <td></td>
      <td data-center>O</td>
    </tr>
    <tr>
      <td rowspan="1">유저</td>
      <td rowspan="1"></td>
      <td></td>
      <td></td>
      <td data-center>O</td>
    </tr>
    <tr>
      <td rowspan="1">공통</td>
      <td rowspan="1"></td>
      <td></td>
      <td></td>
      <td data-center>O</td>
    </tr>
    <tr>
      <td rowspan="3">사이드바</td>
      <td rowspan="1">옵저버</td>
      <td rowspan="1"></td>
      <td></td>
      <td></td>
      <td data-center>O</td>
    </tr>
    <tr>
      <td rowspan="1">유저</td>
      <td rowspan="1"></td>
      <td></td>
      <td></td>
      <td data-center>O</td>
    </tr>
    <tr>
      <td rowspan="1">공통</td>
      <td rowspan="1"></td>
      <td></td>
      <td></td>
      <td data-center>O</td>
    </tr>
  </tbody>
</table>

<br />
<br />

### 시연 영상

<video controls muted autoplay>
  <source src="/public/docs/projects/attraction/assets/demo.mp4" type="video/mp4" />
</video>

<br />
<br />

### 역할

<br />
<br />

## 사용 기술

<br />

### 기술적 고민

<br />
<br />

### Next.js

<br />

### TypeScript

<br />

### Tanstack Query

<br />

### MSW

<br />

### 모노레포 (pnpm workspace)

<br />

### TailWindCSS & Shadcn/UI

<br />

### Husky & commitlint

<br />
<br />

### 아쉬웠던 점

<br />

#### 전반적인 기술 이해도 부족

<br />
<br />

#### 디자인 시스템 재구성

<br />
<br />

#### 클라이언트 상태 관리 라이브러리의 부재

저희는 프로젝트 초기 기획을 보고 클라이언트 상태가 크게 없고 대부분이 서버 상태 관리 로직으로만 구성되어 있다고 판단하여 `Redux`나 `Zustand` 같은 클라이언트 상태 관리 라이브러리 없이 `Tanstack-Query`만 사용하여 서버 상태 관리 위주로 로직을 작성한 후, 만약 클라이언트 상태를 관리할 상황이 생기면 `React`의 `Context-API`를 사용하는 것으로 합의하였습니다. 하지만 `Context-API`로 모두 커버가 될 것이라는 저희 예상과는 다르게 생각보다 로직을 작성하며 크고 작은 부분에서 클라이언트 상태를 관리할 일이 많았고, 그때마다 `Context-API`를 사용하거나 `useState` 훅 위주로 로직을 작성했더니 몇 가지 문제점이 있었습니다.

<br />

그중 가장 큰 문제는 렌더링 최적화와 그에 따른 보일러 플레이트 코드의 증가였습니다. `Context-API`는 `Redux`나 `Zustand` 같은 클라이언트 상태 관리 라이브러리와는 다르게 렌더링 최적화를 지원하지 않았습니다. `Context-API`는 컨텍스트로 관리하는 상태가 변경된다면 해당 상태와는 관련 없는 하위 컴포넌트들도 모두 리렌더링 시켰고, 이를 해결하기 위해 실제 상태로 구성된 컨텍스트와 이를 수정하는 `Dispatcher` 컨텍스트를 분리시켜 주어야 했습니다. 이때 발생하는 보일러 플레이트 코드는 둘째치더라도 해당 조치만으로는 다른 클라이언트 상태 관리 라이브러리들과 달리 완벽하게 렌더링 최적화를 지원할 수 없었고, 결과적으로 생산성 저하와 유지 보수성 저하로 이어지게 되었습니다.

<br />
<br />

## 인사이트

<br />

### 유저 피드백을 통한 제품 개선

저희는 유저 피드백을 수집하기 위해 서비스에 채널 톡을 도입하였고, 베타 서비스 운영 도중 채널 톡을 통한 익명의 제보를 통해 서비스 취약점을 발견 후 조치할 수 있었습니다.

<br />
<br />

### 유지 가능한 코드와 협업 프로세스의 중요성

해당 프로젝트는 제가 처음 프론트엔드 개발자로써 참여한 팀 프로젝트였고, 기획, 디자인, 개발 등 분야를 가리지 않고 정말 열정적으로 기여했던 프로젝트였지만 들였던 노력과는 반대로 결과가 좋지 못했습니다.

<br />
<br />
