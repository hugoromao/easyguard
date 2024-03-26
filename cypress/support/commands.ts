/// <reference types="cypress" />
export {};

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//

Cypress.Commands.add("skipOnboarding", () => {
  for (let i = 0; i < 4; i++) {
    cy.get("[aria-label='Próxima página']").click();
  }
  cy.contains(/Vamos começar/i).click();
});

Cypress.Commands.add("isOnHome", () => {
  cy.contains(/Nova Senha/i).should("exist");
  cy.contains(/Gerador de Senhas/i).should("exist");
  cy.contains(/Gamificado/i).should("exist");
});

declare global {
  // eslint-disable-next-line no-unused-vars
  namespace Cypress {
    interface Chainable {
      skipOnboarding(): Chainable<void>;
      isOnHome(): Chainable<void>;
    }
  }
}
