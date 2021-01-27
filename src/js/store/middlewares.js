/* eslint-disable no-unused-vars */
const logMiddleware = (logger) => (store) => (next) => (action) => {
  logger(`[log] action type: ${action.type}`);
  return next(action);
};
/* eslint-enable no-unused-vars */

const asyncMiddleware = (injection) => ({ dispatch }) => (next) => (action) => {
  if (!action.payload || !action.payload.then) {
    return next(action);
  }
  injection();
  action.payload.then((response) => {
    const newAction = {
      ...action,
      payload: response,
    };
    dispatch(newAction);
  });
  return next(action);
};

/* eslint-disable global-require */
const middlewares = [
  logMiddleware(require('../util').LOG),
];
/* eslint-enable global-require */

module.exports = {
  logMiddleware,
  asyncMiddleware,
  middlewares,
};
