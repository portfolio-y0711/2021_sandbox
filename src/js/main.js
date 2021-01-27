const input = require('./input');
const output = require('./output');
const store = require('./store');
const db = require('./cache-db');

require('./mediator')(
  document,
  input,
  output,
  store,
  db,
);
