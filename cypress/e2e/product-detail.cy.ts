describe('Product Detail Page', () => {
  beforeEach(() => {
    cy.visit('/product/1/details')
  })

  it('should display product title in h1', () => {
    cy.get('h1', { timeout: 10000 }).should('be.visible')
  })

  it('should display product price in rupees', () => {
    cy.contains('₹', { timeout: 10000 }).should('be.visible')
  })

  it('should display Price and Description labels', () => {
    cy.contains('Price', { timeout: 10000 }).should('be.visible')
    cy.contains('Description').should('be.visible')
  })

  it('should display Add to Cart button', () => {
    cy.contains('Add to Cart', { timeout: 10000 }).should('be.visible')
  })

  it('should show Added to Cart animation on button click', () => {
    cy.contains('Add to Cart', { timeout: 10000 }).click()
    cy.contains('Added to Cart!').should('be.visible')
  })

  it('should show toast notification after adding to cart', () => {
    cy.contains('Add to Cart', { timeout: 10000 }).click()
    cy.contains('View Cart').should('be.visible')
  })

  it('should show Go to Cart button if product already in cart', () => {
    cy.contains('Add to Cart', { timeout: 10000 }).click()
    cy.contains('Go to Cart', { timeout: 5000 }).should('be.visible')
  })

  it('should navigate back when back button is clicked', () => {
    cy.contains('← Back to Products', { timeout: 10000 }).click()
    cy.url().should('not.include', '/details')
  })

  it('should display header with ApnaBazaar brand', () => {
    cy.get('header').contains('ApnaBazaar').should('be.visible')
  })
})
