const { ActionCommand, ActionDocument, ActionEvent, AsyncActionCommand } = require('./entity');
const { ASY_DOCS_TODOITEMS, MOD_TODO_CREATE, MOD_TODO_DELETE } = require('./vo');
const { logCreator } = require('../../js/store/middleware/log/log.util');
/* eslint-disable prefer-destructuring */
const sampleTodos = [
  {
    id: '9377',
    name: 'this is list',
    date: '2021-01-20',
  },
  {
    id: 'efd3',
    name: 'this is another list',
    date: '2021-01-22',
  },
];

const uid = require('../util').uid;
const LOG = require('../util').LOG;

module.exports = (state = { itemTodos: [...sampleTodos] }, action) => {
  let item;
  if (action.constructor !== ActionDocument) {
      return ({ ...state });
  }

  switch(action) {
    case ASY_DOCS_TODOITEMS:
      return ({
        ...state,
        itemTodos: [...state.itemTodos, ...action.document],
      });
    case MOD_TODO_CREATE:
      item = ({
        id: uid(),
        ...action.document,
      });
      return ({
        ...state,
        itemTodos: [...state.itemTodos, item],
      });
    case MOD_TODO_DELETE:
      let result= ({
        ...state,
        itemTodos: [...state.itemTodos]
          .filter((_item) => _item.id !== action.document),
      });
      return result;
  }

  return ({ 
    ...state, 
  });
};
