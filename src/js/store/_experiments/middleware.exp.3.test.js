describe('Middleware: internals', () => {
    let stubStore;
    let compose;
    let createStoreForTest;
    beforeAll(() => {
        compose = (...funcs) => {
            return funcs.reduce((a, b) => (...args) => a(b(...args)));
        };
        stubStore = {
            dispatch: () => {}
        };
        createStoreForTest = require('#tests/middleware');
    })


    it.skip('unsafe recursive call in middlewares', () => {
        const middlewares = [
            (store) => (next) => (action) => {
                action.A_call_count = action.A_call_count + 1;
                next(action);
                if (action.val < 100) {
                    action.val = action.val + 1
                    dispatch(action);
                } else {
                    return
                }
            },
            (store) => (next) => (action) => {
                action.B_call_count = action.B_call_count + 1;
                next(action);
                if (action.val < 100) {
                    action.val = action.val + 1
                    dispatch(action);
                } else {
                    return
                }
            }
        ];
        const dispatch = compose(... middlewares.map((middleware) => middleware(stubStore)))(stubStore.dispatch);
        const action = {
            val: 0,
            A_call_count: 0,
            B_call_count: 0
        };
        dispatch(action);
        console.log(action);
    })

    it.skip('unsafe recursive call in middlewares', () => {
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
        const action = {
            val: 0,
            A_call_count: 0,
            B_call_count: 0
        };
        store.dispatch(action);
        console.log(action);
        // { val: 100, A_call_count: 101, B_call_count: 101 }
    })

    it.skip('sync blocking scenario', async () => {
        const middlewares = [
            (store) => (next) => (action) => {
                action.push([1, new Date().toISOString()]);
                next(action);
            },
            (store) => (next) => async (action) => {
                action.push([2, new Date().toISOString()]);
                action.push([
                    await new Promise(res => setTimeout(res, 2000, 4)),
                    new Date().toISOString()
                ]);
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
        console.log(action);
    })

    it.skip('async non-blocking scenario', async () => {
        const middlewares = [
            (store) => (next) => (action) => {
                next(action);
                action.push([1, new Date().toISOString()]);
            },
            (store) => (next) => async (action) => {
                next(action);
                action.push([2, new Date().toISOString()]);
                action.push([
                    await new Promise(res => setTimeout(res, 2000, 4)),
                    new Date().toISOString()
                ]);
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
        console.log(action);
    })

    it.skip('test', () => {
        function A(next) {
            return function A1(action) {
                action.push(1);
                next(action)
            }
        }
        function B(next) {
            return function B1(action) {
                action.push(2);
                next(action)
            }
        }
        function C(next) {
            return function C1(action) {
                action.push(3);
                next(action)
            }
        }
        const store = {
            dispatch: (action) => {}
        }

        const action = [];
        const dispatch = (function A1(action) {
            action.push(1);
            (function B1(action) {
                action.push(2);
                return(function C1(action) {
                    action.push(3);
                    store.dispatch(action)
                })(action);
            })(action)
        });

        A(B(C(store.dispatch)))(action);
        console.log(action);
        // console.log(action);
    });

    it.skip('test', () => {

        const action = [];
        const store = {
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
        console.log(action);
    });

    it('test', () => {
        var middlewareAPI = {
            dispatch: (action) => dispatch(action)
        }
        console.log(middlewareAPI.dispatch(1));
    });
})
