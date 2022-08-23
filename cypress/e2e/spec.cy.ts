describe('empty spec', () => {
  beforeEach(() => {
    cy.task('create:user');
    cy.login('DUMMY-USER-ID');
  })
  afterEach(() => {
    cy.teardown();
  });
  it('passes', () => {
    cy.visit('/')
    cy.contains('Sample Chat App');
  })
})
