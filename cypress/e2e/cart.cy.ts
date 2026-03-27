describe('Cart Page', () => {
  it('should show empty cart message when no items', () => {
    cy.clearLocalStorage()
    cy.visit('/cart')
    cy.contains('Your cart is empty').should('be.visible')
  })

  it('should show Browse Products button on empty cart', () => {
    cy.clearLocalStorage()
    cy.visit('/cart')
    cy.contains('Browse Products →').should('be.visible')
  })

  it('should navigate to home when Browse Products is clicked', () => {
    cy.clearLocalStorage()
    cy.visit('/cart')
    cy.contains('Browse Products →').click()
    cy.url().should('eq', Cypress.config('baseUrl') + '/')
  })

  it('should add item to cart and display it on cart page', () => {
    cy.clearLocalStorage()
    cy.visit('/product/1/details')
    cy.contains('Add to Cart', { timeout: 10000 }).click()

    cy.visit('/cart')
    cy.get('h1').contains('Your Cart').should('be.visible')
  })

  it('should display Order Summary on cart page', () => {
    cy.clearLocalStorage()
    cy.visit('/product/1/details')
    cy.contains('Add to Cart', { timeout: 10000 }).click()

    cy.visit('/cart')
    cy.contains('Order Summary').should('be.visible')
    cy.contains('Subtotal').should('be.visible')
    cy.contains('Shipping').should('be.visible')
  })

  it('should display Proceed to Checkout button', () => {
    cy.clearLocalStorage()
    cy.visit('/product/1/details')
    cy.contains('Add to Cart', { timeout: 10000 }).click()

    cy.visit('/cart')
    cy.contains('Proceed to Checkout →').should('be.visible')
  })

  it('should remove item from cart using remove button', () => {
    cy.clearLocalStorage()
    cy.visit('/product/2/details')
    cy.contains('Add to Cart', { timeout: 10000 }).click()

    cy.visit('/cart')
    cy.get('button[title="Remove item"]').first().click()
    cy.contains('Your cart is empty', { timeout: 5000 }).should('be.visible')
  })

  it('should increase item quantity using + button', () => {
    cy.clearLocalStorage()
    cy.visit('/product/1/details')
    cy.contains('Add to Cart', { timeout: 10000 }).click()

    cy.visit('/cart')
    cy.contains('button', '+').first().click()
    cy.contains('2').should('be.visible')
  })

  it('should decrease item quantity using - button', () => {
    cy.clearLocalStorage()
    cy.visit('/product/1/details')
    cy.contains('Add to Cart', { timeout: 10000 }).click()

    cy.visit('/cart')
    cy.contains('button', '+').first().click()
    cy.contains('button', '−').first().click()
    cy.contains('1').should('be.visible')
  })

  it('should display footer with ApnaBazaar brand', () => {
    cy.visit('/')
    cy.get('footer').contains('ApnaBazaar').should('be.visible')
  })
})
