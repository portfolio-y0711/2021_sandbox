const logMiddleware = require('./middleware.log');
const cacheMiddleware = require('./middleware.cache')({
  spy1: _=>{}, spy2: _=>{}, spy3: _=>{}
});
const httpMiddleware = require('./middleware.http')({
  spy1: _=>{}, spy2: _=>{}, spy3: _=>{}
});

/* eslint-disable global-require */
const middlewares = [
  logMiddleware(require('../../util').LOG),
  cacheMiddleware,
];
/* eslint-enable global-require */

module.exports = {
  logMiddleware,
  httpMiddleware,
  cacheMiddleware,
  middlewares,
};
