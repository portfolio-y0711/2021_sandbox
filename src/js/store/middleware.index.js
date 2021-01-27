/* eslint-disable no-unused-vars */
const logMiddleware = (logger) => (store) => (next) => (action) => {
  logger(`[log] action type: ${action.type}`);
  return next(action);
};
/* eslint-enable no-unused-vars */

const cacheMiddleware = (injection) => ({ dispatch }) => (next) => async(action) => {
  next(action);
  switch(action.type) {
    case 'CACHE request':
      injection();
      response = await action.payload;
      const newAction = {
        type: 'CACHE response SUCCESS',
        payload: response,
      };
      dispatch(newAction);
      return next(action);
    default:
      return next(action);
  }
};


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
  cacheMiddleware,
  middlewares,
};
