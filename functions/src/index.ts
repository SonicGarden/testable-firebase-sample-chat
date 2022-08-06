import 'firebase-functions/lib/logger/compat';
import * as admin from 'firebase-admin';

admin.initializeApp();
admin.firestore().settings({ timestampsInSnapshot: true });

export { onCreateMessage } from './onCreateMessage';
