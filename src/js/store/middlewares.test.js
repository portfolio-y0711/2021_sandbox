/* eslint-disable global-require */
// eslint-disable-next-line no-undef
describe('Store Module: middlewares', () => {
    let applyMiddleware;
    let createStore;
    let middlewares;
    let reducer;
    let store;

    beforeEach(() => {
        applyMiddleware = require('./_lib/applyMiddleware');
        createStore = require('./_lib/createStore');
        middlewares = require('./middlewares').middlewares;
        reducer = require('./reducer');
        store = createStore();
    })

    it('logMiddleware catch every dispatches', () => {
        spyFn = jest.fn();
        middlewares = [require('./middlewares').logMiddleware(spyFn)];
        const store = applyMiddleware(... middlewares)(createStore)(reducer);
        store.dispatch({type: 'TEST1'});
        store.dispatch({type: 'TEST2'});
        store.dispatch({type: 'TEST3'});
        expect(spyFn).toHaveBeenCalledTimes(3);
    })

    it('asyncMiddleware catch dispatch containing promised payload', () => {
        spyFn = jest.fn();
        middlewares = [require('./middlewares').asyncMiddleware(spyFn)];
        const store = applyMiddleware(... middlewares)(createStore)(reducer);
        store.dispatch({
            type: 'HTTP request',
            payload: new Promise(res => {
                res('success')
            })
        });
        store.dispatch({type: 'TEST2'});
        store.dispatch({type: 'TEST3'});
        expect(spyFn).toHaveBeenCalledTimes(1);
    })
})
