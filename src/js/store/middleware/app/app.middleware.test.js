const { SENDER_TYPE, SUBJECT_TYPE, MESSAGE_TYPE, MOD_OUTPUT_LOADED, APP_CACHE_FETCH } = require('../../vo');
const { ActionEvent, ActionCommand, ActionDocument } = require('../../entity');
const { logCreator: _ } = require('../log/log.util');

describe('Middleware: app', () => {
    const { createStoreForMiddlewareTest }  = require('#tests/middleware')

    it(`catches ActionEvent with ${_(MOD_OUTPUT_LOADED)}`, () => {
        let actual;
        const { AppMiddleware } = require('./app.middleware');
        const store = createStoreForMiddlewareTest([AppMiddleware((action) => { actual = action })]);
        store.dispatch(MOD_OUTPUT_LOADED);
        expect(actual).toEqual(APP_CACHE_FETCH);
    })

    // it(`appMiddleware catch "${APP__INIT}" action`, async () => {
    //     let spyFn = jest.fn();
    //     const createStoreForTest = require('#tests/middleware');
    //     const middlewares = [require('./middleware.app')({ spy1: spyFn })];
    //     const store = createStoreForTest(middlewares);
    //     store.dispatch({type: APP__INIT });
    //     expect(spyFn).toHaveBeenCalledTimes(1);
    // })

    // it(`appMiddleware catch "${APP__INIT}" action`, async () => {
    //     let spyFn = jest.fn();
    //     const createStoreForTest = require('#tests/middleware');
    //     const middlewares = [require('./middleware.app')({ spy1: spyFn })];
    //     const store = createStoreForTest(middlewares);
    //     store.dispatch({type: APP__INIT });
    //     expect(spyFn).toHaveBeenCalledTimes(1);
    // })

})