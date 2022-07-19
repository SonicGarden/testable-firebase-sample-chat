import type { Timestamp, WithId } from '@/lib/firebase';

export type UserDocumentData = {
  createdAt: Timestamp;
  name: string;
  photoUrl: string;
};

export type User = WithId<UserDocumentData>;
