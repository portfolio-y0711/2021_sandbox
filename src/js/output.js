const { LOG } = require('./util');
const { MOD_TODO_DELETE, MOD_OUTPUT_LOADED } = require('./store/vo');

module.exports = (document, store) => new (class {
    todoList;
    constructor() {
        this.todoList = document.getElementById('todo-list');
        store.dispatch(MOD_OUTPUT_LOADED);
        store.subscribe(() => {
            this.updateDisplay(store.getState().itemTodos);
            // this.updateDisplay(store.getState().todoItems);
        })
    }
    updateDisplay(items) {
        LOG('[out] updateDisplay');
        while(this.todoList.firstChild) {
           this.todoList.removeChild(this.todoList.firstChild);
        }
        items
            .map(item => createListItem(document, store, item))
            .forEach(listItem => {
                this.todoList.append(listItem);
            })
    }
})();

const createListItem = (document, store, item) => {
    const li = document.createElement('li');
    li.setAttribute('id', item.id);
    const [time, p, button] = [
        document.createElement('time'),
        document.createElement('p'),
        document.createElement('button')
    ]
    time.datetime = item.date
    time.textContent = item.date
    p.textContent = item.name
    button.textContent = 'delete'
    button.addEventListener('click', (e) => {
        e.preventDefault()
        LOG('\n' + '[u/i] delete btn clicked')
        const itemId = e.target.parentNode.id
        MOD_TODO_DELETE.document = itemId;
        store.dispatch(MOD_TODO_DELETE)
        // mediator.deleteTodoItem(itemId)
    })
    li.appendChild(time)
    li.appendChild(p)
    li.appendChild(button)
    li.classList.add('todo-item')
    return li
}