import { Timestamp } from '../../lib/firebase';
import type { WithId } from './firebase';

export type UserSecretDocumentData = {
  createdAt: Timestamp;
  fcmToken: string;
};

export type UserSecret = WithId<UserSecretDocumentData>;
