import { initializeTestEnvironment, getTestEnv } from '@/../test/utils';
import { usersTest } from '@/../test/rules/firestore/collections/users';
import { messagesTest } from '@/../test/rules/firestore/collections/messages';

describe('firestore.queries', () => {
  beforeAll(async () => {
    await initializeTestEnvironment('testable-firebase-sample-chat-queries-test');
  });

  afterAll(async () => {
    await getTestEnv().cleanup();
  });

  afterEach(async () => {
    await getTestEnv().clearFirestore();
  });

  usersTest();
  messagesTest();
});
