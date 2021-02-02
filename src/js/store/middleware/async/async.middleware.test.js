let { createStoreForMiddlewareTest } = require('#tests/middleware');
const { CCH_DB_AWAIT, ASY_DOCS_TODOITEMS } = require('../../vo');

describe('Middleware: async', () => {
    const AsyncMiddleware = require('./middleware.async');

    it('catch any AsyncActionCommand dispach with promise', async() => {
       let actual;
       const middlewares = [AsyncMiddleware((x) => { actual = x })];
       const store = createStoreForMiddlewareTest(middlewares);
       const expected = ASY_DOCS_TODOITEMS;
       CCH_DB_AWAIT.promise = new Promise((res, rej) => setTimeout(res, 500, 'promised result'));
       store.dispatch(CCH_DB_AWAIT);
       await new Promise(res => setTimeout(res, 1000));
       expect(actual.document).toEqual(expected.document);
    })

    it('catch any AsyncActionCommand dispach with promise', async() => {
       let actual;
       const middlewares = [AsyncMiddleware()];
       const store = createStoreForMiddlewareTest(middlewares);
       const expected = ASY_DOCS_TODOITEMS;
       CCH_DB_AWAIT.promise = new Promise((res, rej) => setTimeout(res, 500, 
            [
                {
                    id: 'sdf8',
                    name: 'this is list',
                    date: '2021-01-20',
                },
                {
                    id: '32Rg',
                    name: 'this is another list',
                    date: '2021-01-22',
                },
            ]
       ));
       store.dispatch(CCH_DB_AWAIT);
       await new Promise(res => setTimeout(res, 1000));
       console.log(store.getState());
    //    expect(actual.document).toEqual(expected.document);
    })

})