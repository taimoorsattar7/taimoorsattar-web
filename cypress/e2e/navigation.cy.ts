/// <reference types="cypress" />

describe('Site Navigation & Link Styling E2E Tests', () => {
  it('Loads homepage cleanly and displays main navigation header', () => {
    cy.visit('/')
    cy.get('header').should('be.visible')
    cy.contains('Taimoor Sattar').should('be.visible')
  })

  it('Navigates to About page and verifies styled links', () => {
    cy.visit('/about')
    cy.url().should('include', '/about')
    cy.get('header').should('be.visible')
  })

  it('Navigates to Blogs page and checks article links', () => {
    cy.visit('/blogs')
    cy.url().should('include', '/blogs')
    cy.get('a[href*="/blogs/"]').should('exist')
  })

  it('Navigates to Contact page cleanly', () => {
    cy.visit('/contact')
    cy.url().should('include', '/contact')
  })
})
