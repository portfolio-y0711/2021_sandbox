const HttpMiddleware = (injection) => ({ dispatch }) => (next) => async(action) => {
  next(action);
  switch(action.type) {
    case 'HTTP request':
      injection();
      response = await action.payload;
      const newAction = {
        type: 'HTTP response SUCCESS',
        payload: response,
      };
      dispatch(newAction);
      return next(action);
    default:
      return next(action);
  }
};

module.exports = HttpMiddleware;