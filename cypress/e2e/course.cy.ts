/// <reference types="cypress" />

describe('Course Pages & Product Landing E2E Tests', () => {
  it('Loads /p/build-standout-website course page cleanly', () => {
    cy.visit('/p/build-standout-website')
    cy.contains('Build a Standout Website').should('be.visible')
    cy.get('header').should('be.visible')
  })

  it('Loads /modules course curriculum dashboard', () => {
    cy.visit('/modules')
    cy.url().should('include', '/modules')
    cy.get('header').should('be.visible')
  })

  it('Loads /course overview page', () => {
    cy.visit('/course')
    cy.url().should('include', '/course')
    cy.get('header').should('be.visible')
  })
})
