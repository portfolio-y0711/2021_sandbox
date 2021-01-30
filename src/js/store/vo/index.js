const META = {
   READ   : 'READ',
   CREATE : 'CREATE',
   DELETE : 'DELETE',
   START  : 'START',
   SUCCESS: 'SUCCESS',
};

const APP__INIT = '[APP] Init';
const APP__CACHE_REQUEST = '[APP] initializing CACHE request';
const CAC__CACHE_RESPONSE = '[CCH] handling CACHE request';
const APP__UI_UPDATE = '[APP] UI update';

module.exports = {
    META,
    APP__INIT,
    APP__CACHE_REQUEST,
    CAC__CACHE_RESPONSE,
    APP__UI_UPDATE,
}