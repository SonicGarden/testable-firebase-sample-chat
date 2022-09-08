import { db, CollectionReference } from './firebase';
import { UserDocumentData } from '../shared/types/user';

export const usersRef = db.collection('users') as CollectionReference<UserDocumentData>;
export const userRef = (uid: string) => usersRef.doc(uid);
