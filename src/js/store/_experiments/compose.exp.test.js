// const compose = require('./compose')

describe('Thinking Experiment: Middleware', () => {

    it.skip('parametrized middlewares process action from left to right', () => {
        const action = [];
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

        const stubStore = { dispatch: () => {} };
        const chain = [middlewareA, middlewareB].map((middleware) => middleware(stubStore));
        const dispatch = compose(...chain)(stubStore.dispatch);
        dispatch(action);
        console.log(action);

        const action2 = [];
        const composedMiddleware2 = (...args) => middlewareA(stubStore)(middlewareB(stubStore)(...args));
        const dispatch2 = composedMiddleware2(stubStore.dispatch);
        dispatch2(action2);

        const action3 = [];
        const middlewareAA = middlewareA(stubStore);
        const middlewareBB = middlewareB(stubStore);
        const composedMiddleware3 = (...args) => middlewareAA(middlewareBB(...args));
        const dispatch3 = composedMiddleware3(stubStore.dispatch);
        dispatch3(action3);
    });

    it.skip('parametrized middlewares process action from left to right', () => {
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
        const action = [];
        const stubStore = { dispatch: () => {} };
        const chain = [middlewareA, middlewareB].map((middleware) => middleware(stubStore));
        const dispatch = compose(...chain)(stubStore.dispatch);
        dispatch(action);
        console.log(action);
    })

    it.skip('', () => {
        function a(b) {
            console.log('a');
        }
        function b(c) {
            console.log('b');
            console.log(c);
        }
        a(b('c'));
    })
    it.skip('', () => {
        const action = [];
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
        dispatch(action);
        console.log(action);
    })
});