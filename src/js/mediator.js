const { 
    SENDER_TYPE, 
    SUBJECT_TYPE, 
    MESSAGE_TYPE,
    DOC_TYPE,
    COMMAND_TYPE,
    MOD_OUTPUT_LOADED,
    MOD_TODO_CREATE,
    MOD_TODO_DELETE,
} = require('./store/vo');
const { ActionCommand, ActionDocument, ActionEvent } = require('./store/entity');
const { LOG } = require('./util');
const seed = require('./cache-db/seed');

module.exports = (doc, input, output, store) => new (class {
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
        this.store.dispatch(MOD_OUTPUT_LOADED);
        this.output.updateDisplay(this.store.getState().itemTodos);
    }
    readTodoItems() {
        this.output.updateDisplay(this.store.getState().itemTodos);
    }
    createTodoItem(item) {
        // LOG('[med] create new todo');
        MOD_TODO_CREATE.document = item;
        this.store.dispatch(MOD_TODO_CREATE);
        this.output.updateDisplay(this.store.getState().itemTodos);
    }
    deleteTodoItem(itemId) {
        // LOG(`[med] delete todo`);
        MOD_TODO_DELETE.document = itemId;
        this.store.dispatch(MOD_TODO_DELETE)
        this.output.updateDisplay(this.store.getState().itemTodos);
        // this.store.dispatch({type: 'delete', payload: itemId});
        // this.store.dispatch({type: 'CACHE request', meta: { requestType: 'DELETE' }});
    }
})
