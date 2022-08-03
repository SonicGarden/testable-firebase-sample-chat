import { initializeTestEnvironment, getTestEnv } from '@/../test/utils';
import { messagesTest } from '@/../test/queries/firestore/collections/messages';

describe('firestore.rules', () => {
  beforeAll(async () => {
    await initializeTestEnvironment();
  });

  afterAll(async () => {
    await getTestEnv().cleanup();
  });

  afterEach(async () => {
    await getTestEnv().clearFirestore();
  });

  messagesTest();
});
