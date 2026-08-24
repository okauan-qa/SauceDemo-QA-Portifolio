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

  describe('Testando o carrinho de compras', () => {
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
  describe('BUG-001 - Compra sem itens no carrinho', () => {
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
})
