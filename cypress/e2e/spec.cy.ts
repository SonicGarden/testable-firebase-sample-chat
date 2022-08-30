const user = {
  uid: 'DUMMY-USER-ID',
  email: 'dummy@example.com',
  displayName: 'test-user',
  password: 'password',
  emailVerified: true,
};

describe('メッセージが投稿できる', () => {
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
    cy.get('input[type="text"]').type('はじめまして。てすたろうです。');
    cy.get('button').contains('送信').click();
    cy.get('#messages', { timeout: 5000 }).within(() => {
      cy.contains('はじめまして。てすたろうです。', { timeout: 5000 }).should('be.visible');
    })
  })
})
