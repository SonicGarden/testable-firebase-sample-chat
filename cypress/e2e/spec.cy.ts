import user from '../fixtures/user.json';

describe('画面が表示されること', () => {
  beforeEach(() => {
    cy.task('create:user', user);
    cy.login(user.uid);
  })
  afterEach(() => {
    cy.teardown();
  });
  it('passes', () => {
    cy.visit('/')
    cy.contains('Sample Chat App');
  })
})
