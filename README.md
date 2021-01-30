## 개념 증명(Proof of Concept)을 위한 미니 프로젝트 

> 작업 중인 프로젝트<sup>[1](#footnote_1)</sup> 의 컨셉을 소개할 개념 증명의 일부를 먼저 제시하고자 함 

### 1. 동기 (Motivation) 및 증명 대상

<br/>

본 **_미니 프로젝트_** 를 시작하게 된 **_주요 동기_**:   

<details>
<summary>...더 읽기</summary>

* __개념 증명 및 예광탄 개발__: 프로젝트의 기능과 규모가 점차 커지게 되면, 의존성 라이브러리 패키지 충돌이나 이전에 미처 검토하지 않았던 기술 도입에 따른 요구 사항이 증가함에 따라, 최소한의 기능으로 변경의 파급효과를 사전에 테스트 하기 위한 미니 프로젝트가 필요하게 되었습니다.

* __프로젝트 컨셉 조감도__: 작업 중인 프로젝트를 CI / CD 운영 환경에서 정상 배포하기 까지, 프로젝트의 전체적인 컨셉(사용된 기술, 개념 증명)을 요약하여 보여줄 수 있는 미니 프로젝트가 필요하게 되었습니다. 

</details>

<br/>

본 **_미니 프로젝트_** 를 통해 **_증명하고자 하는 것_** 들: 

<details>
<summary>...더 읽기</summary>

* __테스트 주도 개발__: e2e 테스트 도구(cypress)와 유닛 테스트 도구(jest)를 이용하여 주요 테스트 기법(SUT, fixtures / stub, fake, mock, spy)의 개념을 이해하고 과 red-green-blue 워크플로를 사용하여 안전하게 지속적으로 변경 가능한 코드베이스를 구축한다. cucumber와 같은 BDD(행위 주도 개발)은 테스트할 수 있는 feature가 많고, Data Driven 테스트를 할 수 있을 정도로 다양한 시나리오 하에서만 의미가 있으므로 본 미니프로젝트의 PoC에는 포함시키지 않았습니다. 

* __반응형 및 CQRS의 이해__ : 상태 관리 라이브러리(redux)의 구현부를 직접 만들고 이와 관련한 테스트 코드를 작성함으로서, 반응형 넌블락 비동기 처리를 가능하게 하는 pub-sub + callback-base continuation passing style (middleware 아키텍처)가 작동하는 방식을 이해하고, 메시지 주도 개발을 실천한다.

* __함수형 프로그래밍의 실천__ : 주요 알고리즘 구현시 함수형 기본 문법(map, reduce)을 사용하고, 런타임에 의존성 주입이 가능한 high order function을 적극 사용하여, 읽기 쉽고 선언적이며, context-free하고 테스트 가능한 코드를 작성한다.

* __오프라인 퍼스트 (PWA)의 구현__ : pouchdb (브라우저 캐시 메모리 데이터베이스)와 couchdb (문서 기반 분산 데이터베이스)를 통해 백엔드 서버 운영 환경이 정상 작동하지 않는 경우에도 작동 가능한 웹 애플리케이션을 만든다.

</details>

<br/>

### 2. 미니 프로젝트 작성 원칙

<br/>

본 **_미니 프로젝트_** 가 기반하고 있는  **_개발 원칙들_** : 

<details>
<summary>...더 읽기</summary>

* __YAGNI(You aren't gonna need it)__: 필요한 작업만 하자. 본 미니프로젝트는 기술을 수직적으로 확장하는 데 주안점을 두었기에 수평적인 기능 확장(feature의 증가)는 최소화 했다. Todo 앱의 기능도 등록과 삭제만으로 충분하다. 

* __점진적 개발(Incremental Model)__: 과잉 설계 BDUF(Big Design Up Front)를 지양한다. 소규모 토이 프로젝트를 반복하면서 과잉 설계는 본래의 의도와는 달리 프로젝트의 완성만 지연시키고, 코드와 테스트의 리팩토링을 게을리 하게 만드는 원인이 된다는 것을 알게 되었다. 별도의 설계 없이 테스트 코드만으로 탐색적으로 개발하는 것이 목표이다. 

* __Simple is Best__: third party dependency를 설치할 정도의 복잡한 기능 구현은 지양한다. 개념 증명에 필수적인 기능이고 작동 방식을 세부적으로 알아야 하는 경우(이를 테면 redux)라면 필요시 구현체를 직접 작성하고, 필수적이지만 내부 작동 방식을 세세히 알지 못해도 사용상 문제가 없는 라이브러리(pouchdb, couchdb) 인 경우에만 설치해서 사용한다. 

* __디자인 고민은 먼저, 결정은 나중에__: 반복은 방지하는 것이 아니라 발견하는 것이라는 지침에 맞게, 확인된 반복 코드에 대해서만 반복을 제거한다. 추후 발생가능한 문제를 미리 생각해보는 것은 좋지만, 문제가 발생하기 전(반복이 발견되기 전)까지는 디자인 결정을 보류한다. 

* __Outside-In 개발 방식 고수__: 끝나지 않는 설계, 사용성이 떨어지는 불편한 인터페이스를 만들어내는 가장 큰 요인은 client side 코드를 먼저 구상해보지 않았기 때문이다. 이미 알고 있는 기능 단위일 지라도 미리 내부를 구현하지 않으며, 테스트 코드 및 구현체는 항상 바깥쪽 인터페이스를 먼저 고려하는 outside-in 방식으로 작성해 나간다.

</details>

<br/>

<!-- 본 **_미니 프로젝트_** 를 진행하는 과정에서 발견한 **_사실들_** :  -->

### 3. 프로젝트 구현 과정에서 알게 된(경험하게 된) 것들 


#### 3-1. redux는 continuation passing style 적용하여 middleware 처리를 이어나간다. 

<details>
<summary>...더 읽기</summary>

<br>

**_리덕스 라이브러리_**: [`redux/src/compose.ts`](https://github.com/reduxjs/redux/blob/master/src/compose.ts)  
**_미니 프로젝트 구현체_**: [`redux/src/compose.ts`](https://github.com/reduxjs/redux/blob/master/src/compose.ts)  

<br>

```js 
const compose = (...funcs) => {
    return funcs
        .reduce((a, b) => (...args) => a(b(...args)));
};
const middlewareA = (store) => (next) => (action) => {
    action.push('[middlewareA] stack is open');
    action.push('[middlewareA] before call next');
    next(action);
    action.push('[middlewareA] after call next');
};
const middlewareB = (store) => (next) => (action) => {
    action.push('[middlewareB] stack is open');
    action.push('[middlewareB] before call next');
    next(action);
    action.push('[middlewareB] after call next');
};

// 첫번째 버전 - 구현체를 최대한 간결하게 나타내고자 하였다. 코드만 보고 이해하기는 어렵다. 
// 직접 중간 객체들을 콘솔에 출력해보고 다양한 실험을 해보아야 이해 가능하다.

const action1 = [];
const stubStore = { dispatch: () => {} };
const chain = [middlewareA, middlewareB].map((middleware) => middleware(stubStore));
const dispatch = compose(...chain)(stubStore.dispatch);
dispatch(action1);

// 두번째 버전 - 같은 결과를 나타내지만 좀더 이해하기 쉬운 형태로 바꾸었다.
// 표현하고 싶었던 것은 compose 과정을 통해 composedMiddleware의 모양은 
// 결국 middlewareAA(MiddlewareBB(...args))와 같아진다는 것이다. 

const action2 = [];
const middlewareAA = middlewareA(stubStore);
const middlewareBB = middlewareB(stubStore);
const composedMiddleware = (...args) => middlewareAA(middlewareBB(...args));
const dispatch2 = composedMiddleware(stubStore.dispatch);
dispatch2(action2);

// action1, action2를 각각 콘솔에 출력해보면 아래와 같은 결과가 나온다. 

[
    '[middlewareA] stack is open',
    '[middlewareA] before call next',
    '[middlewareB] stack is open',
    '[middlewareB] before call next',
    '[middlewareB] after call next',
    '[middlewareA] after call next'
]

// 출력 결과가 이상하다. 가장 안쪽에 있는 함수인 middlewareBB가 먼저 eval될 것 같지만 정상이다. 
// 착시 효과이다. 호출되는 것은 dispatch2이지 middlewareAA(middlewareBB(...))가 아니다. 
// 이때 dipatch는 아래 코드와 유사하게 작동한다.   

const dispatch = (action) => {
    action.push('[middlewareA] stack is open');
    action.push('[middlewareA] before call next');
    ((action) => {
        action.push('[middlewareB] stack is open');
        action.push('[middlewareB] before call next');
        action.push('[middlewareB] after call next');
    })(action);
    action.push('[middlewareA] after call next');
};

// 하지만 위의 코드와 유사하게 출력 결과가 나온다는 것이지, 상동한 코드가 된다는 것은 아니다. 
// next를 이용한 cps는 보다 오묘하다...

```

<br>

### 앞으로 차기 

* **__앞으로 차기(continuation passing style)__** 패턴은 함수 b가 코드 블록을 실행하고 난 다음 함수 a를 호출하면서 '자신의 컨텍스트'를 a에게 넘겨주는 것을 의미합니다. 

    * 좀더 안전(?) 말한다면 함수 b가 함수 a를 호출한다기 보다는 코드블록 b가 코드블록 a에게 '컨텍스트'와 '제어권'을 a에게 넘긴다고 하는 것이 맞지 않을까 싶습니다. 자바스크립트의 generator의 경우만 보더라도 볼 때 앞으로 차기(cps)는 다양한 형태로 구현될 수 있을 것 같다. 호출이 method invocation 방식만 있는 것이 아니니..


* 상기 compose 함수는 임의 개수의 인자로 받은 func을 rest 파라미터로 받아 배열로 변환하고 reduce **_접기 연산_** 을 적용하여, 왼쪽으로 오른쪽으로 중첩 함수를 쌓고 있습니다. 

    * 사실 접기 연산으로 중첩 함수 호출을 쌓는다고 cps가 구현된 것은 아니고, middleware에서 (next)로 다음 함수를 인자로 받고, 함수 내에서 다시 (next) 함수를 호출하면서 context를 넘겨줄 수 있도록 구현되었기 때문입니다. 

* **__앞으로 차기__** 는 널리 사용되는 용어는 아닙니다. ['프로그래밍 패턴']() (크리스티나 로페즈 지음) 책에서 사용한 이름을 한번 써본 것입니다. 😁😁😁

    * ['코틀린을 다루는 기술']() (피에르 이브 쏘몽)
    * ['코틀린을 다루는 기술 리뷰 글'](https://www.facebook.com/groups/kotlinkr/permalink/3357451647612741/)

<br>

</details>

<br>

* redux의 middleware는 스택 않전하지 않은 재귀이므로, 이론적으로 middleware 내에서 dispatch가 연쇄될 경우 버그가 발생할 수 있다. 

```
# 

```
<br>

### 스택 안전하지 않은 재귀 

* 패턴은 함수 b가 코드 블록을 실행하고 난 다음 함수 a를 호출하면서 '자신의 컨텍스트'를 a에게 넘겨주는 것을 의미합니다. 

    * 좀더 안전(?) 말한다면 함수 b가 함수 a를 호출한다기 보다는 코드블록 b가 코드블록 a에게 '컨텍스트'와 '제어권'을 a에게 넘긴다고 하는 것이 맞지 않을까 싶습니다. 자바스크립트의 generator의 경우만 보더라도 볼 때 앞으로 차기(cps)는 다양한 형태로 구현될 수 있을 것 같다. 호출이 method invocation 방식만 있는 것이 아니니..

<br>

* redux에서 합성된 middleware의 스택이 해소되는 순서는 right to left이다.

    ```
    # 

    ```

<br>

* redux의 middleware 의 코드를 실수 없이 깔끔하게 작성하려면 처리 코드 이전에 next 호출 코드가 먼저 나오는 것이 좋다.

    ```
    # 

    ```


<br>

* 메시지의 반복을 제거하기 위해 필요한 것이 meta info이다. 

    ```
    # 

    ```

<br>

본 **_미니 프로젝트_** 를 진행하는 깨닫게 된 **_주관적 견해_** : 

<br>

* 소규모 프로젝트를 TDD 방식으로 만든다면, 타입스크립트보다 자바스크립트가 더 빠를 수 있다.

    ```
    # 

    ```

<br>


* 테스트에서의 사전 준비 작업의 반복을 국소적으로 제거하는 것이 beforeAll, beforeEach라면, 전역적으로 제거하는 것이 fixure이다. 

    ```
    # 

    ```

<br>

본 **_미니 프로젝트_** 를 진행하는 과정 중에 습득한 **_기법들_** : 


* 테스트에서의 사전 준비 작업의 반복을 국소적으로 제거하는 것이 beforeAll, beforeEach라면, 전역적으로 제거하는 것이 fixure이다. 

    <br>
    ```
    # 

    ```

<hr style="border-top:1px solid gray"></hr>

<font size = "2"><a name="footnote_1">1</a>: 
전체 프로젝트의 기술 스택 및 적용 기술  

> 백엔드는   
> express와 mongodb를 이용한 **_Restful API 방식_** 과   
> apollo-express와 typeorm을 이용한 **_Graphql API 방식_** 을   
> 각각 마이크로서비스로 구성하고 
> 
>
> 프론트엔드는  
> express와 handlebar를 이용한 **_SSR 방식_** (topnav, sidebar 파트)과   
> react + redux 라이브러리를 이용한 spa 방식을 혼용함 (app 파트)   
> 
<!-- 
* 테스트/빌드/배포 &nbsp; : &nbsp; jenkins (virtual box / macbook)  
* 코드 저장소 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : &nbsp; private gitlab (virtual box / macbook)  
* 컨테이너 저장소 &nbsp;&nbsp; : &nbsp; private dockerhub (virtual box / macbook)  
* 운영/배포 서버 &nbsp;&nbsp; : kubernetes cluster on kubeadm (virtual box / z800 hp server)
-->
* 백엔드
    * (Restful part)
        * runtime: node v13
        * http 서버: express 
        * 데이터베이스: mongoose + mongo
        * 테스트 도구: jest
    * (Graphql part)
        * runtime: node v13
        * http 서버: express 
        * 데이터베이스: apollo + typeorm
        * 테스트 도구: jest
* 프론트 엔드
    * (SSR part)
        * runtime: node v13 (ts-node + typescript)
        * http 서버: express 
        * 렌더러 라이브러리: handlebar (mustache) 
        * css 라이브러리: bootstrap 3
        * e2e 테스트 도구: (X - 없음)
        * unit 테스트 도구: (X - 없음)
    * (SPA part)
        * runtime: chrome v8 (webpack + typescript)
        * 렌더러 라이브러리: react 
        * 상태관리 라이브러리: redux
        * 컴포넌트 디자인툴: storybook
        * e2e 테스트 도구: cypress
        * unit 테스트 도구: jest + enzyme
</font>

> redux가 middleware를 처리하는 내부 구현을 보고 난 이후, redux saga가 어떻게 자바스크립트 generator를 이용해서  
> 미들웨어 처리를 하는지 머리속에 대략적인 그림이 그려졌습니다.   
> 미니 프로젝트가 어느 정도 완성된 이후에는 redux saga의 구현체 내부를 보지 않은 상태에서 redux saga와 유사하게   
> middleware 처리기를  구현해 보는 것을 목표로 삼고 있습니다.