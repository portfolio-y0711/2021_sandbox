const META = {
   READ   : 'READ',
   CREATE : 'CREATE',
   DELETE : 'DELETE',
   SUCCESS: 'SUCCESS',
};

const APP__INIT = '[APP] Init';
const APP__CACHE_REQUEST = '[APP] CACHE request';
const CAC__CACHE_RESPONSE = '[CAC] CACHE response';
const APP__UI_UPDATE = '[APP] UI update';

module.exports = {
    META,
    APP__INIT,
    APP__CACHE_REQUEST,
    CAC__CACHE_RESPONSE,
    APP__UI_UPDATE,
}