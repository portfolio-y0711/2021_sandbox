describe('Middleware Module: cache', () => {
    it('cacheMiddleware catch any dispatch tagged as CACHE request', () => {
        let spyFn = jest.fn();
        const createStoreForTest = require('#tests/middleware');
        const middlewares = [require('./middleware.cache')(spyFn)];
        const store = createStoreForTest(middlewares);
        store.dispatch({type: 'CACHE request', payload: new Promise(res => { res('aaa') })});
        store.dispatch({type: 'CACHE request', payload: new Promise(res => { res('bbb') })});
        store.dispatch({type: 'CACHE request', payload: new Promise(res => { res('ccc') })});
        expect(spyFn).toHaveBeenCalledTimes(3);
    })
})