import type { Timestamp, WithId } from '@/lib/firebase';

export type User = {
  createdAt: Timestamp;
  name: string;
  photoUrl: string;
};

export type UserWithId = WithId<User>;
