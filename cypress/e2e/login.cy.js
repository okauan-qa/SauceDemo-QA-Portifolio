describe('Testando página de Login', () => {
    beforeEach(() => {
      cy.visit('https://www.saucedemo.com/')
    })
    it('deve realizar login com todas as credenciais válidas', () => {
    cy.get('#user-name').type('standard_user')
    cy.get('#password').type('secret_sauce')
    cy.get('#login-button').click()

    cy.url().should('include','/inventory.html')
  })
    it('deve impedir o login apenas com nome de usuário', () => {
    cy.get('#user-name').type('standard_user')

    cy.get('#login-button').click()

    cy.get('.error-message-container').should('be.visible')
  })
    it('deve impedir o login apenas com a senha', () => {
    cy.get('#password').type('secret_sauce')

    cy.get('#login-button').click()

    cy.get('.error-message-container').should('be.visible')
  })
    it('deve exibir erro ao tentar fazer login sem preencher os campos', () => {
    cy.get('#login-button').click()

    cy.get('.error-message-container').should('be.visible')
  })
  })

  describe('Testando página home', () => {
  beforeEach(() => {
    cy.login()
    cy.get('#add-to-cart-sauce-labs-backpack').click()
    cy.get('#add-to-cart-sauce-labs-fleece-jacket').click()
  })
    it('deve realizar uma compra', () => {

    cy.get('.shopping_cart_link').click()
    cy.get('#checkout').click()

    cy.get('#first-name').type('Teste')
    cy.get('#last-name').type('Teste')
    cy.get('#postal-code').type('Teste')
    cy.get('#continue').click()

    cy.get('#finish').click()

    cy.contains('h2', 'Thank you for your order!').should('have.text', 'Thank you for your order!')
  })
  it('deve realizar uma compra e retornar a página home', () => {

    cy.get('.shopping_cart_link').click()
    cy.get('#checkout').click()

    cy.get('#first-name').type('Teste')
    cy.get('#last-name').type('Teste')
    cy.get('#postal-code').type('Teste')
    cy.get('#continue').click()

    cy.get('#finish').click()

    cy.contains('button', 'Back Home').click()

    cy.url().should('include','/inventory.html')
  })
  
  it('deve realizar uma compra e clicar no botão gerar PDF', () => {
    cy.get('.shopping_cart_link').click()
    cy.get('#checkout').click()

    cy.get('#first-name').type('Teste')
    cy.get('#last-name').type('Teste')
    cy.get('#postal-code').type('Teste')
    cy.get('#continue').click()

    cy.get('#finish').click()

    cy.contains('button', 'Generate PDF order').click()
    
    cy.get('[data-test="title"]').should('be.visible')
  })

  it('deve atualizar a quantidade de itens após remover um produto', () => {
    cy.get('.shopping_cart_link').click()
    cy.contains('span', '2').should('have.text', '2')

    cy.contains('button', 'Remove').click()
    cy.contains('span', '1').should('have.text', '1')
  })

  it('deve cancelar a compra e retornar a home', () => {
    cy.get('.shopping_cart_link').click()
    cy.get('#checkout').click()

    cy.get('#first-name').type('Teste')
    cy.get('#last-name').type('Teste')
    cy.get('#postal-code').type('Teste')
    cy.get('#continue').click()
    cy.contains('button', 'Cancel').click()

    cy.url().should('include','/inventory.html') 
  })
})
  describe('Realizando teste de menu lateral', () => {
    beforeEach(() => {
    cy.login()
  })
    it('deve navegar para a página "sobre" da saucelabs', () => {
      cy.get('#react-burger-menu-btn').click()
      cy.get('#about_sidebar_link').click()

      cy.url().should('eq', 'https://saucelabs.com/')
  })
      it('deve realizar o logout e retornar a página de login', () => {
      cy.get('#react-burger-menu-btn').click()
      cy.get('#logout_sidebar_link').click()

      cy.url().should('eq', 'https://www.saucedemo.com/')
  })
})
  describe('BUG-001 - Usuário realiza uma compra mesmo com o carrinho vazio', () => {
    beforeEach(() => {
    cy.login()
  })
  it('permite finalizar uma compra com o carrinho vazio', () => {
    cy.get('.shopping_cart_link').click()
    cy.get('#checkout').click()

    cy.get('#first-name').type('Teste')
    cy.get('#last-name').type('Teste')
    cy.get('#postal-code').type('Teste')
    cy.get('#continue').click()

    cy.get('#finish').click() 
    
    cy.contains('h2', 'Thank you for your order!').should('have.text', 'Thank you for your order!')
    //Este caso será o BUG-001, pois não deveria realizar a compra e gerar o PDF, pois não tem nada no carrinho
  })
  it.only('deve adicionar todos itens da lista no carrinho', () => {
      cy.get('[data-test^="add-to-cart"]') //seleciona todos botões que tem add-to-cart
      .should('have.length.gt', 2) // deve ter mais de dois itens
      .click({ multiple: true }) // clica em multiplos

      cy.get('[data-test^="add-to-cart"]')
      .should('have.length', 0) 
    })
})
