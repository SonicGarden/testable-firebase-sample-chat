import type { Timestamp } from '@/lib/firebase';

export type User = {
  createdAt: Timestamp;
  name: string;
  photoUrl: string;
};

export type UserWithId = User & {
  id: string;
};
