const { ActionCommand, AsyncActionCommand, ActionDocument, ActionEvent } = require('../entity');

const MESSAGE_TYPE = {
    LOADED    : 'LOADED',
    UPDATED   : 'UPDATED',
    REQUESTED : 'REQSTD',
    RESOLVED  : 'RESLVD',
};

const COMMAND_TYPE = {
    SEED   : 'SEED',
    SYNC   : 'SYNC',
    FETCH  : 'FETCH',
    CREATE : 'CREATE',
    DELETE : 'DELETE',
};

const DOC_TYPE = {
    TODO_ITEMS : 'TODOS',
    TODO_ITEM  : 'TODO',
    TODO_ID    : 'ID',
};

const SENDER_TYPE = {
    MODULE      : 'MOD',
    APPLICATION : 'APP',
    CACHE       : 'CCH',
    ASYNC       : 'ASY'
};

const SUBJECT_TYPE = {
    INPUT   : 'INPUT',
    OUTPUT  : 'OUTPUT',
    CACHE   : 'CACHE',
    REMOTE  : 'REMOTE',
    PROMISE : 'PROMISE',
    //
    SEED    : 'SEED',
    CREATE  : 'CREATE',
    DELETE  : 'DELETE',
    //
    STATUS  : 'STATUS',
    DOCS    : 'DOCS'
};

const MOD_INPUT_LOADED    = new ActionEvent       (SENDER_TYPE.MODULE,      SUBJECT_TYPE.INPUT,   MESSAGE_TYPE.LOADED   );
const MOD_OUTPUT_LOADED   = new ActionEvent       (SENDER_TYPE.MODULE,      SUBJECT_TYPE.OUTPUT,  MESSAGE_TYPE.LOADED   );
const MOD_TODO_CREATE     = new ActionDocument    (SENDER_TYPE.MODULE,      SUBJECT_TYPE.CREATE,  DOC_TYPE.TODO_ITEM    );
const MOD_TODO_DELETE     = new ActionDocument    (SENDER_TYPE.MODULE,      SUBJECT_TYPE.DELETE,  DOC_TYPE.TODO_ID      );
const APP_CACHE_SEED      = new ActionCommand     (SENDER_TYPE.APPLICATION, COMMAND_TYPE.SEED,    MESSAGE_TYPE.REQUESTED);
const APP_CACHE_SYNC      = new ActionCommand     (SENDER_TYPE.APPLICATION, COMMAND_TYPE.SYNC,    MESSAGE_TYPE.REQUESTED);
const APP_CACHE_FETCH     = new ActionCommand     (SENDER_TYPE.APPLICATION, COMMAND_TYPE.FETCH,   MESSAGE_TYPE.REQUESTED);
const APP_CACHE_CREATE    = new ActionCommand     (SENDER_TYPE.APPLICATION, COMMAND_TYPE.CREATE,  MESSAGE_TYPE.REQUESTED);
const APP_CACHE_DELETE    = new ActionCommand     (SENDER_TYPE.APPLICATION, COMMAND_TYPE.DELETE,  MESSAGE_TYPE.REQUESTED);
const CCH_DB_SEED         = new AsyncActionCommand(SENDER_TYPE.CACHE,       SUBJECT_TYPE.PROMISE, COMMAND_TYPE.SEED     );
const CCH_DB_SYNC         = new ActionCommand     (SENDER_TYPE.CACHE,       SUBJECT_TYPE.REMOTE,  COMMAND_TYPE.SYNC     );
const CCH_DB_FETCH        = new AsyncActionCommand(SENDER_TYPE.CACHE,       SUBJECT_TYPE.PROMISE, COMMAND_TYPE.FETCH    );
const CCH_DB_CREATE       = new AsyncActionCommand(SENDER_TYPE.CACHE,       SUBJECT_TYPE.PROMISE, COMMAND_TYPE.CREATE   );
const CCH_DB_DELETE       = new AsyncActionCommand(SENDER_TYPE.CACHE,       SUBJECT_TYPE.PROMISE, COMMAND_TYPE.DELETE   );
const ASY_DOCS_TODOITEMS  = new ActionDocument    (SENDER_TYPE.ASYNC,       SUBJECT_TYPE.DOCS,    DOC_TYPE.TODO_ITEMS   );
const ASY_SEED_RESOLVED   = new ActionEvent       (SENDER_TYPE.ASYNC,       SUBJECT_TYPE.SEED,    MESSAGE_TYPE.RESOLVED );
const ASY_CREATE_RESOLVED = new ActionEvent       (SENDER_TYPE.ASYNC,       SUBJECT_TYPE.CREATE,  MESSAGE_TYPE.RESOLVED );
const ASY_DELETE_RESOLVED = new ActionEvent       (SENDER_TYPE.ASYNC,       SUBJECT_TYPE.DELETE,  MESSAGE_TYPE.RESOLVED );


module.exports = {
    SENDER_TYPE,
    SUBJECT_TYPE,
    //
    MESSAGE_TYPE,
    COMMAND_TYPE,
    DOC_TYPE,
    //
    MOD_INPUT_LOADED,
    MOD_OUTPUT_LOADED,
    MOD_TODO_CREATE,
    MOD_TODO_DELETE,
    //
    APP_CACHE_SYNC,
    APP_CACHE_SEED,
    APP_CACHE_FETCH,
    APP_CACHE_CREATE,
    APP_CACHE_DELETE,
    //
    CCH_DB_SYNC,
    CCH_DB_SEED,
    CCH_DB_FETCH,
    CCH_DB_CREATE,
    CCH_DB_DELETE,
    //
    ASY_DOCS_TODOITEMS,
    ASY_SEED_RESOLVED,
    ASY_CREATE_RESOLVED,
    ASY_DELETE_RESOLVED,
}