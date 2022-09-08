import type { Timestamp, WithId } from '@/lib/firebase';

export type UserDocumentData = {
  createdAt: Timestamp;
  name: string | null;
  photoUrl: string | null;
};

export type User = WithId<UserDocumentData>;
