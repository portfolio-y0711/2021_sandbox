const compose = require('./compose')

describe('Store Module: compose', () => {
    let LOG;

    beforeEach(() => { 
        LOG = (msg) => { process.env.DEBUG ? console.log(msg): null };
    });

    it('can handle single function', () => {
        const plus = (x) => x + 2;
        expect(compose(plus)(5)).toEqual(7);
    });

    it('evalute function from theh right to left', () => {
        const plus = (x) => x + 3;
        const square = (x) => x * x;
        expect(compose(plus, square)(2)).toEqual(7);
    });

    it('evalute function from the right to left but next can reverse', () => {
        const may = (next) => (x) => { LOG('@1'); const result = next(x + ', may'); LOG('#1'); return result };
        const theForce = (next) => (x) => { LOG('@2'); const result = next(x + ' the force'); LOG('#2'); return result };
        const beWith = (next) => (x) => { LOG('@3'); const result = next(x + ' be with'); LOG('#3'); return result };
        const you = (next) => (x) => { LOG('@4'); const result = next(x + ' you'); LOG('#4'); return result };
        const print = (x) => x;
        expect(compose(may, theForce, beWith, you)(print)('Luke Skyway')).toEqual('Luke Skyway, may the force be with you');
    })

})