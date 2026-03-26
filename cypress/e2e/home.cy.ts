// LOGIC: Cypress E2E test - Home Page basic tests

describe('Home Page', () => {
  beforeEach(() => {
    // LOGIC: Har test se pehle home page par navigate karo
    cy.visit('/')
  })

  it('should display the header with ShopZone brand', () => {
    // LOGIC: aapko yahan apni logic likhni hai
    cy.contains('ShopZone').should('be.visible')
  })

  it('should load and display products', () => {
    // LOGIC: Products API call ka wait karo phir cards check karo
    cy.get('article', { timeout: 10000 }).should('have.length.greaterThan', 0)
  })

  it('should display category filter buttons', () => {
    // LOGIC: Categories load hone ka wait karo
    cy.contains('Filter by Category', { timeout: 10000 }).should('be.visible')
  })

  it('should update URL when category filter is applied', () => {
    // LOGIC: Category button click karo aur URL check karo
    cy.get('button', { timeout: 10000 })
      .contains(/electronics/i)
      .click()

    cy.url().should('include', 'category=electronics')
  })

  it('should persist filters on page refresh', () => {
    // LOGIC: Filter lagao, refresh karo, filter abhi bhi applied hona chahiye
    cy.get('button', { timeout: 10000 })
      .contains(/electronics/i)
      .click()

    cy.reload()
    cy.url().should('include', 'category=electronics')
  })

  it('should navigate to product detail on card click', () => {
    // LOGIC: Pehla product card click karo aur detail page pe redirect check karo
    cy.get('article', { timeout: 10000 }).first().click()
    cy.url().should('include', '/product/')
    cy.url().should('include', '/details')
  })
})
