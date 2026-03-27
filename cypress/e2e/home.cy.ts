describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should display the header with ApnaBazaar brand', () => {
    cy.get('header').contains('ApnaBazaar').should('be.visible')
  })

  it('should display hero section with heading', () => {
    cy.get('h1').contains('Discover Amazing Products').should('be.visible')
    cy.contains('Shop the best deals across all categories').should('be.visible')
  })

  it('should load and display product cards', () => {
    cy.get('article', { timeout: 10000 }).should('have.length.greaterThan', 0)
  })

  it('should display product count after loading', () => {
    cy.contains(/\d+ products? found/, { timeout: 10000 }).should('be.visible')
  })

  it('should display category filter section', () => {
    cy.contains('Categories', { timeout: 10000 }).should('be.visible')
    cy.contains('Sort by Price').should('be.visible')
  })

  it('should display View Details button on product cards', () => {
    cy.get('article', { timeout: 10000 }).first().contains('View Details').should('be.visible')
  })

  it('should update URL when category filter is applied', () => {
    cy.get('button', { timeout: 10000 })
      .contains(/electronics/i)
      .click()

    cy.url().should('include', 'category=electronics')
  })

  it('should show Clear button when filter is active', () => {
    cy.get('button', { timeout: 10000 })
      .contains(/electronics/i)
      .click()

    cy.contains('✕ Clear').should('be.visible')
  })

  it('should clear filters when Clear button is clicked', () => {
    cy.get('button', { timeout: 10000 })
      .contains(/electronics/i)
      .click()

    cy.contains('✕ Clear').click()
    cy.url().should('not.include', 'category=')
  })

  it('should persist filters on page refresh', () => {
    cy.get('button', { timeout: 10000 })
      .contains(/electronics/i)
      .click()

    cy.reload()
    cy.url().should('include', 'category=electronics')
  })

  it('should navigate to product detail page on card click', () => {
    cy.get('article', { timeout: 10000 }).first().click()
    cy.url().should('include', '/product/')
    cy.url().should('include', '/details')
  })

  it('should display footer with ApnaBazaar brand', () => {
    cy.get('footer').contains('ApnaBazaar').should('be.visible')
  })
})
