// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import 'firebase/compat/firestore';
import { attachCustomCommands } from 'cypress-firebase';

const fbConfig = {
  apiKey: 'dummy-api-key',
  authDomain: '',
  projectId: 'testable-firebase-sample-chat-test',
  storageBucket: '',
  messagingSenderId: '',
  appId: '',
};

firebase.initializeApp(fbConfig);

firebase.auth().useEmulator(`http://localhost:9099/`);

attachCustomCommands({ Cypress, cy, firebase });
