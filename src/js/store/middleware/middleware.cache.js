const APP__INIT = '[APP] Init';
const APP__CACHE_REQUEST = '[APP] CACHE request';
const CAC__CACHE_RESPONSE_SUCCESS = '[CAC] CACHE response SUCCESS';

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
      switch(action.meta.requestType) {
        case 'READ':
          spy1();
          const todoItems = await db.readAllItems();
          const newAction = {
            type: CAC__CACHE_RESPONSE_SUCCESS,
            payload: todoItems,
            meta: action.meta
          };
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