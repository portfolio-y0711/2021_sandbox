const applyMiddleware = require('./_lib/applyMiddleware');
const createStore = require('./_lib/createStore');
const reducer = require('./reducer');
/* eslint prefer-destructuring: ["off", {VariableDeclarator: {object: true}}] */
const middlewares = require('./middlewares').middlewares;
/* eslint prefer-destructuring: ["off", {VariableDeclarator: {object: true}}] */

module.exports = (() => applyMiddleware(...middlewares)(createStore)(reducer))();
