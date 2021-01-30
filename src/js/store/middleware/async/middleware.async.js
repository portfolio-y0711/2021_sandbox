
const AsyncMiddleware = ({spy1}) => ({dispatch}) => (next) => (action) => {
  next(action);
  if (!action.payload || !action.payload.then) {
    return next(action);
    }
    action.payload
        .then(response => {
            const newAction =  {...action, payload: response };
            dispatch(newAction);
            spy1(newAction);
    });
};

module.exports = AsyncMiddleware;
