const { LOG } = require('./util')

module.exports = (document, mediator) => new (class {
    todoForm
    addButton

    constructor() {
        this.setDefaultDate()
        this.todoForm = document.getElementById('todo-form')
        this.addButton = document.getElementById('add-button');
        this.listenToAddButton()
    }

    setDefaultDate(YYYY_MM_DD) {
        document.getElementById('todo-date').value = YYYY_MM_DD || new Date().toISOString().split('T')[0]
    }

    listenToAddButton () {
        this.addButton.addEventListener('click', (e) => {
            LOG('\n' + '[u/i] add-button clicked')
            e.preventDefault()
            const formInput = this.getTodoFormData(e)
            ;(this.validateTodoFormInput(formInput)) 
            ? (() => { console.error('input all entries') })()
            : (() => { 
                mediator.createTodoItem(formInput) 
                this.todoForm.reset() 
                this.setDefaultDate()
                })()
        }, true)
    }

    getTodoFormData() {
        const data = {}, formData = new FormData(this.todoForm);
        for (let [key, val] of formData.entries()) {
            data[key] = val
        }
        return data
    }

    validateTodoFormInput (formInput) {
        const isInValidate = formInput.date =="" || formInput.name == "";
        LOG(`[inp] ${isInValidate ? '(warning) invalidate form': 'validate form'}`)
        return isInValidate
    }
})
