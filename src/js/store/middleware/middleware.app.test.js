const APP__INIT = '[APP] Init';

describe('Middleware: app', () => {
    it(`appMiddleware catch "${APP__INIT}" action`, async () => {
        let spyFn = jest.fn();
        const createStoreForTest = require('#tests/middleware');
        const middlewares = [require('./middleware.app')({ spy1: spyFn })];
        const store = createStoreForTest(middlewares);
        store.dispatch({type: APP__INIT });
        expect(spyFn).toHaveBeenCalledTimes(1);
    })

    it(`appMiddleware catch "${APP__INIT}" action`, async () => {
        let spyFn = jest.fn();
        const createStoreForTest = require('#tests/middleware');
        const middlewares = [require('./middleware.app')({ spy1: spyFn })];
        const store = createStoreForTest(middlewares);
        store.dispatch({type: APP__INIT });
        expect(spyFn).toHaveBeenCalledTimes(1);
    })
})