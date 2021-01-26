const compose = require('./compose')

module.exports = (...middlewares) => 
    (createStore) => 
        (reducer) => {
            const store = createStore(reducer);
            const middlewareAPI = {
                getState: store.getState,
                dispatch: (action, ...args) => dispatch(action, ...args)
            };
            const chain = middlewares.map(middleware => middleware(middlewareAPI));
            dispatch = compose(...chain)(store.dispatch);
        
            return {
                ...store,
                dispatch
            }
    }
    