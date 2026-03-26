import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    // LOGIC: Local dev server URL
    baseUrl: 'http://localhost:5173',
    specPattern: 'cypress/e2e/**/*.cy.{ts,tsx}',
    supportFile: false,
  },
})
