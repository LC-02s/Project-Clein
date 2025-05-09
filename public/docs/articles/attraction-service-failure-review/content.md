> &#128226; 어트랙션 프로젝트에 대한 소개글은 <a href="/projects/attraction" title="어트랙션 프로젝트 소개글">여기</a>에서 보실 수 있습니다.

<br />
<br />

## 1. 해당 글을 쓰게된 배경

24년 4월부터 시작한 Gmail 기반 뉴스레터 관리 서비스 어트랙션을 얼마 전 팀원들과의 협의하에 내려놓게 되었습니다. 처음 겪어보는 뼈아픈 실패이지만 그럼에도 배울 점이 많다고 생각했습니다. 서비스 운영에 실패한 대부분의 이유를 기술적인 문제라고 판단하였기 때문이죠. [2024년 회고](/blog/2024-review#attraction)글에서도 잠깐 다루었습니다만 해당 글에서는 프론트엔드 개발 외적인 내용을 위주로 다루었고, 이번 글에서는 서비스 운영에 실패한 이유 중 기술적인 내용에 중점을 두고 다뤄보도록 하겠습니다.

<br />
<br />

~~아래 이미지의 심정으로 썼습니다.~~

<br />

<img src="/public/docs/articles/attraction-service-failure-review/assets/interstellar.png" alt="지금 심정 (인터스텔라)" width="1400" height="770" />

<br />
<br />

## 2. 기술 이해도 부족

저희 팀은 전반적인 분야에서 기술 이해도가 부족했었고, 취준생 입장에서의 학습이라는 명목아래에 다른 개발자들이 그에 준하는 실력을 가졌음에도 라이브러리를 사용하는 이유를 간과하고 있었던 것이 가장 큰 문제였던 것 같습니다. 개개인이 가진 능력치에 대한 이해가 부족했고, 한정된 시간 안에서 최선의 결과를 내는 것을 너무 고려하지 않았죠. 그래도 어트랙션 덕에 코드는 사용자가 없으면 의미가 없다는 것을 깊이 깨닫게 된 것 같습니다. 코드가 창출하는 가치에 집중하게 된 것 같아요.

<br />

상세한 내용은 아래에서 기술 별로 하나씩 다뤄보겠습니다.

<br />
<br />

### 2-1. Next.js

프론트엔드 팀원들 또한 전부 Next.js를 접해봤었기도 했었고, B2C 서비스를 설계하였기에 Next.js가 주는 좋은 UX를 놓칠 수 없어 도입했었습니다. 지금 시점에 다시 검토해도 서비스의 기획을 고려해보면 Next.js는 나쁜 선택이 아니었던 것 같습니다. 그저 사용하는 방법이 잘못됐었던 것이죠.

<br />

#### 2-1-1. 서버 컴포넌트

당시에는 서버 컴포넌트를 너무 잘못 이해하고 있었습니다. 서버 컴포넌트는 정리해보면 기존에 작성하던 컴포넌트를 서버의 작업 단위와 클라이언트의 작업 단위로 분리하여 로직에 해당하는 부분은 서버에서 수행하고, 하위로 전달되는 `props`를 클라이언트에서 `fetch`를 통해 `RSC Payload`로 받아오는 것을 프레임워크 수준에서 자동화 해주는 개념이지만, 당시에는 서버 컴포넌트를 `SSR`이라고 이해하고 있었기 때문에 지금 다시 보기에는 이해하기 힘든 선택을 많이 했었던 것 같습니다. 아예 다른 개념인데 말이죠.

<br />

어트랙션의 주요 로직 중 하나인 뉴스레터 아티클 `HTML` 뷰어 기능을 개발하던 당시 뉴스레터가 자체적으로 제공하는 구독 취소 링크를 검열한 후 클라이언트에 전달해줘야하는 상황이 있었습니다. 저희는 뉴스레터에 대한 구독과 구독 취소 상태 또한 관리해 주었기 때문에 따로 벤더에서 제공되는 구독 취소 기능을 사용한다면 해당하는 뉴스레터에 대한 싱크가 틀어지기 때문이었죠. 백엔드에서는 성능과 비용상의 이유로 뉴스레터에 대한 검열되지 않은 정적 `HTML` 파일만을 `S3`를 통해 관리하고 있는 상황이었습니다.

<br />

저는 해당 기능을 서버 컴포넌트와 `HTML React Parser` 라이브러리의 조합으로 구현했었습니다. 물론 서버 컴포넌트를 사용해도 목적은 달성할 수 있었지만 문제는 하이드레이션 에러가 계속 났던 것이죠. 하이드레이션 에러가 날 수 밖에 없었던 이유가 벤더에서 제공해주는 뉴스레터들에는 표준에 맞지 않는 `HTML` 문법이 사용된 경우가 많았습니다. 일례로는 `body` 태그와 `head` 태그 사이에 `img` 태그를 넣는 벤더도 있었습니다. (이해하기 어렵지만 아마 행동 분석 도구의 이유일 것 같습니다.) 하이드레이션 에러가 나도 정적 `HTML`을 보여주기만 하면 되는 부분이어서 큰 문제는 없었지만 디버깅을 방해했고, 저의 멘탈을 갉아 먹었죠. 지금 다시 구현한다면 아마 같은 환경에서 서버 컴포넌트를 `Route Handler`와 `ReactDOMServer.renderToString` 메서드로 대체할 것 같습니다.

<br />

#### 2-1-2. Server Side Rendering

해당 내용은 퀄리티에 관련된 부분이지만 `SSR` 이해도 또한 낮았습니다. Next.js는 처음 페이지 진입 시에는 `SSR` 기법을 사용하여 빠르게 마크업 먼저 전달하는 방식을 사용합니다. 이후 하이드레이션 기법을 적용하여 스크립트를 적용해주는 절차를 거치기 때문에 일반적인 리액트처럼 마크업과 스크립트가 한번에 적용되지 않고 스크립트가 실행되는 시점이 지연되죠. 이때 처음 전달되는 마크업은 `useState` 같이 하이드레이션 이후 값이 갱신됨에 따라 UI에 영향을 주는 로직을 사용했다면 미리 설정해둔 기본값을 따라가게 됩니다.

<br />

어트랙션에서도 역시 하이드레이션 이후 값이 갱신됨에 따라 UI에 영향을 주는 로직인 반응형 `breakpoint` 로직을 활용하여 UI를 작성했지만, `breakpoint`를 사용하는 UI 로직에서 `SSR` 시점에 필요한 기본값에 대한 대응을 하나도 해두지 않아 페이지를 새로고침 하거나 처음 진입했을 때 의도한 `breakpoint`와 맞지 않다면 UI가 뒤틀렸다가 다시 돌아오고는 했습니다. 레이아웃 쉬프트 문제가 있었던 것이죠. 해당 문제는 발견하긴 했는데 너무 늦게 발견한 것이 문제였습니다.

<br />

#### 2-1-3. 에러 핸들링과 예외 처리

전반적인 에러 핸들링과 예외 처리 로직 작성에 미흡하기도 했었습니다. 각각의 에러를 코드로 분리하여 관리하는 방법론도 있고 커스텀 예외 처리 클래스를 작성하여 관리하는 방법도 있었지만 저희는 그런거 없이 `throw new Error('')`를 통해 모든 예외를 에러로 통합해 버렸고, 그렇게 각 예외 상황을 판단할 수 없다보니 적절한 대응 로직을 작성하지 못해 `Error Boundary` 컴포넌트만 남용하게 되었습니다. 해당 내용은 백엔드 파트에서도 고려되었어야 하는 내용이지만 다들 프로젝트 경험이 적다보니 놓치고 지나갔던게 아쉬웠던 것 같습니다. 그래도 해당 경험 덕분에 예외 처리 로직에 대한 중요성을 알게된 것은 다행이라고 생각합니다.

<br />
<br />

### 2-2. TailWindCSS

팀원들과의 합의하에 `CSS` 프레임워크로 `TailWindCSS`를 도입했습니다. Next.js를 사용하며 별도의 `SSR`에 대한 설정이 필요 없기도 했고 각자의 선호에 따른 결정이었습니다. `TailWindCSS`를 도입한 것은 좋은 선택이었지만, 역시나 문제는 사용하는 방식이었습니다. 물론 다들 `TailWindCSS`에 미숙하기도 했었고 당시에는 바쁜 일정을 소화하기 위해 되는대로 로직을 작성했던 것이었지만 정도의 차이인 것 같습니다. 아래는 당시 사용했었던 공용 컨테이너 컴포넌트인데 `className props`를 아무런 후처리 없이 그대로 사용했었습니다.

<br />

```tsx
export default function Container({ children, className }: PropsWithChildren<ContainerProps>) {
  return (
    <div
      className={`w-full ${className ?? ''} border-gray-100 bg-white md:rounded-2xl md:border dark:border-gray-800 dark:bg-gray-800`}
    >
      {children}
    </div>
  )
}
```

<br />

공용 컴포넌트의 목적에 부합하지 않는 로직이었죠. 다른 스타일을 병합하는 것이 보장되지 않으니 그대로 사용하는 것을 제외하면 거의 사용하지 않았습니다. 다른 태그를 추가하며 스타일을 병합하는 것이 관습이 되어 `DOM` 요소의 뎁스가 불필요하게 깊어진 원인을 제공하였죠. 그래도 해당 행태에 대한 문제가 나중에라도 제기되어 추후에는 `tailwind-merge` 라이브러리를 도입하여 관리하는 방식으로 컨벤션을 정하게 되었지만 이미 레거시 코드는 만들어질 만큼 만들어진 상태였습니다. 해야할 일이 너무 많아진 상황에서 리팩토링 작업은 항상 후순위로 밀렸고 그렇게 잊혀져 갔죠.

<br />
<br />

### 2-3. 디자인 시스템

저희는 초기 단계에서 추후 어드민 페이지와 모바일 앱 등으로 서비스를 점차 확장해 나가고 싶었기 때문에 관리의 편의성을 이유로 모노레포를 도입했었습니다. 저희는 당시 `Turbo Repo` 나 `Lerna` 같은 라이브러리를 사용해서 환경을 구축하는 것도 고려하긴 했었지만 학습의 이유로 `pnpm workspace`와 함께 직접 환경을 구축하는 것을 선택했었습니다.

<br />

동시에 어드민 페이지와 모바일 앱 등 추후 도입될 여러 서비스에서도 디자인 일관성을 보장하고자 디자인 시스템을 도입했었습니다. 해당 선택은 모노레포까지 사용하기로 한 시점에서 꽤 괜찮은 선택 같았죠. 프로젝트 극 초기에는 시간상의 이유로 `Shadcn/UI` 와 `Class-Variance-Authority` 라이브러리를 활용하여 디자인 시스템 없이 자주 사용할 컴포넌트로 구성만 해두고 실질적인 스타일은 적용하지 않은 상태였습니다.

<br />

당시 제가 프로덕트의 모든 디자인을 담당하고 있었는데 기존 디자인 시스템이 상기의 이유로 제 기능을 하지 못해 항상 마크업과 스타일링 파트에서 문제가 있어 검수를 하기 십상이었습니다. 그래서 저는 리팩토링 스프린트 때 기존 `Shadcn/UI`로 구성했던 기존의 디자인 시스템을 점진적으로 저희만의 온전한 커스텀 디자인 시스템으로 바꾸는 작업을 하게 되었습니다. 기존 디자인 시스템에 멋모르고 설정해둔 `TailWindCSS`의 `Prefix`의 차이로 인한 유틸리티 클래스가 중복되는 문제도 있었어서 `Mantine` 라이브러리를 참고하여 `SCSS` 기반으로 완전히 다시 만드는 것을 목표했습니다.

<br />

디자인 시스템에서의 가장 큰 문제점은 기술에 대한 이해도 부족과 디자인 시스템 구축을 너무 쉽게 생각했다는 것입니다. 총 한 달 정도의 시간을 들여 디자인 시스템을 리뉴얼 하는 작업을 진행했지만 결과는 크게 좋지 못했습니다. 만들어진 작업물의 퀄리티는 당연히 `Mantine` 라이브러리 보다 떨어졌고, 무엇보다 이미 만들어진 라이브러리를 활용하는 선택을 했다면 투입되는 시간을 아껴 서비스에 필요한 다른 부족한 부분을 보완하는데 사용하는 것이 훨씬 더 가치가 있었을 것 같아요. 다시 동일한 상황으로 돌아간다면 `Mantine` 라이브러리를 커스텀하는 방식을 시도해 볼 것 같습니다.

<br />
<br />

### 2-4. FSD 아키텍처

저희는 프로젝트 초기에 기본 폴더 구조를 FSD 아키텍처로 합의했었습니다. 이건 제가 당시 개인 프로젝트에서 잘 썼던 기억이 있어 제안하였고, 관련 논의에서 팀원 중 한분은 반대하고 한분은 찬성하여 결국 채택되었습니다.

<br />

FSD 아키텍처는 생각보다 어려웠던게 문제였습니다. 팀 프로젝트에서 한 번도 제대로 써보지 않은 팀원 3명이서 감당할 수 있는 수준이 아니었죠. 가장 큰 문제는 공식 문서에 대한 해석이 전부 달랐습니다. 레이어에 대한 해석이 전부 달라서 어떤 폴더에 어떤 코드가 있는지 예측할 수 없었고, 함께 사용했던 Barrel File 컨벤션도 `index.ts` 파일을 어디까지 적용해야하는지에 대한 기준이 명확하지 않아서 코드의 가독성이 매우 떨어졌습니다. 이는 유지보수에 매우 큰 악영향을 주는 결과를 초래했죠.

<br />

지금 다시 생각해보면 FSD 아키텍처에 대한 이해도가 부족했던 것도 문제였지만, 복합적으로는 커뮤니케이션 문제가 가장 심했던 것 같습니다. 아래에서 조금 더 다룰 예정이지만, 이슈 트래킹 도구를 사용해서 문제가 생길 때 마다 팀 내에서 적절한 해결책을 논의 후 구성원간의 합의를 마치고, 코드 리뷰 절차를 도입해서 작성하는 코드 퀄리티에 대한 검사를 했다면 미연에 방지할 수 있는 문제였던 것 같습니다.

<br />
<br />

### 2-5. MSW (Mock Service Worker)

저희 팀은 일정이 급했기 때문에 프로젝트 초기 백엔드 서버가 구축되지 않은 상태에서 프론트엔드 파트의 개발 속도를 조금 더 높이기 위해 MSW를 도입했었습니다. 하지만 Next.js 14버전에서는 MSW가 공식적으로 지원되지 않아 브라우저 환경과 서버 환경을 각각 셋업해주어야 했고, 저희는 해당 작업 대신 약간의 꼼수로 Next.js의 프록시 기능을 활용해서 Mocking 환경을 구축했었습니다. 하지만 그렇게 도입한 `MSW` 또한 문제점이 있었죠.

<br />

#### 2-5-1. 팀원 로컬 환경 내 간헐적 오동작 문제

셋업한 환경이 팀원 3명 중 1명의 로컬 환경에서만 제대로 동작하지 않는 문제가 있었습니다. 로컬 환경 문제는 해당 팀원의 로컬 환경에서 간헐적으로 발생했었습니다. 잘 되다가 한번씩 안되는 문제였죠. 당시 약 3일 정도의 시간을 써서 개선해보려 했지만 실패했었고, 팀 멘토님에게 해당 문제에 대해 멘토링을 받으러 갔을 때 들었던 답변은 처음 보는 이슈긴 하지만 `MSW`를 도입한 이유가 개발 일정 때문인데 이 문제로 일정을 더 사용하는 것은 목적에 부합하지 않는다는 내용이었습니다. 지금 추측해보면 확실하진 않지만 아마 FSD 아키텍처와 함께 사용했었던 Barrel File 컨벤션에서 순환 참조를 일으켜서 생긴 문제였던 것 같습니다.

<br />

#### 2-5-2. Mocking 로직에 대한 관리 미흡

다른 하나는 Mocking 로직에 대한 관리가 미흡했다는 점입니다. 해당 내용은 테스트 코드를 작성할 때에도 동일하게 적용되는 내용인데 서비스에서 실제로 동작하는 코드가 아닌 코드를 검증하기 위한 코드는 꾸준한 관리가 동행되어야 합니다. 저희는 프로젝트 초기 백엔드 서버가 제대로 구성되지 않았을 시점에는 관리를 조금씩 해오다가 잦은 기획 변경에 따른 인터페이스 변경과 바쁜 일정에 밀려 점점 Mocking 로직 관리에 소홀히하게 되었고, 중반쯤 되서는 제대로 동작하는 Mocking 로직을 찾아보기 힘든 수준이 되었죠. 결국 프로젝트에서 모든 Mocking 로직과 `MSW`를 걷어내게 되었고, 해당 결정은 추가로 2가지 문제를 야기했습니다.

<br />

첫 번째는 추가 문제는 새로운 기능을 구현할 때 백엔드에 대한 의존성이 생겼던 것 입니다. `MSW`는 Node.js 환경 HTTP 클라이언트 라이브러리인 `undici`의 `MockAgent` 기능을 사용하기에, 한 번 셋업하게 되면 모든 `fetch` 요청을 가로채게됩니다. 이런 특성상 Mocking을 도입하려면 서비스에 사용되고 있는 모든 API를 Mocking 해두어야 정상적으로 사용할 수 있어, 도중에 선택적으로 도입하는 것이 사실상 불가능했었습니다.

<br />

두 번째 추가 문제는 백엔드 서버가 내려간 이후로는 사실상 프론트엔드 관련 작업이 불가능하게 되었습니다. 프론트엔드 서버는 엔트리 레벨에서는 거의 비용이 나오지 않지만 백엔드 서버는 운영하려면 고정적인 비용이 지출되어 서비스 리팩토링 후 재오픈을 하려고 할 때 잠시 내려두고 작업하려 했었지만, 백엔드 서버를 내리게 되면 프론트엔드 로컬 환경을 실행할 수 없는 수준이었습니다. 해당 문제도 유지보수에 매우 큰 악영향을 주게 되었죠.

<br />
<br />
<br />

## 3. 협업 프로세스 이해도 부족

저는 서비스를 유지보수 하지 못하게 된 대부분의 이유가 기술적인 문제 때문이라고 생각했었는데, 글을 작성하면서 다시 돌아보니 오히려 협업 프로세스에 대해 무지했던 것이 가장 큰 문제였던 것 같습니다. 당장에 직면한 에러를 해결하는 것에는 기술에 대한 이해도가 중요하지만, 서비스를 유지보수하는 입장에서는 기술에 대한 이해도 보다 적절한 협업 프로세스를 뒷받침 해주는 것이 더욱 중요한 것 같아요. 결국 모두 사람이 하는 일이기 때문이죠.

<br />

상세한 내용은 아래에서 토픽 별로 하나씩 다뤄보겠습니다.

<br />
<br />

### 3-1. 컨벤션 수립

저희 팀은 코드의 작성 방식에 대한 컨벤션을 상세하게 수립하지 않았었습니다. 팀원 각자가 선호하는 코드 작성 방식이 모두 달랐고 이는 코드 베이스의 전반적인 가독성과 유지보수성이 크게 저하되는 문제를 야기했습니다. 해당 문제는 프로젝트를 처음 구축할 때에는 크게 느끼지 못했었지만 코드를 유지보수해야 하는 시점에서 도드라졌습니다. 다른 팀원이 작업했던 코드를 바로 이해하기 어려웠고, 이미 수 많은 코드들이 제각각의 컨벤션으로 작성되어 이를 통일하려고 접근하는 것조차 큰 비용이 요구되었습니다. 해당 문제도 유지보수를 포기하게된 주된 이유 중 하나였습니다.

<br />
<br />

### 3-2. 문서화

이제껏 많은 문제가 있었지만 문서화를 소홀이 한 것은 가장 치명적인 문제라고 생각합니다. 회의를 하고 난 후에 회의록을 작성해두지 않으니 각자의 이해도가 다른 것 이전에 작업을 한 이후 서로 하는 말이 달랐습니다. 제대로 작업 단위를 분리하지도 않았고, 일정 산출도 너무 대략적으로만 했던 것 같습니다. 이는 종합적으로 작업의 비효율을 야기했죠. 아래의 `AWS`의 경우와 같이 복합적으로 문제가 되기도 했었습니다.

<br />

#### 3-2-1. AWS S3 & CloudFront

저희 팀은 프론트엔드 3명, 백엔드 3명으로 넉넉하게 구성되었기 때문에 각자 프로젝트에서 하고 싶은 것이 있다면 최대한 밀어주었습니다. 지금 생각해보면 적극적으로 말렸어야 했지만 이미지 처리를 담당하신 한 팀원분께서 프론트엔드에서 `S3`와 `CloudFront`를 관리하고 싶다고 하셨고, 그대로 도입하게 되었습니다. 사실 당시에도 좋은 생각은 아닌 것 같다는 의견을 냈었지만 관련해서 설득하는 능력 자체가 부족했었던 것 같습니다. 반대했던 이유는 해당 기능이 데이터의 생성 또는 삭제 시점에 따라 포함된 이미지에도 영향을 주는 형태였습니다. 백엔드에서 주도권을 가져야하는 기능이었던 것이죠.

<br />

그럼에도 도입하면 서비스의 복잡도만 올라갈 뿐이지 관리가 불가능한 수준은 아니긴 했습니다. 더 큰 문제는 따로 있었죠. 담당자 분이 중간에 팀을 나가게 되었습니다. 그럼 다른 팀원이 이어서 관리하면 되는 것 아니냐라고 하실 수 있지만 저희는 코드 리뷰도 제대로 하지 않았고, 제대로된 문서화나 인수인계도 하지 않아 관리하려면 기능 자체를 다시 만들어야 하는 상황이 되었습니다. 해당 문제도 유지보수에 큰 타격을 주었죠.

<br />

해당 일을 겪고 나니 팀 프로젝트에서 개발자로써 임해야하는 자세를 조금 알게되었습니다. 복잡한 기능을 화려한 기술으로 구현하는 것을 덕목으로 삼을게 아니라, 나라는 개인에게 무슨 일이 있어도 팀에는 지장이 없게 하는 것이 진정한 실력인 것 같습니다.

<br />
<br />

### 3-3. 협업 툴의 파편화

어트랙션에서는 서비스 관리상의 이유로 몇가지 `SaaS`를 도입했었습니다. `Amplitude`, `Channel Talk`, `Sentry` 등 서비스 운영을 위한 목적으로 사용되는 도구들은 어쩔 수 없었지만 문제는 협업 도구를 불필요하게 너무 많이 사용했던 것이었죠. `GitHub` 부터 시작해서 `Jira`, `Notion`, `Naver Works`, `Slack`, `Discord`, `Google Sheets`, `Figma` 등 지금 보니 정말 다양하게 사용했네요. 안그래도 사용하던 `SaaS`들도 각각의 관리 도구를 제공하는데 협업 도구까지 다양하게 사용하니 PC에 상시로 띄워두는 도구만 11개가 되었습니다. `IDE`까지 포함하면 12개네요.

<br />

협업 툴의 파편화는 결국 작업 단위별 히스토리 변경을 추적하기 힘들게 하였고, 팀원간의 진행 상황 공유에 대한 참여도 하락을 야기했습니다. 구성원 전부가 각각의 툴에 대한 숙련도가 부족한 상황에서 적응해야하는 툴이 너무 많았던 것도 문제가 되었죠. 다시 돌아간다면 목적이 비슷한 몇가지 툴은 통합하여 관리할 것 같습니다.

<br />

개인적으로는 `Jira` 대신 `GitHub`에서 제공하는 `Issue` 탭과 `Discussions` 탭을 활용하고 `Private`한 히스토리 변경이나 내부에서만 공유해야할 자료는 `Discord`를 활용하여 누적하는 것이 오히려 더 좋았을 것 같습니다. 당시 기본적인 커뮤니케이션 도구로는 `Discord`를 사용하고 있었지만 `Slack`은 온전히 웹훅을 이용한 알림 시스템을 구축하기 위한 용도로 사용했기에 아래 처럼 `Discord`에서 제공하는 웹훅을 활용해서 알림 시스템을 구축했다면 `Slack` 또한 사용하지 않아도 됐었을 것 같네요.

<br />

(실제로 최근 프론트엔드 리드를 맡게된 프로젝트에서는 그렇게 진행 중입니다. 소규모 팀에서는 디스코드만 한 게 없는 것 같아요.)

<br />

<img src="/public/docs/articles/attraction-service-failure-review/assets/discord-webhook-example-light.png" data-dark-src="/public/docs/articles/attraction-service-failure-review/assets/discord-webhook-example-dark.png" alt="디스코드 웹훅 사용 예시" width="1380" height="344" />

<br />
<br />

## 4. 마무리

이렇게 쭉 정리해보니 앞으로 팀 프로젝트를 할 때 가져야하는 자세와 기술을 다루는 목적에 대해 다시 한 번 재고해볼 수 있었던 것 같습니다. 처음 시작은 온전히 저를 위한 회고였지만, 제가 했던 실패 경험을 통해 이 글을 읽는 독자 분이 비슷한 이유로 실패를 하지 않게 되면 그것 만으로도 이 글은 작성한 의미가 생길 것 같아요.

<br />

긴 글 읽어주셔서 감사합니다. 😊

<br />
<br />
