const logMiddleware = (logger) => (store) => 
    (next) => 
        (action) => {
            logger(`[log] action type: ${action.type}`)
            next(action)
        };

const asyncMiddleware = (injection) => (store) => 
    (next) => 
        (action) => {
            if (!action.payload || !action.payload.then) {
                return next(action)
            }
            injection()
            action.payload.then(response => {
                const newAction = {
                    ...action,
                    payload: response
                }
                dispatch(newAction)
            })
            next(action)
        };

const middlewares = [
    logMiddleware(require('../util').LOG), 
    // asyncMiddleware(()=>{})
]

module.exports = {
    logMiddleware,
    asyncMiddleware,
    middlewares,
}