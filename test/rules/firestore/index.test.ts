import { describe, beforeAll, afterAll, afterEach } from 'vitest';
import { initializeTestEnvironment, getTestEnv } from './utils';
import { usersTest } from '@/../test/rules/firestore/collections/users';

process.env.FIRESTORE_EMULATOR_HOST = 'localhost:8080';

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

  usersTest();
});
