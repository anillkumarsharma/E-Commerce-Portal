// LOGIC: Cypress E2E test - Product Detail Page tests

describe('Product Detail Page', () => {
  beforeEach(() => {
    // LOGIC: Direct URL se product detail page par jao (product id = 1)
    cy.visit('/product/1/details')
  })

  it('should display product title and price', () => {
    // LOGIC: aapko yahan apni logic likhni hai
    cy.get('h1', { timeout: 10000 }).should('be.visible')
    cy.contains('$', { timeout: 10000 }).should('be.visible')
  })

  it('should display Add to Cart button', () => {
    // LOGIC: Add to Cart button visible hona chahiye
    cy.contains('Add to Cart', { timeout: 10000 }).should('be.visible')
  })

  it('should show animation on Add to Cart click', () => {
    // LOGIC: Click karo aur "Added!" text check karo
    cy.contains('Add to Cart', { timeout: 10000 }).click()
    cy.contains('Added to Cart!').should('be.visible')
  })

  it('should navigate back when back button clicked', () => {
    // LOGIC: Back button click karo
    cy.contains('← Back', { timeout: 10000 }).click()
    cy.url().should('not.include', '/details')
  })
})
