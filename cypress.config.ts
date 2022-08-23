import { defineConfig } from 'cypress';
import * as admin from 'firebase-admin';
import { plugin as cypressFirebasePlugin } from 'cypress-firebase';

admin.initializeApp({
  projectId: 'testable-firebase-sample-chat-test',
});

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5000',
    supportFile: 'cypress/support/e2e.ts',
    setupNodeEvents(on, config) {
      cypressFirebasePlugin(on, config, admin);

      process.env.FIRESTORE_EMULATOR_HOST = 'localhost:8080';
      process.env.FIREBASE_AUTH_EMULATOR_HOST = 'localhost:9099';
      process.env.FIREBASE_STORAGE_EMULATOR_HOST = 'localhost:9199';

      on('task', {
        async 'create:user'() {
          await admin.auth().createUser({
            uid: 'DUMMY-USER-ID',
            email: 'dummy@example.com',
            displayName: 'test-user',
            password: 'password',
            emailVerified: true,
          });
          return admin.firestore().doc(`/users/DUMMY-USER-ID`).set({ name: 'test-user', createdAt: new Date() });
        },
      });
    },
  },
});
