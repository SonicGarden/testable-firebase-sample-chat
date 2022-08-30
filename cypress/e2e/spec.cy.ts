const user = {
  uid: 'DUMMY-USER-ID',
  email: 'dummy@example.com',
  displayName: 'test-user',
  password: 'password',
  emailVerified: true,
};

const message = {
  content: 'test message',
  imagePath: null,
  senderId: 'DUMMY-USER-ID',
}

describe('画面が表示されること', () => {
  beforeEach(() => {
    cy.task('create:user', user);
    cy.task('create:message', message);
    cy.login(user.uid);
  })
  afterEach(() => {
    cy.teardown();
  });
  it('タイトルが表示される', () => {
    cy.visit('/')
    cy.contains('Sample Chat App');
  })

  it('メッセージが表示される', () => {
    cy.visit('/')
    cy.contains('test message')
  })
})
