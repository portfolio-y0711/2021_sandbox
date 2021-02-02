const { LOG } = require('./util');

module.exports = (doc, input, output, store) => new (class {
    input;
    output;
    store;
    constructor() {
        this.output = output(doc, store);
        this.input = input(doc, store);
        this.store = store;
    }
})
