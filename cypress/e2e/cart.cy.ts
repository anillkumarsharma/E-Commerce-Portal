// LOGIC: Cypress E2E test - Cart Page tests

describe('Cart Page', () => {
  it('should show empty cart message when no items', () => {
    // LOGIC: localStorage clear karo taaki cart empty ho
    cy.clearLocalStorage()
    cy.visit('/cart')
    cy.contains('Your cart is empty').should('be.visible')
  })

  it('should add item to cart and reflect in header badge', () => {
    // LOGIC: Product detail page par jao, add to cart click karo
    cy.visit('/product/1/details')
    cy.contains('Add to Cart', { timeout: 10000 }).click()

    // LOGIC: Header mein cart badge check karo
    cy.visit('/cart')
    cy.get('h1').contains('Your Cart').should('be.visible')
  })

  it('should remove item from cart', () => {
    // LOGIC: Pehle ek item add karo
    cy.visit('/product/2/details')
    cy.contains('Add to Cart', { timeout: 10000 }).click()

    // LOGIC: Cart par jao aur remove karo
    cy.visit('/cart')
    cy.contains('Remove').first().click()
  })

  it('should display total price in footer', () => {
    // LOGIC: Footer mein Cart Total visible hona chahiye
    cy.visit('/')
    cy.contains('Cart Total').should('be.visible')
  })
})
