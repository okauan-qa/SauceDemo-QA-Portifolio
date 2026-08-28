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

    it('deve adicionar dois itens especificos no carrinho', () => {
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
      .should('have.length', 0) //Resultado deveria ser 0, porém o cypress retornou que tem 3 botões com o status "Add to cart" BUG-001
    })

      it('deve ordenar a lista de A a Z', () => {
      cy.get('[data-test="product-sort-container"]')
      .select("za")
      .should('have.value', 'za') //Resultado deveria ordenar a lista para Z - A, porém permance A - Z BUG-002
    })
    it('deve ordenar produtos do menor para o maior preço', () => {
        cy.get('[data-test="product-sort-container"]')
          .select('lohi')
          .should('have.value', 'lohi') //Resultado deveria ordenar a lista do menor para o maior preço, porém permance A - Z BUG-003
    })
    it('Deve ordenar produtos do maior para o menor preço', () => {
      cy.get('[data-test="product-sort-container"]')
      .select('hilo')
      .should('have.value', 'hilo') //Resultado deveria ordenar a lista do maior para o menor preço, porém permance A - Z BUG-004
    })
    it.only('deve adicionar um item no carrinho e finalizar a compra', () => {
        cy.contains('button','Add to cart').click()
        cy.get('.shopping_cart_link').click() //Entra no carrinho para verificar se o item está lá
        cy.contains('button', 'Checkout').click()

        cy.get('#first-name').type('Kauan').should('have.value', 'Kauan')
        cy.get('#last-name').type('Brito').should('have.value', 'Brito') //Teste deveria escrever "Brito" no campo "last-name", e verificar o texto que foi escrito e retornar verdadeiro, porém retorna como falso. BUG-005
    })

  })
})