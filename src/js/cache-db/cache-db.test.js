
describe('Cache DB', () => {
    let cacheDB;

    beforeAll(() => {
        cacheDB = require('./index')
    })
    afterEach(async() => {
        await cacheDB.resetDB();
    })

    it('create a item', async () => {
        let expected = {
            id: 'C#4F',
            name: 'this is for testing couchdb',
            createdAt: new Date().toString(),
            updatedAt: new Date().toString(),
        };
        const created = await cacheDB.createItem({ ...expected });
        const actual = await cacheDB.readItem(created.id);
        expect(actual).toEqual(expected);
    })

    it('read all items', async () => {
        let expected = [
            {
                id: 'R34K',
                name: 'this is for testing couchdb',
                createdAt: new Date().toString(),
                updatedAt: new Date().toString(),
            },
            {
                id: '324G',
                name: 'this is for testing couchdb',
                createdAt: new Date().toString(),
                updatedAt: new Date().toString(),
            },
        ];
        expected.forEach(cacheDB.createItem);
        const res = await cacheDB.readAllItems()
        console.log(res);
    })
})