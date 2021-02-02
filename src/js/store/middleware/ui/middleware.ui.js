const {
   APP__UI_UPDATE, 
} = require('../../vo');

const UiMiddleware = ({ output, spy1, spy2 }) => (store) => (next) => (action) => {
    next(action);
}

module.exports = UiMiddleware;
