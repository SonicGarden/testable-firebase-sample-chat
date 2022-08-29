declare namespace Cypress {
  interface Chainable {
    teardown(): Cypress.Chainable<void>;
  }
}
