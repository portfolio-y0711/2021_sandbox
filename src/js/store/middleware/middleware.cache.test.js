const APP__INIT = '[APP] Init';
const APP__CACHE_REQUEST = '[APP] CACHE request';
const META = {
   READ   : 'READ',
   CREATE : 'CREATE',
   DELETE : 'DELETE',
   SUCCESS: 'SUCCESS',
};

describe('Middleware Module: cacheMiddleware', () => {
    let createStoreForTest;
    let db;
    beforeAll(async() => {
        createStoreForTest = require('#tests/middleware');
        db = require('../../cache-db')();
    })

    afterEach(async() => {
        await db.resetDB();
    })

    it(`catch any dispatch tagged as "${APP__INIT}"`, async () => {
        const spyFn = jest.fn();
        const middlewares = [require('./middleware.cache')({ db, spy1: spyFn, spy2: () => {}, spy3: () => {}})];
        const store = createStoreForTest(middlewares);
        store.dispatch({type: APP__INIT});
        await new Promise(res => setTimeout(res, 1));
        expect(spyFn).toHaveBeenCalledTimes(1);
    })

    it(`catch any dispatch tagged as "${APP__INIT}"`, async () => {
        const spyFn = jest.fn();
        const middlewares = [require('./middleware.cache')({ db, spy1: spyFn, spy2: () => {}, spy3: () => {}})];
        const store = createStoreForTest(middlewares);
        store.dispatch({
            type: APP__INIT, 
            payload: [
                {
                    id: '23f%',
                    name: 'this is seed from cache test',
                    date: '2021-02-24',
                },
                {
                    id: '#fr4',
                    name: 'this is seed from cache test',
                    date: '2021-01-22',
                },
            ]
        });
        await new Promise(res => setTimeout(res, 100));
        expect(spyFn).toHaveBeenCalledTimes(1);
    })


    it(`catch any dispatch tagged as "${APP__INIT}"`, async () => {
        const spyFn = jest.fn();
        const middlewares = [require('./middleware.cache')({ db, spy1: spyFn, spy2: () => {}, spy3: () => {}})];
        const store = createStoreForTest(middlewares);
        store.dispatch({type: APP__INIT});
        await new Promise(res => setTimeout(res, 1));
        expect(spyFn).toHaveBeenCalledTimes(1);
    })

    it(`catch any dispatch tagged as "${APP__CACHE_REQUEST}" with meta info ${META.READ}`, () => {
        const spyFn = jest.fn();
        const middlewares = [require('./middleware.cache')({ db, spy1: spyFn, spy2: () => {}, spy3: () => {}})];
        const store = createStoreForTest(middlewares);
        store.dispatch({type: APP__CACHE_REQUEST , payload: new Promise(res => { res('aaa') }), meta: { requestType: 'READ' }});
        store.dispatch({type: APP__CACHE_REQUEST , payload: new Promise(res => { res('bbb') }), meta: { requestType: 'READ' }});
        store.dispatch({type: APP__CACHE_REQUEST , payload: new Promise(res => { res('ccc') }), meta: { requestType: 'READ' }});
        expect(spyFn).toHaveBeenCalledTimes(3);
    })

    it(`catch any dispatch tagged as "${APP__CACHE_REQUEST}" with meta info ${META.READ} and fetch itemTodos from cache on `, async() => {
        const spyFn = jest.spyOn({ dispatch: (newAction) => {} }, 'dispatch');
        const middlewares = [require('./middleware.cache')({ db, spy1: () => {}, spy2: spyFn, spy3: () => {} })];
        const store = createStoreForTest(middlewares);
        db.createItem({
            id: '3BX%',
            name: 'this is from cache middleware test 1'
        });
        await store.dispatch({type: APP__CACHE_REQUEST , payload: new Promise(res => { res('aaa') }), meta: { requestType: META.READ }});
        await new Promise(res => setTimeout(res, 0));
        expect(spyFn).toHaveBeenCalledWith({ 
            payload: [{
                id: '3BX%',
                name: 'this is from cache middleware test 1'
            }], 
            type: '[CAC] CACHE response',
            meta: { 
                requestType: META.READ,
                resultType: META.SUCCESS, 
            }
        });
    })


    it(`catch any dispatch tagged as "${APP__CACHE_REQUEST}" with meta info DELETE`, () => {
        let spyFn = jest.fn();
        const middlewares = [require('./middleware.cache')({ db, spy1: spyFn, spy2: () => {}, spy3: () => {}})];
        const store = createStoreForTest(middlewares);
        store.dispatch({type: APP__CACHE_REQUEST, payload: new Promise(res => { res('aaa') }), meta: { requestType: 'DELETE' }});
        store.dispatch({type: APP__CACHE_REQUEST, payload: new Promise(res => { res('bbb') }), meta: { requestType: 'DELETE' }});
        store.dispatch({type: APP__CACHE_REQUEST, payload: new Promise(res => { res('ccc') }), meta: { requestType: 'DELETE' }});
        expect(spyFn).toHaveBeenCalledTimes(3);
    })

    it(`catch any dispatch tagged as "${APP__CACHE_REQUEST}" with meta info CREATE`, () => {
        let spyFn = jest.fn();
        const middlewares = [require('./middleware.cache')({ db, spy1: spyFn, spy2: () => {}, spy3: () => {}})];
        const store = createStoreForTest(middlewares);
        store.dispatch({type: APP__CACHE_REQUEST, payload: new Promise(res => { res('aaa') }), meta: { requestType: 'CREATE' }});
        store.dispatch({type: APP__CACHE_REQUEST, payload: new Promise(res => { res('bbb') }), meta: { requestType: 'CREATE' }});
        store.dispatch({type: APP__CACHE_REQUEST, payload: new Promise(res => { res('ccc') }), meta: { requestType: 'CREATE' }});
        expect(spyFn).toHaveBeenCalledTimes(3);
    })

    it(`skip any dispatch without a tagged with "${APP__CACHE_REQUEST}"`, async() => {
        const spyFn = jest.spyOn({ dispatch: (newAction) => {} }, 'dispatch');
        createStoreForTest = require('#tests/middleware');
        const middlewares = [require('./middleware.cache')({ db, spy1: () => {}, spy2: () => {}, spy3: spyFn })];
        const store = createStoreForTest(middlewares);
        store.dispatch({type: 'this is not CACHE request', payload: new Promise(res => { res('aaa') })});
        await new Promise(res => setTimeout(res, 0));
        expect(spyFn).toHaveBeenCalledTimes(1);
    })

})