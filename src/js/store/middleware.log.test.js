describe('Middleware Module: log', () => {
    it('logmiddleware catch every dispatches', () => {
        let spyFn = jest.fn();
        const createStoreForTest = require('#tests/middleware');
        const middlewares = [require('./middleware.log')(spyFn)];
        const store = createStoreForTest(middlewares);
        store.dispatch({type: 'TEST1'});
        store.dispatch({type: 'TEST2'});
        store.dispatch({type: 'TEST3'});
        expect(spyFn).toHaveBeenCalledTimes(3);
    })
})