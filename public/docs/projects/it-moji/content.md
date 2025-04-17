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
      <td>%{description}% 🧑🏻‍💻</td>
    </tr>
    <tr>
      <th>상태</th>
      <td>MVP 배포됨 (진행 중)</td>
    </tr>
    <tr>
      <th>유형</th>
      <td>%{type}%</td>
    </tr>
    <tr>
      <th>인원 구성</th>
      <td>프론트엔드 2명, 백엔드 1명</td>
    </tr>
    <tr>
      <th>역할</th>
      <td>프론트엔드 리드, UI/UX 디자인 총괄</td>
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
      <th>StoryBook</th>
      <td>https://it-moji.github.io/it-moji-client</td>
    </tr>
    <tr>
      <th>MAU</th>
      <td>집계 중</td>
    </tr>
    <tr>
      <th>사용 기술</th>
      <td data-tech-stack>
        <code>Next.js</code>&nbsp;<code>React</code>&nbsp;<code>React Compiler</code>&nbsp;<code>TypeScript</code>&nbsp;<code>Tanstack-Query</code>&nbsp;<code>Zustand</code>&nbsp;<code>Zod</code>&nbsp;<code>MSW</code>&nbsp;<code>pnpm</code>&nbsp;<code>StoryBook</code>&nbsp;<code>TailWindCSS</code>&nbsp;<code>Motion</code>&nbsp;<code>Mantine</code>&nbsp;<code>GitHub-Actions</code>&nbsp;<code>GitHub-Pages</code>&nbsp;<code>AWS-Amplify</code>&nbsp;<code>ESLint</code>&nbsp;<code>Husky</code>&nbsp;<code>commitlint</code>
      </td>
    </tr>
    <tr>
      <th>기여</th>
      <td>
        <ul>
          <li>출석 관리 기능 개발</li>
          <li>
            <p>공지사항 관리 기능 개발</p>
            <ul>
              <li>약 1주일간 신규 팀원 온보딩 목적의 페어 프로그래밍 진행</li>
            </ul>
          </li>
          <li>
            <p>출석 관리 기능 개발</p>
            <ul>
              <li>출석 옵션 설정 기능 개발</li>
              <li>배지 설정 기능 개발</li>
            </ul>
          </li>
          <li>리뷰를 통한 API Mocking Coverage 100% 수준으로 유지</li>
          <li>
            <p>서비스 배포 및 CI 환경 구축 전담</p>
            <ul>
              <li>프로덕션 및 테스트 서버 배포 자동화 환경 구축</li>
              <li>스토리북 문서 배포 자동화 환경 구축</li>
            </ul>
          </li>
          <li>대상 컴포넌트 별 스토리 및 인터랙션 테스트 작성</li>
          <li>프론트엔드 파트 리딩</li>
          <li>SEO 관련 메타데이터 작업</li>
          <li>웹 접근성 개선 및 반응형 작업</li>
          <li>서비스 기획 및 전반적인 UI/UX 디자인 검수</li>
        </ul>
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
>    - [주요 기능](#주요-기능)
>    - [운영진 대상 안내 영상](#운영진-대상-안내-영상-소리-o)
>    - [역할](#역할)
> 2. [사용 기술](#사용-기술)
>    - [기술적 고민](#기술적-고민)
> 3. [트러블 슈팅](#트러블-슈팅)
>    - [Barrel File 순환 참조 이슈](#barrel-file-순환-참조-이슈)
>    - [리액트 컴파일러 메모이제이션 관련 이슈](#리액트-컴파일러-메모이제이션-관련-이슈)
> 4. [인사이트](#인사이트)

<br />
<br />

## 프로젝트 소개

%{thumbnail}%

<br />

IT-MOJI는 **IT인들끼리 모여 지식을 나누는 모임**이라는 뜻으로 24년 02월 부터 참여중인 [모각코 스터디](https://github.com/Dev-Explorers/mogakko-2024) 커뮤니티를 IT 기술을 활용하여 편하게 운영하기 위해 시작된 프로젝트입니다. 진행중인 프로젝트이며, 현재는 MVP인 출석 관리 -> 디스코드 TIL 텍스트 파싱 기능까지 구현되어 있지만, 추후 스터디원 모집 관리, 스터디원 출석 집계 및 통계 관리 등 다양한 기능이 추가될 예정입니다.

<br />

### 주요 기능

<table data-max-md>
  <colgroup>
    <col width="50%" />
    <col width="50%" />
  </colgroup>
  <thead>
    <tr>
      <th>구현된 MVP 기능</th>
      <th>출시 예정 기능</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <ul>
          <li>
            스터디원 출석 관리 기능
            <ul>
              <li>디스코드 TIL 텍스트 파싱 기능</li>
              <li>출석 옵션 및 배지 관리 기능</li>
            </ul>
          </li>
          <li>공지사항 관리 기능</li>
        </ul>
      </td>
      <td>
      <ul>
        <li>
          스터디원 출석 관리 기능
          <ul>
            <li>출석 집계 및 통계 관리 기능</li>
          </ul>
        </li>
        <li>
          스터디원 모집 관리 기능
          <ul>
            <li>모집 공고 관리 기능</li>
          </ul>
        </li>
        <li>
          스터디원 등급 관리 기능
          <ul>
            <li>보상 및 휴가 관리 기능</li>
          </ul>
        </li>
        <li>스터디 소개글 관리 기능 (CMS)</li>
        <li>스터디 행사 관리 기능</li>
      </ul>
      </td>
    </tr>
  </tbody>
</table>

<br />

### 운영진 대상 안내 영상 (소리 O)

<video controls muted autoplay>
  <source src="/public/docs/projects/it-moji/assets/guide-video-1.mp4" type="video/mp4" />
</video>

<br />

### 역할

- 프론트엔드 개발 리드 및 운영, 전반적인 UI/UX 및 브랜딩 디자인을 총괄하였습니다.
- 프로젝트 초기 페어 프로그래밍을 도입하여 팀원과의 협의를 통해 컨벤션 수립을 이끌었습니다.
- 운영진 대상 페이지 사용법 안내 영상 또한 모두 직접 제작하였습니다.

<br />
<br />

## 사용 기술

<br />

### 기술적 고민

해당 프로젝트에서는 이전에 진행했던 팀 프로젝트인 <a href="/projects/attraction" title="어트랙션 프로젝트 소개글">어트랙션</a>에서 부족했었던 저 또는 팀원에 대한 의존도를 낮추는 것이 목표였기에, 팀원들의 숙련도, 프로젝트의 요구사항, 유지보수성 등을 종합적으로 고려하여 모든 기술 스택 선택에 임했습니다.

<br />

<br />
<br />

## 트러블 슈팅

<br />

### Barrel File 순환 참조 이슈

`stories.tsx` 파일에서 기본 컴포넌트와 다른 컴포넌트를 `args` 파라미터 또는 `render` 파라미터에서 렌더링하려고 시도할 경우 작성된 스토리 북 페이지 접근 시 아래와 같은 에러가 표기 되는 문제가 있었습니다.

<br />

<img src="/public/docs/projects/it-moji/assets/barrel-file-issue.png" alt="Barrel File 순환 참조 이슈 StoryBook 에러 메시지" width="2048" height="1120" />

<br />

해당 에러는 당시 팀에서 컨벤션으로 사용하고 있던 Barrel File 때문에 생긴 순환 참조(Circular Dependency) 이슈였습니다. 당시에는 참조하는 경로를 수정하여 해결했지만, 추가적으로 찾아보니 Barrel File을 사용할 시 프로젝트 실행 및 빌드 속도에 영향을 준다는 분석과 위와 같이 직간접적인 영향을 주는 사례를 몇 가지 확인할 수 있었습니다. Barrel File은 사용할 시 import 구문이 깔끔하게 작성되어 채택했던 컨벤션이지만 이러한 문제점들이 발견되었기에 아마 다음 프로젝트 부터는 Eslint 플러그인을 활용하여 import 구문을 재정렬하는 방식으로 Barrel File 컨벤션을 대체할 것 같습니다.

<br />
<br />

### 리액트 컴파일러 메모이제이션 관련 이슈

저희는 Mantine Tiptap 확장 라이브러리를 사용하여 텍스트 에디터가 필요한 기능을 구현하였습니다. 하지만 함께 사용하고 있던 React Compiler의 컴포넌트 메모이제이션 때문에 텍스트 에디터 컴포넌트가 정상적으로 리렌더링이 되지 않아 정상적으로 동작하지 않는 부분이 있어 `use no memo` 지시어를 적용하여 우회하였습니다.

<br />

> **참조**
>
> - [Rich text editor | Mantine](https://mantine.dev/x/tiptap/)
> - [it-moji-client/src/shared/ui/editor/text-editor.tsx](%{githubURL}%/blob/main/src/shared/ui/editor/text-editor.tsx)

<br />
<br />

## 인사이트

2명으로 시작한 작은 팀이지만 처음으로 프론트엔드 팀을 리드해 본 프로젝트입니다. 저 또는 팀원이 없어도 프로젝트가 원활히 진행되는 것을 1순위 목표로 모든 프로세스에 임했습니다.

<br />
<br />
