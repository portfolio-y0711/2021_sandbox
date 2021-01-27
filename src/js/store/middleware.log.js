/* eslint-disable no-unused-vars */
const LogMiddleware = (logger) => (store) => (next) => (action) => {
  logger(`[log] action type: ${action.type}`);
  return next(action);
};
/* eslint-enable no-unused-vars */

module.exports = LogMiddleware;