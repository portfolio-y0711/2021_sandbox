const { ActionEvent, ActionCommand, ActionDocument } = require('../../entity');
const { MOD_OUTPUT_LOADED, APP_CACHE_FETCH } = require('../../vo');

const AppMiddleware = (dispatch) => (store) => (next) => (action) => {
   next(action);
   dispatch ? store.dispatch = dispatch : null;
   if (action.constructor === ActionEvent) {
       switch(action) {
           case MOD_OUTPUT_LOADED:
            store.dispatch(APP_CACHE_FETCH);
            break;
       }
   }

   if (action.constructor === ActionCommand) {
    //    store.dispatch(action);
       return;
   }

   if (action.constructor === ActionDocument) {
    //    store.dispatch(action);
       return;
   }
}

module.exports = {
    AppMiddleware,
}
// const AppMiddleware = ({spy1}) => ({dispatch}) => (next) => (action) => {
//   next(action);
//   switch (action.type) {
//     case APP__INIT: 
//       spy1()
//       dispatch({
//           type: APP__CACHE_REQUEST,
//           meta: {
//               requestType: META.READ
//           }
//       });
//       return
//     case CAC__CACHE_RESPONSE: 
//       if (action.meta.responseStatus === META.SUCCESS) {
//           console.log(action);
//           spy1()
//           dispatch({ type: '[APP] props UPDATE', payload: action.payload });
//       }
//       return
//     default:
//       return
//   }
// };

// module.exports = AppMiddleware;
