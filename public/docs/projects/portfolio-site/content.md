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
      <td>https://clein-dev.com</td>
    </tr>
    <tr>
      <th>GitHub</th>
      <td>%{githubURL}%</td>
    </tr>
    <tr>
      <th>사용 기술</th>
      <td data-tech-stack>
        <code>Next.js</code>&nbsp;<code>React</code>&nbsp;<code>React Compiler</code>&nbsp;<code>TypeScript</code>&nbsp;<code>Zustand</code>&nbsp;<code>Tanstack Query</code>&nbsp;<code>TailWindCSS</code>&nbsp;<code>Motion</code>&nbsp;<code>MDX</code>&nbsp;<code>pnpm</code>
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
>    - [정보 구조도](#정보-구조도)
> 2. [사용 기술](#사용-기술)
> 3. [인사이트](#인사이트)

<br />
<br />

## 프로젝트 소개

%{thumbnail}%

<br />

소개 랜딩페이지, 이력서, 블로그, 참여했던 프로젝트 모음 등의 내용으로 구성된 Next.js 기반 개인 포트폴리오 사이트 프로젝트입니다. 디자이너 시절부터 가지고 싶었던 제 작업물들을 모아두는 사이트와 함께 블로그 및 이력서를 포함하는 저의 모든 포트폴리오들을 한 곳에 정리해두고 편하게 보여주기 위해 만들게 되었습니다.

<br />

### 정보 구조도

<table data-max-md>
  <thead>
    <tr>
      <th>작업 단위</th>
      <th colspan="2">기능 및 구성</th>
      <th>상세 내용</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td rowspan="4">메인 랜딩 페이지</td>
      <td colspan="2">사이트 키 비주얼</td>
      <td></td>
    </tr>
    <tr>
      <td colspan="2">간단 소개 및 비전</td>
      <td>Reveal 애니메이션 효과</td>
    </tr>
    <tr>
      <td colspan="2">선호 기술 Scroll Parallax UI</td>
      <td>Framer Motion 활용 <a href="/blog/improve-scroll-parallax-performance" title="Scroll Parallax UI 프레임 드랍 이슈 개선하기">(참조)</a></td>
    </tr>
    <tr>
      <td colspan="2">이메일 또는 디스코드 기반 <code>contact</code> 기능</td>
      <td data-gray>(기획 중, 추후 구현 예정)</td>
    </tr>
    <tr>
      <td rowspan="8">공통 레이아웃</td>
      <td rowspan="4">헤더</td>
      <td>로고 및 사이트 네비게이션</td>
      <td>클릭 시 해당하는 페이지 이동</td>
    </tr>
    <tr>
      <td rowspan="2">통합 검색창</td>
      <td>단축키 및 키보드 접근성 지원</td>
    </tr>
    <tr>
      <td>블로그 및 프로젝트 소개글 키워드 검색 가능</td>
    </tr>
    <tr>
      <td>테마 변경 드롭다운</td>
      <td>Flicker 현상 X, 테마 동기화 지원 <a href="/blog/no-flicker-dark-mode" title="새로고침할 때 깜빡이지 않는 완성형 다크 모드 구현하기">(참조)</a></td>
    </tr>
    <tr>
      <td rowspan="4">푸터</td>
      <td>로고 및 사이트 네비게이션</td>
      <td>클릭 시 해당하는 페이지 이동</td>
    </tr>
    <tr>
      <td>Buy Me a Coffee</td>
      <td>Toss 송금 QR 코드 활용</td>
    </tr>
    <tr>
      <td>이메일 및 연관 링크</td>
      <td>이메일 클립보드 복사 가능</td>
    </tr>
    <tr>
      <td>카피라이트 출력</td>
      <td></td>
    </tr>
    <tr>
      <td rowspan="7">About 페이지</td>
      <td colspan="2">개발자 소개</td>
      <td data-gray>(추가 예정)</td>
    </tr>
    <tr>
      <td colspan="2">사용 기술</td>
      <td data-gray>(추가 예정)</td>
    </tr>
    <tr>
      <td colspan="2">프로젝트 경험</td>
      <td data-gray>(추가 예정)</td>
    </tr>
    <tr>
      <td colspan="2">업무 경험</td>
      <td data-gray>(추가 예정)</td>
    </tr>
    <tr>
      <td colspan="2">대외 활동</td>
      <td data-gray>(추가 예정)</td>
    </tr>
    <tr>
      <td colspan="2">자격증</td>
      <td data-gray>(추가 예정)</td>
    </tr>
    <tr>
      <td colspan="2">관심사</td>
      <td data-gray>(추가 예정)</td>
    </tr>
    <tr>
      <td rowspan="15">Blog 페이지</td>
      <td rowspan="8">리스트 뷰</td>
      <td>개발자 약식 프로필</td>
      <td>이름, 소개글, GitHub 링크, 이메일 구성</td>
    </tr>
    <tr>
      <td>블로그 글 정렬 방식 변경 드롭다운</td>
      <td>옵션 클릭 시 블로그 정렬 방식 변경</td>
    </tr>
    <tr>
      <td rowspan="4">블로그 목록 출력</td>
      <td>썸네일, 제목, 설명, 날짜, 분량 구성</td>
    </tr>
    <tr>
      <td>썸네일 동적 생성 가능 (템플릿 형식)</td>
    </tr>
    <tr>
      <td>페이지네이션 적용</td>
    </tr>
    <tr>
      <td>클릭 시 블로그 상세 뷰 이동</td>
    </tr>
    <tr>
      <td rowspan="2">키워드 별 조회 기능</td>
      <td>태그, 시리즈, 프로젝트 구성</td>
    </tr>
    <tr>
      <td>클릭 시 키워드 별 블로그 리스트 뷰 이동</td>
    </tr>
    <tr>
      <td rowspan="7">상세 뷰</td>
      <td>블로그 상세 정보 출력</td>
      <td>제목, 설명, 작성자 정보, 생성 및 수정 날짜, 분량, 썸네일 구성</td>
    </tr>
    <tr>
      <td rowspan="2">블로그 공유 기능</td>
      <td>링크 클립보드 복사 가능</td>
    </tr>
    <tr>
      <td>Share API 활용 네이티브 공유 가능</td>
    </tr>
    <tr>
      <td>블로그 내용 출력</td>
      <td>마크다운 형식 및 MDX Parser 활용</td>
    </tr>
    <tr>
      <td>관련 키워드 출력</td>
      <td>클릭 시 관련 키워드 별 리스트 뷰 이동</td>
    </tr>
    <tr>
      <td>이전 및 다음 블로그 글 출력</td>
      <td>클릭 시 해당하는 블로그 상세 뷰 이동</td>
    </tr>
    <tr>
      <td>댓글 출력 및 작성 기능</td>
      <td>GitHub OAuth 기반 (Giscus 활용)</td>
    </tr>
    <tr>
      <td rowspan="5">Project 페이지</td>
      <td rowspan="2">리스트 뷰</td>
      <td rowspan="2">프로젝트 목록 출력</td>
      <td>썸네일, 제목, 설명, 기간, 유형, GitHub 링크, 도메인 주소 구성</td>
    </tr>
    <tr>
      <td>Reveal 애니메이션 효과</td>
    </tr>
    <tr>
      <td rowspan="3">상세 뷰</td>
      <td>소개글 개요 출력</td>
      <td>썸네일, 제목, 설명, 기간, 유형, GitHub 링크, 도메인 주소, 역할, 사용 기술, 기여 구성</td>
    </tr>
    <tr>
      <td rowspan="2">소개글 내용 출력</td>
      <td>마크다운 형식 및 MDX Parser 활용</td>
    </tr>
    <tr>
      <td>컨텐츠 매핑 기능 적용</td>
    </tr>
    <tr>
      <td rowspan="2">Playground 페이지</td>
      <td colspan="2">커스텀 키보드 모음집</td>
      <td data-gray>(추가 예정)</td>
    </tr>
    <tr>
      <td colspan="2">디자인 작업물 박제관</td>
      <td data-gray>(추가 예정)</td>
    </tr>
  </tbody>
</table>

<br />
<br />

## 사용 기술

포트폴리오 사이트에 사용된 기술과 사용한 이유입니다.

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
- 마크다운 문서에 `HTML` 문법을 사용할 시 올바르게 파싱되지 않는 문제가 있어 정규 표현식을 활용한 [전처리 로직](%{githubURL}%/blob/main/src/widgets/content/lib/index.ts)을 추가하였습니다.

<br />

### pnpm

- 배포 파이프라인에서의 빌드 속도와 로컬 환경에서의 패키지 용량 관리를 위해 도입하였습니다.

<br />
<br />

## 인사이트

해당 프로젝트에서는 처음으로 검색 엔진 최적화를 시도해 보았습니다. 검색 엔진 최적화를 진행하며 얻었던 가장 큰 인사이트는 기술적인 부분 만큼이나 컨텐츠의 설계가 중요하다는 점이었습니다. 초기에는 메타 태그, Open Graph, 정적 페이지 생성 같은 기술적 요소에 집중했지만, 구글 서치 콘솔을 활용하여 크롤링 오류나 검색 노출 상태를 주기적으로 점검하며 추론해본 결과 실제 검색 노출에 영향을 준 요인은 페이지 간 명확한 계층 구조와 검색 의도에 맞는 키워드 중심의 컨텐츠라는 점을 알 수 있었습니다. 앞으로도 검색 엔진 최적화가 중요한 작업을 할 때에는 접근성을 고려한 좋은 컨텐츠 자체를 만드는 것에 집중해 볼 예정이며, 검색 노출에만 그치지 않고 이탈률에 큰 영향을 주는 UX적인 측면인 페이지 로딩 속도 개선, Web Vitals 지표 향상, 정적 자원 최적화 등 퍼포먼스 측면에서도 꾸준히 다듬어갈 생각입니다.

<br />
<br />
