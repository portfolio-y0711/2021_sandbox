const { ActionLogger } = require('./log.util');
const actionLogger = ActionLogger({ logger: console.log }) 
const { LogMiddleware } = require('./log.middleware')
const logMiddleware = LogMiddleware({ actionLogger })

module.exports = logMiddleware;
