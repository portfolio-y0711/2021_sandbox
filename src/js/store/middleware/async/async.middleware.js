const { AsyncActionCommand } = require('../../entity');
const { CCH_DB_AWAIT, ASY_DOCS_TODOITEMS } = require('../../vo');

const AsyncMiddleware = (dispatch) => (store) => (next) => async(action) => {
  next(action);
  if (action.constructor !== AsyncActionCommand) {
    return;
  }
  dispatch ? (store.dispatch = dispatch) : null;

  switch(action) {
    case CCH_DB_AWAIT:
      const res = await action.promise
      ASY_DOCS_TODOITEMS.document = res;
      store.dispatch(ASY_DOCS_TODOITEMS);
      return;
  }
};

module.exports = {
  AsyncMiddleware
};
