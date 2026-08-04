/// <reference types="cypress" />

describe('Authentication & Settings E2E Tests', () => {
  it('Loads /auth sign-in page correctly', () => {
    cy.visit('/auth')
    cy.get('input[name="email"]').should('be.visible')
    cy.get('input[name="password"]').should('be.visible')
  })

  it('Loads /settings page cleanly', () => {
    cy.visit('/settings')
    cy.get('body').should('be.visible')
  })
})
