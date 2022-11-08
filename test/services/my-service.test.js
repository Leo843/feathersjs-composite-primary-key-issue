const fetch = require('node-fetch')
const config = require('config')

const host = config.get('host')
const port = config.get('port')
const address = `http://${host}:${port}`

describe('\'my-service\' service', () => {
  beforeEach(async () => {
    await fetch(address + '/my-service', {
      method: 'DELETE'
    })
  })

  describe('when the model uses `key1` and `key2` as a composite primary key', () => {
    // NOTE: the model is defined with a composite primary key composed of two
    // primary keys `key1` and `key2`.

    describe('when column `key1` is different for all items in the table', () => {
      it('"total" is the number of items in the table', async () => {
        // NOTE: when the table contains items with different `key1`,
        // everything works fine.

        // arrange
        const items = [
          { key1: '1', key2: 1234 },
          { key1: '2', key2: 1234 },
          { key1: '3', key2: 1234 }
        ]
        await fetch(address + '/my-service', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(items)
        })

        // act
        const res = await fetch(address + '/my-service')

        // assert
        expect(res.status).toBe(200)
        const body = await res.json()
        expect(body.total).toBe(3)
      })
    })

    describe('when column `key1` is the same for all items in the table', () => {
      it('"total" is the number of items in the the table', async () => {
        // NOTE: when the table contains items with the same `key1`,
        // parameter "total" is not the actual number of items in the table.

        // arrange
        const items = [
          { key1: '1', key2: 1234 },
          { key1: '1', key2: 1235 },
          { key1: '1', key2: 1236 }
        ]
        await fetch(address + '/my-service', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(items)
        })

        // act
        const res = await fetch(address + '/my-service')

        // assert
        expect(res.status).toBe(200)
        const body = await res.json()
        expect(body.total).toBe(3)
      })
    })
  })
})
