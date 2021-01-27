const PouchDB = require('pouchdb');
PouchDB.plugin(require('pouchdb-adapter-memory'));

module.exports = (() => {
    let conn;
    return new (class Singleton {
        constructor() {
            if (!conn) {
                conn = new PouchDB('todo', { adapter: 'memory' })
            }
        }
        getConnection() {
            return conn;
        }
        async resetDB() {
            await conn.destroy();
            conn = new PouchDB('todo', { adapter: 'memory' })
        }
        async createItem(item) {
            return conn.post({
                ...item
            });
        }
        async readItem(docId) {
            const doc = await conn.get(docId);
            delete doc._id;
            delete doc._rev;
            return doc;
        }
        async readAllItems() {
            const res = conn.allDocs({include_docs: true});
            const items = {};
            (await res).rows.forEach(n => items[n.id] = n.doc);
            return items
        }
    }) ();
})()

// ;(async()=>{
//     var firstSingleton = db.getConnection();
//     var secondSingleton = db.getConnection();
//     await db.resetDB();
//     var thirdSingleton = db.getConnection();
//     var fourthSingleton = db.getConnection();

//     console.log(firstSingleton === secondSingleton); // true
//     console.log(secondSingleton === thirdSingleton); // true
//     console.log(fourthSingleton === thirdSingleton); // true
// })()
