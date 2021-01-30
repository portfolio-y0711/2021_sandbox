const {
   APP__UI_UPDATE, 
} = require('../../vo');

const UiMiddleware = ({ output, spy1, spy2 }) => (store) => (next) => (action) => {
    next(action);
    switch (action.type) {
        case APP__UI_UPDATE:
            spy1();
            output.updateDisplay(action.payload);
            return
        default:
            return 
    }
}

module.exports = UiMiddleware;
