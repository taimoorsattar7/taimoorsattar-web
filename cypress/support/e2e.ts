// Cypress E2E Support file
Cypress.on('uncaught:exception', () => {
  // Prevent test failures on third-party uncaught exceptions
  return false
})
