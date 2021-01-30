
describe('Middleware Module: http', () => {
    it('cacheMiddleware catch any dispatch tagged as HTTP request', () => {
        let spyFn = jest.fn();
        const createStoreForTest = require('#tests/middleware');
        const middlewares = [require('./middleware.http')(spyFn)];
        const store = createStoreForTest(middlewares);
        store.dispatch({type: 'HTTP request', payload: new Promise(res => { res('aaa') })});
        store.dispatch({type: 'HTTP request', payload: new Promise(res => { res('bbb') })});
        store.dispatch({type: 'HTTP request', payload: new Promise(res => { res('ccc') })});
        expect(spyFn).toHaveBeenCalledTimes(3);
    })
})