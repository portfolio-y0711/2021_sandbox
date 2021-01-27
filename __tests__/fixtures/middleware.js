let applyMiddleware = require('../../src/js/store/_lib/applyMiddleware');
let createStore = require('../../src/js/store/_lib/createStore');
let reducer = require('../../src/js/store/reducer');

module.exports = (middlewares) => applyMiddleware(...middlewares)(createStore)(reducer);