const {
  META,
  APP__INIT,
  APP__CACHE_REQUEST,
  APP__UI_UPDATE,
  CAC__CACHE_RESPONSE,
} = require('../vo');

/* eslint-disable no-unused-vars */
const LogMiddleware = (logger) => (store) => (next) => (action) => {
  switch(action.type) {
    case APP__CACHE_REQUEST:
      logger(`${APP__CACHE_REQUEST} ${action.meta.requestType}`);
      return next(action);
    case CAC__CACHE_RESPONSE:
      logger(`${CAC__CACHE_RESPONSE} ${action.meta.requestType}: ${action.meta.responseStatus}`);
      return next(action);
    default: 
      logger(`${action.type}`);
      return next(action);
  }
};
/* eslint-enable no-unused-vars */

module.exports = LogMiddleware;