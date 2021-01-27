const fs = require('fs')
const path = require('path')
const html = fs.readFileSync(path.resolve(__dirname, '../src/html/index.html'), 'utf8')

describe('TodoApp', () => {

    beforeAll(() => {
        document.documentElement.innerHTML = html.toString()
        require('../src/js/main')
        spyOn(console, 'error')
    })

    it('should render todoItems on load', () => {
        const expected = [
            { id: '9377', date: '2021-01-20', name: 'this is list' },
            { id: 'efd3', date: '2021-01-22', name: 'this is another list' }
        ]
        const actual = Array.from(document.querySelector('#todo-list').children).map(li => {
            const props = Array.from(li.children)
            return Object.values(props)
                .reduce((acc, val) => {
                    if (val instanceof HTMLTimeElement)  {
                        return ({...acc, ...{ date: `${val.datetime}`}})
                    } else if (val instanceof HTMLParagraphElement)  {
                        return ({...acc, ...{ name: `${val.innerHTML}`}})
                    } else {
                        return ({ ...acc })
                    }
                }, { id: li.id })
        })
        expect(actual).toEqual(expected)
    })

    it('should print console.error on clicking add button when no title is provided in the form', () => {
        const todoTitle = document.getElementById('todo-title')
        const addButton = document.getElementById('add-button')
        todoTitle.value = ''
        addButton.dispatchEvent(new Event('click'))
        expect(console.error.calls.count()).toBe(1);
    })

    it('should add todoItem when title is provided in the form', () => {
        const todoTitle = document.getElementById('todo-title')
        const addButton = document.getElementById('add-button')
        todoTitle.value = 'this is input from test'
        addButton.dispatchEvent(new Event('click'))

        const actual = Array.from(document.querySelector('#todo-list').children).map(li => {
            const props = Array.from(li.children)
            return Object.values(props)
                .reduce((acc, val) => {
                    if (val instanceof HTMLTimeElement)  {
                        return ({...acc, ...{ date: `${val.datetime}`}})
                    } else if (val instanceof HTMLParagraphElement)  {
                        return ({...acc, ...{ name: `${val.innerHTML}`}})
                    } else {
                        return ({ ...acc })
                    }
                }, { id: li.id })
        })
        expect(actual.length).toEqual(3)
    })

    it('should delete todoItem when delete button clicked', () => {
        const before = Array.from(document.querySelector('#todo-list').children).map(li => {
            const props = Array.from(li.children)
            return Object.values(props)
                .reduce((acc, val) => {
                    if (val instanceof HTMLTimeElement)  {
                        return ({...acc, ...{ date: `${val.datetime}`}})
                    } else if (val instanceof HTMLParagraphElement)  {
                        return ({...acc, ...{ name: `${val.innerHTML}`}})
                    } else {
                        return ({ ...acc })
                    }
                }, { id: li.id })
        })
        expect(before.map(item => (item.id))).toContain('9377')
        document.getElementById('9377').querySelector('button').click()

        const after = Array.from(document.querySelector('#todo-list').children).map(li => {
            const props = Array.from(li.children)
            return Object.values(props)
                .reduce((acc, val) => {
                    if (val instanceof HTMLTimeElement)  {
                        return ({...acc, ...{ date: `${val.datetime}`}})
                    } else if (val instanceof HTMLParagraphElement)  {
                        return ({...acc, ...{ name: `${val.innerHTML}`}})
                    } else {
                        return ({ ...acc })
                    }
                }, { id: li.id })
        })
        expect(after.map(item => (item.id))).not.toContain('9377')
        
    })
})