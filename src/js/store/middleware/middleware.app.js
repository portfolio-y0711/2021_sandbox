const {
  META, 
  APP__INIT, 
  APP__CACHE_REQUEST, 
  CAC__CACHE_RESPONSE,
  APP__UI_UPDATE,
} = require('../vo');


const AppMiddleware = ({spy1}) => ({dispatch}) => (next) => (action) => {
  next(action);
  switch (action.type) {
    case APP__INIT: spy1()
      dispatch({
          type: APP__CACHE_REQUEST,
          meta: {
              requestType: META.READ
          }
      });
      return
    case CAC__CACHE_RESPONSE: switch (action.meta.resultType) {
      case META.SUCCESS:
          spy1()
          dispatch({ type: APP__UPDATE, payload: action.payload });
          return
      }
    default:
        return
  }
};

module.exports = AppMiddleware;
