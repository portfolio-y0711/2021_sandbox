const logMiddleware = require('./middleware.log')(require('../../util').LOG);
const cacheMiddleware = require('./middleware.cache')({
  db: require('../../cache-db')(), spy1: _=>{}, spy2: _=>{}, spy3: _=>{}
});
const httpMiddleware = require('./middleware.http')({
  spy1: _=>{}, spy2: _=>{}, spy3: _=>{}
});

/* eslint-disable global-require */
const middlewares = [
  logMiddleware,
  cacheMiddleware,
];
/* eslint-enable global-require */

module.exports = {
  middlewares,
};
