const {
  META,
  APP__INIT,
  APP__CACHE_REQUEST,
  CAC__CACHE_RESPONSE
} = require('../vo');

const CacheMiddleware = ({ db, spy1, spy2, spy3 }) => ({ dispatch }) => (next) => async(action) => {
  next(action);
  switch(action.type) {
    case APP__INIT: 
      spy1()
      await db.subscribeCache();
      if (action.hasOwnProperty('payload')) {
        await db.seedItems(action.payload);
        spy2(action.payload);
      }
      return
    case APP__CACHE_REQUEST:
      dispatch({ 
        type: CAC__CACHE_RESPONSE,
        meta: { 
          requestType: action.meta.requestType,
          responseStatus: META.START 
        } 
      })
      switch(action.meta.requestType) {
        case 'READ':
          spy1();
          const todoItems = await db.readAllItems();
          console.log(todoItems);
          const newAction = {
            type: CAC__CACHE_RESPONSE,
            payload: todoItems,
            meta: {...action.meta, responseStatus: META.SUCCESS }
          };
          console.log(newAction);
          dispatch(newAction);
          spy2(newAction);
          return
        case 'CREATE':
          spy1();
          return
        case 'DELETE':
          spy1();
          return
      }
    default:
      spy3()
      return;
  }
};

module.exports = CacheMiddleware;