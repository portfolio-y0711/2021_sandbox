const logMiddleware = require('./log/middleware.log')(require('../../util').LOG);
const cacheMiddleware = require('./cache/middleware.cache')({
  db: require('../../cache-db')(), spy1: _=>{}, spy2: _=>{}, spy3: _=>{}
});
const appMiddleware = require('./app/middleware.app')({
  spy1: _=>{}
});
const asyncMiddleware = require('./async/middleware.async')({
  spy1: _=> {}
})

/* eslint-disable global-require */
const middlewares = [
  appMiddleware,
  cacheMiddleware,
  logMiddleware,
  asyncMiddleware,
];
/* eslint-enable global-require */

module.exports = {
  middlewares,
};
