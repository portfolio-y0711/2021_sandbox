const { LOG } = require('./util');

module.exports = (document, mediator) => new (class {
    todoList;
    constructor() {
        this.todoList = document.getElementById('todo-list');
    }
    updateDisplay(items) {
        LOG('[out] updateDisplay');
        while(this.todoList.firstChild) {
           this.todoList.removeChild(this.todoList.firstChild);
        }
        items
            .map(item => createListItem(document, mediator, item))
            .forEach(listItem => {
                this.todoList.append(listItem);
            })
    }
})


const createListItem = (document, mediator, item) => {
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
        mediator.deleteTodoItem(itemId)
    })
    li.appendChild(time)
    li.appendChild(p)
    li.appendChild(button)
    li.classList.add('todo-item')
    return li
}