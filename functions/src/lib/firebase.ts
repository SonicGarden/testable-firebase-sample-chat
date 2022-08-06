import * as admin from 'firebase-admin';
import type { WithId } from '../shared/types/firebase';

export const db = admin.firestore();
export const FieldPath = admin.firestore.FieldPath;
export type Timestamp = admin.firestore.Timestamp;
export type CollectionReference<T> = admin.firestore.CollectionReference<T>;
export type DocumentReference<T> = admin.firestore.DocumentReference<T>;
export type DocumentData = admin.firestore.DocumentData;
export type Query<T> = admin.firestore.Query<T>;

export const getCollectionData = async <T>(query: CollectionReference<T> | Query<T>): Promise<WithId<T>[]> =>
  query.get().then(({ docs }) => docs.map((doc) => ({ id: doc.id, ...doc.data() })));

export const getDocumentData = async <T>(ref: DocumentReference<T>): Promise<WithId<T>> =>
  ref.get().then((doc) => ({ id: ref.id, ...(doc.data() as T) }));
