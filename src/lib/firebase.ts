import { initializeApp } from 'firebase/app';
import { omit } from 'lodash-es';
import {
  Timestamp,
  DocumentData,
  QueryDocumentSnapshot,
  SnapshotOptions,
  FirestoreDataConverter,
  PartialWithFieldValue,
  serverTimestamp as _serverTimestamp,
  connectFirestoreEmulator,
  initializeFirestore,
} from 'firebase/firestore';
import {
  User,
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut as _signOut,
  connectAuthEmulator,
} from 'firebase/auth';
import { getMessaging, getToken } from 'firebase/messaging';
import type { WithId } from '@/shared/types/firebase';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

if (import.meta.env.VITE_EMULATORS === 'true') {
  console.info('USE EMULATORS...');
  connectAuthEmulator(getAuth(), 'http://localhost:9099');
  const firestore = initializeFirestore(app, { experimentalForceLongPolling: true });
  connectFirestoreEmulator(firestore, 'localhost', 8080);
}

const getConverter = <T extends DocumentData>(): FirestoreDataConverter<WithId<T>> => ({
  toFirestore: (data: PartialWithFieldValue<WithId<T>>): DocumentData => {
    return omit(data, ['id']);
  },
  fromFirestore: (snapshot: QueryDocumentSnapshot<T>, options: SnapshotOptions): WithId<T> => {
    return { id: snapshot.id, ...snapshot.data(options) };
  },
});

const serverTimestamp = _serverTimestamp as unknown as () => Timestamp;

const signInGoogleWithPopup = async () => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(getAuth(), provider);
};

const signOut = async () => _signOut(getAuth());

const getFcmToken = async () =>
  getToken(getMessaging(), { vapidKey: import.meta.env.VITE_FIREBASE_MESSAGING_VAPID_KEY });

export type { User, WithId };
export { Timestamp, getConverter, serverTimestamp, signInGoogleWithPopup, signOut, getFcmToken };
