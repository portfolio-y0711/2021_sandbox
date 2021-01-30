

describe('Middleware: async', () => {
    let createStoreForTest;

    beforeAll(async() => {
        createStoreForTest = require('#tests/middleware');
    })

    it('catch any dispach with promised paylod', async() => {
       const spyFn = jest.spyOn({ dispatch: (newAction) => {}}, 'dispatch');
       const middlewares = [require('./middleware.async')({
           spy1: spyFn,
       })];
       const store = createStoreForTest(middlewares);
       store.dispatch({ type: 'anything', payload: new Promise(res => { setTimeout(res, 1000, 'promised answer') }) });
       await new Promise(res => setTimeout(res, 1));
       expect(spyFn).toHaveBeenCalledTimes(0);
       await new Promise(res => setTimeout(res, 1000));
       expect(spyFn).toHaveBeenCalledWith({
           type: "anything",
           payload: "promised answer",
       });
    })
})