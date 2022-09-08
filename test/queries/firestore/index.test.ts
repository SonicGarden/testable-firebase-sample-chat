import { initializeTestEnvironment, getTestEnv } from '@/../test/utils';
import { messagesTest } from '@/../test/queries/firestore/collections/messages';

describe('firestore.queries', () => {
  beforeAll(async () => {
    await initializeTestEnvironment('testable-firebase-sample-chat-firestore-queries-test');
  });

  afterAll(async () => {
    await getTestEnv().cleanup();
  });

  afterEach(async () => {
    await getTestEnv().clearFirestore();
  });

  messagesTest();
});
