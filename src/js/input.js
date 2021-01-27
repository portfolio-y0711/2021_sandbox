/* eslint-disable no-param-reassign */
const { LOG } = require('./util');

module.exports = (document, mediator) => new (class {
  todoForm;
  addButton;
  document;

  constructor() {
    this.document = document;
    this.todoForm = document.getElementById('todo-form');
    this.addButton = document.getElementById('add-button');
    this.setDefaultDate();
    this.listenToAddButton();
  }

  // eslint-disable-next-line class-methods-use-this
  setDefaultDate(YYYY_MM_DD) {
    this.document.getElementById('todo-date').value = YYYY_MM_DD || new Date().toISOString().split('T')[0];
  }

  listenToAddButton() {
    this.addButton.addEventListener('click', (e) => {
      LOG('\n[u/i] add-button clicked');
      e.preventDefault();
      const formInput = this.getTodoFormData(e);
      if (this.validateTodoFormInput(formInput)) {
          console.error('input all entries!');
      } else {
          mediator.createTodoItem(formInput);
          this.todoForm.reset();
          this.setDefaultDate();
      }
    }, true);

    this.todoForm.addEventListener('keydown', (e) => {
      if (e.keyCode === 13) {
        e.preventDefault();
        LOG('\n[u/i] keydown enter');
        const formInput = this.getTodoFormData(e);
        if (this.validateTodoFormInput(formInput)) {
            console.error('input all entries!');
        } else {
            mediator.createTodoItem(formInput);
            this.todoForm.reset();
            this.setDefaultDate();
        }
      }
    }, true);
  }

  getTodoFormData() {
    const formData = new FormData(this.todoForm);
    return Array.from(formData.entries()).reduce((acc, [key, val]) => {
      const prop = { [`${key}`]: val };
      return { ...acc, ...prop };
    }, {});
  }

  validateTodoFormInput(formInput) {
    const isInValidate = formInput.date === '' || formInput.name === '';
    LOG(`[inp] ${isInValidate ? '(warning) invalidate form' : 'validate form'}`);
    return isInValidate;
  }
})();
