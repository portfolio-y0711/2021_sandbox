const { ActionCommand } = require('../../entity');
const { APP_CACHE_FETCH, CCH_DB_AWAIT } = require('../../vo');

const CacheMiddleware = (db, dispatch) => (store) => (next) => (action) => {
  next(action);
  if (action.constructor !== ActionCommand) {
    return ;
  }
  dispatch ? (store.dispatch = dispatch) : null;

  switch(action) {
    case APP_CACHE_FETCH:
      CCH_DB_AWAIT.promise = db.readAllItems();
      store.dispatch(CCH_DB_AWAIT);
      return;
  }

  // console.log(db);
  
  // switch(action.type) {
  //   case APP__INIT: 
  //     await db.subscribeCache();
  //     if (action.hasOwnProperty('payload')) {
  //       await db.seedItems(action.payload);
  //       spy2(action.payload);
  //     }
  //     return
  //   case APP__CACHE_REQUEST:
  //     dispatch({ 
  //       type: CAC__CACHE_RESPONSE,
  //       meta: { 
  //         requestType: action.meta.requestType,
  //         responseStatus: META.START 
  //       } 
  //     })
  //     switch(action.meta.requestType) {
  //       case 'READ':
  //         const todoItems = await db.readAllItems();
  //         const newAction = {
  //           type: CAC__CACHE_RESPONSE,
  //           payload: todoItems,
  //           meta: {...action.meta, responseStatus: META.SUCCESS }
  //         };
  //         dispatch(newAction);
  //         return
  //       case 'CREATE':
  //         return
  //       case 'DELETE':
  //         return
  //     }
  //   default:
  //     return;
  // }
};

module.exports = {
  CacheMiddleware
};