describe('Middleware Module: cacheMiddleware', () => {

    it('catch any dispatch tagged as CACHE request', () => {
        let spyFn = jest.fn();
        const createStoreForTest = require('#tests/middleware');
        const middlewares = [require('./middleware.cache')({ spy1: spyFn, spy2: () => {}, spy3: () => {}})];
        const store = createStoreForTest(middlewares);
        store.dispatch({type: 'CACHE request', payload: new Promise(res => { res('aaa') })});
        store.dispatch({type: 'CACHE request', payload: new Promise(res => { res('bbb') })});
        store.dispatch({type: 'CACHE request', payload: new Promise(res => { res('ccc') })});
        expect(spyFn).toHaveBeenCalledTimes(3);
    })

    it('awaits response of promise and fires a dispatch', async() => {
        const spyFn = jest.spyOn({ dispatch: (newAction) => {} }, 'dispatch');
        const createStoreForTest = require('#tests/middleware');
        const middlewares = [require('./middleware.cache')({ spy1: () => {}, spy2: spyFn, spy3: () => {} })];
        const store = createStoreForTest(middlewares);
        store.dispatch({type: 'CACHE request', payload: new Promise(res => { res('aaa') })});
        await new Promise(res => setTimeout(res, 0));
        expect(spyFn).toHaveBeenCalledWith({ payload: 'aaa', type: 'CACHE response SUCCESS'});
    })

    it('skip dispatch without a tagged with CACHE request', async() => {
        const spyFn = jest.spyOn({ dispatch: (newAction) => {} }, 'dispatch');
        const createStoreForTest = require('#tests/middleware');
        const middlewares = [require('./middleware.cache')({ spy1: () => {}, spy2: () => {}, spy3: spyFn })];
        const store = createStoreForTest(middlewares);
        store.dispatch({type: 'CACHE request', payload: new Promise(res => { res('aaa') })});
        await new Promise(res => setTimeout(res, 0));
        expect(spyFn).toHaveBeenCalledTimes(1);
    })
})