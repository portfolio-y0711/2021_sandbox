const { 
    META,
    APP__INIT,
    APP__CACHE_REQUEST,
} = require('./store/vo');
const { LOG } = require('./util');
const seed = require('./cache-db/seed');

module.exports = (doc, input, output, store, db) => new (class {
    input;
    output;
    store;
    constructor() {
        this.output = output(doc, this);
        this.store = store;
        this.input = input(doc, this);
        this.initialize();
        // this.readTodoItems();
    }
    initialize() {
        this.store.dispatch({ type: APP__INIT, payload: seed });
        // this.store.dispatch({ type: APP__CACHE_REQUEST, meta: { requestType: META.READ }});
    }
    readTodoItems() {
        this.output.updateDisplay(this.store.getState().itemTodos);
    }
    createTodoItem(item) {
        LOG('[med] create new todo');
        this.store.dispatch({type: 'create', payload: item});
        this.store.dispatch({type: 'CACHE request', payload: item, meta: { requestType: 'CREATE' }});
        this.output.updateDisplay(this.store.getState().itemTodos);
    }
    deleteTodoItem(itemId) {
        LOG(`[med] delete todo`);
        this.store.dispatch({type: 'delete', payload: itemId});
        this.store.dispatch({type: 'CACHE request', meta: { requestType: 'DELETE' }});
        this.output.updateDisplay(this.store.getState().itemTodos);
    }
})
