import type { Timestamp, WithId } from '@/lib/firebase';

export type UserSecretDocumentData = {
  createdAt: Timestamp;
  fcmToken: string;
};

export type UserSecret = WithId<UserSecretDocumentData>;
