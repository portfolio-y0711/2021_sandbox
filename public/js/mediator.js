const { LOG } = require('./util')

module.exports = (doc, input, output, store, db) => new (class {
    input;
    output;
    store;
    constructor() {
        this.output = output(doc, this);
        this.store = store;
        this.input = input(doc, this);
        this.readTodoItems();
    }
    readTodoItems() {
        LOG('[med] read todos');
        this.store.dispatch({ type: 'read'});
        this.output.updateDisplay(this.store.getState().itemTodos);
    }
    createTodoItem(item) {
        LOG('[med] create new todo');
        this.store.dispatch({type: 'create', payload: item});
        this.output.updateDisplay(this.store.getState().itemTodos);
    }
    deleteTodoItem(itemId) {
        LOG(`[med] delete todo`);
        this.store.dispatch({type: 'delete', payload: itemId});
        this.output.updateDisplay(this.store.getState().itemTodos);
    }
})
