const {
  META, 
  APP__INIT, 
  APP__CACHE_REQUEST, 
  CAC__CACHE_RESPONSE,
} = require('../../vo');


const AppMiddleware = ({spy1}) => ({dispatch}) => (next) => (action) => {
  next(action);
  switch (action.type) {
    case APP__INIT: 
      spy1()
      dispatch({
          type: APP__CACHE_REQUEST,
          meta: {
              requestType: META.READ
          }
      });
      return
    case CAC__CACHE_RESPONSE: 
      if (action.meta.responseStatus === META.SUCCESS) {
          console.log(action);
          spy1()
          dispatch({ type: '[APP] props UPDATE', payload: action.payload });
      }
      return
    default:
      return
  }
};

module.exports = AppMiddleware;
