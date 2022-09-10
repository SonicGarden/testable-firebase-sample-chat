import { Timestamp } from '../../lib/firebase';
import type { WithId } from './firebase';

export type UserDocumentData = {
  createdAt: Timestamp;
  name: string | null;
  photoUrl: string | null;
};

export type User = WithId<UserDocumentData>;
