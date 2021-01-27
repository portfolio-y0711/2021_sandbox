/// <reference types="cypress" />

describe('List items ', () => {
    beforeEach(() => {
        cy.visit('http://localhost:4000')
    })

    it('can remove a Todo', () => {
        cy.get('#todo-list li')
            .as('list')

        cy.get('@list')
            .first()
            .find('button')
            .click()

        cy.get('@list')
            .should('have.length', 1)
    })

})