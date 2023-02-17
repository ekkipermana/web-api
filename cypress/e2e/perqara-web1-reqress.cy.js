/// <reference types="cypress"/>

describe('As user, I want to login to the website', function() {
    var username = "username",
        password = "password";
    
    it('Open Website', () => {
        cy.visit('http://zero.webappsecurity.com/index.html');
        cy.get('#signin_button').click()
        cy.get('input[name="user_login"]').type('username').should('contain.value','username')
        cy.get('input[name="user_password"]').type('password').should('contain.value','password')
        cy.get('#user_remember_me').click()
        cy.get('input[value="Sign in"]').click()
        cy.wait(500)    

    });
    
    it('Click pay', () => {
        cy.visit('http://zero.webappsecurity.com/index.html');
        cy.get('#signin_button').click()
        cy.get('input[name="user_login"]').type('username').should('contain.value','username')
        cy.get('input[name="user_password"]').type('password').should('contain.value','password')
        cy.get('#user_remember_me').click()
        cy.get('input[value="Sign in"]').click()
        cy.wait(500)    

        cy.get('#pay_bills_tab').click()
        cy.contains('Pay Bills').click()
        cy.get('#sp_payee').select('apple')
        cy.get('#sp_account').select('4')
        cy.get('#sp_amount').type('1000')
        cy.get('#sp_date').click()
        cy.wait(500)
        cy.get('a.ui-datepicker-next.ui-corner-all').contains('Next').click()
        cy.get('a.ui-state-default').contains('26').click()
        cy.get('#sp_description').type('I want to pay your bills')
        cy.get('#pay_saved_payees').click()
        cy.get('#alert_content').should('contain.text', 'The payment was successfully submitted.')
    
        
    });

    it('Add new pay', () => {
        cy.visit('http://zero.webappsecurity.com/index.html');
        cy.get('#signin_button').click()
        cy.get('input[name="user_login"]').type('username').should('contain.value','username')
        cy.get('input[name="user_password"]').type('password').should('contain.value','password')
        cy.get('#user_remember_me').click()
        cy.get('input[value="Sign in"]').click()
        cy.wait(500)    

        cy.get('#pay_bills_tab').click()
        cy.contains('Add New Payee').click()
        cy.get('#np_new_payee_name').type('Perqara')
        cy.get('#np_new_payee_address').type('Jalan perqara')
        cy.get('#np_new_payee_account').type('123422')
        cy.get('#np_new_payee_details').type('Apa ya')
        cy.get('#add_new_payee').click()
        cy.get('#alert_content').should('contain.text','The new payee Perqara was successfully created.')
    });

    it('Logout Test', () => {
        cy.get('i.icon-user').click()
        cy.get('#logout_link').click()
        
    });
});