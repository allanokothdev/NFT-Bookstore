const BookStore = artifacts.require("Bookstore");

contract("BookStore", (accounts) => {
    describe('Publishing', async () => {
        it("gives the author the specified amount of book version copies", async() => {
            const book_store = await BookStore.new()

            //const book_id = 1
            const price = web3.utils.toWei('50', 'ether')
            const currency = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'
            const quantity = 100

            const author = accounts[5]

            await book_store.publish(quantity, price, currency, { from: author})

            let author_balance = await book_store.balanceOf(author,1)

            author_balance = parseInt(author_balance)

            assert.equal(author_balance,100)
        })

        it("increases the Book Id", async () => {
          const book_store = await BookStore.new()

          const author = accounts[3]

          //const book_id = 1
            const price = web3.utils.toWei('50', 'ether')
          const currency = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'


          await book_store.publish(75, price, currency, {from: author})

          await book_store.publish(50, price, currency, {from: author})

          let author_balance = await book_store.balanceOf(author, 2)

          author_balance = parseInt(author_balance)

          assert.equal(author_balance,50)

        })

        it("correctly sets the price and the currency for a book version", async() => {
            const book_store = await BookStore.new()

            //const book_id = 1
            let price = web3.utils.toWei('50', 'ether')
            const currency = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'
            const quantity = 100

            const author = accounts[5]

            await book_store.publish(quantity, price, currency, { from: author})

            let book_version_price = await book_store.bookVersionPrice(1)

            book_version_price = web3.utils.fromWei(book_version_price, 'ether')

            assert.equal(book_version_price, '50')


            price = web3.utils.toWei('100', 'ether')

            await book_store.publish(quantity, price, currency, { from: author})

            book_version_price = await book_store.bookVersionPrice(2)

            book_version_price = web3.utils.fromWei(book_version_price, 'ether')

            assert.equal(book_version_price, '100')
        })


    })
})
