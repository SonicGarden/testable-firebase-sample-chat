import {
  initializeTestEnvironment as _initializeTestEnvironment,
  RulesTestEnvironment,
} from '@firebase/rules-unit-testing';
import { readFileSync } from 'fs';
import firebase from 'firebase/compat/app';
import { getConverter, WithId } from '@/lib/firebase';

let testEnv: RulesTestEnvironment;

export const initializeTestEnvironment = async (projectId: string) => {
  process.env.FIRESTORE_EMULATOR_HOST = 'localhost:8080';
  process.env.FIREBASE_STORAGE_EMULATOR_HOST = 'localhost:9199';
  testEnv = await _initializeTestEnvironment({
    projectId,
    firestore: {
      rules: readFileSync('firestore.rules', 'utf8'),
    },
    storage: {
      rules: readFileSync('storage.rules', 'utf8'),
    },
  });
};

export const getTestEnv = () => testEnv;

export const setCollection = <T>(ref: firebase.firestore.CollectionReference, instances: WithId<T>[]) =>
  Promise.all(instances.map((_) => ref.doc(_.id).set(getConverter<T>().toFirestore(_))));
