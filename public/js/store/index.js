const applyMiddleware = require('./_lib/applyMiddleware')
// const bindAction = require('./_lib/bindAction')
const createStore = require('./_lib/createStore')
const reducer = require('./reducer')
const middlewares = require('./middlewares').middlewares

module.exports = (() => 
    applyMiddleware(...middlewares)(createStore)(reducer)
)()
