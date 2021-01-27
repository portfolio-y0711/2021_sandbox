const CacheMiddleware = (injection) => ({ dispatch }) => (next) => async(action) => {
  next(action);
  switch(action.type) {
    case 'CACHE request':
      injection();
      response = await action.payload;
      const newAction = {
        type: 'CACHE response SUCCESS',
        payload: response,
      };
      dispatch(newAction);
      return next(action);
    default:
      return next(action);
  }
};

module.exports = CacheMiddleware;