import { db, FieldPath, CollectionReference, Query } from './firebase';
import { UserSecretDocumentData } from '../shared/types/userSecret';

export const userSecretsRef = db.collection('userSecrets') as CollectionReference<UserSecretDocumentData>;
export const userSecretsWithoutSenderQuery = (senderId: string): Query<UserSecretDocumentData> =>
  userSecretsRef.where(FieldPath.documentId(), '!=', senderId);
