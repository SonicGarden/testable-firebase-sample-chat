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
        async 'create:user'(user: {
          uid: string;
          email: string;
          displayName: string;
          password: string;
          emailVerified: boolean;
        }) {
          await admin.auth().createUser(user);
          return admin.firestore().doc(`/users/${user.uid}`).set({ name: user.displayName, createdAt: new Date() });
        },

        async 'create:message'(message: { content: string; imagePath: string | null; senderId: string }) {
          return admin
            .firestore()
            .collection(`messages`)
            .add({ ...message, createdAt: new Date() });
        },
      });
    },
  },
});
