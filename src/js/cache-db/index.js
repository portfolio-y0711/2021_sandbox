const PouchDB = require('pouchdb');
PouchDB.plugin(require('pouchdb-adapter-memory'));
PouchDB.plugin(require('pouchdb-find'));

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
            const doc = (await conn.find({
                selector: { id: docId },
                // sort: ['name']
            })).docs[0]
            delete doc._id;
            delete doc._rev;
            return doc;
        }
        async readAllItems() {
            const res = conn.allDocs({include_docs: true});
            return (await res).rows.map(n => {
                const doc = n.doc;
                delete doc._id;
                delete doc._rev;
                return doc;
            });
        }
        async deleteItem(docId) {
            const doc_Id = (await conn.find({
                selector: { id: docId },
            })).docs[0]._id;
            return conn.get(doc_Id).then(function(doc){
                conn.remove(doc)
            });
        }
    }) ();
})()
