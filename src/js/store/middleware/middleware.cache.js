const db = require('../../cache-db');

const CacheMiddleware = ({spy1, spy2, spy3}) => ({ dispatch }) => (next) => async(action) => {
  next(action);
  switch(action.type) {
    case 'CACHE request':
      spy1();
      response = await action.payload;
      const test = await db.createItem({ 
          id: 'C#4F',
          name: 'this is for testing couchdb',
          createdAt: new Date().toString(),
          updatedAt: new Date().toString()
      })
      console.log(test);
      const newAction = {
        type: 'CACHE response SUCCESS',
        payload: response,
      };
      dispatch(newAction);
      spy2(newAction);
      return next(action);
    default:
      spy3()
      return next(action);
  }
};

module.exports = CacheMiddleware;