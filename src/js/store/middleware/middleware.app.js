const APP__INIT = '[APP] Init';
const APP__CACHE_REQUEST = '[APP] CACHE request';

const AppMiddleware = ({ spy1 }) => ({dispatch}) => (next) => (action) => {
  next(action);
  switch(action.type) {
    case APP__INIT:
        spy1()
        dispatch({ type: APP__CACHE_REQUEST, meta: { requestType: 'READ' }});
        return
    default:
        return
  }
};

module.exports = AppMiddleware;