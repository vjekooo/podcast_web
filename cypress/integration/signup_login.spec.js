// Register and login
it('signup and login user', () => {
	// cy.visit('http://localhost:3000/register')

	// cy.get('input[name="email"]').type('vjeko.pavicin@gmail.com')
	// cy.get('input[name="password"]').type('test1234')
	// cy.get('button').click()

	// cy.location('pathname').should('eq', '/')

	cy.visit('http://localhost:3000/login')

	cy.login('vjeko.pavicin@gmail.com', 'test1234')

	cy.location('pathname').should('eq', '/')
})
