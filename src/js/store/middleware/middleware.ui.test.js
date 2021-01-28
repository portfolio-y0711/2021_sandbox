const {
    META,
    APP__INIT,
    APP__CACHE_REQUEST,
    CAC__CACHE_RESPONSE,
    APP__UI_UPDATE,
} = require('../vo');

document.documentElement.innerHTML = require('#tests/html');

describe('Middleware: ui', () => {
    let createStoreForTest;
    let output;

    beforeAll(() => {
        createStoreForTest = require('#tests/middleware');
        output = require('../../output')(document, { });
    })

    it(`uiMiddleware catch "${APP__UI_UPDATE}`, () => {
        const spyFn = jest.fn();
        const middlewares = [
            require('./middleware.ui')({
                output,
                spy1: spyFn,
                spy2: () => {},
            })
        ];
        const store = createStoreForTest(middlewares);
        store.dispatch({
            type: APP__UI_UPDATE,
            payload: []
        })
        expect(spyFn).toHaveBeenCalledTimes(1);
    })

    it(`uiMiddleware catch "${APP__UI_UPDATE}`, () => {
        const output = require('../../output')(document, { });
        const spyFn = jest.spyOn(output, 'updateDisplay');
        const middlewares = [
            require('./middleware.ui')({
                output,
                spy1: () => {},
                spy2: () => {},
            })
        ];
        const store = createStoreForTest(middlewares);
        const expected = [
            {
                id: 'SDF9',
                name: 'this is for ui test for APP1',
                createdAt: new Date().toString(),
                updatedAt: new Date().toString()
            }, 
        ]

        store.dispatch({
            type: APP__UI_UPDATE,
            payload: expected
        })
        expect(spyFn).toHaveBeenCalledWith(expected);
    })
})
