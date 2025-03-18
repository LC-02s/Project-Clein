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
      <td>
        <code>Next.js</code>&nbsp;<code>React</code>&nbsp;<code>TypeScript</code>&nbsp;<code>Tanstack-Query</code>&nbsp;<code>MSW</code>&nbsp;<code>pnpm-workspace</code>&nbsp;<code>tsup</code>&nbsp;<code>vitest</code>&nbsp;<code>Testing-Library</code>&nbsp;<code>StoryBook</code>&nbsp;<code>TailWindCSS</code>&nbsp;<code>Framer-Motion</code>&nbsp;<code>SCSS</code>&nbsp;<code>Shadcn/UI</code>&nbsp;<code>GitHub-Actions</code>&nbsp;<code>AWS-Amplify</code>&nbsp;<code>ESLint</code>&nbsp;<code>Husky</code>&nbsp;<code>commitlint</code>
      </td>
    </tr>
    <tr>
      <th>기여</th>
      <td>
        <ul>
          <li>디자인 시스템 구축 및 문서화</li>
          <li>구글 로그인 기능 고도화</li>
          <li>
            아티클 보관함 기능 개발
            <ul>
              <li>아티클 필터링 및 검색 기능 개발</li>
              <li>아티클 무한 스크롤 기능 개발</li>
              <li>아티클 상세 iFrame 뷰 기능 개발 및 지난 아티클 뷰 연계</li>
              <li>낙관적 업데이트 적용 아티클 스크롤 추적 기능 개발</li>
              <li>아티클 북마크 기능 개발</li>
            </ul>
          </li>
          <li>다크모드 기능 개발</li>
          <li>공지사항 기능 개발</li>
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
>    - [시연 영상](#시연-영상)
>    - [역할](#역할)
> 2. [사용 기술](#사용-기술)
>    - [기술적 고민](#기술적-고민)
>    - [아쉬웠던 점](#아쉬웠던-점)
> 3. [트러블 슈팅](#트러블-슈팅)
> 4. [인사이트](#인사이트)

<br />
<br />

## 프로젝트 소개

%{thumbnail}%

<br />

어트랙션은 기존 뉴스레터 시스템을 사용하면서 느꼈던 **정보의 파편화**, **불편한 UI 및 UX**, **개인 맞춤형 시스템의 부재** 등 다양한 문제를 해결하고자 구축하게 된 뉴스레터 통합 관리 서비스입니다.

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
        <img src="/public/docs/projects/attraction/images/introduce-1-light.png" data-dark-src="/public/docs/projects/attraction/images/introduce-1-dark.png" alt="뉴스레터 맞춤 추천 - 좋은 뉴스레터를 놓치고 싶지 않다면? 관심사를 기반으로 뉴스레터를 추천해드려요!" width="860" height="1864" />
      </td>
      <td>
        <img src="/public/docs/projects/attraction/images/introduce-2-light.png" data-dark-src="/public/docs/projects/attraction/images/introduce-2-dark.png" alt="메일함 자동 정리 - 쏟아지는 뉴스레터로 인해 메일함 정리가 힘드셨나요? 오직 뉴스레터에만 집중할 수 있도록 자동으로 모아드려요!" width="860" height="1864" />
      </td>
      <td>
        <img src="/public/docs/projects/attraction/images/introduce-3-light.png" data-dark-src="/public/docs/projects/attraction/images/introduce-3-dark.png" alt="뉴스레터 구독 관리 - 귀찮게 하나하나 찾아다닐 필요 없이 여러 뉴스레터를 한 곳에서 간편하게 관리해요!" width="860" height="1864" />
      </td>
    </tr>
  </tbody>
</table>

<br />
<br />

### 시연 영상

<video controls muted autoplay>
  <source src="/public/docs/projects/attraction/images/video.mp4" type="video/mp4" />
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

### 아쉬웠던 점

<br />
<br />

## 트러블 슈팅

<br />

<br />
<br />

## 인사이트

해당 프로젝트는 제가 처음 프론트엔드 개발자로써 참여한 프로젝트였고, 기획, 디자인, 개발 등 분야를 가리지 않고 정말 열정적으로 기여했던 프로젝트였습니다.

<br />
<br />
