
describe('Middleware: internals', () => {
    let createStoreForTest;
    let store;

    beforeAll(() => {
        createStoreForTest = require('#tests/middleware');
    })

    it.skip(`(1) right to left processing order`, async() => {
        let actual = [];
        const middlewares = [
            (store) => (next) => async(action) => {
                actual.push('1_stack_open');
                actual.push('11');
                actual.push('1_pause');
                next(action);
                actual.push('1_resume');
                actual.push('12');
                return actual.push('1_stack_closed');
            },
            (store) => (next) => async(action) => {
                actual.push('2_stack_open');
                actual.push('21');
                actual.push('2_pause');
                next(action);
                actual.push('2_resume');
                actual.push('22');
                return actual.push('2_stack_closed');
            },
            ({dispatch}) => (next) => async(action) => {
                actual.push('3_stack_open');
                actual.push('31');
                actual.push('3_pause');
                ;(action.type === 'test') && dispatch({ type: 'test2' });
                next(action);
                actual.push('3_resume');
                actual.push('32');
                return actual.push('3_stack_closed');
            },
        ];
        const store = createStoreForTest(middlewares);
        store.dispatch({ type: 'test' })
        console.log(actual);
        await new Promise(res => setTimeout(res, 1000));
        expect(actual).toEqual([3, 2, 1]);
    })


    it.skip(`(2) right to left processing order`, async() => {
    })
})

