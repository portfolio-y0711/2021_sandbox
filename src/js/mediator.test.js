const fs = require('fs')
const path = require('path')
const html = fs.readFileSync(path.resolve(__dirname, '../html/index.html'), 'utf8')

describe('Main', () => {
    beforeEach(() => {
        document.documentElement.innerHTML = html.toString()
    })

    it('it', () => {
        // const db = ({
        //     addItem: () => { console.log('addItem called') },
        //     removeItem: () => { console.log('removeItem called') }
        // })
        // const e = ({
        //     target: {
        //         parentNode: {
        //             reset: () => {}
        //         }
        //     }
        // })
        // const main = require('./main')(document)
        // const list = document.querySelector('#task-list')
        // main.createFormSubmitButton(
        //     require('./form'), 
        //     require('./out'), 
        //     list, 
        //     require('./db'))
        // const formSubmitButton = document.querySelector('#add-button')
        // formSubmitButton.dispatchEvent(new Event('click'))
    })
})