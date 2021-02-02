## 개념 증명(Proof of Concept)을 위한, 미니멀 프론트엔드 프로젝트 
> 메인 프로젝트<sup>[1](#footnote_1)</sup> 의 기술적 문제를 사전에 점검하고 여러 가지 대안적 실험을 진행할 수 있는 샌드박스를 구축하고자 합니다.

### 1. 동기 (Motivation) 및 증명 대상 (Concepts)

<!-- #region 1 -->

<details>
<summary>...(닫기)</summary>

<br/>

🔥 **_프로젝트_** 를 시작하게 된 **_주요 동기_**:   


* __개념 증명 및 예광탄 개발__: 기존에 진행하던 메인 프로젝트에 여러 기능이 부가되면서, 변경에 따른 파급효과가 부담스러워 새로운 실험적 시도가 점차 사라지게 되었습니다. 이 같은 문제 의식을 바탕으로 금번 미니 프로젝트는 메인 프로젝트에서 구현하고자 하는 기술을 사전 점검하는 **_개념 증명_** 으로써, 다양한 디자인, 코딩 스타일을 실험해 보기 위한 **_샌드박스_** 로써 시작되었습니다.

* __프로젝트 컨셉 조감도__: 미니 프로젝트는 메인 프로젝트가 CI / CD 운영 환경에서 안정적으로 중단 없이 배포되는 시점까지, 메인 프로젝트의 전체적인 컨셉(사용된 기술, 개발 방법론, 워크플로우)을 요약하여 보여줄 수 있는 최소한의 기능을 가진 축소판으로 지속적으로 개선 보완될 예정입니다. 


<br/>

🔥 **_프로젝트_** 를 통해 **_증명하고자 하는 것_** 들: 


* __테스트 주도 개발__: e2e 테스트 도구(cypress)와 유닛 테스트 도구(jest)를 적극적으로 활용하여, 주요 테스트 기법(SUT, fixtures / stub, fake, mock, spy)의 개념과 red-green-blue 워크플로에 익숙해진다.  테스트 주도 개발을 통해 지속적으로 변경 가능한 코드베이스를 구축하며 이 같은 경험을 메인 프로젝트에서도 이어 나가고자 합니다. 

* __반응형 및 CQRS__ : 상태 관리 라이브러리(redux)의 구현부를 직접 만들고 이와 관련한 테스트 코드를 작성함으로서, 반응형 넌블락 비동기 처리를 가능하게 하는 pub-sub + callback-base continuation passing style (middleware 아키텍처)가 작동하는 방식을 이해하고, 메시지 주도 개발을 실천하고자 합니다.

* __함수형 프로그래밍의 실천__ : 주요 알고리즘 구현시 함수형 기본 문법(map, reduce)을 사용하고, 런타임에 의존성 주입이 가능한 high order function을 적극 사용하여, 읽기 쉽고 선언적이며, context-free하고 테스트 가능한 코드를 작성하고자 합니다.

* __오프라인 퍼스트 (PWA)의 구현__ : 브라우저 캐시 메모리 데이터베이스(pouchdb)와 문서 기반 동기화 분산 데이터베이스(couchdb)를 사용하여 백엔드 서버 운영 환경에 전적으로 의존하지 않는 프로그레시브 웹 애플리케이션을 구현하고자 합니다. 

</details>

<br/>

<!-- #endregion 1 -->

### 2. 미니멀 프로젝트 작성 원칙

<!-- #region 2 -->

<details>
<summary>...(닫기)</summary>

<br/>

🔥 **_프로젝트_** 가 지향하는 **_개발 원칙들_** : 


* __YAGNI(You aren't gonna need it)__: 개념 증명에 필요한 코드만 구현 하겠습니다. 미니프로젝트는 기능의 수직적 확장하는 데 주안점을 두고 수평적인 기능 확장(feature의 증가)는 지양합니다. 특별한 필요가 발생하지 않는 한 Todo 앱의 기능은 등록과 삭제 두가지만 유지할 계획입니다.

* __점진적 개발(Incremental Model)__: 사전 설계(Design Up Front) 없이 테스트 코드만으로 점진적으로 개발을 진행해 나갈 예정입니다. 소규모 토이 프로젝트를 반복하면서 fancy하지만 실현 불가능한 약속을 남발하는 기획보다는 견고한 테스트 코드와 to-do-list를 최소한으로 유지하는 것이 중요하다는 사실을 깨달았습니다. 

* __Simple is Best__: third party dependency를 설치할 정도의 복잡한 기능 구현은 지양할 예정입니다. 그럼에도 불구하고 개념 증명에 필수적이고 작동 방식을 정확히 이해할 필요가 있는 경우(이를 테면 redux)라면 필요시 구현체를 직접 작성하면서 실험적인 테스트 코드를 작성해볼 예정입니다. 

* __디자인 고민은 먼저, 결정은 나중에__: 반복은 방지하는 것이 아니라 발견하는 것이라는 지침에 맞게, 확인된 반복 코드에 대해서만 반복을 제거할 예정입니다. 추후 발생가능한 문제들과 이를 방지할 디자인 결정은 한번씩 고민해 보는 것으로 만족하고, 반복이 실제로 발견되기 전까지는 디자인 결정을 유보하고자 합니다.

* __Outside-In 개발 방식 고수__: 경험상 끝나지 않는 설계, 사용성이 떨어지는 불편한 인터페이스가 양산되는 큰 요인은 client side 코드를 먼저 작성해 보지 않았기 때문이었습니다. 이미 알고 있는 작은 기능일 지라도, 테스트 코드 및 구현체는 항상 바깥쪽 인터페이스를 먼저 고려하는 outside-in 방식으로 작성해 나갑니다. 

</details>

<br/>

<!-- #endregion 2 -->

### 3. 메인 프로젝트에서 발생한 여러 문제점들과 해결 과정

<br/>

<details open="true">
<summary>...(전체닫기)</summary>

#### 문제점 1: Redux Middleware를 어떻게 작성할 것인가?

<br/>

> 메인 프로젝트에서 react 컴포넌트의 로딩과 사용자 입력에 의해 발생하는 상태 변화와 관련한 이벤트들을 command, query, event   
> 세 가지로 세분화하고 다수의 이벤트 핸들러(Reducer, APP/ LOG/ UI/ ASYNC (CACHE/HTTP) /...)를  추가해나가는 과정 중에   
> Middlewar의 처리 순서 및 동기화와 관련한 버그가 발생하게 되었으나, dispatch chain이 복잡해지면서 디버깅이 어려워지게 되었다. 

<br/>

##### 해결에 필요한 질문/과제들  

<!-- Middleware 연쇄는 어떻게 일어나는가 -->
⚡️ **_middleware_** 연쇄는 **_어떻게 일어나는가_** : 

* [Middleware 호출 스택이 열리는 순서 {바로가기}](problem_01.md) (완료)
* [Middleware 내부에서 dispatch가 호출될 경우 호출 스택이 쌓이는 양상{바로가기}](problem_01.md) (완료)
* [Middleware 내부 next(action) 호출 시점별로 Middleware chain의 동작은 어떻게 달라지는가 {바로가기}](problem_01.md) (완료)
* [Middleware의 추상화 방법(반복 제거, 분기 제거) {바로가기}](problem_01.md) (완료)

<br/>

#### 문제점 2: 브라우저 캐싱 + 원격 데이터베이스로 PWA 구현하기 

<br/>

> 메인 프로젝트에 적용할 offline first 기술로 service worker, rabbitMQ(or kafka) 등을 검토하던 끝에 data sync와 관련한   
> 구현이 가장 간편한 '브라우저 캐시(pouchdb) + 문서 기반 동기화 데이터베이스(couchdb)'를 사용하기로 최종 결정하였다.   
> 문제는 이와 같은 결정이 지연되는 동안 메인 프로젝트의 기능 개발이 많이 진전되어 복잡성이 증가한 터라 메인 프로젝트에   
> 직접 적용하기에는 패키지 추가, 기능 추가 등이 부담스러워졌다.  

<br/>

##### 해결에 필요한 질문/과제들  

* [CacheMiddleware에게 직접 동기화 처리를 하게 할 것인가](01_problem.md) (완료)
* [싱글턴 Cache Database 의존성을 언제 생성하고 어떻게 주입할 것인가](01_problem.md) (완료)
* [Pouchdb Create/Read/Delete 테스트 코드 작성해보기](01_problem.md) (완료)
* [Couchdb를 도커 컨테이너로 배포하기](01_problem.md) (미결)


[problem01]: (01_problem.md) "Go google"
[problem02]: https://google.com "Go google"
[problem03]: https://google.com "Go google"


</details>

<br/>

### 3. 프로젝트 구현 과정과 탐험적 테스트 작성을 통해 확인한 사실들 

<!-- #region 3 -->

<details open="true">
<summary>...(전체닫기)</summary>

#### 3-1. redux는 continuation passing style 적용하여 middleware 처리를 이어나간다.

<!-- #region 3-1 -->

<details open="false">
<summary>...(닫기)</summary>

* **_cps(cps; continuation passing style)_** 는 여러 함수(처리의 단위)가 서로 컨텍스트를 주고 받으면서 처리를 이어나가는 방식입니다.

    * compose 함수는 **_고계 함수(high order function)_** 합성을 위한 합성함수입니다.

    * middleware의 **_next => action => { next(action) }_** 패턴은 cps를 중첩 함수 호출 방식으로 구현한 것입니다.

    * middleware가 호출되는 순서는 applyMiddleware의 인자 순서와 마찬가지로 **_좌에서 우_** 방향입니다. 

<br/>

🔎 구현 코드 

**_⌘ 리덕스 라이브러리_**  

**_● compose_**: [`redux/src/compose.js`](https://github.com/reduxjs/redux/blob/master/src/compose.ts)  
**_● applyMiddleware_**: [`redux/src/compose.js`](https://github.com/reduxjs/redux/blob/master/src/compose.ts)  

<br/>

**_⌘ 프로젝트 구현체_**  

**_● compose_**: [`src/js/store/_lib/compose.js`](https://github.com/reduxjs/redux/blob/master/src/compose.ts)  
**_● createStore_**: [`src/js/store/_lib/createStore.js`](https://github.com/reduxjs/redux/blob/master/src/compose.ts)  
**_● applyMiddleware_**: [`src/js/store/_lib/applyMiddleware.js`](https://github.com/reduxjs/redux/blob/master/src/compose.ts)  
**_● middleware_**: [`src/js/store/middleware/log/middleware.js`](https://github.com/reduxjs/redux/blob/master/src/compose.ts)  

<br/>

🔔 테스트 코드 

**_● jest 테스트 바로가기_**: [`redux/src/compose.ts`](https://github.com/reduxjs/redux/blob/master/src/compose.ts)  

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

// 첫번째 버전 - 구현체를 최대한 간결하게 나타내고자 축약한 버전입니다. 

const action1 = []; // 테스트 메시지를 수집하기 위한 객체입니다. 
const stubStore = { dispatch: () => {} };
const chain = [middlewareA, middlewareB].map((middleware) => middleware(stubStore));
const dispatch = compose(...chain)(stubStore.dispatch);
dispatch(action1);

// 두번째 버전 - 같은 결과를 나타내지만 좀더 이해하기 쉬운 형태로 함수를 치환했습니다.

const action2 = [];
const middlewareAA = middlewareA(stubStore);
const middlewareBB = middlewareB(stubStore);
const composedMiddleware = (...args) => middlewareAA(middlewareBB(...args));
const dispatch2 = composedMiddleware(stubStore.dispatch);
dispatch2(action2);

// 이제 action1, action2를 각각 콘솔에 출력해보면 아래와 같은 결과가 나옵니다. 

[
    '[middlewareA] stack is open',
    '[middlewareA] before call next',
    '[middlewareB] stack is open',
    '[middlewareB] before call next',
    '[middlewareB] after call next',
    '[middlewareA] after call next'
]

// composeMiddleware를 볼 때, middlewareBB가 먼저 호출되어야 할 것 같지만 
// 실제로는 그렇게 작동하지 않습니다. middlewareBB의 코드 블록은 
// middlewareAA에서 내부에서 호출될 때까지 
// 호출이 지연되기 때문입니다. 

const action = [];
const stubStore = {
    dispatch: (action) => {}
}
const dispatch = (function middlewareA(action) {
        action.push('[middlewareA] stack is open');
        action.push('[middlewareA] before call next');
        (function middlewareB(action) {
            action.push('[middlewareB] stack is open');
            action.push('[middlewareB] before call next');
            action.push('[middlewareB] after call next');
            store.dispatch(action);
        })(action)
        action.push('[middlewareA] after call next');
});
dispatch(action);

// 무엇보다 구조상 가장 중요하면서도 이해하기 어려운 것은 사실 가장 안쪽 미들웨어(middlewareBB)의 
// next 함수가 가리키는 것이 stubStore의 dispatch 객체라는 것입니다. 


```

<br/>

### ❖ 앞으로 차기 (continuation passing style)

* **__앞으로 차기(cps)__** 패턴은 함수 b가 다음 함수 a를 호출하면서 '자신의 컨텍스트'를 a에게 넘겨주는 것을 의미합니다. 

    * 일반적으로는 **_cps_** 는 코드블록 b가 코드블록 a에게 **_'컨텍스트'와 '제어권(code flow)'을 a에게 넘기는 것_** 을 말합니다. 자바스크립트의 generator의 경우만 보더라도 볼 때 앞으로 차기(cps)는 함수 호출이 아닌 다양한 형태로 구현될 수 있습니다. 명령(command)을 실행하는 방식도 method invocation 방식만 있는 것이 아니듯 ..

    * **__앞으로 차기__** 는 널리 사용되는 용어는 아닙니다. ['프로그래밍 패턴']() (크리스티나 로페즈 지음) 책에서 저자가 명명한 것으로 cps 보다는 직관적이라 생각합니다. 😁😁😁

* 상기 compose 함수는 임의 개수의 인자로 받은 func을 rest 파라미터로 받아 배열로 변환하고 **_reduce 접기 연산_** 을 적용하여, 왼쪽으로 오른쪽으로 중첩 함수를 쌓고 있습니다. 

    * 접기 연산으로 중첩 함수 호출을 쌓는 행위 자체는 cps를 구현한 것으로 볼 수 없습니다. **_middleware에서 (next)로 다음 함수를 인자로 받고, 함수 내에서 다시 (next) 함수를 호출하며 context를 넘겨주는 부분__** 이 cps 구현에 해당합니다.

    * ['코틀린을 다루는 기술']() (피에르 이브 쏘몽)
    * ['코틀린을 다루는 기술 리뷰 글'](https://www.facebook.com/groups/kotlinkr/permalink/3357451647612741/)

<br/>

</details>

<br>

<!-- #endregion 3-1 -->

#### 3-2. 미들웨어 내에서 연쇄적으로 dispatch를 호출할 경우 오버플로(스택, 메모리)가 발생할 수 있음을 유의해야 한다.

<!-- #region 3-2 -->

<details open="true">
<summary>...(닫기)</summary>

* redux의 dispatch는 **_스택 안전하지 않은 재귀호출_** 이다. 

    * **_dispatch가 거쳐가는 미들웨어의 숫자가 많거나, 미들웨어 내부에서 dispatch 재귀 호출이 연쇄된다는 것은 나쁜 설계를 의미_** 한다고 생각한다. 

    * dispatch **_재귀 호출을 최소화 하는 방법_** 에 대해서는 아직까지 딱히 떠오르는 아이디어가 없다. (현재로선 미들웨어의 다형적 처리가 답이 되지 않을까 생각한다..)

    * v8 컴파일러의 **_꼬리호출 최적화가 지원_** 된다면 스택 안전한 공재귀 형태로 변형이 가능할 것이므로 메모리 오버플로우는 지연시킬 수 있지 않을까..

    * 공재귀로 처리 가능하다는 것은 루프 처리도 가능하다는 것이니 결국은 이런 이유 때문에라도 redux saga에서는 **_generator 방식의 cps_** 를 사용한 것이 아닐까 싶다..

<br>


🔔 테스트 코드 

**_jest 테스트 바로가기_**: [`redux/src/compose.ts`](https://github.com/reduxjs/redux/blob/master/src/compose.ts)  

```ts
# 
const middlewares = [
    (store) => (next) => (action) => {
        action.A_call_count = action.A_call_count + 1;
        next(action);
        if (action.val < 100) {
            action.val = action.val + 1
            store.dispatch(action);
        } else {
            return
        }
    },
    (store) => (next) => (action) => {
        action.B_call_count = action.B_call_count + 1;
        next(action);
        if (action.val < 100) {
            action.val = action.val + 1
            store.dispatch(action);
        } else {
            return
        }
    }
];
const store = createStoreForTest(middlewares);
const action = { val : 0, A_call_count: 0, B_call_count: 0 };
store.dispatch(action);

// action을 콘솔로 출력하면 아래와 같은 값이 나온다. 
// { val: 100, A_call_count: 101, B_call_count: 101 }

```

</details>

<br>

<!-- #endregion 3-2 -->

#### 3-3. 미들웨어에서 next(action) [다음 미들웨어로 처리를 넘기는 함수]의 호출이 블록의 최상단에 위치하지 않으면 sync block이 발생할 수 있다. 

<!-- #region 3-3 -->

<details open="false">
<summary>...(닫기)</summary>

* 비동기 처리(Promise)를 담은 dispatch의 경우 middleware들 중 하나가 **_동기화 해주는 resolve 작업_** 을 해야 한다. 

    * 미들웨어 async await 구문을 사용하든 promise.then 구문을 사용하든 **_비동기를 sync하는 시점에는 블록킹이 발생_** 할 수 밖에 없다. 

    * 모든 미들웨어에서 next(action) 호출이 최상단에 위치한다면 각각의 미들웨어는 **_블록킹이 발생하기 전에 비동기 처리가 시작_** 될 수 있는 기회가 주어진다. 

    * 반대로 모든 미들웨어가 자신의 처리가 끝날 때까지 next(action)을 호출을 지연한다면 sync 작업이 수행되는 동안 다음 미들웨어의 호출이 지연되므로 사실상 미들웨어의 연쇄는 하나의 sync blocking 코드가 되므로 **_애플리케이션의 반응성이 낮아진다_** .

<br/>

🔔 예시 코드 

**_jest 테스트 바로가기_**: [`redux/src/compose.ts`](https://github.com/reduxjs/redux/blob/master/src/compose.ts)  

```ts
// sync blocking 이 발생하는 시나리오 

const middlewares = [
    (store) => (next) => (action) => {
        action.push([1, new Date().toISOString()]);
        next(action);
    },
    (store) => (next) => async(action) => {
        action.push([2, new Date().toISOString()]);
        action.push([await new Promise(res => setTimeout(res, 2000, 4)), new Date().toISOString()]);
        next(action);
    },
    (store) => (next) => (action) => {
        action.push([3, new Date().toISOString()]);
        next(action);
    }
];
const store = createStoreForTest(middlewares);
const action = [];
store.dispatch(action);
await new Promise(res => setTimeout(res, 2000));

// 위에서 잠시 언급했었던 것처럼 
// 미들웨어의 실행은 인자 순서대로 좌에서 우로 진행됩니다. 
// 그리고 코드 실행의 결과는 아래 composedMiddleware의 
// 실행 결과와 유사해 집니다. 
//
// 하지만 실제적인 작동은 아래와 같지 않습니다. 
// 실제로는 호출된 함수는 worker thread의 큐에 들어가기 때문에 
// 결과만 빼놓고는 아주 상이하게 처리된다는 것을 유념해야 합니다. 


// async non-blocking을 가져오는 코드 

const composedMiddleware = async(action) => {
    //첫번째 미들웨어 
     action.push([1, new Date().toISOString()]);

    //두번째 미들웨어 
    (async(action) => {
        action.push([2, new Date().toISOString()]);
        action.push([await new Promise(res => setTimeout(res, 2000, 4)), new Date().toISOString()]);

        //세번째 미들웨어 
        ((action) => {
            action.push([3, new Date().toISOString()]);

        })(action);
    })(action);
};

// 하나의 컨텍스트를 이어 나가는 모습이 단일체 함수의 실행과도 같아 보입니다. 
// 코드의 모양상 위의 코드는 전형적인 sync blocking 코드에 해당합니다. 
//
// 코드 실행결과를 확인하면 2번째 미들웨어의 처리와 3번째 미들웨어의 처리 사이에 
// 2초의 지연이 발생함을 알 수 있습니다. 
//
// 코드가 순차 실행(sync)되면서 중간에 블록킹(bloking)이 발생했습니다.
//
// [
//     [ 1, '2021-01-30T15:41:22.075Z' ],
//     [ 2, '2021-01-30T15:41:22.075Z' ],
//     [ 4, '2021-01-30T15:41:24.080Z' ],
//     [ 3, '2021-01-30T15:41:24.080Z' ]
// ]


// async non-blocking 코드 

const middlewares = [
    (store) => (next) => (action) => {
        next(action);
        action.push([1, new Date().toISOString()]);
    },
    (store) => (next) => async(action) => {
        next(action);
        action.push([2, new Date().toISOString()]);
        action.push([await new Promise(res => setTimeout(res, 2000, 4)), new Date().toISOString()]);
    },
    (store) => (next) => (action) => {
        next(action);
        action.push([3, new Date().toISOString()]);
    }
];
const store = createStoreForTest(middlewares);
const action = [];
store.dispatch(action);
await new Promise(res => setTimeout(res, 2000));


// 함수가 next(action) 연쇄를 통해 워커 쓰레드의 큐로 등록되고 나면
// 이후에는 async하게 작동합니다. 
//
// [
//     [ 3, '2021-01-30T15:59:17.728Z' ],
//     [ 2, '2021-01-30T15:59:17.728Z' ],
//     [ 1, '2021-01-30T15:59:17.728Z' ],
//     [ 4, '2021-01-30T15:59:19.729Z' ]
// ]

```

</details>

<br>

<!-- #endregion 3-3 -->

#### 3-4. 버그 없는 깔끔한 코드를 작성하기 위해서도 next(action) 호출은 블록의 최상단에 위치시키는 것이 좋습니다.

<!-- #region 3-4 -->

<details open="true">
<summary>..(닫기)</summary>

* 동기 블록킹 문제 외에도 redux의 middleware의 **_코드를 실수 없이 깔끔하게 작성하기 위해서_** 도 next 호출 코드가 최상단에 위치하는 것이 좋다. 

    * next(action)은 분기문의 끝에다가 적어주어야 하는데 빠트리는 경우에도 에러가 발생하지 않으므로, 발견하기 힘든 버그의 원인이 되기도 한다. 

<br/>

🔔 테스트 코드 

**_jest 테스트 바로가기_**: [`redux/src/compose.ts`](https://github.com/reduxjs/redux/blob/master/src/compose.ts)  

```ts
// next(action)을 먼저 호출하면 분기문이 끝날 때마다 next(action)을 호출해야 하는 수고로움이 사라집니다. 
// 그렇지 않으면 단일한 에러 지점이 아니라 다수의 에러 발생 지점을 가지는 것과 같습니다. 
// 컴파일러의 꼬리 물기 최적화 같은 지원이 가능해지지 않는 다음에야 처리를 마친 이후에 스택을 여는 
// 공재귀를 구현할 유인이 크지 않습니다. (물론 컨텍스트 메모리 사용량이 일정하다는 장점이 있지만)

const callNextImediateMiddleware = (store) => (next) => (action) => {
    next(action);
    if (action.type === 'target') {
        switch(action.meta) {
            case 'meta1':
                return;
            case 'meta2':
                return;
            case 'meta3':
                return;
        }
    } else {
        return;
    }
},

const callNextDelayedMiddleware = (store) => (next) => (action) => {
    if (action.type === 'target') {
        switch(action.meta) {
            case 'meta1':
                return next(action); // next(action) 첫번째 
            case 'meta2':
                return next(action); // next(action) 두번째 
            case 'meta3':
                return next(action); // next(action) 세번째 
        }
    } else {
        next(action); // next(action) 네번째
    }
},

```

</details>

<br>

<!-- #endregion 3-4 -->


#### 3-5. 미들웨어의 분기문을 줄이기 위해서는 action에 메시지 type 정보 외에 분류를 위한 meta infomation을 포함시켜야 한다. 

<!-- #region 3-5 -->

<details open="true">
<summary>..(닫기)</summary>

* 애플리케이션의 feature가 늘어날 수록 미들웨어에 다양한 action을 처리하기 위한 **_분기문(if-else, switch case)의 개수_** 가 늘어난다. 

    * 분기문은 프로그램의 복잡성을 증가시키므로 중첩된 분기(2 depth 이상)는 반드시 제거해야 한다. 

    * 객체지향 프로그래밍은 최종적으로 **_if..else 분기 로직을 클래스 다형성으로 대체한뒤 런타임 바인딩(dependency injection)_** 으로 외부화 하는 것이 목표이다. 

    * 미니 프로젝트에서는 YAGNI 원칙에 따라 분기문 제거를 위해 action 메시지에 meta 정보를 부여하여 한 분기문 내에서 처리할 수 있는 메시지의 종류를 늘리는 것까지만 시도하기로 한다.

<br/>

🔔 테스트 코드 

**_jest 테스트 바로가기_**: [`redux/src/compose.ts`](https://github.com/reduxjs/redux/blob/master/src/compose.ts)  

```ts
# 
function() {

}

```

<br>

</details>

<!-- endregion 3-5 -->

</details>

<br/>

<!-- #endregion 3 -->

### 4. 소소하게 익히게 된 개발 기법들 

<!-- #region 4 -->

<br/>

<details open="true">
<summary>..(닫기)</summary>

<br/>

🔥 프로젝트를 진행하는 과정 중에 습득한 **_기법들_** : 

* 미들웨어와 관련한 테스트 케이스에 이름 붙일 때에도 타입 객체 enum(vo)와 string interpoation을 이용하면 리팩토링의 수고로움을 덜 수 있었다. 

    * 별도의 설계 없이 테스트 코드만으로 탐색적으로 개발하는 경우, 코딩을 하면서 타입 객체의 이름을 수시로 바꾸기 마련이므로, enum 객체를 도입하는 시점에 테스트 이름도 함께 리팩토링해주는 것이 좋을 것 같다. 

<br>

```ts

# 

```

</details>

<br>

<!-- #endregion 4 -->

### 5. 회 고 (Retrospective)

<!-- #region 5 -->

<br/>

<details open="true">
<summary>..(닫기)</summary>

<br/>

🔥 ︎︎︎︎︎프로젝트를 진행하면서 깨닫게 된 **_주관적인 경험_** : 

* TDD가 전제된다면, 소규모 프로젝트에서 구조를 잡는 과정은 타입스크립트보다 자바스크립트가 더 간편하다.

    * 특히 라이브러리 설치 시에, 트랜스 파일러 설정과 관련된 크고 작은 트러블 슈팅이 발생하지 않는 다는 점과 type definition 라이브러리를 dev-dependency로 별도 설치해 주지 않아도 되지 않아, 설정 작업에 정신 팔리지 않고 코딩에 집중할 수 있다는 것이 좋았다. 

    * 그럼에도 불구하고 테스트 코드를 작성하지 않는다면 소규모 프로젝트일 지라도 시작부터 타입스크립트의 도움을 받을 것 같다. 

* TDD가 전제될 지라도, 소규모 프로젝트의 파일 숫자가 늘어나 폴더를 만들고 구조를 재배치 해야 하는 시점에는 타입스크립트로 전환하는 것이 좋다. 

    * 폴더 이동 시에 모듈 임포트가 깨져서 일일히 수정해 주어야 하는 것이 고통스러웠다. 

    * 이름 변경시에도 타입스크립트 프로젝트보다 매끄럽게 변경되지 않아 수동 작업이 많았다.


<br>

🔥︎ 다음 **_프로젝트_** 를 진행할 때 **_시도해 보고 싶은 것들_** : 

* redux가 middleware를 처리하는 내부 구현을 보고 난 이후, redux saga가 어떻게 자바스크립트 generator를 이용해서  

    * 미들웨어 처리를 하는지 머리속에 대략적인 그림이 그려졌습니다.   

    * 미니 프로젝트가 어느 정도 완성된 이후에는 redux saga의 구현체 내부를 보지 않은 상태에서 redux saga와 유사하게   

    * middleware 처리기를  구현해 보는 것을 목표로 삼고 있습니다.

</details>

<br>

<br>

<!-- #endregion 5 -->


<!-- #region endnote -->

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


<!-- #endregion endnote -->