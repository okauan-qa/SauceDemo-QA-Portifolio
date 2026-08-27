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
        cy.get('.shopping_cart_link').click() //Entra no carrinho para verificar se o item está lá
    })
    it('deve adicionar mais de um item no carrinho', () => {
        cy.get('#add-to-cart-sauce-labs-backpack').click()
        cy.get('#add-to-cart-sauce-labs-bike-light').click()
        cy.get('.shopping_cart_link').click()
    })
        it('deve adicionar mais de um item no carrinho, entrar no carrinho e remover item', () => {
        cy.get('#add-to-cart-sauce-labs-backpack').click()
        cy.get('#add-to-cart-sauce-labs-bike-light').click()
        cy.get('.shopping_cart_link').click() //Entra no carrinho para verificar se o item está lá

        cy.get('[data-test="inventory-item-name"]')
        .should('have.length', 2)

        cy.get('[data-test="inventory-item-name"]')
        .contains('Sauce Labs Backpack')
        .should('be.visible')

        cy.get('#remove-sauce-labs-backpack').click()
        
        cy.get('[data-test="inventory-item"]')
        .contains('Sauce Labs Backpack')
        .should('not.exist')

        cy.get('[data-test="inventory-item-name"]').should('have.length', '1')
    })
      it('deve adicionar apenas um item no carrinho, entrar no carrinho e remover item', () => {
      cy.get('#add-to-cart-sauce-labs-backpack').click()
      cy.get('.shopping_cart_link').click() //Entra no carrinho para verificar se o item está lá

      cy.get('[data-test="inventory-item-name"]')
      .should('have.length', 1)

      cy.get('[data-test="inventory-item-name"]')
      .contains('Sauce Labs Backpack')
      .should('be.visible')

      cy.get('#remove-sauce-labs-backpack').click()
        
      cy.get('[data-test="inventory-item"]')
      .should('not.exist')
    })

    it('deve adicionar todos itens da lista no carrinho', () => {
      cy.get('[data-test^="add-to-cart"]') //seleciona todos botões que tem add-to-cart
      .should('have.length.gt', 2) // deve ter mais de dois itens
      .click({ multiple: true }) // clica em multiplos


      cy.get('[data-test^="add-to-cart"]')
      .should('have.length', 0) //Resultado deveria ser 0, porém o cypress retornou que tem 3 botões com o status "Add to cart"
    })
      it.only('deve ordenar a lista de A a Z', () => {
      cy.get('[data-test="product-sort-container"]')
      .select("za")
      .should('have.value', 'za')
    })

  })
})