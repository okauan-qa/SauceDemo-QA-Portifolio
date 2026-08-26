describe('Testando página de Login', () => {
beforeEach(() => {
    cy.visit('https://www.saucedemo.com/')
    })
it('deve tentar realizar o login com o locked-out-user',()=>{
    cy.get('#user-name').type('locked_out_user')
    cy.get('#password').type('secret_sauce')
    cy.get('#login-button').click()
    
    cy.get('.error').should('be.visible')
})
})
