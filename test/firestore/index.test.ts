import { initializeTestEnvironment, getTestEnv } from '@/../test/utils';
import { usersRules } from '@/../test/firestore/rules/users';
import { messagesRules } from '@/../test/firestore/rules/messages';
import { messagesQueries } from '@/../test/firestore/queries/messages';

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

  usersRules();
  messagesRules();
  messagesQueries();
});
