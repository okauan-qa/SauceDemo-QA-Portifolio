describe('Testando página de Login', () => {
beforeEach(() => {
cy.visit('https://www.saucedemo.com/')
})
    it('deve realizar login com todas as credenciais válidas', () => {
    cy.get('#user-name').type('problem_user')
    cy.get('#password').type('secret_sauce')
    cy.get('#login-button').click()

    cy.url().should('include','/inventory.html')
  })
    it('deve impedir o login apenas com nome de usuário', () => {
    cy.get('#user-name').type('problem_user')

    cy.get('#login-button').click()

    cy.get('.error-message-container').should('be.visible')
  })
    it('deve impedir o login apenas com a senha', () => {
    cy.get('#password').type('problem_user')

    cy.get('#login-button').click()

    cy.get('.error-message-container').should('be.visible')
  })
    it('deve exibir erro ao tentar fazer login sem preencher os campos', () => {
    cy.get('#login-button').click()

    cy.get('.error-message-container').should('be.visible')
  })

  describe('Testando página home', () =>{
    beforeEach(() =>{
        cy.visit('https://www.saucedemo.com/')
        cy.problemUser()
    })
    it('deve adicionar um item no carrinho', () => {
        cy.contains('button','Add to cart').click()
        cy.get('.shopping_cart_link').click()
    })
    it.only('deve adicionar mais de um item no carrinho', () => {
        cy.get('#add-to-cart-sauce-labs-backpack').click()
        cy.get('#add-to-cart-sauce-labs-bike-light').click()
        cy.get('.shopping_cart_link').click()
    })
        it('deve adicionar item no carrinho, entrar no carrinho e remover item', () => {
        cy.contains('button','Add to cart').click()
        cy.get('.shopping_cart_link').click()

        cy.get('[data-test="inventory-item"]').should('be.visible')
        cy.contains('button', 'Remove').click()
        
        cy.get('[data-test="inventory-item"]').should('not.exist')
    })
  })
})