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

  switch (action.type) {
    case 'create':
      item = ({
        id: uid(),
        ...action.payload,
      });
      LOG(`[str] create item ${item.id}`);
      return ({ ...state, itemTodos: [...state.itemTodos, item] });

    case 'delete':
      LOG(`[str] delete item ${action.payload}`);
      return ({
        ...state,
        itemTodos: [...state.itemTodos]
          .filter((_item) => _item.id !== action.payload),
      });

    case 'read':
    default:
      return ({ ...state });
  }
};
